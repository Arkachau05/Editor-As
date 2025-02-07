import { Blocks, ShieldCheck, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="relative border-t border-gray-700 mt-auto bg-black text-gray-500 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-gray-400">
          <Blocks className="size-5 text-gray-500" />
          <span className="text-xs md:text-sm font-medium">Built for developers, by developers</span>
        </div>
        <div className="flex items-center gap-6 text-xs md:text-sm">
          <Link href="/support" className="flex items-center gap-1 hover:text-white transition">
            <HelpCircle className="size-4 text-gray-500" /> Support
          </Link>
          <Link href="/privacy" className="flex items-center gap-1 hover:text-white transition">
            <ShieldCheck className="size-4 text-gray-500" /> Privacy
          </Link>
          <Link href="/terms" className="flex items-center gap-1 hover:text-white transition">
            <FileText className="size-4 text-gray-500" /> Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
