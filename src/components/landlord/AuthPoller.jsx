import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation } from "wouter";
import { toast } from "react-hot-toast";

export default function AuthPoller() {
  const auth = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      if (auth.authStatus === "unauthenticated") {
        // toast.error("Session timed out, please login again");
        alert("Session timed out, please login again");
        console.log("Auth status is unauthenticated, redirecting to signin...");
        setLocation("/signin");
      }
    };

    // Run immediately on mount
    checkAuth();

    // Poll every 5 seconds
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, [setLocation, auth]); // auth object is stable from context

  return null;
}
