import { useState, useRef, useEffect } from "react";
import { X, Camera, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { verifyQrCode, handoverItem, type VerifyQrResponse } from "@/api/admin.items.api";

interface QrScannerModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHandoverComplete: () => void;
}

export default function QrScannerModal({
    isOpen,
    onClose,
    onHandoverComplete,
}: QrScannerModalProps) {
    const [mode, setMode] = useState<"input" | "verifying" | "verified" | "handover-done" | "error">("input");
    const [tokenInput, setTokenInput] = useState("");
    const [verifyResult, setVerifyResult] = useState<VerifyQrResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isHandingOver, setIsHandingOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            setMode("input");
            setTokenInput("");
            setVerifyResult(null);
            setErrorMessage("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleVerify = async () => {
        const cleaned = tokenInput.trim();
        if (!cleaned) return;

        setMode("verifying");
        try {
            const result = await verifyQrCode(cleaned);
            setVerifyResult(result);
            setMode("verified");
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Invalid QR code");
            setMode("error");
        }
    };

    const handleHandover = async () => {
        if (!verifyResult) return;
        setIsHandingOver(true);
        try {
            await handoverItem(verifyResult.claim_id);
            setMode("handover-done");
            onHandoverComplete();
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Handover failed");
            setMode("error");
        } finally {
            setIsHandingOver(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-lg">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                        <Camera className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-medium text-white">QR Code Verification</h4>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {/* Input Mode */}
                    {mode === "input" && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400">
                                Enter or scan the pickup token ID from the student's QR code.
                            </p>
                            <input
                                ref={inputRef}
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                                placeholder="Paste token ID here..."
                                className="w-full bg-transparent border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-emerald-500/50 focus:outline-none font-mono"
                            />
                            <button
                                onClick={handleVerify}
                                disabled={!tokenInput.trim()}
                                className="w-full py-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Verify QR Code
                            </button>
                        </div>
                    )}

                    {/* Verifying */}
                    {mode === "verifying" && (
                        <div className="flex flex-col items-center py-8 gap-3">
                            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
                            <p className="text-sm text-gray-400">Verifying QR code...</p>
                        </div>
                    )}

                    {/* Verified — show details + handover button */}
                    {mode === "verified" && verifyResult && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-emerald-400">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-sm font-medium">QR Code Valid — Claimant Verified</span>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Category</span>
                                    <span className="text-white">{verifyResult.category}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Campus Zone</span>
                                    <span className="text-white">{verifyResult.campus_zone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Pickup Location</span>
                                    <span className="text-white">{verifyResult.pickup_location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Confidence Score</span>
                                    <span className="text-emerald-400 font-medium">
                                        {verifyResult.confidence_score}%
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Claim ID</span>
                                    <span className="text-gray-300 font-mono text-xs">
                                        {verifyResult.claim_id}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={handleHandover}
                                disabled={isHandingOver}
                                className="w-full py-2.5 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isHandingOver ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Confirm Handover
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* Handover Done */}
                    {mode === "handover-done" && (
                        <div className="flex flex-col items-center py-8 gap-3">
                            <CheckCircle className="w-12 h-12 text-emerald-400" />
                            <p className="text-white font-medium">Handover Complete!</p>
                            <p className="text-sm text-gray-400 text-center">
                                The item has been marked as CLAIMED and will be removed from the student feed.
                            </p>
                            <button
                                onClick={onClose}
                                className="mt-4 px-6 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Close
                            </button>
                        </div>
                    )}

                    {/* Error */}
                    {mode === "error" && (
                        <div className="flex flex-col items-center py-8 gap-3">
                            <AlertTriangle className="w-10 h-10 text-red-400" />
                            <p className="text-red-400 font-medium">Verification Failed</p>
                            <p className="text-sm text-gray-400 text-center">{errorMessage}</p>
                            <button
                                onClick={() => {
                                    setMode("input");
                                    setTokenInput("");
                                    setErrorMessage("");
                                }}
                                className="mt-4 px-6 py-2 rounded-lg border border-white/10 text-sm text-gray-300 hover:bg-white/5"
                            >
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
