import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Film, MonitorPlay, Cpu, Hand, Waves, BookOpen, MapPin } from "lucide-react";

// ─── TFA data ────────────────────────────────────────────────────────────────

const tfaReferences = [
  "Arthur Jafa, Love Is the Message, the Message Is Death",
  "Mark Leckey, Fiorucci Made Me Hardcore",
  "Georges Bataille, The Accursed Share",
  "Byung-Chul Han, Non-Things",
  "Hito Steyerl, Duty Free Art",
];

const tfaChannels = [
  {
    icon: MonitorPlay,
    title: "5 video channels",
    text: "A multi-directional installation structure designed to simulate the pressure of information overload.",
  },
  {
    icon: Waves,
    title: "1 audio channel",
    text: "A single sonic layer binds the fragmented image system into an enveloping spatial experience.",
  },
  {
    icon: Cpu,
    title: "Custom ML workflow",
    text: "Built with a modified MediaPipe Selfie Segmentation pipeline in Python for human detection and masking.",
  },
];

const tfaThemes = [
  "infomania",
  "annihilation",
  "automation",
  "cognitive offloading",
  "junk time",
  "readymade images",
  "handlessness",
  "homo faber / homo ludens",
];

// ─── CineLoRA data ────────────────────────────────────────────────────────────

const workflow = [
  {
    title: "Curate paired image-caption data",
    detail: "A controlled dataset of images and matching .txt captions forms the evidence base for training and evaluation.",
    icon: "▤",
  },
  {
    title: "Validate and cache",
    detail: "Dataset checks, latent caching, and text encoder caching make the pipeline reproducible before training begins.",
    icon: "✓",
  },
  {
    title: "Train Wan 2.2 LoRA",
    detail: "Musubi Tuner is used first, with separate low-noise and high-noise LoRA experiments for the Wan 2.2 14B model.",
    icon: "▧",
  },
  {
    title: "Monitor, compare, iterate",
    detail: "Outputs, logs, TensorBoard traces, and prompt tests are reviewed to identify overfitting, underfitting, and style transfer strength.",
    icon: "↗",
  },
];

const specs = [
  ["Base model", "Wan 2.2 14B video generation"],
  ["Primary trainer", "Musubi Tuner"],
  ["Fallback", "Diffusion Pipe"],
  ["Training site", "RunPod via VS Code SSH"],
  ["Precision", "bf16 with fp8 base"],
  ["Initial LoRA rank", "network_dim 16 / alpha 16"],
];

const questions = [
  "How can LoRA fine-tuning encode a repeatable cinematic style without retraining an entire generative video model?",
  "What does a practical, reproducible workflow for training cinematic Wan 2.2 LoRAs require?",
  "How do low-noise and high-noise training regimes influence the visual identity of generated motion-image outputs?",
];

const abstractParagraphs = [
  "cineLoRA is a practice-led dissertation project examining how LoRA fine-tuning can be used to train a repeatable cinematic style into a generative video model. Using Wan 2.2 as the base model, the project treats fine-tuning not only as a technical procedure but as a creative research method for investigating visual authorship, model adaptation, and the reproducibility of filmic aesthetics.",
  "The project develops a controlled workflow for preparing paired image-caption data, configuring a remote GPU training environment, caching latents and text encoder outputs, and training separate low-noise and high-noise LoRA checkpoints through Musubi Tuner. Diffusion Pipe is retained as a fallback route, allowing the methodology to remain adaptable if the primary trainer becomes unsuitable during experimentation.",
  "Through prompt-based evaluation, visual output comparison, checkpoint logging, and reflective analysis, cineLoRA asks how much stylistic control can be introduced through lightweight adaptation layers without retraining the full model. The final dissertation positions the LoRA checkpoint as both a working creative artefact and a research object for analysing AI-assisted filmmaking practice.",
];

const deliverables = [
  "validated image-caption dataset",
  "RunPod training workspace",
  "Musubi Tuner scripts",
  "low-noise LoRA checkpoint",
  "high-noise LoRA checkpoint",
  "evaluation prompt suite",
  "visual output archive",
  "methodology write-up",
];

const phases = [
  "Dataset assembly",
  "Environment setup",
  "Latent + text caching",
  "Low-noise baseline",
  "High-noise extension",
  "Comparative evaluation",
];

const phaseDetails = {
  "Dataset assembly": "Collect, standardise, and caption source images so the training material has a coherent cinematic identity and a clear audit trail.",
  "Environment setup": "Configure the RunPod workspace, VS Code SSH access, model files, dependencies, and storage paths before any experiment begins.",
  "Latent + text caching": "Precompute latents and text encoder outputs so training is faster, repeatable, and easier to debug.",
  "Low-noise baseline": "Train the first LoRA checkpoint to test whether the dataset can transfer a stable visual signature without overwhelming the base model.",
  "High-noise extension": "Run the complementary high-noise experiment to test how strongly the LoRA influences structure, atmosphere, and motion-image style.",
  "Comparative evaluation": "Compare checkpoints through fixed prompts, visual archives, logs, and written analysis for the dissertation submission.",
};

// ─── Shared components ────────────────────────────────────────────────────────

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-[1.75rem] border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LondonHamPortfolio() {
  const [activeProject, setActiveProject] = useState("tfa"); // "tfa" | "cinelora"
  const [activePhase, setActivePhase] = useState("Low-noise baseline");

  const activeIndex = useMemo(() => {
    const idx = phases.indexOf(activePhase);
    return idx >= 0 ? idx : 0;
  }, [activePhase]);

  const progress = `${((activeIndex + 1) / phases.length) * 100}%`;
  const activeDetail = phaseDetails[activePhase] || phaseDetails[phases[0]];

  return (
    <main
      className="min-h-screen selection:bg-white selection:text-black"
      style={{ background: "#0a0a0a", color: "#f0ede8", fontFamily: "'Georgia', 'Times New Roman', serif" }}
    >
      {/* ─── Global nav ─────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          background: "rgba(10,10,10,0.85)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <a
            href="#top"
            onClick={() => setActiveProject("tfa")}
            style={{
              fontFamily: "'Georgia', serif",
              fontSize: 13,
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            LONDON HAM
          </a>

          {/* Project switcher */}
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button
              onClick={() => setActiveProject("tfa")}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: activeProject === "tfa" ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(255,255,255,0.12)",
                background: activeProject === "tfa" ? "rgba(239,68,68,0.14)" : "transparent",
                color: activeProject === "tfa" ? "#ef4444" : "rgba(255,255,255,0.45)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              T.F.A.
            </button>
            <button
              onClick={() => setActiveProject("cinelora")}
              style={{
                padding: "6px 18px",
                borderRadius: 999,
                border: activeProject === "cinelora" ? "1px solid rgba(251,191,36,0.5)" : "1px solid rgba(255,255,255,0.12)",
                background: activeProject === "cinelora" ? "rgba(251,191,36,0.10)" : "transparent",
                color: activeProject === "cinelora" ? "#fbbf24" : "rgba(255,255,255,0.45)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.2s",
                fontFamily: "inherit",
              }}
            >
              cineLoRA
            </button>
          </div>

          {/* Secondary nav — context-sensitive */}
          <div style={{ display: "flex", gap: 24, fontSize: 13, color: "rgba(255,255,255,0.38)" }}>
            {activeProject === "tfa" ? (
              <>
                <a href="#tfa-film" style={{ color: "inherit", textDecoration: "none" }}>Film</a>
                <a href="#tfa-statement" style={{ color: "inherit", textDecoration: "none" }}>Statement</a>
                <a href="#tfa-process" style={{ color: "inherit", textDecoration: "none" }}>Process</a>
              </>
            ) : (
              <>
                <a href="#cl-abstract" style={{ color: "inherit", textDecoration: "none" }}>Abstract</a>
                <a href="#cl-method" style={{ color: "inherit", textDecoration: "none" }}>Method</a>
                <a href="#cl-pipeline" style={{ color: "inherit", textDecoration: "none" }}>Pipeline</a>
              </>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeProject === "tfa" ? (
          <motion.div
            key="tfa"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            {/* ═══════════════════════════════════════════════════════════════
                T.F.A. — ALL SECTIONS
            ════════════════════════════════════════════════════════════════ */}

            {/* Hero */}
            <section
              id="top"
              style={{
                position: "relative",
                overflow: "hidden",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                padding: "80px 0 100px",
              }}
            >
              {/* Bg gradients */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(circle at 20% 20%, rgba(239,68,68,0.22) 0%, transparent 38%), radial-gradient(circle at 80% 10%, rgba(255,255,255,0.07) 0%, transparent 30%), linear-gradient(135deg, rgba(255,255,255,0.04), transparent 50%)",
              }} />
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.05,
                backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                backgroundSize: "44px 44px",
              }} />

              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
                <div>
                  {/* Label */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999,
                    padding: "8px 16px", fontSize: 13, color: "rgba(255,255,255,0.55)",
                    marginBottom: 28, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.04)",
                  }}>
                    <Film size={14} /> Five-channel video installation
                  </div>

                  {/* Title */}
                  <h1 style={{
                    fontSize: "clamp(80px, 14vw, 160px)",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 900,
                    lineHeight: 0.82,
                    letterSpacing: "-0.06em",
                    color: "#fff",
                    margin: 0,
                  }}>
                    T.F.A.
                  </h1>

                  {/* Subtitle */}
                  <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", maxWidth: 560 }}>
                    Total Fucking Annihilation / True Fantasy Again / Totalitarian Friendly Attitude / Treasure For Apathy / Toxic Family Agenda / ...[]
                  </p>
                  <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.38)", maxWidth: 540 }}>
                    An installation artwork that stages a collision between video editing, machine learning, generative imagery, surveillance logic, and the psychophysical exhaustion of accelerated automation.
                  </p>

                  <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
                    <a
                      href="#tfa-film"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "12px 24px", borderRadius: 999,
                        background: "#ef4444", color: "#fff",
                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      Watch excerpt <ArrowUpRight size={14} />
                    </a>
                    <a
                      href="#tfa-statement"
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "12px 24px", borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      Read statement
                    </a>
                  </div>
                </div>

                {/* Hero card */}
                <div style={{ position: "relative", minHeight: 420 }}>
                  <div style={{
                    position: "absolute", inset: -16,
                    borderRadius: "2.5rem",
                    background: "radial-gradient(circle at 40% 40%, rgba(239,68,68,0.25), transparent 60%)",
                    filter: "blur(32px)",
                  }} />
                  <div style={{
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "2rem",
                    background: "rgba(0,0,0,0.5)",
                    overflow: "hidden",
                    minHeight: 420,
                    padding: 16,
                  }}>
                    <div style={{
                      position: "absolute", top: 20, left: 20,
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 999,
                      background: "rgba(0,0,0,0.6)",
                      padding: "6px 14px",
                      fontSize: 10,
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                    }}>
                      machine / hand / image
                    </div>
                    <div style={{
                      height: "100%", minHeight: 388, borderRadius: "1.5rem",
                      background: "rgba(20,20,20,0.9)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      position: "relative", overflow: "hidden",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 28%), radial-gradient(circle at 72% 68%, rgba(239,68,68,0.18), transparent 32%)",
                      }} />
                      <div style={{
                        position: "absolute", inset: 0, opacity: 0.2,
                        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.07) 0px, rgba(255,255,255,0.07) 1px, transparent 1px, transparent 9px)",
                      }} />
                      <div style={{
                        position: "absolute", left: "50%", top: "50%",
                        transform: "translate(-50%,-50%)",
                        height: 240, width: 120,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.03)",
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Channels */}
            <section style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
                {tfaChannels.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      style={{
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "1.5rem",
                        background: "rgba(255,255,255,0.03)",
                        padding: 28,
                      }}
                    >
                      <Icon size={24} color="#ef4444" style={{ marginBottom: 20 }} />
                      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", color: "#fff" }}>{item.title}</h2>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.45)", margin: 0 }}>{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Film / Video */}
            <section id="tfa-film" style={{ maxWidth: 1280, margin: "0 auto", padding: "40px 40px 72px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ef4444", marginBottom: 8, margin: "0 0 8px" }}>video</p>
                  <h2 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>Excerpt / documentation</h2>
                </div>
                <a
                  href="https://vimeo.com/1116390345?share=copy#t=0"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(255,255,255,0.45)", textDecoration: "none" }}
                >
                  Open on Vimeo <ArrowUpRight size={13} />
                </a>
              </div>
              <div style={{
                borderRadius: "2rem", border: "1px solid rgba(255,255,255,0.09)",
                overflow: "hidden", background: "#000", aspectRatio: "16/9",
              }}>
                <iframe
                  src="https://player.vimeo.com/video/1116390345?h=0&badge=0&autopause=0&player_id=0&app_id=58479"
                  title="T.F.A. by London Ham"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  style={{ width: "100%", height: "100%", display: "block", border: "none" }}
                />
              </div>
            </section>

            {/* Statement */}
            <section id="tfa-statement" style={{ maxWidth: 1280, margin: "0 auto", padding: "56px 40px", display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48 }}>
              <div style={{ position: "sticky", top: 80, alignSelf: "start" }}>
                <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>statement</p>
                <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.1, margin: 0 }}>
                  Information overload as installation architecture.
                </h2>
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.9, color: "rgba(255,255,255,0.6)" }}>
                <p style={{ margin: "0 0 28px" }}>
                  T.F.A. is an installation artwork composed of five video channels and a single audio channel. Its image system is supported by a customized version of MediaPipe's Selfie Segmentation in Python: a machine learning algorithm repurposed from human detection and surveillance into a tool for editing, masking, and perceptual interference.
                </p>
                <p style={{ margin: "0 0 28px" }}>
                  The work treats images and audio as readymades. Whether drawn from existing films or prompted through generative AI, the material arrives from a hand that is not the artist's own. Inside the film, human editing and automated segmentation compete for screen time, control, seduction, and authorship.
                </p>
                <p style={{ margin: "0 0 28px" }}>
                  Conceptually, the project joins Byung-Chul Han's account of infomania with Georges Bataille's annihilating excess. The five-channel format is not only a display strategy; it is a spatial metaphor for the enveloping suffocation of multi-directional information.
                </p>
                <blockquote style={{
                  borderLeft: "2px solid #ef4444", paddingLeft: 24,
                  fontSize: 22, fontWeight: 700, lineHeight: 1.6, color: "#fff", margin: 0,
                  fontStyle: "italic",
                }}>
                  The project asks what happens to the body when automation promises free time, but returns only distracted, fractured, unusable minutes.
                </blockquote>
              </div>
            </section>

            {/* Process */}
            <section
              id="tfa-process"
              style={{ background: "rgba(255,255,255,0.02)", padding: "72px 0" }}
            >
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
                <div style={{ maxWidth: 680, marginBottom: 48 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>process</p>
                  <h2 style={{ fontSize: "clamp(28px,5vw,52px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 20px" }}>
                    A tool designed to replace the hand.
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                    T.F.A. developed from an experiment in building an editing algorithm, then integrating that algorithm into a professional video workflow to expose the tension between skilled labour and machinic acceleration.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 64 }}>
                  {[
                    { Icon: Hand, title: "The hand", body: "First-person images of hands recur throughout the film: throwing televisions, manipulating impossible objects, and scrolling through social media while covered in blood." },
                    { Icon: Cpu, title: "The machine", body: "The segmentation system enters the edit as both collaborator and antagonist: a surveillance-derived process that produces masks, interruptions, and automated visual decisions." },
                    { Icon: MapPin, title: "The room", body: "Installed across five channels, the work surrounds the viewer, replacing the single cinematic frame with a field of competing attention and unstable narrative fragments." },
                  ].map(({ Icon, title, body }) => (
                    <div
                      key={title}
                      style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.75rem", background: "#0a0a0a", padding: 28 }}
                    >
                      <Icon size={28} color="#ef4444" style={{ marginBottom: 24 }} />
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 14px" }}>{title}</h3>
                      <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.4)", margin: 0 }}>{body}</p>
                    </div>
                  ))}
                </div>

                {/* Themes */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>themes</p>
                    <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: "0 0 20px" }}>
                      Against smooth automation.
                    </h2>
                    <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.4)", margin: 0 }}>
                      The project positions editing as a resistant, tactile practice: a form of making that demands time, friction, memory, and bodily presence.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {tfaThemes.map((theme) => (
                      <span
                        key={theme}
                        style={{
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: 999, padding: "10px 16px",
                          fontSize: 13, color: "rgba(255,255,255,0.65)",
                          background: "rgba(255,255,255,0.03)",
                        }}
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* References */}
            <section style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "56px 0" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48 }}>
                <div>
                  <BookOpen size={28} color="#ef4444" style={{ marginBottom: 16 }} />
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#ef4444", marginBottom: 12 }}>references</p>
                  <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>Source constellation</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {tfaReferences.map((ref, i) => (
                    <div
                      key={ref}
                      style={{
                        display: "flex", alignItems: "center", gap: 16,
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "1rem", background: "rgba(255,255,255,0.03)", padding: "18px 20px",
                      }}
                    >
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "monospace" }}>0{i + 1}</span>
                      <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", margin: 0 }}>{ref}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA to switch */}
            <section style={{ padding: "64px 40px", textAlign: "center" }}>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>
                also by London Ham
              </p>
              <button
                onClick={() => { setActiveProject("cinelora"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  padding: "14px 32px", borderRadius: 999,
                  border: "1px solid rgba(251,191,36,0.3)",
                  background: "rgba(251,191,36,0.08)",
                  color: "#fbbf24", fontSize: 14, cursor: "pointer",
                  letterSpacing: "0.1em", fontFamily: "inherit",
                }}
              >
                View cineLoRA — dissertation project →
              </button>
            </section>

            {/* Footer */}
            <footer style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              padding: "28px 40px",
            }}>
              <div style={{
                maxWidth: 1280, margin: "0 auto",
                display: "flex", justifyContent: "space-between",
                fontSize: 12, color: "rgba(255,255,255,0.2)",
              }}>
                <p style={{ margin: 0 }}>© London Ham — T.F.A.</p>
                <p style={{ margin: 0 }}>Five-channel video installation / custom machine learning algorithm</p>
              </div>
            </footer>
          </motion.div>

        ) : (

          <motion.div
            key="cinelora"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
          >
            {/* ═══════════════════════════════════════════════════════════════
                CINELORA — ALL SECTIONS
            ════════════════════════════════════════════════════════════════ */}

            {/* Hero */}
            <section style={{
              position: "relative", overflow: "hidden",
              padding: "80px 0 100px",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(circle at 18% 10%, rgba(244,63,94,0.26) 0%, transparent 28%), radial-gradient(circle at 80% 4%, rgba(251,191,36,0.14) 0%, transparent 26%)",
              }} />
              <div style={{
                position: "absolute", left: "50%", top: 40,
                transform: "translateX(-50%)",
                width: 320, height: 320, borderRadius: "50%",
                background: "rgba(244,63,94,0.15)", filter: "blur(64px)",
                pointerEvents: "none",
              }} />

              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center" }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999,
                    padding: "8px 16px", fontSize: 13, color: "rgba(255,255,255,0.5)",
                    marginBottom: 28, backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.04)",
                  }}>
                    <span style={{ color: "#fbbf24" }}>✦</span>&nbsp;Cinematic LoRA fine-tuning for generative video research
                  </div>

                  <h1 style={{
                    fontSize: "clamp(40px,6vw,72px)",
                    fontFamily: "'Georgia', serif",
                    fontWeight: 600,
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    color: "#fff",
                    margin: "0 0 24px",
                  }}>
                    Training a repeatable cinematic style into Wan 2.2.
                  </h1>

                  <p style={{ fontSize: 16, lineHeight: 1.85, color: "rgba(255,255,255,0.5)", maxWidth: 540, margin: "0 0 36px" }}>
                    cineLoRA is a dissertation project investigating how lightweight adaptation layers can encode a controlled filmic aesthetic inside a contemporary AI video model. Dataset, captions, infrastructure, low-noise training, high-noise training, visual evaluation.
                  </p>

                  <div style={{ display: "flex", gap: 12 }}>
                    <a
                      href="#cl-pipeline"
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "12px 24px", borderRadius: 999,
                        background: "#f43f5e", color: "#fff",
                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      ▶ Explore the project
                    </a>
                    <a
                      href="#cl-method"
                      style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "12px 24px", borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.14)",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                        fontFamily: "inherit",
                      }}
                    >
                      Training protocol
                    </a>
                  </div>
                </div>

                {/* Hero card */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    position: "absolute", inset: -16, borderRadius: "2.5rem",
                    background: "linear-gradient(135deg, rgba(244,63,94,0.25), rgba(251,191,36,0.08), rgba(255,255,255,0.07))",
                    filter: "blur(28px)", pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "1.75rem", overflow: "hidden",
                    background: "rgba(20,15,15,0.8)", backdropFilter: "blur(16px)",
                  }}>
                    <div style={{
                      aspectRatio: "4/5",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1), transparent 30%), radial-gradient(circle at 32% 24%, rgba(251,191,36,0.3), transparent 18%), radial-gradient(circle at 72% 58%, rgba(244,63,94,0.35), transparent 28%), linear-gradient(160deg, #171717, #0c0a09)",
                      padding: 24, position: "relative",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                        <span>WAN 2.2 LORA / RUN 01</span>
                        <span>BF16</span>
                      </div>
                      <div style={{
                        marginTop: 72,
                        borderRadius: 24, border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(0,0,0,0.4)", padding: 20, backdropFilter: "blur(8px)",
                      }}>
                        <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 6px" }}>sample prompt</p>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", margin: "0 0 12px" }}>cinematic character study</p>
                        <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                          soft practical light, restrained camera movement, textured shadows, controlled color palette, filmic skin tones, dissertation dataset style
                        </p>
                      </div>
                      <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                        {["low-noise", "high-noise", "combined"].map((item) => (
                          <div key={item} style={{
                            borderRadius: 16, border: "1px solid rgba(255,255,255,0.09)",
                            background: "rgba(255,255,255,0.04)", padding: "10px 8px",
                            textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.4)",
                          }}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Abstract */}
            <section id="cl-abstract" style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 40px" }}>
              <div style={{
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "2rem",
                background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02), rgba(244,63,94,0.07))",
                display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 40, padding: 48,
              }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24", marginBottom: 12 }}>Dissertation abstract</p>
                  <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 16px" }}>
                    A study of trainable cinematic style.
                  </h2>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,0.3)", margin: 0 }}>
                    This section can be replaced with the final submitted abstract once the dissertation wording is locked.
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, fontSize: 16, lineHeight: 1.9, color: "rgba(255,255,255,0.6)" }}>
                  {abstractParagraphs.map((p, i) => <p key={i} style={{ margin: 0 }}>{p}</p>)}
                </div>
              </div>
            </section>

            {/* Research questions */}
            <section id="cl-research" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 72px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 40 }}>
                <div>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#f43f5e", marginBottom: 12 }}>Research frame</p>
                  <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
                    A practice-led study of cinematic model adaptation.
                  </h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {questions.map((q, i) => (
                    <div key={q} style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.5rem", background: "rgba(255,255,255,0.03)", padding: 24, display: "flex", gap: 16 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 16, flexShrink: 0,
                        background: "rgba(244,63,94,0.12)", color: "#fca5a5",
                        display: "grid", placeItems: "center", fontSize: 13, fontFamily: "monospace",
                      }}>
                        0{i + 1}
                      </div>
                      <p style={{ fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.7)", margin: 0 }}>{q}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Method */}
            <section id="cl-method" style={{ background: "rgba(255,255,255,0.02)", padding: "72px 0" }}>
              <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                  <div>
                    <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24", marginBottom: 12 }}>Method</p>
                    <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", margin: 0, maxWidth: 560 }}>
                      From dataset to checkpoint: a reproducible training pipeline.
                    </h2>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                  {workflow.map((step) => (
                    <div key={step.title} style={{
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "1.75rem", background: "rgba(255,255,255,0.04)",
                      padding: 24, transition: "background 0.2s",
                    }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 16,
                        background: "#fff", color: "#0a0a0a",
                        display: "grid", placeItems: "center",
                        fontSize: 18, marginBottom: 28,
                      }}>
                        {step.icon}
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 600, color: "#fff", margin: "0 0 10px" }}>{step.title}</h3>
                      <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: 0 }}>{step.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pipeline */}
            <section id="cl-pipeline" style={{ maxWidth: 1280, margin: "0 auto", padding: "72px 40px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 24 }}>
                {/* Phase list */}
                <div style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.75rem", background: "rgba(255,255,255,0.04)", padding: 32 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 16, background: "#fbbf24", color: "#0a0a0a", display: "grid", placeItems: "center", fontSize: 16 }}>
                      &gt;_
                    </div>
                    <div>
                      <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", margin: "0 0 3px" }}>execution plan</p>
                      <p style={{ fontSize: 16, fontWeight: 600, color: "#fff", margin: 0 }}>Wan 2.2 training sequence</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {phases.map((phase, index) => (
                      <button
                        key={phase}
                        onClick={() => setActivePhase(phase)}
                        style={{
                          display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "14px 18px", borderRadius: 16, textAlign: "left",
                          border: activePhase === phase ? "1px solid rgba(244,63,94,0.45)" : "1px solid rgba(255,255,255,0.09)",
                          background: activePhase === phase ? "rgba(244,63,94,0.12)" : "rgba(0,0,0,0.3)",
                          color: activePhase === phase ? "#fff" : "rgba(255,255,255,0.5)",
                          cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit", fontSize: 14,
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", fontFamily: "monospace" }}>{String(index + 1).padStart(2, "0")}</span>
                          {phase}
                        </span>
                        <span style={{ opacity: 0.3 }}>›</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active detail */}
                <div style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.75rem", background: "rgba(15,10,10,0.8)", padding: 32 }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 18,
                    background: "#f43f5e", color: "#fff",
                    display: "grid", placeItems: "center", fontSize: 20, marginBottom: 24,
                  }}>
                    {activeIndex < 2 ? "▦" : activeIndex < 4 ? "⌘" : "◈"}
                  </div>
                  <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", margin: "0 0 8px" }}>active phase</p>
                  <h3 style={{ fontSize: 28, fontWeight: 600, color: "#fff", margin: "0 0 18px" }}>{activePhase}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: "0 0 14px" }}>{activeDetail}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "rgba(255,255,255,0.3)", margin: "0 0 28px" }}>
                    This phase is treated as part of the dissertation method rather than only a technical step, connecting infrastructure, aesthetic control, model behaviour, and creative authorship.
                  </p>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(to right, #f43f5e, #fbbf24)", width: progress, transition: "width 0.4s ease" }} />
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 10 }}>Phase {activeIndex + 1} of {phases.length}</p>
                </div>
              </div>
            </section>

            {/* Specs + Outputs */}
            <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 72px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Specs */}
                <div style={{ border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.75rem", background: "rgba(255,255,255,0.04)", padding: 32 }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#f43f5e", marginBottom: 12 }}>Technical profile</p>
                  <h2 style={{ fontSize: 26, fontWeight: 600, color: "#fff", margin: "0 0 24px" }}>Training configuration</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {specs.map(([label, value]) => (
                      <div key={label} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14,
                        background: "rgba(0,0,0,0.3)", padding: "14px 18px",
                      }}>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>{label}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outputs */}
                <div style={{
                  border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.75rem",
                  background: "linear-gradient(135deg, rgba(244,63,94,0.12), rgba(255,255,255,0.04), rgba(251,191,36,0.08))",
                  padding: 32,
                }}>
                  <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: "#fbbf24", marginBottom: 12 }}>Outputs</p>
                  <h2 style={{ fontSize: 26, fontWeight: 600, color: "#fff", margin: "0 0 24px" }}>Dissertation artefacts</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {deliverables.map((item) => (
                      <div key={item} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 14, background: "rgba(0,0,0,0.3)", padding: "14px 16px",
                        fontSize: 13, color: "rgba(255,255,255,0.7)",
                      }}>
                        <span style={{ color: "#f43f5e", flexShrink: 0 }}>✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Closing statement */}
            <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 64px" }}>
              <div style={{
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "2.5rem",
                background: "rgba(255,255,255,0.04)",
                padding: "56px 48px", textAlign: "center",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 20,
                  background: "#fff", color: "#0a0a0a",
                  display: "grid", placeItems: "center",
                  fontSize: 24, margin: "0 auto 24px",
                }}>
                  ⚗
                </div>
                <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff", maxWidth: 680, margin: "0 auto 20px" }}>
                  cineLoRA asks what cinematic authorship looks like when style becomes trainable.
                </h2>
                <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto 36px" }}>
                  The final project combines technical reproducibility with critical reflection: the LoRA checkpoint is both a working artefact and a research object.
                </p>
                <a href="#cl-abstract" style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "14px 32px", borderRadius: 999,
                  background: "#fff", color: "#0a0a0a",
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  fontFamily: "inherit",
                }}>
                  Read the dissertation abstract →
                </a>
              </div>
            </section>

            {/* CTA to switch */}
            <section style={{ padding: "0 40px 64px", textAlign: "center" }}>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 20 }}>
                also by London Ham
              </p>
              <button
                onClick={() => { setActiveProject("tfa"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                style={{
                  padding: "14px 32px", borderRadius: 999,
                  border: "1px solid rgba(239,68,68,0.3)",
                  background: "rgba(239,68,68,0.08)",
                  color: "#ef4444", fontSize: 14, cursor: "pointer",
                  letterSpacing: "0.1em", fontFamily: "inherit",
                }}
              >
                View T.F.A. — five-channel installation →
              </button>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "28px 40px" }}>
              <div style={{
                maxWidth: 1280, margin: "0 auto",
                display: "flex", justifyContent: "space-between",
                fontSize: 12, color: "rgba(255,255,255,0.2)",
              }}>
                <p style={{ margin: 0 }}>© London Ham — cineLoRA</p>
                <p style={{ margin: 0 }}>MFA Computational Arts / Goldsmiths University of London</p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
