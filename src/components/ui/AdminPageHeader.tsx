import type { LucideIcon } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  icon?: LucideIcon;
}

export default function AdminPageHeader({ title, description, icon: Icon }: AdminPageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <Icon className="w-6 h-6 text-[#3ECF8E]" />}
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>
      </div>
      <p className="text-gray-400 text-sm max-w-2xl">
        {description}
      </p>
      <div className="mt-6 h-px w-full bg-gradient-to-r from-[#3ECF8E]/20 to-transparent" />
    </div>
  );
}
