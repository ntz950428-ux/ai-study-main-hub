import { useState, useEffect } from "react";

const EXAM_DATE = new Date("2026-07-05");
const STORAGE_KEY = "studyplan_completed_v1";

const studyPlan = [
  {
    date: "2026-06-25", day: "বৃহস্পতিবার", isHoliday: false, isSchool: true, hasEnglishPrivate: false,
    sessions: [
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "ইতিহাস", topic: "১ম অধ্যায় — পড়া + গুরুত্বপূর্ণ নোট তৈরি", type: "new", icon: "📜" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "গণিত", topic: "অনুশীলনী ২.১ + ২.২ (বীজগণিত)", type: "new", icon: "🔢" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ভূগোল", topic: "১ম + ২য় অধ্যায়", type: "new", icon: "🌍" },
    ],
  },
  {
    date: "2026-06-26", day: "শুক্রবার", isHoliday: true, isSchool: false, hasEnglishPrivate: true,
    sessions: [
      { startH: 9, startM: 0, endH: 10, endM: 30, subject: "ইতিহাস", topic: "২য় অধ্যায় — পড়া + নোট", type: "new", icon: "📜" },
      { startH: 10, startM: 30, endH: 12, endM: 0, subject: "গণিত", topic: "অনুশীলনী ৩.১ + ৩.২ (বীজগণিত)", type: "new", icon: "🔢" },
      { startH: 15, startM: 0, endH: 16, endM: 0, subject: "ইংরেজি প্রাইভেট", topic: "প্রাইভেট ক্লাস", type: "private", icon: "🏫" },
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "ভূগোল", topic: "৩য় + ৪র্থ অধ্যায়", type: "new", icon: "🌍" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "অর্থনীতি", topic: "১ম + ২য় অধ্যায়", type: "new", icon: "💰" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ইতিহাস", topic: "৩য় অধ্যায় — পড়া + নোট", type: "new", icon: "📜" },
    ],
  },
  {
    date: "2026-06-27", day: "শনিবার", isHoliday: true, isSchool: false, hasEnglishPrivate: true,
    sessions: [
      { startH: 9, startM: 0, endH: 10, endM: 30, subject: "গণিত", topic: "অনুশীলনী ৪.১ + ৬ষ্ঠ অধ্যায় জ্যামিতি", type: "new", icon: "🔢" },
      { startH: 10, startM: 30, endH: 12, endM: 0, subject: "বাংলা ১ম", topic: "গদ্য: প্রত্যুপকার + ফুলের বিবাহ + সুবা", type: "new", icon: "📖" },
      { startH: 15, startM: 0, endH: 16, endM: 0, subject: "ইংরেজি প্রাইভেট", topic: "প্রাইভেট ক্লাস", type: "private", icon: "🏫" },
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "ভূগোল", topic: "৫ম অধ্যায় + সম্পূর্ণ রিভিশন 🔁", type: "revision", icon: "🌍" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "ইতিহাস", topic: "৪র্থ অধ্যায় — পড়া + নোট", type: "new", icon: "📜" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "অর্থনীতি", topic: "৩য় অধ্যায় + সম্পূর্ণ রিভিশন 🔁", type: "revision", icon: "💰" },
    ],
  },
  {
    date: "2026-06-28", day: "রবিবার", isHoliday: false, isSchool: true, hasEnglishPrivate: false,
    sessions: [
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "গণিত", topic: "৭ম অধ্যায় জ্যামিতি + অনুশীলনী ৯.১ ত্রিকোণমিতি", type: "new", icon: "🔢" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "বাংলা ১ম", topic: "গদ্য: বই পড়া + অভাগীর স্বর্গ + নিরীহ বাঙালি", type: "new", icon: "📖" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ইসলাম শিক্ষা", topic: "১ম + ২য় অধ্যায়", type: "new", icon: "☪️" },
    ],
  },
  {
    date: "2026-06-29", day: "সোমবার", isHoliday: false, isSchool: true, hasEnglishPrivate: false,
    sessions: [
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "বাংলা ১ম", topic: "পদ্য: বন্দনা + কপোতাক্ষ নদ + প্রাণ + অন্ধবধূ", type: "new", icon: "📖" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "গণিত", topic: "অনুশীলনী ১৬.১ পরিমিতি + অনুশীলনী ১৭ পরিসংখ্যান", type: "new", icon: "🔢" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ইতিহাস", topic: "১ম + ২য় অধ্যায় — ১ম রিভিশন 🔁", type: "revision", icon: "📜" },
    ],
  },
  {
    date: "2026-06-30", day: "মঙ্গলবার", isHoliday: false, isSchool: true, hasEnglishPrivate: false,
    sessions: [
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "বাংলা ১ম", topic: "পদ্য: ঝর্ণার গান + জীবন + বিনিময় + সহপাঠ: ১৯৭১ + বহিপীর", type: "new", icon: "📖" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "বাংলা ২য়", topic: "পরিচ্ছেদ ১–৮ + অনুচ্ছেদ + ব্যক্তিগত পত্র", type: "new", icon: "✍️" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ইতিহাস", topic: "৩য় + ৪র্থ অধ্যায় — ১ম রিভিশন 🔁", type: "revision", icon: "📜" },
    ],
  },
  {
    date: "2026-07-01", day: "বুধবার", isHoliday: false, isSchool: true, hasEnglishPrivate: true,
    sessions: [
      { startH: 15, startM: 0, endH: 16, endM: 0, subject: "ইংরেজি প্রাইভেট", topic: "প্রাইভেট ক্লাস", type: "private", icon: "🏫" },
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "বাংলা ২য়", topic: "পরিচ্ছেদ ৯–১৬ + আবেদনপত্র + সংবাদপত্র চিঠি", type: "new", icon: "✍️" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "ইংরেজি ১ম", topic: "Unit 1 + Unit 2 + Unit 3", type: "new", icon: "🇬🇧" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "গণিত", topic: "বীজগণিত সব অনুশীলনী — ১ম রিভিশন 🔁", type: "revision", icon: "🔢" },
    ],
  },
  {
    date: "2026-07-02", day: "বৃহস্পতিবার", isHoliday: false, isSchool: true, hasEnglishPrivate: false,
    sessions: [
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "বাংলা ২য়", topic: "সারাংশ + সারমর্ম + ভাবসম্প্রসারণ + প্রতিবেদন + রচনা", type: "new", icon: "✍️" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "ইংরেজি ১ম", topic: "Unit 4 (L2,3) + Unit 11 (L1,4,9) + Story + Dialogue", type: "new", icon: "🇬🇧" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "গণিত", topic: "জ্যামিতি + ত্রিকোণমিতি + পরিমিতি — ১ম রিভিশন 🔁", type: "revision", icon: "🔢" },
    ],
  },
  {
    date: "2026-07-03", day: "শুক্রবার", isHoliday: true, isSchool: false, hasEnglishPrivate: true,
    sessions: [
      { startH: 9, startM: 0, endH: 10, endM: 30, subject: "ইংরেজি ২য়", topic: "Filling Gaps + Sub. Table + Right Forms + Changing Sentences", type: "new", icon: "🇬🇧" },
      { startH: 10, startM: 30, endH: 12, endM: 0, subject: "বাংলা ১ম", topic: "সম্পূর্ণ ২য় রিভিশন 🔁 (গদ্য + পদ্য + সহপাঠ)", type: "revision", icon: "📖" },
      { startH: 15, startM: 0, endH: 16, endM: 0, subject: "ইংরেজি প্রাইভেট", topic: "প্রাইভেট ক্লাস", type: "private", icon: "🏫" },
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "ইংরেজি ২য়", topic: "Suffix/Prefix + Tag Q + Connectors + Punctuation + Email", type: "new", icon: "🇬🇧" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "ভূগোল + অর্থনীতি", topic: "সব অধ্যায় — ২য় রিভিশন 🔁", type: "revision", icon: "🌍" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "ইতিহাস", topic: "সব অধ্যায় — ২য় রিভিশন 🔁", type: "revision", icon: "📜" },
    ],
  },
  {
    date: "2026-07-04", day: "শনিবার", isHoliday: true, isSchool: false, hasEnglishPrivate: true,
    note: "⭐ চূড়ান্ত রিভিশন দিন",
    sessions: [
      { startH: 9, startM: 0, endH: 10, endM: 0, subject: "গণিত", topic: "সব সূত্র + গুরুত্বপূর্ণ অংক রিভিশন", type: "revision", icon: "🔢" },
      { startH: 10, startM: 0, endH: 11, endM: 0, subject: "ইতিহাস", topic: "সব অধ্যায়ের নোট দেখা", type: "revision", icon: "📜" },
      { startH: 11, startM: 0, endH: 12, endM: 0, subject: "বাংলা ২য়", topic: "পত্র + রচনা + ভাবসম্প্রসারণ দেখা", type: "revision", icon: "✍️" },
      { startH: 15, startM: 0, endH: 16, endM: 0, subject: "ইংরেজি প্রাইভেট", topic: "প্রাইভেট ক্লাস", type: "private", icon: "🏫" },
      { startH: 16, startM: 0, endH: 17, endM: 0, subject: "ইংরেজি ১ম + ২য়", topic: "দ্রুত রিভিশন", type: "revision", icon: "🇬🇧" },
      { startH: 19, startM: 30, endH: 20, endM: 30, subject: "ইসলাম + ভূগোল", topic: "গুরুত্বপূর্ণ পয়েন্ট দেখা", type: "revision", icon: "☪️" },
      { startH: 20, startM: 30, endH: 21, endM: 30, subject: "সব বিষয়", topic: "দুর্বল জায়গা দেখা + মনে করা", type: "revision", icon: "🎯" },
      { startH: 21, startM: 30, endH: 22, endM: 0, subject: "প্রস্তুতি", topic: "স্টেশনারি গোছানো + আগামীকাল পরীক্ষা!", type: "prep", icon: "🎒" },
    ],
  },
];

const subjectMeta = {
  "গণিত":             { dot: "#f59e0b", border: "#f59e0b44" },
  "ইতিহাস":           { dot: "#ef4444", border: "#ef444444" },
  "বাংলা ১ম":         { dot: "#22c55e", border: "#22c55e44" },
  "বাংলা ২য়":         { dot: "#10b981", border: "#10b98144" },
  "ইংরেজি ১ম":        { dot: "#6366f1", border: "#6366f144" },
  "ইংরেজি ২য়":        { dot: "#818cf8", border: "#818cf844" },
  "ইংরেজি ১ম + ২য়":  { dot: "#818cf8", border: "#818cf844" },
  "ভূগোল":            { dot: "#a855f7", border: "#a855f744" },
  "ভূগোল + অর্থনীতি": { dot: "#a855f7", border: "#a855f744" },
  "অর্থনীতি":         { dot: "#ec4899", border: "#ec489944" },
  "ইসলাম শিক্ষা":     { dot: "#14b8a6", border: "#14b8a644" },
  "ইসলাম + ভূগোল":    { dot: "#14b8a6", border: "#14b8a644" },
  "ইংরেজি প্রাইভেট":  { dot: "#475569", border: "#47556933" },
  "সব বিষয়":          { dot: "#eab308", border: "#eab30844" },
  "প্রস্তুতি":         { dot: "#f97316", border: "#f9731644" },
};

function getColor(subject) {
  return subjectMeta[subject] || { dot: "#94a3b8", border: "#94a3b833" };
}

// ── time helpers ──────────────────────────────────────────────
const BN_DIGITS = ["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
function toBN(n) { return String(n).split("").map(d => BN_DIGITS[+d] ?? d).join(""); }

function fmt12(h, m) {
  const period = h < 12 ? "রাত" : h < 17 ? "বিকাল" : h < 19 ? "সন্ধ্যা" : "রাত";
  // special Bengali time-of-day
  let label = period;
  if (h >= 4 && h < 6) label = "ভোর";
  else if (h >= 6 && h < 12) label = "সকাল";
  else if (h === 12) label = "দুপুর";
  else if (h >= 12 && h < 15) label = "দুপুর";
  else if (h >= 15 && h < 17) label = "বিকাল";
  else if (h >= 17 && h < 19) label = "সন্ধ্যা";
  else label = "রাত";

  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mStr = m === 0 ? "" : `:${toBN(m)}`;
  return `${label} ${toBN(h12)}${mStr}টা`;
}

function fmtRange(s) {
  return `${fmt12(s.startH, s.startM)} – ${fmt12(s.endH, s.endM)}`;
}

function getDaysLeft() {
  const t = new Date(); t.setHours(0,0,0,0);
  return Math.ceil((EXAM_DATE - t) / 86400000);
}
function isToday(dateStr) { return new Date().toDateString() === new Date(dateStr).toDateString(); }
function isPast(dateStr)  { const t=new Date(); t.setHours(0,0,0,0); return new Date(dateStr) < t; }
function shortDate(dateStr) {
  const d = new Date(dateStr);
  const months = ["জানু","ফেব্রু","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টে","অক্টো","নভে","ডিসে"];
  return `${toBN(d.getDate())} ${months[d.getMonth()]}`;
}

// ── current session detector ──────────────────────────────────
function getCurrentSessionKey(dayIdx) {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0];
  if (studyPlan[dayIdx]?.date !== todayStr) return null;
  const nowMins = now.getHours() * 60 + now.getMinutes();
  return studyPlan[dayIdx].sessions.findIndex(s => {
    const start = s.startH * 60 + s.startM;
    const end   = s.endH   * 60 + s.endM;
    return nowMins >= start && nowMins < end;
  });
}

const MOTIVATIONS = [
  "তুমি পারবে! 💪 প্রতিটি পদক্ষেপ তোমাকে সাফল্যের কাছে নিয়ে যাচ্ছে।",
  "কঠিন পরিশ্রমের কোনো বিকল্প নেই। আজকের পড়া আগামীর সাফল্য! 🌟",
  "গণিত কঠিন মনে হলেও বারবার চর্চায় সহজ হয়ে যায়। হাল ছেড়ো না! 🔢",
  "পরীক্ষা কাছে আসছে — কিন্তু তুমি প্রস্তুত! ধাপে ধাপে এগিয়ে যাও। 🎯",
  "প্রতিদিন একটু একটু করে পড়লেই বড় সিলেবাস শেষ হয়। চলতে থাকো! 🚀",
];

const NAMAAZ = [
  { name:"ফজর", time:"ভোর ~৪:৩০", icon:"🌅" },
  { name:"যোহর", time:"দুপুর ~১টা", icon:"☀️" },
  { name:"আসর", time:"বিকাল ~৫টা", icon:"🌤️" },
  { name:"মাগরিব", time:"সন্ধ্যা ~৬:৩০", icon:"🌆" },
  { name:"এশা", time:"রাত ~৯:৩০", icon:"🌙" },
];

// ─────────────────────────────────────────────────────────────
export default function App() {
  // Load saved from storage
  const [completed, setCompleted] = useState(() => {
    try { return JSON.parse(window.storage?.getSync?.(STORAGE_KEY) ?? "null") || {}; }
    catch { return {}; }
  });
  const [activeDay, setActiveDay] = useState(() => {
    const idx = studyPlan.findIndex(d => isToday(d.date));
    return idx >= 0 ? idx : 0;
  });
  const [view, setView]           = useState("daily");
  const [showNamaaz, setShowNamaaz] = useState(false);
  const [tick, setTick]           = useState(0);
  const [justCompleted, setJustCompleted] = useState(null); // for animation
  const [motivIdx]                = useState(() => Math.floor(Math.random() * MOTIVATIONS.length));

  // Tick every minute to update "current session" highlight
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  // Persist to storage on change
  useEffect(() => {
    try {
      window.storage?.setSync?.(STORAGE_KEY, JSON.stringify(completed));
      // Fallback: sessionStorage for this session
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {}
  }, [completed]);

  // Load from sessionStorage on mount (since localStorage is blocked in artifacts)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setCompleted(JSON.parse(saved));
    } catch {}
  }, []);

  function toggle(dayIdx, si) {
    const key = `${dayIdx}-${si}`;
    const nowDone = !completed[key];
    setCompleted(prev => ({ ...prev, [key]: nowDone }));
    if (nowDone) {
      setJustCompleted(key);
      setTimeout(() => setJustCompleted(null), 1200);
    }
  }

  const daysLeft = getDaysLeft();
  const totalSessions = studyPlan.reduce((a, d) => a + d.sessions.filter(s => s.type !== "private").length, 0);
  const doneCount     = Object.values(completed).filter(Boolean).length;
  const progress      = Math.round((doneCount / totalSessions) * 100);

  const day = studyPlan[activeDay];
  const studySessions = day.sessions.map((s, si) => ({ s, si })).filter(({ s }) => s.type !== "private");
  const dayDone = studySessions.filter(({ si }) => completed[`${activeDay}-${si}`]).length;
  const dayTotal = studySessions.length;
  const currentSi = getCurrentSessionKey(activeDay);
  const examColor = daysLeft <= 2 ? "#ef4444" : daysLeft <= 4 ? "#f59e0b" : "#22c55e";

  return (
    <div style={{ minHeight:"100vh", background:"#080f1e", color:"#e2e8f0",
      fontFamily:"'Segoe UI', system-ui, -apple-system, sans-serif" }}>

      {/* ══ HEADER ══ */}
      <div style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)",
        borderBottom:"1px solid #1e293b", position:"sticky", top:0, zIndex:20,
        boxShadow:"0 4px 30px rgba(0,0,0,.5)" }}>
        <div style={{ maxWidth:680, margin:"0 auto", padding:"13px 16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:3, color:"#6366f1", fontWeight:700, textTransform:"uppercase" }}>
                ৯ম শ্রেণি • মানবিক বিভাগ
              </div>
              <div style={{ fontSize:20, fontWeight:900,
                background:"linear-gradient(90deg,#a5b4fc,#67e8f9)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", letterSpacing:-.5 }}>
                স্টাডি প্ল্যান ২০২৬
              </div>
            </div>
            <div style={{ background:`${examColor}22`, border:`1.5px solid ${examColor}`,
              borderRadius:14, padding:"6px 14px", textAlign:"center", minWidth:68 }}>
              <div style={{ fontSize:22, fontWeight:900, color:examColor, lineHeight:1 }}>{daysLeft}</div>
              <div style={{ fontSize:9, color:examColor, letterSpacing:1, fontWeight:600 }}>দিন বাকি</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#64748b", marginBottom:4 }}>
              <span>সামগ্রিক অগ্রগতি</span>
              <span style={{ color:"#94a3b8" }}>{doneCount}/{totalSessions} • {progress}%</span>
            </div>
            <div style={{ height:7, background:"#1e293b", borderRadius:4, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${progress}%`,
                background:"linear-gradient(90deg,#6366f1,#22c55e)", borderRadius:4,
                transition:"width .5s cubic-bezier(.4,0,.2,1)",
                boxShadow:"0 0 8px #6366f166" }} />
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:6 }}>
            {[["daily","📅 দৈনিক"],["overview","📋 সম্পূর্ণ"],["stats","📊 পরিসংখ্যান"]].map(([v,label]) => (
              <button key={v} onClick={() => setView(v)} style={{
                flex:1, padding:"6px 0", borderRadius:8, border:"none",
                background: view===v ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "#1e293b",
                color: view===v ? "#fff" : "#64748b",
                fontSize:11, fontWeight:700, cursor:"pointer",
                boxShadow: view===v ? "0 2px 8px #6366f144" : "none",
                transition:"all .2s" }}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"14px 14px 48px" }}>

        {/* Motivation */}
        <div style={{ background:"linear-gradient(90deg,#1e1b4b,#0f172a)",
          border:"1px solid #312e81", borderRadius:10, padding:"10px 14px",
          marginBottom:14, fontSize:12, color:"#a5b4fc", fontStyle:"italic" }}>
          💬 {MOTIVATIONS[motivIdx]}
        </div>

        {/* ══ DAILY VIEW ══ */}
        {view === "daily" && <>
          {/* Day strip */}
          <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:8,
            marginBottom:14, scrollbarWidth:"none" }}>
            {studyPlan.map((d, i) => {
              const today = isToday(d.date), past = isPast(d.date), active = activeDay===i;
              const allDone = d.sessions.filter(s=>s.type!=="private")
                .every((_,si) => completed[`${i}-${si}`]);
              return (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  minWidth:58, padding:"8px 6px", borderRadius:12, flexShrink:0, cursor:"pointer",
                  border: active ? "2px solid #6366f1" : today ? "2px solid #22c55e44" : "2px solid transparent",
                  background: today ? "#1e1b4b" : active ? "#1e293b" : past ? "#080f1e" : "#0f172a",
                  textAlign:"center", position:"relative",
                  boxShadow: active ? "0 0 14px #6366f155" : "none", transition:"all .18s" }}>
                  {allDone && (
                    <div style={{ position:"absolute", top:-4, right:-4, width:14, height:14,
                      borderRadius:"50%", background:"#22c55e", fontSize:8, color:"#fff",
                      display:"flex", alignItems:"center", justifyContent:"center" }}>✓</div>
                  )}
                  {d.isHoliday && <div style={{ fontSize:8, marginBottom:1 }}>🏖️</div>}
                  <div style={{ fontSize:11, fontWeight:700,
                    color: today ? "#a5b4fc" : past ? "#334155" : "#94a3b8" }}>{shortDate(d.date)}</div>
                  <div style={{ fontSize:9, color: today ? "#818cf8" : "#475569", marginTop:2 }}>
                    {d.day.slice(0,5)}</div>
                  {today && <div style={{ marginTop:3, background:"#22c55e", color:"#fff",
                    borderRadius:4, fontSize:8, padding:"1px 4px", fontWeight:700 }}>আজ</div>}
                </button>
              );
            })}
          </div>

          {/* Day card */}
          <div style={{ background:"#0d1526", border: isToday(day.date) ? "1px solid #4338ca" : "1px solid #1e293b",
            borderRadius:18, overflow:"hidden",
            boxShadow: isToday(day.date) ? "0 0 28px #6366f122" : "none" }}>

            {/* Card header */}
            <div style={{ padding:"14px 16px",
              background: isToday(day.date) ? "linear-gradient(135deg,#1e1b4b,#312e81)"
                : day.isHoliday ? "#0f172a" : "#080f1e",
              borderBottom:"1px solid #1e293b" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:17, fontWeight:800, color:"#f1f5f9" }}>
                    {shortDate(day.date)} — {day.day}
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:10, fontSize:10, color:"#64748b", marginTop:4 }}>
                    {day.isSchool && <span>🏫 স্কুল: সকাল ৮টা – দুপুর ২টা</span>}
                    {day.isHoliday && <span style={{ color:"#fbbf24" }}>🏖️ ছুটির দিন</span>}
                    {day.hasEnglishPrivate && <span style={{ color:"#60a5fa" }}>📚 ইং. প্রাইভেট: বিকাল ৩–৪টা</span>}
                    <span style={{ color:"#a78bfa" }}>📘 বাং/গণিত প্রাইভেট: বিকাল ৫–সন্ধ্যা ৬:৩০</span>
                  </div>
                  {day.note && <div style={{ fontSize:12, color:"#fbbf24", marginTop:5, fontWeight:700 }}>{day.note}</div>}
                </div>
                {/* Circular day progress */}
                <div style={{ flexShrink:0 }}>
                  <div style={{ width:46, height:46, borderRadius:"50%",
                    background:`conic-gradient(#22c55e ${dayDone/dayTotal*360}deg,#1e293b 0)`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    boxShadow:"0 0 12px #22c55e33" }}>
                    <div style={{ width:35, height:35, borderRadius:"50%", background:"#080f1e",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexDirection:"column" }}>
                      <div style={{ fontSize:11, fontWeight:900, color:"#22c55e", lineHeight:1 }}>{dayDone}/{dayTotal}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Namaaz toggle */}
            <button onClick={() => setShowNamaaz(p=>!p)} style={{
              width:"100%", padding:"8px 16px", background:"#080f1e",
              border:"none", borderBottom:"1px solid #1e293b",
              color:"#475569", fontSize:11, cursor:"pointer",
              display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span>🕌 নামাজের সময়সূচি</span>
              <span style={{ fontSize:9 }}>{showNamaaz ? "▲ লুকাও" : "▼ দেখাও"}</span>
            </button>
            {showNamaaz && (
              <div style={{ display:"flex", gap:8, padding:"10px 14px", background:"#080f1e",
                borderBottom:"1px solid #1e293b", flexWrap:"wrap" }}>
                {NAMAAZ.map(n => (
                  <div key={n.name} style={{ background:"#0f172a", border:"1px solid #1e293b",
                    borderRadius:8, padding:"6px 10px", textAlign:"center", minWidth:70 }}>
                    <div style={{ fontSize:14 }}>{n.icon}</div>
                    <div style={{ fontSize:10, fontWeight:700, color:"#a5b4fc" }}>{n.name}</div>
                    <div style={{ fontSize:9, color:"#64748b" }}>{n.time}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Sessions */}
            <div style={{ padding:"12px" }}>
              {day.sessions.map((session, si) => {
                const key = `${activeDay}-${si}`;
                const done = completed[key];
                const isPrivate = session.type === "private";
                const isRevision = session.type === "revision";
                const isCurrent = currentSi === si;
                const justNow = justCompleted === key;
                const c = getColor(session.subject);

                return (
                  <div key={si} style={{
                    display:"flex", alignItems:"flex-start", gap:10,
                    marginBottom:9,
                    opacity: done ? 0.42 : 1,
                    transition:"opacity .3s" }}>

                    {/* Checkbox */}
                    {!isPrivate ? (
                      <button onClick={() => toggle(activeDay, si)} style={{
                        width:26, height:26, borderRadius:"50%", flexShrink:0, marginTop:10,
                        border:`2px solid ${done ? "#22c55e" : isCurrent ? "#f59e0b" : "#334155"}`,
                        background: done ? "#22c55e" : justNow ? "#22c55e44" : "transparent",
                        cursor:"pointer", display:"flex", alignItems:"center",
                        justifyContent:"center", fontSize:13, color:"#fff",
                        transition:"all .25s",
                        boxShadow: done ? "0 0 8px #22c55e77" : isCurrent ? "0 0 8px #f59e0b77" : "none",
                        transform: justNow ? "scale(1.3)" : "scale(1)" }}>
                        {done ? "✓" : ""}
                      </button>
                    ) : (
                      <div style={{ width:26, flexShrink:0, marginTop:10 }} />
                    )}

                    {/* Session card */}
                    <div style={{
                      flex:1,
                      background: isPrivate ? "#080f1e" : isCurrent ? "#1a1a2e" : "#111827",
                      border: `1.5px solid ${isPrivate ? "#1e293b" : isCurrent ? "#f59e0b88" : c.border}`,
                      borderLeft: isPrivate ? undefined : `3px solid ${c.dot}`,
                      borderRadius:12,
                      padding:"10px 13px",
                      transition:"all .25s",
                      boxShadow: isCurrent ? "0 0 14px #f59e0b22" : "none" }}>

                      {/* Top row */}
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                          <span style={{ fontSize:15 }}>{session.icon}</span>
                          <span style={{ fontSize:12, fontWeight:800, color: isPrivate ? "#475569" : c.dot }}>
                            {session.subject}
                          </span>
                          {isCurrent && !done && (
                            <span style={{ background:"#f59e0b", color:"#000",
                              borderRadius:5, padding:"1px 6px", fontSize:9, fontWeight:800 }}>
                              🔴 এখন
                            </span>
                          )}
                          {isRevision && (
                            <span style={{ background:"#7c3aed", color:"#fff",
                              borderRadius:5, padding:"1px 6px", fontSize:9, fontWeight:700 }}>
                              🔁 রিভিশন
                            </span>
                          )}
                          {session.type === "new" && (
                            <span style={{ background:"#065f46", color:"#6ee7b7",
                              borderRadius:5, padding:"1px 6px", fontSize:9, fontWeight:700 }}>
                              নতুন
                            </span>
                          )}
                        </div>

                        {/* ✅ Bengali 12-hour time */}
                        <div style={{ background:"#0b1120", borderRadius:8, padding:"4px 9px",
                          border:"1px solid #1e293b", flexShrink:0 }}>
                          <div style={{ fontSize:10, color:"#94a3b8", fontWeight:700, whiteSpace:"nowrap" }}>
                            {fmt12(session.startH, session.startM)}
                          </div>
                          <div style={{ fontSize:9, color:"#475569", textAlign:"center" }}>↓</div>
                          <div style={{ fontSize:10, color:"#94a3b8", fontWeight:700, whiteSpace:"nowrap" }}>
                            {fmt12(session.endH, session.endM)}
                          </div>
                        </div>
                      </div>

                      {/* Topic */}
                      <div style={{ fontSize:12, color: isPrivate ? "#334155" : "#94a3b8",
                        lineHeight:1.5, textDecoration: done ? "line-through" : "none" }}>
                        {session.topic}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Day complete banner */}
              {dayDone === dayTotal && dayTotal > 0 && (
                <div style={{ textAlign:"center", padding:"14px",
                  background:"linear-gradient(135deg,#065f46,#064e3b)",
                  borderRadius:12, border:"1px solid #22c55e44",
                  boxShadow:"0 0 20px #22c55e22" }}>
                  <div style={{ fontSize:22 }}>🎉</div>
                  <div style={{ fontSize:13, fontWeight:800, color:"#6ee7b7" }}>আজকের সব পড়া শেষ!</div>
                  <div style={{ fontSize:11, color:"#34d399", marginTop:3 }}>অসাধারণ! তুমি দারুণ করছ।</div>
                </div>
              )}
            </div>
          </div>

          {/* Prev / Next */}
          <div style={{ display:"flex", gap:10, marginTop:12 }}>
            {[["← আগের দিন", Math.max(0,activeDay-1), activeDay===0],
              ["পরের দিন →", Math.min(studyPlan.length-1,activeDay+1), activeDay===studyPlan.length-1]
            ].map(([label,target,disabled]) => (
              <button key={label} onClick={() => !disabled && setActiveDay(target)} style={{
                flex:1, padding:"11px", borderRadius:12,
                background: disabled ? "#080f1e" : "#1e293b",
                border:`1px solid ${disabled ? "#0f172a" : "#334155"}`,
                color: disabled ? "#1e293b" : "#94a3b8",
                cursor: disabled ? "not-allowed" : "pointer",
                fontSize:12, fontWeight:600, transition:"all .2s" }}>
                {label}
              </button>
            ))}
          </div>
        </>}

        {/* ══ OVERVIEW ══ */}
        {view === "overview" && <>
          {studyPlan.map((d, i) => (
            <div key={i} style={{
              background: isToday(d.date) ? "#1e1b4b" : "#0d1526",
              border: isToday(d.date) ? "1.5px solid #6366f1" : "1px solid #1e293b",
              borderRadius:14, marginBottom:10, overflow:"hidden",
              boxShadow: isToday(d.date) ? "0 0 20px #6366f122" : "none" }}>
              <div style={{ padding:"10px 14px",
                background: isToday(d.date) ? "linear-gradient(90deg,#1e1b4b,#312e81)" : "#080f1e",
                display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <span style={{ fontWeight:800, fontSize:13, color:"#e2e8f0" }}>
                    {shortDate(d.date)} — {d.day}
                  </span>
                  {d.isHoliday && <span style={{ fontSize:10, color:"#fbbf24", marginLeft:8 }}>🏖️ ছুটি</span>}
                  {d.note && <span style={{ fontSize:10, color:"#fbbf24", marginLeft:8 }}>{d.note}</span>}
                  {isToday(d.date) && <span style={{ fontSize:10, color:"#a5b4fc", marginLeft:8, fontWeight:700 }}>← আজ</span>}
                </div>
                <button onClick={() => { setActiveDay(i); setView("daily"); }} style={{
                  background:"#6366f1", color:"#fff", border:"none",
                  borderRadius:7, padding:"4px 11px", fontSize:11, cursor:"pointer", fontWeight:700 }}>
                  বিস্তারিত
                </button>
              </div>
              <div style={{ padding:"10px 12px", display:"flex", flexWrap:"wrap", gap:6 }}>
                {d.sessions.map((s, si) => {
                  const c = getColor(s.subject);
                  const done = completed[`${i}-${si}`];
                  return (
                    <div key={si} style={{
                      background:"#080f1e",
                      border:`1px solid ${s.type==="private" ? "#1e293b" : c.dot+"55"}`,
                      borderLeft: s.type!=="private" ? `2px solid ${c.dot}` : undefined,
                      borderRadius:7, padding:"3px 9px",
                      fontSize:10, color: s.type==="private" ? "#334155" : c.dot,
                      fontWeight:700,
                      textDecoration: done ? "line-through" : "none",
                      opacity: done ? 0.4 : 1 }}>
                      {s.icon} {s.subject} {s.type==="revision" ? "🔁" : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </>}

        {/* ══ STATS ══ */}
        {view === "stats" && <>
          <div style={{ background:"#0d1526", border:"1px solid #1e293b",
            borderRadius:16, padding:"20px", marginBottom:14, textAlign:"center" }}>
            <div style={{ fontSize:11, color:"#64748b", marginBottom:8, letterSpacing:1 }}>সামগ্রিক অগ্রগতি</div>
            <div style={{ width:110, height:110, borderRadius:"50%", margin:"0 auto 12px",
              background:`conic-gradient(#6366f1 ${progress*3.6}deg,#1e293b 0)`,
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 24px #6366f133" }}>
              <div style={{ width:84, height:84, borderRadius:"50%", background:"#080f1e",
                display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column" }}>
                <div style={{ fontSize:26, fontWeight:900, color:"#a5b4fc" }}>{progress}%</div>
              </div>
            </div>
            <div style={{ fontSize:13, color:"#94a3b8" }}>
              {doneCount} সেশন শেষ, {totalSessions - doneCount} টি বাকি
            </div>
          </div>

          <div style={{ background:"#0d1526", border:"1px solid #1e293b", borderRadius:14, padding:"14px", marginBottom:14 }}>
            <div style={{ fontSize:12, fontWeight:800, color:"#94a3b8", marginBottom:12 }}>📚 বিষয়ভিত্তিক মোট সময়</div>
            {[
              ["গণিত", 8, "#f59e0b", "⭐ দুর্বল"],
              ["ইতিহাস", 6, "#ef4444", "⭐ দুর্বল"],
              ["বাংলা ১ম", 5, "#22c55e", "💪 শক্তিশালী"],
              ["ইংরেজি", 4, "#6366f1", ""],
              ["ভূগোল", 4, "#a855f7", ""],
              ["বাংলা ২য়", 3, "#10b981", ""],
              ["অর্থনীতি", 3, "#ec4899", ""],
              ["ইসলাম শিক্ষা", 2, "#14b8a6", ""],
            ].map(([subj, hrs, color, tag]) => (
              <div key={subj} style={{ marginBottom:10 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                  <span style={{ color:"#cbd5e1", fontWeight:600 }}>
                    {subj} {tag && <span style={{ fontSize:9, color, background:color+"22",
                      borderRadius:4, padding:"1px 5px" }}>{tag}</span>}
                  </span>
                  <span style={{ color:"#64748b" }}>~{hrs} ঘণ্টা</span>
                </div>
                <div style={{ height:6, background:"#1e293b", borderRadius:3, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(hrs/8)*100}%`, background:color,
                    borderRadius:3, boxShadow:`0 0 6px ${color}66` }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background:"#0d1526", border:"1px solid #1e293b", borderRadius:14, padding:"14px" }}>
            <div style={{ fontSize:12, fontWeight:800, color:"#94a3b8", marginBottom:10 }}>✅ সিলেবাস চেকলিস্ট</div>
            {[
              ["বাংলা ১ম","গদ্য ৬টি + পদ্য ৭টি + সহপাঠ ২টি","#22c55e"],
              ["বাংলা ২য়","পরিচ্ছেদ ১-১৬ + রচনামূলক সব","#10b981"],
              ["ইংরেজি ১ম","Unit 1,2,3,4,11 + Story + Dialogue","#6366f1"],
              ["ইংরেজি ২য়","৯টি গ্রামার টপিক + Email","#818cf8"],
              ["গণিত","বীজগণিত ৫ + জ্যামিতি ২ + ত্রিকোণমিতি + পরিমিতি + পরিসংখ্যান","#f59e0b"],
              ["ইতিহাস","১ম–৪র্থ অধ্যায়","#ef4444"],
              ["ইসলাম শিক্ষা","১ম–২য় অধ্যায়","#14b8a6"],
              ["ভূগোল","১ম–৫ম অধ্যায়","#a855f7"],
              ["অর্থনীতি","১ম–৩য় অধ্যায়","#ec4899"],
            ].map(([subj,detail,color]) => (
              <div key={subj} style={{ display:"flex", gap:10, marginBottom:9, alignItems:"flex-start" }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0, marginTop:4 }} />
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"#cbd5e1" }}>{subj}</div>
                  <div style={{ fontSize:10, color:"#475569" }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>
        </>}
      </div>
    </div>
  );
}
