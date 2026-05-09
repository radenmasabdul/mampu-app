import { type ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatItem {
  label: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  valueClassName?: string;
  iconClassName?: string;
};

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
};

export default function StatsCard({ stats, className }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${className ?? ""}`}>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-0! group hover:shadow-sm transition-shadow duration-200 gap-2"
        >
          <CardHeader className="p-4">
            <div className="flex items-center gap-2">
              <div
                className={`size-8 rounded-md flex items-center justify-center shrink-0 ${stat.iconClassName ?? "bg-muted text-muted-foreground"}`}
              >
                {stat.icon}
              </div>
              <CardTitle className="text-xs font-medium font-jakarta text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-1">
            <p
              className={`text-2xl font-bold tabular-nums ${stat.valueClassName ?? "text-foreground"}`}
            >
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
