import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { PresentationData } from "../types";
import { Editable } from "./Editable";
import { uiTranslations } from "../data";

interface GaleriaProps {
  data: PresentationData;
  onChange: (updatedData: Partial<PresentationData>) => void;
  isEditing: boolean;
  language?: "es" | "en" | "zh";
}

export const Galeria: React.FC<GaleriaProps> = ({ data, onChange, isEditing, language = "es" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeImgId, setActiveImgId] = useState<string | null>(null);

  const t = uiTranslations[language] || uiTranslations.es;

  const handleCaptionChange = (id: string, newCaption: string) => {
    const updatedGallery = data.gallery.map((img) => {
      if (img.id === id) {
        return { ...img, caption: newCaption };
      }
      return img;
    });
    onChange({ gallery: updatedGallery });
  };

  const handleDocChange = (idx: number, newVal: string) => {
    const updatedDocs = [...data.documentation];
    updatedDocs[idx] = newVal;
    onChange({ documentation: updatedDocs });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeImgId) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        const updatedGallery = data.gallery.map((img) => {
          if (img.id === activeImgId) {
            return { ...img, url: base64Url };
          }
          return img;
        });
        onChange({ gallery: updatedGallery });
      }
    };
    reader.readAsDataURL(file);
    // Reset file input value
    e.target.value = "";
  };

  const triggerUpload = (id: string) => {
    setActiveImgId(id);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6 sm:space-y-8" id="section-galeria">
      {/* Title block */}
      <div className="border-l-4 border-secondary pl-4 pb-1">
        <h2 className="font-heading text-xl sm:text-2xl font-bold text-primary dark:text-white print-title">
          {t.gallery_title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium">{t.gallery_subtitle}</p>
      </div>

      {/* Hidden File Input for uploading images as Base64 */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-grid">
        {data.gallery.map((img) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden group flex flex-col justify-between"
          >
            {/* Image Wrapper */}
            <div className="relative overflow-hidden h-[220px] bg-gray-bg dark:bg-slate-950">
              <img
                src={img.url}
                alt={img.category}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 left-2 bg-primary/95 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow">
                {img.category}
              </span>
              
              {/* Edit overlay button */}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => triggerUpload(img.id)}
                  className="no-print absolute top-2 right-2 bg-secondary text-primary font-bold text-xs px-2.5 py-1.5 rounded shadow-lg hover:bg-secondary/90 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  📷 {t.change_image || "Cambiar"}
                </button>
              )}
            </div>

            {/* Editable Caption */}
            <div className="p-4 bg-white dark:bg-slate-900 flex-grow border-t border-gray-50 dark:border-white/5">
              <p className="text-xs text-dark/80 dark:text-slate-300 leading-relaxed italic">
                <Editable
                  value={img.caption}
                  onChange={(val) => handleCaptionChange(img.id, val)}
                  isEditing={isEditing}
                  multiline
                />
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Technical Documents (Data Room) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-white/5 space-y-4"
      >
        <h3 className="font-heading text-md font-bold text-primary dark:text-white border-b border-gray-100 dark:border-white/5 pb-2 flex items-center gap-2">
          <span>📁</span> {t.technical_docs}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.documentation.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 rounded bg-gray-bg/30 dark:bg-slate-800/20 hover:bg-gray-bg/50 dark:hover:bg-slate-800/45 transition-colors"
            >
              <span className="text-xl">📄</span>
              <span className="text-xs text-primary dark:text-white font-semibold truncate flex-grow">
                <Editable
                  value={doc}
                  onChange={(val) => handleDocChange(idx, val)}
                  isEditing={isEditing}
                />
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
