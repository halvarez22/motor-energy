import { PresentationData } from "./types";

export const initialPresentationDataES: PresentationData = {
  title: "TRANSFORMAMOS LA ENERGÍA SOLAR EN UNA VENTAJA COMPETITIVA PARA SU EMPRESA.",
  subtitle: "Diseñamos e implementamos sistemas fotovoltaicos de alta eficiencia que reducen costos, fortalecen la sostenibilidad y aumentan la competitividad de su operación.",
  date: "Julio 2026",
  executiveSummary: "Garantizamos la continuidad operativa de su empresa ante apagones, variaciones y fallas en la red eléctrica. Ofrecemos energía confiable, inteligente y sostenible para la industria. Con un enfoque integral estructurado en diagnóstico energético, diseño a la medida, implementación profesional y monitoreo de optimización, convertimos la energía inteligente en una operación sin límites.",
  highlightObjective: "Implementación de soluciones de alta calidad con tecnología de clase mundial, respaldo profesional y sistemas de almacenamiento BESS para asegurar energía confiable para un futuro más competitivo.",
  kpis: [
    {
      id: "kpi-1",
      icon: "💰",
      title: "Ahorro en Costos de Energía",
      value: "20% - 60%",
      description: "Ahorre entre 20% y 60% en su factura eléctrica, reduciendo costos directamente."
    },
    {
      id: "kpi-2",
      icon: "📈",
      title: "Retorno de Inversión Promedio",
      value: "3 - 5 Años",
      description: "Inversión inteligente con retornos competitivos y resultados medibles desde el primer día."
    },
    {
      id: "kpi-3",
      icon: "⏳",
      title: "Vida Útil de los Sistemas",
      value: "+25 Años",
      description: "Mayor estabilidad ante variaciones tarifarias y fallas en la red con tecnología garantizada."
    },
    {
      id: "kpi-4",
      icon: "🌱",
      title: "CO₂ Evitadas Cada Año",
      value: "Toneladas",
      description: "Reduzca su huella de carbono y cumpla directamente con sus objetivos de sustentabilidad ESG."
    }
  ],
  locationDetails: [
    "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, México, C.P. 76146. Ubicación estratégica en la industria del Bajío.",
    "Terreno óptimo con topografía excelente para hincado de estructuras trackers e infraestructura complementaria.",
    "Acceso inmediato a vías de comunicación primarias y cercanía a la subestación de interconexión para evacuación de energía.",
    "Apto para integración de parque fotovoltaico de alta eficiencia y sistemas de almacenamiento de energía (BESS)."
  ],
  technologies: [
    {
      id: "tech-1",
      icon: "🛡️",
      title: "Continuidad Operativa",
      value: "Seguimos produciendo",
      description: "Garantizamos la continuidad de tu empresa ante apagones, variaciones y fallas en la red eléctrica."
    },
    {
      id: "tech-2",
      icon: "💰",
      title: "Reducción de Costos",
      value: "Optimización",
      description: "Disminuye cargos por demanda y optimiza tu consumo energético de forma inteligente."
    },
    {
      id: "tech-3",
      icon: "🔋",
      title: "Almacenamiento Inteligente",
      value: "BESS",
      description: "Almacena energía cuando es más económica y úsala cuando la necesitas en tu operación."
    },
    {
      id: "tech-4",
      icon: "🌱",
      title: "Sostenibilidad y ESG",
      value: "Metas ESG",
      description: "Reduce tu huella de carbono y cumple plenamente con tus objetivos y compromisos ambientales."
    },
    {
      id: "tech-5",
      icon: "⚙️",
      title: "Confiabilidad y Seguridad",
      value: "Protección",
      description: "Protege tus equipos, procesos y cargas críticas ante apagones y picos de voltaje."
    }
  ],
  interconnectionDetails: "El punto de interconexión ha sido formalmente aprobado por el operador de red. Se construirá una línea de transmisión aérea de 115 kV con una longitud de 1.8 km desde la subestación elevadora del proyecto hasta la Subestación de Distribución Principal. El estudio de impacto en el sistema eléctrico de potencia (SIS) confirma que la red cuenta con la capacidad de evacuación necesaria para los 50 MWp sin requerir refuerzos adicionales en el nodo de conexión.",
  financeRows: [
    {
      id: "fin-1",
      concept: "Inversión Inicial (CAPEX)",
      value: "$45,000,000 USD",
      category: "Egresos"
    },
    {
      id: "fin-2",
      concept: "Costo de Operación Anual (OPEX)",
      value: "$850,000 USD/año",
      category: "Egresos"
    },
    {
      id: "fin-3",
      concept: "Ingresos Anuales Proyectados",
      value: "$6,200,000 USD/año",
      category: "Ingresos"
    },
    {
      id: "fin-4",
      concept: "Valor Actual Neto (VAN @ 8%)",
      value: "$18,400,000 USD",
      category: "Retorno"
    },
    {
      id: "fin-5",
      concept: "Tasa Interna de Retorno (TIR)",
      value: "12.50 %",
      category: "Retorno"
    },
    {
      id: "fin-6",
      concept: "Período de Recuperación (Payback)",
      value: "7.8 años",
      category: "Retorno"
    }
  ],
  financingStructure: [
    {
      id: "struct-1",
      concept: "Deuda Bancaria (Project Finance)",
      percentage: "70%",
      amount: "$31,500,000 USD"
    },
    {
      id: "struct-2",
      concept: "Capital Propio (Equity)",
      percentage: "30%",
      amount: "$13,500,000 USD"
    }
  ],
  scenarios: [
    {
      id: "sc-1",
      name: "Escenario Pesimista (-10% Radiación, +5% OPEX)",
      tir: "9.8%",
      van: "$6,100,000 USD",
      payback: "9.2 años"
    },
    {
      id: "sc-2",
      name: "Escenario Base (Valores Esperados / P50)",
      tir: "12.5%",
      van: "$18,400,000 USD",
      payback: "7.8 años"
    },
    {
      id: "sc-3",
      name: "Escenario Optimista (+5% Tarifas, P90 Radiación)",
      tir: "14.2%",
      van: "$24,900,000 USD",
      payback: "6.5 años"
    }
  ],
  legalItems: [
    {
      id: "leg-1",
      status: "ok",
      name: "Derechos sobre el Terreno y Servidumbres",
      description: "Contratos de arrendamiento a largo plazo (35 años) firmados e inscritos en el Registro de la Propiedad."
    },
    {
      id: "leg-2",
      status: "ok",
      name: "Aprobación de Punto de Interconexión",
      description: "Dictamen técnico aprobatorio emitido por el operador nacional de energía y la comisión reguladora."
    },
    {
      id: "leg-3",
      status: "progress",
      name: "Evaluación de Impacto Ambiental (EIA)",
      description: "Estudio ambiental presentado ante la Secretaría. Resolución aprobatoria esperada para Q3 2026."
    },
    {
      id: "leg-4",
      status: "pending",
      name: "Licencia de Construcción Municipal",
      description: "Trámite final ante el gobierno local, condicionado a la obtención del resolutivo ambiental aprobatorio."
    }
  ],
  risks: [
    {
      id: "risk-1",
      title: "Riesgo Regulatorio",
      type: "Político / Normativo",
      risk: "Cambios imprevistos en la legislación de despacho eléctrico o tarifas de transmisión.",
      mitigation: "PPA firmado a largo plazo con tarifas indexadas y cláusulas de protección ante cambios legislativos directos."
    },
    {
      id: "risk-2",
      title: "Riesgo de Construcción",
      type: "Técnico / Operativo",
      risk: "Retrasos en el suministro de módulos o incremento en costos de materiales.",
      mitigation: "Contrato EPC llave en mano a precio cerrado con constructora de primer nivel (Tier 1) y fianzas de fiel cumplimiento."
    },
    {
      id: "risk-3",
      title: "Riesgo Climático",
      type: "Fuerza Mayor",
      risk: "Menor radiación solar promedio o tormentas extraordinarias que dañen los paneles.",
      mitigation: "Diseño estructural con trackers aptos para soportar vientos de hasta 180 km/h y seguro contra pérdidas de rendimiento y daños materiales."
    },
    {
      id: "risk-4",
      title: "Riesgo Cambiario",
      type: "Financiero",
      risk: "Fluctuación del tipo de cambio que afecte la amortización de la deuda internacional.",
      mitigation: "Estructuración de ingresos del PPA denominados 100% en dólares USD, logrando una cobertura natural perfecta con la deuda."
    }
  ],
  contracts: [
    {
      id: "cnt-1",
      type: "Contrato EPC (Engineering, Procurement & Construction)",
      description: "En negociación avanzada con consorcio Tier 1 global. Incluye penalizaciones por retraso en fecha de entrega y garantías de rendimiento técnico."
    },
    {
      id: "cnt-2",
      type: "Contrato O&M (Operation & Maintenance)",
      description: "Contrato de 10 años que cubre mantenimiento preventivo, predictivo (termografía por drones) y correctivo, con compromiso de disponibilidad de planta del 99.0%."
    },
    {
      id: "cnt-3",
      type: "PPA (Power Purchase Agreement)",
      description: "Acuerdo de compra de energía a 15 años firmado con usuario industrial AAA, indexado anualmente a la inflación para proteger los márgenes reales del proyecto."
    }
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      caption: "Vista aérea representativa de la distribución de módulos solares con seguidores de un solo eje (Trackers) para optimizar la captación solar.",
      category: "Parque Solar"
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1200&q=80",
      caption: "Contenedores de almacenamiento de energía mediante baterías de Litio-Hierro-Fosfato (BESS) para gestión de carga y despacho nocturno.",
      category: "Sistema BESS"
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
      caption: "Infraestructura complementaria de energía limpia e integración tecnológica con la red de transmisión nacional.",
      category: "Generación"
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      caption: "Subestación eléctrica elevadora 34.5/115 kV proyectada para conectar de forma segura la planta a la red de distribución principal.",
      category: "Subestación"
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      caption: "Diseño conceptual de ingeniería de detalle y monitoreo SCADA remoto en tiempo real de los parámetros operativos.",
      category: "Ingeniería"
    }
  ],
  documentation: [
    "Plano de Implantación General (Layout 2D / 3D)",
    "Diagrama Unifilar General de la Subestación e Interconexión",
    "Estudio de Simulación Energética de Rendimiento Anual (Pvsyst)",
    "Modelo Financiero Detallado en Excel (Escenarios P50, P90, P99)",
    "Proyecto de Línea de Transmisión de 115 kV aprobado",
    "Informe de Debida Diligencia Social y Ambiental (Due Diligence)"
  ],
  values: [
    {
      id: "val-1",
      icon: "🛡️",
      title: "Protección de Producción",
      description: "Cuando la red falla, tú sigues operando. Protegemos tu continuidad operativa de forma total."
    },
    {
      id: "val-2",
      icon: "💰",
      title: "Ahorros desde el Primer Día",
      description: "Obtenga un retorno de inversión altamente atractivo y minimice los cargos de demanda eléctrica."
    },
    {
      id: "val-3",
      icon: "💎",
      title: "Activo Estratégico",
      description: "Energía como activo estratégico, no como gasto. Más que energía, representamos su ventaja competitiva."
    }
  ],
  ctaText: "El equipo directivo solicita al Honorable Consejo de Administración la aprobación definitiva del presupuesto de inversión de $45,000,000 USD y la autorización para suscribir los contratos EPC y de Financiamiento del Proyecto para dar inicio inmediato a las obras en el mes de Septiembre 2026.",
  ctaButtonText: "Solicitar Aprobación de Fondos",
  timeline: [
    {
      id: "tl-1",
      period: "Q3 2026",
      title: "Aprobación Ambiental & Licencias",
      description: "Obtención del resolutivo aprobatorio de la EIA y trámite final de licencia municipal de construcción."
    },
    {
      id: "tl-2",
      period: "Q4 2026",
      title: "Cierre Financiero & EPC Kick-off",
      description: "Firma de contratos de crédito bancario, desembolso inicial y orden de inicio oficial de la constructora."
    },
    {
      id: "tl-3",
      period: "Q1 2027",
      title: "Arribo de Equipos & Obras Civiles",
      description: "Hincado de postes, montaje de trackers, cimentaciones de inversores BESS y arribo de módulos solares al sitio."
    },
    {
      id: "tl-4",
      period: "Q2 2027",
      title: "Pruebas de Red & Operación Comercial",
      description: "Sincronización a la red nacional, pruebas de energización y declaración de inicio de operación comercial comercial (COD)."
    }
  ],
  contact: {
    email: "contacto@motor-energy.com",
    phone: "+52 (442) 2247003",
    web: "motor-energy.com",
    address: "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, México, C.P. 76146"
  },
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-sunny-day-41619-large.mp4",
  videoPreset: "solar"
};

export const initialPresentationDataEN: PresentationData = {
  title: "WE TRANSFORM SOLAR ENERGY INTO A COMPETITIVE ADVANTAGE FOR YOUR COMPANY.",
  subtitle: "We design and implement high-efficiency photovoltaic systems that reduce costs, strengthen sustainability, and increase the competitiveness of your operation.",
  date: "July 2026",
  executiveSummary: "We guarantee the operational continuity of your company in the face of blackouts, grid variations, and failures. We offer reliable, smart, and sustainable energy for the industry. With a comprehensive approach structured in energy diagnostics, custom design, professional implementation, and optimization monitoring, we turn smart energy into an operation without limits.",
  highlightObjective: "Implementation of high-quality solutions with world-class technology, professional support, and BESS storage systems to ensure reliable energy for a more competitive future.",
  kpis: [
    {
      id: "kpi-1",
      icon: "💰",
      title: "Energy Cost Savings",
      value: "20% - 60%",
      description: "Save between 20% and 60% on your electricity bill, reducing costs directly."
    },
    {
      id: "kpi-2",
      icon: "📈",
      title: "Average Return on Investment",
      value: "3 - 5 Years",
      description: "Smart investment with competitive returns and measurable results from day one."
    },
    {
      id: "kpi-3",
      icon: "⏳",
      title: "Systems Lifespan",
      value: "+25 Years",
      description: "Greater stability against tariff variations and grid failures with guaranteed technology."
    },
    {
      id: "kpi-4",
      icon: "🌱",
      title: "CO₂ Avoided Annually",
      value: "Tons",
      description: "Reduce your carbon footprint and directly meet your ESG sustainability goals."
    }
  ],
  locationDetails: [
    "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, Mexico, C.P. 76146. Strategic location in the Bajío industrial region.",
    "Optimal land with excellent topography for driving tracker structures and complementary infrastructure.",
    "Immediate access to primary communication routes and proximity to the interconnection substation for energy evacuation.",
    "Suitable for integrating a high-efficiency photovoltaic park and Battery Energy Storage Systems (BESS)."
  ],
  technologies: [
    {
      id: "tech-1",
      icon: "🛡️",
      title: "Operational Continuity",
      value: "Always Producing",
      description: "We guarantee your company's operational continuity in the face of blackouts, variations, and failures in the electrical grid."
    },
    {
      id: "tech-2",
      icon: "💰",
      title: "Cost Reduction",
      value: "Optimization",
      description: "Reduce demand charges and intelligently optimize your energy consumption."
    },
    {
      id: "tech-3",
      icon: "🔋",
      title: "Smart Storage",
      value: "BESS",
      description: "Store energy when it is cheapest and use it in your operations when you need it."
    },
    {
      id: "tech-4",
      icon: "🌱",
      title: "Sustainability and ESG",
      value: "ESG Goals",
      description: "Reduce your carbon footprint and fully comply with your environmental objectives and commitments."
    },
    {
      id: "tech-5",
      icon: "⚙️",
      title: "Reliability and Safety",
      value: "Protection",
      description: "Protect your equipment, processes, and critical loads from blackouts and voltage spikes."
    }
  ],
  interconnectionDetails: "The interconnection point has been formally approved by the grid operator. A 1.8 km 115 kV overhead transmission line will be built from the project's step-up substation to the Main Distribution Substation. The electrical system impact study (SIS) confirms that the network has the necessary evacuation capacity for the 50 MWp without requiring additional reinforcement at the connection node.",
  financeRows: [
    {
      id: "fin-1",
      concept: "Initial Investment (CAPEX)",
      value: "$45,000,000 USD",
      category: "Outflows"
    },
    {
      id: "fin-2",
      concept: "Annual Operating Cost (OPEX)",
      value: "$850,000 USD/year",
      category: "Outflows"
    },
    {
      id: "fin-3",
      concept: "Projected Annual Revenue",
      value: "$6,200,000 USD/year",
      category: "Inflows"
    },
    {
      id: "fin-4",
      concept: "Net Present Value (NPV @ 8%)",
      value: "$18,400,000 USD",
      category: "Return"
    },
    {
      id: "fin-5",
      concept: "Internal Rate of Return (IRR)",
      value: "12.50 %",
      category: "Return"
    },
    {
      id: "fin-6",
      concept: "Payback Period",
      value: "7.8 years",
      category: "Return"
    }
  ],
  financingStructure: [
    {
      id: "struct-1",
      concept: "Bank Debt (Project Finance)",
      percentage: "70%",
      amount: "$31,500,000 USD"
    },
    {
      id: "struct-2",
      concept: "Sponsor Equity",
      percentage: "30%",
      amount: "$13,500,000 USD"
    }
  ],
  scenarios: [
    {
      id: "sc-1",
      name: "Pessimistic Scenario (-10% Radiation, +5% OPEX)",
      tir: "9.8%",
      van: "$6,100,000 USD",
      payback: "9.2 years"
    },
    {
      id: "sc-2",
      name: "Base Scenario (Expected Values / P50)",
      tir: "12.5%",
      van: "$18,400,000 USD",
      payback: "7.8 years"
    },
    {
      id: "sc-3",
      name: "Optimistic Scenario (+5% Rates, P90 Radiation)",
      tir: "14.2%",
      van: "$24,900,000 USD",
      payback: "6.5 years"
    }
  ],
  legalItems: [
    {
      id: "leg-1",
      status: "ok",
      name: "Land Rights and Easements",
      description: "Long-term lease agreements (35 years) signed and registered in the Property Registry."
    },
    {
      id: "leg-2",
      status: "ok",
      name: "Interconnection Point Approval",
      description: "Approving technical opinion issued by the national grid operator and the regulatory commission."
    },
    {
      id: "leg-3",
      status: "progress",
      name: "Environmental Impact Assessment (EIA)",
      description: "Environmental study submitted to the Secretariat. Approving resolution expected in Q3 2026."
    },
    {
      id: "leg-4",
      status: "pending",
      name: "Municipal Construction Permit",
      description: "Final procedure with the local government, conditioned on obtaining the positive environmental resolution."
    }
  ],
  risks: [
    {
      id: "risk-1",
      title: "Regulatory Risk",
      type: "Political / Regulatory",
      risk: "Unforeseen changes in electricity dispatch legislation or transmission tariffs.",
      mitigation: "Long-term PPA signed with indexed rates and protection clauses against direct legislative changes."
    },
    {
      id: "risk-2",
      title: "Construction Risk",
      type: "Technical / Operational",
      risk: "Delays in module supply or increase in material costs.",
      mitigation: "Turnkey EPC contract at a closed price with a Tier 1 contractor and performance bonds."
    },
    {
      id: "risk-3",
      title: "Climate Risk",
      type: "Force Majeure",
      risk: "Lower average solar radiation or extraordinary storms damaging the panels.",
      mitigation: "Structural design with trackers capable of withstanding winds up to 180 km/h and insurance against yield loss and physical damage."
    },
    {
      id: "risk-4",
      title: "Exchange Rate Risk",
      type: "Financial",
      risk: "Exchange rate fluctuations affecting the amortization of international debt.",
      mitigation: "PPA revenues denominated 100% in USD, achieving perfect natural hedging with the debt."
    }
  ],
  contracts: [
    {
      id: "cnt-1",
      type: "EPC Contract (Engineering, Procurement & Construction)",
      description: "In advanced negotiations with a global Tier 1 consortium. Includes delay liquidated damages and technical performance guarantees."
    },
    {
      id: "cnt-2",
      type: "O&M Contract (Operation & Maintenance)",
      description: "10-year contract covering preventive, predictive (drone thermography), and corrective maintenance, with a 99.0% plant availability commitment."
    },
    {
      id: "cnt-3",
      type: "PPA (Power Purchase Agreement)",
      description: "15-year power purchase agreement signed with an AAA industrial off-taker, annually indexed to inflation to protect real project margins."
    }
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      caption: "Representative aerial view of solar module layout with single-axis trackers to optimize solar capture.",
      category: "Solar Park"
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1200&q=80",
      caption: "Lithium Iron Phosphate (LFP) battery energy storage system (BESS) containers for load management and night dispatch.",
      category: "BESS System"
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
      caption: "Complementary clean energy infrastructure and technological integration with the national transmission grid.",
      category: "Generation"
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      caption: "Projected 34.5/115 kV step-up substation to safely connect the plant to the main distribution grid.",
      category: "Substation"
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      caption: "Conceptual design of detail engineering and real-time remote SCADA monitoring of operational parameters.",
      category: "Engineering"
    }
  ],
  documentation: [
    "General Layout Plot Plan (2D / 3D Layout)",
    "Substation & Interconnection Single-Line Diagram",
    "Annual Energy Yield Simulation Study (Pvsyst)",
    "Detailed Excel Financial Model (P50, P90, P99 Scenarios)",
    "Approved 115 kV Transmission Line Project",
    "Environmental and Social Due Diligence Report"
  ],
  values: [
    {
      id: "val-1",
      icon: "🛡️",
      title: "Production Protection",
      description: "When the grid fails, you keep operating. We fully protect your operational continuity."
    },
    {
      id: "val-2",
      icon: "💰",
      title: "Savings From Day One",
      description: "Achieve a highly attractive return on investment and minimize demand charges."
    },
    {
      id: "val-3",
      icon: "💎",
      title: "Strategic Asset",
      description: "Energy as a strategic asset, not an expense. More than energy, we are your competitive advantage."
    }
  ],
  ctaText: "The management team formally requests the Honorable Board of Directors' definitive approval of the $45,000,000 USD investment budget and authorization to execute the EPC and Project Financing contracts to start construction immediately in September 2026.",
  ctaButtonText: "Request Funding Approval",
  timeline: [
    {
      id: "tl-1",
      period: "Q3 2026",
      title: "Environmental Approval & Licensing",
      description: "Obtaining EIA approval and final municipal construction permit processing."
    },
    {
      id: "tl-2",
      period: "Q4 2026",
      title: "Financial Close & EPC Kick-off",
      description: "Signing of bank loan agreements, initial disbursement, and construction start order."
    },
    {
      id: "tl-3",
      period: "Q1 2027",
      title: "Equipment Arrival & Civil Works",
      description: "Post driving, tracker assembly, BESS inverter foundations, and solar module site delivery."
    },
    {
      id: "tl-4",
      period: "Q2 2027",
      title: "Grid Testing & Commercial Operation",
      description: "Synchronization with the national grid, commissioning tests, and Commercial Operation Date (COD) declaration."
    }
  ],
  contact: {
    email: "contacto@motor-energy.com",
    phone: "+52 (442) 2247003",
    web: "motor-energy.com",
    address: "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, México, C.P. 76146"
  },
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-sunny-day-41619-large.mp4",
  videoPreset: "solar"
};

export const initialPresentationDataZH: PresentationData = {
  title: "我们将太阳能转化为您企业的竞争优势。",
  subtitle: "我们设计并实施高效光伏系统，降低成本，增强可持续性，并提高您运营的竞争力。",
  date: "2026年7月",
  executiveSummary: "我们保证您的企业在面对停电、电网波动和故障时能够持续运营。我们为行业提供可靠、智能和可持续的能源。通过在能源诊断、定制设计、专业实施和优化监控方面的综合方法，我们将智能能源转化为无限制的运营。",
  highlightObjective: "实施具有世界一流技术、专业支持和 BESS 储能系统的高质量解决方案，以确保可靠的能源，实现更具竞争力的未来。",
  kpis: [
    {
      id: "kpi-1",
      icon: "💰",
      title: "能源成本节约",
      value: "20% - 60%",
      description: "节省20%至60%的电费，直接降低成本。"
    },
    {
      id: "kpi-2",
      icon: "📈",
      title: "平均投资回报期",
      value: "3 - 5 年",
      description: "明智的投资，从第一天起就获得极具竞争力的回报和可衡量的结果。"
    },
    {
      id: "kpi-3",
      icon: "⏳",
      title: "系统使用寿命",
      value: "+25 年",
      description: "凭借有保障的技术，在电价波动和电网故障面前具有更高的稳定性。"
    },
    {
      id: "kpi-4",
      icon: "🌱",
      title: "每年避免的二氧化碳",
      value: "数千吨",
      description: "减少您的碳足迹，直接实现您的 ESG 可持续发展目标。"
    }
  ],
  locationDetails: [
    "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, México, C.P. 76146。位于巴希奥 (Bajío) 工业区的战略位置。",
    "最佳土地，地势平坦，非常适合安装跟踪支架和配套基础设施。",
    "紧邻主要交通要道，靠近并网变电站以方便电能输送。",
    "非常适合集成高效光伏电站和电池储能系统 (BESS)。"
  ],
  technologies: [
    {
      id: "tech-1",
      icon: "🛡️",
      title: "持续运营保障",
      value: "保持不间断生产",
      description: "保障您的企业在面对断电、电压波动和电网故障时仍能不间断运行。"
    },
    {
      id: "tech-2",
      icon: "💰",
      title: "降低运营成本",
      value: "能效优化",
      description: "有效削减需量电费，以智能方式优化您的能源消耗结构。"
    },
    {
      id: "tech-3",
      icon: "🔋",
      title: "智能储能系统",
      value: "BESS 系统",
      description: "在电价谷值时段储存电能，并在企业运营高峰或有需要时灵活释放使用。"
    },
    {
      id: "tech-4",
      icon: "🌱",
      title: "可持续性与 ESG",
      value: "实现 ESG 目标",
      description: "大幅降低您的企业碳足迹，全面契合绿色环保与可持续发展要求。"
    },
    {
      id: "tech-5",
      icon: "⚙️",
      title: "高可靠与高安全",
      value: "全面物理防护",
      description: "在发生停电和瞬时过载电压波动时，全方位保护您的关键设备与精密工艺流程。"
    }
  ],
  interconnectionDetails: "并网点已正式获得电网运营商的批准。将建设一条从项目升压变电站至主配电变电站、长度为1.8公里的115 kV架空输电线路。电网影响研究 (SIS) 确认，电网具备接纳 50 MWp 发电量所需的容量，无需在连接节点进行额外的电网加固。",
  financeRows: [
    {
      id: "fin-1",
      concept: "初始投资 (CAPEX)",
      value: "45,000,000 美元",
      category: "支出"
    },
    {
      id: "fin-2",
      concept: "年度运营成本 (OPEX)",
      value: "每年 850,000 美元",
      category: "支出"
    },
    {
      id: "fin-3",
      concept: "预计年收入",
      value: "每年 6,200,000 美元",
      category: "收入"
    },
    {
      id: "fin-4",
      concept: "净现值 (NPV @ 8%)",
      value: "18,400,000 美元",
      category: "回报"
    },
    {
      id: "fin-5",
      concept: "内部收益率 (IRR)",
      value: "12.50 %",
      category: "回报"
    },
    {
      id: "fin-6",
      concept: "投资回收期 (Payback)",
      value: "7.8 年",
      category: "回报"
    }
  ],
  financingStructure: [
    {
      id: "struct-1",
      concept: "银行贷款 (项目融资)",
      percentage: "70%",
      amount: "31,500,000 美元"
    },
    {
      id: "struct-2",
      concept: "自筹资本 (股权)",
      percentage: "30%",
      amount: "13,500,000 美元"
    }
  ],
  scenarios: [
    {
      id: "sc-1",
      name: "悲观情景 (-10% 辐射量, +5% OPEX)",
      tir: "9.8%",
      van: "6,100,000 美元",
      payback: "9.2 年"
    },
    {
      id: "sc-2",
      name: "基准情景 (预期值 / P50)",
      tir: "12.5%",
      van: "18,400,000 美元",
      payback: "7.8 年"
    },
    {
      id: "sc-3",
      name: "乐观情景 (+5% 电价, P90 辐射量)",
      tir: "14.2%",
      van: "24,900,000 美元",
      payback: "6.5 年"
    }
  ],
  legalItems: [
    {
      id: "leg-1",
      status: "ok",
      name: "土地使用权与地役权",
      description: "已签署长期租赁合同（35年）并在土地登记局完成登记。"
    },
    {
      id: "leg-2",
      status: "ok",
      name: "并网许可批准",
      description: "国家能源运营商和监管委员会已正式出具并网技术许可意见书。"
    },
    {
      id: "leg-3",
      status: "progress",
      name: "环境影响评估 (EIA)",
      description: "环评报告已提交至环保署。预计于 2026 年第三季度获得批准函。"
    },
    {
      id: "leg-4",
      status: "pending",
      name: "市政建设许可证",
      description: "向当地政府提交的最后一道审批程序，以获得环评批准为前提条件。"
    }
  ],
  risks: [
    {
      id: "risk-1",
      title: "监管风险",
      type: "政治 / 法规",
      risk: "电力调度法规或输电费率发生不可预见的变更。",
      mitigation: "已签署长期 PPA，采用指数化费率，并包含防范直接立法变更的保护条款。"
    },
    {
      id: "risk-2",
      title: "建设风险",
      type: "技术 / 运营",
      risk: "光伏组件供应延迟或材料成本增加。",
      mitigation: "与第一梯队 (Tier 1) 承包商签署固定价格、总承包 EPC 合同，并提供履约保函。"
    },
    {
      id: "risk-3",
      title: "气候风险",
      type: "不可抗力",
      risk: "平均太阳辐射低于预期或极端风暴损坏面板。",
      mitigation: "结构设计采用可承受高达180公里/小时风速的跟踪支架，并投保发电量损失险和财产损失险。"
    },
    {
      id: "risk-4",
      title: "汇率风险",
      type: "金融",
      risk: "汇率波动影响国际债务的偿还。",
      mitigation: "PPA 收入 100% 以美元计价，与债务形成完美的自然对冲。"
    }
  ],
  contracts: [
    {
      id: "cnt-1",
      type: "EPC 建设合同 (设计、采购与施工)",
      description: "与全球 Tier 1 联营体进行深入谈判。合同包含工期延误罚款条款及技术性能保证。"
    },
    {
      id: "cnt-2",
      type: "O&M 运营维护合同",
      description: "为期10年的合同，涵盖预防性、预测性（无人机热成像）和纠正性维护，保证电站可用率达 99.0% 以上。"
    },
    {
      id: "cnt-3",
      type: "PPA 购电协议",
      description: "与 AAA 级工业用电大户签署为期15年的购电协议，费率每年随通胀指数化调整，以保护项目实际利润空间。"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80",
      caption: "采用单轴跟踪支架（Trackers）排布的光伏组件空中俯瞰图，以最大化太阳能捕获效率。",
      category: "光伏电区"
    },
    {
      id: "gal-2",
      url: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=1200&q=80",
      caption: "磷酸铁锂 (LFP) 电池储能系统 (BESS) 集装箱，用于负荷管理和夜间电力调度。",
      category: "储能系统"
    },
    {
      id: "gal-3",
      url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
      caption: "配套的清洁能源基础设施以及与国家输电网的技术融合。",
      category: "清洁发电"
    },
    {
      id: "gal-4",
      url: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      caption: "规划建设的 34.5/115 kV 升压变电站，用于将电站安全接入主配网。",
      category: "升压站"
    },
    {
      id: "gal-5",
      url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      caption: "施工图详细设计概念以及对运行参数的实时远程 SCADA 系统监控。",
      category: "工程设计"
    }
  ],
  documentation: [
    "总平面布置图 (2D / 3D Layout Layout)",
    "变电站及并网一次电气单线图",
    "Pvsyst 全年发电量模拟研究报告",
    "详细的 Excel 财务模型 (P50, P90, P99 敏感性情景)",
    "已获批 of 115 kV 输电线路设计方案",
    "环境和社会尽职调查报告 (Due Diligence)"
  ],
  values: [
    {
      id: "val-1",
      icon: "🛡️",
      title: "生产不间断保护",
      description: "当电网断电时，您仍能继续生产。我们全力保障您的业务连续性。"
    },
    {
      id: "val-2",
      icon: "💰",
      title: "首日即见节省成效",
      description: "获取极具吸引力的项目投资回报，并最大程度削减工业需量电费支出。"
    },
    {
      id: "val-3",
      icon: "💎",
      title: "重要战略资产",
      description: "能源不仅是支出，更是企业核心战略资产。我们为您打造独一无二的竞争优势。"
    }
  ],
  ctaText: "管理团队正式提请尊敬的董事会批准 45,000,000 美元的总投资预算，并授权签署 EPC 及项目融资合同，以便在 2026 年 9 月立即破土动工。",
  ctaButtonText: "申请批准项目资金",
  timeline: [
    {
      id: "tl-1",
      period: "2026年第三季度",
      title: "环评批准与许可",
      description: "获得环评批复意见书并完成市政建设许可证的最后办理手续。"
    },
    {
      id: "tl-2",
      period: "2026年第四季度",
      title: "融资闭合与 EPC 启动",
      description: "签署银行贷款协议、首笔提款以及向建设单位下达正式开工令。"
    },
    {
      id: "tl-3",
      period: "2027年第一季度",
      title: "设备到场与土建施工",
      description: "进行打桩、跟踪支架组装、储能系统逆变器基础浇筑，组件陆续运抵现场。"
    },
    {
      id: "tl-4",
      period: "2027年第二季度",
      title: "并网测试与商业运营",
      description: "完成与国家电网并网同步，开展带电测试，并宣告正式商业运营日 (COD)。"
    }
  ],
  contact: {
    email: "contacto@motor-energy.com",
    phone: "+52 (442) 2247003",
    web: "motor-energy.com",
    address: "Avenida Campanario No. 99, Interior 23, Querétaro, Querétaro, México, C.P. 76146"
  },
  videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-solar-panels-on-a-sunny-day-41619-large.mp4",
  videoPreset: "solar"
};

export const uiTranslations: Record<string, Record<string, string>> = {
  es: {
    // Header & Navigation
    portal: "PORTAL CORPORATIVO",
    edit_active: "Desactivar Edición",
    edit_inactive: "Activar Edición",
    save: "Guardar",
    export: "Exportar",
    pdf: "PDF",
    tab_inicio: "Inicio",
    tab_tecnica: "Técnica",
    tab_financiera: "Financiera",
    tab_legal: "Legal",
    tab_galeria: "Galería",
    tab_cierre: "Cierre",
    
    // Inicio Tab
    exec_presentation: "Presentación Ejecutiva",
    presentation_date: "FECHA DE PRESENTACIÓN:",
    kpi: "KPI",
    exec_summary: "Resumen Ejecutivo",
    main_objective: "OBJETIVO PRINCIPAL",
    board_directors: "Consejo de Administración",
    solar_visualizer: "Visualizador de Infraestructura Solar & BESS",
    hd_loop: "Loop Multimedia HD",
    field_projection: "Proyección de Campo",
    media_controls: "CONTROLES MULTIMEDIA",
    media_desc: "Seleccione una toma aérea o introduzca un enlace de vídeo personalizado para ilustrar la escala y geografía de la infraestructura del proyecto.",
    available_shots: "TOMAS DISPONIBLES",
    active_pv_park: "Parque Fotovoltaico Activo",
    wind_turbines: "Turbinas Eólicas Generación",
    solar_plant_aerial: "Planta Solar Vista Aérea",
    custom_video_url: "URL de Vídeo Personalizado (MP4)",
    enter_mp4_url: "Introduzca URL de MP4...",
    integrated_visualizer: "Visualizador dinámico integrado • Almacenamiento local persistente",
    
    // Tecnica Tab
    tech_title: "Viabilidad Técnica e Ingeniería",
    tech_subtitle: "Especificaciones técnicas y análisis de implantación geográfica",
    location_title: "Ubicación y Características del Terreno",
    equipment_title: "Configuración de Equipamiento",
    grid_title: "Interconexión de Red y Evacuación de Energía",
    
    // Financiera Tab
    fin_title: "Análisis Financiero y Retorno",
    fin_subtitle: "Viabilidad económica, estructura de capital y análisis de sensibilidad",
    kpi_indicators: "Indicadores Financieros Clave",
    project_concept: "Concepto del Proyecto",
    category: "Categoría",
    estimated_value: "Valor Estimado",
    financing_title: "Estructura de Financiamiento",
    struct_note_title: "Nota de Estructuración:",
    struct_note_desc: "Modelo financiero estructurado bajo modalidad 'Project Finance' sin recurso, apalancando un 70% de deuda senior.",
    sensitivity_matrix: "Matriz de Sensibilidad de Escenarios",
    est_irr: "TIR Estimada:",
    npv_8: "VAN (8%):",
    payback_lbl: "Payback:",
    cash_flow_projection: "Proyección de Flujo de Caja Acumulado (15 Años)",
    cash_flow_desc: "Muestra el retorno de inversión acumulativo cruzando la línea de equilibrio ($0M) según los supuestos operativos cargados.",
    breakeven: "Equilibrio (Payback)",
    initial_capex: "Inversión CAPEX inicial:",
    roi_projected: "ROI Proyectado",
    scenario_comparison: "Comparativa Dinámica de Escenarios",
    scenario_desc: "Comparación visual del rendimiento según la desviación de variables operativas críticas (Radiación y OPEX).",
    calc_methodology: "Metodología de cálculo: Descuento de flujos al 8.0%",
    
    // Legal Tab
    legal_title: "Marco Legal, Permisos y Riesgos",
    legal_subtitle: "Permisología, contratos clave y estrategia de mitigación de contingencias",
    permits_status: "Estado de Permisos y Autorizaciones",
    contracts_struct: "Estructura Contractual",
    risks_matrix: "Matriz de Mitigación de Riesgos Ejecutivos",
    mitigation_strategy: "Estrategia de Mitigación:",
    
    // Galeria Tab
    gallery_title: "Galería del Proyecto y Documentación",
    gallery_subtitle: "Documentación visual e ingeniería básica del proyecto",
    btn_change_img: "Cambiar",
    data_room: "Documentación Técnica y Estudios Disponibles (Data Room)",
    
    // Cierre Tab
    cierre_title: "Conclusiones y Solicitud de Aprobación",
    cierre_subtitle: "Hitos de ejecución, propuesta de valor y petición formal al Consejo",
    formal_request: "Solicitud Formal de Acuerdo",
    request_board: "Petición al Honorable Consejo de Administración",
    execution_timeline: "Cronograma Crítico de Ejecución (Hitos Clave)",
    energy_future: "Liderando el desarrollo de la infraestructura energética del futuro.",
    
    // Toast notifications
    toast_dark_mode_active: "Modo oscuro activado. Interfaz ejecutiva con tonos cósmicos.",
    toast_dark_mode_inactive: "Modo claro activado. Diseño brillante y profesional.",
    toast_edited_sync: "Presentación sincronizada con cambios guardados localmente.",
    toast_edit_active: "Modo de edición activado. Haga clic en los textos o reemplace imágenes.",
    toast_edit_inactive: "Modo de edición desactivado. No olvide guardar los cambios.",
    toast_saved: "Cambios guardados correctamente en almacenamiento local.",
    toast_export_success: "Presentación exportada con éxito como archivo HTML.",
    toast_export_error: "Error al exportar:",
    toast_print_preview: "Abriendo Vista Previa de Impresión Corporativa...",
    toast_lang_changed: "Idioma cambiado correctamente a Español.",
    
    // Print/PDF Preview
    print_panel_title: "Panel de Vista Previa PDF / Impresión",
    print_panel_desc: "Motor Energy • Preservación de Diseño Corporativo y Maquetación Final",
    print_zoom: "Zoom:",
    print_zoom_compact: "Compacto",
    print_zoom_standard: "Estándar",
    print_zoom_full: "Completo",
    print_simulate_paper: "Simular Papel Claro:",
    print_active: "ACTIVO",
    print_inactive: "INACTIVO",
    print_paper_tip: "Simula cómo se imprimirá en papel blanco real para garantizar un alto contraste",
    print_btn_print: "Imprimir / PDF",
    print_btn_close: "Cerrar",
    print_rec_title: "Recomendación Profesional:",
    print_rec_desc: "En el cuadro de diálogo de impresión de su navegador, asegúrese de activar la casilla \"Gráficos de fondo\" (Background graphics) para conservar los sombreados y acentos del diseño corporativo de Motor Energy.",
    print_sheet_header: "MOTOR ENERGY • DOSSIER CORPORATIVO",
    print_page_of: "PÁGINA {current} de {total} — {name}",
    print_section: "SECCIÓN",
    print_confidential: "Confidencial",
    print_sustainable: "CONEXIÓN SUSTENTABLE"
  },
  en: {
    // Header & Navigation
    portal: "CORPORATE PORTAL",
    edit_active: "Disable Editing",
    edit_inactive: "Enable Editing",
    save: "Save",
    export: "Export",
    pdf: "PDF",
    tab_inicio: "Home",
    tab_tecnica: "Technical",
    tab_financiera: "Financial",
    tab_legal: "Legal",
    tab_galeria: "Gallery",
    tab_cierre: "Closing",
    
    // Inicio Tab
    exec_presentation: "Executive Presentation",
    presentation_date: "PRESENTATION DATE:",
    kpi: "KPI",
    exec_summary: "Executive Summary",
    main_objective: "MAIN OBJECTIVE",
    board_directors: "Board of Directors",
    solar_visualizer: "Solar & BESS Infrastructure Visualizer",
    hd_loop: "HD Multimedia Loop",
    field_projection: "Field Projection",
    media_controls: "MULTIMEDIA CONTROLES",
    media_desc: "Select an aerial shot or enter a custom video URL to illustrate the scale and geography of the project's infrastructure.",
    available_shots: "AVAILABLE SHOTS",
    active_pv_park: "Active PV Solar Park",
    wind_turbines: "Wind Generation Turbines",
    solar_plant_aerial: "Solar Plant Aerial View",
    custom_video_url: "Custom Video URL (MP4)",
    enter_mp4_url: "Enter MP4 URL...",
    integrated_visualizer: "Integrated Dynamic Visualizer • Persistent Local Storage",
    
    // Tecnica Tab
    tech_title: "Technical Feasibility & Engineering",
    tech_subtitle: "Technical specifications and geographic implementation analysis",
    location_title: "Location and Land Characteristics",
    equipment_title: "Equipment Configuration",
    grid_title: "Grid Interconnection and Energy Evacuation",
    
    // Financiera Tab
    fin_title: "Financial Analysis and Return",
    fin_subtitle: "Economic viability, capital structure and sensitivity analysis",
    kpi_indicators: "Key Financial Indicators",
    project_concept: "Project Concept",
    category: "Category",
    estimated_value: "Estimated Value",
    financing_title: "Financing Structure",
    struct_note_title: "Structuring Note:",
    struct_note_desc: "Financial model structured under non-recourse 'Project Finance' modality, leveraging 70% of senior debt.",
    sensitivity_matrix: "Scenario Sensitivity Matrix",
    est_irr: "Projected IRR:",
    npv_8: "NPV (8%):",
    payback_lbl: "Payback:",
    cash_flow_projection: "Accumulated Cash Flow Projection (15 Years)",
    cash_flow_desc: "Shows the cumulative return on investment crossing the breakeven line ($0M) according to loaded operating assumptions.",
    breakeven: "Breakeven (Payback)",
    initial_capex: "Initial CAPEX investment:",
    roi_projected: "Projected ROI",
    scenario_comparison: "Dynamic Scenario Comparison",
    scenario_desc: "Visual performance comparison based on deviations of critical operational variables (Solar Radiation and OPEX).",
    calc_methodology: "Calculation methodology: Discounted cash flows at 8.0%",
    
    // Legal Tab
    legal_title: "Legal Framework, Permits and Risks",
    legal_subtitle: "Permits, key contracts and contingency mitigation strategy",
    permits_status: "Permits and Authorizations Status",
    contracts_struct: "Contractual Structure",
    risks_matrix: "Executive Risk Mitigation Matrix",
    mitigation_strategy: "Mitigation Strategy:",
    
    // Galeria Tab
    gallery_title: "Project Gallery and Documentation",
    gallery_subtitle: "Visual documentation and basic engineering of the project",
    btn_change_img: "Change",
    data_room: "Available Technical Documentation and Studies (Data Room)",
    
    // Cierre Tab
    cierre_title: "Conclusions and Approval Request",
    cierre_subtitle: "Execution milestones, value proposition and formal request to the Board",
    formal_request: "Formal Agreement Request",
    request_board: "Petition to the Honorable Board of Directors",
    execution_timeline: "Critical Execution Schedule (Key Milestones)",
    energy_future: "Leading the development of the energy infrastructure of the future.",
    
    // Toast notifications
    toast_dark_mode_active: "Dark mode enabled. Executive interface with cosmic tones.",
    toast_dark_mode_inactive: "Light mode enabled. Bright and professional design.",
    toast_edited_sync: "Presentation synchronized with locally saved changes.",
    toast_edit_active: "Editing mode enabled. Click on texts or replace images.",
    toast_edit_inactive: "Editing mode disabled. Do not forget to save changes.",
    toast_saved: "Changes saved successfully in local storage.",
    toast_export_success: "Presentation successfully exported as self-contained HTML.",
    toast_export_error: "Export error:",
    toast_print_preview: "Opening Corporate Print Preview...",
    toast_lang_changed: "Language changed successfully to English.",
    
    // Print/PDF Preview
    print_panel_title: "PDF / Print Preview Panel",
    print_panel_desc: "Motor Energy • Preservation of Corporate Design and Final Layout",
    print_zoom: "Zoom:",
    print_zoom_compact: "Compact",
    print_zoom_standard: "Standard",
    print_zoom_full: "Full",
    print_simulate_paper: "Simulate Light Paper:",
    print_active: "ACTIVE",
    print_inactive: "INACTIVE",
    print_paper_tip: "Simulates how it will print on real white paper to ensure high contrast",
    print_btn_print: "Print / PDF",
    print_btn_close: "Close",
    print_rec_title: "Professional Recommendation:",
    print_rec_desc: "In your browser's print dialog, make sure to check \"Background graphics\" to preserve Motor Energy's corporate design shadings and accents.",
    print_sheet_header: "MOTOR ENERGY • CORPORATE DOSSIER",
    print_page_of: "PAGE {current} of {total} — {name}",
    print_section: "SECTION",
    print_confidential: "Confidential",
    print_sustainable: "SUSTAINABLE CONNECTION"
  },
  zh: {
    // Header & Navigation
    portal: "企业门户网站",
    edit_active: "关闭编辑模式",
    edit_inactive: "开启编辑模式",
    save: "保存",
    export: "导出",
    pdf: "PDF 导出",
    tab_inicio: "首 页",
    tab_tecnica: "技术可行性",
    tab_financiera: "财务分析",
    tab_legal: "法律与合规",
    tab_galeria: "项目图库",
    tab_cierre: "提请批准",
    
    // Inicio Tab
    exec_presentation: "执行报告",
    presentation_date: "汇报日期:",
    kpi: "关键绩效指标",
    exec_summary: "执行摘要",
    main_objective: "核心目标",
    board_directors: "董事会成员",
    solar_visualizer: "光伏与储能基础设施可视化系统",
    hd_loop: "高清多媒体循环放映",
    field_projection: "实地投影演示",
    media_controls: "多媒体控制台",
    media_desc: "选择航拍画面或输入自定义视频网址，直观展示项目基础设施的规模和地理环境。",
    available_shots: "可用画面",
    active_pv_park: "光伏电区实景",
    wind_turbines: "风能发电涡轮",
    solar_plant_aerial: "光伏电站俯瞰",
    custom_video_url: "自定义视频网址 (MP4)",
    enter_mp4_url: "请输入 MP4 视频链接...",
    integrated_visualizer: "集成式动态展示终端 • 独立本地存储",
    
    // Tecnica Tab
    tech_title: "技术可行性与工程设计",
    tech_subtitle: "技术规格及地理部署分析",
    location_title: "土地位置与物理特性",
    equipment_title: "设备配置标准",
    grid_title: "电网接纳与输电规划",
    
    // Financiera Tab
    fin_title: "财务指标与投资回报",
    fin_subtitle: "经济可行性、资本结构及敏感性分析",
    kpi_indicators: "核心财务指标",
    project_concept: "项目会计科目",
    category: "财务分类",
    estimated_value: "账面估值",
    financing_title: "项目融资格局",
    struct_note_title: "项目融资备注:",
    struct_note_desc: "采用无追索权项目融资模式 (Project Finance) 组建，杠杆借调 70% 的高级债务支撑。",
    sensitivity_matrix: "项目情景敏感性矩阵",
    est_irr: "预计内部收益率 (IRR):",
    npv_8: "净现值 (NPV @ 8%):",
    payback_lbl: "静态回收期:",
    cash_flow_projection: "15年期累计现金流预测",
    cash_flow_desc: "基于当前的经营假设，展示跨越盈亏平衡点（0百万美元）的累计投资回报曲线。",
    breakeven: "盈亏平衡线 (Payback)",
    initial_capex: "初始 CAPEX 投入:",
    roi_projected: "预期投资回报率 (ROI)",
    scenario_comparison: "情景动态分析与比对",
    scenario_desc: "直观展示两大核心运行变量（光照辐射度及 OPEX）发生偏离时的电站资产绩效。",
    calc_methodology: "计算口径说明: 折现率基于 8.0%",
    
    // Legal Tab
    legal_title: "合规审查、许可核准与风险控制",
    legal_subtitle: "项目行政审批、核心合同架构及防灾策略",
    permits_status: "项目行政核准及许可证状态",
    contracts_struct: "核心合同法律架构",
    risks_matrix: "高管风险规避与对冲矩阵",
    mitigation_strategy: "风险缓释措施:",
    
    // Galeria Tab
    gallery_title: "项目图像成果与数据室",
    gallery_subtitle: "视觉勘测记录及项目初步工程设计文本",
    btn_change_img: "更换图片",
    data_room: "Data Room 现有技术论证与模拟报告清单",
    
    // Cierre Tab
    cierre_title: "战略结论与投资决策表决提议",
    cierre_subtitle: "关键工程时间节点、项目价值主张及致董事会正式表决提请",
    formal_request: "正式表决议案",
    request_board: "呈报董事会表决请示",
    execution_timeline: "关键进度路线图（里程碑）",
    energy_future: "引领未来绿色能源基础设施建设，共筑零碳未来。",
    
    // Toast notifications
    toast_dark_mode_active: "深色模式已启用。高管尊享黑曜石深邃界面。",
    toast_dark_mode_inactive: "浅色模式已启用。清新高对比度办公视觉风格。",
    toast_edited_sync: "本地缓存内容已自动载入最新修改。",
    toast_edit_active: "编辑模式已开启。直接点击任意文本或选择新图进行即时更新。",
    toast_edit_inactive: "编辑模式已关闭。请确认已点击保存以使更新生效。",
    toast_saved: "所有变更已成功写入本地安全存储空间。",
    toast_export_success: "成功导出单文件、自适应的可交互 HTML 文件。",
    toast_export_error: "导出失败:",
    toast_print_preview: "正在构建和渲染企业级 PDF 打印预览页面...",
    toast_lang_changed: "语言环境已切换为中文。",
    
    // Print/PDF Preview
    print_panel_title: "PDF 打印与预览中枢",
    print_panel_desc: "Motor Energy • 企业排版规范及高保真输出渲染控制",
    print_zoom: "比例:",
    print_zoom_compact: "紧凑",
    print_zoom_standard: "标准",
    print_zoom_full: "宽幅",
    print_simulate_paper: "纸质输出仿真:",
    print_active: "已开启",
    print_inactive: "已关闭",
    print_paper_tip: "模拟真实白纸打印效果，隐藏辅助背景色，确保高可读性与墨水兼容性",
    print_btn_print: "开始打印 / 存为 PDF",
    print_btn_close: "返回",
    print_rec_title: "专业排版建议:",
    print_rec_desc: "在浏览器弹出的打印设置选项中，请务必勾选 \"背景图形\" (Background graphics) 以完美保留 Motor Energy 企业VI系统中的各类渐变色、阴影及视觉高亮。",
    print_sheet_header: "MOTOR ENERGY • 高管决策白皮书",
    print_page_of: "第 {current} 页 / 共 {total} 页 — {name}",
    print_section: "篇章",
    print_confidential: "机密级文档",
    print_sustainable: "可持续并网技术保障"
  }
};
