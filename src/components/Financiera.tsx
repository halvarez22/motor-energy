import React, { useState } from "react";
import { motion } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";

interface FinancieraProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  isDarkMode?: boolean;
  language?: "es" | "en" | "zh";
}

export const Financiera: React.FC<FinancieraProps> = ({
  data,
  onChange,
  isEditing,
  isDarkMode,
  language = "es",
}) => {
  const [selectedScenarioMetric, setSelectedScenarioMetric] = useState<
    "TIR" | "VAN" | "Payback"
  >("TIR");

  const t = uiTranslations[language] || uiTranslations.es;

  const handleRowChange = (id: string, field: "concept" | "value", value: string) => {
    const updatedRows = data.financeRows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value };
      }
      return row;
    });
    onChange({ financeRows: updatedRows });
  };

  const handleStructureChange = (id: string, field: "concept" | "percentage" | "amount", value: string) => {
    const updatedStructure = data.financingStructure.map((st) => {
      if (st.id === id) {
        return { ...st, [field]: value };
      }
      return st;
    });
    onChange({ financingStructure: updatedStructure });
  };

  const handleScenarioChange = (id: string, field: "name" | "tir" | "van" | "payback", value: string) => {
    const updatedScenarios = data.scenarios.map((sc) => {
      if (sc.id === id) {
        return { ...sc, [field]: value };
      }
      return sc;
    });
    onChange({ scenarios: updatedScenarios });
  };

  // Helper to extract clean numerical values from strings for calculations & charts
  const getFinanceValue = (keywords: string[], defaultValue: number) => {
    const row = data.financeRows.find((r) =>
      keywords.some(kw => r.concept.toLowerCase().includes(kw.toLowerCase()))
    );
    if (!row) return defaultValue;
    const clean = row.value.replace(/[^0-9.-]/g, "");
    const num = parseFloat(clean);
    if (isNaN(num)) return defaultValue;
    if (num > 100000) return num;
    if (num < 1000) return num * 1000000;
    return num;
  };

  const capex = getFinanceValue(["inversión", "investment", "投资", "capex"], 45000000);
  const opex = getFinanceValue(["opex", "operación", "operation", "运营", "opex"], 850000);
  const ingresos = getFinanceValue(["ingreso", "revenue", "income", "收入", "ingresos"], 6200000);

  // Localized Series Labels
  const netFlowLabel = language === "zh" ? "年度净现金流" : language === "en" ? "Annual Net Flow" : "Flujo Neto Anual";
  const cumulativeFlowLabel = language === "zh" ? "累计现金流" : language === "en" ? "Cumulative Cash Flow" : "Flujo Acumulado";

  // Generate 15-year cash flow projection data dynamically
  const projectionData = Array.from({ length: 16 }, (_, year) => {
    const netFlow = year === 0 ? -capex : ingresos - opex;
    let cumulative = -capex;
    if (year > 0) {
      cumulative = -capex + year * (ingresos - opex);
    }
    const yearName = language === "zh" ? `第 ${year} 年` : language === "en" ? `Year ${year}` : `Año ${year}`;
    return {
      yearName,
      [netFlowLabel]: Math.round((netFlow / 1000000) * 100) / 100, // In Millions USD
      [cumulativeFlowLabel]: Math.round((cumulative / 1000000) * 100) / 100, // In Millions USD
    };
  });

  // Extract clean scenarios data
  const cleanNumber = (val: string) => {
    const clean = val.replace(/[^0-9.-]/g, "");
    const num = parseFloat(clean);
    return isNaN(num) ? 0 : num;
  };

  const scenarioChartData = data.scenarios.map((sc) => {
    let shortName = "Base";
    if (sc.name.toLowerCase().includes("pesimista") || sc.name.toLowerCase().includes("pessimistic") || sc.name.includes("悲观")) {
      shortName = language === "zh" ? "悲观" : language === "en" ? "Pessimistic" : "Pesimista";
    } else if (sc.name.toLowerCase().includes("optimista") || sc.name.toLowerCase().includes("optimistic") || sc.name.includes("乐观")) {
      shortName = language === "zh" ? "乐观" : language === "en" ? "Optimistic" : "Optimista";
    } else {
      shortName = language === "zh" ? "基准" : language === "en" ? "Base" : "Base";
    }

    return {
      name: shortName,
      fullName: sc.name,
      TIR: cleanNumber(sc.tir),
      VAN: cleanNumber(sc.van) > 100000 ? cleanNumber(sc.van) / 1000000 : cleanNumber(sc.van), // in Millions
      Payback: cleanNumber(sc.payback),
    };
  });

  // Detect dark mode context
  const isDark =
    isDarkMode ??
    (typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  // Beautiful corporate styled tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/90 dark:bg-slate-950/95 backdrop-blur-md border border-slate-700/60 p-3 rounded-lg shadow-xl text-xs font-mono text-white">
          <p className="font-bold mb-1 text-slate-300 font-sans text-[11px]">{label}</p>
          {payload.map((entry: any, i: number) => (
            <p key={i} style={{ color: entry.color }} className="flex justify-between gap-4 py-0.5">
              <span className="opacity-80">{entry.name}:</span>
              <span className="font-bold">
                {entry.name.includes("TIR")
                  ? `${entry.value.toFixed(2)}%`
                  : entry.name.toLowerCase().includes("payback") || entry.name.toLowerCase().includes("recuperación") || entry.name.includes("回收")
                  ? `${entry.value.toFixed(1)} ${language === "zh" ? "年" : language === "en" ? "years" : "años"}`
                  : `$${entry.value.toFixed(2)}M USD`}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="section-financiera">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {t.fin_title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{t.fin_subtitle}</p>
      </div>

      {/* Table & Structure Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Table of indicators */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col justify-between p-6 space-y-4"
        >
          <div>
            <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2 mb-4">
              <span>📊</span> {t.kpi_indicators}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary text-white font-heading text-xs uppercase tracking-wider">
                    <th className="p-3 rounded-l">{t.project_concept}</th>
                    <th className="p-3">{t.category}</th>
                    <th className="p-3 text-right rounded-r">{t.estimated_value}</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {data.financeRows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-gray-100 dark:border-white/5 hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors odd:bg-gray-bg/10"
                    >
                      <td className="p-3 font-semibold text-primary dark:text-white">
                        <Editable
                          value={row.concept}
                          onChange={(val) => handleRowChange(row.id, "concept", val)}
                          isEditing={isEditing}
                        />
                      </td>
                      <td className="p-3 text-xs text-gray-400 font-mono">
                        {row.category}
                      </td>
                      <td className="p-3 text-right font-bold text-secondary font-heading">
                        <Editable
                          value={row.value}
                          onChange={(val) => handleRowChange(row.id, "value", val)}
                          isEditing={isEditing}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Capital structuring */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2 mb-4">
              <span>🏦</span> {t.financing_title}
            </h3>
            
            <div className="space-y-4">
              {data.financingStructure.map((st) => (
                <div key={st.id} className="bg-gray-bg/30 dark:bg-slate-800/35 p-4 rounded border-l-4 border-primary">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-xs font-bold text-primary dark:text-slate-300 uppercase">
                      <Editable
                        value={st.concept}
                        onChange={(val) => handleStructureChange(st.id, "concept", val)}
                        isEditing={isEditing}
                      />
                    </span>
                    <span className="text-sm font-extrabold text-secondary font-heading">
                      <Editable
                        value={st.percentage}
                        onChange={(val) => handleStructureChange(st.id, "percentage", val)}
                        isEditing={isEditing}
                      />
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-dark/70 dark:text-slate-300 font-mono">
                    <Editable
                      value={st.amount}
                      onChange={(val) => handleStructureChange(st.id, "amount", val)}
                      isEditing={isEditing}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/5 bg-secondary/5 p-4 rounded-lg">
            <span className="text-xs font-bold text-primary dark:text-[#0EA1B3] uppercase block mb-1">{t.struct_note_title}</span>
            <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-relaxed">{t.struct_note_desc}</p>
          </div>
        </motion.div>
      </div>

      {/* Visual Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="visual-financial-analytics">
        {/* Chart 1: Proyecciones y Payback */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-3 mb-4 flex items-center gap-2">
              <span>📅</span> {t.cash_flow_projection}
            </h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
              {t.cash_flow_desc}
            </p>
            <div className="h-[250px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0EA1B3" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0EA1B3" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis
                    dataKey="yearName"
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(val) => `$${val}M`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={0}
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    label={{
                      value: t.breakeven,
                      fill: "#ef4444",
                      position: "top",
                      fontSize: 10,
                      fontWeight: "bold"
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey={cumulativeFlowLabel}
                    stroke="#0EA1B3"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorCumulative)"
                    name={cumulativeFlowLabel}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-[11px] text-gray-500 dark:text-slate-400">
            <span>{t.initial_capex} {data.financeRows.find(r => r.concept.toLowerCase().includes("capex") || r.concept.toLowerCase().includes("inversión"))?.value || "$45M USD"}</span>
            <span className="font-mono text-emerald-500 font-bold">{t.roi_projected}</span>
          </div>
        </motion.div>

        {/* Chart 2: Escenarios */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 dark:border-white/5 pb-3 mb-4">
              <h3 className="font-heading text-md font-bold text-primary dark:text-white flex items-center gap-2">
                <span>🔄</span> {t.scenario_comparison}
              </h3>
              
              {/* Metric Selector Buttons */}
              <div className="flex gap-1 bg-gray-100 dark:bg-slate-800 p-1 rounded-lg">
                {(["TIR", "VAN", "Payback"] as const).map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedScenarioMetric(metric)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                      selectedScenarioMetric === metric
                        ? "bg-[#0EA1B3] text-white shadow-sm font-bold"
                        : "text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white"
                    }`}
                  >
                    {metric === "TIR" ? "TIR (%)" : metric === "VAN" ? `${language === "zh" ? "净现值" : "VAN"} (M USD)` : "Payback"}
                  </button>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-4">
              {t.scenario_desc}
            </p>

            <div className="h-[250px] w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioChartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} />
                  <XAxis
                    dataKey="name"
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={isDark ? "#94a3b8" : "#64748b"}
                    fontSize={11}
                    tickLine={false}
                    domain={selectedScenarioMetric === "Payback" ? [0, 12] : ["auto", "auto"]}
                    tickFormatter={(val) => 
                      selectedScenarioMetric === "TIR"
                        ? `${val}%`
                        : selectedScenarioMetric === "VAN"
                        ? `$${val}M`
                        : `${val}a`
                    }
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }} />
                  <Bar
                    dataKey={selectedScenarioMetric}
                    name={
                      selectedScenarioMetric === "TIR"
                        ? (language === "zh" ? "内部收益率 (IRR)" : language === "en" ? "Internal Rate of Return (IRR)" : "Tasa Interna de Retorno (TIR)")
                        : selectedScenarioMetric === "VAN"
                        ? (language === "zh" ? "净现值 (NPV)" : language === "en" ? "Net Present Value (NPV)" : "Valor Actual Neto (VAN)")
                        : (language === "zh" ? "投资回收期 (Payback)" : language === "en" ? "Payback Period" : "Período de Recuperación (Payback)")
                    }
                    radius={[4, 4, 0, 0]}
                  >
                    {scenarioChartData.map((entry, index) => {
                      let color = "#10b981";
                      const isPes = entry.name === "Pesimista" || entry.name === "Pessimistic" || entry.name === "悲观";
                      const isOpt = entry.name === "Optimista" || entry.name === "Optimistic" || entry.name === "乐观";
                      const isBase = entry.name === "Base" || entry.name === "基准";
                      if (isPes) color = "#f43f5e";
                      else if (isOpt) color = "#0EA1B3";
                      else if (isBase) color = "#3b82f6";
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center text-[11px] text-gray-500 dark:text-slate-400">
            <span>{t.calc_methodology}</span>
            <span className="font-bold text-[#0EA1B3] uppercase">Motor Energy S.A.</span>
          </div>
        </motion.div>
      </div>

      {/* Sensitivity analysis scenarios */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
      >
        <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
          <span>📈</span> {t.sensitivity_matrix}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.scenarios.map((sc, idx) => (
            <div
              key={sc.id}
              className={`border border-gray-200 dark:border-white/10 p-4 rounded-lg bg-gray-bg/10 dark:bg-slate-800/10 ${
                idx === 1 ? "ring-2 ring-secondary/50 bg-secondary/5 dark:bg-secondary/5" : ""
              }`}
            >
              <div className="text-xs font-bold text-primary dark:text-white uppercase font-heading border-b border-gray-200 dark:border-white/10 pb-2 mb-3">
                <Editable
                  value={sc.name}
                  onChange={(val) => handleScenarioChange(sc.id, "name", val)}
                  isEditing={isEditing}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs items-center">
                  <span className="text-gray-400">{t.est_irr}</span>
                  <strong className="font-heading text-secondary dark:text-[#0EA1B3]">
                    <Editable
                      value={sc.tir}
                      onChange={(val) => handleScenarioChange(sc.id, "tir", val)}
                      isEditing={isEditing}
                    />
                  </strong>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-gray-400">{t.npv_8}</span>
                  <strong className="font-heading text-primary dark:text-white">
                    <Editable
                      value={sc.van}
                      onChange={(val) => handleScenarioChange(sc.id, "van", val)}
                      isEditing={isEditing}
                    />
                  </strong>
                </div>
                <div className="flex justify-between text-xs items-center">
                  <span className="text-gray-400">{t.payback_lbl}</span>
                  <strong className="font-heading text-dark dark:text-slate-300">
                    <Editable
                      value={sc.payback}
                      onChange={(val) => handleScenarioChange(sc.id, "payback", val)}
                      isEditing={isEditing}
                    />
                  </strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
