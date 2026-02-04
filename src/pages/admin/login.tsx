import { useState } from "react";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Loader2, Lock, Mail, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1C1C1C] relative overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-500 opacity-20 blur-[100px]"></div>
      </div>


      <div className="w-full max-w-[440px] px-6 relative z-10">
        {/* 2. Logo / Icon Section */}
        <div className="flex flex-col items-center -mb-8">
          <img 
            src="/unifound-logo-v2.png" 
            alt="UniFound Logo" 
            className="w-[350px] h-auto object-contain drop-shadow-[0_0_25px_rgba(62,207,142,0.4)]"
          />
        </div>

        {/* 3. Main Glass Card */}
        <div className="group relative">
          {/* Outer Glow on Hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative backdrop-blur-2xl bg-[#0a0a0a]/80 border border-white/10 rounded-3xl p-8 shadow-3xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Terminal ID (Email)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-[#3ECF8E]" />
                  <input
                    type="email"
                    placeholder="admin@unifound.sys"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-11 pr-4 text-white placeholder-gray-700 outline-none focus:ring-1 focus:ring-[#3ECF8E]/50 focus:border-[#3ECF8E]/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] ml-1">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 transition-colors group-focus-within:text-[#3ECF8E]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-11 pr-4 text-white placeholder-gray-700 outline-none focus:ring-1 focus:ring-[#3ECF8E]/50 focus:border-[#3ECF8E]/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full relative group/btn overflow-hidden bg-[#3ECF8E] text-black font-bold py-4 rounded-xl transition-all duration-300 hover:bg-[#34b078] hover:shadow-[0_0_20px_rgba(62,207,142,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative flex justify-center items-center gap-2">
                  {loginMutation.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-black" />
                  ) : (
                    <>
                      Initialize Session
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>

              {/* Error State */}
              {loginMutation.isError && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-shake">
                  <p className="text-[13px] text-red-400 text-center font-medium">
                    Authentication Failed. Entry Denied.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* 4. Footer Details */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-white/10" />
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.3em]">
            Secure Encrypted Channel
          </p>
        </div>
      </div>
    </div>
  );
}