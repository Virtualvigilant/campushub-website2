// src/pages/LandlordSignUp.jsx
import { useEffect, useState } from "react";
// import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { ApiSocket} from "@/utils/ApiSocket";
import OtpVerification from "../Auth/OtpVerification";

import { useAuth } from "@/contexts/AuthContext";

/* ================= PAGE ================= */

export default function LandlordSignUp() {
    const { signup } = useAuth();
    // const [plan, setPlan] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState({
  price: 0,
  name: "",
  period: "",
  description: "",
  features: [],
  notIncluded: []
});
    const [location, setLocation] = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("mpesa");

    const params = new URLSearchParams(window.location.search);
    const planId = params.get("plan");
    const [screen, setScreen] = useState("form"); 
// possible values: "form", "otp", "mpesa", "creating", "success"



    useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const data = await ApiSocket.get(`/landlord/get_plan_details/${planId}`); // ✅ backticks + correct variable
        setSelectedPlan(data.plan || []); // assumes backend returns { plan: [...] }
        console.log("Fetched plan:", data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch plan:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }7
    };

    fetchPlan();
  }, []);

//   if (loading) {
//     return <p className="text-center mt-10">Loading plans...</p>;
//   }

//   if (error) {
//     return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
//   }

//   if (!selectedPlan) return <p className="text-center mt-10">No plan selected</p>;





  /* ================= FORM STATE ================= */

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "landlord",
  });


useEffect(() => {
  if (selectedPlan) {
    setPaymentMethod(selectedPlan.price === 0 ? "free" : "mpesa");
  }
}, [selectedPlan]);

  const [mpesaPhone, setMpesaPhone] = useState("");
  const [card, setCard] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

async function handleSubmit(e) {
  e.preventDefault();

  if (selectedPlan.price === 0) {
        await signup(form);
    
    // Free plan → show OTP verification screen
    setScreen("otp");
  } else if (paymentMethod === "mpesa") {
    // Paid plan → show M-Pesa payment screen
    setScreen("mpesa");
  }

    const payload = {
      user: form,
      plan: selectedPlan,
      payment: {
        method: paymentMethod,
        mpesaPhone,
        card,
      },
    };

    console.log("SUBMIT PAYLOAD:", payload);

    alert("Signup + payment submitted (mock). Check console.");
  }

//   if (paymentMethod === "free") {
//     useEffect(() => {
//         setMpesaPhone("");
//     }, [paymentMethod]);
//     const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     await signup(form);
//     // OTP routing is handled globally by authStatus
//   };
//   }


// useEffect(() => {
//   if (screen !== "mpesa") return; // only poll when on M-Pesa screen

//   const interval = setInterval(async () => {
//     try {
//       const data = await ApiSocket.get(`/landlord/check_mpesa_status/${form.email}`);
//       if (data.status === "completed") {
//         clearInterval(interval);
//         setScreen("creating");
//         setTimeout(() => setScreen("success"), 2000); // simulate account creation
//       }
//     } catch (err) {
//       console.error("Failed to check M-Pesa status:", err);
//     }
//   }, 5000);

//   return () => clearInterval(interval); // cleanup on unmount
// }, [screen, form.email]);



  //screen if payment method is mpesa
  /* ================= RENDER SCREENS ================= */
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (screen === "otp") {
    return (
         <OtpVerification email={form.email} setScreen={setScreen} />
    //   <Card className="max-w-md mx-auto mt-10 p-6" id="otp-screen">
    //     <CardHeader>
    //       <CardTitle>Verify Email</CardTitle>
    //     </CardHeader>
    //     <CardContent className="space-y-4">
    //       <Input placeholder="Enter OTP" />
    //       <Button onClick={() => setScreen("creating")}>Verify & Continue</Button>
    //     </CardContent>
    //   </Card>
    );
  }

  if (screen === "mpesa") {
    return (
      <Card className="max-w-md mx-auto mt-10 p-6">
        <CardHeader>
          <CardTitle>M-Pesa Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2"><Phone /> Wait for M-Pesa prompt</div>
          <div className="flex items-center gap-2"><Check /> Approve payment</div>
          <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Waiting for confirmation...</div>
        </CardContent>
      </Card>
    );
  }

  if (screen === "creating") {
    return (
      <Card className="max-w-md mx-auto mt-10 p-6 flex items-center justify-center gap-4">
        <Loader2 className="animate-spin" />
        <span>Creating account...</span>
      </Card>
    );
  }

  if (screen === "success") {
    return (
      <Card className="max-w-md mx-auto mt-10 p-6 flex items-center justify-center gap-4">
        <Check className="text-green-600" />
        <span>Account created successfully! Redirecting...</span>
        {setTimeout(() => setLocation("/landlord/dashboard"), 2000)}
      </Card>
    );
  }


  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* ================= LEFT: SIGNUP + PAYMENT ================= */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Create Landlord Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ===== Account ===== */}
              <div className="space-y-4">
                <Input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
                <Input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
                <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
              </div>

              {/* ===== Payment Methods ===== */}
              {selectedPlan.price > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Payment Method</h3>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("mpesa")}
                      className={`flex-1 border rounded-lg p-3 ${
                        paymentMethod === "mpesa" ? "border-primary" : "border-border"
                      }`}
                    >
                      M-Pesa
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 border rounded-lg p-3 ${
                        paymentMethod === "card" ? "border-primary" : "border-border"
                      }`}
                    >
                      Card
                    </button>
                  </div>

                  {/* ===== MPESA ===== */}
                  {paymentMethod === "mpesa" && (
                    <Input
                      placeholder="M-Pesa phone number (07xxxxxxxx)"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      required
                    />
                  )}

                  {/* ===== CARD ===== */}
                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input placeholder="Card number" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} required />
                      <Input placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} required />
                      <Input placeholder="MM/YY" value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} required />
                      <Input placeholder="CVC" value={card.cvc} onChange={(e) => setCard({ ...card, cvc: e.target.value })} required />
                    </div>
                  )}
                </div>
              )}

              <Button className="w-full h-12 text-lg">
                {selectedPlan.price === 0 ? "Create Free Account" : "Pay & Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* ================= RIGHT: PLAN ================= */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Your Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-xl font-bold">{selectedPlan.name}</h3>
            <p className="text-muted-foreground">{selectedPlan.description}</p>

            <div className="text-3xl font-bold">
              KES {selectedPlan.price.toLocaleString()} / {selectedPlan.period}
            </div>

            <ul className="space-y-2 text-sm">
              {selectedPlan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  {f}
                </li>
              ))}
              {selectedPlan.notIncluded.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-muted-foreground line-through">
                  <div className="w-4 h-4 rounded-full border" />
                  {f}
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full" onClick={() => setLocation("/landlord")}>
              Change Plan
            </Button>
          </CardContent>
        </Card>

        {/* ================= SUMMARY ================= */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Plan</span>
              <span>{selectedPlan.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-bold">KES {selectedPlan.price.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              This is a mock checkout. Real payment integration will be added later.
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
