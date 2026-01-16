import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, MapPin } from "lucide-react";
import ApiSocket from "@/utils/ApiSocket";

export default function AddPropertyModal({ open, onClose, onSuccess }) {
  // --------------------
  // Hooks must always be at top
  // --------------------
  const [propertyName, setPropertyName] = useState("");
  const [propertyDescription, setPropertyDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locating, setLocating] = useState(false);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // --------------------
  // Auto-detect location when modal opens
  // --------------------
  useEffect(() => {
    if (!open) return;

    setLocating(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        // Reverse geocode using OpenStreetMap (free)
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );
          const data = await res.json();

          if (data?.display_name) {
            setAddress(data.display_name);
          }
        } catch (err) {
          console.error("Failed to fetch address:", err);
        } finally {
          setLocating(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Failed to get your location. Please enable GPS.");
        setLocating(false);
      },
      { enableHighAccuracy: true }
    );
  }, [open]);

  // --------------------
  // Handle form submit
  // --------------------
  const handleSubmit = async () => {
    setError("");

    if (!propertyName || !propertyDescription || !propertyType || !address) {
      setError("All fields including address are required");
      return;
    }

    if (!latitude || !longitude) {
      setError("Location not detected yet. Please wait.");
      return;
    }

    if (images.length === 0) {
      setError("At least one image is required");
      return;
    }

    const formData = new FormData();
    formData.append("property_name", propertyName);
    formData.append("property_description", propertyDescription);
    formData.append("property_type", propertyType);

    // Location
    formData.append("address", address);
    formData.append("latitude", parseFloat(latitude));
    formData.append("longitude", parseFloat(longitude));

    // Images
    images.forEach((img) => formData.append("product_images", img));

    try {
      setLoading(true);

      await ApiSocket.post("/landlord/add_property", formData, { isFormData: true });

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || "Failed to add property");
    } finally {
      setLoading(false);
    }
  };

  // --------------------
  // Only render modal if open
  // --------------------
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Property</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Property Name</label>
            <Input
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              placeholder="e.g. Greenview Apartments"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={propertyDescription}
              onChange={(e) => setPropertyDescription(e.target.value)}
              placeholder="Describe the property..."
            />
          </div>

          {/* Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
                <SelectItem value="hostel">Hostel</SelectItem>
                <SelectItem value="bedsitter">Bedsitter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium flex gap-1 items-center">
              <MapPin className="w-4 h-4" />
              Address {locating && "(detecting...)"}
            </label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Auto-detected address"
            />
            <p className="text-xs text-muted-foreground">
              You can edit this if it's not exact.
            </p>
          </div>

          {/* Images */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Property Images</label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImages(Array.from(e.target.files))}
            />
            <p className="text-xs text-muted-foreground">
              {images.length} image(s) selected
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={loading || locating}
              className="gap-2"
            >
              <Upload className="w-4 h-4" />
              {loading ? "Uploading..." : "Add Property"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
