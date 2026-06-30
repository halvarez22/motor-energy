import React from "react";
import { motion } from "motion/react";
import { PresentationData, LegalItem } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";

interface LegalProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

export const Legal: React.FC<LegalProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const t = uiTranslations[language] || uiTranslations.es;

  const handleLegalItemChange = (id: string, field: "name" | "description" | "status", value: any) => {
    const updatedItems = data.legalItems.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    onChange({ legalItems: updatedItems });
  };

  const handleContractChange = (id: string, field: "type" | "description", value: string) => {
    const updatedContracts = data.contracts.map((c) => {
      if (c.id === id) {
        return { ...c, [field]: value };
      }
      return c;
    });
    onChange({ contracts: updatedContracts });
  };

  const handleRiskChange = (id: string, field: "title" | "type" | "risk" | "mitigation", value: string) => {
    const updatedRisks = data.risks.map((r) => {
      if (r.id === id) {
        return { ...r, [field]: value };
      }
      return r;
    });
    onChange({ risks: updatedRisks });
  };

  const getStatusBadge = (status: LegalItem["status"]) => {
    switch (status) {
      case "ok":
        return {
          bg: "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-300 dark:border-green-800/40",
          text: `✅ ${t.status_ok || "OK"}`,
        };
      case "progress":
        return {
          bg: "bg-teal-100 text-teal-800 border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800/40",
          text: `🔄 ${t.status_progress || "EN PROGRESO"}`,
        };
      case "pending":
      default:
        return {
          bg: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800/40",
          text: `⏳ ${t.status_pending || "PENDIENTE"}`,
        };
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="section-legal">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {t.legal_title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{t.legal_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Permits checklist */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
        >
          <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2 mb-4">
            <span>📋</span> {t.permits_status}
          </h3>
          
          <div className="space-y-3" id="permits-list">
            {data.legalItems.map((item) => {
              const badge = getStatusBadge(item.status);
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-bg/20 dark:bg-slate-800/20 rounded border-l-4 border-secondary gap-3"
                >
                  <div className="space-y-1 flex-grow pr-4">
                    <h4 className="text-sm font-bold text-primary dark:text-white font-heading">
                      <Editable
                        value={item.name}
                        onChange={(val) => handleLegalItemChange(item.id, "name", val)}
                        isEditing={isEditing}
                      />
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                      <Editable
                        value={item.description}
                        onChange={(val) => handleLegalItemChange(item.id, "description", val)}
                        isEditing={isEditing}
                        multiline
                      />
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 shrink-0">
                    {isEditing && (
                      <select
                        value={item.status}
                        onChange={(e) => handleLegalItemChange(item.id, "status", e.target.value)}
                        className="border border-gray-200 dark:border-white/10 rounded text-xs p-1.5 bg-white dark:bg-slate-900 cursor-pointer text-dark dark:text-white"
                      >
                        <option value="ok">✅ {t.status_ok || "OK"}</option>
                        <option value="progress">🔄 {t.status_progress || "En Progreso"}</option>
                        <option value="pending">⏳ {t.status_pending || "Pendiente"}</option>
                      </select>
                    )}
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold rounded border ${badge.bg} inline-block whitespace-nowrap`}
                    >
                      {badge.text}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Contract List */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2 mb-4">
              <span>📝</span> {t.contractual_structure}
            </h3>
            
            <div className="space-y-4">
              {data.contracts.map((cnt) => (
                <div key={cnt.id} className="p-3 rounded border border-gray-200 dark:border-white/10 bg-gray-bg/10 dark:bg-slate-800/10">
                  <h4 className="text-xs font-bold text-primary dark:text-[#0EA1B3] font-heading uppercase mb-1">
                    <Editable
                      value={cnt.type}
                      onChange={(val) => handleContractChange(cnt.id, "type", val)}
                      isEditing={isEditing}
                    />
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                    <Editable
                      value={cnt.description}
                      onChange={(val) => handleContractChange(cnt.id, "description", val)}
                      isEditing={isEditing}
                      multiline
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Risks Mitigation Matrix */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
      >
        <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
          <span>🛡️</span> {t.risks_mitigation}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.risks.map((risk) => (
            <div
              key={risk.id}
              className="border border-gray-100 dark:border-white/10 p-4 rounded bg-gray-bg/10 dark:bg-slate-800/10 flex flex-col justify-between space-y-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-sm font-bold text-primary dark:text-white font-heading">
                    <Editable
                      value={risk.title}
                      onChange={(val) => handleRiskChange(risk.id, "title", val)}
                      isEditing={isEditing}
                    />
                  </h4>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-100 dark:bg-red-950/20 dark:text-red-300 dark:border-red-900 rounded">
                    <Editable
                      value={risk.type}
                      onChange={(val) => handleRiskChange(risk.id, "type", val)}
                      isEditing={isEditing}
                    />
                  </span>
                </div>
                <div className="text-xs text-dark/95 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded border border-gray-200/50 dark:border-white/5">
                  <Editable
                    value={risk.risk}
                    onChange={(val) => handleRiskChange(risk.id, "risk", val)}
                    isEditing={isEditing}
                    multiline
                  />
                </div>
              </div>
              <div className="bg-secondary/5 p-3 rounded border-l-2 border-secondary">
                <span className="text-[10px] font-bold text-primary dark:text-[#0EA1B3] uppercase block mb-1">
                  {t.mitigation_strategy}
                </span>
                <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                  <Editable
                    value={risk.mitigation}
                    onChange={(val) => handleRiskChange(risk.id, "mitigation", val)}
                    isEditing={isEditing}
                    multiline
                  />
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
