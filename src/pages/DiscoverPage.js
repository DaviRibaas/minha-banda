import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MUSICIANS from '../data/musicians';
import BottomNav from '../components/BottomNav';

const FILTERS = ['Todos', 'Baterista', 'Baixista', 'Tecladista', 'Vocalista', 'Violinista'];

export default function DiscoverPage() {
  const [filter, setFilter] = useState('Todos');
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [swipeDir, setSwipeDir] = useState(null);
  const navigate = useNavigate();

  const filtered = filter === 'Todos' ? MUSICIANS : MUSICIANS.filter(m => m.role === filter);
  const current = filtered[index];
  const hasMore = index < filtered.length;

  const handleSwipe = (dir) => {
    setSwipeDir(dir);
    if (dir === 'right' || dir === 'up') {
      setMatches(prev => [...prev, current]);
      localStorage.setItem('musijoin_matches', JSON.stringify([...matches, current]));
    }
    setTimeout(() => {
      setIndex(i => i + 1);
      setSwipeDir(null);
    }, 350);
  };

  return (
    <div style={css.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideLeft { to { transform: translateX(-140%) rotate(-18deg); opacity: 0; } }
        @keyframes slideRight { to { transform: translateX(140%) rotate(18deg); opacity: 0; } }
        @keyframes slideUp { to { transform: translateY(-130%); opacity: 0; } }
        .swipe-left { animation: slideLeft 0.35s ease forwards; }
        .swipe-right { animation: slideRight 0.35s ease forwards; }
        .swipe-up { animation: slideUp 0.35s ease forwards; }
        .pill-btn:hover { border-color: #9d9db5 !important; color: #9d9db5 !important; }
        .btn-skip:hover { border-color: #f87171 !important; background: rgba(248,113,113,0.08) !important; }
        .btn-match:hover { transform: scale(1.1) !important; }
        .btn-super:hover { border-color: #fbbf24 !important; background: rgba(251,191,36,0.08) !important; }
      `}</style>

      {/* Header */}
      <div style={css.header}>
        <div style={css.logo}>🎸 MusiJoin</div>
        <button onClick={() => navigate('/matches')} style={css.matchesBtn}>
          💜 {matches.length}
        </button>
      </div>

      {/* Filtros */}
      <div style={css.filtersRow}>
        {FILTERS.map(f => (
          <button key={f} className="pill-btn"
            style={{ ...css.pill, ...(filter === f ? css.pillActive : {}) }}
            onClick={() => { setFilter(f); setIndex(0); }}>
            {f}
          </button>
        ))}
      </div>

      {/* Área do card */}
      <div style={css.stackArea}>
        {hasMore ? (
          <>
            {filtered[index + 2] && <div style={css.cardBack2} />}
            {filtered[index + 1] && <div style={css.cardBack1} />}

            <div className={swipeDir ? `swipe-${swipeDir}` : ''} style={css.card}>
              {swipeDir === 'right' && <div style={{ ...css.swipeLabel, color: '#c084fc', borderColor: '#c084fc', left: 16 }}>MATCH! 💜</div>}
              {swipeDir === 'left' && <div style={{ ...css.swipeLabel, color: '#f87171', borderColor: '#f87171', right: 16 }}>PASSAR ✕</div>}
              {swipeDir === 'up' && <div style={{ ...css.swipeLabel, color: '#fbbf24', borderColor: '#fbbf24', left: '30%' }}>SUPER ⭐</div>}

              <div style={css.cardPhoto}>
                <span style={{ fontSize: 80 }}>{current.emoji}</span>
                {current.online && <div style={css.onlineDot} />}
              </div>

              <div style={css.cardBody}>
                <div style={css.cardName}>{current.name}</div>
                <div style={css.cardMeta}>{current.role} · {current.exp} de experiência</div>
                <div style={css.tags}>
                  {current.genres.map(g => <span key={g} style={css.tagGenre}>{g}</span>)}
                  <span style={css.tagCity}>📍 {current.city}</span>
                </div>
                <div style={css.cardBio}>"{current.bio}"</div>
              </div>
              <button style={css.profileBtn} onClick={() => navigate('/profile/' + current.id)}>👤 Ver perfil</button>
            </div>

            {/* Botões */}
            <div style={css.actions}>
              <button className="btn-skip" style={css.btnSkip} onClick={() => handleSwipe('left')}>✕</button>
              <button className="btn-match" style={css.btnMatch} onClick={() => handleSwipe('right')}>💜</button>
              <button className="btn-super" style={css.btnSuper} onClick={() => handleSwipe('up')}>⭐</button>
            </div>

            <div style={css.hint}>{filtered.length - index} músico(s) disponíveis</div>
          </>
        ) : (
          <div style={css.empty}>
            <div style={{ fontSize: 60 }}>🎸</div>
            <div style={css.emptyTitle}>Acabou por aqui!</div>
            <div style={css.emptySub}>Você viu todos os músicos disponíveis.</div>
            <button style={css.resetBtn} onClick={() => setIndex(0)}>Ver novamente</button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

const css = {
  page: { minHeight: '100vh', background: '#0d0d14', fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #2d2d3d' },
  logo: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: '#fff' },
  matchesBtn: { background: 'rgba(192,132,252,0.12)', border: '1px solid #c084fc', color: '#c084fc', borderRadius: 20, padding: '6px 14px', cursor: 'pointer', fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
  filtersRow: { display: 'flex', gap: 6, padding: '0.75rem 1.25rem', overflowX: 'auto' },
  pill: { fontSize: 12, padding: '6px 14px', borderRadius: 20, border: '1px solid #2d2d3d', color: '#6b6b7a', cursor: 'pointer', background: 'transparent', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', transition: 'all 0.15s' },
  pillActive: { background: 'rgba(192,132,252,0.1)', color: '#c084fc', borderColor: '#c084fc', fontWeight: 600 },
  stackArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', minHeight: 'calc(100vh - 200px)', position: 'relative' },
  cardBack2: { position: 'absolute', width: 300, height: 420, background: '#1a1a27', border: '1px solid #2d2d3d', borderRadius: 24, transform: 'rotate(4deg) translateY(16px)', zIndex: 1 },
  cardBack1: { position: 'absolute', width: 308, height: 428, background: '#16161f', border: '1px solid #2d2d3d', borderRadius: 24, transform: 'rotate(-2deg) translateY(8px)', zIndex: 2 },
  card: { width: 316, background: '#16161f', border: '1px solid #2d2d3d', borderRadius: 24, overflow: 'hidden', position: 'relative', zIndex: 3 },
  swipeLabel: { position: 'absolute', top: 20, zIndex: 10, fontSize: 18, fontWeight: 900, border: '3px solid', borderRadius: 8, padding: '4px 12px', letterSpacing: 2, background: 'rgba(0,0,0,0.5)' },
  cardPhoto: { height: 220, background: 'linear-gradient(135deg, #1a0a2e, #2d1660)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  onlineDot: { position: 'absolute', top: 16, right: 16, width: 12, height: 12, borderRadius: '50%', background: '#34d399', border: '2px solid #16161f' },
  cardBody: { padding: '1rem 1.25rem 1.25rem' },
  cardName: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#fff' },
  cardMeta: { fontSize: 13, color: '#9d9db5', marginTop: 4 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tagGenre: { fontSize: 11, padding: '4px 10px', borderRadius: 10, background: 'rgba(192,132,252,0.12)', color: '#c084fc', fontWeight: 600 },
  tagCity: { fontSize: 11, padding: '4px 10px', borderRadius: 10, background: 'rgba(52,211,153,0.12)', color: '#34d399', fontWeight: 600 },
  cardBio: { fontSize: 13, color: '#6b6b7a', marginTop: 12, lineHeight: 1.6 },
  actions: { display: 'flex', gap: 16, marginTop: 24, alignItems: 'center', position: 'relative', zIndex: 10 },
  btnSkip: { width: 56, height: 56, borderRadius: '50%', border: '1px solid #2d2d3d', background: '#16161f', cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' },
  btnMatch: { width: 72, height: 72, borderRadius: '50%', border: 'none', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', cursor: 'pointer', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 24px rgba(147,51,234,0.4)', transition: 'all 0.15s' },
  btnSuper: { width: 48, height: 48, borderRadius: '50%', border: '1px solid #2d2d3d', background: '#16161f', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' },
  hint: { marginTop: 16, fontSize: 12, color: '#6b6b7a' },
  empty: { textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  emptyTitle: { fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 24, fontWeight: 700 },
  emptySub: { color: '#6b6b7a', fontSize: 14 },
  resetBtn: { marginTop: 16, padding: '12px 28px', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
  profileBtn: { width: '100%', marginTop: 12, padding: '10px', border: '1px solid #2d2d3d', background: 'rgba(255,255,255,0.04)', color: '#9d9db5', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 },
};