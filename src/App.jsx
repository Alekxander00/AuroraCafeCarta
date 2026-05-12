import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { LiquidCanvas } from './components/LiquidCanvas'
import { brandAssets, coverData, menuPages, navigationItems } from './data/menuData'

const Scene3D = lazy(() =>
  import('./components/Scene3D').then((module) => ({ default: module.Scene3D })),
)

function DecorativeImage({ src, className }) {
  return <img src={src} alt="" className={className} aria-hidden="true" />
}

function FactCard({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function MenuGroup({ group }) {
  return (
    <section className="menu-group">
      <div className="group-header">
        <p className="group-title">{group.title}</p>
      </div>
      <div className="menu-items">
        {group.items.map((item) => (
          <article key={item.name} className="menu-item">
            <div className="menu-copy">
              <div className="item-topline">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>
              <p>{item.description}</p>
            </div>
            <span className="item-tag">{item.tag}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function SceneSlot({ scene, title, active }) {
  if (!active) {
    return (
      <div className="scene-fallback stage-poster">
        <span>{title}</span>
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="scene-fallback">Preparando seleccion...</div>}>
      <Scene3D scene={scene} />
    </Suspense>
  )
}

export default function App() {
  const trackRef = useRef(null)
  const panelOrder = ['cover', ...menuPages.map((page) => page.id)]
  const [activeIndex, setActiveIndex] = useState(0)
  const [isStacked, setIsStacked] = useState(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) {
      return undefined
    }

    let frame = 0

    const updateActiveIndex = () => {
      frame = 0
      const nextIndex = Math.round(track.scrollLeft / Math.max(track.clientWidth, 1))
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex))
    }

    const onScroll = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(updateActiveIndex)
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateActiveIndex)
    updateActiveIndex()

    return () => {
      track.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateActiveIndex)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const updateLayoutMode = () => {
      setIsStacked(window.innerWidth <= 980)
    }

    updateLayoutMode()
    window.addEventListener('resize', updateLayoutMode)

    return () => {
      window.removeEventListener('resize', updateLayoutMode)
    }
  }, [])

  return (
    <div className="app-shell">
      <LiquidCanvas />

      <DecorativeImage src={brandAssets.coffeePlantWide} className="bg-decor bg-plant-left" />
      <DecorativeImage src={brandAssets.coffeePlantBranch} className="bg-decor bg-plant-right" />

      <header className="topbar">
        <a href="#cover" className="brand-lockup">
          <img src={brandAssets.auroraIcon} alt="" className="brand-icon" aria-hidden="true" />
          <span className="brand-text">
            <strong>Aurora</strong>
            <small>Cafeteria de especialidad</small>
          </span>
        </a>

        <nav className="chapter-nav" aria-label="Categorias de la carta">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main ref={trackRef} className="menu-track" aria-label="Carta digital Aurora">
        <section id="cover" className="panel cover-panel">
          <div className="panel-paper cover-layout">
            <DecorativeImage src={brandAssets.auroraLogo} className="cover-watermark" />
            <DecorativeImage src={brandAssets.coffeeBeansGroup} className="cover-beans" />
            <DecorativeImage src={brandAssets.coffeePlantTall} className="cover-plant" />

            <div className="cover-copy">
              <div className="cover-heading">
                <p className="eyebrow">{coverData.eyebrow}</p>
                <img src={brandAssets.auroraLogo} alt="Aurora Cafeteria" className="cover-logo" />
                <h1>{coverData.title}</h1>
                <p className="lead">{coverData.lead}</p>
              </div>

              <div className="metric-grid">
                {coverData.facts.map((fact) => (
                  <FactCard key={fact.label} {...fact} />
                ))}
              </div>

              <div className="badge-row" aria-label="Datos de servicio">
                {coverData.serviceTags.map((tag) => (
                  <span key={tag} className="feature-badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="cover-visual">
              <div className="scene-card hero-scene-card">
                <SceneSlot
                  scene={coverData.stage}
                  title="Aurora Blend"
                  active={isStacked || activeIndex <= 1}
                />
                <div className="scene-caption">
                  <span>Selecciones</span>
                  <p>Cafe de especialidad, panaderia fresca y cocina ligera para mesa.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {menuPages.map((page, pageOffset) => {
          const panelIndex = pageOffset + 1
          const sceneIsActive = isStacked || Math.abs(activeIndex - panelIndex) <= 1

          return (
            <section key={page.id} id={page.id} className="panel">
              <div className="panel-paper">
                {page.decorations.map((decor) => (
                  <DecorativeImage
                    key={`${page.id}-${decor.className}`}
                    src={decor.src}
                    className={`panel-decor ${decor.className}`}
                  />
                ))}

                <div className="panel-header">
                  <div>
                    <p className="eyebrow">{page.eyebrow}</p>
                    <h2>{page.title}</h2>
                  </div>
                  <p className="panel-intro">{page.intro}</p>
                </div>

                <div className="content-grid">
                  <div className="groups-grid">
                    {page.groups.map((group) => (
                      <MenuGroup key={group.title} group={group} />
                    ))}
                  </div>

                  <aside className="visual-column">
                    <article className="feature-card">
                      <p className="aside-label">{page.featured.label}</p>
                      <h3>{page.featured.title}</h3>
                      <p>{page.featured.body}</p>
                      <span className="feature-note">{page.featured.note}</span>
                    </article>

                    <div className="scene-card compact-scene-card">
                      <SceneSlot scene={page.stage} title={page.featured.title} active={sceneIsActive} />
                    </div>

                    <div className="service-card">
                      <p className="aside-label">Pide tambien</p>
                      <div className="service-tags">
                        {page.serviceTags.map((tag) => (
                          <span key={tag} className="service-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </section>
          )
        })}
      </main>

      {!isStacked ? (
        <div className="swipe-indicator" aria-hidden="true">
          <span />
          <p>{panelOrder[activeIndex] === 'cover' ? 'Desliza la carta' : 'Sigue explorando'}</p>
        </div>
      ) : null}
    </div>
  )
}
