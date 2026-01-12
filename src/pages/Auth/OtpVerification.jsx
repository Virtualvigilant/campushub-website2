import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ApiSocket from "@/utils/ApiSocket";

export default function OtpVerification({ email, setScreen }) {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await ApiSocket.post("/auth/verify-otp", {
        email,
        otp,
      });

      if (res.success) {
        // OTP verified successfully
        setScreen("creating");
      } else {
        setError(res.message || "Invalid OTP");
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6" id="otp-screen">
      <CardHeader>
        <CardTitle>Verify Email</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button onClick={handleVerifyOtp} disabled={loading} className="w-full">
          {loading ? "Verifying..." : "Verify & Continue"}
        </Button>
      </CardContent>
    </Card>
  );
}
// 