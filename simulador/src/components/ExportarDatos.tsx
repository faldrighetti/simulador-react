import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { cargarDatos, FormatoExportacion, serializarDatos } from "../utils/exportarDatos";

export default function ExportarDatos() {
  const [abierto, setAbierto] = useState(false);
  const [exportando, setExportando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const contenedor = useRef<HTMLDivElement>(null);
  const boton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const cerrarFuera = (event: PointerEvent) => {
      if (event.target instanceof Node && !contenedor.current?.contains(event.target)) setAbierto(false);
    };
    const cerrarConEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", cerrarFuera);
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.removeEventListener("pointerdown", cerrarFuera);
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [abierto]);

  const exportar = async (formato: FormatoExportacion) => {
    setExportando(true);
    setMensaje("");
    setError("");
    try {
      const datos = await cargarDatos();
      const fecha = new Date().toISOString();
      const contenido = serializarDatos(datos, formato, fecha);
      const blob = new Blob([contenido], {
        type: formato === "json" ? "application/json;charset=utf-8" : "application/sql;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const enlace = document.createElement("a");
      enlace.href = url;
      enlace.download = `simulador_${fecha.replace(/[:.]/g, "-")}.${formato}`;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMensaje(`Descarga iniciada. ${datos.ligas.length} ligas y ${datos.equipos.length} equipos.`);
    } catch (cause) {
      setError(cause instanceof TypeError || (cause instanceof DOMException && cause.name === "TimeoutError")
        ? "No se pudo conectar con la API. Verificá que esté disponible e intentá nuevamente."
        : cause instanceof Error ? cause.message : "No se pudieron exportar los datos. Intentá nuevamente.");
    } finally {
      setExportando(false);
    }
  };

  return (
    <div className="inicio-page__export" ref={contenedor}>
      <button type="button" className="inicio-page__exportButton" ref={boton}
        aria-expanded={abierto} aria-controls="exportar-opciones"
        onClick={() => setAbierto(!abierto)}>
        <FaDownload aria-hidden="true" /> Exportar datos
      </button>
      <div id="exportar-opciones" className="inicio-page__exportPanel" hidden={!abierto}>
        <div className="inicio-page__exportFormats" role="group" aria-label="Formato de exportación">
          <button type="button" disabled={exportando} onClick={() => exportar("json")}>Descargar .json</button>
          <button type="button" disabled={exportando} onClick={() => exportar("sql")}>Descargar .sql</button>
        </div>
        <p role="status">{exportando ? "Exportando datos…" : mensaje}</p>
        {error && <p role="alert">{error}</p>}
      </div>
    </div>
  );
}
