import React from "react";
import { motion } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";

interface TecnicaProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

export const Tecnica: React.FC<TecnicaProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const t = uiTranslations[language] || uiTranslations.es;

  const handleLocationChange = (idx: number, value: string) => {
    const updatedLocation = [...data.locationDetails];
    updatedLocation[idx] = value;
    onChange({ locationDetails: updatedLocation });
  };

  const handleTechChange = (id: string, field: "title" | "value" | "description", value: string) => {
    const updatedTechnologies = data.technologies.map((tech) => {
      if (tech.id === id) {
        return { ...tech, [field]: value };
      }
      return tech;
    });
    onChange({ technologies: updatedTechnologies });
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="section-tecnica">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {t.tech_title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{t.tech_subtitle}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Ubicación y Terreno */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
        >
          <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
            <span>📍</span> {t.location_characteristics}
          </h3>
          <ul className="space-y-3" id="location-list">
            {data.locationDetails.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 bg-slate-50/95 dark:bg-slate-800/40 p-3.5 rounded-lg border border-slate-200/60 dark:border-white/5 border-l-4 border-l-secondary shadow-xs hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
              >
                <span className="text-secondary font-bold text-sm mt-0.5">
                  0{idx + 1}
                </span>
                <span className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed flex-grow font-medium">
                  <Editable
                    value={detail}
                    onChange={(val) => handleLocationChange(idx, val)}
                    isEditing={isEditing}
                    className="text-slate-800 dark:text-slate-200 font-medium"
                    multiline
                  />
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Tecnología y Equipamiento */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 space-y-4"
        >
          <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2 mb-4">
                <span>⚙️</span> {t.equipment_config}
              </h3>
              
              <div className="space-y-4">
                {data.technologies.map((tech) => (
                  <div key={tech.id} className="flex items-center gap-4 p-3 rounded bg-gray-bg/30 dark:bg-slate-800/30">
                    <span className="text-2xl p-2 bg-white dark:bg-slate-800 rounded shadow-sm" role="img" aria-label="tech icon">
                      {tech.icon}
                    </span>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-xs font-bold text-primary dark:text-slate-200 uppercase font-heading">
                          <Editable
                            value={tech.title}
                            onChange={(val) => handleTechChange(tech.id, "title", val)}
                            isEditing={isEditing}
                          />
                        </span>
                        <span className="text-sm font-extrabold text-secondary font-heading">
                          <Editable
                            value={tech.value}
                            onChange={(val) => handleTechChange(tech.id, "value", val)}
                            isEditing={isEditing}
                          />
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-slate-400 leading-normal">
                        <Editable
                          value={tech.description}
                          onChange={(val) => handleTechChange(tech.id, "description", val)}
                          isEditing={isEditing}
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interconexión y Evacuación */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
      >
        <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
          <span>⚡</span> {t.grid_interconnection}
        </h3>
        <div className="text-sm text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium bg-slate-50/95 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/60 dark:border-white/5">
          <Editable
            value={data.interconnectionDetails}
            onChange={(val) => onChange({ interconnectionDetails: val })}
            isEditing={isEditing}
            className="text-slate-800 dark:text-slate-300 font-medium"
            multiline
          />
        </div>
      </motion.div>
    </div>
  );
};
