import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useMutation } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { X, Pen } from "lucide-react";
import toast from "react-hot-toast";

function ShareSnippetDialog({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const { language, getCode } = useCodeEditorStore();
  const createSnippet = useMutation(api.snippets.createSnippet);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSharing(true);

    try {
      const code = getCode();
      await createSnippet({ title, language, code });
      onClose();
      setTitle("");
      toast.success("Snippet shared successfully!");
    } catch (error) {
      console.error("Error creating snippet:", error);
      toast.error("Error creating snippet");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-[#1b1b29] border border-gray-700 shadow-2xl rounded-xl p-6 w-full max-w-md relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Pen className="w-6 h-6 text-gray-300" />
          <h2 className="text-2xl font-semibold text-white">Share Snippet</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleShare} className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">
              Snippet Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-[#12121c] border border-[#29293d] rounded-lg text-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter snippet title"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 
              rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSharing}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium 
              rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
            >
              {isSharing ? "Sharing..." : "Share Snippet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShareSnippetDialog;
