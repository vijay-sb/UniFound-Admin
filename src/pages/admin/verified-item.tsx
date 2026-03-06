import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ShieldCheck, CheckCircle, ArrowLeft, MapPin, Loader2 } from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import { generateItemQuestions, prepareItem } from "@/api/admin.items.api";

type GeneratedQuestion = {
  question: string;
  options: string[];
  correct_option: string;
  is_negative: boolean;
};

export default function AdminVerifiedItemPage() {
  const { itemId } = useParams({ strict: false }) as { itemId: string };

  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateItemQuestions(itemId);
      setQuestions(result.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate questions");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMakeAvailable = async () => {
    if (!pickupLocation.trim()) {
      setError("Please enter a pickup location before making the item available.");
      return;
    }
    if (questions.length === 0) {
      setError("Please generate questions first.");
      return;
    }

    setIsPreparing(true);
    setError(null);
    try {
      await prepareItem(itemId, {
        questions,
        pickup_location: pickupLocation.trim(),
      });
      setIsAvailable(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to prepare item");
    } finally {
      setIsPreparing(false);
    }
  };

  return (
    <AdminGuard>
      <ModernAdminLayout>
        <div className="p-8 max-w-3xl">
          <Link
            to="/admin/verified"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Verified Items
          </Link>

          <AdminPageHeader
            title={`Prepare Item #${itemId}`}
            description="Generate questions, set a pickup location, then make the item available."
            icon={ShieldCheck}
          />

          {error && (
            <div className="mb-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!isAvailable && (
            <div className="space-y-6">
              {/* Generate Questions Button */}
              <button
                onClick={handleGenerateQuestions}
                disabled={isGenerating}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded border border-white/10 hover:bg-white/5 disabled:opacity-50"
              >
                {isGenerating && <Loader2 className="w-4 h-4 animate-spin" />}
                {isGenerating ? "Generating..." : "Generate Questions"}
              </button>

              {questions.length > 0 && (
                <>
                  {/* Questions List */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-300 mb-2">
                      Generated Questions ({questions.length})
                    </h3>
                    {questions.map((q, idx) => (
                      <div
                        key={`q-${idx}`}
                        className="border border-white/5 rounded px-3 py-2 text-sm text-gray-300"
                      >
                        <p className="font-medium">{q.question}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {q.options.map((opt, oi) => (
                            <span
                              key={`opt-${oi}`}
                              className={`text-xs px-2 py-0.5 rounded ${opt === q.correct_option
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-white/5 text-gray-500"
                                }`}
                            >
                              {String.fromCharCode(65 + oi)}: {opt}
                            </span>
                          ))}
                        </div>
                        {q.is_negative && (
                          <span className="text-xs text-amber-400 mt-1 inline-block">
                            ⚠ Negative question
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Pickup Location Input */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      Pickup Location
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      placeholder="e.g. Lost & Found Office, Student Center, Ground Floor"
                      className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                    />
                    <p className="text-xs text-gray-500">
                      This location will be shown to the student after their claim is approved, so they know where to collect the item.
                    </p>
                  </div>

                  {/* Make Available Button */}
                  <button
                    onClick={handleMakeAvailable}
                    disabled={isPreparing || !pickupLocation.trim()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPreparing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {isPreparing ? "Preparing..." : "Make Available"}
                  </button>
                </>
              )}
            </div>
          )}

          {isAvailable && (
            <div className="mt-10 space-y-4">
              <div className="p-6 border border-emerald-500/30 rounded-xl text-emerald-400 bg-emerald-500/10">
                ✅ Item is now AVAILABLE for claims.
              </div>
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Pickup Location:</span>
                  <span className="text-white">{pickupLocation}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModernAdminLayout>
    </AdminGuard>
  );
}
