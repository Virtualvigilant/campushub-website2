import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Upload, Plus, Trash2 } from "lucide-react";
import ApiSocket from "@/utils/ApiSocket";

export default function AddListingModal({ open, onClose, onSuccess }) {
  const [listingName, setListingName] = useState("");
  const [listingDescription, setListingDescription] = useState("");
  const [listingType, setListingType] = useState("");
  const [properties, setProperties] = useState([]);
  const [propertyId, setPropertyId] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  // ✅ NEW FIELDS
  const [availabilityStatus, setAvailabilityStatus] = useState("available");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [timeline, setTimeline] = useState("monthly");

  // ✅ Deposits as dynamic key/value list
  const [deposits, setDeposits] = useState([{ key: "", value: "" }]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch landlord properties
  useEffect(() => {
    if (!open) return;

    const fetchProperties = async () => {
      try {
        const res = await ApiSocket.get("/landlord/get_properties");
        setProperties(res.properties || []);
        if (res.properties?.[0]) setPropertyId(res.properties[0].property_id);
      } catch (err) {
        console.error("Failed to load properties:", err);
      }
    };

    fetchProperties();
  }, [open]);

  

  // --------------------
  // Deposits helpers
  // --------------------
  const addDepositRow = () => {
    setDeposits([...deposits, { key: "", value: "" }]);
  };

  const removeDepositRow = (index) => {
    setDeposits(deposits.filter((_, i) => i !== index));
  };

  const updateDeposit = (index, field, value) => {
    const updated = [...deposits];
    updated[index][field] = value;
    setDeposits(updated);
  };

  const buildDepositsObject = () => {
    const obj = {};
    deposits.forEach((d) => {
      if (d.key && d.value) {
        obj[d.key] = d.value;
      }
    });
    return obj;
  };

  useEffect(() => {
  if (availabilityStatus === "available") {
    setAvailabilityDate("");
  }
}, [availabilityStatus]);


  // --------------------
  // Handle submit
  // --------------------
  const handleSubmit = async () => {
    setError("");

    if (!listingName || !listingDescription || !listingType || !price || !propertyId) {
      setError("Please fill all required fields");
      return;
    }

    if (images.length === 0) {
      setError("At least one listing image is required");
      return;
    }

    const formData = new FormData();
    formData.append("listing_name", listingName);
    formData.append("listing_description", listingDescription);
    formData.append("listing_type", listingType);
    formData.append("price", parseFloat(price));
    formData.append("property_id", propertyId);

    // ✅ New fields
    formData.append("availability_status", availabilityStatus);
    formData.append("availability_date", availabilityDate || null);
    formData.append("timeline", timeline);

    // ✅ Deposits JSON
    const depositsObj = buildDepositsObject();
    formData.append("deposits", JSON.stringify(depositsObj));

    if (availabilityStatus === "occupied" && !availabilityDate) {
      setError("Please select when the listing will be available.");
      return;
    }


    // Images
    images.forEach((img) => formData.append("product_images", img));

    try {
      setLoading(true);
      await ApiSocket.post("/landlord/add_listing", formData, { isFormData: true });
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || err?.message || "Failed to add listing");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardContent className="p-6 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add New Listing</h2>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>
          )}

          {/* Name */}
          <Input placeholder="Listing name" value={listingName} onChange={(e) => setListingName(e.target.value)} />

          {/* Description */}
          <Textarea placeholder="Description" value={listingDescription} onChange={(e) => setListingDescription(e.target.value)} />

          {/* Property */}
          <div className="space-y-1">
            {properties.map((prop) => (
              <label key={prop.property_id} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={propertyId === prop.property_id}
                  onChange={() => setPropertyId(prop.property_id)}
                />
                {prop.property_name}
              </label>
            ))}
          </div>

          {/* Type */}
          <Select value={listingType} onValueChange={setListingType}>
            <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="bedsitter">Bedsitter</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="hostel">Hostel</SelectItem>
            </SelectContent>
          </Select>

          {/* Price */}
          <Input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />

          {/* Availability */}
          <Select value={availabilityStatus} onValueChange={setAvailabilityStatus}>
            <SelectTrigger><SelectValue placeholder="Availability" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>

          {/* Availability date */}
          {availabilityStatus === "rented" && (
          <div className="space-y-1">
            <label className="text-sm font-medium">Available From</label>
            <Input
              type="date"
              value={availabilityDate}
              onChange={(e) => setAvailabilityDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        )}

          {/* Timeline */}
          <Select value={timeline} onValueChange={setTimeline}>
            <SelectTrigger><SelectValue placeholder="Timeline" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>

          {/* Deposits */}
          <div className="space-y-2 border p-3 rounded">
            <div className="font-medium">Deposits (Key / Value)</div>

            {deposits.map((dep, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="e.g. security"
                  value={dep.key}
                  onChange={(e) => updateDeposit(index, "key", e.target.value)}
                />
                <Input
                  placeholder="e.g. 5000"
                  value={dep.value}
                  onChange={(e) => updateDeposit(index, "value", e.target.value)}
                />
                <Button variant="ghost" onClick={() => removeDepositRow(index)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addDepositRow} className="w-full gap-2">
              <Plus className="w-4 h-4" /> Add Deposit Field
            </Button>
          </div>

          {/* Images */}
          <Input type="file" multiple accept="image/*" onChange={(e) => setImages(Array.from(e.target.files))} />

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Uploading..." : "Add Listing"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
