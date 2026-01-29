import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useLandlord } from "@/contexts/LandlordContext";
import { useLocation } from "wouter";
import ApiSocket from "@/utils/ApiSocket";

export default function DashboardHome({ properties, listings }) {
  const [data, setData] = useState({
    total_properties: 0,
    total_listings: 0,
  });

  const [message, setMessage] = useState("");
  const { lordstatus } = useLandlord();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const getOverview = async () => {
      try {
        const res = await ApiSocket.get("/landlord/get_overview");
        setData({
          total_properties: res.total_properties || 0,
          total_listings: res.total_listings || 0,
        });
        setMessage(res.message || "Welcome back to your dashboard!");
      } catch (error) {
        console.error("Failed to fetch overview data", error);
      }
    };

    getOverview();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      {/* ================= Banner for unverified accounts ================= */}
      {lordstatus === "pending" && (
        <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <span className="text-sm md:text-base font-medium">
            ⚠️ Your account is currently unverified. Verify it to be able to post properties and listings.
          </span>
          <Button
            size="sm"
            onClick={() => setLocation("/verify-account")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white"
          >
            Start Verification
          </Button>
        </div>
      )}

      {/* ================= Optional welcome/info message ================= */}
      {message && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded flex items-center justify-between">
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            className="ml-4 text-green-800 hover:text-green-900 font-bold text-lg leading-none"
            aria-label="Dismiss message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* ================= Overview Cards ================= */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Properties</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{data.total_properties}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{data.total_listings}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>{lordstatus === "verified" ? "Active" : "Pending Verification"}</Badge>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
