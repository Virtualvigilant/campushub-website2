import { Check, X, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useLandlord } from "@/contexts/LandlordContext";


export default function Plans() {
  const [, setLocation] = useLocation();
  const [plans, setPlans] = useState([]);
  const { getPlans, error } = useLandlord();

  const handleUpgrade = (planId) => {
    alert(`You clicked upgrade/select for plan ID: ${planId}`);
    // Example: setLocation(`/checkout/${planId}`);
  };

  useEffect(() => {
    const fetchPlans = async () => {
      const plansdata = await getPlans();
      if (plansdata) {
        setPlans(plansdata);
      }
    };
    fetchPlans();
  }, [getPlans]);

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {plans.map((plan) => {
          const isPopular = plan.popular;
          const isFree = plan.price === 0;

          return (
            <Card key={plan.id} className={`border ${isPopular ? "border-primary" : ""} relative`}>
              {isPopular && (
                <Badge className="absolute top-2 right-2 bg-primary text-white px-2 py-1 text-xs">
                  Popular
                </Badge>
              )}
              <CardContent className="space-y-4 p-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>

                <div className="space-y-1 mt-2">
                  <h4 className="text-sm font-medium">Features</h4>
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600" />
                      <span>{f}</span>
                    </div>
                  ))}

                  {plan.notIncluded.length > 0 && (
                    <>
                      <h4 className="text-sm font-medium mt-2">Not Included</h4>
                      {plan.notIncluded.map((f, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground line-through">
                          <X className="w-4 h-4 text-red-400" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold">
                    {isFree ? "Free" : `KES ${plan.price}`} / {plan.period}
                  </span>
                  <Button
                    size="sm"
                    variant={isFree ? "outline" : "default"}
                    onClick={() => handleUpgrade(plan.id)}
                    className="flex items-center gap-2"
                  >
                    {isFree ? "Select" : "Upgrade"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Back Button at bottom center */}
      <div className="mt-8 w-full flex justify-center">
        <Button variant="ghost" onClick={() => setLocation("/landlord-dashboard")}>
          ← Back to Dashboard
        </Button>
      </div>
    </div>
  );
}
