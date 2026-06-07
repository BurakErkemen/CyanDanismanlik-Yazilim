import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "./cn";

const fieldBase =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 bg-inset/80 " +
  "border border-white/10 transition-colors duration-200 " +
  "focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/30";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  const input = <input id={id} className={cn(fieldBase, className)} {...props} />;
  if (!label) return input;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-gray-400">{label}</span>
      {input}
    </label>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const area = <textarea id={id} className={cn(fieldBase, "resize-y", className)} {...props} />;
  if (!label) return area;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-gray-400">{label}</span>
      {area}
    </label>
  );
}
