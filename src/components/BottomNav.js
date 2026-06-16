import { useNavigate, useLocation } from 'react-router-dom';

const items = [
  { icon: '🔍', label: 'Descobrir', path: '/discover' },
  { icon: '💜', label: 'Matches', path: '/matches' },
  { icon: '💬', label: 'Chat', path: '/chat' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav style={css.nav}>
      {items.map(item => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{ ...css.item, ...(active ? css.itemActive : {}) }}
          >
            <span style={css.icon}>{item.icon}</span>
            <span style={css.label}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

const css = {
  nav: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: '#16161f', borderTop: '1px solid #2d2d3d',
    display: 'flex', zIndex: 100,
  },
  item: {
    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '10px 0 14px', border: 'none', background: 'transparent',
    cursor: 'pointer', gap: 3, transition: 'all 0.15s',
  },
  itemActive: { borderTop: '2px solid #c084fc' },
  icon: { fontSize: 22 },
  label: { fontSize: 10, color: '#6b6b7a', fontFamily: "'DM Sans', sans-serif" },
};