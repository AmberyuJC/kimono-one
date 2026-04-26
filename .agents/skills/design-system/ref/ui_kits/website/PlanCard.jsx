/* global React, lucide, Eyebrow */

function PlanCard({ plan }) {
  const [liked, setLiked] = React.useState(plan.liked || false);
  const [hover, setHover] = React.useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block', textDecoration: 'none', color: 'inherit',
        background: '#fff', borderRadius: 16, overflow: 'hidden',
        border: '1px solid var(--gray-200)',
        boxShadow: hover ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all .3s ease',
      }}
    >
      <div style={{
        position: 'relative', aspectRatio: '1/1',
        background: plan.bg || 'linear-gradient(135deg, var(--sakura-50), var(--wabi-100))',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {plan.image ? (
          <img
            src={plan.image}
            alt={plan.title}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transform: hover ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform .7s ease',
            }}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: hover ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform .7s ease',
          }}>
            {/* Decorative concentric kamon */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: .35 }}>
              <div style={{ width: '70%', aspectRatio: '1', borderRadius: '9999px', border: '1px solid var(--sakura-300)' }} />
              <div style={{ position: 'absolute', width: '52%', aspectRatio: '1', borderRadius: '9999px', border: '1px solid var(--sakura-300)' }} />
              <div style={{ position: 'absolute', width: '34%', aspectRatio: '1', borderRadius: '9999px', border: '1px solid var(--sakura-300)' }} />
            </div>
            <span style={{ fontSize: 96, lineHeight: 1, position: 'relative', filter: 'drop-shadow(0 4px 12px rgba(216,123,112,.25))' }}>
              {plan.glyph || '👘'}
            </span>
          </div>
        )}

        {/* Top-right actions */}
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            style={{
              width: 36, height: 36, borderRadius: 9999,
              background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: liked ? 'var(--sakura-500)' : 'var(--gray-700)',
            }}
          >
            <i data-lucide="heart" style={{ width: 16, height: 16, fill: liked ? 'var(--sakura-500)' : 'transparent' }} />
          </button>
        </div>

        {/* Badge */}
        {plan.badge && (
          <span style={{
            position: 'absolute', left: 12, bottom: 12,
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 10px', borderRadius: 9999,
            background: plan.badge.color === 'warning' ? '#fef3c7' : '#fee2e2',
            color: plan.badge.color === 'warning' ? '#a16207' : '#b91c1c',
            fontSize: 11, fontWeight: 600,
            boxShadow: 'var(--shadow-md)',
          }}>
            {plan.badge.text}
          </span>
        )}
      </div>

      <div style={{ padding: 14 }}>
        <div style={{
          fontSize: 12, color: 'var(--wabi-600)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 2,
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <i data-lucide="map-pin" style={{ width: 12, height: 12 }} />
            {plan.location}
          </span>
          <span style={{ fontWeight: 600, color: 'var(--wabi-800)' }}>★ {plan.rating}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--wabi-500)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <i data-lucide="store" style={{ width: 12, height: 12 }} />
          {plan.store}
        </div>
        <h3 style={{
          fontSize: 15, fontWeight: 600, color: 'var(--gray-900)',
          lineHeight: 1.35, margin: '6px 0 10px',
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {plan.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--gray-900)' }}>
            ¥{plan.price.toLocaleString()}
            <span style={{ fontSize: 12, fontWeight: 400, color: 'var(--gray-500)' }}> /人</span>
          </span>
          {plan.savings && (
            <span style={{
              fontSize: 11, fontWeight: 500, padding: '2px 6px',
              background: '#fee2e2', color: '#b91c1c', borderRadius: 4,
            }}>
              省¥{plan.savings}
            </span>
          )}
        </div>
      </div>
    </a>
  );
}

function PlanGrid({ eyebrow, title, subtitle, plans }) {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: 24 }}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: 32, fontFamily: 'var(--font-serif)', fontWeight: 600, color: 'var(--gray-900)', margin: 0 }}>{title}</h2>
            {subtitle && <p style={{ fontSize: 14, color: 'var(--gray-500)', marginTop: 4 }}>{subtitle}</p>}
          </div>
          <a href="#" style={{ fontSize: 14, color: 'var(--sakura-500)', textDecoration: 'none', fontWeight: 500 }}>
            查看全部 →
          </a>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
        {plans.map((p) => <PlanCard key={p.id} plan={p} />)}
      </div>
    </section>
  );
}

window.PlanCard = PlanCard;
window.PlanGrid = PlanGrid;
