import { useState } from "react";
import DashboardLayout from "@/components/landlord/DashboardLayout";
import DashboardHome from "@/components/landlord/DashboardHome";
import PropertiesPanel from "@/components/landlord/PropertiesPanel";
import ListingsPanel from "@/components/landlord/ListingsPanel";

export default function LandlordDashboard() {
  const [active, setActive] = useState("dashboard");

  const [properties] = useState([
    { id: 1, name: "Sunrise Apartments", location: "Near Campus A" },
  ]);

  const [listings] = useState([
    { id: 1, name: "Room 101", price: 8000 },
  ]);

  return (
    <DashboardLayout active={active} setActive={setActive}>
      {active === "dashboard" && (
        <DashboardHome properties={properties} listings={listings} />
      )}

      {active === "properties" && <PropertiesPanel properties={properties} />}

      {active === "listings" && <ListingsPanel listings={listings} />}
    </DashboardLayout>
  );
}
