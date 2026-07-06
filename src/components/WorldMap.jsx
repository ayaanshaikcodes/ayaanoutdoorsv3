import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Globe from 'react-globe.gl'

// 3D globe of travel destinations.
// - flat red dots (not raised columns)
// - gentle auto-spin that STOPS as soon as you touch/drag the globe
// - clicking/tapping a dot shows a card (photo + name + "open" button)
//   RIGHT on the dot, WITHOUT moving or zooming the camera.
// - the card has a real button; tapping the dot never navigates by itself.
// - light & dark earth textures follow the site theme
const TEX = {
  light:
    'https://cdn.jsdelivr.net/npm/three-globe@2.31.0/example/img/earth-blue-marble.jpg',
  dark: 'https://cdn.jsdelivr.net/npm/three-globe@2.31.0/example/img/earth-night.jpg',
}

export default function WorldMap({ markers }) {
  const navigate = useNavigate()
  const globeRef = useRef(null)
  const wrapRef = useRef(null)
  const [size, setSize] = useState({ w: 960, h: 460 })

  // selection + its live screen position (kept in refs so the <Globe>
  // itself never re-renders when they change — that was the cause of jitter)
  const [selected, setSelected] = useState(null)
  const [cardPos, setCardPos] = useState(null)
  const selectedRef = useRef(null)

  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  )
  useEffect(() => {
    const el = document.documentElement
    const obs = new MutationObserver(() => setIsDark(el.classList.contains('dark')))
    obs.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const onResize = () => {
      if (wrapRef.current) setSize((s) => ({ ...s, w: wrapRef.current.clientWidth }))
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const points = useMemo(
    () =>
      markers.map((m) => ({
        lat: m.coordinates[1],
        lng: m.coordinates[0],
        city: m.city,
        country: m.country,
        slug: m.slug,
        markerImage: m.markerImage,
      })),
    [markers]
  )

  // recompute the on-screen position of the selected dot
  const updateCardPos = useCallback(() => {
    const g = globeRef.current
    const sel = selectedRef.current
    if (!g || !sel || !g.getScreenCoords) {
      setCardPos(null)
      return
    }
    const s = g.getScreenCoords(sel.lat, sel.lng, 0.001)
    if (s && Number.isFinite(s.x) && Number.isFinite(s.y)) setCardPos({ x: s.x, y: s.y })
  }, [])

  const stopSpin = useCallback(() => {
    const g = globeRef.current
    if (g) g.controls().autoRotate = false
  }, [])

  // set up controls once; DO NOT depend on hover/selected so the Globe
  // is created a single time and never torn down on interaction.
  useEffect(() => {
    const g = globeRef.current
    if (!g) return
    const controls = g.controls()
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5
    controls.enableZoom = true
    controls.enableDamping = true
    controls.dampingFactor = 0.12
    controls.minDistance = 160
    controls.maxDistance = 420
    g.pointOfView({ lat: 20, lng: 80, altitude: 2.2 }, 0)

    const onStart = () => stopSpin()
    const onChange = () => updateCardPos()
    controls.addEventListener('start', onStart)
    controls.addEventListener('change', onChange)

    // also follow the auto-rotate frames so the card tracks while spinning
    let raf
    const tick = () => {
      if (selectedRef.current) updateCardPos()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      controls.removeEventListener('start', onStart)
      controls.removeEventListener('change', onChange)
      cancelAnimationFrame(raf)
    }
  }, [stopSpin, updateCardPos])

  const select = useCallback(
    (d) => {
      selectedRef.current = d || null
      setSelected(d || null)
      // stop the spin so the card sits still on the dot, but DON'T move camera
      stopSpin()
      updateCardPos()
    },
    [stopSpin, updateCardPos]
  )

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: size.h }}>
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={isDark ? TEX.dark : TEX.light}
        atmosphereColor={isDark ? '#7a9b76' : '#9ec5ff'}
        atmosphereAltitude={0.18}
        pointsData={points}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => '#ef4444'}
        pointAltitude={0.001}
        pointRadius={0.5}
        pointResolution={18}
        pointsMerge={false}
        pointLabel={(d) =>
          `<div style="font:500 12px sans-serif;background:#fff;color:#111;padding:5px 8px;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,.3)">${d.city}, ${d.country}</div>`
        }
        onPointClick={(d) => select(d)}
      />

      {/* Selection card — sits on the dot, camera does not move */}
      {selected && cardPos && (
        <div
          className="absolute z-20 w-44 -translate-x-1/2 -translate-y-full"
          style={{ left: cardPos.x, top: cardPos.y - 14 }}
        >
          <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700">
            {selected.markerImage ? (
              <img src={selected.markerImage} alt={selected.city} className="w-full h-24 object-cover" />
            ) : (
              <div className="w-full h-16 bg-gradient-to-br from-forest to-sage" />
            )}
            <div className="px-3 py-2">
              <p className="font-bold text-sm leading-tight text-slate-900 dark:text-white">
                {selected.city}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{selected.country}</p>
              {selected.slug ? (
                <button
                  onClick={() => navigate(`/travels/${selected.slug}`)}
                  className="mt-2 w-full text-xs font-semibold text-white bg-terra hover:opacity-90 rounded-lg py-1.5 transition"
                >
                  Click to open →
                </button>
              ) : (
                <p className="mt-1 text-[10px] text-slate-400">No post yet</p>
              )}
            </div>
          </div>
          <button
            onClick={() => select(null)}
            aria-label="Close"
            className="absolute -top-2 -right-2 w-5 h-5 grid place-items-center rounded-full bg-slate-900 text-white text-[10px] shadow"
          >
            ✕
          </button>
        </div>
      )}

      <p className="absolute bottom-1 inset-x-0 text-center text-xs text-slate-400 pointer-events-none">
        drag to rotate · scroll to zoom · tap a dot, then “click to open”
      </p>
    </div>
  )
}
