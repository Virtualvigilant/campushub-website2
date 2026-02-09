// App.jsx
import React from "react";
import { Switch, Route, Redirect } from "wouter";
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
import { useAuth } from "@/contexts/AuthContext"
import LoadingScreen from "./pages/Auth/LoadingScreen";
import RoleRouter from "./RoleRouter";
import MpesaScreen from "./pages/Auth/MpesaScreen";
import Profile from "./pages/comrade/Profile";
import LandlordDashboard from "./pages/LandlordDashboard"
import FullProfile from "./components/landlord/FullProfile";
import Plans from "./components/landlord/Plans";
import Verification from "./components/landlord/Verification";
import MarketPlaceLoad from "./pages/comrade/MarketPlaceLoad";




function Router() {
  const { authStatus } = useAuth()


  // if unauthenticated
  if (authStatus === "unauthenticated") {
    return (
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/listings" component={Listings} />
        <Route path="/room" component={RoomDetail} />
        <Route path="/landlord" component={Landlord} />
        <Route path="/profile" component={Profile} />
        <Route path="/landlord-dashboard" component={LandlordDashboard} />
        <Route path="/marketplace" component={MarketPlaceLoad} />

        <Route path="/landlord-signup">
          <LandlordSignUp />

          {/* AUTH */}
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Route>


        {/* AUTH */}
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />

        {/* 404 fallback */}
        <Route component={NotFound} />

        {/* Force redirect for everything else */}
        <Redirect to="/" />
      </Switch>
    );
  }


  //if authenticated

  if (authStatus === "authenticated") {
    return (
      <Switch>
        {/* Entry redirect */}
        <Route path="/auth-redirect" component={RoleRouter} />

        {/* Normal app pages */}
        <Route path="/" component={Home} />
        <Route path="/listings" component={Listings} />
        <Route path="/room" component={RoomDetail} />
        <Route path="/profile" component={Profile} />
        <Route path="/landlord" component={LandlordDashboard} />
        <Route path="/landlord-dashboard" component={LandlordDashboard} />
        <Route path="/marketplace" component={MarketPlaceLoad} />
        <Route path="/full-profile" component={FullProfile} />
        <Route path="/plans" component={Plans} />
        <Route path="/verify-account" component={Verification} />
        <Route path="/landlord-signup">
          <LandlordSignUp />
        </Route>

        {/* AUTH */}
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />




        <Route component={NotFound} />
      </Switch>
    );
  }

  // if (authStatus === "authenticated") {
  //   return (
  //     <Switch>
  //       <Route>
  //         <RoleRouter />
  //       </Route>
  //     </Switch>
  //   );
  // }




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
      <Route path="/room" component={RoomDetail} />
      <Route path="/landlord" component={Landlord} />
      <Route path="/profile" component={Profile} />
      <Route path="/landlord-dashboard" component={LandlordDashboard} />

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
