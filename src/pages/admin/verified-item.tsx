import { useState, useEffect } from "react";
import { useParams, Link } from "@tanstack/react-router";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import {
  ShieldCheck,
  CheckCircle,
  ArrowLeft,
  MapPin,
  Loader2,
  Sparkles,
  Pencil,
  Trash2,
  Plus,
  Image as ImageIcon,
  Tag,
  MapPinned,
  Calendar,
} from "lucide-react";
import AdminGuard from "@/components/AdminGuard";
import {
  generateItemQuestions,
  prepareItem,
  fetchItemImage,
  fetchAdminItems,
} from "@/api/admin.items.api";

type GeneratedQuestion = {
  question: string;
  options: string[];
  correct_option: string;
  is_negative: boolean;
};

type ItemDetails = {
  id: string;
  category: string;
  campusZone: string;
  foundAt: { time: string; valid: boolean };
  status: string;
};

export default function AdminVerifiedItemPage() {
  const { itemId } = useParams({ strict: false }) as { itemId: string };

  const [questions, setQuestions] = useState<GeneratedQuestion[]>([]);
  const [pickupLocation, setPickupLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Item details
  const [itemDetails, setItemDetails] = useState<ItemDetails | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

  // Editing state
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  // Fetch item details + image on mount
  useEffect(() => {
    const load = async () => {
      setIsLoadingDetails(true);
      try {
        // Fetch item details from the admin items list
        const items = await fetchAdminItems();
        const item = items.find((i) => i.id === itemId);
        if (item) {
          setItemDetails({
            id: item.id,
            category: item.category,
            campusZone: item.campusZone,
            foundAt: item.foundAt,
            status: item.status,
          });
        }

        // Fetch image
        try {
          const url = await fetchItemImage(itemId);
          setImageUrl(url);
        } catch {
          // Image might not exist
        }
      } catch {
        // Non-critical error
      } finally {
        setIsLoadingDetails(false);
      }
    };
    load();
  }, [itemId]);

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const result = await generateItemQuestions(itemId);
      setQuestions(result.questions);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate questions"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMakeAvailable = async () => {
    if (!pickupLocation.trim()) {
      setError(
        "Please enter a pickup location before making the item available."
      );
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
      setError(
        err instanceof Error ? err.message : "Failed to prepare item"
      );
    } finally {
      setIsPreparing(false);
    }
  };

  const handleUpdateQuestion = (
    idx: number,
    field: keyof GeneratedQuestion,
    value: string | string[] | boolean
  ) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q))
    );
  };

  const handleDeleteQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
    setEditingIdx(null);
  };

  const handleAddQuestion = () => {
    const newQ: GeneratedQuestion = {
      question: "New question?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct_option: "Option A",
      is_negative: false,
    };
    setQuestions((prev) => [...prev, newQ]);
    setEditingIdx(questions.length);
  };

  function formatDate(ts: string, valid: boolean): string {
    if (!valid) return "Unknown";
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <AdminGuard>
      <ModernAdminLayout>
        <div className="p-4 md:p-8 max-w-4xl">
          <Link
            to="/admin/verified"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Verified Items
          </Link>

          <AdminPageHeader
            title="Prepare Item for Claims"
            description="Review details, generate AI questions, edit them, set pickup location, then publish."
            icon={ShieldCheck}
          />

          {/* Item Details Card */}
          <div className="mt-6 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="md:w-64 h-52 md:h-auto bg-white/5 flex items-center justify-center shrink-0 relative overflow-hidden">
                {isLoadingDetails ? (
                  <Loader2 className="w-6 h-6 text-gray-600 animate-spin" />
                ) : imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Item"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-600">
                    <ImageIcon className="w-8 h-8" />
                    <span className="text-xs">No image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">
                    {itemId.slice(0, 8)}…
                  </span>
                  {itemDetails && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {itemDetails.status}
                    </span>
                  )}
                </div>

                {itemDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Tag className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-gray-500">Category:</span>
                      <span className="text-white font-medium">
                        {itemDetails.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPinned className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-gray-500">Zone:</span>
                      <span className="text-white font-medium">
                        {itemDetails.campusZone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 sm:col-span-2">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-gray-500">Found:</span>
                      <span className="text-white font-medium">
                        {formatDate(
                          itemDetails.foundAt.time,
                          itemDetails.foundAt.valid
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Loading details…</div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!isAvailable && (
            <div className="mt-6 space-y-6">
              {/* Generate Questions */}
              <div className="border border-white/10 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    AI-Generated Questions
                  </h3>
                  <div className="flex gap-2">
                    {questions.length > 0 && (
                      <button
                        onClick={handleAddQuestion}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Add
                      </button>
                    )}
                    <button
                      onClick={handleGenerateQuestions}
                      disabled={isGenerating}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30 transition-colors disabled:opacity-50"
                    >
                      {isGenerating && (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      )}
                      {isGenerating
                        ? "Generating…"
                        : questions.length > 0
                          ? "Regenerate"
                          : "Generate Questions"}
                    </button>
                  </div>
                </div>

                {questions.length === 0 && !isGenerating && (
                  <p className="text-sm text-gray-500 py-4 text-center">
                    Click "Generate Questions" to use AI to create verification
                    questions based on the item image.
                  </p>
                )}

                {/* Questions List */}
                <div className="space-y-3">
                  {questions.map((q, idx) => (
                    <div
                      key={`q-${idx}`}
                      className="border border-white/5 rounded-lg p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group"
                    >
                      {editingIdx === idx ? (
                        /* Editing Mode */
                        <div className="space-y-3">
                          <input
                            value={q.question}
                            onChange={(e) =>
                              handleUpdateQuestion(
                                idx,
                                "question",
                                e.target.value
                              )
                            }
                            className="w-full bg-transparent border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                          />
                          {q.options.map((opt, oi) => (
                            <div key={`edit-opt-${oi}`} className="flex gap-2">
                              <input
                                value={opt}
                                onChange={(e) => {
                                  const newOpts = [...q.options];
                                  newOpts[oi] = e.target.value;
                                  handleUpdateQuestion(
                                    idx,
                                    "options",
                                    newOpts
                                  );
                                  if (q.correct_option === opt) {
                                    handleUpdateQuestion(
                                      idx,
                                      "correct_option",
                                      e.target.value
                                    );
                                  }
                                }}
                                className="flex-1 bg-transparent border border-white/10 rounded px-3 py-1.5 text-xs text-white focus:border-emerald-500/50 focus:outline-none"
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuestion(
                                    idx,
                                    "correct_option",
                                    opt
                                  )
                                }
                                className={`text-xs px-2 py-1 rounded ${
                                  q.correct_option === opt
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-white/5 text-gray-500 hover:text-white"
                                }`}
                              >
                                ✓
                              </button>
                            </div>
                          ))}
                          <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={q.is_negative}
                                onChange={(e) =>
                                  handleUpdateQuestion(
                                    idx,
                                    "is_negative",
                                    e.target.checked
                                  )
                                }
                                className="rounded accent-amber-500"
                              />
                              Negative question
                            </label>
                            <button
                              onClick={() => setEditingIdx(null)}
                              className="text-xs text-emerald-400 hover:underline"
                            >
                              Done
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Display Mode */
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium text-gray-200">
                              <span className="text-gray-500 mr-2">
                                Q{idx + 1}.
                              </span>
                              {q.question}
                            </p>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                onClick={() => setEditingIdx(idx)}
                                className="p-1.5 rounded hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                                title="Edit"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(idx)}
                                className="p-1.5 rounded hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {q.options.map((opt, oi) => (
                              <span
                                key={`opt-${oi}`}
                                className={`text-xs px-2.5 py-1 rounded-md ${
                                  opt === q.correct_option
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-white/5 text-gray-500 border border-white/5"
                                }`}
                              >
                                {String.fromCharCode(65 + oi)}: {opt}
                              </span>
                            ))}
                          </div>
                          {q.is_negative && (
                            <span className="text-xs text-amber-400 mt-2 inline-block">
                              ⚠ Negative question
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pickup Location + Submit */}
              {questions.length > 0 && (
                <div className="border border-white/10 rounded-xl p-5 space-y-4">
                  <label className="flex items-center gap-2 text-sm font-medium text-white">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    Pickup Location
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="e.g. Lost & Found Office, Student Center, Ground Floor"
                    className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none transition-colors"
                  />
                  <p className="text-xs text-gray-500">
                    Students will see this location after their claim is
                    approved.
                  </p>

                  <button
                    onClick={handleMakeAvailable}
                    disabled={isPreparing || !pickupLocation.trim()}
                    className="w-full py-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isPreparing ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    {isPreparing
                      ? "Publishing…"
                      : "Publish to Blind Feed"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Success State */}
          {isAvailable && (
            <div className="mt-8 space-y-4">
              <div className="p-6 border border-emerald-500/30 rounded-xl text-emerald-400 bg-emerald-500/10 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 shrink-0" />
                <div>
                  <p className="font-medium">Item Published!</p>
                  <p className="text-sm text-emerald-400/70 mt-0.5">
                    This item is now available for students to claim on the blind
                    feed.
                  </p>
                </div>
              </div>
              <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-500">Pickup Location:</span>
                  <span className="text-white font-medium">
                    {pickupLocation}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ModernAdminLayout>
    </AdminGuard>
  );
}
