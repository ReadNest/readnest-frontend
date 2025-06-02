import { Card, CardContent } from "@/components/ui/card";

interface PremiumFeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PremiumFeatureCard({
  icon,
  title,
  description,
}: PremiumFeatureCardProps) {
  return (
    <Card className="text-center hover:shadow-md transition-all">
      <CardContent className="flex flex-col items-center gap-3 p-6">
        <div className="bg-violet-100 text-violet-600 rounded-full p-3">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
