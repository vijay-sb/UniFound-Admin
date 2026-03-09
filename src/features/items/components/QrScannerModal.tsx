import { useState, useRef, useEffect } from "react";
import { X, Camera, Loader2, CheckCircle, AlertTriangle, Keyboard } from "lucide-react";
import { verifyQrCode, handoverItem, type VerifyQrResponse } from "@/api/admin.items.api";
import { Html5Qrcode } from "html5-qrcode";

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
    const [mode, setMode] = useState<"input" | "camera" | "verifying" | "verified" | "handover-done" | "error">("input");
    const [tokenInput, setTokenInput] = useState("");
    const [verifyResult, setVerifyResult] = useState<VerifyQrResponse | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isHandingOver, setIsHandingOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const scannerContainerId = "qr-reader";

    useEffect(() => {
        if (isOpen && mode === "input" && inputRef.current) {
            inputRef.current.focus();
        }
        if (!isOpen) {
            stopCamera();
            setMode("input");
            setTokenInput("");
            setVerifyResult(null);
            setErrorMessage("");
        }
    }, [isOpen]);

    const stopCamera = async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
            } catch {
                // ignore
            }
            scannerRef.current = null;
        }
    };

    const startCamera = async () => {
        setMode("camera");
        // Wait for the DOM element to render
        await new Promise((r) => setTimeout(r, 300));

        const html5QrCode = new Html5Qrcode(scannerContainerId);
        scannerRef.current = html5QrCode;

        try {
            await html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 250 } },
                async (decodedText) => {
                    // Stop scanning after first read
                    await stopCamera();
                    setTokenInput(decodedText);
                    handleVerify(decodedText);
                },
                () => {
                    // ignore scan failures
                }
            );
        } catch (err) {
            setErrorMessage(
                err instanceof Error ? err.message : "Camera not available. Try pasting the token manually."
            );
            setMode("error");
        }
    };

    if (!isOpen) return null;

    const handleVerify = async (token?: string) => {
        const cleaned = (token ?? tokenInput).trim();
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

    const resetToInput = () => {
        stopCamera();
        setMode("input");
        setTokenInput("");
        setErrorMessage("");
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
                    <button onClick={() => { stopCamera(); onClose(); }} className="text-gray-400 hover:text-white">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {/* Input Mode — manual entry */}
                    {mode === "input" && (
                        <div className="space-y-5 text-center">
                            <div className="inline-block px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg mb-2">
                                <p className="text-xs text-emerald-500/60 font-semibold uppercase tracking-wider">
                                    Manual Collection Code Example
                                </p>
                                <p className="text-xl font-black text-emerald-400/40 font-mono tracking-widest mt-1">
                                    A1B2C3
                                </p>
                            </div>
                            
                            <p className="text-sm text-gray-400 max-w-[280px] mx-auto">
                                Ask the student for their <strong>6-digit code</strong> or scan their QR code.
                            </p>
                            
                            <input
                                ref={inputRef}
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
                                placeholder="XXXXXX"
                                maxLength={36}
                                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-5 text-3xl font-black text-white placeholder-gray-800 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20 transition-all text-center font-mono tracking-[0.3em] uppercase"
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleVerify()}
                                    disabled={!tokenInput.trim()}
                                    className="py-3.5 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2"
                                >
                                    <Keyboard className="w-5 h-5" />
                                    Verify Code
                                </button>
                                <button
                                    onClick={startCamera}
                                    className="py-3.5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 font-medium"
                                >
                                    <Camera className="w-5 h-5" />
                                    Scan QR
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Camera Mode */}
                    {mode === "camera" && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-400 text-center">
                                Point the camera at the student's QR code
                            </p>
                            <div
                                id={scannerContainerId}
                                className="w-full rounded-lg overflow-hidden border border-white/10"
                                style={{ minHeight: 280 }}
                            />
                            <button
                                onClick={resetToInput}
                                className="w-full py-2 rounded-lg border border-white/10 text-sm text-gray-400 hover:bg-white/5 flex items-center justify-center gap-2"
                            >
                                <Keyboard className="w-4 h-4" />
                                Switch to Manual Input
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
                                onClick={() => { stopCamera(); onClose(); }}
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
                                onClick={resetToInput}
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
