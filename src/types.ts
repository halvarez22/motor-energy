export interface KPI {
  id: string;
  icon: string;
  title: string;
  value: string;
  description: string;
}

export interface TechnologyCard {
  id: string;
  icon: string;
  title: string;
  value: string;
  description: string;
}

export interface FinanceRow {
  id: string;
  concept: string;
  value: string;
  category: string;
}

export interface FinancingStructure {
  id: string;
  concept: string;
  percentage: string;
  amount: string;
}

export interface Scenario {
  id: string;
  name: string;
  tir: string;
  van: string;
  payback: string;
}

export interface LegalItem {
  id: string;
  status: "ok" | "pending" | "progress";
  name: string;
  description: string;
}

export interface RiskItem {
  id: string;
  title: string;
  type: string;
  risk: string;
  mitigation: string;
}

export interface ContractItem {
  id: string;
  type: string;
  description: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: string;
}

export interface Milestone {
  id: string;
  period: string;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  web: string;
  address: string;
}

export interface ValueCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PresentationData {
  title: string;
  subtitle: string;
  date: string;
  executiveSummary: string;
  highlightObjective: string;
  kpis: KPI[];
  locationDetails: string[];
  technologies: TechnologyCard[];
  interconnectionDetails: string;
  financeRows: FinanceRow[];
  financingStructure: FinancingStructure[];
  scenarios: Scenario[];
  legalItems: LegalItem[];
  risks: RiskItem[];
  contracts: ContractItem[];
  gallery: GalleryItem[];
  documentation: string[];
  values: ValueCard[];
  ctaText: string;
  ctaButtonText: string;
  timeline: Milestone[];
  contact: ContactInfo;
  videoUrl?: string;
  videoPreset?: string;
}
