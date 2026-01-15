import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "../../contexts/AuthContext";

export default function OtpVerification() {
  const {
    verifyOtp,
    logout,
    signup,
    authStatus,
    error,
    pendingEmail,
    signupPayload,
  } = useAuth();

  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(60);

  const loading = authStatus === "verifying_otp";
  const canResend = resendTimer === 0;

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (resendTimer <= 0) return;

    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resendTimer]);

  /* ---------------- GUARDS ---------------- */
  if (!pendingEmail) return null;

  /* ---------------- HANDLERS ---------------- */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length < 4) {
      console.warn("[OTP] Invalid OTP length");
      return;
    }

    await verifyOtp({ otp });
  };

  const handleResend = async () => {
    if (!signupPayload) {
      console.error("[OTP] Missing signup payload");
      return;
    }

    console.log("[OTP] Resending OTP...");
    setResendTimer(60);
    await signup(signupPayload);
  };

  const handleCancel = () => {
    console.log("[OTP] Signup cancelled");
    logout();
  };

  /* ---------------- UI ---------------- */
  return (
    <Card className="max-w-md mx-auto mt-10 p-6" id="otp-screen">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
        <p className="text-sm text-muted-foreground">
          Enter the OTP sent to <strong>{pendingEmail}</strong>
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Enter OTP"
          value={otp}
          maxLength={6}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          onClick={handleVerifyOtp}
          disabled={loading || otp.length < 4}
          className="w-full"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </Button>

        {/* RESEND */}
        <div className="flex justify-between items-center text-sm">
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`underline ${
              canResend ? "text-blue-600" : "text-gray-400"
            }`}
          >
            Resend OTP
          </button>

          {!canResend && (
            <span className="text-gray-500">
              Resend in {resendTimer}s
            </span>
          )}
        </div>

        {/* CANCEL */}
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="w-full text-red-500"
        >
          Cancel Signup
        </Button>
      </CardContent>
    </Card>
  );
}
