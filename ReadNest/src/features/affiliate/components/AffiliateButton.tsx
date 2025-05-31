import { Button } from "@/components/ui/button";

interface AffiliateButtonProps {
  partnerName: string;
  affiliateLink: string;
}

const AffiliateButton: React.FC<AffiliateButtonProps> = ({ partnerName, affiliateLink }) => {
  const partner = partnerName.toLowerCase();

  const partnerStyles: Record<string, string> = {
    shopee: "bg-orange-500 hover:bg-orange-600 text-white",
    tiki: "bg-blue-600 hover:bg-blue-700 text-white",
    fahasa: "bg-red-500 hover:bg-red-600 text-white",
    lazada: "bg-purple-600 hover:bg-purple-700 text-white",
  };

  const style = partnerStyles[partner] || "bg-gray-500 hover:bg-gray-600 text-white";

  return (
    <Button
      className={`rounded-full px-4 py-2 text-sm font-medium transition ${style}`}
      onClick={() => window.open(affiliateLink, "_blank")}
    >
      Mua tại {partnerName}
    </Button>
  );
};

export default AffiliateButton;
