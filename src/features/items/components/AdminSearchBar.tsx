import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

interface AdminSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function AdminSearchBar({
  value,
  onChange,
  placeholder = "Search items by category, zone, or ID...",
}: AdminSearchBarProps) {
  return (
    <div className="relative max-w-md w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9 bg-background/50 border-white/10 focus:border-[#3ECF8E]/50 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
