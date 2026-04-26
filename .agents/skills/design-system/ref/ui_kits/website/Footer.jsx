/* global React, Kamon, Wordmark, lucide */

function Footer() {
  return (
    <footer style={{ width: '100%', background: 'var(--wabi-50)', marginTop: 64 }}>
      <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--sakura-300), transparent)' }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '4fr 2fr 2fr 2fr 2fr', gap: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <Kamon size={40} />
              <Wordmark />
            </div>
            <p style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 16 }}>
              专业和服租赁服务，让每一位游客都能体验日本传统之美
            </p>
            <p style={{
              fontFamily: 'var(--font-mincho)', fontSize: 13, color: 'var(--gray-400)',
              fontStyle: 'italic', marginBottom: 24,
            }}>
              伝統の美、現代の心
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              {['instagram', 'twitter', 'youtube'].map((s) => (
                <a key={s} href="#" style={{
                  width: 32, height: 32, borderRadius: 9999,
                  background: 'var(--sakura-50)', color: 'var(--sakura-500)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'all .3s',
                }}>
                  <i data-lucide={s} style={{ width: 16, height: 16 }} />
                </a>
              ))}
            </div>
          </div>

          <div />

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 16 }}>快速链接</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              {['和服套餐', '店铺信息', '优惠活动'].map((l) => (
                <li key={l}><a href="#" style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 16 }}>客户服务</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              {['常见问题', '联系我们', '关于我们'].map((l) => (
                <li key={l}><a href="#" style={{ color: 'var(--gray-600)', textDecoration: 'none' }}>{l}</a></li>
              ))}
            </ul>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginTop: 32, marginBottom: 16 }}>合作伙伴</h4>
            <a href="#" style={{ fontSize: 14, color: 'var(--sakura-500)', textDecoration: 'none', fontWeight: 500 }}>成为商家</a>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 16 }}>联系方式</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'var(--gray-600)' }}>
              <li>info@kimono-one.com</li>
              <li>东京 · 浅草 · 京都</li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 48, paddingTop: 32 }}>
          <div style={{ height: 1, background: 'linear-gradient(to right, transparent, var(--gray-200), transparent)', marginBottom: 32 }} />
          <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--gray-400)', margin: 0 }}>
            © 2026 Kimono One. All rights reserved.
          </p>
          <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--gray-400)', marginTop: 8 }}>
            所有价格均为人民币（CNY）
          </p>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
