import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ApiSocket from "@/utils/ApiSocket";

const LandlordContext = createContext(null);

export const LORD = {
  VERIFIED: "verified",
  UNVERIFIED: "unverified",
  PENDING: "pending",
};

export const LandlordProvider = ({ children }) => {
  // get user object from auth
  const { user } = useAuth(); 

  // profile state
  const [profile, setProfile] = useState(null);

  // landlord verification status
  const [lordstatus, setLordStatus] = useState(() => {
    return localStorage.getItem("lordstatus") || LORD.PENDING;
  });

  // fetch profile when user is available
  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  // persist lordstatus
  useEffect(() => {
    localStorage.setItem("lordstatus", lordstatus);
  }, [lordstatus]);

  /* =========================
      GET FULL PROFILE
  ========================= */
  const getProfile = async () => {
    try {
      const res = await ApiSocket.get("/auth/profile");

      const profileData = res?.user;

      if (profileData) {
        setProfile(profileData);
        console.log("Fetched landlord profile:", profileData);

        const status =
          profileData?.verification?.status || LORD.PENDING;

        setLordStatus(status);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
      setLordStatus(LORD.PENDING);
    }
  };

  /* =========================
      CONTEXT VALUE
  ========================= */
  const value = {
    profile,
    setProfile,
    lordstatus,
    setLordStatus,
    refreshProfile: getProfile, // 👈 useful later
  };

  console.log("LandlordContext profile:", profile);

  return (
    <LandlordContext.Provider value={value}>
      {children}
    </LandlordContext.Provider>
  );
};

export const useLandlord = () => {
  const context = useContext(LandlordContext);
  if (!context) {
    throw new Error("useLandlord must be used within a LandlordProvider");
  }
  return context;
};
