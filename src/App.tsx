import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  Save,
  Download,
  Printer,
  Edit2,
  Lock,
  Unlock,
  Building2,
  Cpu,
  BarChart3,
  Scale,
  Image,
  CheckSquare,
  Sun,
  Moon,
} from "lucide-react";

import { PresentationData } from "./types";
import {
  initialPresentationDataES,
  initialPresentationDataEN,
  initialPresentationDataZH,
  uiTranslations,
} from "./data";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
  generateExportHTML,
} from "./utils";

import { Inicio } from "./components/Inicio";
import { Tecnica } from "./components/Tecnica";
import { Financiera } from "./components/Financiera";
import { Legal } from "./components/Legal";
import { Galeria } from "./components/Galeria";
import { Contacto } from "./components/Contacto";
import { PrintPreviewModal } from "./components/PrintPreviewModal";

export default function App() {
  const [language, setLanguage] = useState<"es" | "en" | "zh">("es");
  const [multiData, setMultiData] = useState<Record<"es" | "en" | "zh", PresentationData>>({
    es: initialPresentationDataES,
    en: initialPresentationDataEN,
    zh: initialPresentationDataZH,
  });

  const data = multiData[language];

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("motor_energy_dark_mode");
      return saved !== "false";
    } catch {
      return true;
    }
  });

  const t = uiTranslations[language] || uiTranslations.es;

  // Sync dark mode class on document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("motor_energy_dark_mode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("motor_energy_dark_mode", "false");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    showToast(
      !isDarkMode
        ? t.toast_dark_mode_active
        : t.toast_dark_mode_inactive,
      !isDarkMode ? "🌙" : "☀️"
    );
  };
  const [toast, setToast] = useState<{
    message: string;
    icon: string;
    show: boolean;
  }>({
    message: "",
    icon: "ℹ️",
    show: false,
  });

  // Load initial content on startup with seamless legacy migration
  useEffect(() => {
    try {
      const savedMulti = localStorage.getItem("motor_energy_multi_presentation_v2");
      const savedLang = localStorage.getItem("motor_energy_language") as "es" | "en" | "zh";
      
      let loadedMulti: Record<"es" | "en" | "zh", PresentationData> | null = null;
      if (savedMulti) {
        loadedMulti = JSON.parse(savedMulti);
      } else {
        // Backwards compatibility migration
        const savedLegacy = loadFromLocalStorage();
        if (savedLegacy) {
          loadedMulti = {
            es: savedLegacy,
            en: initialPresentationDataEN,
            zh: initialPresentationDataZH,
          };
        }
      }
      
      if (loadedMulti) {
        setMultiData(loadedMulti);
        // Show sync toast with correct active lang
        const activeLang = savedLang && ["es", "en", "zh"].includes(savedLang) ? savedLang : "es";
        const msg = uiTranslations[activeLang]?.toast_edited_sync || "Cambios cargados.";
        showToast(msg, "✅");
      }
      
      if (savedLang && ["es", "en", "zh"].includes(savedLang)) {
        setLanguage(savedLang);
      }
    } catch (err) {
      console.error("Error restoring language and content state", err);
    }
  }, []);

  const showToast = (message: string, icon = "ℹ️") => {
    setToast({ message, icon, show: true });
  };

  // Close toast helper
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleLanguageChange = (lang: "es" | "en" | "zh") => {
    setLanguage(lang);
    localStorage.setItem("motor_energy_language", lang);
    const msg = uiTranslations[lang]?.toast_lang_changed || `Idioma cambiado a ${lang.toUpperCase()}`;
    showToast(msg, lang === "zh" ? "🇨🇳" : lang === "en" ? "🇺🇸" : "🇪🇸");
  };

  const handleDataChange = (updatedFields: Partial<PresentationData>) => {
    setMultiData((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        ...updatedFields,
      },
    }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      setIsEditing(false);
      showToast(t.toast_edit_inactive, "🔒");
    } else {
      setIsEditing(true);
      showToast(t.toast_edit_active, "🔓");
    }
  };

  const handleSave = () => {
    try {
      localStorage.setItem("motor_energy_multi_presentation_v2", JSON.stringify(multiData));
      showToast(t.toast_saved, "💾");
    } catch (err: any) {
      showToast(`Error: ${err.message}`, "❌");
    }
  };

  const handleExport = () => {
    try {
      const htmlContent = generateExportHTML(data, language);
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `motor_energy_presentacion_${language}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast(t.toast_export_success, "📥");
    } catch (error: any) {
      showToast(`${t.toast_export_error} ${error.message}`, "❌");
    }
  };

  const handlePrint = () => {
    setIsPrintPreviewOpen(true);
    showToast(t.toast_print_preview, "🖨️");
  };

  const tabs = [
    { name: t.tab_inicio, icon: Building2 },
    { name: t.tab_tecnica, icon: Cpu },
    { name: t.tab_financiera, icon: BarChart3 },
    { name: t.tab_legal, icon: Scale },
    { name: t.tab_galeria, icon: Image },
    { name: t.tab_cierre, icon: CheckSquare },
  ];

  return (
    <div className={`flex flex-col min-h-screen font-sans selection:bg-secondary/30 transition-colors duration-500 relative overflow-x-hidden ${isDarkMode ? "dark bg-[#030712] text-slate-100" : "bg-slate-50 text-dark"}`}>
      {/* Ambient background decoration for premium glassmorphism visibility */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 no-print">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#0EA1B3]/10 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-[20%] -right-[5%] w-[50%] h-[50%] rounded-full bg-[#0A2D56]/20 blur-[130px] animate-pulse" style={{ animationDuration: '12s' }}></div>
      </div>

      {/* 1. SINGLE UNIFIED HIGH-END HEADER (Inspired by InfraVia Capital) */}
      <header className="no-print sticky top-0 z-50 bg-white/80 dark:bg-[#030712]/80 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center bg-[#0EA1B3]/10 dark:bg-[#0EA1B3]/20 rounded-lg p-1.5 border border-[#0EA1B3]/20">
                <svg className="w-full h-full text-[#0EA1B3]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                  <line x1="9" y1="11" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="15" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 9L10 13H14L12 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-sm sm:text-base tracking-[0.2em] text-slate-900 dark:text-white leading-none">
                  MOTOR <span className="font-light text-[#0EA1B3]">ENERGY</span>
                </span>
                <span className="text-[8px] tracking-[0.25em] text-gray-400 dark:text-gray-500 font-mono font-bold uppercase mt-1">
                  {t.portal}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menu (Middle) */}
            <div className="hidden lg:flex items-center gap-6 h-full">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.name}
                    onClick={() => {
                      setActiveTab(idx);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`h-full px-1 text-[11px] font-heading font-bold tracking-[0.2em] uppercase border-b-2 flex items-center gap-2 transition-all cursor-pointer focus:outline-none ${
                      isActive
                        ? "border-[#0EA1B3] text-[#0EA1B3]"
                        : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Control Actions (Right) */}
            <div className="flex items-center gap-1.5">
              
              {/* Language Selector Dropdown */}
              <div className="relative mr-1">
                <select
                  value={language}
                  onChange={(e) => handleLanguageChange(e.target.value as "es" | "en" | "zh")}
                  className="h-8 pl-2 pr-7 text-[10px] tracking-wider font-bold uppercase border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#030712] text-slate-600 dark:text-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#0EA1B3] cursor-pointer appearance-none"
                >
                  <option value="es">🇪🇸 ES</option>
                  <option value="en">🇺🇸 EN</option>
                  <option value="zh">🇨🇳 ZH</option>
                </select>
                <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Dark Mode Icon Button */}
              <button
                onClick={toggleDarkMode}
                className="w-8 h-8 rounded-md flex items-center justify-center transition-all cursor-pointer border border-slate-200/60 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300"
                title={isDarkMode ? "Modo Claro" : "Modo Oscuro"}
              >
                {isDarkMode ? <Sun size={14} className="text-yellow-400" /> : <Moon size={14} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Row (Horizontal Scroll) */}
        <div className="lg:hidden border-t border-slate-200/40 dark:border-white/5 bg-slate-50/50 dark:bg-black/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex overflow-x-auto no-scrollbar scroll-smooth gap-1 py-1">
              {tabs.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={tab.name}
                    onClick={() => {
                      setActiveTab(idx);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`py-2 px-3 text-[10px] font-heading font-bold tracking-wider uppercase whitespace-nowrap transition-all focus:outline-none flex items-center gap-1.5 cursor-pointer rounded-md ${
                      isActive
                        ? "bg-[#0EA1B3]/10 text-[#0EA1B3] font-bold"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-white/5"
                    }`}
                  >
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {/* We render ALL components, but display them according to print or screen activeTab status.
              To support BOTH smooth tab transitions in screen mode AND continuous multi-page rendering 
              when printing, we encapsulate each screen in a print-aware container block. */}
          <div className="space-y-12">
            {/* Tab 0 - Inicio */}
            <div className={`page-tab ${activeTab === 0 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="inicio"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Inicio data={data} onChange={handleDataChange} isEditing={isEditing} language={language} />
              </motion.div>
            </div>

            {/* Tab 1 - Técnica */}
            <div className={`page-tab ${activeTab === 1 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="tecnica"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Tecnica data={data} onChange={handleDataChange} isEditing={isEditing} language={language} />
              </motion.div>
            </div>

            {/* Tab 2 - Financiera */}
            <div className={`page-tab ${activeTab === 2 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="financiera"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Financiera data={data} onChange={handleDataChange} isEditing={isEditing} isDarkMode={isDarkMode} language={language} />
              </motion.div>
            </div>

            {/* Tab 3 - Legal */}
            <div className={`page-tab ${activeTab === 3 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="legal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Legal data={data} onChange={handleDataChange} isEditing={isEditing} language={language} />
              </motion.div>
            </div>

            {/* Tab 4 - Galería */}
            <div className={`page-tab ${activeTab === 4 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="galeria"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Galeria data={data} onChange={handleDataChange} isEditing={isEditing} language={language} />
              </motion.div>
            </div>

            {/* Tab 5 - Cierre */}
            <div className={`page-tab ${activeTab === 5 ? "active" : "hidden sm:hidden print:block"}`}>
              <motion.div
                key="cierre"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Contacto data={data} onChange={handleDataChange} isEditing={isEditing} language={language} />
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </main>

      {/* PRINT PREVIEW MODAL */}
      <PrintPreviewModal
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        data={data}
        language={language}
      />

      {/* TOAST NOTIFICATIONS */}
      <div
        className={`no-print fixed bottom-6 right-6 bg-primary text-white border border-secondary/30 px-5 py-4 rounded-lg shadow-2xl flex items-center gap-3 transition-all duration-300 transform z-50 ${
          toast.show ? "translate-x-0 opacity-100" : "translate-x-[400px] opacity-0"
        }`}
      >
        <span className="text-lg">{toast.icon}</span>
        <span className="text-xs font-semibold">{toast.message}</span>
      </div>
    </div>
  );
}
