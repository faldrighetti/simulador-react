// src/components/SelectorEquipos/SelectorEquipos.tsx
import React, { useEffect, useState } from "react";
import { getTeamLogoPath as resolveTeamLogoPath } from "../../utils/logoPath";
import "./SelectorEquipos.css";

interface Team {
  name: string;
  logo: string;
  media: number;
}

interface League {
  id: number;
  nombre: string;
  pais: string;
  categoria: number;
  teams?: Team[];
}

interface Country {
  name: string;
  leagues: League[];
}

type Props = {
  onSelectedTeam: (team: Team) => void;
};

const SelectorEquipos: React.FC<Props> = ({ onSelectedTeam }) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(2);
  const [selectedLeagueIndex, setSelectedLeagueIndex] = useState(0);

  const selectedCountry = countries[selectedCountryIndex];
  const selectedLeague = selectedCountry?.leagues[selectedLeagueIndex];
  const hasMultipleLeagues = (selectedCountry?.leagues.length ?? 0) > 1;

  const getTeamLogoPath = (name: string, format: "png" | "webp" = "png") => {
    const basePath = "src/assets/Escudos";
    const fileName = name.replace(/\s+/g, "_").replace(/[()]/g, "");

    if (format === "webp") {
      return `${basePath}/${fileName}.webp`;
    } else {
      return `${basePath}/${fileName}.png`;
    }
  };

const hardcodedCountries: Country[] = [
  {
    name: "Alemania",
    leagues: [
      {
        id: 25,
        nombre: "Bundesliga",
        pais: "Alemania",
        categoria: 1,
        teams: [
          { name: "Bayern Munich", logo: getTeamLogoPath("Bayern Munich"), media: 89 },
          { name: "Borussia Dortmund", logo: getTeamLogoPath("Borussia Dortmund"), media: 84 },
          { name: "RB Leipzig", logo: getTeamLogoPath("RB Leipzig"), media: 83 },
          { name: "Bayer Leverkusen", logo: getTeamLogoPath("Bayer Leverkusen"), media: 85 },
          { name: "Union Berlin", logo: getTeamLogoPath("Union Berlin"), media: 79 },
          { name: "Eintracht Frankfurt", logo: getTeamLogoPath("Eintracht Frankfurt"), media: 80 },
          { name: "Freiburg", logo: getTeamLogoPath("Freiburg"), media: 78 },
          { name: "Wolfsburg", logo: getTeamLogoPath("Wolfsburg"), media: 77 },
          { name: "Borussia M'Gladbach", logo: getTeamLogoPath("Borussia M'Gladbach"), media: 76 },
          { name: "Mainz 05", logo: getTeamLogoPath("Mainz 05"), media: 75 },
          { name: "Köln", logo: getTeamLogoPath("Köln"), media: 74 },
          { name: "Augsburg", logo: getTeamLogoPath("Augsburg"), media: 73 },
          { name: "Stuttgart", logo: getTeamLogoPath("Stuttgart"), media: 79 },
          { name: "Werder Bremen", logo: getTeamLogoPath("Werder Bremen"), media: 74 },
          { name: "Hertha Berlin", logo: getTeamLogoPath("Hertha Berlin"), media: 72 },
          { name: "Hamburger", logo: getTeamLogoPath("Hamburger"), media: 70 },
          { name: "Schalke 04", logo: getTeamLogoPath("Schalke 04"), media: 69 },
          { name: "Hoffenheim", logo: getTeamLogoPath("Hoffenheim"), media: 75 },
        ],
      },
    ],
  },
  {
    name: "Arabia Saudita",
    leagues: [
      {
        id: 16,
        nombre: "Saudi Pro League",
        pais: "Arabia Saudita",
        categoria: 1,
        teams: [
          { name: "Al-Hilal", logo: getTeamLogoPath("Al-Hilal"), media: 81 },
          { name: "Al-Ittihad", logo: getTeamLogoPath("Al-Ittihad"), media: 79 },
          { name: "Al-Nassr", logo: getTeamLogoPath("Al-Nassr"), media: 80 },
          { name: "Al-Ahli", logo: getTeamLogoPath("Al-Ahli"), media: 75 },
          { name: "Al-Qadsiah", logo: getTeamLogoPath("Al-Qadsiah"), media: 76 },
          { name: "Neom SC", logo: getTeamLogoPath("Neom SC"), media: 73 },
          { name: "Al-Taawoun", logo: getTeamLogoPath("Al-Taawoun"), media: 72 },
          { name: "Al-Khaleej", logo: getTeamLogoPath("Al-Khaleej"), media: 70 },
          { name: "Al-Ettifaq", logo: getTeamLogoPath("Al-Ettifaq"), media: 69 },
          { name: "Al-Shabab", logo: getTeamLogoPath("Al-Shabab"), media: 69 },
          { name: "Al-Fateh", logo: getTeamLogoPath("Al-Fateh"), media: 67 },
          { name: "Al-Fayha", logo: getTeamLogoPath("Al-Fayha"), media: 70 },
          { name: "Al-Riyadh", logo: getTeamLogoPath("Al-Riyadh"), media: 65 },
          { name: "Al-Okhdood", logo: getTeamLogoPath("Al-Okhdood"), media: 67 },
          { name: "Damac", logo: getTeamLogoPath("Damac"), media: 63 },
          { name: "Al-Hazem", logo: getTeamLogoPath("Al-Hazem"), media: 61 },
          { name: "Al-Najma", logo: getTeamLogoPath("Al-Najma"), media: 64 },
          { name: "Al-Kholood", logo: getTeamLogoPath("Al-Kholood"), media: 65 },
        ],
      },
    ],
  },
  {
    name: "Argentina",
    leagues: [
      {
        id: 1,
        nombre: "Primera División",
        pais: "Argentina",
        categoria: 1,
        teams: [
          { name: "Aldosivi", logo: getTeamLogoPath("Aldosivi"), media: 66 },
          { name: "Argentinos Juniors", logo: getTeamLogoPath("Argentinos Juniors"), media: 73 },
          { name: "Atlético Tucumán", logo: getTeamLogoPath("Atlético Tucumán"), media: 68 },
          { name: "Banfield", logo: getTeamLogoPath("Banfield"), media: 71 },
          { name: "Barracas Central", logo: getTeamLogoPath("Barracas Central"), media: 61 },
          { name: "Belgrano", logo: getTeamLogoPath("Belgrano"), media: 70 },
          { name: "Boca Juniors", logo: getTeamLogoPath("Boca Juniors"), media: 80 },
          { name: "Central Córdoba (SdE)", logo: getTeamLogoPath("Central Córdoba (SdE)"), media: 69 },
          { name: "Defensa y Justicia", logo: getTeamLogoPath("Defensa y Justicia"), media: 73 },
          { name: "Deportivo Riestra", logo: getTeamLogoPath("Deportivo Riestra"), media: 61 },
          { name: "Estudiantes (LP)", logo: getTeamLogoPath("Estudiantes (LP)"), media: 77 },
          { name: "Estudiantes (Río Cuarto)", logo: getTeamLogoPath("Estudiantes (Río Cuarto)"), media: 64 },
          { name: "Gimnasia (LP)", logo: getTeamLogoPath("Gimnasia (LP)"), media: 70 },
          { name: "Gimnasia (Mza)", logo: getTeamLogoPath("Gimnasia (Mza)"), media: 66 },
          { name: "Huracán", logo: getTeamLogoPath("Huracán"), media: 73 },
          { name: "Independiente", logo: getTeamLogoPath("Independiente"), media: 76 },
          { name: "Independiente Rivadavia", logo: getTeamLogoPath("Independiente Rivadavia"), media: 66 },
          { name: "Instituto", logo: getTeamLogoPath("Instituto"), media: 68 },
          { name: "Lanús", logo: getTeamLogoPath("Lanús"), media: 76 },
          { name: "Newell's", logo: getTeamLogoPath("Newell's"), media: 73 },
          { name: "Platense", logo: getTeamLogoPath("Platense"), media: 70 },
          { name: "Racing Club", logo: getTeamLogoPath("Racing Club"), media: 78 },
          { name: "River Plate", logo: getTeamLogoPath("River Plate"), media: 81 },
          { name: "Rosario Central", logo: getTeamLogoPath("Rosario Central"), media: 72 },
          { name: "San Lorenzo", logo: getTeamLogoPath("San Lorenzo"), media: 77 },
          { name: "Sarmiento (J)", logo: getTeamLogoPath("Sarmiento (J)"), media: 68 },
          { name: "Talleres (C)", logo: getTeamLogoPath("Talleres (C)"), media: 76 },
          { name: "Tigre", logo: getTeamLogoPath("Tigre"), media: 69 },
          { name: "Unión", logo: getTeamLogoPath("Unión"), media: 69 },
          { name: "Vélez Sarsfield", logo: getTeamLogoPath("Vélez Sarsfield"), media: 74 },
        ],
      },
      {
        id: 13,
        nombre: "B Nacional",
        pais: "Argentina",
        categoria: 2,
        teams: [
          { name: "Acassuso", logo: getTeamLogoPath("Acassuso"), media: 56 },
          { name: "Agropecuario", logo: getTeamLogoPath("Agropecuario"), media: 67 },
          { name: "Almagro", logo: getTeamLogoPath("Almagro"), media: 63 },
          { name: "All Boys", logo: getTeamLogoPath("All Boys"), media: 65 },
          { name: "Almirante Brown", logo: getTeamLogoPath("Almirante Brown"), media: 66 },
          { name: "Atlanta", logo: getTeamLogoPath("Atlanta"), media: 64 },
          { name: "Atlético de Rafaela", logo: getTeamLogoPath("Atlético de Rafaela"), media: 68 },
          { name: "Central Norte", logo: getTeamLogoPath("Central Norte"), media: 59 },
          { name: "Chacarita", logo: getTeamLogoPath("Chacarita"), media: 69 },
          { name: "Chaco For Ever", logo: getTeamLogoPath("Chaco For Ever"), media: 62 },
          { name: "Ciudad Bolívar", logo: getTeamLogoPath("Ciudad Bolívar"), media: 50 },
          { name: "Colegiales", logo: getTeamLogoPath("Colegiales"), media: 61 },
          { name: "Colón", logo: getTeamLogoPath("Colón"), media: 69 },
          { name: "Defensores de Belgrano", logo: getTeamLogoPath("Defensores de Belgrano"), media: 67 },
          { name: "Deportivo Madryn", logo: getTeamLogoPath("Deportivo Madryn"), media: 62 },
          { name: "Deportivo Maipú", logo: getTeamLogoPath("Deportivo Maipú"), media: 66 },
          { name: "Deportivo Morón", logo: getTeamLogoPath("Deportivo Morón"), media: 63 },
          { name: "Estudiantes (Bs As)", logo: getTeamLogoPath("Estudiantes (Bs As)"), media: 66 },
          { name: "Ferro", logo: getTeamLogoPath("Ferro"), media: 68 },
          { name: "Gimnasia de Jujuy", logo: getTeamLogoPath("Gimnasia de Jujuy"), media: 66 },
          { name: "Gimnasia y Tiro", logo: getTeamLogoPath("Gimnasia y Tiro"), media: 66 },
          { name: "Godoy Cruz", logo: getTeamLogoPath("Godoy Cruz"), media: 72 },
          { name: "Güemes", logo: getTeamLogoPath("Güemes"), media: 62 },
          { name: "Los Andes", logo: getTeamLogoPath("Los Andes"), media: 58 },
          { name: "Mitre (SdE)", logo: getTeamLogoPath("Mitre (SdE)"), media: 65 },
          { name: "Nueva Chicago", logo: getTeamLogoPath("Nueva Chicago"), media: 63 },
          { name: "Patronato", logo: getTeamLogoPath("Patronato"), media: 70 },
          { name: "Quilmes", logo: getTeamLogoPath("Quilmes"), media: 69 },
          { name: "Racing (Córdoba)", logo: getTeamLogoPath("Racing (Córdoba)"), media: 61 },
          { name: "San Martín (SJ)", logo: getTeamLogoPath("San Martín (SJ)"), media: 65 },
          { name: "San Martín (T)", logo: getTeamLogoPath("San Martín (T)"), media: 67 },
          { name: "San Miguel", logo: getTeamLogoPath("San Miguel"), media: 64 },
          { name: "San Telmo", logo: getTeamLogoPath("San Telmo"), media: 64 },
          { name: "Temperley", logo: getTeamLogoPath("Temperley"), media: 67 },
          { name: "Tristán Suárez", logo: getTeamLogoPath("Tristán Suárez"), media: 61 },
          { name: "Midland", logo: getTeamLogoPath("Midland"), media: 54 },
        ],
      },
      {
        id: 14,
        nombre: "B Metropolitana",
        pais: "Argentina",
        categoria: 4,
        teams: [
          { name: "Arsenal de Sarandí", logo: getTeamLogoPath("Arsenal de Sarandí"), media: 65 },
          { name: "Argentino de Merlo", logo: getTeamLogoPath("Argentino de Merlo"), media: 53 },
          { name: "Argentino de Quilmes", logo: getTeamLogoPath("Argentino de Quilmes"), media: 53 },
          { name: "Brown (Adrogué)", logo: getTeamLogoPath("Brown (Adrogué)"), media: 64 },
          { name: "Comunicaciones", logo: getTeamLogoPath("Comunicaciones"), media: 59 },
          { name: "Defensores Unidos", logo: getTeamLogoPath("Defensores Unidos"), media: 61 },
          { name: "Deportivo Armenio", logo: getTeamLogoPath("Deportivo Armenio"), media: 56 },
          { name: "Camioneros", logo: getTeamLogoPath("Camioneros"), media: 62 },
          { name: "Laferrere", logo: getTeamLogoPath("Laferrere"), media: 54 },
          { name: "Deportivo Merlo", logo: getTeamLogoPath("Deportivo Merlo"), media: 55 },
          { name: "Dock Sud", logo: getTeamLogoPath("Dock Sud"), media: 52 },
          { name: "Excursionistas", logo: getTeamLogoPath("Excursionistas"), media: 54 },
          { name: "Flandria", logo: getTeamLogoPath("Flandria"), media: 63 },
          { name: "Ituzaingó", logo: getTeamLogoPath("Ituzaingó"), media: 57 },
          { name: "Liniers", logo: getTeamLogoPath("Liniers"), media: 54 },
          { name: "Real Pilar", logo: getTeamLogoPath("Real Pilar"), media: 53 },
          { name: "San Martín Burzaco", logo: getTeamLogoPath("San Martín Burzaco"), media: 53 },
          { name: "Sportivo Italiano", logo: getTeamLogoPath("Sportivo Italiano"), media: 51 },
          { name: "Talleres (RdE)", logo: getTeamLogoPath("Talleres (RdE)"), media: 53 },
          { name: "UAI Urquiza", logo: getTeamLogoPath("UAI Urquiza"), media: 58 },
          { name: "Villa Dálmine", logo: getTeamLogoPath("Villa Dálmine"), media: 64 },
          { name: "Villa San Carlos", logo: getTeamLogoPath("Villa San Carlos"), media: 52 },
        ],
      },
      {
        id: 44,
        nombre: "Primera C",
        pais: "Argentina",
        categoria: 5,
        teams: [
          { name: "Argentino de Rosario", logo: getTeamLogoPath("Argentino de Rosario"), media: 45 },
          { name: "Atlas", logo: getTeamLogoPath("Atlas"), media: 52 },
          { name: "Berazategui", logo: getTeamLogoPath("Berazategui"), media: 51 },
          { name: "Cañuelas", logo: getTeamLogoPath("Cañuelas"), media: 50 },
          { name: "Central Ballester", logo: getTeamLogoPath("Central Ballester"), media: 47 },
          { name: "Central Córdoba (R)", logo: getTeamLogoPath("Central Córdoba (R)"), media: 51 },
          { name: "Centro Español", logo: getTeamLogoPath("Centro Español"), media: 52 },
          { name: "Claypole", logo: getTeamLogoPath("Claypole"), media: 50 },
          { name: "Cambaceres", logo: getTeamLogoPath("Cambaceres"), media: 51 },
          { name: "Deportivo Español", logo: getTeamLogoPath("Deportivo Español"), media: 53 },
          { name: "Deportivo Paraguayo", logo: getTeamLogoPath("Deportivo Paraguayo"), media: 46 },
          { name: "El Porvenir", logo: getTeamLogoPath("El Porvenir"), media: 49 },
          { name: "Estrella del Sur", logo: getTeamLogoPath("Estrella del Sur"), media: 50 },
          { name: "Fénix", logo: getTeamLogoPath("Fénix"), media: 53 },
          { name: "General Lamadrid", logo: getTeamLogoPath("General Lamadrid"), media: 52 },
          { name: "J.J. Urquiza", logo: getTeamLogoPath("J.J. Urquiza"), media: 55 },
          { name: "Juventud Unida", logo: getTeamLogoPath("Juventud Unida"), media: 51 },
          { name: "Leones", logo: getTeamLogoPath("Leones"), media: 50 },
          { name: "Leandro N. Alem", logo: getTeamLogoPath("Leandro N. Alem"), media: 52 },
          { name: "Lugano", logo: getTeamLogoPath("Lugano"), media: 51 },
          { name: "Luján", logo: getTeamLogoPath("Luján"), media: 52 },
          { name: "Mercedes", logo: getTeamLogoPath("Mercedes"), media: 51 },
          { name: "Muñiz", logo: getTeamLogoPath("Muñiz"), media: 51 },
          { name: "Puerto Nuevo", logo: getTeamLogoPath("Puerto Nuevo"), media: 48 },
          { name: "Sacachispas", logo: getTeamLogoPath("Sacachispas"), media: 60 },
          { name: "Sportivo Barracas", logo: getTeamLogoPath("Sportivo Barracas"), media: 49 },
          { name: "Victoriano Arenas", logo: getTeamLogoPath("Victoriano Arenas"), media: 52 },
          { name: "Yupanqui", logo: getTeamLogoPath("Yupanqui"), media: 49 },
        ],
      },
      {
        id: 15,
        nombre: "Federal A",
        pais: "Argentina",
        categoria: 4,
        teams: [
          { name: "9 de Julio", logo: getTeamLogoPath("9 de Julio"), media: 55 },
          { name: "Alvarado", logo: getTeamLogoPath("Alvarado"), media: 63 },
          { name: "Atenas (RC)", logo: getTeamLogoPath("Atenas (RC)"), media: 59 },
          { name: "Bartolomé Mitre", logo: getTeamLogoPath("Bartolomé Mitre"), media: 57 },
          { name: "Boca Unidos", logo: getTeamLogoPath("Boca Unidos"), media: 56 },
          { name: "Círculo Dep. Otamendi", logo: getTeamLogoPath("Círculo Dep. Otamendi"), media: 53 },
          { name: "Cipolletti", logo: getTeamLogoPath("Cipolletti"), media: 60 },
          { name: "Costa Brava", logo: getTeamLogoPath("Costa Brava"), media: 51 },
          { name: "Def. de Belgrano (VR)", logo: getTeamLogoPath("Defensores de Belgrano (VR)"), media: 52 },
          { name: "Def. Pto. Vilelas", logo: getTeamLogoPath("Defensores de Puerto Vilelas"), media: 52 },
          { name: "Argentino (MM)", logo: getTeamLogoPath("Argentino (MM)"), media: 60 },
          { name: "Deportivo Rincón", logo: getTeamLogoPath("Deportivo Rincón"), media: 53 },
          { name: "Douglas Haig", logo: getTeamLogoPath("Douglas Haig"), media: 62 },
          { name: "El Linqueño", logo: getTeamLogoPath("El Linqueño"), media: 53 },
          { name: "Atlético Escobar", logo: getTeamLogoPath("Atlético Escobar "), media: 50 },
          { name: "FADEP", logo: getTeamLogoPath("FADEP"), media: 54 },
          { name: "Germinal", logo: getTeamLogoPath("Germinal"), media: 52 },
          { name: "Gimnasia (Ch)", logo: getTeamLogoPath("Gimnasia y Esgrima de Chivilcoy"), media: 54 },
          { name: "Gimnasia (CdU)", logo: getTeamLogoPath("Gimnasia (CdU)"), media: 60 },
          { name: "Gmo. Brown (Madryn)", logo: getTeamLogoPath("Gmo. Brown (Madryn)"), media: 64 },
          { name: "Huracán Las Heras", logo: getTeamLogoPath("Huracán Las Heras"), media: 51 },
          { name: "Independiente (Ch)", logo: getTeamLogoPath("Independiente Ch"), media: 76 },
          { name: "Juventud Antoniana", logo: getTeamLogoPath("Juventud Antoniana"), media: 58 },
          { name: "Juventud Unida (SL)", logo: getTeamLogoPath("Juventud Unida (SL)"), media: 56 },
          { name: "Kimberley", logo: getTeamLogoPath("Kimberley"), media: 46 },
          { name: "Olimpo", logo: getTeamLogoPath("Olimpo"), media: 62 },
          { name: "San Martín (F)", logo: getTeamLogoPath("San Martín (F)"), media: 56 },
          { name: "San Martín (Mza)", logo: getTeamLogoPath("San Martín (Mza)"), media: 51 },
          { name: "Santamarina", logo: getTeamLogoPath("Santamarina"), media: 61 },
          { name: "Sarmiento (LB)", logo: getTeamLogoPath("Sarmiento (LB)"), media: 56 },
          { name: "Sarmiento (Res)", logo: getTeamLogoPath("Sarmiento (Res)"), media: 54 },
          { name: "Sol de América (F)", logo: getTeamLogoPath("Sol de América (F)"), media: 52 },
          { name: "Sol de Mayo", logo: getTeamLogoPath("Sol de Mayo"), media: 60 },
          { name: "Sportivo Belgrano", logo: getTeamLogoPath("Sportivo Belgrano"), media: 59 },
          { name: "Sportivo Las Parejas", logo: getTeamLogoPath("Sportivo Las Parejas"), media: 58 },
          { name: "Tucumán Central", logo: getTeamLogoPath("Tucumán Central"), media: 57 },
          { name: "Villa Mitre", logo: getTeamLogoPath("Villa Mitre"), media: 56 },
        ],
      },
    ],
  },
    {
    name: "Brasil",
    leagues: [
      {
        id: 6,
        nombre: "Série A",
        pais: "Brasil",
        categoria: 1,
        teams: [
          { name: "Flamengo", logo: getTeamLogoPath("Flamengo"), media: 83 },
          { name: "América MG", logo: getTeamLogoPath("América MG"), media: 70 },
          { name: "Athl. Paranaense", logo: getTeamLogoPath("Athl. Paranaense"), media: 78 },
          { name: "Atlético Mineiro", logo: getTeamLogoPath("Atlético Mineiro"), media: 81 },
          { name: "Botafogo", logo: getTeamLogoPath("Botafogo"), media: 77 },
          { name: "Ceará", logo: getTeamLogoPath("Ceará"), media: 72 },
          { name: "Corinthians", logo: getTeamLogoPath("Corinthians"), media: 76 },
          { name: "Coritiba", logo: getTeamLogoPath("Coritiba"), media: 70 },
          { name: "Cruzeiro", logo: getTeamLogoPath("Cruzeiro"), media: 71 },
          { name: "Cuiabá", logo: getTeamLogoPath("Cuiabá"), media: 67 },
          { name: "Fluminense", logo: getTeamLogoPath("Fluminense"), media: 80 },
          { name: "Fortaleza", logo: getTeamLogoPath("Fortaleza"), media: 75 },
          { name: "Goias", logo: getTeamLogoPath("Goias"), media: 72 },
          { name: "Gremio", logo: getTeamLogoPath("Gremio"), media: 74 },
          { name: "Internacional", logo: getTeamLogoPath("Internacional"), media: 77 },
          { name: "Palmeiras", logo: getTeamLogoPath("Palmeiras"), media: 82 },
          { name: "RB Bragantino", logo: getTeamLogoPath("RB Bragantino"), media: 77 },
          { name: "Santos", logo: getTeamLogoPath("Santos"), media: 73 },
          { name: "Sao Paulo", logo: getTeamLogoPath("Sao Paulo"), media: 76 },
          { name: "Vasco da Gama", logo: getTeamLogoPath("Vasco da Gama"), media: 70 },
        ],
      },
    ],
  },
  {
    name: "Colombia",
    leagues: [
      {
        id: 18,
        nombre: "Primera A",
        pais: "Colombia",
        categoria: 1,
        teams: [
          { name: "Independiente Medellín", logo: getTeamLogoPath("Independiente Medellín"), media: 69 },
          { name: "Deportes Tolima", logo: getTeamLogoPath("Deportes Tolima"), media: 69 },
          { name: "Atlético Nacional", logo: getTeamLogoPath("Atlético Nacional"), media: 74 },
          { name: "Atlético Bucaramanga", logo: getTeamLogoPath("Atlético Bucaramanga"), media: 69 },
          { name: "Junior", logo: getTeamLogoPath("Junior"), media: 70 },
          { name: "Fortaleza", logo: getTeamLogoPath("Fortaleza"), media: 67 },
          { name: "Independiente Santa Fe", logo: getTeamLogoPath("Independiente Santa Fe"), media: 68 },
          { name: "América de Cali", logo: getTeamLogoPath("América de Cali"), media: 68 },
          { name: "Alianza Valledupar", logo: getTeamLogoPath("Alianza Valledupar"), media: 66 },
          { name: "Águilas Doradas", logo: getTeamLogoPath("Águilas Doradas"), media: 65 },
          { name: "Once Caldas", logo: getTeamLogoPath("Once Caldas"), media: 69 },
          { name: "Millonarios", logo: getTeamLogoPath("Millonarios"), media: 68 },
          { name: "Llaneros", logo: getTeamLogoPath("Llaneros"), media: 66 },
          { name: "Deportivo Cali", logo: getTeamLogoPath("Deportivo Cali"), media: 67 },
          { name: "Unión Magdalena", logo: getTeamLogoPath("Unión Magdalena"), media: 64 },
          { name: "Envigado", logo: getTeamLogoPath("Envigado"), media: 65 },
          { name: "Deportivo Pasto", logo: getTeamLogoPath("Deportivo Pasto"), media: 63 },
          { name: "Deportivo Pereira", logo: getTeamLogoPath("Deportivo Pereira"), media: 64 },
          { name: "Boyacá Chicó", logo: getTeamLogoPath("Boyacá Chicó"), media: 61 },
          { name: "La Equidad", logo: getTeamLogoPath("La Equidad"), media: 62 },
        ],
      },
    ],
  },
  {
    name: "España",
    leagues: [
      {
        id: 4,
        nombre: "La Liga",
        pais: "España",
        categoria: 1,
        teams: [
          { name: "Real Madrid", logo: getTeamLogoPath("Real Madrid"), media: 90 },
          { name: "Barcelona", logo: getTeamLogoPath("Barcelona"), media: 89 },
          { name: "Atlético Madrid", logo: getTeamLogoPath("Atlético Madrid"), media: 84 },
          { name: "Sevilla", logo: getTeamLogoPath("Sevilla"), media: 80 },
          { name: "Real Sociedad", logo: getTeamLogoPath("Real Sociedad"), media: 82 },
          { name: "Athletic Club", logo: getTeamLogoPath("Athletic Club"), media: 80 },
          { name: "Villarreal", logo: getTeamLogoPath("Villarreal"), media: 81 },
          { name: "Real Betis", logo: getTeamLogoPath("Real Betis"), media: 80 },
          { name: "Getafe", logo: getTeamLogoPath("Getafe"), media: 75 },
          { name: "Rayo Vallecano", logo: getTeamLogoPath("Rayo Vallecano"), media: 74 },
          { name: "Valencia", logo: getTeamLogoPath("Valencia"), media: 76 },
          { name: "Mallorca", logo: getTeamLogoPath("Mallorca"), media: 74 },
          { name: "Alavés", logo: getTeamLogoPath("Alavés"), media: 76 },
          { name: "Espanyol", logo: getTeamLogoPath("Espanyol"), media: 73 },
          { name: "Celta de Vigo", logo: getTeamLogoPath("Celta de Vigo"), media: 77 },
          { name: "Girona", logo: getTeamLogoPath("Girona"), media: 76 },
          { name: "Real Oviedo", logo: getTeamLogoPath("Real Oviedo"), media: 71 },
          { name: "Osasuna", logo: getTeamLogoPath("Osasuna"), media: 75 },
          { name: "Elche", logo: getTeamLogoPath("Elche"), media: 72 },
          { name: "Levante", logo: getTeamLogoPath("Levante"), media: 76 },
        ],
      },
      {
        id: 31,
        nombre: "Segunda División",
        pais: "España",
        categoria: 2,
        teams: [
          { name: "Almería", logo: getTeamLogoPath("Almería"), media: 75 },
          { name: "Granada", logo: getTeamLogoPath("Granada"), media: 74 },
          { name: "Real Valladolid", logo: getTeamLogoPath("Real Valladolid"), media: 73 },
          { name: "Las Palmas", logo: getTeamLogoPath("Las Palmas"), media: 71 },
          { name: "FC Andorra", logo: getTeamLogoPath("FC Andorra"), media: 64 },
          { name: "Eibar", logo: getTeamLogoPath("Eibar"), media: 66 },
          { name: "Racing Santander", logo: getTeamLogoPath("Racing Santander"), media: 73 },
          { name: "Racing de Ferrol", logo: getTeamLogoPath("Racing de Ferrol"), media: 61 },
          { name: "Málaga", logo: getTeamLogoPath("Málaga"), media: 67 },
          { name: "Real Murcia", logo: getTeamLogoPath("Real Murcia"), media: 65 },
          { name: "Burgos", logo: getTeamLogoPath("Burgos"), media: 68 },
          { name: "Tenerife", logo: getTeamLogoPath("Tenerife"), media: 62 },
          { name: "Albacete", logo: getTeamLogoPath("Albacete"), media: 65 },
          { name: "Sporting Gijón", logo: getTeamLogoPath("Sporting Gijón"), media: 72 },
          { name: "Córdoba", logo: getTeamLogoPath("Córdoba"), media: 64 },
          { name: "Cádiz", logo: getTeamLogoPath("Cádiz"), media: 69 },
          { name: "Castellón", logo: getTeamLogoPath("Castellón"), media: 68 },
          { name: "Huesca", logo: getTeamLogoPath("Huesca"), media: 63 },
          { name: "Cultural Leonesa", logo: getTeamLogoPath("Cultural Leonesa"), media: 64 },
          { name: "Leganés", logo: getTeamLogoPath("Leganés"), media: 65 },
          { name: "Deportivo La Coruña", logo: getTeamLogoPath("Deportivo La Coruña"), media: 70 },
          { name: "Real Zaragoza", logo: getTeamLogoPath("Real Zaragoza"), media: 61 },
        ],
      },
      {
        id: 51,
        nombre: "Primera Federación",
        pais: "España",
        categoria: 3,
        teams: [
          { name: "Mirandés", logo: getTeamLogoPath("Mirandés"), media: 61 },
          { name: "Ceuta", logo: getTeamLogoPath("Ceuta"), media: 64 },
          { name: "Eldense", logo: getTeamLogoPath("Eldense"), media: 60 },
          { name: "Alcorcón", logo: getTeamLogoPath("Alcorcón"), media: 57 },
          { name: "Alcoyano", logo: getTeamLogoPath("Alcoyano"), media: 62 },
          { name: "Fuenlabrada", logo: getTeamLogoPath("Fuenlabrada"), media: 61 },
          { name: "Unionistas de Salamanca", logo: getTeamLogoPath("Unionistas de Salamanca"), media: 64 },
          { name: "Amorebieta", logo: getTeamLogoPath("Amorebieta"), media: 55 },
          { name: "Ibiza", logo: getTeamLogoPath("Ibiza"), media: 53 },
          { name: "Recreativo", logo: getTeamLogoPath("Recreativo"), media: 59 },
          { name: "Badajoz", logo: getTeamLogoPath("Badajoz"), media: 57 },
          { name: "Cartagena", logo: getTeamLogoPath("Cartagena"), media: 65 },
          { name: "Gimnástic", logo: getTeamLogoPath("Gimnástic"), media: 62 },
          { name: "Lugo", logo: getTeamLogoPath("Lugo"), media: 53 },
          { name: "Numancia", logo: getTeamLogoPath("Numancia"), media: 62 },
          { name: "Zamora", logo: getTeamLogoPath("Zamora"), media: 60 },
          { name: "Mérida", logo: getTeamLogoPath("Mérida"), media: 57 },
          { name: "Barakaldo", logo: getTeamLogoPath("Barakaldo"), media: 55 },
          { name: "Hércules", logo: getTeamLogoPath("Hércules"), media: 58 },
          { name: "Ponferradina", logo: getTeamLogoPath("Ponferradina"), media: 58 },
          { name: "Sabadell", logo: getTeamLogoPath("Sabadell"), media: 54 },
          { name: "Pontevedra", logo: getTeamLogoPath("Pontevedra"), media: 63 },
        ],
      },
    ],
  },
  {
    name: "Estados Unidos",
    leagues: [
      {
        id: 7,
        nombre: "MLS",
        pais: "Estados Unidos",
        categoria: 1,
        teams: [
          { name: "CF Montreal", logo: getTeamLogoPath("CF Montreal"), media: 72 },
          { name: "Inter Miami", logo: getTeamLogoPath("Inter Miami"), media: 80 },
          { name: "Los Angeles FC", logo: getTeamLogoPath("Los Angeles FC"), media: 78 },
          { name: "New England Revolution", logo: getTeamLogoPath("New England Revolution"), media: 72 },
          { name: "New York City", logo: getTeamLogoPath("New York City"), media: 74 },
          { name: "Philadelphia Union", logo: getTeamLogoPath("Philadelphia Union"), media: 72 },
          { name: "Seattle Sounders", logo: getTeamLogoPath("Seattle Sounders"), media: 75 },
          { name: "Atlanta United", logo: getTeamLogoPath("Atlanta United"), media: 76 },
          { name: "Austin FC", logo: getTeamLogoPath("Austin FC"), media: 72 },
          { name: "Charlotte FC", logo: getTeamLogoPath("Charlotte FC"), media: 70 },
          { name: "Chicago Fire", logo: getTeamLogoPath("Chicago Fire"), media: 68 },
          { name: "FC Cincinnati", logo: getTeamLogoPath("FC Cincinnati"), media: 74 },
          { name: "Colorado Rapids", logo: getTeamLogoPath("Colorado Rapids"), media: 68 },
          { name: "Columbus Crew", logo: getTeamLogoPath("Columbus Crew"), media: 73 },
          { name: "DC United", logo: getTeamLogoPath("DC United"), media: 67 },
          { name: "FC Dallas", logo: getTeamLogoPath("FC Dallas"), media: 70 },
          { name: "Houston Dynamo", logo: getTeamLogoPath("Houston Dynamo"), media: 69 },
          { name: "Los Angeles Galaxy", logo: getTeamLogoPath("Los Angeles Galaxy"), media: 75 },
          { name: "Minnesota United", logo: getTeamLogoPath("Minnesota United"), media: 71 },
          { name: "Nashville SC", logo: getTeamLogoPath("Nashville SC"), media: 69 },
          { name: "Orlando City", logo: getTeamLogoPath("Orlando City"), media: 72 },
          { name: "Portland Timbers", logo: getTeamLogoPath("Portland Timbers"), media: 73 },
          { name: "Real Salt Lake", logo: getTeamLogoPath("Real Salt Lake"), media: 70 },
          { name: "San Diego FC", logo: getTeamLogoPath("San Diego FC"), media: 68 },
          { name: "San Jose Earthquakes", logo: getTeamLogoPath("San Jose Earthquakes"), media: 67 },
          { name: "Sporting Kansas City", logo: getTeamLogoPath("Sporting Kansas City"), media: 71 },
          { name: "St. Louis City", logo: getTeamLogoPath("St. Louis City"), media: 69 },
          { name: "Toronto FC", logo: getTeamLogoPath("Toronto FC"), media: 68 },
          { name: "Vancouver Whitecaps", logo: getTeamLogoPath("Vancouver Whitecaps"), media: 68 },
          { name: "New York Red Bulls", logo: getTeamLogoPath("New York Red Bulls"), media: 75 },
        ],
      },
    ],
  },
  {
    name: "Francia",
    leagues: [
      {
        id: 3,
        nombre: "Ligue 1",
        pais: "Francia",
        categoria: 1,
        teams: [
          { name: "Ajaccio", logo: getTeamLogoPath("Ajaccio"), media: 73 },
          { name: "Angers", logo: getTeamLogoPath("Angers"), media: 72 },
          { name: "AS Monaco", logo: getTeamLogoPath("AS Monaco"), media: 80 },
          { name: "Auxerre", logo: getTeamLogoPath("Auxerre"), media: 73 },
          { name: "Brest", logo: getTeamLogoPath("Brest"), media: 73 },
          { name: "Paris FC", logo: getTeamLogoPath("Paris FC"), media: 73 },
          { name: "Lens", logo: getTeamLogoPath("Lens"), media: 79 },
          { name: "Lille", logo: getTeamLogoPath("Lille"), media: 78 },
          { name: "Lorient", logo: getTeamLogoPath("Lorient"), media: 75 },
          { name: "Lyon", logo: getTeamLogoPath("Lyon"), media: 80 },
          { name: "Montpellier", logo: getTeamLogoPath("Montpellier"), media: 75 },
          { name: "Nantes", logo: getTeamLogoPath("Nantes"), media: 75 },
          { name: "Nice", logo: getTeamLogoPath("Nice"), media: 77 },
          { name: "Olympique Marseille", logo: getTeamLogoPath("Olympique Marseille"), media: 81 },
          { name: "Paris Saint-Germain", logo: getTeamLogoPath("Paris Saint-Germain"), media: 87 },
          { name: "Racing Strasbourg", logo: getTeamLogoPath("Racing Strasbourg"), media: 74 },
          { name: "Rennes", logo: getTeamLogoPath("Rennes"), media: 78 },
          { name: "Stade de Reims", logo: getTeamLogoPath("Stade de Reims"), media: 75 },
          { name: "Toulouse", logo: getTeamLogoPath("Toulouse"), media: 76 },
          { name: "Troyes", logo: getTeamLogoPath("Troyes"), media: 74 },
        ],
      },
    ],
  },
  {
    name: "Inglaterra",
    leagues: [
      {
        id: 2,
        nombre: "Premier League",
        pais: "Inglaterra",
        categoria: 1,
        teams: [
          { name: "Manchester City", logo: getTeamLogoPath("Manchester City"), media: 87 },
          { name: "Liverpool", logo: getTeamLogoPath("Liverpool"), media: 87 },
          { name: "Arsenal", logo: getTeamLogoPath("Arsenal"), media: 86 },
          { name: "Manchester United", logo: getTeamLogoPath("Manchester United"), media: 82 },
          { name: "Chelsea", logo: getTeamLogoPath("Chelsea"), media: 81 },
          { name: "Tottenham Hotspur", logo: getTeamLogoPath("Tottenham Hotspur"), media: 83 },
          { name: "Newcastle United", logo: getTeamLogoPath("Newcastle United"), media: 80 },
          { name: "Aston Villa", logo: getTeamLogoPath("Aston Villa"), media: 79 },
          { name: "West Ham United", logo: getTeamLogoPath("West Ham United"), media: 78 },
          { name: "Brighton", logo: getTeamLogoPath("Brighton"), media: 78 },
          { name: "Crystal Palace", logo: getTeamLogoPath("Crystal Palace"), media: 76 },
          { name: "Fulham", logo: getTeamLogoPath("Fulham"), media: 75 },
          { name: "Wolverhampton", logo: getTeamLogoPath("Wolverhampton"), media: 69 },
          { name: "Everton", logo: getTeamLogoPath("Everton"), media: 73 },
          { name: "Bournemouth", logo: getTeamLogoPath("Bournemouth"), media: 73 },
          { name: "Brentford", logo: getTeamLogoPath("Brentford"), media: 76 },
          { name: "Burnley", logo: getTeamLogoPath("Burnley"), media: 68 },
          { name: "Nottingham Forest", logo: getTeamLogoPath("Nottingham Forest"), media: 77 },
          { name: "Sunderland", logo: getTeamLogoPath("Sunderland"), media: 75 },
          { name: "Leeds United", logo: getTeamLogoPath("Leeds United"), media: 73 },
        ],
      },
      {
        id: 27,
        nombre: "Championship",
        pais: "Inglaterra",
        categoria: 2,
        teams: [
          { name: "Sheffield United", logo: getTeamLogoPath("Sheffield United"), media: 75 },
          { name: "Cardiff City", logo: getTeamLogoPath("Cardiff City"), media: 71 },
          { name: "Leicester City", logo: getTeamLogoPath("Leicester City"), media: 70 },
          { name: "Luton Town", logo: getTeamLogoPath("Luton Town"), media: 69 },
          { name: "Watford", logo: getTeamLogoPath("Watford"), media: 73 },
          { name: "Norwich City", logo: getTeamLogoPath("Norwich City"), media: 73 },
          { name: "Queens Park Rangers", logo: getTeamLogoPath("Queens Park Rangers"), media: 72 },
          { name: "Middlesbrough", logo: getTeamLogoPath("Middlesbrough"), media: 71 },
          { name: "Swansea City", logo: getTeamLogoPath("Swansea City"), media: 71 },
          { name: "Coventry City", logo: getTeamLogoPath("Coventry City"), media: 70 },
          { name: "Millwall", logo: getTeamLogoPath("Millwall"), media: 70 },
          { name: "Hull City", logo: getTeamLogoPath("Hull City"), media: 70 },
          { name: "Preston North End", logo: getTeamLogoPath("Preston North End"), media: 70 },
          { name: "Southampton", logo: getTeamLogoPath("Southampton"), media: 70 },
          { name: "Birmingham City", logo: getTeamLogoPath("Birmingham City"), media: 69 },
          { name: "Blackburn Rovers", logo: getTeamLogoPath("Blackburn Rovers"), media: 69 },
          { name: "Bristol City", logo: getTeamLogoPath("Bristol City"), media: 69 },
          { name: "Stoke City", logo: getTeamLogoPath("Stoke City"), media: 69 },
          { name: "West Bromwich", logo: getTeamLogoPath("West Bromwich"), media: 71 },
          { name: "Huddersfield", logo: getTeamLogoPath("Huddersfield"), media: 68 },
          { name: "Sheffield Wednesday", logo: getTeamLogoPath("Sheffield Wednesday"), media: 68 },
          { name: "Derby County", logo: getTeamLogoPath("Derby County"), media: 67 },
          { name: "Portsmouth", logo: getTeamLogoPath("Portsmouth"), media: 65 },
          { name: "Ipswich Town", logo: getTeamLogoPath("Ipswich Town"), media: 70 },
        ],
      },
      {
        id: 49,
        nombre: "League One",
        pais: "Inglaterra",
        categoria: 3,
        teams: [
          { name: "Plymouth Argyle", logo: getTeamLogoPath("Plymouth Argyle"), media: 67 },
          { name: "Blackpool", logo: getTeamLogoPath("Blackpool"), media: 66 },
          { name: "Bolton", logo: getTeamLogoPath("Bolton"), media: 66 },
          { name: "Charlton", logo: getTeamLogoPath("Charlton"), media: 66 },
          { name: "Reading", logo: getTeamLogoPath("Reading"), media: 66 },
          { name: "Wigan", logo: getTeamLogoPath("Wigan"), media: 65 },
          { name: "Wycombe", logo: getTeamLogoPath("Wycombe"), media: 65 },
          { name: "MK Dons", logo: getTeamLogoPath("MK Dons"), media: 60 },
          { name: "Wrexham", logo: getTeamLogoPath("Wrexham"), media: 64 },
          { name: "Salford City", logo: getTeamLogoPath("Salford City"), media: 59 },
          { name: "AFC Wimbledon", logo: getTeamLogoPath("AFC Wimbledon"), media: 62 },
          { name: "Port Vale", logo: getTeamLogoPath("Port Vale"), media: 57 },
          { name: "Rotherham", logo: getTeamLogoPath("Rotherham"), media: 63 },
          { name: "Stockport", logo: getTeamLogoPath("Stockport"), media: 64 },
          { name: "Stevenage", logo: getTeamLogoPath("Stevenage"), media: 61 },
          { name: "Doncaster", logo: getTeamLogoPath("Doncaster"), media: 59 },
          { name: "Lincoln City", logo: getTeamLogoPath("Lincoln City"), media: 68 },
          { name: "Bradford City", logo: getTeamLogoPath("Bradford City"), media: 68 },
          { name: "Mansfield", logo: getTeamLogoPath("Mansfield"), media: 60 },
          { name: "Leyton Orient", logo: getTeamLogoPath("Leyton Orient"), media: 63 },
          { name: "Northampton", logo: getTeamLogoPath("Northampton"), media: 61 },
          { name: "Oxford United", logo: getTeamLogoPath("Oxford United"), media: 68 },
          { name: "Barnsley", logo: getTeamLogoPath("Barnsley"), media: 64 },
          { name: "Peterborough", logo: getTeamLogoPath("Peterborough"), media: 62 },
        ],
      },
    ],
  },
  {
    name: "Internacional",
    leagues: [
      {
        id: 35,
        nombre: "CONMEBOL",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Argentina", logo: getTeamLogoPath("Argentina"), media: 87 },
          { name: "Brasil", logo: getTeamLogoPath("Brasil"), media: 87 },
          { name: "Uruguay", logo: getTeamLogoPath("Uruguay"), media: 82 },
          { name: "Colombia", logo: getTeamLogoPath("Colombia"), media: 77 },
          { name: "Ecuador", logo: getTeamLogoPath("Ecuador"), media: 77 },
          { name: "Chile", logo: getTeamLogoPath("Chile"), media: 76 },
          { name: "Perú", logo: getTeamLogoPath("Perú"), media: 76 },
          { name: "Paraguay", logo: getTeamLogoPath("Paraguay"), media: 74 },
          { name: "Venezuela", logo: getTeamLogoPath("Venezuela"), media: 71 },
          { name: "Bolivia", logo: getTeamLogoPath("Bolivia"), media: 68 },
        ],
      },
      {
        id: 36,
        nombre: "CONCACAF",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Estados Unidos", logo: getTeamLogoPath("Estados Unidos"), media: 80 },
          { name: "México", logo: getTeamLogoPath("México"), media: 77 },
          { name: "Costa Rica", logo: getTeamLogoPath("Costa Rica"), media: 74 },
          { name: "Canadá", logo: getTeamLogoPath("Canadá"), media: 73 },
          { name: "Panamá", logo: getTeamLogoPath("Panamá"), media: 69 },
          { name: "Honduras", logo: getTeamLogoPath("Honduras"), media: 67 },
          { name: "Jamaica", logo: getTeamLogoPath("Jamaica"), media: 67 },
          { name: "El Salvador", logo: getTeamLogoPath("El Salvador"), media: 60 },
          { name: "Belice", logo: getTeamLogoPath("Belice"), media: 44 },
          { name: "Guatemala", logo: getTeamLogoPath("Guatemala"), media: 63 },
          { name: "Nicaragua", logo: getTeamLogoPath("Nicaragua"), media: 63 },
          { name: "Groenlandia", logo: getTeamLogoPath("Groenlandia"), media: 40 },
          { name: "Anguila", logo: getTeamLogoPath("Anguila"), media: 26 },
          { name: "Antigua y Barbuda", logo: getTeamLogoPath("Antigua y Barbuda"), media: 38 },
          { name: "Aruba", logo: getTeamLogoPath("Aruba"), media: 41 },
          { name: "Bahamas", logo: getTeamLogoPath("Bahamas"), media: 33 },
          { name: "Barbados", logo: getTeamLogoPath("Barbados"), media: 42 },
          { name: "Bermudas", logo: getTeamLogoPath("Bermudas"), media: 55 },
          { name: "Bonaire", logo: getTeamLogoPath("Bonaire"), media: 32 },
          { name: "Cuba", logo: getTeamLogoPath("Cuba"), media: 57 },
          { name: "Curazao", logo: getTeamLogoPath("Curazao"), media: 56 },
          { name: "Dominica", logo: getTeamLogoPath("Dominica"), media: 36 },
          { name: "Granada", logo: getTeamLogoPath("Granada"), media: 44 },
          { name: "Guadalupe", logo: getTeamLogoPath("Guadalupe"), media: 51 },
          { name: "Guyana", logo: getTeamLogoPath("Guyana"), media: 46 },
          { name: "Guayana Francesa", logo: getTeamLogoPath("Guayana Francesa"), media: 52 },
          { name: "Haití", logo: getTeamLogoPath("Haití"), media: 59 },
          { name: "Islas Caimán", logo: getTeamLogoPath("Islas Caimán"), media: 35 },
          { name: "Islas Turcas y Caicos", logo: getTeamLogoPath("Islas Turcas y Caicos"), media: 29 },
          { name: "Islas Vírgenes Británicas", logo: getTeamLogoPath("Islas Vírgenes Británicas"), media: 28 },
          { name: "Islas Vírgenes Estadounidenses", logo: getTeamLogoPath("Islas Vírgenes Estadounidenses"), media: 30 },
          { name: "Martinica", logo: getTeamLogoPath("Martinica"), media: 56 },
          { name: "Montserrat", logo: getTeamLogoPath("Montserrat"), media: 25 },
          { name: "Puerto Rico", logo: getTeamLogoPath("Puerto Rico"), media: 51 },
          { name: "República Dominicana", logo: getTeamLogoPath("República Dominicana"), media: 56 },
          { name: "Saint-Martin", logo: getTeamLogoPath("Saint-Martin"), media: 42 },
          { name: "San Cristóbal y Nieves", logo: getTeamLogoPath("San Cristóbal y Nieves"), media: 39 },
          { name: "San Vicente y las Granadinas", logo: getTeamLogoPath("San Vicente y las Granadinas"), media: 51 },
          { name: "Sint Maarten", logo: getTeamLogoPath("Sint Maarten"), media: 48 },
          { name: "Surinam", logo: getTeamLogoPath("Surinam"), media: 64 },
          { name: "Trinidad y Tobago", logo: getTeamLogoPath("Trinidad y Tobago"), media: 59 },
          { name: "Santa Lucía", logo: getTeamLogoPath("Santa Lucía"), media: 48 },
        ],
      },
      {
        id: 37,
        nombre: "UEFA",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Francia", logo: getTeamLogoPath("Francia"), media: 87 },
          { name: "España", logo: getTeamLogoPath("España"), media: 86 },
          { name: "Inglaterra", logo: getTeamLogoPath("Inglaterra"), media: 84 },
          { name: "Croacia", logo: getTeamLogoPath("Croacia"), media: 83 },
          { name: "Portugal", logo: getTeamLogoPath("Portugal"), media: 83 },
          { name: "Alemania", logo: getTeamLogoPath("Alemania"), media: 82 },
          { name: "Bélgica", logo: getTeamLogoPath("Bélgica"), media: 82 },
          { name: "Italia", logo: getTeamLogoPath("Italia"), media: 82 },
          { name: "Países Bajos", logo: getTeamLogoPath("Países Bajos"), media: 82 },
          { name: "Suiza", logo: getTeamLogoPath("Suiza"), media: 80 },
          { name: "Rusia", logo: getTeamLogoPath("Rusia"), media: 79 },
          { name: "Serbia", logo: getTeamLogoPath("Serbia"), media: 79 },
          { name: "Dinamarca", logo: getTeamLogoPath("Dinamarca"), media: 78 },
          { name: "Noruega", logo: getTeamLogoPath("Noruega"), media: 78 },
          { name: "Polonia", logo: getTeamLogoPath("Polonia"), media: 77 },
          { name: "Austria", logo: getTeamLogoPath("Austria"), media: 76 },
          { name: "República Checa", logo: getTeamLogoPath("República Checa"), media: 76 },
          { name: "Suecia", logo: getTeamLogoPath("Suecia"), media: 76 },
          { name: "Escocia", logo: getTeamLogoPath("Escocia"), media: 75 },
          { name: "Ucrania", logo: getTeamLogoPath("Ucrania"), media: 75 },
          { name: "Georgia", logo: getTeamLogoPath("Georgia"), media: 74 },
          { name: "Turquía", logo: getTeamLogoPath("Turquía"), media: 74 },
          { name: "Albania", logo: getTeamLogoPath("Albania"), media: 73 },
          { name: "Gales", logo: getTeamLogoPath("Gales"), media: 73 },
          { name: "Hungría", logo: getTeamLogoPath("Hungría"), media: 73 },
          { name: "Grecia", logo: getTeamLogoPath("Grecia"), media: 72 },
          { name: "Irlanda", logo: getTeamLogoPath("Irlanda"), media: 72 },
          { name: "Finlandia", logo: getTeamLogoPath("Finlandia"), media: 71 },
          { name: "Rumania", logo: getTeamLogoPath("Rumania"), media: 71 },
          { name: "Islandia", logo: getTeamLogoPath("Islandia"), media: 73 },
          { name: "Macedonia del Norte", logo: getTeamLogoPath("Macedonia del Norte"), media: 70 },
          { name: "Eslovenia", logo: getTeamLogoPath("Eslovenia"), media: 68 },
          { name: "Israel", logo: getTeamLogoPath("Israel"), media: 68 },
          { name: "Irlanda del Norte", logo: getTeamLogoPath("Irlanda del Norte"), media: 67 },
          { name: "Eslovaquia", logo: getTeamLogoPath("Eslovaquia"), media: 65 },
          { name: "Armenia", logo: getTeamLogoPath("Armenia"), media: 64 },
          { name: "Bosnia y Herzegovina", logo: getTeamLogoPath("Bosnia y Herzegovina"), media: 64 },
          { name: "Bulgaria", logo: getTeamLogoPath("Bulgaria"), media: 64 },
          { name: "Azerbaiyán", logo: getTeamLogoPath("Azerbaiyán"), media: 62 },
          { name: "Bielorrusia", logo: getTeamLogoPath("Bielorrusia"), media: 61 },
          { name: "Kazajistán", logo: getTeamLogoPath("Kazajistán"), media: 61 },
          { name: "Moldavia", logo: getTeamLogoPath("Moldavia"), media: 61 },
          { name: "Montenegro", logo: getTeamLogoPath("Montenegro"), media: 60 },
          { name: "Lituania", logo: getTeamLogoPath("Lituania"), media: 59 },
          { name: "Chipre", logo: getTeamLogoPath("Chipre"), media: 58 },
          { name: "Estonia", logo: getTeamLogoPath("Estonia"), media: 57 },
          { name: "Kosovo", logo: getTeamLogoPath("Kosovo"), media: 57 },
          { name: "Letonia", logo: getTeamLogoPath("Letonia"), media: 55 },
          { name: "Islas Feroe", logo: getTeamLogoPath("Islas Feroe"), media: 62 },
          { name: "Luxemburgo", logo: getTeamLogoPath("Luxemburgo"), media: 48 },
          { name: "Malta", logo: getTeamLogoPath("Malta"), media: 45 },
          { name: "Gibraltar", logo: getTeamLogoPath("Gibraltar"), media: 43 },
          { name: "Andorra", logo: getTeamLogoPath("Andorra"), media: 41 },
          { name: "Liechtenstein", logo: getTeamLogoPath("Liechtenstein"), media: 39 },
          { name: "San Marino", logo: getTeamLogoPath("San Marino"), media: 41 },
        ],
      },
      {
        id: 38,
        nombre: "OFC",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Nueva Zelanda", logo: getTeamLogoPath("Nueva Zelanda"), media: 66 },
          { name: "Islas Salomón", logo: getTeamLogoPath("Islas Salomón"), media: 44 },
          { name: "Nueva Caledonia", logo: getTeamLogoPath("Nueva Caledonia"), media: 51 },
          { name: "Tahití", logo: getTeamLogoPath("Tahití"), media: 45 },
          { name: "Fiji", logo: getTeamLogoPath("Fiji"), media: 44 },
          { name: "Vanuatu", logo: getTeamLogoPath("Vanuatu"), media: 46 },
          { name: "Papúa Nueva Guinea", logo: getTeamLogoPath("Papúa Nueva Guinea"), media: 49 },
          { name: "Samoa", logo: getTeamLogoPath("Samoa"), media: 41 },
          { name: "Islas Cook", logo: getTeamLogoPath("Islas Cook"), media: 31 },
          { name: "Samoa Americana", logo: getTeamLogoPath("Samoa Americana"), media: 36 },
          { name: "Tonga", logo: getTeamLogoPath("Tonga"), media: 39 },
          { name: "Tuvalu", logo: getTeamLogoPath("Tuvalu"), media: 30 },
          { name: "Kiribati", logo: getTeamLogoPath("Kiribati"), media: 17 },
          { name: "Islas Marshall", logo: getTeamLogoPath("Islas Marshall"), media: 14 },
          { name: "Micronesia", logo: getTeamLogoPath("Micronesia"), media: 1 },
          { name: "Palaos", logo: getTeamLogoPath("Palaos"), media: 1 },
          { name: "Nauru", logo: getTeamLogoPath("Nauru"), media: 1 },
          { name: "Wallis y Futuna", logo: getTeamLogoPath("Wallis y Futuna"), media: 1 },
          { name: "Niue", logo: getTeamLogoPath("Niue"), media: 1 },
          { name: "Tokelau", logo: getTeamLogoPath("Tokelau"), media: 1 },
        ],
      },
      {
        id: 39,
        nombre: "CAF",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Senegal", logo: getTeamLogoPath("Senegal"), media: 80 },
          { name: "Argelia", logo: getTeamLogoPath("Argelia"), media: 77 },
          { name: "Marruecos", logo: getTeamLogoPath("Marruecos"), media: 77 },
          { name: "Egipto", logo: getTeamLogoPath("Egipto"), media: 76 },
          { name: "Camerún", logo: getTeamLogoPath("Camerún"), media: 75 },
          { name: "Ghana", logo: getTeamLogoPath("Ghana"), media: 75 },
          { name: "Nigeria", logo: getTeamLogoPath("Nigeria"), media: 75 },
          { name: "Túnez", logo: getTeamLogoPath("Túnez"), media: 75 },
          { name: "Costa de Marfil", logo: getTeamLogoPath("Costa de Marfil"), media: 75 },
          { name: "R. D. del Congo", logo: getTeamLogoPath("R. D. del Congo"), media: 73 },
          { name: "Guinea", logo: getTeamLogoPath("Guinea"), media: 65 },
          { name: "Sudáfrica", logo: getTeamLogoPath("Sudáfrica"), media: 70 },
          { name: "Burkina Faso", logo: getTeamLogoPath("Burkina Faso"), media: 68 },
          { name: "Malí", logo: getTeamLogoPath("Malí"), media: 67 },
          { name: "Gabón", logo: getTeamLogoPath("Gabón"), media: 65 },
          { name: "Uganda", logo: getTeamLogoPath("Uganda"), media: 64 },
          { name: "Libia", logo: getTeamLogoPath("Libia"), media: 57 },
          { name: "Cabo Verde", logo: getTeamLogoPath("Cabo Verde"), media: 62 },
          { name: "Gambia", logo: getTeamLogoPath("Gambia"), media: 62 },
          { name: "Guinea Bissau", logo: getTeamLogoPath("Guinea Bissau"), media: 60 },
          { name: "Guinea Ecuatorial", logo: getTeamLogoPath("Guinea Ecuatorial"), media: 58 },
          { name: "Liberia", logo: getTeamLogoPath("Liberia"), media: 61 },
          { name: "Mauritania", logo: getTeamLogoPath("Mauritania"), media: 55 },
          { name: "Sierra Leona", logo: getTeamLogoPath("Sierra Leona"), media: 62 },
          { name: "Benín", logo: getTeamLogoPath("Benín"), media: 63 },
          { name: "Níger", logo: getTeamLogoPath("Níger"), media: 61 },
          { name: "Togo", logo: getTeamLogoPath("Togo"), media: 59 },
          { name: "Chad", logo: getTeamLogoPath("Chad"), media: 51 },
          { name: "Congo", logo: getTeamLogoPath("Congo"), media: 60 },
          { name: "República Centroafricana", logo: getTeamLogoPath("República Centroafricana"), media: 62 },
          { name: "Santo Tomé y Príncipe", logo: getTeamLogoPath("Santo Tomé y Príncipe"), media: 52 },
          { name: "Burundi", logo: getTeamLogoPath("Burundi"), media: 56 },
          { name: "Eritrea", logo: getTeamLogoPath("Eritrea"), media: 59 },
          { name: "Etiopía", logo: getTeamLogoPath("Etiopía"), media: 59 },
          { name: "Kenia", logo: getTeamLogoPath("Kenia"), media: 57 },
          { name: "Ruanda", logo: getTeamLogoPath("Ruanda"), media: 53 },
          { name: "Somalia", logo: getTeamLogoPath("Somalia"), media: 50 },
          { name: "Sudán", logo: getTeamLogoPath("Sudán"), media: 61 },
          { name: "Sudán del Sur", logo: getTeamLogoPath("Sudán del Sur"), media: 49 },
          { name: "Tanzania", logo: getTeamLogoPath("Tanzania"), media: 58 },
          { name: "Yibuti", logo: getTeamLogoPath("Yibuti"), media: 53 },
          { name: "Angola", logo: getTeamLogoPath("Angola"), media: 59 },
          { name: "Botswana", logo: getTeamLogoPath("Botswana"), media: 58 },
          { name: "Comores", logo: getTeamLogoPath("Comores"), media: 60 },
          { name: "Esuatini", logo: getTeamLogoPath("Esuatini"), media: 46 },
          { name: "Lesoto", logo: getTeamLogoPath("Lesoto"), media: 51 },
          { name: "Madagascar", logo: getTeamLogoPath("Madagascar"), media: 64 },
          { name: "Malawi", logo: getTeamLogoPath("Malawi"), media: 56 },
          { name: "Mauricio", logo: getTeamLogoPath("Mauricio"), media: 47 },
          { name: "Mozambique", logo: getTeamLogoPath("Mozambique"), media: 63 },
          { name: "Namibia", logo: getTeamLogoPath("Namibia"), media: 61 },
          { name: "Seychelles", logo: getTeamLogoPath("Seychelles"), media: 43 },
          { name: "Zambia", logo: getTeamLogoPath("Zambia"), media: 63 },
          { name: "Zimbabwe", logo: getTeamLogoPath("Zimbabwe"), media: 53 },
        ],
      },
      {
        id: 40,
        nombre: "AFC",
        pais: "Internacional",
        categoria: 1,
        teams: [
          { name: "Japón", logo: getTeamLogoPath("Japón"), media: 79 },
          { name: "Australia", logo: getTeamLogoPath("Australia"), media: 78 },
          { name: "Arabia Saudita", logo: getTeamLogoPath("Arabia Saudita"), media: 77 },
          { name: "Corea del Sur", logo: getTeamLogoPath("Corea del Sur"), media: 76 },
          { name: "Irán", logo: getTeamLogoPath("Irán"), media: 71 },
          { name: "Qatar", logo: getTeamLogoPath("Qatar"), media: 70 },
          { name: "China", logo: getTeamLogoPath("China"), media: 65 },
          { name: "Emiratos Árabes Unidos", logo: getTeamLogoPath("Emiratos Árabes Unidos"), media: 67 },
          { name: "Irak", logo: getTeamLogoPath("Irak"), media: 66 },
          { name: "Uzbekistán", logo: getTeamLogoPath("Uzbekistán"), media: 66 },
          { name: "Siria", logo: getTeamLogoPath("Siria"), media: 64 },
          { name: "Omán", logo: getTeamLogoPath("Omán"), media: 62 },
          { name: "Vietnam", logo: getTeamLogoPath("Vietnam"), media: 54 },
          { name: "Malasia", logo: getTeamLogoPath("Malasia"), media: 59 },
          { name: "Corea del Norte", logo: getTeamLogoPath("Corea del Norte"), media: 64 },
          { name: "Birmania", logo: getTeamLogoPath("Birmania"), media: 47 },
          { name: "Brunei", logo: getTeamLogoPath("Brunei"), media: 48 },
          { name: "Camboya", logo: getTeamLogoPath("Camboya"), media: 47 },
          { name: "Filipinas", logo: getTeamLogoPath("Filipinas"), media: 49 },
          { name: "Indonesia", logo: getTeamLogoPath("Indonesia"), media: 58 },
          { name: "Laos", logo: getTeamLogoPath("Laos"), media: 50 },
          { name: "Turkmenistán", logo: getTeamLogoPath("Turkmenistán"), media: 55 },
          { name: "Singapur", logo: getTeamLogoPath("Singapur"), media: 52 },
          { name: "Tailandia", logo: getTeamLogoPath("Tailandia"), media: 63 },
          { name: "Timor Oriental", logo: getTeamLogoPath("Timor Oriental"), media: 46 },
          { name: "Bahrein", logo: getTeamLogoPath("Bahrein"), media: 61 },
          { name: "Jordania", logo: getTeamLogoPath("Jordania"), media: 68 },
          { name: "Palestina", logo: getTeamLogoPath("Palestina"), media: 57 },
          { name: "Kirguistán", logo: getTeamLogoPath("Kirguistán"), media: 61 },
          { name: "India", logo: getTeamLogoPath("India"), media: 52 },
          { name: "Líbano", logo: getTeamLogoPath("Líbano"), media: 56 },
          { name: "Tayikistán", logo: getTeamLogoPath("Tayikistán"), media: 61 },
          { name: "Kuwait", logo: getTeamLogoPath("Kuwait"), media: 53 },
          { name: "Hong Kong", logo: getTeamLogoPath("Hong Kong"), media: 51 },
          { name: "China Taipei", logo: getTeamLogoPath("China Taipei"), media: 49 },
          { name: "Maldivas", logo: getTeamLogoPath("Maldivas"), media: 44 },
          { name: "Yemen", logo: getTeamLogoPath("Yemen"), media: 52 },
          { name: "Afganistán", logo: getTeamLogoPath("Afganistán"), media: 48 },
          { name: "Macao", logo: getTeamLogoPath("Macao"), media: 50 },
          { name: "Mongolia", logo: getTeamLogoPath("Mongolia"), media: 46 },
          { name: "Bután", logo: getTeamLogoPath("Bután"), media: 35 },
          { name: "Bangladesh", logo: getTeamLogoPath("Bangladesh"), media: 49 },
          { name: "Pakistán", logo: getTeamLogoPath("Pakistán"), media: 49 },
          { name: "Guam", logo: getTeamLogoPath("Guam"), media: 42 },
          { name: "Sri Lanka", logo: getTeamLogoPath("Sri Lanka"), media: 51 },
          { name: "Nepal", logo: getTeamLogoPath("Nepal"), media: 53 },
          { name: "Islas Marianas del Norte", logo: getTeamLogoPath("Islas Marianas del Norte"), media: 27 },
        ],
      },
    ],
  },
  {
    name: "Islandia",
    leagues: [
      {
        id: 11,
        nombre: "Besta deild",
        pais: "Islandia",
        categoria: 1,
        teams: [
          { name: "Valur", logo: getTeamLogoPath("Valur"), media: 99 },
          { name: "Breidablik", logo: getTeamLogoPath("Breidablik"), media: 61 },
          { name: "FH", logo: getTeamLogoPath("FH"), media: 57 },
          { name: "Fram", logo: getTeamLogoPath("Fram"), media: 53 },
          { name: "Vestri", logo: getTeamLogoPath("Vestri"), media: 57 },
          { name: "IBV", logo: getTeamLogoPath("IBV"), media: 54 },
          { name: "KA", logo: getTeamLogoPath("KA"), media: 55 },
          { name: "Keflavik", logo: getTeamLogoPath("Keflavik"), media: 52 },
          { name: "KR", logo: getTeamLogoPath("KR"), media: 59 },
          { name: "Stjarnan", logo: getTeamLogoPath("Stjarnan"), media: 57 },
          { name: "Vikingur", logo: getTeamLogoPath("Vikingur"), media: 62 },
          { name: "ÍA", logo: getTeamLogoPath("ÍA"), media: 54 },
        ],
      },
      {
        id: 26,
        nombre: "1. deild karla",
        pais: "Islandia",
        categoria: 2,
        teams: [
          { name: "Fylkir", logo: getTeamLogoPath("Fylkir"), media: 49 },
          { name: "ÍR", logo: getTeamLogoPath("ÍR"), media: 46 },
          { name: "Afturelding", logo: getTeamLogoPath("Afturelding"), media: 51 },
          { name: "Fjolnir", logo: getTeamLogoPath("Fjolnir"), media: 50 },
          { name: "Grindavik", logo: getTeamLogoPath("Grindavik"), media: 51 },
          { name: "Grotta", logo: getTeamLogoPath("Grotta"), media: 49 },
          { name: "Leiknir R", logo: getTeamLogoPath("Leiknir R"), media: 49 },
          { name: "Njardvik", logo: getTeamLogoPath("Njardvik"), media: 52 },
          { name: "Selfoss", logo: getTeamLogoPath("Selfoss"), media: 50 },
          { name: "Thor", logo: getTeamLogoPath("Thor"), media: 49 },
          { name: "Throttur", logo: getTeamLogoPath("Throttur"), media: 51 },
          { name: "HK", logo: getTeamLogoPath("HK"), media: 54 },
        ],
      },
    ],
  },
  {
    name: "Italia",
    leagues: [
      {
        id: 5,
        nombre: "Serie A",
        pais: "Italia",
        categoria: 1,
        teams: [
          { name: "Juventus", logo: getTeamLogoPath("Juventus"), media: 83 },
          { name: "Inter", logo: getTeamLogoPath("Inter"), media: 86 },
          { name: "Milan", logo: getTeamLogoPath("Milan"), media: 84 },
          { name: "Napoli", logo: getTeamLogoPath("Napoli"), media: 84 },
          { name: "Roma", logo: getTeamLogoPath("Roma"), media: 82 },
          { name: "Lazio", logo: getTeamLogoPath("Lazio"), media: 78 },
          { name: "Atalanta", logo: getTeamLogoPath("Atalanta"), media: 80 },
          { name: "Fiorentina", logo: getTeamLogoPath("Fiorentina"), media: 75 },
          { name: "Torino", logo: getTeamLogoPath("Torino"), media: 74 },
          { name: "Bologna", logo: getTeamLogoPath("Bologna"), media: 77 },
          { name: "Udinese", logo: getTeamLogoPath("Udinese"), media: 76 },
          { name: "Sassuolo", logo: getTeamLogoPath("Sassuolo"), media: 75 },
          { name: "Monza", logo: getTeamLogoPath("Monza"), media: 70 },
          { name: "Empoli", logo: getTeamLogoPath("Empoli"), media: 73 },
          { name: "Salernitana", logo: getTeamLogoPath("Salernitana"), media: 69 },
          { name: "Lecce", logo: getTeamLogoPath("Lecce"), media: 70 },
          { name: "Hellas Verona", logo: getTeamLogoPath("Hellas Verona"), media: 71 },
          { name: "Sampdoria", logo: getTeamLogoPath("Sampdoria"), media: 70 },
          { name: "Cremonese", logo: getTeamLogoPath("Cremonese"), media: 73 },
          { name: "Spezia", logo: getTeamLogoPath("Spezia"), media: 66 },
        ],
      },
      {
        id: 28,
        nombre: "Serie B",
        pais: "Italia",
        categoria: 2,
        teams: [
          { name: "Genoa", logo: getTeamLogoPath("Genoa"), media: 73 },
          { name: "Cagliari", logo: getTeamLogoPath("Cagliari"), media: 69 },
          { name: "Frosinone", logo: getTeamLogoPath("Frosinone"), media: 68 },
          { name: "Parma", logo: getTeamLogoPath("Parma"), media: 72 },
          { name: "Venezia", logo: getTeamLogoPath("Venezia"), media: 67 },
          { name: "Brescia", logo: getTeamLogoPath("Brescia"), media: 68 },
          { name: "Pisa", logo: getTeamLogoPath("Pisa"), media: 71 },
          { name: "Bari", logo: getTeamLogoPath("Bari"), media: 65 },
          { name: "Como", logo: getTeamLogoPath("Como"), media: 73 },
          { name: "Palermo", logo: getTeamLogoPath("Palermo"), media: 71 },
          { name: "Crotone", logo: getTeamLogoPath("Crotone"), media: 65 },
          { name: "Pescara", logo: getTeamLogoPath("Pescara"), media: 62 },
          { name: "Südtirol", logo: getTeamLogoPath("Südtirol"), media: 67 },
          { name: "Catania", logo: getTeamLogoPath("Catania"), media: 61 },
          { name: "Avellino", logo: getTeamLogoPath("Avellino"), media: 65 },
          { name: "Catanzaro", logo: getTeamLogoPath("Catanzaro"), media: 66 },
          { name: "Reggiana", logo: getTeamLogoPath("Reggiana"), media: 65 },
          { name: "Juve Stabia", logo: getTeamLogoPath("Juve Stabia"), media: 66 },
          { name: "Carrarese", logo: getTeamLogoPath("Carrarese"), media: 64 },
          { name: "Virtus Entella", logo: getTeamLogoPath("Virtus Entella"), media: 63 },
        ],
      },
      {
        id: 52,
        nombre: "Serie C",
        pais: "Italia",
        categoria: 3,
        teams: [
          { name: "SPAL", logo: getTeamLogoPath("SPAL"), media: 62 },
          { name: "Siena", logo: getTeamLogoPath("Siena"), media: 61 },
          { name: "Benevento", logo: getTeamLogoPath("Benevento"), media: 59 },
          { name: "Reggina", logo: getTeamLogoPath("Reggina"), media: 60 },
          { name: "AlbinoLeffe", logo: getTeamLogoPath("AlbinoLeffe"), media: 63 },
          { name: "Ascoli", logo: getTeamLogoPath("Ascoli"), media: 60 },
          { name: "Cittadella", logo: getTeamLogoPath("Cittadella"), media: 59 },
          { name: "Cosenza", logo: getTeamLogoPath("Cosenza"), media: 58 },
          { name: "Messina", logo: getTeamLogoPath("Messina"), media: 60 },
          { name: "Carpi", logo: getTeamLogoPath("Carpi"), media: 62 },
          { name: "Cesena", logo: getTeamLogoPath("Cesena"), media: 56 },
          { name: "Modena", logo: getTeamLogoPath("Modena"), media: 66 },
          { name: "Piacenza", logo: getTeamLogoPath("Piacenza"), media: 63 },
          { name: "Ternana", logo: getTeamLogoPath("Ternana"), media: 59 },
          { name: "Padova", logo: getTeamLogoPath("Padova"), media: 61 },
          { name: "Lecco", logo: getTeamLogoPath("Lecco"), media: 62 },
          { name: "Perugia", logo: getTeamLogoPath("Perugia"), media: 64 },
          { name: "Livorno", logo: getTeamLogoPath("Livorno"), media: 57 },
          { name: "Treviso", logo: getTeamLogoPath("Treviso"), media: 51 },
          { name: "Chievo Verona", logo: getTeamLogoPath("Chievo Verona"), media: 62 },
        ],
      },
    ],
  },
  {
    name: "México",
    leagues: [
      {
        id: 8,
        nombre: "Liga MX",
        pais: "México",
        categoria: 1,
        teams: [
          { name: "América", logo: getTeamLogoPath("América"), media: 75 },
          { name: "Chivas", logo: getTeamLogoPath("Chivas"), media: 73 },
          { name: "Cruz Azul", logo: getTeamLogoPath("Cruz Azul"), media: 74 },
          { name: "Monterrey", logo: getTeamLogoPath("Monterrey"), media: 76 },
          { name: "Pachuca", logo: getTeamLogoPath("Pachuca"), media: 73 },
          { name: "Pumas", logo: getTeamLogoPath("Pumas"), media: 74 },
          { name: "Tigres", logo: getTeamLogoPath("Tigres"), media: 77 },
          { name: "Toluca", logo: getTeamLogoPath("Toluca"), media: 74 },
          { name: "Tijuana", logo: getTeamLogoPath("Tijuana"), media: 71 },
          { name: "Juárez", logo: getTeamLogoPath("Juárez"), media: 69 },
          { name: "Santos Laguna", logo: getTeamLogoPath("Santos Laguna"), media: 69 },
          { name: "Querétaro", logo: getTeamLogoPath("Querétaro"), media: 68 },
          { name: "Necaxa", logo: getTeamLogoPath("Necaxa"), media: 66 },
          { name: "Atlas", logo: getTeamLogoPath("Atlas"), media: 68 },
          { name: "Atlético San Luis", logo: getTeamLogoPath("Atlético San Luis"), media: 65 },
          { name: "Mazatlán", logo: getTeamLogoPath("Mazatlán"), media: 63 },
          { name: "León", logo: getTeamLogoPath("León"), media: 67 },
          { name: "Puebla", logo: getTeamLogoPath("Puebla"), media: 66 },
        ],
      },
    ],
  },
  {
    name: "Países Bajos",
    leagues: [
      {
        id: 10,
        nombre: "Eredivisie",
        pais: "Países Bajos",
        categoria: 1,
        teams: [
          { name: "PSV", logo: getTeamLogoPath("PSV"), media: 79 },
          { name: "Ajax", logo: getTeamLogoPath("Ajax"), media: 76 },
          { name: "Feyenoord", logo: getTeamLogoPath("Feyenoord"), media: 76 },
          { name: "AZ Alkmaar", logo: getTeamLogoPath("AZ Alkmaar"), media: 73 },
          { name: "Twente", logo: getTeamLogoPath("Twente"), media: 71 },
          { name: "NEC Nijmegen", logo: getTeamLogoPath("NEC Nijmegen"), media: 71 },
          { name: "Utrecht", logo: getTeamLogoPath("Utrecht"), media: 73 },
          { name: "Go Ahead Eagles", logo: getTeamLogoPath("Go Ahead Eagles"), media: 69 },
          { name: "Sparta Rotterdam", logo: getTeamLogoPath("Sparta Rotterdam"), media: 69 },
          { name: "Fortuna Sittard", logo: getTeamLogoPath("Fortuna Sittard"), media: 68 },
          { name: "Groningen", logo: getTeamLogoPath("Groningen"), media: 68 },
          { name: "Heerenveen", logo: getTeamLogoPath("Heerenveen"), media: 68 },
          { name: "NAC Breda", logo: getTeamLogoPath("NAC Breda"), media: 67 },
          { name: "PEC Zwolle", logo: getTeamLogoPath("PEC Zwolle"), media: 66 },
          { name: "Excelsior", logo: getTeamLogoPath("Excelsior"), media: 66 },
          { name: "Heracles Almelo", logo: getTeamLogoPath("Heracles Almelo"), media: 66 },
          { name: "Volendam", logo: getTeamLogoPath("Volendam"), media: 65 },
          { name: "Telstar", logo: getTeamLogoPath("Telstar"), media: 65 },
        ],
      },
    ],
  },
  {
    name: "Paraguay",
    leagues: [
      {
        id: 20,
        nombre: "Primera División",
        pais: "Paraguay",
        categoria: 1,
        teams: [
          { name: "Olimpia", logo: getTeamLogoPath("Olimpia"), media: 67 },
          { name: "Nacional (Par)", logo: getTeamLogoPath("Nacional (Par)"), media: 62 },
          { name: "Cerro Porteño", logo: getTeamLogoPath("Cerro Porteño"), media: 69 },
          { name: "Libertad", logo: getTeamLogoPath("Libertad"), media: 71 },
          { name: "Guaraní", logo: getTeamLogoPath("Guaraní"), media: 65 },
          { name: "2 de Mayo", logo: getTeamLogoPath("2 de Mayo"), media: 60 },
          { name: "Recoleta", logo: getTeamLogoPath("Recoleta"), media: 62 },
          { name: "Sportivo Luqueño", logo: getTeamLogoPath("Sportivo Luqueño"), media: 62 },
          { name: "Trinidense", logo: getTeamLogoPath("Trinidense"), media: 65 },
          { name: "Sportivo Ameliano", logo: getTeamLogoPath("Sportivo Ameliano"), media: 63 },
          { name: "Rubio Ñu", logo: getTeamLogoPath("Rubio Ñu"), media: 59 },
          { name: "San Lorenzo (Par)", logo: getTeamLogoPath("San Lorenzo (Par)"), media: 58 },
        ],
      },
    ],
  },
  {
    name: "Portugal",
    leagues: [
      {
        id: 9,
        nombre: "Liga Portuguesa",
        pais: "Portugal",
        categoria: 1,
        teams: [
          { name: "Benfica", logo: getTeamLogoPath("Benfica"), media: 81 },
          { name: "Sporting Lisboa", logo: getTeamLogoPath("Sporting Lisboa"), media: 80 },
          { name: "Porto", logo: getTeamLogoPath("Porto"), media: 82 },
          { name: "Sporting Braga", logo: getTeamLogoPath("Sporting Braga"), media: 75 },
          { name: "Famalicão", logo: getTeamLogoPath("Famalicão"), media: 70 },
          { name: "Casa Pia", logo: getTeamLogoPath("Casa Pia"), media: 66 },
          { name: "Santa Clara", logo: getTeamLogoPath("Santa Clara"), media: 70 },
          { name: "Estoril", logo: getTeamLogoPath("Estoril"), media: 70 },
          { name: "Rio Ave", logo: getTeamLogoPath("Rio Ave"), media: 69 },
          { name: "Arouca", logo: getTeamLogoPath("Arouca"), media: 67 },
          { name: "Moreirense", logo: getTeamLogoPath("Moreirense"), media: 70 },
          { name: "Aves", logo: getTeamLogoPath("Aves"), media: 62 },
          { name: "Gil Vicente", logo: getTeamLogoPath("Gil Vicente"), media: 71 },
          { name: "Vitória Guimarães", logo: getTeamLogoPath("Vitória Guimarães"), media: 70 },
          { name: "Tondela", logo: getTeamLogoPath("Tondela"), media: 64 },
          { name: "Alverca", logo: getTeamLogoPath("Alverca"), media: 66 },
          { name: "Nacional de Madeira", logo: getTeamLogoPath("Nacional de Madeira"), media: 67 },
          { name: "Estrela da Amadora", logo: getTeamLogoPath("Estrela da Amadora"), media: 66 },
        ],
      },
    ],
  },
  {
    name: "Uruguay",
    leagues: [
      {
        id: 17,
        nombre: "Liga AUF Uruguaya",
        pais: "Uruguay",
        categoria: 1,
        teams: [
          { name: "Peñarol", logo: getTeamLogoPath("Peñarol"), media: 72 },
          { name: "Nacional", logo: getTeamLogoPath("Nacional"), media: 71 },
          { name: "Montevideo City Torque", logo: getTeamLogoPath("Montevideo City Torque"), media: 67 },
          { name: "Boston River", logo: getTeamLogoPath("Boston River"), media: 66 },
          { name: "Cerro Largo", logo: getTeamLogoPath("Cerro Largo"), media: 65 },
          { name: "Liverpool (U)", logo: getTeamLogoPath("Liverpool (U)"), media: 67 },
          { name: "Cerro", logo: getTeamLogoPath("Cerro"), media: 64 },
          { name: "Defensor Sporting", logo: getTeamLogoPath("Defensor Sporting"), media: 65 },
          { name: "Danubio", logo: getTeamLogoPath("Danubio"), media: 66 },
          { name: "Progreso", logo: getTeamLogoPath("Progreso"), media: 63 },
          { name: "Racing (Montevideo)", logo: getTeamLogoPath("Racing (Montevideo)"), media: 64 },
          { name: "Juventud de Las Piedras", logo: getTeamLogoPath("Juventud de Las Piedras"), media: 62 },
          { name: "River Plate (U)", logo: getTeamLogoPath("River Plate (U)"), media: 60 },
          { name: "Miramar Misiones", logo: getTeamLogoPath("Miramar Misiones"), media: 59 },
          { name: "Plaza Colonia", logo: getTeamLogoPath("Plaza Colonia"), media: 61 },
          { name: "Montevideo Wanderers", logo: getTeamLogoPath("Montevideo Wanderers"), media: 62 },
        ],
      },
    ],
  },
];

  useEffect(() => {
  // en lugar de fetch, uso los hardcodeados
  setCountries(hardcodedCountries);
}, [])

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const ligasResponse = await fetch("https://localhost:7225/api/ligas");
        const equiposResponse = await fetch("https://localhost:7225/api/equipos");

        const ligas: League[] = await ligasResponse.json();
        const equipos = await equiposResponse.json();

        const ligasConEquipos: League[] = ligas.map((liga) => ({
          ...liga,
          teams: equipos
            .filter((eq: any) => eq.ligaId === liga.id)
            .map((eq: any) => ({
              name: eq.nombre,
              media: eq.media,
              logo: getTeamLogoPath(eq.nombre),
            })),
        }));

        const agrupadoPorPais: Country[] = [];
        ligasConEquipos.forEach((liga) => {
          const paisExistente = agrupadoPorPais.find((c) => c.name === liga.pais);
          if (paisExistente) {
            paisExistente.leagues.push(liga);
          } else {
            agrupadoPorPais.push({ name: liga.pais, leagues: [liga] });
          }
        });

        agrupadoPorPais.sort((a, b) => a.name.localeCompare(b.name));
        agrupadoPorPais.forEach((pais) => {
          pais.leagues.sort((a, b) => a.categoria - b.categoria);
        });

        setCountries(agrupadoPorPais);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []); */

  const getResolvedTeamLogo = (equipo: Team, country?: string) => {
    if (!country) return equipo.logo;

    return resolveTeamLogoPath(equipo.name, country);
  };

  const handleSeleccion = (equipo: Team) => {
    const countryName = selectedLeague?.pais ?? selectedCountry?.name;

    onSelectedTeam({
      ...equipo,
      logo: getResolvedTeamLogo(equipo, countryName),
    });
  };

  const siguientePais = () => {
    setSelectedCountryIndex((prev) => (prev + 1) % countries.length);
    setSelectedLeagueIndex(0);
  };

  const anteriorPais = () => {
    setSelectedCountryIndex((prev) => (prev - 1 + countries.length) % countries.length);
    setSelectedLeagueIndex(0);
  };

  const siguienteLiga = () => {
    if (!selectedCountry || !hasMultipleLeagues) return;
    setSelectedLeagueIndex((prev) => (prev + 1) % selectedCountry.leagues.length);
  };

  const anteriorLiga = () => {
  if (!selectedCountry || !hasMultipleLeagues) return;
    setSelectedLeagueIndex((prev) => (prev - 1 + selectedCountry.leagues.length) % selectedCountry.leagues.length);
  };

  return (
    <div className="selector-equipos">
      {/* Navegación de países */}
      <div className="paises-navegacion">
        <button onClick={anteriorPais} disabled={countries.length <= 1}>{"<"}</button>
        <span>{selectedCountry?.name}</span>
        <button onClick={siguientePais} disabled={countries.length <= 1}>{">"}</button>
      </div>

      {/* Navegación de ligas */}
      <div className="ligas-navegacion">
        <button onClick={anteriorLiga} disabled={!hasMultipleLeagues}>{"<"}</button>
        <span>{selectedLeague?.nombre}</span>
        <button onClick={siguienteLiga} disabled={!hasMultipleLeagues}>{">"}</button>
      </div>

      {/* Equipos */}
      <div className="equipos-grid">
        {selectedLeague?.teams
          ?.slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((equipo) => (
            <div
              key={equipo.name}
              className="equipo-card"
              onClick={() => handleSeleccion(equipo)}
            >
              <img
                src={getResolvedTeamLogo(equipo, selectedLeague.pais)}
                alt={equipo.name}
                className="escudos"
              />
              <span className="text name">{equipo.name}</span>
              <span className="text media">{equipo.media}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectorEquipos;
