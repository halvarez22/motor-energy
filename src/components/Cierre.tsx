import React from "react";
import { motion } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";

interface CierreProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

export const Cierre: React.FC<CierreProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const t = uiTranslations[language] || uiTranslations.es;

  const handleValueChange = (id: string, field: "title" | "description", value: string) => {
    const updatedValues = data.values.map((v) => {
      if (v.id === id) {
        return { ...v, [field]: value };
      }
      return v;
    });
    onChange({ values: updatedValues });
  };

  const handleTimelineChange = (id: string, field: "period" | "title" | "description", value: string) => {
    const updatedTimeline = data.timeline.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ timeline: updatedTimeline });
  };

  const handleContactChange = (field: keyof typeof data.contact, value: string) => {
    onChange({ contact: { ...data.contact, [field]: value } });
  };

  const phoneLabel = language === "zh" ? "电话" : language === "en" ? "Phone" : "Teléfono";
  const webLabel = language === "zh" ? "网站" : language === "en" ? "Website" : "Sitio Web";

  return (
    <div className="space-y-6 sm:space-y-8" id="section-cierre">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {t.conclusion_title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{t.conclusion_subtitle}</p>
      </div>

      {/* Strategic Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.values.map((v) => (
          <div
            key={v.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-3 hover:-translate-y-1 transition-transform"
          >
            <span className="text-3xl block" role="img" aria-label="value icon">
              {v.icon}
            </span>
            <h3 className="font-heading text-sm font-bold text-primary dark:text-white uppercase">
              <Editable
                value={v.title}
                onChange={(val) => handleValueChange(v.id, "title", val)}
                isEditing={isEditing}
              />
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
              <Editable
                value={v.description}
                onChange={(val) => handleValueChange(v.id, "description", val)}
                isEditing={isEditing}
                multiline
              />
            </p>
          </div>
        ))}
      </div>

      {/* Call To Action (Board Decision Proposal) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-primary to-secondary text-white p-8 sm:p-12 rounded-xl shadow-lg relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 rounded-full">
            {t.formal_petition}
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold tracking-tight">
            {t.petition_board}
          </h2>
          <div className="text-sm sm:text-base text-gray-100 leading-relaxed font-medium">
            <Editable
              value={data.ctaText}
              onChange={(val) => onChange({ ctaText: val })}
              isEditing={isEditing}
              multiline
            />
          </div>
          
          <div className="pt-2">
            <button
              type="button"
              className="no-print bg-white text-primary font-heading font-extrabold text-sm uppercase px-8 py-3.5 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Editable
                value={data.ctaButtonText}
                onChange={(val) => onChange({ ctaButtonText: val })}
                isEditing={isEditing}
              />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Timeline critical path */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-6">
        <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
          <span>📅</span> {t.critical_path_title}
        </h3>
        
        <div className="relative pl-6 border-l-2 border-secondary space-y-6 sm:space-y-8 ml-3">
          {data.timeline.map((item) => (
            <div key={item.id} className="relative">
              {/* Timeline dot marker */}
              <span className="absolute -left-[31px] top-0.5 bg-secondary text-primary font-heading text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow border border-white flex items-center justify-center">
                <Editable
                  value={item.period}
                  onChange={(val) => handleTimelineChange(item.id, "period", val)}
                  isEditing={isEditing}
                />
              </span>
              
              <div className="bg-gray-bg/20 dark:bg-slate-800/20 p-4 rounded border border-gray-100 dark:border-white/5 ml-4 space-y-1">
                <h4 className="text-sm font-bold text-primary dark:text-white font-heading">
                  <Editable
                    value={item.title}
                    onChange={(val) => handleTimelineChange(item.id, "title", val)}
                    isEditing={isEditing}
                  />
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                  <Editable
                    value={item.description}
                    onChange={(val) => handleTimelineChange(item.id, "description", val)}
                    isEditing={isEditing}
                    multiline
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate footer/contact panel */}
      <div className="bg-primary text-white p-6 sm:p-8 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-md">
          <span className="font-heading font-extrabold text-lg tracking-wider text-white">
            MOTOR <span className="text-secondary">ENERGY</span>
          </span>
          <p className="text-xs text-gray-300">
            {t.footer_desc}
          </p>
          <p className="text-[10px] text-gray-400 leading-relaxed">
            <Editable
              value={data.contact.address}
              onChange={(val) => handleContactChange("address", val)}
              isEditing={isEditing}
              multiline
            />
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono w-full md:w-auto">
          <div className="space-y-1">
            <span className="text-secondary block font-bold text-[9px] tracking-wider uppercase">Email</span>
            <span className="text-white">
              <Editable
                value={data.contact.email}
                onChange={(val) => handleContactChange("email", val)}
                isEditing={isEditing}
              />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-secondary block font-bold text-[9px] tracking-wider uppercase">{phoneLabel}</span>
            <span className="text-white">
              <Editable
                value={data.contact.phone}
                onChange={(val) => handleContactChange("phone", val)}
                isEditing={isEditing}
              />
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-secondary block font-bold text-[9px] tracking-wider uppercase">{webLabel}</span>
            <span className="text-white">
              <Editable
                value={data.contact.web}
                onChange={(val) => handleContactChange("web", val)}
                isEditing={isEditing}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
