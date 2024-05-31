import toast from "react-hot-toast";

export function copyToClipboard(text: string, message?: string) {
  navigator.clipboard.writeText(text);
  toast.success(message || "Copied to clipboard");
}
