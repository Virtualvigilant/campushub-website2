import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

const COMMERCIALS = {
  upgrade: {
    title: "🚀 Go Premium",
    subtitle: "Landlords using Premium get tenants 3x faster.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900",
    gradient: "from-green-600 to-emerald-700",
    badge: "Most Popular",
    icon: Sparkles,
    animation: "animate-float",
    size: "max-w-lg",
    features: [
      "Verified badge",
      "Featured placement",
      "Analytics dashboard",
      "More properties",
      "Higher ranking",
      "Priority support",
    ],
    cta: "Upgrade Now 🚀",
  },

  verify: {
    title: "✅ Verify This Property",
    subtitle: "Verified listings get more trust and more tenants.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900",
    gradient: "from-green-500 to-emerald-600",
    icon: ShieldCheck,
    animation: "animate-pulseSoft",
    size: "max-w-md",
    cta: "Verify Now",
  },

  analytics: {
    title: "📊 See Your Performance",
    subtitle: "Track views, clicks and inquiries in real time.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900",
    gradient: "from-teal-500 to-green-600",
    icon: TrendingUp,
    animation: "animate-slideUp",
    size: "max-w-md",
    cta: "Unlock Analytics",
  },

  promo: {
    title: "🎁 Special Offer",
    subtitle: "Boost your listing today and get more tenants.",
    image: "https://images.unsplash.com/photo-1607082349566-1870b6d7e6c9?w=900",
    gradient: "from-lime-500 to-green-600",
    animation: "animate-wiggle",
    size: "max-w-sm",
    cta: "Claim Offer",
  },

  empty: {
    title: "🏡 Add Your First Property",
    subtitle: "Your journey to earning starts here.",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900",
    gradient: "from-green-600 to-emerald-700",
    animation: "animate-bounceSoft",
    size: "max-w-md",
    cta: "Add Property",
  },
};

export default function CommercialModal({ type, property, onClose, userPlan }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shown = JSON.parse(sessionStorage.getItem("shownModals") || "[]");
    if (shown.includes(type)) return;

    if (type === "upgrade" && userPlan === "Free") setVisible(true);
    if (type === "verify" && property?.verified === 0) setVisible(true);
    if (type === "analytics" && userPlan === "Free") setVisible(true);
    if (type === "promo") setVisible(true);
    if (type === "empty") setVisible(true);

    sessionStorage.setItem("shownModals", JSON.stringify([...shown, type]));
  }, [type, property, userPlan]);

  if (!visible) return null;

  const ad = COMMERCIALS[type];
  if (!ad) return null;

  const Icon = ad.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-none">

      <div
        className={`relative w-full ${ad.size} mx-4 rounded-3xl bg-white shadow-2xl border border-green-200 overflow-hidden ${ad.animation}`}
      >
        {/* Image Header */}
        <div className="relative h-40">
          <img src={ad.image} className="w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient} opacity-80`} />
          <div className="absolute bottom-4 left-5 text-white text-xl font-bold">
            {ad.title}
          </div>
        </div>

        {/* Badge */}
        {ad.badge && (
          <div className="absolute top-4 right-5 bg-white text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow">
            <Sparkles size={14} /> {ad.badge}
          </div>
        )}

        {/* Close */}
        <button onClick={() => { setVisible(false); onClose?.(); }} className="absolute top-4 left-4 text-white">
          <X />
        </button>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-4">{ad.subtitle}</p>

          {ad.features && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {ad.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="text-green-600" size={18} /> {f}
                </div>
              ))}
            </div>
          )}

          <Button className={`w-full h-12 text-white bg-gradient-to-r ${ad.gradient} hover:scale-[1.03] transition`}>
            {ad.cta}
          </Button>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 1s ease-in-out infinite; }
        .animate-pulseSoft { animation: pulseSoft 2s infinite; }
        .animate-slideUp { animation: slideUp .4s ease; }
        .animate-bounceSoft { animation: bounceSoft 2s infinite; }

        @keyframes float { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-6px);} }
        @keyframes wiggle { 0%,100%{ transform: rotate(0);} 25%{ transform: rotate(1deg);} 75%{ transform: rotate(-1deg);} }
        @keyframes pulseSoft { 0%,100%{ box-shadow: 0 0 0 0 rgba(34,197,94,.4);} 50%{ box-shadow: 0 0 0 12px rgba(34,197,94,0);} }
        @keyframes slideUp { from{ transform: translateY(30px); opacity:0;} to{ transform: translateY(0); opacity:1;} }
        @keyframes bounceSoft { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-5px);} }
      `}</style>
    </div>
  );
}
