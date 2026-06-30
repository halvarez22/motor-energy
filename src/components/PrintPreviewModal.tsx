import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Printer,
  X,
  Eye,
  FileText,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from "lucide-react";
import { PresentationData } from "../types";
import { uiTranslations } from "../data";

// Import all tabs
import { Inicio } from "./Inicio";
import { Tecnica } from "./Tecnica";
import { Financiera } from "./Financiera";
import { Legal } from "./Legal";
import { Galeria } from "./Galeria";
import { Cierre } from "./Cierre";

interface PrintPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PresentationData;
  language: "es" | "en" | "zh";
}

export const PrintPreviewModal: React.FC<PrintPreviewModalProps> = ({
  isOpen,
  onClose,
  data,
  language,
}) => {
  const [zoom, setZoom] = useState<"compact" | "standard" | "full">("standard");
  const [forceLight, setForceLight] = useState<boolean>(true);

  if (!isOpen) return null;

  const t = uiTranslations[language] || uiTranslations.es;

  // CSS Variable Overrides to guarantee corporate light theme on preview cards (resembling actual white paper)
  const lightStyleOverride = {
    "--bg-app": "#f8fafc",
    "--bg-nav": "rgba(255, 255, 255, 0.9)",
    "--bg-card": "#ffffff",
    "--bg-inner": "rgba(15, 23, 42, 0.03)",
    "--border-card": "rgba(15, 23, 42, 0.08)",
    "--border-inner": "rgba(15, 23, 42, 0.06)",
    "--shadow-card": "0 10px 30px -5px rgba(10, 45, 86, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)",
    "--text-main": "#333d47",
    "--text-primary-color": "#0A2D56",
    "--text-muted": "#64748b",
    "--border-nav": "rgba(15, 23, 42, 0.08)",
  } as React.CSSProperties;

  const handlePrintAction = () => {
    // Small timeout to allow any layout adjustment, then trigger native print
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const getWidthClass = () => {
    switch (zoom) {
      case "compact":
        return "max-w-2xl"; // 672px
      case "full":
        return "max-w-7xl"; // 1280px
      case "standard":
      default:
        return "max-w-5xl"; // 1024px
    }
  };

  const pages = [
    { name: t.tab_inicio, component: <Inicio data={data} onChange={() => {}} isEditing={false} language={language} /> },
    { name: t.tab_tecnica, component: <Tecnica data={data} onChange={() => {}} isEditing={false} language={language} /> },
    { name: t.tab_financiera, component: <Financiera data={data} onChange={() => {}} isEditing={false} isDarkMode={false} language={language} /> },
    { name: t.tab_legal, component: <Legal data={data} onChange={() => {}} isEditing={false} language={language} /> },
    { name: t.tab_galeria, component: <Galeria data={data} onChange={() => {}} isEditing={false} language={language} /> },
    { name: t.tab_cierre, component: <Cierre data={data} onChange={() => {}} isEditing={false} language={language} /> },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] overflow-y-auto no-print bg-slate-900/90 backdrop-blur-md flex flex-col">
        {/* Sticky Control Bar */}
        <header className="sticky top-0 z-[110] bg-slate-900 border-b border-slate-800 text-white py-4 px-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0EA1B3]/20 border border-[#0EA1B3]/30 flex items-center justify-center text-[#0EA1B3]">
              <Printer size={20} />
            </div>
            <div>
              <h2 className="text-sm font-heading font-black tracking-[0.15em] uppercase text-white flex items-center gap-2">
                {t.print_panel_title}
              </h2>
              <p className="text-[10px] text-slate-400 font-mono tracking-wider">
                {t.print_panel_desc}
              </p>
            </div>
          </div>

          {/* Center: Controls for Preview */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-800/60 p-1.5 rounded-lg border border-slate-700/60">
            {/* Zoom Selector */}
            <div className="flex items-center gap-1 border-r border-slate-700 pr-3">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mr-1.5">{t.print_zoom}</span>
              <button
                onClick={() => setZoom("compact")}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  zoom === "compact" ? "bg-[#0EA1B3] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t.print_zoom_compact}
              </button>
              <button
                onClick={() => setZoom("standard")}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  zoom === "standard" ? "bg-[#0EA1B3] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t.print_zoom_standard}
              </button>
              <button
                onClick={() => setZoom("full")}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                  zoom === "full" ? "bg-[#0EA1B3] text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t.print_zoom_full}
              </button>
            </div>

            {/* Force Light Mode simulation */}
            <button
              onClick={() => setForceLight(!forceLight)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest font-mono rounded flex items-center gap-1.5 transition-all cursor-pointer border ${
                forceLight
                  ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                  : "bg-slate-700/40 border-slate-600 text-slate-400 hover:text-slate-200"
              }`}
              title={t.print_paper_tip}
            >
              <Sparkles size={11} />
              <span>{t.print_simulate_paper} {forceLight ? t.print_active : t.print_inactive}</span>
            </button>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintAction}
              className="px-4 py-2 text-xs font-bold tracking-widest uppercase bg-[#0EA1B3] text-white hover:bg-[#0EA1B3]/90 rounded-md shadow-lg shadow-[#0EA1B3]/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer size={14} />
              <span>{t.print_btn_print}</span>
            </button>

            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-bold tracking-widest uppercase bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white rounded-md border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <X size={14} />
              <span>{t.print_btn_close}</span>
            </button>
          </div>
        </header>

        {/* Modal Info Tip */}
        <div className="bg-[#0A2D56] text-blue-100 py-2.5 px-6 text-center text-[11px] font-medium border-b border-blue-900/40 flex items-center justify-center gap-1.5 shadow-md">
          <span className="text-[#0EA1B3]">💡</span>
          <span>
            <strong>{t.print_rec_title}</strong> {t.print_rec_desc}
          </span>
        </div>

        {/* Preview Scrollable Viewport */}
        <main className="flex-grow p-4 md:p-8 bg-slate-950/40 overflow-y-auto flex flex-col items-center space-y-12">
          {pages.map((page, index) => (
            <div
              key={page.name}
              className={`w-full ${getWidthClass()} transition-all duration-300`}
            >
              {/* Virtual Printed Sheet frame */}
              <div
                className={`relative border bg-white rounded-xl shadow-2xl transition-all duration-500 overflow-hidden ${
                  forceLight ? "text-slate-900" : ""
                }`}
                style={forceLight ? lightStyleOverride : {}}
              >
                {/* Simulated Sheet Header */}
                <div className="px-8 py-3 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0EA1B3]"></span>
                    <span>{t.print_sheet_header}</span>
                  </div>
                  <div className="font-bold">
                    {t.print_page_of
                      .replace("{current}", (index + 1).toString())
                      .replace("{total}", pages.length.toString())
                      .replace("{name}", page.name || "")}
                  </div>
                </div>

                {/* Actual Page Render Component */}
                <div className="p-8 md:p-12 relative min-h-[500px] flex flex-col justify-between">
                  <div>
                    {/* Header banner printed style */}
                    <div className="border-l-4 border-[#0EA1B3] pl-4 mb-8">
                      <span className="text-[10px] font-mono tracking-widest text-[#0EA1B3] uppercase block font-bold">
                        {t.print_section} 0{index + 1}
                      </span>
                      <h2 className="text-xl font-heading font-black text-[#0A2D56] tracking-wider uppercase">
                        {page.name}
                      </h2>
                    </div>

                    {/* Component view */}
                    <div className="text-slate-800 dark:text-slate-100 select-none pointer-events-none">
                      {page.component}
                    </div>
                  </div>
                </div>

                {/* Simulated Sheet Footer */}
                <div className="px-8 py-4 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-400">
                  <div>© {new Date().getFullYear()} Motor Energy S.A. de C.V. — {t.print_confidential}</div>
                  <div className="italic font-bold text-[#0EA1B3]">{t.print_sustainable}</div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>
    </AnimatePresence>
  );
};
