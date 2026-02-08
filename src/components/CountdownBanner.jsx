// CountdownBanner.jsx
import { useEffect, useState } from "react";

export default function CountdownBanner({
  message = "Listings will be uploaded soon!",
  durationDays = 7,
}) {
  const [timeLeft, setTimeLeft] = useState(0);

  // Initialize countdown target
  useEffect(() => {
    const STORAGE_KEY = "listingsCountdownTarget";
    let target = localStorage.getItem(STORAGE_KEY);

    if (!target) {
      const now = new Date().getTime();
      target = now + durationDays * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, target);
    }

    const updateTime = () => {
      const now = new Date().getTime();
      const diff = Number(target) - now;
      setTimeLeft(diff > 0 ? diff : 0);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [durationDays]);

  // Convert milliseconds to days, hours, minutes, seconds
  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  if (timeLeft <= 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-green-300 to-yellow-500 text-yellow-900 font-bold py-4 shadow-lg rounded-b-xl overflow-hidden relative">
      <div
        className="animate-marquee whitespace-nowrap inline-block text-lg md:text-xl"
        style={{ display: "inline-block", paddingLeft: "100%" }}
      >
        {`🎉 ${message} ⏳ ${formatTime(timeLeft)} 🎉`}
      </div>

      {/* Optional cute emojis */}
      <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-2xl animate-bounce">
        🏠
      </div>
      <div className="absolute top-1/2 right-2 transform -translate-y-1/2 text-2xl animate-bounce">
        ✨
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}
