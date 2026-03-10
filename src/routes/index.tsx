import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Smartphone, ShieldCheck, Search, QrCode, BrainCircuit, Database, FileText, MessageCircleQuestion } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: LandingPage,
})

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-emerald-500/30 selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded text-white">
              <Search className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold text-white tracking-tight">
              UniFound
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Features
            </a>
            <Link
              to="/admin/login"
              className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-500 transition-colors"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section - Split Layout */}
      <main className="max-w-7xl mx-auto px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            System Online
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] text-white">
            Streamlined <span className="text-emerald-500">Lost & Found</span> Management
          </h1>
          
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
            A comprehensive administrative dashboard designed for universities and large organizations to efficiently track, verify, and return lost items.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              to="/admin/login"
              className="px-8 py-4 rounded-lg bg-emerald-600 text-white font-semibold text-lg hover:bg-emerald-500 transition-colors shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_-5px_rgba(16,185,129,0.6)] border border-emerald-500/50 text-center flex items-center justify-center gap-2"
            >
              Access Portal <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              className="px-8 py-4 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium text-lg hover:bg-slate-800 hover:text-white transition-colors text-center flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5" /> Download App
            </button>
          </div>
        </div>

        {/* Hero Illustration / Dashboard Preview Placeholder */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden aspect-video flex flex-col items-center justify-center p-8 text-center ring-1 ring-white/5">
             <div className="absolute inset-x-0 top-0 h-10 border-b border-slate-800 bg-slate-950/50 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
             </div>
             <ShieldCheck className="w-20 h-20 text-emerald-500/20 mb-4 mt-6" />
             <h3 className="text-2xl font-bold text-slate-200 mb-2">Secure Administrative Environment</h3>
             <p className="text-slate-500 max-w-sm">Requires authorized personnel credentials for access to the UniFound dashboard.</p>
        </div>
      </main>

      {/* 2. Feature Grid Section */}
      <section id="features" className="bg-slate-900/50 border-y border-slate-800 py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Advanced tools designed to manage the complete lifecycle of lost and found properties securely.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BrainCircuit className="w-6 h-6 text-emerald-400" />}
              title="AI Confidentiality Checking"
              description="Automated AI monitoring to ensure sensitive information on lost items remains completely confidential."
            />
            <FeatureCard
              icon={<MessageCircleQuestion className="w-6 h-6 text-emerald-400" />}
              title="Blind Feed AI Questions"
              description="Protect claimant privacy with dynamically generated, blind-feed AI verification questions."
            />
            <FeatureCard
              icon={<QrCode className="w-6 h-6 text-emerald-400" />}
              title="QR Campus Validation"
              description="Seamlessly issue and scan QR-based tokens to securely validate claims at physical campus locations."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6 text-emerald-400" />}
              title="Claim Verification"
              description="Review and confidently verify ownership claims with comprehensive uploaded evidence."
            />
            <FeatureCard
              icon={<Database className="w-6 h-6 text-emerald-400" />}
              title="Inventory Tracking"
              description="Maintain real-time oversight of all reported missing items and found property in a unified catalog."
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6 text-emerald-400" />}
              title="Immutable Audit Logs"
              description="Enforce strict accountability with detailed, system-wide action tracking and permanent history logs."
            />
          </div>
        </div>
      </section>

      {/* 3. Advanced Features - Z-Pattern Details Section */}
      <section id="advanced-solutions" className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Deep Dive: Advanced Security</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Explore how our specialized tools protect your campus.</p>
          </div>

          {/* Feature Highlight 1 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Intelligent Privacy</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                We take student confidentiality seriously. Our system uses advanced AI to automatically blur sensitive information on ID cards and documents before they are ever viewed by staff.
              </p>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="font-medium text-slate-300">Confidentiality checking</span> – Auto-redact PII.</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="font-medium text-slate-300">Blind-feed questions</span> – Verify ownership without compromising privacy.</li>
              </ul>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-800 rotate-1 hover:rotate-0 transition-transform duration-300 ring-1 ring-white/5">
                <div className="space-y-4">
                   <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                     <div className="h-4 w-1/3 bg-slate-800 rounded"></div>
                     <div className="h-2 w-4 bg-slate-700 rounded-full"></div>
                   </div>
                   <div className="h-4 w-full bg-slate-800 rounded"></div>
                   <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
                   <div className="h-24 w-full bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center mt-4">
                     <span className="text-slate-500 text-sm italic">Image automatically redacted</span>
                   </div>
                   <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm mt-4 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> PII secure and hidden.
                   </div>
                </div>
            </div>
          </div>

          {/* Feature Highlight 2 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="order-2 md:order-1 bg-slate-900 p-12 rounded-2xl shadow-xl border border-slate-800 flex flex-col items-center justify-center -rotate-1 hover:rotate-0 transition-transform duration-300 relative ring-1 ring-white/5">
                <div className="absolute top-4 right-4 flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                </div>
                <div className="text-center">
                   <QrCode className="w-32 h-32 mx-auto text-slate-400 mb-6" />
                   <div className="inline-flex items-center px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm font-medium">Ready to scan on campus</div>
                </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <QrCode className="w-6 h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">Frictionless Returns</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Say goodbye to complex paperwork when items are claimed. Issue a secure QR token to the owner's app, and scan it at the security desk to release the item instantly.
              </p>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="font-medium text-slate-300">QR Campus validations</span> – Physical hand-offs made secure.</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" /> <span className="font-medium text-slate-300">Immutable audit logs</span> – Track every single action permanently.</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0 text-slate-400">
             <Search className="w-4 h-4 text-emerald-600" />
             <span className="font-semibold">UniFound Admin</span>
          </div>
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} UniFound. Built for campus safety.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Platform Docs</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500/30 hover:bg-slate-800/50 transition-all duration-300 group ring-1 ring-white/5">
      <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-200 mb-3">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm md:text-base">{description}</p>
    </div>
  )
}
