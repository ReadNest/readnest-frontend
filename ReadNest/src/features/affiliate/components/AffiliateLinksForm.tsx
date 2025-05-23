import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface AffiliateLinksFormProps {
  bookId: string;
  initialAffiliateLinks: AffiliateLink[];
  onSubmit: (links: AffiliateLink[]) => void;
  onCancel?: () => void;
}

export type AffiliateLink = {
  id: number;
  partnerName: string;
  affiliateLink: string;
};

const dummyPartners = ["Amazon", "Tiki", "Fahasa"];

export default function AffiliateLinksForm({
  bookId,
  initialAffiliateLinks,
  onSubmit,
  onCancel,
}: AffiliateLinksFormProps) {
  const [links, setLinks] = useState<AffiliateLink[]>([
    { id: Date.now(), partnerName: "", affiliateLink: "" },
  ]);

  const addLink = () => {
    setLinks((prev) => [
      ...prev,
      { id: Date.now(), partnerName: "", affiliateLink: "" },
    ]);
  };

  const removeLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const updateLink = (
    id: number,
    field: keyof AffiliateLink,
    value: string
  ) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  useEffect(() => {
    if (initialAffiliateLinks && initialAffiliateLinks.length > 0) {
      const formattedLinks = initialAffiliateLinks.map((link, index) => ({
        id: Date.now() + index,
        partnerName: link.partnerName,
        affiliateLink: link.affiliateLink,
      }));
      setLinks(formattedLinks);
    } else {
      setLinks([{ id: Date.now(), partnerName: "", affiliateLink: "" }]);
    }
  }, [initialAffiliateLinks, bookId]);

  return (
    <div className="space-y-4">
      <h2 className="text-base font-medium">Affiliate Links</h2>

      {links.map((link) => (
        <div
          key={link.id}
          className="flex items-center gap-4 bg-muted/20 p-4 rounded-md"
        >
          {/* Partner Dropdown */}
          <div className="flex-1">
            <select
              value={link.partnerName}
              onChange={(e) =>
                updateLink(link.id, "partnerName", e.target.value)
              }
              className="w-full h-10 rounded-md border px-3"
            >
              <option value="">Select partner...</option>
              {dummyPartners.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Affiliate URL input */}
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://"
              value={link.affiliateLink}
              onChange={(e) =>
                updateLink(link.id, "affiliateLink", e.target.value)
              }
            />
          </div>

          {/* Delete button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeLink(link.id)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ))}

      <div>
        <button
          type="button"
          className="text-sm text-primary hover:underline"
          onClick={addLink}
        >
          + Add Another Link
        </button>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setLinks([{ id: Date.now(), partnerName: "", affiliateLink: "" }]);
            onCancel?.();
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => onSubmit(links)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
        >
          Save Affiliate Links
        </Button>
      </div>
    </div>
  );
}
