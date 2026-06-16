import { useState } from 'react';
import BottomNav from '../components/BottomNav';

const INITIAL_MESSAGES = [
  { from: 'them', text: 'Oi! Vi que você precisa de baterista. Tenho interesse!' },
  { from: 'them', text: 'Que estilo de música vocês tocam?' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'me', text: input.trim() }]);
    setInput('');
  };

  return (
    <div style={css.page}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap'); * { box-sizing: border-box; }`}</style>

      <div style={css.header}>
        <div style={css.avatar}>🥁</div>
        <div>
          <div style={css.name}>Felipe Souza</div>
          <div style={css.status}>● Online agora</div>
        </div>
      </div>

      <div style={css.messages}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
            <div style={{ ...css.bubble, ...(msg.from === 'me' ? css.bubbleMe : css.bubbleThem) }}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div style={css.inputArea}>
        <input
          style={css.input}
          placeholder="Escreva uma mensagem..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button style={css.sendBtn} onClick={send}>➤</button>
      </div>

      <BottomNav />
    </div>
  );
}

const css = {
  page: { minHeight: '100vh', background: '#0d0d14', fontFamily: "'DM Sans', sans-serif", display: 'flex', flexDirection: 'column', paddingBottom: 80 },
  header: { display: 'flex', alignItems: 'center', gap: 12, padding: '1rem 1.25rem', borderBottom: '1px solid #2d2d3d', background: '#16161f' },
  avatar: { width: 44, height: 44, borderRadius: '50%', background: 'rgba(192,132,252,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 },
  name: { fontSize: 16, fontWeight: 600, color: '#fff' },
  status: { fontSize: 12, color: '#34d399', marginTop: 2 },
  messages: { flex: 1, padding: '1rem 1.25rem', overflowY: 'auto' },
  bubble: { maxWidth: '75%', padding: '10px 14px', borderRadius: 16, fontSize: 14, lineHeight: 1.5 },
  bubbleThem: { background: '#16161f', color: '#fff', border: '1px solid #2d2d3d', borderTopLeftRadius: 4 },
  bubbleMe: { background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: '#fff', borderTopRightRadius: 4 },
  inputArea: { display: 'flex', gap: 10, padding: '0.75rem 1.25rem', borderTop: '1px solid #2d2d3d', background: '#16161f' },
  input: { flex: 1, background: '#0d0d14', border: '1px solid #2d2d3d', borderRadius: 12, padding: '10px 14px', color: '#fff', fontSize: 14, fontFamily: "'DM Sans', sans-serif", outline: 'none' },
  sendBtn: { width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #9333ea, #7c3aed)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
};