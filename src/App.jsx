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

function Router() {
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
