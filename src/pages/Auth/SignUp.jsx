import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Building2, Briefcase, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

const roles = [
  { key: "comrade", label: "Comrade", icon: Users },
  { key: "landlord", label: "Landlord", icon: Building2 },
  { key: "eservice", label: "E-Service", icon: Briefcase },
];

export default function SignUp() {
  const [, setLocation] = useLocation();

  const [role, setRole] = useState("comrade");
  const [step, setStep] = useState("form"); // form | otp
  const [form, setForm] = useState({
    role: "comrade",
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const { signup, error } = useAuth();

  function handleRoleSelect(r) {
    if (r !== "comrade") {
      setLocation(`/${r}`); // redirect immediately
      return;
    }
    setRole(r);
  }

 async function handleSubmit(e) {
    e.preventDefault();
    await signup(form);
    console.log("SUBMITTING SIGNUP FORM", form);

    // MOCK: pretend OTP was sent
    // setStep("otp");
  }

  function handleVerifyOtp(e) {
    e.preventDefault();

    console.log("VERIFY OTP:", otp);

    alert("Account created successfully!");
    setLocation("/dashboard");
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-20 flex justify-center px-4">
        <Card className="w-full max-w-md border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <Badge variant="secondary">
              {step === "form" ? "Sign Up" : "Verify OTP"}
            </Badge>

            <CardTitle className="text-2xl">
              {step === "form" ? "Create Account" : "Verify Your Email"}
            </CardTitle>

            {/* ROLE SELECTOR */}
            <div className="flex gap-2 justify-center">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <Button
                    key={r.key}
                    variant={role === r.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRoleSelect(r.key)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {r.label}
                  </Button>
                );
              })}
            </div>
          </CardHeader>

          <CardContent>

                          {error && (
              <div className="mb-4 rounded-md border border-red-500 bg-red-50 p-3 text-red-600">
                {error}
              </div>
            )}
            {step === "form" ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input
                    placeholder="john_doe"
                    value={form.username}
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>

                <Button className="w-full h-12">Create Account</Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Enter the 6-digit code sent to your email
                </p>

                <Input
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />

                <Button className="w-full h-12">Verify & Continue</Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
