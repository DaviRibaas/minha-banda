import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GENRES = ["Rock", "Metal", "Pop", "Jazz", "MPB", "Samba", "Funk", "Eletrônico", "Clássico", "Blues"];
const INSTRUMENTS = ["Guitarra", "Baixo", "Bateria", "Teclado", "Violão", "Voz", "Saxofone", "Trompete", "Violino", "Outros"];

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "",
    instrument: "", genres: [], city: "", bio: "", lookingFor: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const toggleArray = (key, val) => {
    setForm(f => {
      const arr = f[key];
      return { ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] };
    });
  };

  const validate = () => {
    const e = {};
    if (mode === "login") {
      if (!form.email) e.email = "Obrigatório";
      if (!form.password) e.password = "Obrigatório";
    } else if (step === 1) {
      if (!form.name) e.name = "Informe seu nome";
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "E-mail inválido";
      if (!form.password || form.password.length < 6) e.password = "Mínimo 6 caracteres";
      if (form.password !== form.confirmPassword) e.confirmPassword = "Senhas não coincidem";
    } else {
      if (!form.instrument) e.instrument = "Escolha um instrumento";
      if (form.genres.length === 0) e.genres = "Escolha pelo menos um gênero";
      if (!form.city) e.city = "Informe sua cidade";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Redireciona para /discover quando success vira true
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => navigate('/discover'), 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleSubmit = () => {
    if (!validate()) return;
    if (mode === "register" && step === 1) { setStep(2); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  if (success) {
    return (
      <div style={css.page}>
        <Background />
        <div style={css.card}>
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎸</div>
            <h2 style={css.successTitle}>Bem-vindo ao MusiJoin!</h2>
            <p style={css.successSub}>
              {mode === "login" ? "Entrando no app…" : "Sua conta foi criada. Vamos encontrar sua banda!"}
            </p>
            <div style={css.progressBar}><div style={css.progressFill} /></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={css.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: #6b6b7a; }
        input:focus { outline: none; border-color: #c084fc !important; }
        button:active { transform: scale(0.97); }
        .chip { transition: all 0.15s; cursor: pointer; }
        .chip:hover { border-color: #c084fc !important; color: #c084fc !important; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fill { from { width: 0% } to { width: 100% } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .card-anim { animation: fadeUp 0.5s ease forwards; }
      `}</style>

      <Background />

      <div style={css.left}>
        <div style={{ animation: "float 4s ease-in-out infinite" }}>
          <div style={css.brandIcon}>🎸</div>
        </div>
        <h1 style={css.brandName}>MusiJoin</h1>
        <p style={css.brandTagline}>Conecte-se com músicos.<br />Monte sua banda.</p>
        <div style={css.floatingNotes}>
          {["🥁", "🎹", "🎺", "🎻", "🎵"].map((n, i) => (
            <span key={i} style={{ ...css.note, animationDelay: `${i * 0.6}s`, top: `${20 + i * 14}%`, left: `${10 + (i % 3) * 30}%` }}>{n}</span>
          ))}
        </div>
      </div>

      <div style={css.right}>
        <div style={css.card} className="card-anim">
          <div style={css.tabs}>
            {["login", "register"].map(m => (
              <button key={m} style={{ ...css.tab, ...(mode === m ? css.tabActive : {}) }}
                onClick={() => { setMode(m); setStep(1); setErrors({}); }}>
                {m === "login" ? "Entrar" : "Cadastrar"}
              </button>
            ))}
          </div>
          {mode === "register" && (
            <div style={css.stepRow}>
              <div style={{ ...css.stepDot, background: "#c084fc" }}>1</div>
              <div style={{ ...css.stepLine, background: step === 2 ? "#c084fc" : "#2d2d3d" }} />
              <div style={{ ...css.stepDot, background: step === 2 ? "#c084fc" : "#2d2d3d" }}>2</div>
              <span style={css.stepLabel}>{step === 1 ? "Conta" : "Seu perfil"}</span>
            </div>
          )}
          {mode === "login" && (
            <div>
              <h2 style={css.formTitle}>Bem-vindo de volta 👋</h2>
              <Field label="E-mail" type="email" placeholder="seu@email.com"
                value={form.email} onChange={v => set("email", v)} error={errors.email} />
              <Field label="Senha" type="password" placeholder="••••••••"
                value={form.password} onChange={v => set("password", v)} error={errors.password} />
              <div style={{ textAlign: "right", marginBottom: 20 }}>
                <a href="#" style={css.link}>Esqueceu a senha?</a>
              </div>
              <SubmitBtn loading={loading} onClick={handleSubmit}>Entrar</SubmitBtn>
              <Divider />
              <SocialBtn icon="G" label="Entrar com Google" />
            </div>
          )}
          {mode === "register" && step === 1 && (
            <div>
              <h2 style={css.formTitle}>Crie sua conta</h2>
              <Field label="Nome completo" placeholder="Como você quer ser chamado?"
                value={form.name} onChange={v => set("name", v)} error={errors.name} />
              <Field label="E-mail" type="email" placeholder="seu@email.com"
                value={form.email} onChange={v => set("email", v)} error={errors.email} />
              <Field label="Senha" type="password" placeholder="Mínimo 6 caracteres"
                value={form.password} onChange={v => set("password", v)} error={errors.password} />
              <Field label="Confirmar senha" type="password" placeholder="Repita a senha"
                value={form.confirmPassword} onChange={v => set("confirmPassword", v)} error={errors.confirmPassword} />
              <SubmitBtn loading={loading} onClick={handleSubmit}>Continuar →</SubmitBtn>
            </div>
          )}
          {mode === "register" && step === 2 && (
            <div>
              <h2 style={css.formTitle}>Seu perfil musical</h2>
              <label style={css.label}>Instrumento principal</label>
              <div style={css.chipGrid}>
                {INSTRUMENTS.map(inst => (
                  <div key={inst} className="chip"
                    style={{ ...css.chip, ...(form.instrument === inst ? css.chipActive : {}) }}
                    onClick={() => set("instrument", inst)}>{inst}</div>
                ))}
              </div>
              {errors.instrument && <span style={css.error}>{errors.instrument}</span>}
              <label style={{ ...css.label, marginTop: 16 }}>Gêneros musicais</label>
              <div style={css.chipGrid}>
                {GENRES.map(g => (
                  <div key={g} className="chip"
                    style={{ ...css.chip, ...(form.genres.includes(g) ? css.chipActive : {}) }}
                    onClick={() => toggleArray("genres", g)}>{g}</div>
                ))}
              </div>
              {errors.genres && <span style={css.error}>{errors.genres}</span>}
              <Field label="Cidade" placeholder="Ex: São Paulo, SP"
                value={form.city} onChange={v => set("city", v)} error={errors.city}
                style={{ marginTop: 16 }} />
              <label style={css.label}>Mini bio (opcional)</label>
              <textarea
                placeholder="Conte um pouco sobre você e o que você toca…"
                value={form.bio}
                onChange={e => set("bio", e.target.value)}
                style={css.textarea}
                rows={3}
              />
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => setStep(1)} style={css.backBtn}>← Voltar</button>
                <SubmitBtn loading={loading} onClick={handleSubmit} style={{ flex: 1 }}>
                  Criar conta 🎸
                </SubmitBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, error, style }) {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      <label style={css.label}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ ...css.input, ...(error ? { borderColor: "#f87171" } : {}) }}
      />
      {error && <span style={css.error}>{error}</span>}
    </div>
  );
}

function SubmitBtn({ children, onClick, loading, style }) {
  return (
    <button onClick={onClick} disabled={loading}
      style={{ ...css.submitBtn, ...(loading ? { opacity: 0.7 } : {}), ...style }}>
      {loading ? <span style={css.spinner} /> : children}
    </button>
  );
}

function SocialBtn({ icon, label }) {
  return (
    <button style={css.socialBtn}>
      <span style={css.socialIcon}>{icon}</span>
      {label}
    </button>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "#2d2d3d" }} />
      <span style={{ color: "#6b6b7a", fontSize: 12 }}>ou</span>
      <div style={{ flex: 1, height: 1, background: "#2d2d3d" }} />
    </div>
  );
}

function Background() {
  return (
    <div style={css.bgWrap} aria-hidden="true">
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          width: 300 + i * 80,
          height: 300 + i * 80,
          borderRadius: "50%",
          border: `1px solid rgba(192,132,252,${0.04 + i * 0.01})`,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }} />
      ))}
      <div style={css.glow1} />
      <div style={css.glow2} />
    </div>
  );
}

const css = {
  page: { minHeight: "100vh", background: "#0d0d14", display: "flex", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" },
  bgWrap: { position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" },
  glow1: { position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)", top: "10%", left: "30%", transform: "translate(-50%,-50%)" },
  glow2: { position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)", bottom: "10%", right: "20%" },
  left: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "2rem" },
  brandIcon: { fontSize: 72, marginBottom: 16 },
  brandName: { fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: -1 },
  brandTagline: { color: "#9d9db5", fontSize: 18, textAlign: "center", lineHeight: 1.6, marginTop: 12, fontWeight: 300 },
  floatingNotes: { position: "absolute", inset: 0, pointerEvents: "none" },
  note: { position: "absolute", fontSize: 24, opacity: 0.15, animation: "float 3s ease-in-out infinite" },
  right: { width: 460, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", zIndex: 1 },
  card: { width: "100%", background: "#16161f", borderRadius: 20, padding: "2rem", border: "1px solid #2d2d3d" },
  tabs: { display: "flex", marginBottom: 28, background: "#0d0d14", borderRadius: 12, padding: 4 },
  tab: { flex: 1, padding: "10px", border: "none", borderRadius: 8, cursor: "pointer", background: "transparent", color: "#6b6b7a", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 500, transition: "all 0.2s" },
  tabActive: { background: "#1e1e2e", color: "#c084fc" },
  stepRow: { display: "flex", alignItems: "center", marginBottom: 24, gap: 8 },
  stepDot: { width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff", flexShrink: 0, transition: "background 0.3s" },
  stepLine: { flex: 1, height: 2, borderRadius: 1, transition: "background 0.3s" },
  stepLabel: { color: "#9d9db5", fontSize: 13, marginLeft: 4 },
  formTitle: { fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 24, fontWeight: 700, marginBottom: 24, marginTop: 0 },
  label: { display: "block", color: "#9d9db5", fontSize: 13, marginBottom: 6, fontWeight: 500 },
  input: { width: "100%", background: "#0d0d14", border: "1px solid #2d2d3d", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 15, fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s" },
  textarea: { width: "100%", background: "#0d0d14", border: "1px solid #2d2d3d", borderRadius: 10, padding: "11px 14px", color: "#fff", fontSize: 14, fontFamily: "'DM Sans', sans-serif", resize: "vertical", outline: "none", marginBottom: 4 },
  error: { color: "#f87171", fontSize: 12, marginTop: 4, display: "block" },
  link: { color: "#c084fc", fontSize: 13, textDecoration: "none" },
  submitBtn: { width: "100%", background: "linear-gradient(135deg, #9333ea, #7c3aed)", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.2s, transform 0.15s", display: "flex", alignItems: "center", justifyContent: "center" },
  backBtn: { background: "transparent", border: "1px solid #2d2d3d", color: "#9d9db5", borderRadius: 12, padding: "13px 20px", cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif" },
  socialBtn: { width: "100%", background: "#0d0d14", border: "1px solid #2d2d3d", color: "#fff", borderRadius: 12, padding: "12px", fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 },
  socialIcon: { width: 24, height: 24, background: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#1a1a2e", fontSize: 12, fontWeight: 900 },
  chipGrid: { display: "flex", flexWrap: "wrap", gap: 8 },
  chip: { padding: "6px 13px", borderRadius: 20, fontSize: 13, border: "1px solid #2d2d3d", color: "#9d9db5", userSelect: "none" },
  chipActive: { background: "#1e1e2e", borderColor: "#c084fc", color: "#c084fc" },
  spinner: { width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" },
  progressBar: { width: "100%", height: 4, background: "#2d2d3d", borderRadius: 2, marginTop: 24 },
  progressFill: { height: "100%", background: "#9333ea", borderRadius: 2, animation: "fill 1.5s ease forwards" },
  successTitle: { fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: 26, margin: "0 0 8px" },
  successSub: { color: "#9d9db5", fontSize: 15 },
};
