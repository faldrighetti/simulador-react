type Liga = {
  id: number;
  nombre: string;
  pais: string;
  paisId: number | null;
  categoria: number;
  cantidadEquipos: number;
};

type Equipo = {
  id: number;
  nombre: string;
  media: number;
  ligaId: number | null;
  paisId: number;
};

type Datos = { ligas: Liga[]; equipos: Equipo[] };
export type FormatoExportacion = "json" | "sql";

const esEntero = (value: unknown): value is number => Number.isSafeInteger(value);
const esEnteroONull = (value: unknown) => value === null || esEntero(value);

export async function cargarDatos(): Promise<Datos> {
  const responses = await Promise.all([
    fetch("https://localhost:7225/api/ligas", { cache: "no-store", signal: AbortSignal.timeout(30000) }),
    fetch("https://localhost:7225/api/equipos", { cache: "no-store", signal: AbortSignal.timeout(30000) }),
  ]);
  if (responses.some((response) => !response.ok)) {
    throw new Error("No se pudieron consultar las ligas y los equipos.");
  }

  const [ligas, equipos] = await Promise.all(responses.map((response) => response.json()));
  if (
    !Array.isArray(ligas) || !Array.isArray(equipos) ||
    !ligas.every((liga) => liga && esEntero(liga.id) && typeof liga.nombre === "string" &&
      typeof liga.pais === "string" && esEnteroONull(liga.paisId) &&
      esEntero(liga.categoria) && esEntero(liga.cantidadEquipos)) ||
    !equipos.every((equipo) => equipo && esEntero(equipo.id) && typeof equipo.nombre === "string" &&
      esEntero(equipo.media) && esEnteroONull(equipo.ligaId) && esEntero(equipo.paisId))
  ) {
    throw new Error("La API devolvió datos incompletos o con un formato inesperado.");
  }

  if (ligas.length === 0 && equipos.length === 0) {
    throw new Error("La base consultada está vacía. Verificá la conexión de la API.");
  }

  const ligaIds = new Set(ligas.map((liga) => liga.id));
  if (ligaIds.size !== ligas.length || new Set(equipos.map((equipo) => equipo.id)).size !== equipos.length ||
    equipos.some((equipo) => equipo.ligaId !== null && !ligaIds.has(equipo.ligaId))) {
    throw new Error("Los datos contienen identificadores duplicados o ligas faltantes. Intentá nuevamente.");
  }

  return { ligas, equipos };
}

// Las comillas duplicadas preservan los nombres con NO_BACKSLASH_ESCAPES activo.
const textoSql = (value: string) => `'${value.replace(/'/g, "''")}'`;
const numeroSql = (value: number | null) => value === null ? "NULL" : String(value);

export function serializarDatos(datos: Datos, formato: FormatoExportacion, fecha: string): string {
  const { ligas, equipos } = datos;
  if (formato === "json") {
    return JSON.stringify({
      fechaExportacion: fecha,
      totalLigas: ligas.length,
      totalEquipos: equipos.length,
      ligas: ligas.map((liga) => ({ ...liga, equipos: equipos.filter((equipo) => equipo.ligaId === liga.id) })),
      equiposSinLiga: equipos.filter((equipo) => equipo.ligaId === null),
    }, null, 2);
  }

  const sentencias = [
    "-- Exportación de datos del simulador para MySQL 8.",
    `-- Fecha UTC ${fecha}. Ligas ${ligas.length}. Equipos ${equipos.length}.`,
    "-- Ejecutar sobre una base vacía seleccionada previamente.",
    "SET NAMES utf8mb4;",
    "SET @simulador_sql_mode = @@SESSION.sql_mode;",
    "SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO,NO_BACKSLASH_ESCAPES';",
    "CREATE TABLE IF NOT EXISTS `ligas` (",
    "  `Id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,",
    "  `Nombre` longtext NOT NULL, `Pais` longtext NOT NULL,",
    "  `PaisId` int NULL, `Categoria` int NOT NULL, `CantidadEquipos` int NOT NULL",
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    "CREATE TABLE IF NOT EXISTS `equipos` (",
    "  `Id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,",
    "  `Nombre` longtext NOT NULL, `Media` int NOT NULL, `PaisId` int NOT NULL, `LigaId` int NULL,",
    "  KEY `IX_equipos_LigaId` (`LigaId`),",
    "  CONSTRAINT `FK_equipos_ligas_LigaId` FOREIGN KEY (`LigaId`) REFERENCES `ligas` (`Id`)",
    ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;",
    "START TRANSACTION;",
    ...ligas.map((liga) =>
      "INSERT INTO `ligas` (`Id`, `Nombre`, `Pais`, `PaisId`, `Categoria`, `CantidadEquipos`) VALUES " +
      `(${liga.id}, ${textoSql(liga.nombre)}, ${textoSql(liga.pais)}, ${numeroSql(liga.paisId)}, ${liga.categoria}, ${liga.cantidadEquipos});`
    ),
    ...equipos.map((equipo) =>
      "INSERT INTO `equipos` (`Id`, `Nombre`, `Media`, `PaisId`, `LigaId`) VALUES " +
      `(${equipo.id}, ${textoSql(equipo.nombre)}, ${equipo.media}, ${equipo.paisId}, ${numeroSql(equipo.ligaId)});`
    ),
    "COMMIT;",
    "SET SESSION sql_mode = @simulador_sql_mode;",
    "",
  ];
  return sentencias.join("\n");
}
