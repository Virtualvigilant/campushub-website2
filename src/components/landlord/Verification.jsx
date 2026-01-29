import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ApiSocket from "@/utils/ApiSocket";
import { useLandlord } from "@/contexts/LandlordContext";
import { useLocation } from "wouter";

export default function Verification() {
  const { refreshProfile } = useLandlord();
  const [, setLocation] = useLocation();

  // Step control
  const [checked, setChecked] = useState(false); // ✅ for checkbox only
  const [agreed, setAgreed] = useState(false);   // ✅ true only after button click

  // ID upload states
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [previewFront, setPreviewFront] = useState(null);
  const [previewBack, setPreviewBack] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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

  const handleSubmit = async () => {
    if (!frontImage || !backImage) {
      setError("Please upload both front and back images of your ID");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("front_id", frontImage);
      formData.append("back_id", backImage);

      const res = await ApiSocket.post("/auth/submit-verification", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res.success) throw new Error(res.message || "Verification failed");

      setSuccess("Verification submitted successfully!");
      await refreshProfile();
      setTimeout(() => setLocation("/landlord-dashboard"), 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* ===== STEP 1: Documentation / Consent ===== */}
          {!agreed && (
            <div className="space-y-4">
              <p className="text-gray-700">
                Verification helps us ensure that all landlords are genuine and that your properties
                are secure for our clients. You will need to upload official ID documents for verification.
              </p>
              <p className="text-gray-600 italic text-sm">
                Your data will be handled securely and only used for verification purposes.
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
                disabled={!checked} // ✅ only enable if checkbox is checked
                onClick={() => setAgreed(true)} // ✅ now we move to step 2
                className="mt-2 bg-green-600 hover:bg-green-700 transition"
              >
                Start Verification
              </Button>
            </div>
          )}

          {/* ===== STEP 2: ID Upload ===== */}
          {agreed && (
            <div className="space-y-4">
              {error && (
                <div className="p-3 rounded bg-red-100 text-red-700 text-sm">{error}</div>
              )}
              {success && (
                <div className="p-3 rounded bg-green-100 text-green-700 text-sm">{success}</div>
              )}

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
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-4 bg-green-600 hover:bg-green-700 transition"
              >
                {loading ? "Submitting..." : "Submit Verification"}
              </Button>

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
