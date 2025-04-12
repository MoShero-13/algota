import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box } from "@mui/material";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import countries from "../../data/countries.geo.json";

// Import country logos
import flage1 from "../../assets/flags/Austria.webp";
import flage2 from "../../assets/flags/China.webp";
import flage3 from "../../assets/flags/USA.webp";
import flage5 from "../../assets/flags/Chile.webp";
import flage6 from "../../assets/flags/Canada.webp";
import flage7 from "../../assets/flags/Greece.webp";
import flage8 from "../../assets/flags/Hungary.webp";
import flage9 from "../../assets/flags/UK.webp";
import flage10 from "../../assets/flags/France.webp";
import flage11 from "../../assets/flags/Cyprus.webp";
import flage12 from "../../assets/flags/Germany.webp";
import flage16 from "../../assets/flags/Netherlands.webp";
import flage17 from "../../assets/flags/Sweden.webp";
import flage19 from "../../assets/flags/Malaysia.webp";
import flage20 from "../../assets/flags/Norway.webp";
import flage21 from "../../assets/flags/Romania.webp";
import flage22 from "../../assets/flags/Australia.webp";
import flage23 from "../../assets/flags/Venezuela.webp";
import flage24 from "../../assets/flags/Russia.webp";
import flage25 from "../../assets/flags/Poland.webp";
import flage26 from "../../assets/flags/New_Zealand.webp";
import flage27 from "../../assets/flags/Thailand.webp";
import flage28 from "../../assets/flags/Italy.webp";
import flage29 from "../../assets/flags/UAE.webp";
import flage30 from "../../assets/flags/Oman.webp";
import flage31 from "../../assets/flags/Kuwait.webp";
import flage32 from "../../assets/flags/Iraq.webp";
import flage34 from "../../assets/flags/Saudi_Arabia.webp";
import flage37 from "../../assets/flags/Libya.webp";
import flage39 from "../../assets/flags/Syria.webp";
import flage40 from "../../assets/flags/Qatar.webp";
import flage41 from "../../assets/flags/Lebanon.webp";
import flage42 from "../../assets/flags/Belgium.webp";
import { Place } from "@mui/icons-material";
// Create a custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
   <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css">  .st0{fill:#007236;}  </style> <g> <path class="st0" d="M256,0C159.969,0,82.109,77.859,82.109,173.906c0,100.719,80.016,163.688,123.297,238.719 C246.813,484.406,246.781,512,256,512s9.188-27.594,50.594-99.375c43.297-75.031,123.297-138,123.297-238.719 C429.891,77.859,352.031,0,256,0z M256,240.406c-36.734,0-66.516-29.781-66.516-66.5c0-36.75,29.781-66.531,66.516-66.531 s66.516,29.781,66.516,66.531C322.516,210.625,292.734,240.406,256,240.406z"></path> </g> </g></svg>`)}`,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [1, -34],
});

const oceanGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-180, 90],
            [180, 90],
            [180, -90],
            [-180, -90],
            [-180, 90],
          ],
        ],
      },
    },
  ],
};

const oceanStyle = {
  fillColor: "#005a2c   ", // لون البحر
  weight: 1,
  opacity: 1,
  color: "white",
  fillOpacity: 0.5,
};

// قائمة الدول لتلوينها باللون الأخضر
const highlightedCountries = [
  "Austria",
  "China",
  "United States of America",
  "Chile",
  "Canada",
  "Greece",
  "Hungary",
  "United Kingdom",
  "France",
  "Cyprus",
  "Germany",
  "Netherlands",
  "Luxembourg",
  "Sweden",
  "Malaysia",
  "Norway",
  "Romania",
  "Australia",
  "Venezuela",
  "Russia",
  "Poland",
  "New Zealand",
  "Thailand",
  "Italy",
  "United Arab Emirates",
  "Oman",
  "Kuwait",
  "Iraq",
  "Erbil",
  "Saudi Arabia",
  "Libya",
  "Syria",
  "Qatar",
  "Lebanon",
  "Belgium",
];

// Custom GeoJSON style for highlighted countries
const countryStyle = (feature: any) => {
  const countryName = feature.properties.name;

  if (highlightedCountries.includes(countryName)) {
    return {
      fillColor: "#3fdb8938", // اللون الأخضر
      weight: 1,
      opacity: 1,
      color: "#ffffff ",
      fillOpacity: 1,
    };
  }

  return {
    fillColor: "#ffffffc2  ", // لون رمادي لباقي الدول
    weight: 1,
    opacity: 1,
    color: "#fff ",
    fillOpacity: 1,
  };
};

// Statistical data with logos
const data = [
  {
    id: "1",
    name: "Ausrtia",
    value: "+963991199453",
    position: [47.5162, 14.5501],
    logo: flage1,
  },
  {
    id: "2",
    name: "China",
    value: "+963991199453",
    position: [35.8617, 104.1954],
    logo: flage2,
  },
  {
    id: "3",
    name: "USA-1",
    value: "+963991199453",
    position: [36.7783, -119.4179],
    logo: flage3,
  },
  {
    id: "4",
    name: "USA-2",
    value: "+963991199453",
    position: [34.0522, -118.2437],
    logo: flage3,
  },
  {
    id: "5",
    name: "Chile",
    value: "+963991199453",
    position: [-35.6751, -71.543],
    logo: flage5,
  },
  {
    id: "6",
    name: "Canada",
    value: "+963991199453",
    position: [46.8139, -71.2082],
    logo: flage6,
  },
  {
    id: "7",
    name: "Greek",
    value: "+963991199453",
    position: [37.9838, 23.7275],
    logo: flage7,
  },
  {
    id: "8",
    name: "Hungary",
    value: "+963991199453",
    position: [47.4979, 19.0402],
    logo: flage8,
  },
  {
    id: "9",
    name: "UK",
    value: "+963991199453",
    position: [51.5074, -0.1278],
    logo: flage9,
  },
  {
    id: "10",
    name: "France",
    value: "+963991199453",
    position: [45.764, 4.8357],
    logo: flage10,
  },
  {
    id: "11",
    name: "Cyprus",
    value: "+963991199453",
    position: [34.7071, 33.0226],
    logo: flage11,
  },
  {
    id: "12",
    name: "Germany-1",
    value: "+963991199453",
    position: [52.52, 13.405],
    logo: flage12,
  },
  {
    id: "13",
    name: "Germany-2",
    value: "+963991199453",
    position: [48.7758, 9.1829],
    logo: flage12,
  },
  {
    id: "14",
    name: "Germany-3",
    value: "+963991199453",
    position: [53.5511, 9.9937],
    logo: flage12,
  },
  {
    id: "15",
    name: "Germany-4",
    value: "+963991199453",
    position: [49.8153, 6.1296],
    logo: flage12,
  },
  {
    id: "16",
    name: "Netherland",
    value: "+963991199453",
    position: [52.1326, 5.2913],
    logo: flage16,
  },
  {
    id: "17",
    name: "Sweden-1",
    value: "+963991199453",
    position: [55.605, 13.0038],
    logo: flage17,
  },
  {
    id: "18",
    name: "Sweden-2",
    value: "+963991199453",
    position: [59.1955, 17.6253],
    logo: flage17,
  },
  {
    id: "19",
    name: "Malaysia",
    value: "+963991199453",
    position: [3.139, 101.6869],
    logo: flage19,
  },
  {
    id: "20",
    name: "Norway",
    value: "+963991199453",
    position: [59.9139, 10.7522],
    logo: flage20,
  },
  {
    id: "21",
    name: "Romania",
    value: "+963991199453",
    position: [44.4268, 26.1025],
    logo: flage21,
  },
  {
    id: "22",
    name: "ِAustralia",
    value: "+963991199453",
    position: [-33.8688, 151.2093],
    logo: flage22,
  },
  {
    id: "23",
    name: "Venezuela",
    value: "+963991199453",
    position: [10.4806, -66.9036],
    logo: flage23,
  },
  {
    id: "24",
    name: "Russia",
    value: "+963991199453",
    position: [55.7558, 37.6173],
    logo: flage24,
  },
  {
    id: "25",
    name: "Poland",
    value: "+963991199453",
    position: [51.9194, 19.1451],
    logo: flage25,
  },
  {
    id: "26",
    name: "New Zealand",
    value: "+963991199453",
    position: [-40.9006, 174.886],
    logo: flage26,
  },
  {
    id: "27",
    name: "Thailand",
    value: "+963991199453",
    position: [15.87, 100.9925],
    logo: flage27,
  },
  {
    id: "28",
    name: "Italy",
    value: "+963991199453",
    position: [41.8719, 12.5674],
    logo: flage28,
  },
  {
    id: "29",
    name: "UAE",
    value: "+963933363195",
    position: [25.276987, 55.296249],
    logo: flage29,
  },
  {
    id: "30",
    name: "Oman",
    value: "+963933363195",
    position: [23.5859, 58.4059],
    logo: flage30,
  },
  {
    id: "31",
    name: "Kuwait",
    value: "+963933363195",
    position: [29.3759, 47.9774],
    logo: flage31,
  },
  {
    id: "32",
    name: "Iraq",
    value: "+963933363195",
    position: [33.3152, 44.3661],
    logo: flage32,
  },
  {
    id: "33",
    name: "Erbil",
    value: "+963933363195",
    position: [36.1911, 44.009],
    logo: flage32,
  },
  {
    id: "34",
    name: "Saudi-1",
    value: "+963933363195",
    position: [24.7136, 46.6753],
    logo: flage34,
  },
  {
    id: "35",
    name: "Saudi-2",
    value: "+963933363195",
    position: [21.4858, 39.1925],
    logo: flage34,
  },
  {
    id: "36",
    name: "Saudi-3",
    value: "+963933363195",
    position: [26.3927, 49.9777],
    logo: flage34,
  },
  {
    id: "37",
    name: "Libya-1",
    value: "+963933363195",
    position: [32.8872, 13.1913],
    logo: flage37,
  },
  {
    id: "38",
    name: "Libya-2",
    value: "+963933363195",
    position: [32.0948, 20.1873],
    logo: flage37,
  },
  {
    id: "39",
    name: "Syria",
    value: "+96399199460",
    position: [34.8021, 38.9968],
    logo: flage39,
  },
  {
    id: "40",
    name: "َQatar",
    value: "+963933363195",
    position: [25.276987, 51.521279],
    logo: flage40,
  },
  {
    id: "41",
    name: "Lebanon",
    value: "+963933363195",
    position: [33.8547, 35.8623],
    logo: flage41,
  },
  {
    id: "42",
    name: "Belgium",
    value: "+963991199453",
    position: [50.8503, 4.3517],
    logo: flage42,
  },
];

const Places: React.FC = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 Translation                                */
  /* -------------------------------------------------------------------------- */
  const [t] = useTranslation();
  const [geoData, setGeoData] = useState<any>(null);
  // Load GeoJSON data
  useEffect(() => {
    // بدلاً من جلب البيانات، يمكنك تعيينها مباشرة
    setGeoData(countries);
  }, []);

  return (
    <>
      <motion.h1
        initial={{ opacity: 0, x: 50 }}
        whileInView={{
          opacity: 0.8,
          x: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        style={{
          marginTop: "120px",
          textAlign: "center",
          fontSize: "50px",
          color: "#ddd",
          textShadow: "7px 8px 15px",
          opacity: "0.8",
        }}
        id="place"
      >
        {t("places")}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{
          opacity: 0.8,
          y: 0,
          transition: { delay: 0.2, duration: 0.5 },
        }}
        viewport={{ once: false, amount: 0.5 }}
        dir={t("dir")}
      >
        <Box
          sx={{
            height: {
              xs: "450px",
              lg: "500px",
            },
            width: {
              xs: "90%",
              lg: "80%",
            },
            maxWidth: "1024px",
            margin: "auto",
            borderRadius: "12px",
          }}
        >
          <MapContainer
            center={[20, 0]}
            zoom={2}
            style={{
              height: "100%",
              width: "100%",
              margin: "auto",
              borderRadius: "12px",
            }}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <GeoJSON data={oceanGeoJson as any} style={oceanStyle} />
            {/* تحميل طبقة الدول باستخدام GeoJSON */}
            {geoData && <GeoJSON data={geoData} style={countryStyle} />}
            {data.map((location) => (
              <Marker
                key={location.id}
                position={location.position as L.LatLngExpression}
                icon={customMarkerIcon}
              >
                <Popup>
                  <div
                    dir={t("dir")}
                    style={{
                      textAlign: "center",
                      fontFamily: "var(--main-font)",
                    }}
                  >
                    <strong>{t(`countries.${location.name}`)}</strong>
                    <p>info@al-gota.net</p>
                    <p>
                      {t("value")}: {location.value}
                    </p>
                    <img
                      src={location.logo}
                      alt={`${location.name} logo`}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </motion.div>
    </>
  );
};

export default Places;
