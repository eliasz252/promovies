"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, X, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaId: number;
  mediaTitle: string;
}

export default function ReportModal({
  isOpen,
  onClose,
  mediaId,
  mediaTitle,
}: ReportModalProps) {
  const [issueType, setIssueType] = useState<string>("video_playback");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mediaId,
          mediaTitle,
          issueType,
          description,
          userEmail: email || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedMessage(data.message || "Report submitted successfully!");
        setTimeout(() => {
          setSubmittedMessage(null);
          setDescription("");
          onClose();
        }, 2500);
      }
    } catch {
      alert("Failed to submit issue report. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          {/* Backdrop Click to Close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg p-6 rounded-2xl bg-[#14141e] border border-violet-500/30 shadow-2xl shadow-violet-950/80 z-10"
          >
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Report an Issue</h3>
                  <p className="text-xs text-slate-400">Title: <span className="text-violet-300 font-semibold">{mediaTitle}</span></p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedMessage ? (
              <div className="py-8 flex flex-col items-center text-center gap-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 animate-bounce" />
                <h4 className="text-base font-semibold text-white">Report Logged</h4>
                <p className="text-sm text-slate-300">{submittedMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Issue Category
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0f] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="video_playback">Video Playback / Stuttering</option>
                    <option value="audio_sync">Audio Out of Sync</option>
                    <option value="incorrect_metadata">Incorrect Metadata or Title</option>
                    <option value="subtitles">Missing or Faulty Subtitles</option>
                    <option value="other">Other Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please provide details about what happened..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0f] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Email (Optional, for updates)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0b0f] border border-white/10 text-slate-200 text-sm focus:outline-none focus:border-violet-500 transition-colors placeholder:text-slate-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-1.5" />
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
