import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	BrainCircuit,
	ChevronDown,
	Cpu,
	Download,
	FileSearch,
	Fingerprint,
	ImageIcon,
	ScanLine,
	ShieldCheck,
	Sparkles,
	Zap,
} from "lucide-react";

export default function AdminLandingPage() {
	return (
		<div className="min-h-screen flex flex-col bg-[#0f0f11] relative overflow-hidden font-sans selection:bg-emerald-500/30">
			{/* ── Background Ambient Glows (No Grid) ── */}
			<div className="fixed inset-0 z-0 pointer-events-none">
				<div className="absolute left-1/4 top-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[150px]" />
				<div className="absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-teal-500/10 blur-[150px]" />
			</div>

			{/* ── Main Content Container ── */}
			<main className="relative z-10 flex-1 flex flex-col items-center w-full">
				{/* ── 1. HERO SECTION ── */}
				<section className="w-full max-w-6xl px-6 min-h-[85vh] flex flex-col justify-center items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
					<div className="text-center mb-10 mt-[-8vh] flex flex-col items-center">
						{/* Big Logo */}
						<img
							src="/unifound-logo-v2.png"
							alt="UniFound Logo"
							className="w-72 md:w-96 lg:w-[450px] h-auto object-contain drop-shadow-[0_0_25px_rgba(62,207,142,0.4)] -mb-8 hover:scale-[1.02] transition-transform duration-500"
						/>

						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3ECF8E]/20 bg-[#3ECF8E]/5 text-[#3ECF8E] text-sm font-semibold mb-6 tracking-wide">
							<Sparkles className="w-4 h-4" />
							University Level Administration Hub
						</div>

						<h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.1] mb-6">
							Command Center for <br className="hidden md:block" />
							<span className="bg-gradient-to-r from-[#3ECF8E] to-teal-400 bg-clip-text text-transparent drop-shadow-sm">
								Lost & Found Intelligence
							</span>
						</h1>

						<p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
							Equip your campus security and administrative teams with AI-driven
							tools to verify, track, and reunite lost items with surgical
							precision.
						</p>
					</div>

					{/* CTA Buttons */}
					<div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
						<Link
							to="/admin/login"
							className="group/btn relative overflow-hidden bg-[#3ECF8E] text-black font-bold py-4 px-10 rounded-2xl transition-all duration-300 hover:bg-[#34b078] hover:shadow-[0_0_40px_rgba(62,207,142,0.3)] text-base"
						>
							<div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
							<span className="relative flex items-center gap-2">
								Access Gateway
								<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
							</span>
						</Link>
						<a
							href="/unifound.apk"
							download="unifound.apk"
							className="group/dl relative overflow-hidden bg-white/5 border border-white/10 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 text-base backdrop-blur-md"
						>
							<span className="relative flex items-center gap-2">
								<Download className="w-5 h-5 text-[#3ECF8E] group-hover/dl:-translate-y-0.5 transition-transform" />
								Download Student App
							</span>
						</a>
					</div>

					<div className="mt-20 text-gray-600 animate-bounce">
						<ChevronDown className="w-8 h-8" />
					</div>
				</section>

				{/* ── 2. AI INTELLIGENCE SECTION ── */}
				<section className="w-full max-w-7xl px-6 py-24 md:py-32">
					<div className="flex flex-col md:flex-row items-center gap-16">
						<div className="flex-1 space-y-8">
							<div className="w-16 h-16 rounded-2xl bg-[#3ECF8E]/10 flex items-center justify-center border border-[#3ECF8E]/20">
								<BrainCircuit className="w-8 h-8 text-[#3ECF8E]" />
							</div>
							<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
								Powered by <br />
								<span className="text-[#3ECF8E]">Adaptive AI</span>
							</h2>
							<p className="text-gray-400 text-lg leading-relaxed">
								UniFound isn't just a database. It actively analyzes submitted
								item photos, matches visual characteristics, and predicts
								ownership probability using our proprietary Adaptive Attention
								Model.
							</p>

							<ul className="space-y-4">
								{[
									"Automated Image Preprocessing & Tagging",
									"Confidence Scoring on Claim Matches",
									"Fraudulent Claim Detection",
								].map((item) => (
									<li
										key={item}
										className="flex items-center gap-3 text-gray-300 font-medium"
									>
										<Zap className="w-5 h-5 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
										{item}
									</li>
								))}
							</ul>
						</div>

						{/* Visual Flair for AI section */}
						<div className="flex-1 relative w-full aspect-square md:aspect-[4/3] rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.02] to-[#3ECF8E]/5 backdrop-blur-3xl overflow-hidden flex items-center justify-center">
							<div className="absolute inset-0 bg-[#3ECF8E]/10 blur-[80px] rounded-full" />

							{/* Scanning Animation Container */}
							<div className="relative z-10 w-3/4 aspect-video rounded-2xl border border-[#3ECF8E]/30 bg-[#0a0a0b] shadow-[0_0_50px_rgba(62,207,142,0.15)] overflow-hidden flex items-center justify-center group">
								{/* Base Image/Icon */}
								<ImageIcon className="w-24 h-24 text-gray-700/50 group-hover:text-gray-600 transition-colors" />

								{/* Overlay / Detected Box */}
								<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
									<div className="w-32 h-32 border-2 border-[#3ECF8E]/80 rounded-lg shadow-[0_0_15px_rgba(62,207,142,0.5)] relative flex items-center justify-center bg-[#3ECF8E]/5">
										<ScanLine className="w-12 h-12 text-[#3ECF8E] animate-pulse" />
										{/* Confidence Badge */}
										<div className="absolute -top-3 -right-3 bg-[#3ECF8E] text-black text-[10px] font-bold px-2 py-1 rounded-md shadow-lg">
											98.5% MATCH
										</div>
									</div>
								</div>

								{/* Scanning Laser Line */}
								<div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
									<div className="w-full h-0.5 bg-emerald-400 shadow-[0_0_15px_#3ECF8E] animate-[ping_2.5s_ease-in-out_infinite] opacity-70" />
									<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#3ECF8E]/5 to-transparent h-[150%] animate-[pulse_3s_linear_infinite] opacity-30" />
								</div>
							</div>

							{/* Floating Elements */}
							<div className="absolute top-8 right-8 p-3 rounded-xl bg-[#111] border border-white/10 shadow-xl animate-pulse">
								<Cpu className="w-6 h-6 text-teal-400" />
							</div>
							<div
								className="absolute bottom-8 left-8 p-3 rounded-xl bg-[#111] border border-white/10 shadow-xl"
								style={{ animation: "pulse 3s infinite 1s" }}
							>
								<Fingerprint className="w-6 h-6 text-[#3ECF8E]" />
							</div>
						</div>
					</div>
				</section>

				{/* ── 3. CORE PLATFORM FEATURES ── */}
				<section className="w-full max-w-7xl px-6 py-24 md:py-32">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
							Administrative Dominance
						</h2>
						<p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
							Everything you need to maintain order, process claims rapidly, and
							provide transparency across the campus ecosystem.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
						{[
							{
								icon: ShieldCheck,
								title: "Strict Verification",
								description:
									"Items don't go public until an admin verifies them. Review submissions with integrated image analysis to filter out spam or prohibited items.",
							},
							{
								icon: FileSearch,
								title: "Claim Management",
								description:
									"When a user claims an item, administrators receive detailed claim parameters. Approve or deny claims instantly with recorded justifications.",
							},
							{
								icon: Fingerprint,
								title: "Immutable Audit Trail",
								description:
									"Every status change, claim action, and admin task is logged securely. Maintain complete accountability for campus security audits.",
							},
						].map((feat) => (
							<div key={feat.title} className="group relative">
								<div className="absolute -inset-0.5 bg-gradient-to-b from-[#3ECF8E]/40 to-transparent rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700" />
								<div className="relative h-full backdrop-blur-xl bg-[#0a0a0b] border border-white/[0.05] rounded-3xl p-8 flex flex-col gap-5 transition-transform duration-500 group-hover:-translate-y-2">
									<div className="w-14 h-14 rounded-2xl bg-[#3ECF8E]/10 flex items-center justify-center border border-[#3ECF8E]/20">
										<feat.icon className="w-6 h-6 text-[#3ECF8E]" />
									</div>
									<h3 className="text-white font-bold text-xl mt-2">
										{feat.title}
									</h3>
									<p className="text-gray-400 text-base leading-relaxed">
										{feat.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</section>

				{/* ── Footer ── */}
				<footer className="w-full border-t border-white/5 py-12 px-6 mt-12 bg-[#09090a]">
					<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
						<div className="flex items-center gap-3">
							<img
								src="/unifound-logo-v2.png"
								alt="Logo"
								className="h-6 opacity-50 grayscale"
							/>
						</div>
						<p className="text-gray-600 text-xs font-medium tracking-widest uppercase">
							Secure Encrypted Portal • UniFound Admin Systems © 2026
						</p>
					</div>
				</footer>
			</main>
		</div>
	);
}
