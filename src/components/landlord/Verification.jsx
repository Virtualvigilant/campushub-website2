import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApiSocket from "@/utils/ApiSocket";
import { useLandlord } from "@/contexts/LandlordContext";
import { useLocation } from "wouter";

// ✅ Selfie component for auto capture
import SelfieCapture from "./SelfieCapture";

export default function Verification() {
  const { refreshProfile } = useLandlord();
  const [, setLocation] = useLocation();

  // Step control
  const [checked, setChecked] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1); // 1 = ID upload, 2 = Selfie

  // ID upload states
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);

  // ✅ Selfie states
  const [selfie, setSelfie] = useState(null);
  const [previewSelfie, setPreviewSelfie] = useState(null);

  // Verification session id from backend
  const [verificationSessionId, setVerificationSessionId] = useState(null);

  // Device camera detection
  const [hasCamera, setHasCamera] = useState(true);
  const videoRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Check if device has camera
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setHasCamera(false));
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === "front") {
      setFrontImage(file);
      setPreviewFront(URL.createObjectURL(file));
    } else {
      setBackImage(file);
      setPreviewBack(URL.createObjectURL(file));
    }
  };

  // ✅ Handle selfie capture
  const handleSelfie = (file) => {
    setSelfie(file);
    setPreviewSelfie(URL.createObjectURL(file));
  };

  // ================================
  // STEP 1: Submit ID only
  // ================================
  const submitID = async () => {
    if (!frontImage || !backImage) {
      setError("Please upload front and back of your ID");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("id_front", frontImage);
      formData.append("id_back", backImage);

      const res = await ApiSocket.post("/ai/verify_ids", formData);

      if (!res.success) throw new Error(res.message || "ID submission failed");

      setVerificationSessionId(res.verification_id);
      setSuccess("ID uploaded successfully. Now capture your selfie.");
      setStep(2);
    } catch (err) {
      setError(err.message || "Failed to upload ID");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // STEP 2: Submit Selfie only
  // ================================
  const submitSelfie = async () => {
    if (!selfie) {
      setError("Please take a selfie");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("selfie", selfie);
      formData.append("verification_id", verificationSessionId);

      const res = await ApiSocket.post("/ai/verify_selfie", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.success) throw new Error(res.message || "Selfie submission failed");

      setSuccess("Verification submitted successfully!");
      await refreshProfile();
      setTimeout(() => setLocation("/landlord-dashboard"), 2000);
    } catch (err) {
      setError(err.message || "Failed to submit selfie");
    } finally {
      setLoading(false);
    }
  };

  // If no camera, show phone fallback
  if (!hasCamera) {
    return (
      <div className="max-w-xl mx-auto p-6 space-y-4 text-center">
        <p>No camera detected on this device.</p>
        <p>Please open this link on your phone to complete verification:</p>
        <a
          href="https://campushub.example.com/verify-session"
          className="text-blue-600 underline"
        >
          Open on your phone
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* STEP 1: Consent */}
          {!agreed && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Verification helps ensure landlords are genuine. Upload official ID + selfie.
              </p>
              <p className="text-gray-600 italic text-sm">
                Your data is securely handled and only used for verification.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="agree"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                  className="cursor-pointer"
                />
                <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                  I agree to provide my ID for verification purposes
                </label>
              </div>

              <Button
                disabled={!checked}
                onClick={() => setAgreed(true)}
                className="mt-2 bg-green-600 hover:bg-green-700 transition"
              >
                Start Verification
              </Button>
            </div>
          )}

          {/* STEP 2 & 3 */}
          {agreed && (
            <div className="space-y-4">
              {error && <div className="p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>}
              {success && <div className="p-3 rounded bg-green-100 text-green-700 text-sm">{success}</div>}

              {/* ================= ID UPLOAD STEP ================= */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Front ID */}
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center hover:border-green-500 transition">
                      {!previewFront ? (
                        <div className="text-center text-gray-400">
                          <p className="text-lg font-medium">Front of ID</p>
                          <p className="text-sm mt-1">Click to upload</p>
                        </div>
                      ) : (
                        <img
                          src={previewFront}
                          alt="Front ID Preview"
                          className="object-contain h-full w-full rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(e, "front")}
                      />
                    </div>

                    {/* Back ID */}
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center hover:border-green-500 transition">
                      {!previewBack ? (
                        <div className="text-center text-gray-400">
                          <p className="text-lg font-medium">Back of ID</p>
                          <p className="text-sm mt-1">Click to upload</p>
                        </div>
                      ) : (
                        <img
                          src={previewBack}
                          alt="Back ID Preview"
                          className="object-contain h-full w-full rounded"
                        />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileChange(e, "back")}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={submitID}
                    disabled={loading}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 transition"
                  >
                    {loading ? "Uploading ID..." : "Submit ID & Continue"}
                  </Button>
                </>
              )}

              {/* ================= SELFIE STEP ================= */}
              {step === 2 && (
                <>
                  <div className="p-3 rounded bg-green-50 text-green-700 text-sm">
                    ✅ ID uploaded successfully. Now capture your face.
                  </div>

                  <SelfieCapture
                    preview={previewSelfie}
                    onCapture={handleSelfie}
                  />

                  <Button
                    onClick={submitSelfie}
                    disabled={loading}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 transition"
                  >
                    {loading ? "Submitting Selfie..." : "Finish Verification"}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() => setLocation("/landlord-dashboard")}
                className="w-full mt-2"
              >
                ← Back to Dashboard
              </Button>
            </div>
          )}

        </CardContent>
      </Card>
    </div>
  );
}
