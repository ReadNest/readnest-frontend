import googleIcon from "@/assets/icons8-google.svg";
import facebookIcon from "@/assets/icons8-facebook.svg";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function SocialLoginButtons() {
  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 w-full"
        onClick={() => toast.info("Tính năng chuẩn bị phát triển")}
      >
        <img src={googleIcon} alt="Google" className="w-5 h-5" />
        <span>Google</span>
      </Button>
      <Button
        variant="outline"
        className="flex items-center justify-center gap-2 w-full"
        onClick={() => toast.info("Tính năng chuẩn bị phát triển")}
      >
        <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
        <span>Facebook</span>
      </Button>
    </div>
  );
}
