import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  User, 
  Calendar, 
  Clock, 
  Send, 
  CheckCircle, 
  Download, 
  Building, 
  ChevronRight, 
  Sparkles, 
  Check,
  FileText,
  Briefcase
} from "lucide-react";

interface ContactoProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

const contactTranslations = {
  es: {
    contact_title: "Canales de Contacto y Oficina",
    contact_subtitle: "Comuníquese directamente con los líderes del proyecto y descargue documentación técnica oficial.",
    form_title: "Enviar un Mensaje Directo",
    form_subtitle: "Nuestro equipo responderá a su consulta corporativa en un plazo máximo de 24 horas hábiles.",
    name_label: "Nombre Completo",
    email_label: "Correo Electrónico",
    org_label: "Empresa / Organización",
    subject_label: "Asunto de la Consulta",
    message_label: "Mensaje",
    send_btn: "Enviar Mensaje de Negocios",
    sending: "Procesando envío seguro...",
    success_title: "¡Mensaje Enviado con Éxito!",
    success_desc: "Hemos registrado su solicitud corporativa. Un especialista del equipo de Motor Energy se pondrá en contacto con usted a la brevedad.",
    back_form: "Enviar otro mensaje",
    
    // Subjects
    subj_invest: "Inversión & Financiamiento (Equity/Deuda)",
    subj_epc: "Contratación y Licitaciones EPC",
    subj_land: "Propietarios de Terreno y Servidumbres",
    subj_press: "Prensa, Media y Relaciones Públicas",
    subj_general: "Consultas Generales del Proyecto",

    // Team
    team_title: "Representantes del Proyecto",
    team_subtitle: "Contacte directamente al líder de cada área operativa.",
    role_cdo: "Director de Desarrollo / CDO",
    role_ir: "Relaciones con Inversores",
    role_legal: "Asesor Legal y Permisos",

    // Downloads
    downloads_title: "Documentación y Descargas de Prensa",
    download_btn: "Descargar",
    doc_onepager: "One-Pager Ejecutivo (PDF)",
    doc_environmental: "Estudio de Impacto Ambiental (DIA)",
    doc_engineering: "Diseño Conceptual & Línea Evacuación",

    // Scheduler
    scheduler_title: "Agendar una Reunión Express",
    scheduler_subtitle: "Reserve un bloque de 15 minutos con un especialista técnico de inmediato.",
    select_date: "1. Seleccione un Día",
    select_time: "2. Seleccione un Horario (UTC)",
    book_btn: "Confirmar Reserva de Reunión",
    booking: "Inscribiendo en calendario...",
    book_success: "¡Reunión Confirmada!",
    book_success_desc: "Se ha agendado un bloque de 15 minutos en su calendario. Hemos enviado un enlace de Teams a su correo.",
    days: {
      today: "Hoy",
      tomorrow: "Mañana",
      next_monday: "Próximo Lunes"
    }
  },
  en: {
    contact_title: "Contact Channels & Offices",
    contact_subtitle: "Communicate directly with project leaders and download official technical documentation.",
    form_title: "Send a Direct Message",
    form_subtitle: "Our team will respond to your corporate inquiry within a maximum of 24 business hours.",
    name_label: "Full Name",
    email_label: "Email Address",
    org_label: "Company / Organization",
    subject_label: "Inquiry Subject",
    message_label: "Message",
    send_btn: "Send Business Message",
    sending: "Processing secure transmission...",
    success_title: "Message Sent Successfully!",
    success_desc: "We have registered your corporate request. A specialist from the Motor Energy team will contact you shortly.",
    back_form: "Send another message",

    // Subjects
    subj_invest: "Investment & Financing (Equity/Debt)",
    subj_epc: "EPC Contracting and Tendering",
    subj_land: "Landowners and Easements",
    subj_press: "Press, Media and Public Relations",
    subj_general: "General Project Inquiries",

    // Team
    team_title: "Project Representatives",
    team_subtitle: "Contact the leader of each operational area directly.",
    role_cdo: "Chief Development Officer / CDO",
    role_ir: "Investor Relations Manager",
    role_legal: "Legal & Permitting Counsel",

    // Downloads
    downloads_title: "Documentation & Press Downloads",
    download_btn: "Download",
    doc_onepager: "Executive One-Pager (PDF)",
    doc_environmental: "Environmental Impact Assessment (EIA)",
    doc_engineering: "Conceptual Layout & Grid Interconnection",

    // Scheduler
    scheduler_title: "Schedule an Express Meeting",
    scheduler_subtitle: "Reserve a 15-minute slot with a technical specialist immediately.",
    select_date: "1. Select a Day",
    select_time: "2. Select a Time Slot (UTC)",
    book_btn: "Confirm Meeting Reservation",
    booking: "Booking in calendar...",
    book_success: "Meeting Confirmed!",
    book_success_desc: "A 15-minute block has been scheduled. A Teams conference link has been sent to your email.",
    days: {
      today: "Today",
      tomorrow: "Tomorrow",
      next_monday: "Next Monday"
    }
  },
  zh: {
    contact_title: "联系渠道与办事处",
    contact_subtitle: "直接与项目负责人沟通并下载官方技术文件。",
    form_title: "发送直接留言",
    form_subtitle: "我们的团队将在最多24个工作小时内答复您的企业咨询。",
    name_label: "完整姓名",
    email_label: "电子邮箱",
    org_label: "公司 / 组织机构",
    subject_label: "咨询主题",
    message_label: "留言内容",
    send_btn: "发送商业留言",
    sending: "安全传输处理中...",
    success_title: "留言发送成功！",
    success_desc: "我们已登记您的企业申请。Motor Energy 团队的专家将尽快与您取得联系。",
    back_form: "发送另一条留言",

    // Subjects
    subj_invest: "投资与融资 (股权/债权)",
    subj_epc: "EPC 承包与招标合作",
    subj_land: "土地所有者与地役权",
    subj_press: "媒体新闻与公共关系",
    subj_general: "项目通用信息咨询",

    // Team
    team_title: "项目代表团队",
    team_subtitle: "直接联系各运营领域的负责人。",
    role_cdo: "首席开发官 / CDO",
    role_ir: "投资者关系经理",
    role_legal: "法律与规划审批顾问",

    // Downloads
    downloads_title: "技术文档与新闻下载",
    download_btn: "下载",
    doc_onepager: "项目执行单页摘要 (PDF)",
    doc_environmental: "项目环境影响评估报告 (EIA)",
    doc_engineering: "项目初步工程设计与并网图纸",

    // Scheduler
    scheduler_title: "预约极速会议",
    scheduler_subtitle: "立即与技术专家预定15分钟的高效视频交流板块。",
    select_date: "1. 选择日期",
    select_time: "2. 选择时间段 (UTC)",
    book_btn: "确认预约会议",
    booking: "日程录入中...",
    book_success: "会议预约成功！",
    book_success_desc: "您的日程表中已成功安排15分钟会议。Teams 会议链接已发送至您的邮箱。",
    days: {
      today: "今天",
      tomorrow: "明天",
      next_monday: "下周一"
    }
  }
};

export const Contacto: React.FC<ContactoProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const t = uiTranslations[language] || uiTranslations.es;
  const tc = contactTranslations[language] || contactTranslations.es;

  // Contact form state
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    org: "",
    subject: tc.subj_invest,
    message: ""
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success">("idle");

  // Meeting scheduler state
  const [selectedDay, setSelectedDay] = useState<"today" | "tomorrow" | "next_monday">("today");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [scheduleStatus, setScheduleStatus] = useState<"idle" | "booking" | "confirmed">("idle");

  const handleContactChange = (field: keyof typeof data.contact, value: string) => {
    onChange({ contact: { ...data.contact, [field]: value } });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValues.name || !formValues.email || !formValues.message) return;
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
    }, 1200);
  };

  const handleScheduleSubmit = () => {
    setScheduleStatus("booking");
    setTimeout(() => {
      setScheduleStatus("confirmed");
    }, 1000);
  };

  const phoneLabel = language === "zh" ? "电话" : language === "en" ? "Phone" : "Teléfono";
  const webLabel = language === "zh" ? "网站" : language === "en" ? "Website" : "Sitio Web";

  return (
    <div className="space-y-8 sm:space-y-12" id="section-contacto">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {language === "zh" ? "📬 联系方式" : language === "en" ? "📬 Contact Information" : "📬 Canales de Contacto"}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{tc.contact_subtitle}</p>
      </div>

      {/* Main Grid: Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Corporate info, Representatives, Downloads (7 cols on large screens) */}
        <div className="lg:col-span-5 space-y-6 sm:space-y-8">
          
          {/* Corporate details card */}
          <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl shadow-xs border border-slate-100 dark:border-white/5 space-y-4">
            <h3 className="font-heading text-sm font-bold text-primary dark:text-white uppercase flex items-center gap-2">
              <Building className="w-4 h-4 text-secondary" /> {tc.contact_title}
            </h3>
            
            <div className="space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5 text-slate-500 dark:text-slate-400">
                    {language === "zh" ? "办事处地址" : language === "en" ? "Headquarters Address" : "Dirección Corporativa"}
                  </span>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    <Editable
                      value={data.contact.address}
                      onChange={(val) => handleContactChange("address", val)}
                      isEditing={isEditing}
                      multiline
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold block mb-0.5 text-slate-500 dark:text-slate-400">Email</span>
                  <a 
                    href={`mailto:${data.contact.email}`} 
                    className="font-semibold text-secondary hover:underline text-sm block"
                  >
                    <Editable
                      value={data.contact.email}
                      onChange={(val) => handleContactChange("email", val)}
                      isEditing={isEditing}
                    />
                  </a>
                </div>
              </div>

              {/* Phone & Web */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block mb-0.5 text-slate-500 dark:text-slate-400">{phoneLabel}</span>
                    <a href={`tel:${data.contact.phone}`} className="font-semibold text-slate-800 dark:text-slate-200 hover:text-secondary hover:underline transition-colors block">
                      <Editable
                        value={data.contact.phone}
                        onChange={(val) => handleContactChange("phone", val)}
                        isEditing={isEditing}
                      />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-4 h-4 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-semibold block mb-0.5 text-slate-500 dark:text-slate-400">{webLabel}</span>
                    <a href={`https://${data.contact.web}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-slate-800 dark:text-slate-200 hover:text-secondary hover:underline transition-colors block">
                      <Editable
                        value={data.contact.web}
                        onChange={(val) => handleContactChange("web", val)}
                        isEditing={isEditing}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Representatives (Team) */}
          <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl shadow-xs border border-slate-100 dark:border-white/5 space-y-4">
            <div>
              <h3 className="font-heading text-sm font-bold text-primary dark:text-white uppercase flex items-center gap-2">
                <User className="w-4 h-4 text-secondary" /> {tc.team_title}
              </h3>
              <p className="text-[11px] text-slate-400">{tc.team_subtitle}</p>
            </div>

            <div className="space-y-3">
              {/* Representative 1 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center font-heading font-bold text-secondary text-sm shrink-0">
                  AR
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">Ing. Alejandro Ruiz</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{tc.role_cdo}</p>
                </div>
                <a href={`mailto:a.ruiz@motorenergy.example.com`} className="text-[11px] font-semibold text-secondary hover:underline shrink-0">Email</a>
              </div>

              {/* Representative 2 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center font-heading font-bold text-secondary text-sm shrink-0">
                  HV
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">Dra. Helena Vargas</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{tc.role_ir}</p>
                </div>
                <a href={`mailto:h.vargas@motorenergy.example.com`} className="text-[11px] font-semibold text-secondary hover:underline shrink-0">Email</a>
              </div>

              {/* Representative 3 */}
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100/50 dark:border-white/5">
                <div className="w-10 h-10 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center font-heading font-bold text-secondary text-sm shrink-0">
                  CM
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">Abog. Carlos Mendoza</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{tc.role_legal}</p>
                </div>
                <a href={`mailto:c.mendoza@motorenergy.example.com`} className="text-[11px] font-semibold text-secondary hover:underline shrink-0">Email</a>
              </div>
            </div>
          </div>

          {/* Downloadable files list */}
          <div className="bg-white dark:bg-slate-900/60 p-5 rounded-2xl shadow-xs border border-slate-100 dark:border-white/5 space-y-3.5">
            <h3 className="font-heading text-sm font-bold text-primary dark:text-white uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-secondary" /> {tc.downloads_title}
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded bg-slate-100/30 dark:bg-slate-800/20 text-xs border border-slate-100/30 dark:border-white/5">
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-2">{tc.doc_onepager}</span>
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-white bg-primary rounded hover:bg-opacity-90 transition-colors">
                  <Download className="w-3 h-3" /> {tc.download_btn}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-100/30 dark:bg-slate-800/20 text-xs border border-slate-100/30 dark:border-white/5">
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-2">{tc.doc_environmental}</span>
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-white bg-primary rounded hover:bg-opacity-90 transition-colors">
                  <Download className="w-3 h-3" /> {tc.download_btn}
                </button>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-100/30 dark:bg-slate-800/20 text-xs border border-slate-100/30 dark:border-white/5">
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate pr-2">{tc.doc_engineering}</span>
                <button className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold text-white bg-primary rounded hover:bg-opacity-90 transition-colors">
                  <Download className="w-3 h-3" /> {tc.download_btn}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Form & Scheduler (7 cols on large screens) */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          
          {/* Contact Message Form */}
          <div className="bg-white dark:bg-slate-900/60 p-6 sm:p-8 rounded-2xl shadow-xs border border-slate-100 dark:border-white/5 space-y-5 relative">
            
            <AnimatePresence mode="wait">
              {formStatus === "idle" || formStatus === "sending" ? (
                <motion.form 
                  key="form"
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary dark:text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-secondary animate-pulse" /> {tc.form_title}
                    </h3>
                    <p className="text-xs text-slate-400">{tc.form_subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{tc.name_label} *</label>
                      <input 
                        type="text" 
                        required
                        disabled={formStatus === "sending"}
                        placeholder={language === "zh" ? "请输入名字..." : language === "en" ? "Enter your name..." : "Escriba su nombre..."}
                        value={formValues.name}
                        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{tc.email_label} *</label>
                      <input 
                        type="email" 
                        required
                        disabled={formStatus === "sending"}
                        placeholder={language === "zh" ? "请输入电子邮箱..." : language === "en" ? "Enter your email..." : "correo@empresa.com"}
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Organization */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{tc.org_label}</label>
                      <input 
                        type="text" 
                        disabled={formStatus === "sending"}
                        placeholder={language === "zh" ? "请输入公司机构名称..." : language === "en" ? "Company name..." : "Nombre de su compañía"}
                        value={formValues.org}
                        onChange={(e) => setFormValues({ ...formValues, org: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-secondary transition-colors"
                      />
                    </div>

                    {/* Subject Select */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{tc.subject_label}</label>
                      <select 
                        disabled={formStatus === "sending"}
                        value={formValues.subject}
                        onChange={(e) => setFormValues({ ...formValues, subject: e.target.value })}
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-secondary transition-colors"
                      >
                        <option value={tc.subj_invest}>{tc.subj_invest}</option>
                        <option value={tc.subj_epc}>{tc.subj_epc}</option>
                        <option value={tc.subj_land}>{tc.subj_land}</option>
                        <option value={tc.subj_press}>{tc.subj_press}</option>
                        <option value={tc.subj_general}>{tc.subj_general}</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">{tc.message_label} *</label>
                    <textarea 
                      required
                      rows={4}
                      disabled={formStatus === "sending"}
                      placeholder={language === "zh" ? "请在这里写下您的询问细节..." : language === "en" ? "Describe your inquiry in detail..." : "Describa detalladamente los puntos de su consulta corporativa..."}
                      value={formValues.message}
                      onChange={(e) => setFormValues({ ...formValues, message: e.target.value })}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-lg text-slate-800 dark:text-white focus:outline-none focus:border-secondary transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="w-full bg-secondary hover:bg-opacity-90 text-primary font-bold text-xs uppercase py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {formStatus === "sending" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{tc.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-primary" />
                          <span>{tc.send_btn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="py-6 sm:py-8 text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-2 max-w-lg mx-auto">
                    <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white">
                      {tc.success_title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed font-medium">
                      {tc.success_desc}
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-white/5 text-left text-xs max-w-md mx-auto space-y-2">
                    <p className="font-semibold text-slate-500 border-b border-slate-200/50 dark:border-white/5 pb-1 uppercase tracking-wider text-[9px]">{language === "zh" ? "已提交信息预览" : language === "en" ? "Submitted Message Details" : "Resumen del Mensaje Enviado"}</p>
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-bold">{tc.name_label}:</span> {formValues.name}</p>
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-bold">{tc.email_label}:</span> {formValues.email}</p>
                    {formValues.org && <p className="text-slate-700 dark:text-slate-300"><span className="font-bold">{tc.org_label}:</span> {formValues.org}</p>}
                    <p className="text-slate-700 dark:text-slate-300"><span className="font-bold">{tc.subject_label}:</span> {formValues.subject}</p>
                  </div>

                  <button
                    onClick={() => {
                      setFormValues({ name: "", email: "", org: "", subject: tc.subj_invest, message: "" });
                      setFormStatus("idle");
                    }}
                    className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-primary bg-secondary hover:bg-opacity-95 rounded-lg transition-all"
                  >
                    <span>{tc.back_form}</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Express Scheduler Tool */}
          <div className="bg-gradient-to-br from-primary to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800 space-y-5">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest bg-white/15 text-secondary border border-secondary/20 rounded-full mb-1">
                {language === "zh" ? "极速会面计划" : language === "en" ? "EXPRESS MEETING PLANNER" : "PLANIFICADOR RÁPIDO"}
              </span>
              <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" /> {tc.scheduler_title}
              </h3>
              <p className="text-[11px] text-slate-300">{tc.scheduler_subtitle}</p>
            </div>

            <AnimatePresence mode="wait">
              {scheduleStatus !== "confirmed" ? (
                <motion.div 
                  key="scheduler-inputs" 
                  className="space-y-4"
                  exit={{ opacity: 0 }}
                >
                  {/* Select day */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wider">{tc.select_date}</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button 
                        type="button"
                        onClick={() => setSelectedDay("today")}
                        className={`text-xs p-2.5 rounded-xl border font-bold transition-all text-center ${selectedDay === "today" ? "bg-secondary text-primary border-secondary" : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"}`}
                      >
                        {tc.days.today}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedDay("tomorrow")}
                        className={`text-xs p-2.5 rounded-xl border font-bold transition-all text-center ${selectedDay === "tomorrow" ? "bg-secondary text-primary border-secondary" : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"}`}
                      >
                        {tc.days.tomorrow}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedDay("next_monday")}
                        className={`text-xs p-2.5 rounded-xl border font-bold transition-all text-center ${selectedDay === "next_monday" ? "bg-secondary text-primary border-secondary" : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"}`}
                      >
                        {tc.days.next_monday}
                      </button>
                    </div>
                  </div>

                  {/* Select timeslot */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-300 block uppercase tracking-wider">{tc.select_time}</span>
                    <div className="grid grid-cols-3 gap-2">
                      {["10:00 AM", "02:30 PM", "04:00 PM"].map((time) => (
                        <button 
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`text-xs p-2.5 rounded-xl border font-bold transition-all text-center flex items-center justify-center gap-1.5 ${selectedTime === time ? "bg-secondary text-primary border-secondary" : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"}`}
                        >
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>{time}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit book */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleScheduleSubmit}
                      disabled={scheduleStatus === "booking"}
                      className="w-full bg-white hover:bg-slate-100 text-primary font-bold text-xs uppercase py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {scheduleStatus === "booking" ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{tc.booking}</span>
                        </>
                      ) : (
                        <span>{tc.book_btn}</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="scheduler-success"
                  className="py-4 text-center space-y-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-heading text-base font-bold text-white">{tc.book_success}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">{tc.book_success_desc}</p>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 p-3 rounded-xl text-xs max-w-xs mx-auto space-y-1">
                    <p className="text-slate-300"><span className="font-bold text-secondary">{language === "zh" ? "预定时间" : language === "en" ? "Scheduled:" : "Horario:"}</span> {tc.days[selectedDay]}, {selectedTime}</p>
                    <p className="text-slate-400 font-mono text-[10px]">ID: EV-50MW-ME-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </div>

                  <button
                    onClick={() => setScheduleStatus("idle")}
                    className="text-xs font-bold text-secondary underline hover:text-white"
                  >
                    {language === "zh" ? "重新预约" : language === "en" ? "Book another slot" : "Agendar otra reunión"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Corporate footer banner */}
      <div className="bg-primary text-white p-6 sm:p-8 rounded-2xl shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1.5 max-w-md">
          <span className="font-heading font-extrabold text-lg tracking-wider text-white">
            MOTOR <span className="text-secondary">ENERGY</span>
          </span>
          <p className="text-xs text-slate-300">
            {t.energy_future || "Liderando el desarrollo de la infraestructura energética del futuro."}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300">
          <span className="hover:text-secondary cursor-pointer transition-colors">LinkedIn</span>
          <span>•</span>
          <span className="hover:text-secondary cursor-pointer transition-colors">Twitter</span>
          <span>•</span>
          <span className="hover:text-secondary cursor-pointer transition-colors">Corporate Web</span>
        </div>
      </div>
    </div>
  );
};
