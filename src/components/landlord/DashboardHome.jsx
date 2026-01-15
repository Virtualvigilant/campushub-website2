import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ApiSocket from "@/utils/ApiSocket";
import { useEffect, useState } from "react";

export default function DashboardHome({ properties, listings }) {
  const [data, setData] = useState({
    total_properties: 0,
    total_listings: 0,
  });

  useEffect(() => {
    const getOverview = async () => {
      try {
        const res = await ApiSocket.get("/landlord/get_overview");
        setData(res);
      } catch (error) {
        console.error("Failed to fetch overview data", error);
      }
    };

    getOverview();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

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
