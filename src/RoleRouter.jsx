// src/RoleRouter.jsx
import { Redirect } from "wouter";
import { useAuth } from "./contexts/AuthContext";

export default function RoleRouter() {
  const { user } = useAuth();

  if (!user) return <Redirect to="/signin" />;

  if (user.role === "landlord") {
    return <Redirect to="/landlord-dashboard" />;
  }

  return <Redirect to="/listings" />;
}


// // src/RoleRouter.jsx
// import { Redirect } from "wouter";
// import { useAuth } from "./contexts/AuthContext";
// import LandlordDashboard from "./pages/LandlordDashboard";

// export default function RoleRouter() {
//   const { user } = useAuth();

//   if (!user) {
//     return <Redirect to="/signin" />;
//   }

//   switch (user.role) {
//     case "landlord":
//       return <LandlordDashboard />;

//     default:
//       return <Redirect to="/" />;
//   }
// }
