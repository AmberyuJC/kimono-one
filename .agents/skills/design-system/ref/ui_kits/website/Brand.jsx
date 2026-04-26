/* global React */
const { useState } = React;

function Kamon({ size = 40, light = false }) {
  const fontSize = size * 0.36;
  return (
    <div className="kamon" style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '9999px', border: '2px solid var(--sakura-500)' }} />
      <div style={{
        position: 'absolute', inset: 4, borderRadius: '9999px',
        border: '1px solid rgba(227,148,138,.5)',
        background: 'repeating-conic-gradient(from 0deg, transparent 0deg 30deg, rgba(212,91,71,.06) 30deg 60deg)'
      }} />
      <div style={{ position: 'absolute', inset: 6, borderRadius: '9999px', background: light ? 'rgba(255,255,255,.9)' : '#fff' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'var(--font-mincho)', fontWeight: 500, fontSize, color: 'var(--sakura-600)' }}>一</span>
      </div>
    </div>
  );
}

function Wordmark({ size = 'md' }) {
  const sizes = { sm: { name: 16, jp: 9 }, md: { name: 18, jp: 10 }, lg: { name: 22, jp: 11 } }[size];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <span style={{ fontFamily: 'var(--font-serif)', fontSize: sizes.name, color: 'var(--sakura-600)' }}>
        <span style={{ fontStyle: 'italic', fontWeight: 500 }}>Kimono</span>
        <span style={{ fontWeight: 300, marginLeft: 4 }}>One</span>
      </span>
      <span style={{ fontSize: sizes.jp, letterSpacing: '0.25em', marginTop: 6, fontWeight: 500, color: 'rgba(216,123,112,.7)' }}>
        着物レンタル
      </span>
    </div>
  );
}

function Eyebrow({ children, centered = false }) {
  if (centered) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ width: 32, height: 1, background: 'linear-gradient(to right, transparent, var(--sakura-400))' }} />
        <span className="eyebrow">{children}</span>
        <span style={{ width: 32, height: 1, background: 'linear-gradient(to left, transparent, var(--sakura-400))' }} />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span style={{ width: 40, height: 1, background: 'linear-gradient(to right, var(--sakura-400), transparent)' }} />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

window.Kamon = Kamon;
window.Wordmark = Wordmark;
window.Eyebrow = Eyebrow;
