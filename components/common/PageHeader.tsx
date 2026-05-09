import { type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface AppPageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  description,
  badge,
  className,
}: AppPageHeaderProps) {
  return (
    <div className={`mb-8 ${className ?? ""}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
          </div>
          {description && (
            <p className="text-sm text-black pl-0.5">
              {description}
            </p>
          )}
        </div>

        {badge && (
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {badge}
          </div>
        )}
      </div>

      <Separator className="mt-6" />
    </div>
  );
}
