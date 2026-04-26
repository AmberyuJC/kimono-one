/* global React, lucide */

function SearchPanel() {
  const [city, setCity] = React.useState('东京');
  const [date, setDate] = React.useState('4 月 28 日 周一');
  const [scene, setScene] = React.useState('photogenic');
  const [crowd, setCrowd] = React.useState('couple');

  const sceneTags = [
    { id: 'all', name: '全部', icon: true },
    { id: 'value', name: '超值入门' },
    { id: 'photogenic', name: '出片神器' },
    { id: 'seasonal', name: '季节限定' },
    { id: 'special', name: '特色体验' },
    { id: 'formal', name: '正式礼装' },
  ];
  const crowdTags = [
    { id: 'all', name: '全部', icon: true },
    { id: 'family', name: '亲子家庭' },
    { id: 'couple', name: '情侣出行' },
    { id: 'besties', name: '闺蜜同行' },
    { id: 'men', name: '男士套装' },
    { id: 'solo', name: '独自出行' },
  ];

  return (
    <div className="glass-panel-light" style={{ borderRadius: 16, padding: 8 }}>
      {/* Top row */}
      <div style={{ display: 'flex' }}>
        {/* Destination */}
        <div style={{ flex: 1, padding: '12px 24px', borderRadius: 12, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-600)', fontWeight: 500, marginBottom: 4 }}>
            <i data-lucide="map-pin" style={{ width: 14, height: 14, color: 'var(--sakura-500)' }} />
            <span>目的地</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--gray-900)' }}>{city || '选择城市'}</div>
        </div>

        <div style={{ width: 1, background: 'var(--gray-200)', margin: '8px 0' }} />

        {/* Date */}
        <div style={{ flex: 1, padding: '12px 24px', borderRadius: 12, cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--gray-600)', fontWeight: 500, marginBottom: 4 }}>
            <i data-lucide="calendar" style={{ width: 14, height: 14, color: 'var(--sakura-500)' }} />
            <span>到店日期</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--gray-900)' }}>{date || '选择日期'}</div>
        </div>

        <div style={{ width: 1, background: 'var(--gray-200)', margin: '8px 0' }} />

        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px' }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 24px', minHeight: 44,
            background: 'var(--sakura-500)', color: '#fff',
            border: 0, borderRadius: 12, cursor: 'pointer',
            fontWeight: 500, fontSize: 16,
            boxShadow: '0 10px 25px -5px rgba(216,123,112,.4)',
          }}>
            <i data-lucide="search" style={{ width: 20, height: 20 }} />
            <span>开始探索</span>
          </button>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--gray-200)', margin: '8px 16px' }} />

      {/* Scene row */}
      <div style={{ padding: '8px 16px', display: 'grid', rowGap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', flexShrink: 0 }}>场景：</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {sceneTags.map((t) => {
              const sel = scene === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setScene(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 9999,
                    fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    background: sel ? 'var(--sakura-500)' : 'rgba(255,255,255,.8)',
                    color: sel ? '#fff' : 'var(--gray-700)',
                    border: sel ? 'none' : '1px solid var(--gray-200)',
                    boxShadow: sel ? '0 4px 14px rgba(216,123,112,.3)' : 'none',
                    transition: 'all .2s',
                  }}
                >
                  {t.icon && <i data-lucide="sparkles" style={{ width: 14, height: 14 }} />}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-600)', flexShrink: 0 }}>出行组合：</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {crowdTags.map((t) => {
              const sel = crowd === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setCrowd(t.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 16px', borderRadius: 9999,
                    fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    background: sel ? 'var(--sakura-500)' : 'rgba(255,255,255,.8)',
                    color: sel ? '#fff' : 'var(--gray-700)',
                    border: sel ? 'none' : '1px solid var(--gray-200)',
                    boxShadow: sel ? '0 4px 14px rgba(216,123,112,.3)' : 'none',
                    transition: 'all .2s',
                  }}
                >
                  {t.icon && <i data-lucide="sparkles" style={{ width: 14, height: 14 }} />}
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

window.SearchPanel = SearchPanel;
