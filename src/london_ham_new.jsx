import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AcmeReel from "./AcmeReel.mp4";
import CutoutVid from "./cutoutvid.mp4";
import PairingImg from "./pairing.jpg";
import CineLoraRevImg from "./cineLoraRev.jpg";
import ComfyUiClip from "./ComfyUI_00001_ (1).mp4";
import ComfyUiClipAlt from "./ComfyUI_00011_.mp4";

/* ─── PALETTE & TOKENS ─────────────────────────────────────────────────── */
const C = {
  navy:    "#04061a",
  navyMid: "#080c2e",
  blue:    "#2a5cff",
  blueDim: "#1a3aad",
  blueGhost: "rgba(42,92,255,0.12)",
  yellow:  "#f5e642",
  yellowGhost: "rgba(245,230,66,0.07)",
  white:   "#f0efea",
  dim:     "rgba(240,239,234,0.42)",
  faint:   "rgba(240,239,234,0.14)",
  border:  "rgba(42,92,255,0.22)",
};

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const tfaChannels = [
  { num: "01", label: "5 video channels", body: "Multi-directional installation structure designed to simulate the pressure of information overload." },
  { num: "02", label: "1 audio channel", body: "A single sonic layer binds the fragmented image system into an enveloping spatial experience." },
  { num: "03", label: "Custom ML workflow", body: "Modified MediaPipe Selfie Segmentation pipeline in Python — repurposed from surveillance into editing tool." },
];

const tfaRefs = [
  ["01", "Arthur Jafa", "Love Is the Message, the Message Is Death"],
  ["02", "Mark Leckey", "Fiorucci Made Me Hardcore"],
  ["03", "Georges Bataille", "The Accursed Share"],
  ["04", "Byung-Chul Han", "Non-Things"],
  ["05", "Hito Steyerl", "Duty Free Art"],
];

const tfaProcess = [
  { label: "The hand", body: "First-person images of hands recur: throwing televisions, manipulating impossible objects, scrolling through social media while covered in blood." },
  { label: "The machine", body: "The segmentation system enters the edit as both collaborator and antagonist — a surveillance-derived process that produces masks, interruptions, automated decisions." },
  { label: "The room", body: "Installed across five channels, the work surrounds the viewer, replacing the single cinematic frame with a field of competing attention and unstable narrative." },
];

const clWorkflow = [
  { icon: "▤", step: "01", title: "Curate paired image-caption data", body: "A controlled dataset of images and matching .txt captions forms the evidence base for training and evaluation." },
  { icon: "✓", step: "02", title: "Validate and cache", body: "Dataset checks, latent caching, and text encoder caching make the pipeline reproducible before training begins." },
  { icon: "▧", step: "03", title: "Train Wan 2.2 LoRA", body: "Musubi Tuner with separate low-noise and high-noise LoRA experiments for the Wan 2.2 14B model." },
  { icon: "↗", step: "04", title: "Monitor, compare, iterate", body: "Outputs, logs, TensorBoard traces, and prompt tests are reviewed to identify overfitting, underfitting, style transfer strength." },
];

const clSpecs = [
  ["Base model", "Wan 2.2 14B"],
  ["Primary trainer", "Musubi Tuner"],
  ["Training site", "RunPod / VS Code SSH"],
  ["Precision", "bf16 with fp8 base"],
  ["LoRA rank", "network_dim 16 / alpha 16"],
];

const clDeliverables = [
  "validated image-caption dataset","RunPod training workspace",
  "Musubi Tuner scripts","low-noise LoRA checkpoint",
  "high-noise LoRA checkpoint","evaluation prompt suite",
  "visual output archive","methodology write-up",
];

const clQuestions = [
  "How can LoRA fine-tuning encode a repeatable cinematic style without retraining an entire generative video model?",
  "What does a practical, reproducible workflow for training cinematic Wan 2.2 LoRAs require?",
  "How do low-noise and high-noise training regimes influence the visual identity of generated motion-image outputs?",
];

/* ─── SMALL HELPERS ─────────────────────────────────────────────────────── */
function Mono({ children, style = {} }) {
  return <span style={{ fontFamily: "'IBM Plex Mono', monospace", ...style }}>{children}</span>;
}

function SectionLabel({ children }) {
  return (
    <Mono style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: C.yellow, display: "block", marginBottom: 14 }}>
      {children}
    </Mono>
  );
}

function Rule() {
  return <div style={{ height: 1, background: C.border, margin: "0" }} />;
}

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────────────── */
export default function LondonHamPortfolio() {
  const [time, setTime] = useState("");
  const [isPairingExpanded, setIsPairingExpanded] = useState(false);
  const [isCineLoraRevExpanded, setIsCineLoraRevExpanded] = useState(false);
  const [isComfyUiExpanded, setIsComfyUiExpanded] = useState(false);
  const [isComfyUiAltExpanded, setIsComfyUiAltExpanded] = useState(false);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toTimeString().slice(0,8));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <main style={{
      background: C.navy,
      color: C.white,
      minHeight: "100vh",
      fontFamily: "'DM Serif Display', Georgia, serif",
      overflowX: "hidden",
    }}>
      {/* Google fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: ${C.yellow}; color: ${C.navy}; }
        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; }
        html { scroll-behavior: smooth; }

        .nav-link:hover { color: ${C.yellow} !important; }
        .ref-row:hover { background: rgba(42,92,255,0.08) !important; }
        .wf-card:hover { border-color: ${C.blue} !important; transform: translateY(-2px); }
        .wf-card { transition: border-color 0.2s, transform 0.2s; }

        @media (max-width: 900px) {
          .site-nav {
            height: auto !important;
            flex-wrap: wrap !important;
          }

          .nav-brand {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid ${C.border} !important;
            padding: 12px 20px !important;
          }

          .nav-brand span {
            font-size: 16px !important;
          }

          .nav-links {
            width: 100% !important;
            padding: 10px 20px !important;
            gap: 18px !important;
            overflow-x: auto !important;
            flex: none !important;
          }

          .nav-tagline,
          .nav-clock {
            display: none !important;
          }

          .hero-section {
            min-height: 72vh !important;
            padding: 24px 20px 28px !important;
          }

          .hero-rule {
            left: 20px !important;
          }

          .hero-title {
            font-size: clamp(38px, 14vw, 62px) !important;
            line-height: 0.95 !important;
            letter-spacing: 0 !important;
            max-width: 100% !important;
            margin-top: 32px !important;
          }

          .hero-buttons {
            width: calc(100% + 40px) !important;
            margin-left: -20px !important;
            margin-bottom: -28px !important;
            gap: 8px !important;
          }

          .hero-buttons a {
            max-width: calc(50% - 4px) !important;
            padding: 12px 10px !important;
            font-size: 10px !important;
            letter-spacing: 0.08em !important;
            line-height: 1.25 !important;
          }

          .content-section,
          .section-inner,
          .footer-inner,
          .footer-name {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }

          .project-head {
            flex-direction: column !important;
            gap: 16px !important;
            margin-bottom: 32px !important;
          }

          .project-meta {
            text-align: left !important;
            padding-top: 0 !important;
          }

          .grid-2,
          .grid-3,
          .grid-4,
          .statement-grid,
          .abstract-grid,
          .cv-grid {
            grid-template-columns: 1fr !important;
            gap: 2px !important;
          }

          .workflow-grid,
          .pipeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }

          .pipeline-cell,
          .pipeline-cell-expanded {
            grid-column: auto !important;
          }

          .sticky-note {
            position: static !important;
          }

          .references-row {
            grid-template-columns: 34px 1fr !important;
            gap: 8px !important;
            align-items: start !important;
          }

          .references-title {
            grid-column: 2 !important;
          }

          .references-author,
          .references-title {
            font-size: 12px !important;
          }

          .split-actions {
            justify-content: center !important;
          }

          .spec-row {
            align-items: flex-start !important;
            gap: 12px !important;
          }

          .footer-inner {
            align-items: flex-start !important;
          }
        }

        @media (max-width: 560px) {
          .workflow-grid,
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }

          .hero-buttons {
            flex-direction: column !important;
          }

          .hero-buttons a {
            max-width: none !important;
            width: auto !important;
          }

          .deliverables-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @keyframes pulse-dot { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes grain {
          0%,100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          30% { background-position: 3% 5%; }
          50% { background-position: -7% 8%; }
          70% { background-position: 5% -5%; }
          90% { background-position: -3% 10%; }
        }
      `}</style>

      {/* ── GRAIN OVERLAY ─────────────────────────────────────────────── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 100, pointerEvents: "none",
        opacity: 0.028,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundRepeat: "repeat",
        backgroundSize: "128px",
        animation: "grain 0.8s steps(1) infinite",
      }} />

      {/* ── NAV ───────────────────────────────────────────────────────── */}
      <nav className="site-nav" style={{
        position: "sticky", top: 0, zIndex: 50,
        borderBottom: `1px solid ${C.border}`,
        backdropFilter: "blur(18px)",
        background: "rgba(4,6,26,0.88)",
        display: "flex", alignItems: "stretch", height: 52,
      }}>
        {/* wordmark */}
        <div className="nav-brand" style={{
          display: "flex", alignItems: "center",
          borderRight: `1px solid ${C.border}`, padding: "0 28px",
          flexShrink: 0,
        }}>
          <Mono style={{ fontSize: 20, letterSpacing: "0.3em", color: C.yellow, textTransform: "uppercase" }}>
            London Ham
          </Mono>
        </div>

        {/* links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", padding: "0 24px", gap: 28, flex: 1 }}>
          {[["#tfa","T.F.A."],["#cinelora","cineLoRA"],["#cv","C.V."]].map(([href, label]) => (
            <a key={href} href={href} className="nav-link"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.dim, transition: "color 0.15s" }}>
              {label}
            </a>
          ))}
          <div className="nav-tagline" style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto", minWidth: 0 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.yellow, animation: "pulse-dot 2s ease-in-out infinite", flexShrink: 0 }} />
            <Mono style={{ fontSize: 11, color: C.dim, letterSpacing: "0.18em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              Computational artist · Creative technologist
            </Mono>
          </div>
        </div>

        {/* clock */}
        <div className="nav-clock" style={{
          display: "flex", alignItems: "center",
          borderLeft: `1px solid ${C.border}`, padding: "0 22px",
          flexShrink: 0,
        }}>
          <Mono style={{ fontSize: 11, color: C.faint }}>
            {time} <span style={{ color: C.blue }}>UTC+0</span>
          </Mono>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-section" style={{ position: "relative", overflow: "hidden", minHeight: "68vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "32px 56px 36px" }}>
        {/* bg elements */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 55% at 85% 15%, rgba(42,92,255,0.18), transparent 55%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(245,230,66,0.07), transparent 50%)`, pointerEvents: "none", zIndex: 0 }} />
        <video
          src={AcmeReel}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1 }}
        />
        {/* large decorative rule */}
        <div className="hero-rule" style={{ position: "absolute", top: 0, left: 56, right: 0, height: 1, background: `linear-gradient(to right, ${C.yellow}, transparent 40%)`, zIndex: 2 }} />
        <motion.div style={{ position: "relative", zIndex: 3, flex: 1, display: "flex", flexDirection: "column" }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
          <h1 className="hero-title" style={{
            fontSize: "clamp(52px, 9vw, 80px)",
            lineHeight: 0.88,
            letterSpacing: "-0.05em",
            fontWeight: 400,
            maxWidth: 900,
            color: C.white,
            marginTop: 60,
          }}>
            Creative Technologist, working in film, machine learning, and installation art.
          </h1>

          <div className="hero-buttons" style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: "auto", marginBottom: -36, flexWrap: "wrap", width: "calc(100% + 112px)", marginLeft: -56 }}>
            <a href="#tfa" style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              padding: "14px 13px", borderRadius: 4,
              background: C.yellow, color: C.navy,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
            }}>
              T.F.A. — Installation ↓
            </a>
            <a href="#cinelora" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 13px", borderRadius: 4,
              border: `1px solid ${C.blue}`, color: C.white,
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase",
              background: C.blueGhost,
            }}>
              cineLoRA — Dissertation ↓
            </a>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          T.F.A.
      ══════════════════════════════════════════════════════════════════ */}
      <section id="tfa" className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 56px 0" }}>
        <FadeUp>
          <div className="project-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <div>
              <SectionLabel>Project 01 — Installation Artwork</SectionLabel>
              <h2 style={{ fontSize: "clamp(56px, 9vw, 128px)", lineHeight: 0.85, letterSpacing: "-0.06em", fontWeight: 400, color: C.white }}>
                T.F.A.
              </h2>
            </div>
            <div className="project-meta" style={{ textAlign: "right", paddingTop: 8 }}>
              <Mono style={{ fontSize: 10, color: C.faint, display: "block", marginBottom: 6 }}>Five-channel video installation</Mono>
              <Mono style={{ fontSize: 10, color: C.faint }}>Custom ML algorithm</Mono>
            </div>
          </div>
        </FadeUp>

        {/* Subtitle crawl */}
        <FadeUp delay={0.1}>
          <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "18px 0", marginBottom: 56 }}>
            <p style={{ fontSize: 13, fontFamily: "'IBM Plex Mono', monospace", color: C.dim, letterSpacing: "0.08em", lineHeight: 1.6 }}>
              Total Fucking Annihilation &nbsp;/&nbsp; True Fantasy Again &nbsp;/&nbsp; Totalitarian Friendly Attitude &nbsp;/&nbsp; Treasure For Apathy &nbsp;/&nbsp; Toxic Family Agenda &nbsp;/&nbsp; Tastee Freeze Authoritarianism &nbsp;/&nbsp; Television For Assholes &nbsp;/&nbsp; Touch Free Access &nbsp;/&nbsp; ...[]
            </p>
          </div>
        </FadeUp>

        {/* 3-col spec grid */}
        <FadeUp delay={0.15}>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginBottom: 64 }}>
            {tfaChannels.map((c) => (
              <div key={c.num} style={{
                border: `1px solid ${C.border}`, padding: "32px 28px",
                background: C.blueGhost,
              }}>
                <Mono style={{ fontSize: 28, color: C.blue, display: "block", marginBottom: 16 }}>{c.num}</Mono>
                <h3 style={{ fontSize: 20, color: C.yellow, fontWeight: 400, marginBottom: 12 }}>{c.label}</h3>
                <p style={{ fontSize: 14, fontFamily: "'IBM Plex Mono', monospace", color: C.dim, lineHeight: 1.75 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Video */}
      <section id="tfa-video" className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px 36px" }}>
        <FadeUp>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <SectionLabel>Documentation — Vimeo excerpt</SectionLabel>
            <a href="https://vimeo.com/1116390345?share=copy#t=1m33s" target="_blank" rel="noreferrer"
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: C.blue, letterSpacing: "0.15em" }}>
              Open on Vimeo ↗
            </a>
          </div>
          <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", aspectRatio: "16/9", background: "#000" }}>
            <iframe
              src="https://player.vimeo.com/video/1116390345?h=0&badge=0&autopause=0&player_id=0&app_id=58479#t=1m33s"
              title="T.F.A. by London Ham"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              style={{ width: "100%", height: "100%", display: "block", border: "none" }}
            />
          </div>
        </FadeUp>
      </section>

      {/* Statement */}
      <section id="tfa-statement" className="content-section" style={{ borderTop: `1px solid ${C.border}`, maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
        <FadeUp>
          <div className="statement-grid" style={{ display: "grid", gridTemplateColumns: "0.6fr 1.4fr", gap: 64, alignItems: "start" }}>
            <div className="sticky-note" style={{ position: "sticky", top: 80 }}>
              <SectionLabel>Project statement</SectionLabel>
              <h3 style={{ fontSize: "clamp(26px,3vw,40px)", lineHeight: 1.15, fontWeight: 400, color: C.white, marginBottom: 20 }}>
                Information overload as installation architecture.
              </h3>
              <div style={{ width: 40, height: 2, background: C.yellow, marginTop: 8 }} />
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.9, color: C.dim, display: "flex", flexDirection: "column", gap: 24 }}>
              <p>T.F.A. is an installation artwork composed of five video channels and a single audio channel. Its image system is supported by a customized version of MediaPipe's Selfie Segmentation in Python: a machine learning algorithm repurposed from human detection and surveillance into a tool for editing, masking, and perceptual interference.</p>
              <p>The work treats images and audio as readymades. Whether drawn from existing films or prompted through generative AI, the material arrives from a hand that is not the artist's own. Inside the film, human editing and automated segmentation compete for screen time, control, seduction, and authorship.</p>
              <p>Conceptually, the project joins Byung-Chul Han's account of infomania with Georges Bataille's annihilating excess. The five-channel format is not only a display strategy; it is a spatial metaphor for the enveloping suffocation of multi-directional information.</p>
              <blockquote style={{
                borderLeft: `3px solid ${C.yellow}`, paddingLeft: 24,
                fontFamily: "'DM Serif Display', serif",
                fontSize: "clamp(18px,2.2vw,26px)", fontStyle: "italic",
                lineHeight: 1.5, color: C.white,
              }}>
                The project asks what happens to the body when automation promises free time, but returns only distracted, fractured, unusable minutes.
              </blockquote>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Process */}
      <section id="tfa-process" style={{ background: C.blueGhost, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
          <FadeUp>
            <SectionLabel>Process — The hand, the machine, the room</SectionLabel>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginTop: 32, marginBottom: 56 }}>
              {tfaProcess.map((p, i) => (
                <div key={p.label} style={{ padding: "32px 28px", border: `1px solid ${C.border}`, background: C.navy }}>
                  <Mono style={{ fontSize: 10, color: C.blue, letterSpacing: "0.3em", display: "block", marginBottom: 16, textTransform: "uppercase" }}>0{i+1}</Mono>
                  <h3 style={{ fontSize: 22, color: C.yellow, fontWeight: 400, marginBottom: 14 }}>{p.label}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 1.8, color: C.dim }}>{p.body}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div style={{ border: `1px solid ${C.border}`, background: C.navy, overflow: "hidden" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderBottom: `1px solid ${C.border}`, gap: 16, flexWrap: "wrap" }}>
                <Mono style={{ fontSize: 10, color: C.dim, letterSpacing: "0.35em", textTransform: "uppercase" }}>Segmentation study</Mono>
                <Mono style={{ fontSize: 10, color: C.faint, letterSpacing: "0.18em", textTransform: "uppercase" }}>MediaPipe cutout process</Mono>
              </div>
              <div style={{ aspectRatio: "16 / 9", background: "#000" }}>
                <video
                  src={CutoutVid}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
                />
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* References */}
      <section className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
        <FadeUp>
          <SectionLabel>References — T.F.A.</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
            {tfaRefs.map(([num, author, title]) => (
              <div key={num} className="ref-row references-row" style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1fr",
                alignItems: "center", padding: "18px 0",
                borderBottom: `1px solid ${C.border}`,
                transition: "background 0.15s",
              }}>
                <Mono style={{ fontSize: 11, color: C.faint }}>{num}</Mono>
                <span className="references-author" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: C.yellow }}>{author}</span>
                <span className="references-title" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: C.dim, fontStyle: "italic" }}>{title}</span>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── DIVIDER BETWEEN PROJECTS ───────────────────────────────────── */}
      <div style={{ background: C.yellow, height: 53 }} />

      {/* ══════════════════════════════════════════════════════════════════
          CINELORA
      ══════════════════════════════════════════════════════════════════ */}
      <section id="cinelora" className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "48px 56px 0" }}>
        <FadeUp>
          <div className="project-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <div>
              <SectionLabel>Project 02 — MFA Dissertation / Goldsmiths</SectionLabel>
              <h2 style={{ fontSize: "clamp(48px,8vw,112px)", lineHeight: 0.88, letterSpacing: "-0.05em", fontWeight: 400, color: C.white }}>
                cine<span style={{ color: C.yellow }}>LoRA</span>
              </h2>
            </div>
            <div className="project-meta" style={{ textAlign: "right", paddingTop: 8 }}>
              <Mono style={{ fontSize: 10, color: C.faint, display: "block", marginBottom: 6 }}>Wan 2.2 / LoRA fine-tuning</Mono>
              <Mono style={{ fontSize: 10, color: C.faint }}>Practice-led research</Mono>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "24px 0", marginBottom: 64 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: C.dim, lineHeight: 1.8, maxWidth: 900 }}>
              A practice-led dissertation project examining how LoRA fine-tuning can be used to train a repeatable cinematic style into a generative video model. The project treats fine-tuning not only as a technical procedure but as a creative research method — investigating visual authorship, model adaptation, and the reproducibility of filmic aesthetics.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* Dissertation PDF */}
      <section className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px 36px" }}>
        <FadeUp>
          <div style={{ borderBottom: `1px solid ${C.border}`, padding: "24px 0", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="split-actions" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/LondonHam_CompArts_Dissertation.pdf" target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "13px 22px", borderRadius: 4,
                background: C.yellow, color: C.navy,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
              }}>
                View PDF
              </a>
              <a href="/LondonHam_CompArts_Dissertation.pdf" download style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "13px 22px", borderRadius: 4,
                border: `1px solid ${C.blue}`, color: C.white,
                background: C.blueGhost,
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                letterSpacing: "0.18em", textTransform: "uppercase",
              }}>
                Download
              </a>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Research questions */}
      <section className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 56px 36px" }}>
        <FadeUp>
          <SectionLabel>Research questions</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
            {clQuestions.map((q, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 24, padding: "28px 0", borderBottom: `1px solid ${C.border}`, alignItems: "start" }}>
                <Mono style={{ fontSize: 32, color: C.blue, lineHeight: 1 }}>0{i+1}</Mono>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, lineHeight: 1.8, color: C.dim }}>{q}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Abstract */}
      <section id="cl-abstract" style={{ background: C.blueGhost, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
          <FadeUp>
            <div className="abstract-grid" style={{ display: "grid", gridTemplateColumns: "0.55fr 1.45fr", gap: 64 }}>
              <div>
                <SectionLabel>Dissertation abstract</SectionLabel>
                <h3 style={{ fontSize: "clamp(22px,2.5vw,36px)", lineHeight: 1.2, fontWeight: 400, color: C.white }}>
                  A study of trainable cinematic style.
                </h3>
              </div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, lineHeight: 1.9, color: C.dim, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>cineLoRA is a practice-led dissertation project examining how LoRA fine-tuning can be used to train a repeatable cinematic style into a generative video model. Using Wan 2.2 as the base model, the project treats fine-tuning not only as a technical procedure but as a creative research method for investigating visual authorship, model adaptation, and the reproducibility of filmic aesthetics.</p>
                <p>The project develops a controlled workflow for preparing paired image-caption data, configuring a remote GPU training environment, caching latents and text encoder outputs, and training separate low-noise and high-noise LoRA checkpoints through Musubi Tuner.</p>
                <p>Through prompt-based evaluation, visual output comparison, checkpoint logging, and reflective analysis, cineLoRA asks how much stylistic control can be introduced through lightweight adaptation layers without retraining the full model. The final dissertation positions the LoRA checkpoint as both a working creative artefact and a research object for analysing AI-assisted filmmaking practice.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Method */}
      <section id="cl-method" className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
        <FadeUp>
          <SectionLabel>Method — Training workflow</SectionLabel>
          <div className="workflow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2, marginTop: 32 }}>
            {clWorkflow.map((w) => (
              <div key={w.step} className="wf-card" style={{
                border: `1px solid ${C.border}`,
                padding: "28px 24px",
                background: C.navy,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontSize: 22, color: C.yellow }}>{w.icon}</span>
                  <Mono style={{ fontSize: 11, color: C.faint }}>{w.step}</Mono>
                </div>
                <h4 style={{ fontSize: 16, color: C.white, fontWeight: 400, marginBottom: 12, lineHeight: 1.3 }}>{w.title}</h4>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, lineHeight: 1.75, color: C.dim }}>{w.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* Pipeline interactive */}
      <section id="cl-pipeline" style={{ background: C.navyMid, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div className="section-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
          <FadeUp>
            <div className="pipeline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 2 }}>
              {clWorkflow.map((item, i) => {
                const isExpanded = (i === 0 && isPairingExpanded) || (i === 1 && isCineLoraRevExpanded) || (i === 2 && isComfyUiExpanded) || (i === 3 && isComfyUiAltExpanded);

                return (
                <div key={item.step} className={isExpanded ? "pipeline-cell pipeline-cell-expanded" : "pipeline-cell"} style={{ minHeight: isExpanded ? 260 : 120, border: `1px solid ${C.border}`, background: C.navy, overflow: "hidden", gridColumn: isExpanded ? "span 2" : "auto", transition: "min-height 0.25s ease" }}>
                  {i === 0 && (
                    <button
                      type="button"
                      onClick={() => setIsPairingExpanded((expanded) => !expanded)}
                      aria-label={isPairingExpanded ? "Collapse paired image-caption dataset example" : "Expand paired image-caption dataset example"}
                      style={{ width: "100%", height: "100%", border: "none", padding: 0, background: "transparent", cursor: isPairingExpanded ? "zoom-out" : "zoom-in", display: "block" }}
                    >
                      <img
                        src={PairingImg}
                        alt="Paired image-caption dataset example"
                        style={{ width: "100%", height: "100%", minHeight: isPairingExpanded ? 260 : 220, display: "block", objectFit: "cover" }}
                      />
                    </button>
                  )}
                  {i === 1 && (
                    <button
                      type="button"
                      onClick={() => setIsCineLoraRevExpanded((expanded) => !expanded)}
                      aria-label={isCineLoraRevExpanded ? "Collapse cineLoRA review example" : "Expand cineLoRA review example"}
                      style={{ width: "100%", height: "100%", border: "none", padding: 0, background: "transparent", cursor: isCineLoraRevExpanded ? "zoom-out" : "zoom-in", display: "block" }}
                    >
                      <img
                        src={CineLoraRevImg}
                        alt="cineLoRA review example"
                        style={{ width: "100%", height: "100%", minHeight: isCineLoraRevExpanded ? 260 : 220, display: "block", objectFit: "cover" }}
                      />
                    </button>
                  )}
                  {i === 2 && (
                    <button
                      type="button"
                      onClick={() => setIsComfyUiExpanded((expanded) => !expanded)}
                      aria-label={isComfyUiExpanded ? "Collapse ComfyUI generation example" : "Expand ComfyUI generation example"}
                      style={{ width: "100%", height: "100%", border: "none", padding: 0, background: "transparent", cursor: isComfyUiExpanded ? "zoom-out" : "zoom-in", display: "block" }}
                    >
                      <video
                        src={ComfyUiClip}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", height: "100%", minHeight: isComfyUiExpanded ? 260 : 220, display: "block", objectFit: "cover" }}
                      />
                    </button>
                  )}
                  {i === 3 && (
                    <button
                      type="button"
                      onClick={() => setIsComfyUiAltExpanded((expanded) => !expanded)}
                      aria-label={isComfyUiAltExpanded ? "Collapse ComfyUI generation example" : "Expand ComfyUI generation example"}
                      style={{ width: "100%", height: "100%", border: "none", padding: 0, background: "transparent", cursor: isComfyUiAltExpanded ? "zoom-out" : "zoom-in", display: "block" }}
                    >
                      <video
                        src={ComfyUiClipAlt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{ width: "100%", height: "100%", minHeight: isComfyUiAltExpanded ? 260 : 220, display: "block", objectFit: "cover" }}
                      />
                    </button>
                  )}
                </div>
                );
              })}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Specs + Deliverables */}
      <section className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px" }}>
        <FadeUp>
          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {/* Specs */}
            <div style={{ border: `1px solid ${C.border}`, padding: "36px 32px" }}>
              <SectionLabel>Technical configuration</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 20 }}>
                {clSpecs.map(([k, v]) => (
                  <div key={k} className="spec-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                    <Mono style={{ fontSize: 12, color: C.faint }}>{k}</Mono>
                    <Mono style={{ fontSize: 12, color: C.white, textAlign: "right" }}>{v}</Mono>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div style={{ border: `1px solid ${C.border}`, padding: "36px 32px", background: C.yellowGhost }}>
              <SectionLabel>Dissertation artefacts</SectionLabel>
              <div className="deliverables-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 20 }}>
                {clDeliverables.map((d) => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 0", borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ color: C.yellow, fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <Mono style={{ fontSize: 11, color: C.dim, lineHeight: 1.5 }}>{d}</Mono>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* C.V. */}
      <section id="cv" className="content-section" style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 56px 56px" }}>
        <FadeUp>
          <div className="cv-grid" style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: "32px 0", display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48, alignItems: "center" }}>
            <div>
              <SectionLabel>C.V.</SectionLabel>
              <h3 style={{ fontSize: "clamp(34px,5vw,72px)", lineHeight: 0.9, letterSpacing: "-0.05em", fontWeight: 400, color: C.white }}>
                Curriculum vitae
              </h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <a href="/CV_2026_2.pdf" target="_blank" rel="noreferrer" style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "13px 22px", borderRadius: 4,
                  background: C.yellow, color: C.navy,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500,
                }}>
                  View PDF
                </a>
                <a href="/CV_2026_2.pdf" download style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  padding: "13px 22px", borderRadius: 4,
                  border: `1px solid ${C.blue}`, color: C.white,
                  background: C.blueGhost,
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: 11,
                  letterSpacing: "0.18em", textTransform: "uppercase",
                }}>
                  Download
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, background: C.navyMid }}>
        {/* Full-width name */}
        <div className="footer-name" style={{ borderBottom: `1px solid ${C.border}`, padding: "24px 56px" }}>
          <h2 style={{ fontSize: "clamp(48px,10vw,140px)", lineHeight: 0.9, letterSpacing: "-0.06em", fontWeight: 400, color: C.faint }}>
            London Ham
          </h2>
        </div>
        <div className="footer-inner" style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 56px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <Mono style={{ fontSize: 11, color: C.faint }}>© 2025 — Computational Arts, Goldsmiths, University of London</Mono>
          <Mono style={{ fontSize: 11, color: C.faint }}>T.F.A. — cineLoRA — London, UK</Mono>
        </div>
      </footer>
    </main>
  );
}
