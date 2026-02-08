import { useState } from "react";
import { useParams, Link } from "@tanstack/react-router";
import ModernAdminLayout from "@/components/ui/ModernAdminLayout";
import AdminPageHeader from "@/components/ui/AdminPageHeader";
import { ShieldCheck, Plus, CheckCircle, ArrowLeft } from "lucide-react";

type ClaimQuestion = {
  id: string;
  text: string;
};

export default function AdminVerifiedItemPage() {
  const { itemId } = useParams({ strict: false }) as { itemId: string };

  const [questions, setQuestions] = useState<ClaimQuestion[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const generateQuestions = () => {
    setQuestions([
      { id: "q1", text: "Where did you lose this item?" },
      { id: "q2", text: "Describe one unique feature of the item." },
    ]);
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    setQuestions((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: newQuestion },
    ]);
    setNewQuestion("");
  };

  const makeAvailable = () => {
    setIsAvailable(true);
  };

  return (
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
          description="Generate and review claim questions before making the item available."
          icon={ShieldCheck}
        />

        {!isAvailable && (
          <div className="space-y-6">
            <button
              onClick={generateQuestions}
              className="px-4 py-2 text-sm rounded border border-white/10 hover:bg-white/5"
            >
              Generate Questions
            </button>

            {questions.length > 0 && (
              <>
                <div className="space-y-2">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="border border-white/5 rounded px-3 py-2 text-sm text-gray-300"
                    >
                      {q.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Add new question..."
                    className="flex-1 bg-transparent border border-white/10 rounded px-3 py-2 text-sm"
                  />
                  <button
                    onClick={addQuestion}
                    className="px-3 py-2 rounded border border-white/10 hover:bg-white/5"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={makeAvailable}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                >
                  <CheckCircle className="w-4 h-4" />
                  Make Available
                </button>
              </>
            )}
          </div>
        )}

        {isAvailable && (
          <div className="mt-10 p-6 border border-emerald-500/30 rounded-xl text-emerald-400 bg-emerald-500/10">
            Item is now AVAILABLE for claims.
          </div>
        )}
      </div>
    </ModernAdminLayout>
  );
}
