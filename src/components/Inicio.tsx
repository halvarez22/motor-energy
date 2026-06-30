import React from "react";
import { motion } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";

interface InicioProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

export const Inicio: React.FC<InicioProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const t = uiTranslations[language] || uiTranslations.es;

  const handleKPIChange = (id: string, field: "title" | "value" | "description", value: string) => {
    const updatedKPIs = data.kpis.map((kpi) => {
      if (kpi.id === id) {
        return { ...kpi, [field]: value };
      }
      return kpi;
    });
    onChange({ kpis: updatedKPIs });
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="section-inicio">
      {/* Executive Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-[#0d3a6e] text-white p-6 sm:p-10 shadow-md border border-primary/20"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0EA1B3_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 max-w-4xl space-y-3">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/30 rounded-full">
            {t.exec_presentation}
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            <Editable
              value={data.title}
              onChange={(val) => onChange({ title: val })}
              isEditing={isEditing}
              multiline
            />
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-medium">
            <Editable
              value={data.subtitle}
              onChange={(val) => onChange({ subtitle: val })}
              isEditing={isEditing}
            />
          </p>
          <div className="flex items-center gap-2 text-xs text-secondary font-mono pt-2">
            <span>📅 {t.presentation_date}</span>
            <span className="text-white font-semibold">
              <Editable
                value={data.date}
                onChange={(val) => onChange({ date: val })}
                isEditing={isEditing}
              />
            </span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {data.kpis.map((kpi, idx) => (
          <motion.div
            key={kpi.id}
            variants={itemVariants}
            className="bg-white dark:bg-slate-900 p-5 rounded-lg border-l-4 border-secondary shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            id={`kpi-card-${kpi.id}`}
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl" role="img" aria-label="kpi icon">
                  {kpi.icon}
                </span>
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                  {t.kpi || "KPI"} 0{idx + 1}
                </span>
              </div>
              <h3 className="text-xs font-bold text-primary dark:text-[#0EA1B3] tracking-wider uppercase font-heading mb-1">
                <Editable
                  value={kpi.title}
                  onChange={(val) => handleKPIChange(kpi.id, "title", val)}
                  isEditing={isEditing}
                />
              </h3>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight mb-2">
                <Editable
                  value={kpi.value}
                  onChange={(val) => handleKPIChange(kpi.id, "value", val)}
                  isEditing={isEditing}
                />
              </div>
            </div>
            <p className="text-xs text-dark/80 dark:text-slate-300 leading-relaxed mt-2 border-t border-gray-50 dark:border-white/5 pt-2">
              <Editable
                value={kpi.description}
                onChange={(val) => handleKPIChange(kpi.id, "description", val)}
                isEditing={isEditing}
                multiline
              />
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary Box and Highlight Box */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Executive summary block */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
        >
          <h2 className="font-heading text-lg font-bold text-primary dark:text-white border-b-2 border-secondary pb-2 flex items-center gap-2">
            <span>📋</span> {t.exec_summary}
          </h2>
          <div className="text-sm text-dark/95 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            <Editable
              value={data.executiveSummary}
              onChange={(val) => onChange({ executiveSummary: val })}
              isEditing={isEditing}
              multiline
            />
          </div>
        </motion.div>

        {/* Highlight Objective Box */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-gradient-to-br from-[#0EA1B3]/10 to-[#0A2D56]/5 p-6 rounded-lg border border-secondary/20 flex flex-col justify-between space-y-4 shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-primary dark:text-[#0EA1B3] font-bold font-heading text-sm">
              <span>🎯</span>
              <span>{t.main_objective}</span>
            </div>
            <div className="text-sm text-primary dark:text-white font-medium leading-relaxed">
              <Editable
                value={data.highlightObjective}
                onChange={(val) => onChange({ highlightObjective: val })}
                isEditing={isEditing}
                multiline
              />
            </div>
          </div>
          <div className="bg-primary text-white text-center p-3 rounded-md font-heading text-xs font-bold tracking-wider uppercase shadow-sm">
            {t.board_directors}
          </div>
        </motion.div>
      </div>

      {/* Bento Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left: Video Player Card (Col-span 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-white/5 pb-3">
            <h3 className="font-heading text-base font-bold text-primary dark:text-white flex items-center gap-2">
              <span>📹</span> {t.solar_visualizer}
            </h3>
            <span className="text-[10px] bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded font-mono font-bold uppercase tracking-widest">
              {t.hd_loop}
            </span>
          </div>

          <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-inner border border-gray-100/50 group">
            <video
              key={data.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
              src={data.videoUrl || "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-sunny-day-41619-large.mp4"}
            />
            {/* Elegant overlay watermark */}
            <div className="absolute top-3 left-3 bg-primary/80 backdrop-blur-md text-[9px] text-white px-2.5 py-1 rounded-md font-mono tracking-wider font-bold shadow pointer-events-none uppercase">
              {t.field_projection} • {data.videoPreset || "solar"}
            </div>
          </div>
        </div>

        {/* Right: Media Spec / Settings and Presets Card (Col-span 1) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary dark:text-white font-bold font-heading text-sm border-b border-gray-100 dark:border-white/5 pb-3">
              <span>🎛️</span>
              <span>{t.media_controls}</span>
            </div>
            
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              {t.media_desc}
            </p>

            {/* Presets List */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-gray-400 font-mono tracking-wider uppercase block">{t.available_shots}</span>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({
                    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-sunny-day-41619-large.mp4",
                    videoPreset: "solar"
                  })}
                  className={`px-3 py-2 text-xs font-semibold rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                    data.videoPreset === "solar"
                      ? "bg-secondary/15 text-primary border-secondary/50 font-bold"
                      : "bg-slate-50 dark:bg-black/20 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>☀️</span>
                    <span>{t.active_pv_park}</span>
                  </div>
                  <span className="text-[9px] font-mono opacity-65">1080p</span>
                </button>

                <button
                  type="button"
                  onClick={() => onChange({
                    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-industrial-wind-turbines-at-sunset-41617-large.mp4",
                    videoPreset: "wind"
                  })}
                  className={`px-3 py-2 text-xs font-semibold rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                    data.videoPreset === "wind"
                      ? "bg-secondary/15 text-primary border-secondary/50 font-bold"
                      : "bg-slate-50 dark:bg-black/20 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>💨</span>
                    <span>{t.wind_turbines}</span>
                  </div>
                  <span className="text-[9px] font-mono opacity-65">HD Loop</span>
                </button>

                <button
                  type="button"
                  onClick={() => onChange({
                    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-in-a-field-32694-large.mp4",
                    videoPreset: "bess"
                  })}
                  className={`px-3 py-2 text-xs font-semibold rounded-md border text-left flex items-center justify-between transition-all cursor-pointer ${
                    data.videoPreset === "bess"
                      ? "bg-secondary/15 text-primary border-secondary/50 font-bold"
                      : "bg-slate-50 dark:bg-black/20 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-white/5 hover:bg-gray-100 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span>🔋</span>
                    <span>{t.solar_plant_aerial}</span>
                  </div>
                  <span className="text-[9px] font-mono opacity-65">Aéreo</span>
                </button>
              </div>
            </div>

            {/* Custom URL Input in Edit Mode */}
            {isEditing && (
              <div className="space-y-1.5 pt-2 border-t border-gray-100/60 dark:border-white/5">
                <label className="text-[10px] font-bold text-secondary font-mono tracking-wider uppercase block">{t.custom_video_url}</label>
                <input
                  type="text"
                  value={data.videoUrl || ""}
                  onChange={(e) => onChange({ videoUrl: e.target.value, videoPreset: "personalizado" })}
                  placeholder={t.enter_mp4_url}
                  className="w-full text-xs px-3 py-2 border border-gray-200 dark:border-white/10 rounded-md bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-secondary focus:border-secondary transition-all text-dark dark:text-white"
                />
              </div>
            )}
          </div>

          <div className="text-[10px] text-gray-400 dark:text-gray-500 italic text-center font-medium">
            {t.integrated_visualizer}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
