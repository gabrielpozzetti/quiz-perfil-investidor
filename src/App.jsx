import { useState, useEffect } from "react";

const GOLD = "#C9A84C";
const NAVY = "#0D1B2A";
const TEAL = "#2EC4B6";
const RED = "#DC2626";
const GREEN = "#16A34A";
const LIGHT = "#F8F7F4";

const QUESTIONS = [
  {
    id: 1,
    icon: "🎯",
    question: "Qual é o seu principal objetivo ao investir?",
    options: [
      { text: "Proteger meu patrimônio da inflação", score: 1 },
      { text: "Ter uma renda extra mensal", score: 2 },
      { text: "Fazer meu patrimônio crescer no longo prazo", score: 3 },
      { text: "Buscar retornos acima da média, mesmo com risco", score: 4 },
    ],
  },
  {
    id: 2,
    icon: "⏳",
    question: "Em quanto tempo pretende usar o dinheiro investido?",
    options: [
      { text: "Menos de 1 ano", score: 1 },
      { text: "Entre 1 e 3 anos", score: 2 },
      { text: "Entre 3 e 10 anos", score: 3 },
      { text: "Mais de 10 anos", score: 4 },
    ],
  },
  {
    id: 3,
    icon: "📉",
    question: "Se sua carteira caísse 20% em um mês, o que você faria?",
    options: [
      { text: "Venderia tudo imediatamente para evitar mais perdas", score: 1 },
      { text: "Venderia parte para reduzir a exposição", score: 2 },
      { text: "Não faria nada e esperaria a recuperação", score: 3 },
      { text: "Compraria mais, aproveitando o preço baixo", score: 4 },
    ],
  },
  {
    id: 4,
    icon: "📊",
    question: "Qual a sua experiência com investimentos?",
    options: [
      { text: "Só invisto em poupança ou CDB", score: 1 },
      { text: "Já investi em fundos e Tesouro Direto", score: 2 },
      { text: "Invisto em ações, FIIs e renda fixa", score: 3 },
      { text: "Tenho experiência com derivativos, cripto ou operações alavancadas", score: 4 },
    ],
  },
  {
    id: 5,
    icon: "💰",
    question: "Qual porcentagem da sua renda mensal você consegue investir?",
    options: [
      { text: "Menos de 10%", score: 1 },
      { text: "Entre 10% e 20%", score: 2 },
      { text: "Entre 20% e 40%", score: 3 },
      { text: "Mais de 40%", score: 4 },
    ],
  },
  {
    id: 6,
    icon: "🛡️",
    question: "Você tem uma reserva de emergência (6-12 meses de gastos)?",
    options: [
      { text: "Não tenho reserva de emergência", score: 1 },
      { text: "Tenho menos de 3 meses", score: 2 },
      { text: "Tenho entre 3 e 6 meses", score: 3 },
      { text: "Tenho mais de 6 meses guardados", score: 4 },
    ],
  },
  {
    id: 7,
    icon: "🎢",
    question: "Como você se sente quando o mercado está volátil?",
    options: [
      { text: "Fico ansioso e perco o sono", score: 1 },
      { text: "Fico preocupado mas consigo lidar", score: 2 },
      { text: "Acompanho com calma, sem me abalar", score: 3 },
      { text: "Fico empolgado — volatilidade é oportunidade", score: 4 },
    ],
  },
  {
    id: 8,
    icon: "🏠",
    question: "Como está distribuído o seu patrimônio hoje?",
    options: [
      { text: "Quase tudo em imóveis ou poupança", score: 1 },
      { text: "Maior parte em renda fixa, pouco em variável", score: 2 },
      { text: "Equilibrado entre renda fixa e variável", score: 3 },
      { text: "Maior parte em renda variável e investimentos alternativos", score: 4 },
    ],
  },
];

const PROFILES = {
  conservador: {
    name: "Conservador",
    emoji: "🛡️",
    color: "#3B82F6",
    range: "8-13",
    headline: "Segurança em primeiro lugar",
    description: "Você prioriza a preservação do patrimônio. Prefere previsibilidade e tem baixa tolerância a oscilações. Seu foco é proteger o que conquistou, com crescimento gradual e consistente.",
    traits: ["Prioriza segurança sobre rentabilidade", "Baixa tolerância a oscilações", "Horizonte de curto a médio prazo", "Prefere previsibilidade nos retornos"],
    allocation: { "Renda Fixa": 70, "Multimercado": 15, "Ações": 10, "Internacional": 5 },
    allocColors: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"],
    tip: "Cuidado para não ser conservador demais — a inflação corrói seu patrimônio silenciosamente. Uma alocação 100% em renda fixa pode parecer segura, mas perde poder de compra ao longo dos anos.",
  },
  moderado: {
    name: "Moderado",
    emoji: "⚖️",
    color: TEAL,
    range: "14-20",
    headline: "Equilíbrio entre segurança e crescimento",
    description: "Você busca o melhor dos dois mundos: segurança com uma dose calculada de risco para fazer o patrimônio crescer. Aceita oscilações de curto prazo em troca de melhores resultados no longo prazo.",
    traits: ["Busca equilíbrio risco x retorno", "Aceita oscilações moderadas", "Horizonte de médio a longo prazo", "Entende que volatilidade é temporária"],
    allocation: { "Renda Fixa": 45, "Ações": 25, "Multimercado": 15, "Internacional": 15 },
    allocColors: ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B"],
    tip: "Perfil mais comum entre investidores bem-sucedidos. O desafio é manter a disciplina nas quedas e não migrar para o conservadorismo por impulso emocional.",
  },
  arrojado: {
    name: "Arrojado",
    emoji: "🚀",
    color: "#F59E0B",
    range: "21-27",
    headline: "Crescimento acelerado com risco calculado",
    description: "Você tem boa tolerância a risco e busca retornos acima da média. Entende que oscilações fazem parte do jogo e mantém o foco no longo prazo. Já tem experiência e reserva de emergência estruturada.",
    traits: ["Alta tolerância a oscilações", "Foco no crescimento de longo prazo", "Experiência com renda variável", "Reserva de emergência consolidada"],
    allocation: { "Ações": 40, "Renda Fixa": 25, "Internacional": 20, "Multimercado": 15 },
    allocColors: ["#10B981", "#3B82F6", "#F59E0B", "#8B5CF6"],
    tip: "Atenção à concentração setorial e ao viés de confirmação. Diversificação internacional e rebalanceamento periódico são essenciais para este perfil.",
  },
  agressivo: {
    name: "Agressivo",
    emoji: "⚡",
    color: RED,
    range: "28-32",
    headline: "Máximo retorno, máxima exposição",
    description: "Você busca os maiores retornos possíveis e aceita alta volatilidade. Tem experiência significativa, capital disponível e horizonte longo. Volatilidade é sinônimo de oportunidade para você.",
    traits: ["Busca retornos máximos", "Alta experiência em mercados", "Horizonte longo (10+ anos)", "Vê quedas como oportunidade de compra"],
    allocation: { "Ações": 50, "Internacional": 25, "Multimercado": 15, "Renda Fixa": 10 },
    allocColors: ["#10B981", "#F59E0B", "#8B5CF6", "#3B82F6"],
    tip: "O maior risco deste perfil não é o mercado — é o excesso de confiança. Mesmo investidores agressivos precisam de proteção patrimonial e gestão de risco disciplinada.",
  },
};

function getProfile(score) {
  if (score <= 13) return PROFILES.conservador;
  if (score <= 20) return PROFILES.moderado;
  if (score <= 27) return PROFILES.arrojado;
  return PROFILES.agressivo;
}

function MiniPie({ allocation, colors }) {
  const entries = Object.entries(allocation);
  let cumAngle = 0;
  const r = 70, cx = 80, cy = 80;

  return (
    <svg viewBox="0 0 160 160" style={{ width: "140px", height: "140px" }}>
      {entries.map(([label, pct], i) => {
        const startAngle = cumAngle;
        const sliceAngle = (pct / 100) * 360;
        cumAngle += sliceAngle;
        const startRad = ((startAngle - 90) * Math.PI) / 180;
        const endRad = (((startAngle + sliceAngle) - 90) * Math.PI) / 180;
        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);
        const large = sliceAngle > 180 ? 1 : 0;
        const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`;
        return <path key={i} d={d} fill={colors[i]} opacity="0.85" />;
      })}
      <circle cx={cx} cy={cy} r="35" fill="white" />
    </svg>
  );
}

function ProgressBar({ current, total }) {
  const pct = (current / total) * 100;
  return (
    <div style={{ width: "100%", marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>
        <span>Pergunta {current} de {total}</span>
        <span>{pct.toFixed(0)}%</span>
      </div>
      <div style={{ width: "100%", height: "6px", background: "#E5E7EB", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${TEAL}, ${GOLD})`, borderRadius: "3px", transition: "width 0.4s ease" }} />
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro, quiz, result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score) => {
    setSelected(score);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, score];
      setAnswers(newAnswers);
      setSelected(null);
      setAnimating(false);
      if (current + 1 >= QUESTIONS.length) {
        setScreen("result");
        setTimeout(() => setShowResult(true), 300);
      } else {
        setCurrent(current + 1);
      }
    }, 400);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const profile = getProfile(totalScore);

  const restart = () => {
    setScreen("intro");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setShowResult(false);
  };

  const waMsg = encodeURIComponent(
    `Olá Gabriel! Fiz o Quiz de Perfil de Investidor e quero entender melhor meu resultado.\n\n` +
    `🎯 Meu perfil: ${profile.name}\n` +
    `📊 Pontuação: ${totalScore}/32\n\n` +
    `Respostas:\n` +
    answers.map((s, i) => `${i+1}. ${QUESTIONS[i]?.question.slice(0,40)}... → ${s}/4`).join("\n") +
    `\n\nGostaria de agendar uma conversa!`
  );

  return (
    <div style={{ minHeight: "100vh", background: LIGHT, fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", margin: 0, padding: 0 }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${LIGHT}; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .fade-in { animation: fadeInUp 0.5s ease forwards; }
        .option-btn { transition: all 0.2s ease; }
        .option-btn:hover { transform: translateX(6px); box-shadow: 0 4px 15px rgba(0,0,0,0.08); }
      `}</style>

      {/* Header */}
      <div style={{ width: "100%", background: NAVY, padding: "1.2rem 1rem", textAlign: "center", borderBottom: `3px solid ${GOLD}` }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase", marginBottom: "0.3rem", fontWeight: 600 }}>
          Gabriel Investe — Consultoria Independente — CVM
        </div>
        <h1 style={{ fontFamily: "'DM Serif Display', Georgia, serif", color: "white", fontSize: "clamp(1.2rem, 4vw, 1.7rem)", margin: 0, fontWeight: 400 }}>
          {screen === "result" ? "Seu Perfil de Investidor" : "Quiz: Perfil de Investidor"}
        </h1>
      </div>

      <div style={{ width: "100%", maxWidth: "640px", padding: "1.5rem 1rem" }}>

        {/* ═══ INTRO ═══ */}
        {screen === "intro" && (
          <div className="fade-in" style={{ background: "white", borderRadius: "16px", padding: "2rem 1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", textAlign: "center" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎯</div>
            <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.5rem", color: NAVY, marginBottom: "0.5rem" }}>
              Descubra seu Perfil de Investidor
            </h2>
            <p style={{ color: "#6B7280", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Responda <b>8 perguntas</b> rápidas e descubra qual é o seu perfil real de investidor — 
              Conservador, Moderado, Arrojado ou Agressivo — com uma sugestão de alocação personalizada.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem", marginBottom: "1.5rem", textAlign: "left" }}>
              {[
                { icon: "⏱️", text: "Leva 2 minutos" },
                { icon: "🔒", text: "100% gratuito" },
                { icon: "📊", text: "Resultado personalizado" },
                { icon: "💡", text: "Dica de alocação" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem", background: "#F9FAFB", borderRadius: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.82rem", color: "#4B5563" }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setScreen("quiz")}
              style={{
                display: "inline-block", padding: "0.9rem 2.5rem", border: "none",
                background: `linear-gradient(135deg, ${GOLD}, ${GOLD}DD)`,
                color: NAVY, fontWeight: 700, fontSize: "1rem",
                borderRadius: "10px", cursor: "pointer", letterSpacing: "0.04em",
                boxShadow: `0 4px 14px ${GOLD}40`, transition: "transform 0.2s",
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseLeave={(e) => e.target.style.transform = "translateY(0)"}
            >
              COMEÇAR O QUIZ
            </button>
          </div>
        )}

        {/* ═══ QUIZ ═══ */}
        {screen === "quiz" && (
          <div className="fade-in" key={current}>
            <ProgressBar current={current + 1} total={QUESTIONS.length} />

            <div style={{ background: "white", borderRadius: "16px", padding: "1.8rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB" }}>
              <div style={{ fontSize: "2.5rem", textAlign: "center", marginBottom: "0.8rem" }}>
                {QUESTIONS[current].icon}
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.15rem", color: NAVY, textAlign: "center", marginBottom: "1.5rem", lineHeight: 1.4 }}>
                {QUESTIONS[current].question}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                {QUESTIONS[current].options.map((opt, i) => {
                  const isSelected = selected === opt.score;
                  return (
                    <button
                      key={i}
                      className="option-btn"
                      onClick={() => !animating && handleAnswer(opt.score)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.8rem",
                        width: "100%", padding: "1rem 1.2rem", border: `2px solid ${isSelected ? TEAL : "#E5E7EB"}`,
                        background: isSelected ? `${TEAL}10` : "white",
                        borderRadius: "12px", cursor: animating ? "default" : "pointer",
                        textAlign: "left", fontSize: "0.9rem", color: NAVY,
                        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                        opacity: animating && !isSelected ? 0.5 : 1,
                      }}
                    >
                      <span style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                        background: isSelected ? TEAL : "#F3F4F6",
                        color: isSelected ? "white" : "#9CA3AF",
                        fontSize: "0.75rem", fontWeight: 700,
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ═══ RESULT ═══ */}
        {screen === "result" && (
          <div style={{ opacity: showResult ? 1 : 0, transform: showResult ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
            {/* Profile card */}
            <div style={{ background: "white", borderRadius: "16px", padding: "2rem 1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: `2px solid ${profile.color}30`, textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "0.5rem" }}>{profile.emoji}</div>
              <div style={{ fontSize: "0.72rem", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.3rem" }}>
                Seu perfil é
              </div>
              <h2 style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontSize: "1.8rem", color: profile.color, marginBottom: "0.3rem" }}>
                {profile.name}
              </h2>
              <div style={{ fontSize: "0.78rem", color: GOLD, fontWeight: 600, marginBottom: "1rem" }}>
                {profile.headline}
              </div>

              {/* Score bar */}
              <div style={{ margin: "0 auto 1.2rem", maxWidth: "300px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#9CA3AF", marginBottom: "0.3rem" }}>
                  <span>Conservador</span>
                  <span>Agressivo</span>
                </div>
                <div style={{ width: "100%", height: "10px", background: "#E5E7EB", borderRadius: "5px", position: "relative" }}>
                  <div style={{ width: `${(totalScore / 32) * 100}%`, height: "100%", borderRadius: "5px", background: `linear-gradient(90deg, #3B82F6, ${TEAL}, #F59E0B, ${RED})`, transition: "width 1s ease" }} />
                  <div style={{
                    position: "absolute", top: "-4px", left: `calc(${(totalScore / 32) * 100}% - 9px)`,
                    width: "18px", height: "18px", borderRadius: "50%", background: profile.color,
                    border: "3px solid white", boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }} />
                </div>
                <div style={{ fontSize: "0.72rem", color: profile.color, fontWeight: 700, marginTop: "0.5rem" }}>
                  Pontuação: {totalScore}/32
                </div>
              </div>

              <p style={{ fontSize: "0.88rem", color: "#4B5563", lineHeight: 1.6, textAlign: "left" }}>
                {profile.description}
              </p>
            </div>

            {/* Traits */}
            <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: "4px", height: "22px", background: profile.color, borderRadius: "2px" }} />
                <h3 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Suas Características
                </h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                {profile.traits.map((trait, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.4rem", padding: "0.6rem", background: `${profile.color}08`, borderRadius: "8px", border: `1px solid ${profile.color}15` }}>
                    <span style={{ color: profile.color, fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.8rem", color: "#4B5563", lineHeight: 1.4 }}>{trait}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Allocation */}
            <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)", border: "1px solid #E5E7EB", marginBottom: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                <div style={{ width: "4px", height: "22px", background: GOLD, borderRadius: "2px" }} />
                <h3 style={{ margin: 0, fontSize: "0.9rem", fontWeight: 700, color: NAVY, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Alocação Sugerida
                </h3>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                <MiniPie allocation={profile.allocation} colors={profile.allocColors} />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {Object.entries(profile.allocation).map(([label, pct], i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "3px", background: profile.allocColors[i], flexShrink: 0 }} />
                      <span style={{ fontSize: "0.82rem", color: "#4B5563" }}>{label}: <b>{pct}%</b></span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: "1rem", padding: "0.8rem", background: "#FFF8E1", borderRadius: "8px", border: `1px solid ${GOLD}30` }}>
                <div style={{ fontSize: "0.75rem", color: NAVY, lineHeight: 1.5 }}>
                  <b style={{ color: GOLD }}>💡 Dica do consultor:</b> {profile.tip}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ background: NAVY, borderRadius: "16px", padding: "1.8rem", textAlign: "center", marginBottom: "1rem" }}>
              <div style={{ fontSize: "0.9rem", color: GOLD, fontWeight: 600, marginBottom: "0.5rem" }}>
                Quer uma análise personalizada para o seu perfil {profile.name}?
              </div>
              <div style={{ fontSize: "0.78rem", color: "#9CA3AF", marginBottom: "1.2rem", lineHeight: 1.5 }}>
                Monto uma carteira sob medida com base no seu perfil,<br/>
                usando Protocolo IRIS e Simulação Monte Carlo.<br/>
                15 anos de experiência. CVM registrado. Fee-only.
              </div>
              <a href={`https://wa.me/5541998817220?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.9rem 2rem", textDecoration: "none",
                  background: "#25D366", color: "white", fontWeight: 700, fontSize: "0.88rem",
                  borderRadius: "10px", cursor: "pointer", letterSpacing: "0.04em",
                  boxShadow: "0 4px 14px rgba(37,211,102,0.4)", transition: "transform 0.2s",
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                QUERO MINHA CARTEIRA PERSONALIZADA
              </a>
              <div style={{ fontSize: "0.65rem", color: "#6B7280", marginTop: "0.8rem" }}>
                Seu resultado do quiz já vai junto na mensagem
              </div>
              <div style={{ borderTop: "1px solid #ffffff15", marginTop: "0.8rem", paddingTop: "0.8rem", display: "flex", justifyContent: "center", gap: "1.5rem" }}>
                <a href="https://www.instagram.com/gabrielinveste" target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "0.72rem", color: GOLD, textDecoration: "none", fontWeight: 600 }}>📸 Instagram</a>
                <span onClick={restart} style={{ fontSize: "0.72rem", color: "#9CA3AF", cursor: "pointer", fontWeight: 600 }}>🔄 Refazer quiz</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div style={{ fontSize: "0.65rem", color: "#9CA3AF", textAlign: "center", padding: "0.5rem 1rem", lineHeight: 1.6 }}>
              Este quiz é uma ferramenta educacional e não constitui recomendação de investimento.
              A alocação sugerida é ilustrativa e deve ser personalizada por um profissional.
              Gabriel Investe — Consultoria Independente registrada na CVM.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
