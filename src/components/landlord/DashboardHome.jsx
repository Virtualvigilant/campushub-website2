import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApiSocket from "@/utils/ApiSocket";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function DashboardHome({ properties, listings }) {
  const [data, setData] = useState({
    total_properties: 0,
    total_listings: 0,
  });
  const [ message, setMessage ] = useState("");

  useEffect(() => {
    const getOverview = async () => {
      try {
        const res = await ApiSocket.get("/landlord/get_overview");
        setData(res);
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



      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Properties</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.total_properties}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Listings</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">
            {data.total_listings}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge>Active</Badge>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
