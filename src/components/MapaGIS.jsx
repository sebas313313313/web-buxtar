import React, { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

// ── Fix Leaflet icons en Vite ──────────────────────────────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ── Tiles ─────────────────────────────────────────────────────────────────
const ESRI_SATELLITE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM_STANDARD   = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// ── Cálculo de área en hectáreas ─────────────────────────────────────────
function calcularAreaHa(coords) {
  if (!coords || coords.length < 3) return 0;
  const R = 6371000;
  let area = 0;
  const n = coords.length;
  for (let i = 0; i < n; i++) {
    const [lng1, lat1] = coords[i];
    const [lng2, lat2] = coords[(i + 1) % n];
    area += ((lng2 - lng1) * Math.PI / 180) *
      (2 + Math.sin(lat1 * Math.PI / 180) + Math.sin(lat2 * Math.PI / 180));
  }
  return Math.round((Math.abs(area * R * R / 2) / 10000) * 100) / 100;
}

// ── Estilos fitosanitarios ────────────────────────────────────────────────
const LOTE_STYLES = {
  alto:  { color: '#dc2626', fillColor: '#fee2e2', fillOpacity: 0.45, weight: 2.5 },
  medio: { color: '#d97706', fillColor: '#fef3c7', fillOpacity: 0.45, weight: 2.5 },
  bajo:  { color: '#059669', fillColor: '#d1fae5', fillOpacity: 0.45, weight: 2.5 },
};
const ZONA_COLORS = ['#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777'];

// ── Iconos de marcadores ──────────────────────────────────────────────────
const makeIcon = (color) => new L.Icon({
  iconUrl:   `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});
const ICON_EMPRESA  = makeIcon('violet');
const ICON_ESTACION = makeIcon('blue');

/**
 * MapaGIS — Mapa interactivo GIS usando Leaflet puro (sin wrappers React)
 *
 * Props:
 *   center             [lat, lng]
 *   zoom               number
 *   height             string CSS
 *   editable           boolean — muestra herramientas de dibujo (Geoman)
 *   poligono           GeoJSON geometry | null — polígono existente del lote
 *   nivelFitosanitario 'bajo' | 'medio' | 'alto'
 *   poligonosZonas     [{id, nombre, geojson, color?, caficultores?, municipios?}]
 *   marcadores         [{id, lat, lng, label, tipo: 'empresa'|'estacion', caficultores?, fincas?}]
 *   onPolygonSaved     (geojson, areaHa) => void
 */
const MapaGIS = ({
  center             = [4.8, -75.7],
  zoom               = 13,
  height             = '420px',
  editable           = false,
  poligono           = null,
  nivelFitosanitario = 'bajo',
  poligonosZonas     = [],
  marcadores         = [],
  onPolygonSaved     = null,
}) => {
  const containerRef             = useRef(null);
  const mapRef                   = useRef(null);
  const baseTileRef              = useRef(null);
  const [useSatellite, setUseSatellite] = useState(true);
  const [pending, setPending]    = useState(null); // { geojson, areaHa }

  const editableRef = useRef(editable);
  editableRef.current = editable;

  // ── Inicializar mapa + Geoman (solo una vez) ────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
    });
    mapRef.current = map;

    // Capa base inicial
    baseTileRef.current = L.tileLayer(ESRI_SATELLITE, {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 19,
    }).addTo(map);

    // Geoman (herramientas de dibujo) — solo si editable
    if (editableRef.current) {
      const initGeoman = () => {
        if (!mapRef.current) return;
        // Verificar que Geoman se cargó correctamente
        if (!map.pm) {
          console.warn('MapaGIS: Geoman no disponible');
          return;
        }
        map.pm.addControls({
          position: 'topleft',
          drawCircle:       false,
          drawCircleMarker: false,
          drawPolyline:     false,
          drawRectangle:    true,
          drawPolygon:      true,
          drawMarker:       false,
          editMode:         true,
          dragMode:         false,
          cutPolygon:       false,
          removalMode:      true,
        });

        map.on('pm:create', (e) => {
          const gj   = e.layer.toGeoJSON();
          const ring = gj.geometry.coordinates[0];
          setPending({ geojson: gj.geometry, areaHa: calcularAreaHa(ring) });
        });
      };

      // Esperar a que el mapa esté completamente montado
      map.whenReady(() => {
        // Delay adicional para modales que animan su apertura
        setTimeout(initGeoman, 500);
      });
    }

    return () => {
      map.remove();
      mapRef.current      = null;
      baseTileRef.current = null;
    };
    // Solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Cambiar capa base cuando cambia useSatellite ──────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    if (baseTileRef.current) {
      map.removeLayer(baseTileRef.current);
    }
    baseTileRef.current = L.tileLayer(
      useSatellite ? ESRI_SATELLITE : OSM_STANDARD,
      {
        attribution: useSatellite ? 'Tiles &copy; Esri' : '&copy; OpenStreetMap',
        maxZoom: 19,
      }
    ).addTo(map);
  }, [useSatellite]);

  // ── Actualizar polígono del lote ─────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Limpiar capas de lote anteriores
    map.eachLayer(layer => {
      if (layer._isLoteLayer) map.removeLayer(layer);
    });

    if (poligono) {
      const style = LOTE_STYLES[nivelFitosanitario] || LOTE_STYLES.bajo;
      const layer = L.geoJSON(poligono, { style }).addTo(map);
      layer._isLoteLayer = true;
      try { map.fitBounds(layer.getBounds(), { padding: [30, 30] }); } catch (_) {}
    }
  }, [poligono, nivelFitosanitario]);

  // ── Actualizar polígonos de zonas ────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer(layer => {
      if (layer._isZonaLayer) map.removeLayer(layer);
    });

    poligonosZonas.forEach((zona, idx) => {
      if (!zona.geojson) return;
      const color = zona.color || ZONA_COLORS[idx % ZONA_COLORS.length];
      const layer = L.geoJSON(zona.geojson, {
        style: { color, fillColor: color, fillOpacity: 0.25, weight: 2.5 },
        onEachFeature: (_, l) => {
          l.bindPopup(`
            <div style="min-width:160px">
              <p style="font-weight:700;font-size:14px;margin:0 0 6px">${zona.nombre}</p>
              ${zona.caficultores != null ? `<p style="color:#6b7280;font-size:12px;margin:0">👥 ${zona.caficultores} caficultores</p>` : ''}
              ${zona.municipios ? `<p style="color:#6b7280;font-size:12px;margin:4px 0 0">📍 ${zona.municipios}</p>` : ''}
            </div>
          `);
        },
      }).addTo(map);
      layer._isZonaLayer = true;
    });
  }, [poligonosZonas]);

  // ── Actualizar marcadores ─────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.eachLayer(layer => {
      if (layer._isMarkerLayer) map.removeLayer(layer);
    });

    marcadores.forEach(m => {
      const icon   = m.tipo === 'estacion' ? ICON_ESTACION : ICON_EMPRESA;
      const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);
      marker._isMarkerLayer = true;
      marker.bindPopup(`
        <div style="min-width:160px">
          <p style="font-weight:700;font-size:13px;margin:0 0 4px">${m.label}</p>
          ${m.caficultores ? `<p style="color:#6b7280;font-size:12px;margin:0">👥 ${m.caficultores} caficultores</p>` : ''}
          ${m.fincas ? `<p style="color:#6b7280;font-size:12px;margin:4px 0 0">🏡 ${m.fincas} fincas</p>` : ''}
          ${m.tipo === 'estacion' ? `<p style="color:#059669;font-size:12px;margin:4px 0 0">📡 Estación IoT activa</p>` : ''}
        </div>
      `);
    });
  }, [marcadores]);


  const handleSave = () => {
    if (onPolygonSaved && pending) {
      onPolygonSaved(pending.geojson, pending.areaHa);
      setPending(null);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm" style={{ height }}>

      {/* Toggle Satélite / Mapa estándar */}
      <div className="absolute top-3 right-3 z-[1000] flex bg-white rounded-lg shadow-md p-1 gap-1">
        <button
          onClick={() => setUseSatellite(true)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${useSatellite ? 'bg-cafe-vino-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          🛰️ Satélite
        </button>
        <button
          onClick={() => setUseSatellite(false)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${!useSatellite ? 'bg-cafe-vino-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          🗺️ Mapa
        </button>
      </div>

      {/* Banner guardar polígono (editable + pendiente) */}
      {editable && pending && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[1000]">
          <div className="bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3 border border-green-200">
            <span className="text-sm">
              <span className="font-semibold text-green-700">Área calculada: </span>
              <span className="text-green-600 font-bold">{pending.areaHa} Ha</span>
            </span>
            <button
              onClick={handleSave}
              className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar delimitación
            </button>
          </div>
        </div>
      )}

      {/* Etiqueta solo lectura */}
      {!editable && (
        <div className="absolute top-3 left-3 z-[1000]">
          <span className="bg-white/90 text-gray-600 text-xs font-medium px-2 py-1 rounded-lg shadow-sm border border-gray-200">
            👁️ Solo lectura
          </span>
        </div>
      )}

      {/* Instrucción de dibujo (editable, sin polígono aún) */}
      {editable && !poligono && !pending && (
        <div className="absolute bottom-3 left-3 z-[1000]">
          <span className="bg-white/90 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
            ✏️ Usa las herramientas de la izquierda para dibujar el polígono del lote
          </span>
        </div>
      )}

      {/* Contenedor del mapa (Leaflet monta aquí) */}
      <div ref={containerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapaGIS;
