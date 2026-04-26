/* global React, SearchPanel, lucide */

function SakuraPetals() {
  const petals = [
    { left: '65%', delay: '0s', duration: '12s', size: 24 },
    { left: '78%', delay: '3s', duration: '14s', size: 20 },
    { left: '88%', delay: '6s', duration: '11s', size: 28 },
    { left: '72%', delay: '8s', duration: '13s', size: 22 },
    { left: '92%', delay: '5s', duration: '12s', size: 18 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 30 }}>
      {petals.map((p, i) => (
        <div key={i} style={{
          position: 'absolute', left: p.left, top: -40,
          animation: `sakura-fall ${p.duration} linear infinite`,
          animationDelay: p.delay,
        }}>
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 3C12 3 9 0 7 2C5 4 6 8 8 12C9.5 15 12 20 12 20C12 20 14.5 15 16 12C18 8 19 4 17 2C15 0 12 3 12 3Z"
              fill="rgba(242,176,165,.7)"
            />
            <path d="M12 4L12 19" stroke="rgba(227,148,138,.25)" strokeWidth="0.4" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  return (
    <section style={{ position: 'relative', height: '75vh', minHeight: 560, width: '100%', overflow: 'visible', background: '#fff' }}>
      {/* Background image + petals */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <SakuraPetals />
      </div>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="../../assets/hero-kimono.jpg"
          alt="和服体験"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
        />
      </div>

      {/* Layered veil:
          1. soft white wash to lift overall image
          2. radial vignette — darker on edges, slight darkening behind the title block
             so the heading sits on a clearly defined stage rather than dissolving into the photo
          3. bottom fade into page bg */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(255,255,255,.18)' }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'radial-gradient(ellipse 60% 50% at 50% 38%, rgba(45,42,38,.42) 0%, rgba(45,42,38,.18) 45%, transparent 75%)',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(45,42,38,.25), transparent 30%, transparent 70%, rgba(45,42,38,.15))',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, height: 80, background: 'linear-gradient(to bottom, transparent, var(--wabi-50))' }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '0 16px', marginTop: -40,
      }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          {/* Eyebrow — short, all-caps, sits above the headline as a separator */}
          <div className="animate-hero-title" style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18,
          }}>
            <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,.6)' }} />
            <span style={{
              fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,.92)', fontWeight: 600,
            }}>Kimono One · 着物レンタル</span>
            <span style={{ width: 28, height: 1, background: 'rgba(255,255,255,.6)' }} />
          </div>
          <h1 className="animate-hero-title" style={{
            fontSize: 56, fontWeight: 700, color: '#fff',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.005em', lineHeight: 1.15,
            textShadow: '0 2px 24px rgba(45,42,38,.55), 0 1px 4px rgba(45,42,38,.35)',
            margin: 0,
          }}>
            开启你的和服之旅
          </h1>
          <p className="animate-hero-subtitle" style={{
            marginTop: 22, fontSize: 18, fontWeight: 500, letterSpacing: '0.04em',
            color: 'rgba(255,255,255,.94)', fontFamily: 'var(--font-serif)',
            textShadow: '0 1px 12px rgba(45,42,38,.55)',
            margin: '22px 0 0',
          }}>
            比较不同店铺，找到专属于你的体验
          </p>
        </div>
        <div className="animate-hero-search" style={{ width: '100%', maxWidth: 960, boxShadow: 'var(--shadow-2xl)', borderRadius: 16 }}>
          <SearchPanel />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: 'shield-check', title: '严选认证商户', desc: '实地审核，品质保障' },
    { icon: 'sparkles', title: '一站式服务', desc: '妆发摄影，按需选配' },
    { icon: 'badge-japanese-yen', title: '价格公开透明', desc: '无隐藏费，无到店加价' },
    { icon: 'languages', title: '多语言服务', desc: '中日英沟通无障碍' },
    { icon: 'calendar-x-2', title: '免费取消', desc: '提前取消无罚款' },
  ];
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px', marginTop: 32, marginBottom: 48 }}>
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--wabi-200), transparent)', marginBottom: 32 }} />
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ width: 32, height: 1, background: 'linear-gradient(to right, transparent, var(--sakura-400))' }} />
          <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--sakura-500)', fontWeight: 500 }}>
            Why Kimono One
          </span>
          <span style={{ width: 32, height: 1, background: 'linear-gradient(to left, transparent, var(--sakura-400))' }} />
        </div>
        <h2 style={{ fontSize: 22, fontFamily: 'var(--font-serif)', color: 'var(--wabi-800)', margin: 0 }}>
          为什么要在 Kimono One 租赁和服？
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
        {items.map((it) => (
          <div key={it.title} style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--sakura-50), var(--sakura-100))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i data-lucide={it.icon} style={{ width: 22, height: 22, color: 'var(--sakura-600)' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--wabi-800)' }}>{it.title}</div>
              <div style={{ fontSize: 14, color: 'var(--wabi-500)' }}>{it.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.Hero = Hero;
window.TrustBar = TrustBar;
