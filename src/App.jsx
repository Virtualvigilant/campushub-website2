// App.jsx
import React from "react";
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

import NotFound from "./pages/not-found";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import RoomDetail from "./pages/RoomDetail";
import Landlord from "./pages/Landlord";
import LandlordSignUp from "./pages/Auth/LandlordSignUp";
import OtpVerification from "./pages/Auth/OtpVerification";
import { useAuth } from "./contexts/AuthContext"
import LoadingScreen from "./pages/Auth/LoadingScreen";
import RoleRouter from "./RoleRouter";
import MpesaScreen from "./pages/Auth/MpesaScreen";




function Router() {
  const { authStatus } = useAuth()

  //if authenticated

  if (authStatus === "authenticated") {
    return (
      <Switch>
        <Route>
          <RoleRouter />
        </Route>
      </Switch>
    );
  }



  // screen flow 
  if (authStatus === "otp_required") {
    return (
      <Switch>
        <Route>
          <OtpVerification />
        </Route>
      </Switch>
    );
  }

  // when loading later can add loading from diff contexts

  if (authStatus === "loading") {
    return (
      <Switch>
        <Route>
          <LoadingScreen />
        </Route>
      </Switch>

    )
  }

    if (authStatus === "mpesa") {
    return (
      <Switch>
        <Route>
          <MpesaScreen />
        </Route>
      </Switch>

    )
  }


  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/listings" component={Listings} />
      <Route path="/room/:id" component={RoomDetail} />
      <Route path="/landlord" component={Landlord} />

      <Route path="/landlord-signup">
        <LandlordSignUp />
      </Route>


      {/* AUTH */}
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />

      {/* 404 fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
