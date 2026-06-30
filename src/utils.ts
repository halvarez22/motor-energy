import { PresentationData } from "./types";

const LOCAL_STORAGE_KEY = "motor_energy_presentation_v1";

export function saveToLocalStorage(data: PresentationData): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to localStorage", error);
  }
}

export function loadFromLocalStorage(): PresentationData | null {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Error loading from localStorage", error);
  }
  return null;
}

export function generateExportHTML(data: PresentationData, lang: "es" | "en" | "zh" = "es"): string {
  // We'll build a self-contained, gorgeous, responsive HTML file that works offline
  // It features Tailwind CSS, Montserrat & Space Grotesk fonts, and a lightweight vanilla JS script 
  // that provides exactly the same tab routing, edit mode toggles, image base64 updates, and print formatting.

  const serializedData = JSON.stringify(data);

  const portalText = lang === "zh" ? "企业门户网站" : lang === "en" ? "Corporate Portal" : "Portal Corporativo";
  const editBtnTextActive = lang === "zh" ? "关闭编辑模式" : lang === "en" ? "Disable Editing" : "Desactivar Edición";
  const editBtnTextInactive = lang === "zh" ? "开启编辑模式" : lang === "en" ? "Enable Editing" : "Activar Edición";
  const saveBtnText = lang === "zh" ? "💾 保存" : lang === "en" ? "💾 Save Changes" : "💾 Guardar Cambios";
  const exportBtnText = lang === "zh" ? "📥 导出 HTML" : lang === "en" ? "📥 Export HTML" : "📥 Exportar HTML";
  const printBtnText = lang === "zh" ? "🖥️ 演示 / 打印" : lang === "en" ? "🖥️ Present / Print" : "🖥️ Presentar / Imprimir";

  const tabInicio = lang === "zh" ? "🏢 首页" : lang === "en" ? "🏢 Home" : "🏢 Inicio";
  const tabTecnica = lang === "zh" ? "⚡ 技术" : lang === "en" ? "⚡ Technical" : "⚡ Técnica";
  const tabFinanciera = lang === "zh" ? "📊 财务" : lang === "en" ? "📊 Financial" : "📊 Financiera";
  const tabLegal = lang === "zh" ? "⚖️ 法律" : lang === "en" ? "⚖️ Legal" : "⚖️ Legal";
  const tabGaleria = lang === "zh" ? "📷 图库" : lang === "en" ? "📷 Gallery" : "📷 Galería";
  const tabCierre = lang === "zh" ? "🏁 提请" : lang === "en" ? "🏁 Closing" : "🏁 Cierre";

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title}</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS CDN (v3 for standalone file compatibility and easy runtime rendering) -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Custom Configuration and Theme Variables -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0A2D56',      /* Azul marino oscuro - Principal */
            secondary: '#0EA1B3',    /* Cyan/Turquesa - Acento */
            'gray-light': '#BFC5CC',   /* Gris claro */
            'gray-bg': '#E7EAED',      /* Gris muy claro - Fondos */
            dark: '#333D47',         /* Gris oscuro - Textos */
          },
          fontFamily: {
            sans: ['Montserrat', 'Segoe UI', 'Arial', 'sans-serif'],
            heading: ['Space Grotesk', 'Eurostile', 'Arial Black', 'sans-serif'],
          }
        }
      }
    }
  </script>
  
  <style type="text/css">
    /* Custom style definitions */
    :root {
      --color-primary: #0A2D56;
      --color-secondary: #0EA1B3;
      --color-gray-light: #BFC5CC;
      --color-gray-bg: #E7EAED;
      --color-dark: #333D47;
    }
    
    body {
      font-family: 'Montserrat', sans-serif;
      color: var(--color-dark);
      background-color: #f8fafc;
    }
    
    .editable-outline {
      transition: all 0.3s ease;
    }
    
    body.editing .editable {
      outline: 1px dashed #0EA1B3 !important;
      outline-offset: 4px;
      cursor: text;
    }
    
    body.editing .editable:hover {
      outline-color: #0A2D56 !important;
      background-color: rgba(255, 253, 231, 0.4);
    }
    
    body.editing .editable:focus {
      outline: 2px solid #0A2D56 !important;
      background-color: #fffde7 !important;
    }
    
    .page-tab {
      display: none;
    }
    
    .page-tab.active {
      display: block;
      animation: fadeIn 0.4s ease-out forwards;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Scrollbar decoration */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-gray-bg);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-gray-light);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    /* Print styling */
    @media print {
      body {
        background-color: #ffffff !important;
        color: #000000 !important;
        font-size: 11pt !important;
      }
      .no-print {
        display: none !important;
      }
      .page-tab {
        display: block !important;
        opacity: 1 !important;
        transform: none !important;
        page-break-after: always;
        margin-bottom: 3rem;
      }
      .print-title {
        color: #0A2D56 !important;
        border-bottom: 2px solid #0EA1B3 !important;
        padding-bottom: 0.5rem;
      }
      .card-kpi {
        border-left: 4px solid #0EA1B3 !important;
        background-color: #ffffff !important;
        box-shadow: none !important;
        border: 1px solid #e2e8f0 !important;
      }
    }
  </style>
</head>
<body class="flex flex-col min-h-screen">

  <!-- BARRA DE CONTROL SUPERIOR (No-print) -->
  <header class="no-print bg-primary text-white shadow-lg sticky top-0 z-50 transition-all duration-300">
    <div class="max-width-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
      <div class="flex items-center gap-3">
        <!-- Logo SVG -->
        <div class="relative w-10 h-10 flex items-center justify-center bg-white/10 rounded-lg p-1.5 border border-white/20">
          <svg class="w-full h-full text-secondary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="6" width="14" height="14" rx="2" stroke="currentColor" stroke-width="2" />
            <line x1="9" y1="11" x2="9" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <line x1="15" y1="11" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M12 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            <path d="M12 9L10 13H14L12 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div>
          <span class="font-heading font-bold text-lg tracking-wider text-white">MOTOR <span class="text-secondary">ENERGY</span></span>
          <span class="block text-[10px] text-gray-300 tracking-widest font-mono uppercase">${portalText}</span>
        </div>
      </div>
      
      <!-- Botones de Control -->
      <div class="flex flex-wrap items-center gap-2 justify-center">
        <button id="btn-toggle-edit" onclick="toggleEditMode()" class="px-3.5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer">
          <span id="edit-icon">✏️</span> <span id="edit-text">${editBtnTextInactive}</span>
        </button>
        <button onclick="saveToLocal()" class="px-3.5 py-1.5 text-xs font-semibold bg-secondary text-primary hover:bg-secondary/90 rounded font-medium flex items-center gap-1.5 transition-all cursor-pointer">
          ${saveBtnText}
        </button>
        <button onclick="exportHTML()" class="px-3.5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 rounded border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer">
          ${exportBtnText}
        </button>
        <button onclick="presentMode()" class="px-3.5 py-1.5 text-xs font-semibold bg-white text-primary hover:bg-gray-100 rounded flex items-center gap-1.5 transition-all cursor-pointer">
          ${printBtnText}
        </button>
      </div>
    </div>
  </header>

  <!-- MENÚ DE NAVEGACIÓN (No-print) -->
  <nav class="no-print bg-white border-b border-gray-200 sticky top-[64px] sm:top-[60px] z-40 shadow-sm">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex overflow-x-auto no-scrollbar scroll-smooth">
        <button onclick="switchTab(0)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-primary border-primary font-bold active-tab" data-index="0">
          ${tabInicio}
        </button>
        <button onclick="switchTab(1)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-gray-500" data-index="1">
          ${tabTecnica}
        </button>
        <button onclick="switchTab(2)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-gray-500" data-index="2">
          ${tabFinanciera}
        </button>
        <button onclick="switchTab(3)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-gray-500" data-index="3">
          ${tabLegal}
        </button>
        <button onclick="switchTab(4)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-gray-500" data-index="4">
          ${tabGaleria}
        </button>
        <button onclick="switchTab(5)" class="nav-btn py-3 px-4 text-sm font-semibold border-b-2 border-transparent hover:text-primary hover:border-gray-300 whitespace-nowrap transition-all focus:outline-none flex items-center gap-2 text-gray-500" data-index="5">
          ${tabCierre}
        </button>
      </div>
    </div>
  </nav>

  <!-- CONTENIDO PRINCIPAL -->
  <main id="main-content" class="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">

    <!-- SECCIÓN 1: INICIO -->
    <section id="tab-0" class="page-tab active space-y-6 sm:space-y-8">
      <!-- Header Banner -->
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-[#0d3a6e] text-white p-6 sm:p-10 shadow-md">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#0EA1B3_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div class="relative z-10 max-w-4xl space-y-3">
          <span class="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-secondary/20 text-secondary border border-secondary/30 rounded-full">Presentación Ejecutiva</span>
          <h1 class="editable font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight" id="doc-title" data-field="title">${data.title}</h1>
          <p class="editable text-sm sm:text-base text-gray-300 font-medium" id="doc-subtitle" data-field="subtitle">${data.subtitle}</p>
          <div class="flex items-center gap-2 text-xs text-secondary font-mono pt-2">
            <span>📅 FECHA:</span>
            <span class="editable text-white font-semibold" id="doc-date" data-field="date">${data.date}</span>
          </div>
        </div>
      </div>

      <!-- KPIs Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        ${data.kpis.map((kpi, index) => `
        <div class="card-kpi bg-white p-5 rounded-lg border-l-4 border-secondary shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div class="flex justify-between items-start mb-2">
            <span class="text-2xl">${kpi.icon}</span>
            <span class="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">KPI 0${index + 1}</span>
          </div>
          <h3 class="editable text-xs font-bold text-primary tracking-wider uppercase font-heading mb-1" id="kpi-title-${kpi.id}" data-kpi-id="${kpi.id}" data-type="title">${kpi.title}</h3>
          <div class="editable font-heading text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight mb-2" id="kpi-value-${kpi.id}" data-kpi-id="${kpi.id}" data-type="value">${kpi.value}</div>
          <p class="editable text-xs text-dark/80 leading-relaxed" id="kpi-desc-${kpi.id}" data-kpi-id="${kpi.id}" data-type="description">${kpi.description}</p>
        </div>
        `).join("")}
      </div>

      <!-- Resumen Ejecutivo & Highlight Box -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Resumen -->
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <h2 class="font-heading text-lg font-bold text-primary border-b-2 border-secondary pb-2">Resumen Ejecutivo</h2>
          <p class="editable text-sm text-dark/90 leading-relaxed whitespace-pre-wrap" id="doc-summary" data-field="executiveSummary">${data.executiveSummary}</p>
        </div>
        <!-- Objetivo Destacado -->
        <div class="bg-gradient-to-br from-[#0EA1B3]/10 to-[#0A2D56]/5 p-6 rounded-lg border border-secondary/20 flex flex-col justify-between space-y-4 shadow-sm">
          <div>
            <div class="flex items-center gap-2 text-primary font-bold font-heading text-sm mb-3">
              <span>🎯</span>
              <span>OBJETIVO PRINCIPAL</span>
            </div>
            <p class="editable text-sm text-primary font-medium leading-relaxed" id="doc-objective" data-field="highlightObjective">${data.highlightObjective}</p>
          </div>
          <div class="bg-primary text-white text-center p-3 rounded-md font-heading text-xs font-bold tracking-wider uppercase shadow-sm">
            Consejo de Administración
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2: TÉCNICA -->
    <section id="tab-1" class="page-tab space-y-6 sm:space-y-8">
      <div class="border-l-4 border-secondary pl-4 pb-1">
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-primary print-title">Viabilidad Técnica e Ingeniería</h2>
        <p class="text-xs text-gray-500 font-medium">Especificaciones técnicas y análisis de implantación geográfica</p>
      </div>

      <!-- Ubicación y Terreno + Tecnología -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <!-- Ubicación -->
        <div class="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
            <span>📍</span> Ubicación y Características del Terreno
          </h3>
          <ul class="space-y-3" id="location-list">
            ${data.locationDetails.map((detail, idx) => `
              <li class="flex items-start gap-3 bg-gray-bg/40 p-3 rounded-md border-l-2 border-secondary">
                <span class="text-secondary font-bold text-sm mt-0.5">0${idx + 1}</span>
                <span class="editable text-sm text-dark/90 leading-relaxed" data-type="location" data-index="${idx}">${detail}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Tecnología -->
        <div class="lg:col-span-2 space-y-4">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4 h-full flex flex-col justify-between">
            <div>
              <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
                <span>⚙️</span> Configuración de Equipamiento
              </h3>
              
              <div class="space-y-4">
                ${data.technologies.map((tech) => `
                  <div class="flex items-center gap-4 p-3 rounded bg-gray-bg/30">
                    <span class="text-2xl p-2 bg-white rounded shadow-sm">${tech.icon}</span>
                    <div class="flex-grow min-w-0">
                      <div class="flex justify-between items-baseline">
                        <span class="editable text-xs font-bold text-primary uppercase font-heading" id="tech-title-${tech.id}" data-tech-id="${tech.id}" data-type="title">${tech.title}</span>
                        <span class="editable text-sm font-extrabold text-secondary font-heading" id="tech-val-${tech.id}" data-tech-id="${tech.id}" data-type="value">${tech.value}</span>
                      </div>
                      <p class="editable text-xs text-gray-500 truncate" id="tech-desc-${tech.id}" data-tech-id="${tech.id}" data-type="description">${tech.description}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interconexión y Evacuación -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
          <span>⚡</span> Interconexión de Red y Evacuación de Energía
        </h3>
        <p class="editable text-sm text-dark/90 leading-relaxed whitespace-pre-wrap" id="doc-interconnection" data-field="interconnectionDetails">${data.interconnectionDetails}</p>
      </div>
    </section>

    <!-- SECCIÓN 3: FINANCIERA -->
    <section id="tab-2" class="page-tab space-y-6 sm:space-y-8">
      <div class="border-l-4 border-secondary pl-4 pb-1">
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-primary print-title">Análisis Financiero y Retorno</h2>
        <p class="text-xs text-gray-500 font-medium">Viabilidad económica, estructura de capital y análisis de sensibilidad</p>
      </div>

      <!-- Tabla Financiera & Estructura -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <!-- Tabla Financiera -->
        <div class="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between p-6 space-y-4">
          <div>
            <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
              <span>📊</span> Indicadores Financieros Clave
            </h3>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-primary text-white font-heading text-xs uppercase tracking-wider">
                    <th class="p-3 rounded-l">Concepto del Proyecto</th>
                    <th class="p-3">Categoría</th>
                    <th class="p-3 text-right rounded-r">Valor Estimado</th>
                  </tr>
                </thead>
                <tbody id="finance-table-body" class="text-sm">
                  ${data.financeRows.map((row) => `
                    <tr class="border-b border-gray-100 hover:bg-teal-50/40 transition-colors odd:bg-gray-bg/20">
                      <td class="p-3 font-semibold text-primary editable" id="fin-concept-${row.id}" data-row-id="${row.id}" data-type="concept">${row.concept}</td>
                      <td class="p-3 text-xs text-gray-400 font-mono">${row.category}</td>
                      <td class="p-3 text-right font-bold text-secondary font-heading editable" id="fin-value-${row.id}" data-row-id="${row.id}" data-type="value">${row.value}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Estructura Financiamiento -->
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
              <span>🏦</span> Estructura de Financiamiento
            </h3>
            
            <div class="space-y-4">
              ${data.financingStructure.map((struct) => `
                <div class="bg-gray-bg/30 p-4 rounded border-l-4 border-primary">
                  <div class="flex justify-between items-baseline mb-1">
                    <span class="editable text-xs font-bold text-primary uppercase" id="struct-concept-${struct.id}" data-struct-id="${struct.id}" data-type="concept">${struct.concept}</span>
                    <span class="editable text-sm font-extrabold text-secondary font-heading" id="struct-percent-${struct.id}" data-struct-id="${struct.id}" data-type="percentage">${struct.percentage}</span>
                  </div>
                  <div class="editable text-sm font-semibold text-dark/70 font-mono" id="struct-amount-${struct.id}" data-struct-id="${struct.id}" data-type="amount">${struct.amount}</div>
                </div>
              `).join("")}
            </div>
          </div>
          
          <div class="mt-6 pt-4 border-t border-gray-100 bg-secondary/5 p-4 rounded-lg">
            <span class="text-xs font-bold text-primary uppercase block mb-1">Nota de Estructuración:</span>
            <p class="text-[11px] text-gray-500 leading-relaxed">Modelo financiero estructurado bajo modalidad 'Project Finance' sin recurso, apalancando un 70% de deuda senior.</p>
          </div>
        </div>
      </div>

      <!-- Análisis Sensibilidad -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
          <span>📈</span> Matriz de Sensibilidad de Escenarios
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${data.scenarios.map((sc, index) => `
            <div class="border border-gray-200 p-4 rounded-lg bg-gray-bg/10 ${index === 1 ? 'ring-2 ring-secondary/50 bg-secondary/5' : ''}">
              <div class="editable text-xs font-bold text-primary uppercase font-heading border-b border-gray-200 pb-2 mb-3" id="sc-name-${sc.id}" data-sc-id="${sc.id}" data-type="name">${sc.name}</div>
              <div class="space-y-2">
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">TIR Estimada:</span>
                  <strong class="editable font-heading text-secondary" id="sc-tir-${sc.id}" data-sc-id="${sc.id}" data-type="tir">${sc.tir}</strong>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">VAN (8%):</span>
                  <strong class="editable font-heading text-primary" id="sc-van-${sc.id}" data-sc-id="${sc.id}" data-type="van">${sc.van}</strong>
                </div>
                <div class="flex justify-between text-xs">
                  <span class="text-gray-400">Payback:</span>
                  <strong class="editable font-heading text-dark" id="sc-payback-${sc.id}" data-sc-id="${sc.id}" data-type="payback">${sc.payback}</strong>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4: LEGAL -->
    <section id="tab-3" class="page-tab space-y-6 sm:space-y-8">
      <div class="border-l-4 border-secondary pl-4 pb-1">
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-primary print-title">Marco Legal, Permisos y Riesgos</h2>
        <p class="text-xs text-gray-500 font-medium">Permisología, contratos clave y estrategia de mitigación de contingencias</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        <!-- Checklist de Permisos -->
        <div class="lg:col-span-3 bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
          <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
            <span>📋</span> Estado de Permisos y Autorizaciones
          </h3>
          
          <div class="space-y-3" id="permits-list">
            ${data.legalItems.map((item) => {
              let badgeColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
              let badgeText = "⏳ PENDIENTE";
              if (item.status === "ok") {
                badgeColor = "bg-green-100 text-green-800 border-green-200";
                badgeText = "✅ OK";
              } else if (item.status === "progress") {
                badgeColor = "bg-teal-100 text-teal-800 border-teal-200";
                badgeText = "🔄 EN PROGRESO";
              }
              
              return `
              <div class="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-bg/20 rounded border-l-4 border-secondary gap-3">
                <div class="space-y-1">
                  <h4 class="editable text-sm font-bold text-primary font-heading" id="leg-name-${item.id}" data-leg-id="${item.id}" data-type="name">${item.name}</h4>
                  <p class="editable text-xs text-gray-500 leading-relaxed" id="leg-desc-${item.id}" data-leg-id="${item.id}" data-type="description">${item.description}</p>
                </div>
                <div class="flex items-center gap-2">
                  <select class="no-print border border-gray-200 rounded text-xs p-1 bg-white" onchange="updatePermitStatus('${item.id}', this.value)">
                    <option value="ok" ${item.status === 'ok' ? 'selected' : ''}>✅ OK</option>
                    <option value="progress" ${item.status === 'progress' ? 'selected' : ''}>🔄 En Progreso</option>
                    <option value="pending" ${item.status === 'pending' ? 'selected' : ''}>⏳ Pendiente</option>
                  </select>
                  <span class="px-2 py-1 text-[10px] font-bold rounded border ${badgeColor} inline-block whitespace-nowrap" id="badge-${item.id}">${badgeText}</span>
                </div>
              </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Contratos Clave -->
        <div class="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2 mb-4">
              <span>📝</span> Estructura Contractual
            </h3>
            
            <div class="space-y-4">
              ${data.contracts.map((cnt) => `
                <div class="p-3 rounded border border-gray-200 bg-gray-bg/10">
                  <h4 class="editable text-xs font-bold text-primary font-heading uppercase mb-1" id="cnt-type-${cnt.id}" data-cnt-id="${cnt.id}" data-type="type">${cnt.type}</h4>
                  <p class="editable text-xs text-gray-500 leading-relaxed" id="cnt-desc-${cnt.id}" data-cnt-id="${cnt.id}" data-type="description">${cnt.description}</p>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>

      <!-- Mitigación de Riesgos -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
          <span>🛡️</span> Matriz de Mitigación de Riesgos Ejecutivos
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${data.risks.map((risk) => `
            <div class="border border-gray-100 p-4 rounded bg-gray-bg/10 flex flex-col justify-between space-y-2">
              <div>
                <div class="flex justify-between items-baseline mb-2">
                  <h4 class="editable text-sm font-bold text-primary font-heading" id="risk-title-${risk.id}" data-risk-id="${risk.id}" data-type="title">${risk.title}</h4>
                  <span class="editable text-[10px] font-mono font-bold px-1.5 py-0.5 bg-red-50 text-red-700 border border-red-100 rounded" id="risk-type-${risk.id}" data-risk-id="${risk.id}" data-type="type">${risk.type}</span>
                </div>
                <p class="editable text-xs text-dark/90 leading-relaxed mb-3 bg-white p-2.5 rounded border border-gray-200/50" id="risk-val-${risk.id}" data-risk-id="${risk.id}" data-type="risk">${risk.risk}</p>
              </div>
              <div class="bg-secondary/5 p-3 rounded border-l-2 border-secondary">
                <span class="text-[10px] font-bold text-primary uppercase block mb-1">Estrategia de Mitigación:</span>
                <p class="editable text-xs text-gray-600 leading-relaxed" id="risk-mit-${risk.id}" data-risk-id="${risk.id}" data-type="mitigation">${risk.mitigation}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5: GALERÍA -->
    <section id="tab-4" class="page-tab space-y-6 sm:space-y-8">
      <div class="border-l-4 border-secondary pl-4 pb-1">
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-primary print-title">Galería de Imágenes y Documentación</h2>
        <p class="text-xs text-gray-500 font-medium">Documentación visual e ingeniería básica del proyecto</p>
      </div>

      <!-- Grid de Galería -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
        ${data.gallery.map((img) => `
          <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden group flex flex-col justify-between">
            <div class="relative overflow-hidden h-[220px] bg-gray-bg">
              <img src="${img.url}" id="img-element-${img.id}" alt="${img.category}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerpolicy="no-referrer">
              <span class="absolute top-2 left-2 bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow">${img.category}</span>
              
              <!-- Botón Cambiar (Solo visible en edición) -->
              <button onclick="triggerImageUpload('${img.id}')" class="no-print absolute top-2 right-2 bg-secondary text-primary font-semibold text-xs px-2.5 py-1.5 rounded shadow-lg hover:bg-secondary/90 transition-all flex items-center gap-1 cursor-pointer" style="display: none;" data-change-img="${img.id}">
                📷 Cambiar
              </button>
            </div>
            <div class="p-4 bg-white flex-grow">
              <p class="editable text-xs text-dark/80 leading-relaxed italic" id="img-caption-${img.id}" data-img-id="${img.id}">${img.caption}</p>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Hidden file input for uploads -->
      <input type="file" id="image-file-input" accept="image/*" class="hidden" onchange="handleImageFileChange(event)">

      <!-- Documentación Técnica Disponible -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
          <span>📁</span> Documentación Técnica y Estudios Disponibles (Data Room)
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${data.documentation.map((doc, idx) => `
            <div class="flex items-center gap-3 p-3 rounded bg-gray-bg/30 hover:bg-gray-bg/50 transition-colors">
              <span class="text-xl">📄</span>
              <span class="editable text-xs text-primary font-semibold truncate" data-type="doc" data-index="${idx}">${doc}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </section>

    <!-- SECCIÓN 6: CIERRE -->
    <section id="tab-5" class="page-tab space-y-6 sm:space-y-8">
      <div class="border-l-4 border-secondary pl-4 pb-1">
        <h2 class="font-heading text-xl sm:text-2xl font-bold text-primary print-title">Conclusiones y Solicitud de Aprobación</h2>
        <p class="text-xs text-gray-500 font-medium">Hitos de ejecución, propuesta de valor y petición formal al Consejo</p>
      </div>

      <!-- Conclusiones / Cards de Valor -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        ${data.values.map((v) => `
          <div class="bg-white p-5 rounded-lg shadow-sm border border-gray-100 space-y-2 hover:-translate-y-1 transition-transform">
            <span class="text-3xl block">${v.icon}</span>
            <h3 class="editable font-heading text-sm font-bold text-primary uppercase" id="val-title-${v.id}" data-val-id="${v.id}" data-type="title">${v.title}</h3>
            <p class="editable text-xs text-gray-500 leading-relaxed" id="val-desc-${v.id}" data-val-id="${v.id}" data-type="description">${v.description}</p>
          </div>
        `).join("")}
      </div>

      <!-- CTA Box -->
      <div class="bg-gradient-to-r from-primary to-secondary text-white p-8 sm:p-12 rounded-xl shadow-lg relative overflow-hidden">
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div class="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <span class="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-widest bg-white/10 text-white border border-white/20 rounded-full">Solicitud Formal de Acuerdo</span>
          <h2 class="font-heading text-xl sm:text-3xl font-extrabold tracking-tight">Petición al Honorable Consejo de Administración</h2>
          <p class="editable text-sm sm:text-base text-gray-100 leading-relaxed whitespace-pre-wrap font-medium" id="doc-ctatext" data-field="ctaText">${data.ctaText}</p>
          
          <div class="pt-2">
            <button class="no-print bg-white text-primary font-heading font-extrabold text-sm uppercase px-8 py-3.5 rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer">
              ${data.ctaButtonText}
            </button>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
        <h3 class="font-heading text-md font-bold text-primary border-b border-gray-100 pb-2 flex items-center gap-2">
          <span>📅</span> Cronograma Crítico de Ejecución (Hitos Clave)
        </h3>
        
        <div class="relative pl-6 border-l-2 border-secondary space-y-6 sm:space-y-8 ml-3">
          ${data.timeline.map((item) => `
            <div class="relative">
              <!-- Marker -->
              <span class="absolute -left-[31px] top-0.5 bg-secondary text-primary font-heading text-[10px] font-extrabold px-1.5 py-0.5 rounded shadow border border-white flex items-center justify-center">${item.period}</span>
              
              <div class="bg-gray-bg/20 p-4 rounded border border-gray-100 ml-4 space-y-1">
                <h4 class="editable text-sm font-bold text-primary font-heading" id="tl-title-${item.id}" data-tl-id="${item.id}" data-type="title">${item.title}</h4>
                <p class="editable text-xs text-gray-500 leading-relaxed" id="tl-desc-${item.id}" data-tl-id="${item.id}" data-type="description">${item.description}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Datos de Contacto / Pie de Página -->
      <div class="bg-primary text-white p-6 sm:p-8 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div class="space-y-2">
          <span class="font-heading font-extrabold text-lg tracking-wider text-white">MOTOR <span class="text-secondary">ENERGY</span></span>
          <p class="text-xs text-gray-300">Liderando el desarrollo de la infraestructura energética del futuro.</p>
          <p class="editable text-[10px] text-gray-400 leading-relaxed" id="doc-address" data-field="address">${data.contact.address}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div class="space-y-1">
            <span class="text-secondary block font-bold text-[9px] tracking-wider uppercase">Email</span>
            <span class="editable text-white" id="doc-email" data-field="email">${data.contact.email}</span>
          </div>
          <div class="space-y-1">
            <span class="text-secondary block font-bold text-[9px] tracking-wider uppercase">Teléfono</span>
            <span class="editable text-white" id="doc-phone" data-field="phone">${data.contact.phone}</span>
          </div>
          <div class="space-y-1">
            <span class="text-secondary block font-bold text-[9px] tracking-wider uppercase">Sitio Web</span>
            <span class="editable text-white" id="doc-web" data-field="web">${data.contact.web}</span>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- NOTIFICACIÓN TOAST -->
  <div id="toast-notification" class="no-print fixed bottom-6 right-6 bg-primary text-white border border-secondary/30 px-5 py-4 rounded-lg shadow-2xl flex items-center gap-3 transition-all duration-300 transform translate-x-[400px] opacity-0 z-50">
    <span class="text-lg" id="toast-icon">ℹ️</span>
    <span class="text-xs font-semibold" id="toast-message">Mensaje</span>
  </div>

  <!-- INLINE SCRIPTS (Tab Switching, Editable Mode, Base64 conversion, PDF printing) -->
  <script type="text/javascript">
    // State management in offline file
    let state = ${serializedData};
    let isEditing = false;
    let activeUploadImgId = null;

    // Load from LocalStorage if present in file URL domain
    window.addEventListener('load', () => {
      try {
        const saved = localStorage.getItem('motorEnergyContent');
        if (saved) {
          state = JSON.parse(saved);
          syncStateToUI();
          showToast('✅ Presentación sincronizada con cambios locales');
        }
      } catch (err) {
        console.warn("localStorage not accessible in current security context:", err);
      }
    });

    // Sync State to UI Elements
    function syncStateToUI() {
      if (!state) return;
      
      // Basic text fields
      safeSetText('doc-title', state.title);
      safeSetText('doc-subtitle', state.subtitle);
      safeSetText('doc-date', state.date);
      safeSetText('doc-summary', state.executiveSummary);
      safeSetText('doc-objective', state.highlightObjective);
      safeSetText('doc-interconnection', state.interconnectionDetails);
      safeSetText('doc-ctatext', state.ctaText);
      safeSetText('doc-address', state.contact.address);
      safeSetText('doc-email', state.contact.email);
      safeSetText('doc-phone', state.contact.phone);
      safeSetText('doc-web', state.contact.web);

      // KPIs
      if (state.kpis) {
        state.kpis.forEach(kpi => {
          safeSetText('kpi-title-' + kpi.id, kpi.title);
          safeSetText('kpi-value-' + kpi.id, kpi.value);
          safeSetText('kpi-desc-' + kpi.id, kpi.description);
        });
      }

      // Technologies
      if (state.technologies) {
        state.technologies.forEach(t => {
          safeSetText('tech-title-' + t.id, t.title);
          safeSetText('tech-val-' + t.id, t.value);
          safeSetText('tech-desc-' + t.id, t.description);
        });
      }

      // Finance Rows
      if (state.financeRows) {
        state.financeRows.forEach(row => {
          safeSetText('fin-concept-' + row.id, row.concept);
          safeSetText('fin-value-' + row.id, row.value);
        });
      }

      // Financing Structure
      if (state.financingStructure) {
        state.financingStructure.forEach(st => {
          safeSetText('struct-concept-' + st.id, st.concept);
          safeSetText('struct-percent-' + st.id, st.percentage);
          safeSetText('struct-amount-' + st.id, st.amount);
        });
      }

      // Scenarios
      if (state.scenarios) {
        state.scenarios.forEach(sc => {
          safeSetText('sc-name-' + sc.id, sc.name);
          safeSetText('sc-tir-' + sc.id, sc.tir);
          safeSetText('sc-van-' + sc.id, sc.van);
          safeSetText('sc-payback-' + sc.id, sc.payback);
        });
      }

      // Legal Checklist
      if (state.legalItems) {
        state.legalItems.forEach(item => {
          safeSetText('leg-name-' + item.id, item.name);
          safeSetText('leg-desc-' + item.id, item.description);
        });
      }

      // Risks
      if (state.risks) {
        state.risks.forEach(r => {
          safeSetText('risk-title-' + r.id, r.title);
          safeSetText('risk-type-' + r.id, r.type);
          safeSetText('risk-val-' + r.id, r.risk);
          safeSetText('risk-mit-' + r.id, r.mitigation);
        });
      }

      // Contracts
      if (state.contracts) {
        state.contracts.forEach(cnt => {
          safeSetText('cnt-type-' + cnt.id, cnt.type);
          safeSetText('cnt-desc-' + cnt.id, cnt.description);
        });
      }

      // Values
      if (state.values) {
        state.values.forEach(v => {
          safeSetText('val-title-' + v.id, v.title);
          safeSetText('val-desc-' + v.id, v.description);
        });
      }

      // Timeline
      if (state.timeline) {
        state.timeline.forEach(tl => {
          safeSetText('tl-title-' + tl.id, tl.title);
          safeSetText('tl-desc-' + tl.id, tl.description);
        });
      }

      // Gallery Images
      if (state.gallery) {
        state.gallery.forEach(img => {
          const imgEl = document.getElementById('img-element-' + img.id);
          if (imgEl) imgEl.src = img.url;
          safeSetText('img-caption-' + img.id, img.caption);
        });
      }

      // Lists
      const locationSpans = document.querySelectorAll('[data-type="location"]');
      locationSpans.forEach(span => {
        const idx = parseInt(span.getAttribute('data-index') || '0');
        if (state.locationDetails && state.locationDetails[idx] !== undefined) {
          span.innerText = state.locationDetails[idx];
        }
      });

      const docSpans = document.querySelectorAll('[data-type="doc"]');
      docSpans.forEach(span => {
        const idx = parseInt(span.getAttribute('data-index') || '0');
        if (state.documentation && state.documentation[idx] !== undefined) {
          span.innerText = state.documentation[idx];
        }
      });
    }

    function safeSetText(id, val) {
      const el = document.getElementById(id);
      if (el) el.innerText = val;
    }

    // Tab switcher
    function switchTab(index) {
      document.querySelectorAll('.page-tab').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-primary', 'border-primary', 'font-bold', 'active-tab');
        btn.classList.add('text-gray-500');
        btn.style.borderBottomColor = 'transparent';
      });
      
      const nextTab = document.getElementById('tab-' + index);
      if (nextTab) nextTab.classList.add('active');
      
      const nextBtn = document.querySelector('.nav-btn[data-index="' + index + '"]');
      if (nextBtn) {
        nextBtn.classList.add('text-primary', 'border-primary', 'font-bold', 'active-tab');
        nextBtn.classList.remove('text-gray-500');
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Toggle Editing Mode
    function toggleEditMode() {
      isEditing = !isEditing;
      const body = document.body;
      const btn = document.getElementById('btn-toggle-edit');
      const text = document.getElementById('edit-text');
      const icon = document.getElementById('edit-icon');

      if (isEditing) {
        body.classList.add('editing');
        text.innerText = "${editBtnTextActive}";
        icon.innerText = "🔓";
        btn.classList.add('bg-secondary', 'text-primary');
        btn.classList.remove('bg-white/10');
        
        // Turn contentEditable on for all editable classes
        document.querySelectorAll('.editable').forEach(el => {
          el.setAttribute('contenteditable', 'true');
        });
        
        // Show change image buttons
        document.querySelectorAll('[data-change-img]').forEach(btn => {
          btn.style.display = 'flex';
        });
        
        showToast('🔓 ' + (isChinese() ? '编辑模式已开启。' : isEnglish() ? 'Editing mode enabled.' : 'Modo de edición activado.'), 'ℹ️');
      } else {
        body.classList.remove('editing');
        text.innerText = "${editBtnTextInactive}";
        icon.innerText = "✏️";
        btn.classList.remove('bg-secondary', 'text-primary');
        btn.classList.add('bg-white/10');
        
        // Turn contentEditable off
        document.querySelectorAll('.editable').forEach(el => {
          el.setAttribute('contenteditable', 'false');
        });
        
        // Hide change image buttons
        document.querySelectorAll('[data-change-img]').forEach(btn => {
          btn.style.display = 'none';
        });

        // Pull edited strings into local javascript state
        pullChangesFromUI();
        
        showToast('🔒 ' + (isChinese() ? '编辑模式已关闭。' : isEnglish() ? 'Editing mode disabled.' : 'Modo de edición desactivado.'), '🔒');
      }
    }

    function isChinese() {
      return "${lang}" === "zh";
    }

    function isEnglish() {
      return "${lang}" === "en";
    }

    // Pull edited items from UI elements back into local javascript state object
    function pullChangesFromUI() {
      state.title = document.getElementById('doc-title').innerText;
      state.subtitle = document.getElementById('doc-subtitle').innerText;
      state.date = document.getElementById('doc-date').innerText;
      state.executiveSummary = document.getElementById('doc-summary').innerText;
      state.highlightObjective = document.getElementById('doc-objective').innerText;
      state.interconnectionDetails = document.getElementById('doc-interconnection').innerText;
      state.ctaText = document.getElementById('doc-ctatext').innerText;
      state.contact.address = document.getElementById('doc-address').innerText;
      state.contact.email = document.getElementById('doc-email').innerText;
      state.contact.phone = document.getElementById('doc-phone').innerText;
      state.contact.web = document.getElementById('doc-web').innerText;

      // KPIs
      state.kpis.forEach(kpi => {
        kpi.title = document.getElementById('kpi-title-' + kpi.id).innerText;
        kpi.value = document.getElementById('kpi-value-' + kpi.id).innerText;
        kpi.description = document.getElementById('kpi-desc-' + kpi.id).innerText;
      });

      // Technologies
      state.technologies.forEach(t => {
        t.title = document.getElementById('tech-title-' + t.id).innerText;
        t.value = document.getElementById('tech-val-' + t.id).innerText;
        t.description = document.getElementById('tech-desc-' + t.id).innerText;
      });

      // Finance
      state.financeRows.forEach(row => {
        row.concept = document.getElementById('fin-concept-' + row.id).innerText;
        row.value = document.getElementById('fin-value-' + row.id).innerText;
      });

      // Financing Structure
      state.financingStructure.forEach(st => {
        st.concept = document.getElementById('struct-concept-' + st.id).innerText;
        st.percentage = document.getElementById('struct-percent-' + st.id).innerText;
        st.amount = document.getElementById('struct-amount-' + st.id).innerText;
      });

      // Scenarios
      state.scenarios.forEach(sc => {
        sc.name = document.getElementById('sc-name-' + sc.id).innerText;
        sc.tir = document.getElementById('sc-tir-' + sc.id).innerText;
        sc.van = document.getElementById('sc-van-' + sc.id).innerText;
        sc.payback = document.getElementById('sc-payback-' + sc.id).innerText;
      });

      // Legal Checklist
      state.legalItems.forEach(item => {
        item.name = document.getElementById('leg-name-' + item.id).innerText;
        item.description = document.getElementById('leg-desc-' + item.id).innerText;
      });

      // Risks
      state.risks.forEach(r => {
        r.title = document.getElementById('risk-title-' + r.id).innerText;
        r.type = document.getElementById('risk-type-' + r.id).innerText;
        r.risk = document.getElementById('risk-val-' + r.id).innerText;
        r.mitigation = document.getElementById('risk-mit-' + r.id).innerText;
      });

      // Contracts
      state.contracts.forEach(cnt => {
        cnt.type = document.getElementById('cnt-type-' + cnt.id).innerText;
        cnt.description = document.getElementById('cnt-desc-' + cnt.id).innerText;
      });

      // Values
      state.values.forEach(v => {
        v.title = document.getElementById('val-title-' + v.id).innerText;
        v.description = document.getElementById('val-desc-' + v.id).innerText;
      });

      // Timeline
      state.timeline.forEach(tl => {
        tl.title = document.getElementById('tl-title-' + tl.id).innerText;
        tl.description = document.getElementById('tl-desc-' + tl.id).innerText;
      });

      // Gallery captions
      state.gallery.forEach(img => {
        img.caption = document.getElementById('img-caption-' + img.id).innerText;
      });

      // Lists
      const locationSpans = document.querySelectorAll('[data-type="location"]');
      state.locationDetails = [];
      locationSpans.forEach(span => {
        state.locationDetails.push(span.innerText);
      });

      const docSpans = document.querySelectorAll('[data-type="doc"]');
      state.documentation = [];
      docSpans.forEach(span => {
        state.documentation.push(span.innerText);
      });
    }

    // Save To LocalStorage
    function saveToLocal() {
      try {
        pullChangesFromUI();
        localStorage.setItem('motorEnergyContent', JSON.stringify(state));
        showToast(isChinese() ? '✅ 更改已成功保存在本地存储中。' : isEnglish() ? '✅ Changes saved successfully in local storage.' : '✅ Cambios guardados correctamente en almacenamiento local.', '💾');
      } catch (err) {
        showToast((isChinese() ? '❌ 存储错误: ' : isEnglish() ? '❌ Storage error: ' : '❌ Error de almacenamiento: ') + err.message, '⚠️');
      }
    }

    // Export HTML
    function exportHTML() {
      pullChangesFromUI();
      // Generate a new self-contained version with the updated state injected as default
      // This is beautifully self-referential!
      const currentHTML = document.documentElement.outerHTML;
      
      // Let's replace the script state definition dynamically so the exported file gets the NEW state directly.
      const searchStr = 'let state = ' + JSON.stringify(${serializedData}) + ';';
      const replacementStr = 'let state = ' + JSON.stringify(state) + ';';
      
      let finalHTML = '<!DOCTYPE html>\n' + currentHTML;
      if (finalHTML.includes(searchStr)) {
        finalHTML = finalHTML.replace(searchStr, replacementStr);
      } else {
        // Fallback replacement if original not matching precisely
        const regex = /let\s+state\s*=\s*\{.*?\};/s;
        finalHTML = finalHTML.replace(regex, 'let state = ' + JSON.stringify(state) + ';');
      }

      // Trigger standard client-side download
      const blob = new Blob([finalHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'motor_energy_presentacion.html';
      a.click();
      URL.revokeObjectURL(url);
      showToast(isChinese() ? '📥 演示文稿已成功导出为独立的 HTML 文件。' : isEnglish() ? '📥 Presentation successfully exported as a self-contained HTML file.' : '📥 Presentación exportada como un único archivo HTML autocontenido', '📥');
    }

    // Open Print Dialogue
    function presentMode() {
      window.print();
    }

    // Update Checklist Item Status
    function updatePermitStatus(id, status) {
      const item = state.legalItems.find(i => i.id === id);
      if (item) {
        item.status = status;
        const badge = document.getElementById('badge-' + id);
        if (badge) {
          badge.className = "px-2 py-1 text-[10px] font-bold rounded border inline-block whitespace-nowrap";
          if (status === 'ok') {
            badge.classList.add('bg-green-100', 'text-green-800', 'border-green-200');
            badge.innerText = "✅ OK";
          } else if (status === 'progress') {
            badge.classList.add('bg-teal-100', 'text-teal-800', 'border-teal-200');
            badge.innerText = "🔄 EN PROGRESO";
          } else {
            badge.classList.add('bg-yellow-100', 'text-yellow-800', 'border-yellow-200');
            badge.innerText = "⏳ PENDIENTE";
          }
        }
      }
    }

    // Image Upload trigger
    function triggerImageUpload(imgId) {
      activeUploadImgId = imgId;
      document.getElementById('image-file-input').click();
    }

    // Handle Image upload to Base64 in exported file
    function handleImageFileChange(evt) {
      const file = evt.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        const base64 = e.target.result;
        
        // Update local state and current image element src
        const img = state.gallery.find(i => i.id === activeUploadImgId);
        if (img) {
          img.url = base64;
          const el = document.getElementById('img-element-' + activeUploadImgId);
          if (el) el.src = base64;
          showToast('📷 Imagen actualizada correctamente en el Parque.', '📷');
        }
      };
      reader.readAsDataURL(file);
    }

    // Simple toast mechanism
    let toastTimeout;
    function showToast(message, icon = 'ℹ️') {
      const toast = document.getElementById('toast-notification');
      const toastMsg = document.getElementById('toast-message');
      const toastIcon = document.getElementById('toast-icon');
      
      toastMsg.innerText = message;
      toastIcon.innerText = icon;
      
      toast.classList.remove('translate-x-[400px]', 'opacity-0');
      toast.classList.add('translate-x-0', 'opacity-100');
      
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.add('translate-x-[400px]', 'opacity-0');
        toast.classList.remove('translate-x-0', 'opacity-100');
      }, 3500);
    }
  </script>
</body>
</html>`;
}
