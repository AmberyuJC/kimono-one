/* global React, Kamon, Wordmark, lucide */
const { useState: useStateH } = React;

function Header() {
  const [openMenu, setOpenMenu] = useStateH(null);
  const navLinks = [
    { href: '#', label: 'AI 试穿', special: true },
    { href: '#', label: '店铺信息' },
    { href: '#', label: '常见问题' },
    { href: '#', label: '关于我们' },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      background: 'var(--wabi-50)',
      borderBottom: '1px solid transparent',
      transition: 'all .3s ease-in-out',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 80 }}>
          {/* Logo */}
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Kamon size={40} />
            <Wordmark />
          </a>

          {/* Center search bar (compact) */}
          <div style={{
            flex: 1, maxWidth: 480, margin: '0 24px',
            display: 'flex', alignItems: 'center',
            background: '#fff', borderRadius: 9999,
            border: '1px solid var(--gray-200)',
            padding: '6px 6px 6px 18px',
            boxShadow: 'var(--shadow-xs)',
            cursor: 'text',
          }}>
            <span style={{ fontSize: 14, color: 'var(--gray-700)', fontWeight: 500 }}>东京</span>
            <span style={{ width: 1, height: 20, background: 'var(--gray-200)', margin: '0 14px' }} />
            <span style={{ fontSize: 14, color: 'var(--gray-700)', fontWeight: 500 }}>4 月 28 日</span>
            <span style={{ width: 1, height: 20, background: 'var(--gray-200)', margin: '0 14px' }} />
            <span style={{ fontSize: 14, color: 'var(--gray-400)', flex: 1 }}>添加场景</span>
            <button style={{
              width: 36, height: 36, borderRadius: 9999, border: 0,
              background: 'var(--sakura-500)', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <i data-lucide="search" style={{ width: 16, height: 16 }} />
            </button>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button className="ghost-btn"><i data-lucide="store" style={{ width: 18, height: 18 }} /></button>
            <button className="ghost-btn"><i data-lucide="heart" style={{ width: 18, height: 18 }} /></button>
            <button className="ghost-btn" style={{ position: 'relative' }}>
              <i data-lucide="shopping-cart" style={{ width: 18, height: 18 }} />
              <span style={{
                position: 'absolute', top: 4, right: 4, minWidth: 16, height: 16, padding: '0 4px',
                borderRadius: 9999, background: 'var(--sakura-500)', color: '#fff',
                fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>2</span>
            </button>
            <button className="ghost-btn"><i data-lucide="user" style={{ width: 18, height: 18 }} /></button>
            <button
              className="ghost-btn"
              style={{ borderRadius: 12, border: '1px solid var(--gray-200)', padding: '8px 12px', display: 'flex', gap: 6 }}
              onClick={() => setOpenMenu(openMenu === 'nav' ? null : 'nav')}
            >
              <i data-lucide="menu" style={{ width: 16, height: 16 }} />
            </button>

            {openMenu === 'nav' && (
              <div style={{
                position: 'absolute', top: 70, right: 24, minWidth: 220,
                background: '#fff', borderRadius: 16,
                boxShadow: 'var(--shadow-lg)', border: '1px solid var(--gray-100)',
                padding: 8, zIndex: 100,
              }}>
                {navLinks.map((l) => (
                  <a key={l.label} href="#" style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', borderRadius: 8,
                    fontSize: 14, color: l.special ? 'var(--sakura-600)' : 'var(--gray-700)',
                    fontWeight: l.special ? 600 : 500, textDecoration: 'none',
                  }}>
                    {l.special && <span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 4, background: 'var(--sakura-100)', color: 'var(--sakura-700)' }}>NEW</span>}
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
