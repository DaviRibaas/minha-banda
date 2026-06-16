import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('musijoin_matches');
    if (saved) setMatches(JSON.parse(saved));
  }, []);

  return (
    <div style={css.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');`}</style>

      <div style={css.header}>
        <div style={css.logo}>💜 Matches</div>
      </div>

      <div style={css.content}>
        {matches.length === 0 ? (
          <div style={css.empty}>
            <div style={{ fontSize: 56 }}>🎸</div>
            <div style={css.emptyTitle}>Nenhum match ainda</div>
            <div style={css.emptySub}>Vá para Descobrir e dê match em músicos!</div>
            <button style={css.discoverBtn} onClick={() => navigate('/discover')}>
              Descobrir músicos
            </button>
          </div>
        ) : (
          <>
            <div style={css.sectionTitle}>{matches.length} match{matches.length > 1 ? 'es' : ''} 🎉</div>
            {matches.map((m, i) => (
              <div key={i} style={css.card} onClick={() => navigate('/chat')}>
                <div style={css.avatar}>{m.emoji}</div>
                <div style={css.info}>
                  <div style={css.name}>{m.name}</div>
                  <div style={css.role}>{m.role} · {m.city}</div>
                  <div style={css.tags}>
                    {m.genres.map(g => <span key={g} style={css.tag}>{g}</span>)}
                  </div>
                </div>
                <button style={css.chatBtn}>💬 Chat</button>
              </div>
            ))}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

const css = {
  page: { minHeight: '100vh', background: '#0d0d14', fontFamily: "'DM Sans', sans-serif", paddingBottom: 80 },
  header: { padding: '1rem 1.25rem', borderBottom: '1px solid #2d2d3d' },
  logo: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: '#fff' },
  content: { padding: '1rem 1.25rem' },
  sectionTitle: { fontSize: 14, color: '#9d9db5', marginBottom: 16, fontWeight: 500 },
  card: { display: 'flex', alignItems: 'center', gap: 14, background: '#16161f', border: '1px solid #2d2d3d', borderRadius: 16, padding: '1rem', marginBottom: 12, cursor: 'pointer' },
  avatar: { width: 52, height: 52, borderRadius: '50%', background: 'rgba(192,132,252,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 },
  info: { flex: 1, minWidth: 0 },
  name: { fontSize: 16, fontWeight: 600, color: '#fff' },
  role: { fontSize: 12, color: '#9d9db5', marginTop: 2 },
  tags: { display: 'flex', gap: 5, marginTop: 8, flexWrap: 'wrap' },
  tag: { fontSize: 10, padding: '3px 8px', borderRadius: 8, background: 'rgba(192,132,252,0.12)', color: '#c084fc', fontWeight: 600 },
  chatBtn: { background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, flexShrink: 0 },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 160px)', gap: 10, textAlign: 'center' },
  emptyTitle: { fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: 22, fontWeight: 700 },
  emptySub: { color: '#6b6b7a', fontSize: 14 },
  discoverBtn: { marginTop: 12, padding: '12px 28px', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: '#fff', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
};