import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TestimonialCard = () => {
  return (
    <Card className="relative w-full max-w-sm shadow-none border-none">
      <CardHeader className="py-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-[15px] text-left leading-none font-semibold">
              Sarah Johnson
            </span>
            <span className="text-sm text-left leading-none text-muted-foreground">
              Active Reader
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-[15px] text-left text-muted-foreground">
          "ReadNest has transformed my reading habits. The recommendations are
          spot-on and I love being part of the community!"
        </p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
