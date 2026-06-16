import { useParams, useNavigate } from 'react-router-dom';
import MUSICIANS from '../data/musicians';
import BottomNav from '../components/BottomNav';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const musician = MUSICIANS.find(m => m.id === Number(id));

  if (!musician) {
    return (
      <div style={css.page}>
        <div style={css.notFound}>
          <div style={{ fontSize: 48 }}>🎸</div>
          <div style={{ color: '#fff', fontSize: 18, marginTop: 12 }}>Músico não encontrado</div>
          <button style={css.backBtn} onClick={() => navigate('/discover')}>← Voltar</button>
        </div>
      </div>
    );
  }

  const socials = musician.socials || {};

  return (
    <div style={css.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        .social-btn:hover { opacity: 0.8; transform: translateY(-2px); }
      `}</style>

      {/* Header */}
      <div style={css.header}>
        <button style={css.backBtn} onClick={() => navigate('/discover')}>← Voltar</button>
        <div style={css.headerTitle}>Perfil</div>
        <div style={{ width: 60 }} />
      </div>

      {/* Banner / foto */}
      <div style={css.banner}>
        <div style={css.avatarCircle}>{musician.emoji}</div>
        {musician.online && <div style={css.onlineBadge}>● Online agora</div>}
      </div>

      {/* Info principal */}
      <div style={css.content}>
        <div style={css.name}>{musician.name}</div>
        <div style={css.role}>{musician.role} · {musician.exp} de experiência</div>

        <div style={css.tags}>
          {musician.genres.map(g => <span key={g} style={css.tagGenre}>{g}</span>)}
          <span style={css.tagCity}>📍 {musician.city}</span>
        </div>

        {/* Bio */}
        <div style={css.section}>
          <div style={css.sectionTitle}>Sobre</div>
          <div style={css.bio}>"{musician.bio}"</div>
        </div>

        {/* Redes sociais */}
        <div style={css.section}>
          <div style={css.sectionTitle}>Redes sociais</div>
          <div style={css.socials}>
            <a href={socials.instagram || '#'} style={{ ...css.socialBtn, background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }} className="social-btn">
              <span style={css.socialIcon}>📸</span>
              <span>Instagram</span>
            </a>
            <a href={socials.youtube || '#'} style={{ ...css.socialBtn, background: '#FF0000' }} className="social-btn">
              <span style={css.socialIcon}>▶️</span>
              <span>YouTube</span>
            </a>
            <a href={socials.soundcloud || '#'} style={{ ...css.socialBtn, background: '#ff5500' }} className="social-btn">
              <span style={css.socialIcon}>🎵</span>
              <span>SoundCloud</span>
            </a>
            <a href={socials.spotify || '#'} style={{ ...css.socialBtn, background: '#1DB954' }} className="social-btn">
              <span style={css.socialIcon}>🎧</span>
              <span>Spotify</span>
            </a>
          </div>
        </div>

        {/* Botões de ação */}
        <div style={css.actionRow}>
          <button style={css.btnSkip} onClick={() => navigate('/discover')}>✕ Passar</button>
          <button style={css.btnMatch} onClick={() => navigate('/discover')}>💜 Match</button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

const css = {
  page: { minHeight: '100vh', background: '#0d0d14', fontFamily: "'DM Sans', sans-serif", paddingBottom: 100 },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', borderBottom: '1px solid #2d2d3d' },
  headerTitle: { fontSize: 16, fontWeight: 600, color: '#fff' },
  backBtn: { background: 'transparent', border: '1px solid #2d2d3d', color: '#9d9db5', borderRadius: 10, padding: '7px 14px', cursor: 'pointer', fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  banner: { height: 200, background: 'linear-gradient(135deg, #1a0a2e, #2d1660)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarCircle: { width: 110, height: 110, borderRadius: '50%', background: 'rgba(192,132,252,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, border: '3px solid rgba(192,132,252,0.3)' },
  onlineBadge: { position: 'absolute', bottom: 14, right: 14, fontSize: 12, color: '#34d399', background: 'rgba(52,211,153,0.12)', padding: '4px 10px', borderRadius: 20, fontWeight: 500 },
  content: { padding: '1.25rem' },
  name: { fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: '#fff', marginTop: 8 },
  role: { fontSize: 14, color: '#9d9db5', marginTop: 4 },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 },
  tagGenre: { fontSize: 12, padding: '4px 12px', borderRadius: 10, background: 'rgba(192,132,252,0.12)', color: '#c084fc', fontWeight: 600 },
  tagCity: { fontSize: 12, padding: '4px 12px', borderRadius: 10, background: 'rgba(52,211,153,0.12)', color: '#34d399', fontWeight: 600 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: '#6b6b7a', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 },
  bio: { fontSize: 15, color: '#9d9db5', lineHeight: 1.7, background: '#16161f', border: '1px solid #2d2d3d', borderRadius: 14, padding: '1rem' },
  socials: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 },
  socialBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: 12, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s' },
  socialIcon: { fontSize: 18 },
  actionRow: { display: 'flex', gap: 12, marginTop: 32 },
  btnSkip: { flex: 1, padding: '14px', border: '1px solid #2d2d3d', background: '#16161f', color: '#9d9db5', borderRadius: 14, cursor: 'pointer', fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 },
  btnMatch: { flex: 2, padding: '14px', border: 'none', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: '#fff', borderRadius: 14, cursor: 'pointer', fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, boxShadow: '0 4px 20px rgba(147,51,234,0.35)' },
  notFound: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 12 },
};