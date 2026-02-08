import { useEffect, useRef } from "react";

export default function SelfieCapture({ preview, onCapture }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Start camera
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera not accessible:", err);
      }
    };
    startCamera();

    return () => {
      // Stop camera on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Auto-capture when video is ready
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert to blob and send to parent
      canvas.toBlob((blob) => {
        if (blob && onCapture) {
          onCapture(new File([blob], "selfie.jpg", { type: "image/jpeg" }));
        }
      }, "image/jpeg", 0.9);
    }, 3000); // attempt every 3 seconds

    return () => clearInterval(interval);
  }, [onCapture]);

  return (
    <div className="space-y-2">
      <label className="text-gray-700 font-medium">Selfie</label>
      <div className="relative border-2 border-dashed border-gray-300 rounded-lg h-60 flex items-center justify-center overflow-hidden">
        {!preview && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="object-cover w-full h-full"
          />
        )}
        {preview && (
          <img
            src={preview}
            alt="Selfie Preview"
            className="object-cover w-full h-full"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
      </div>
      <p className="text-gray-500 text-sm">
        Make sure your face and ID are clearly visible. Selfie will be captured automatically.
      </p>
    </div>
  );
}
