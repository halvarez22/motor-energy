import React, { useState, useEffect, useRef } from "react";

interface EditableProps {
  value: string;
  onChange: (val: string) => void;
  isEditing: boolean;
  className?: string;
  multiline?: boolean;
}

export const Editable: React.FC<EditableProps> = ({
  value,
  onChange,
  isEditing,
  className = "",
  multiline = false,
}) => {
  const [localVal, setLocalVal] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sync with parent state changes
  useEffect(() => {
    setLocalVal(value);
  }, [value]);

  // Auto-resize textarea to fit content height
  useEffect(() => {
    if (isEditing && multiline && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, localVal, multiline]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLocalVal(e.target.value);
    onChange(e.target.value);
  };

  if (!isEditing) {
    return <span className={`${className}`}>{value}</span>;
  }

  const editStyles = "outline-dashed outline-secondary/60 hover:outline-secondary focus:outline-primary bg-amber-50/10 rounded px-1 transition-all w-full cursor-text inline-block focus:bg-amber-50/30";

  if (multiline) {
    return (
      <textarea
        ref={textareaRef}
        value={localVal}
        onChange={handleChange}
        rows={1}
        className={`${className} ${editStyles} resize-none overflow-hidden block focus:ring-0`}
        style={{ minHeight: "24px" }}
      />
    );
  }

  return (
    <input
      type="text"
      value={localVal}
      onChange={handleChange}
      className={`${className} ${editStyles} focus:ring-0`}
    />
  );
};
