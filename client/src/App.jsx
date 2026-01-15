import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Standard Layout Components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// NGO Layout Components
import NGOSideBar from "./components/NavBar/NGOSideBar";

// Page Components
import Body from "./components/Body/Body";
import AwarenessPage from "./components/Awareness/AwarenessPage";
import CloseNGO from "./components/Closest NGO/CloseNGO";
import LoginScreen from "./components/Auth/LoginScreen";
import ForgotPassword from "./components/Auth/ForgotPassword";
import RegisterNGO from "./components/Auth/RegisterNGO";
import RegisterUser from "./components/Auth/RegisterUser";

// NGO Specific Pages
import NGOMainPage from "./components/MainPage/NGOMainPage";
import InventoryPage from "./components/NGOSideBar/InventoryPage";
import TeamTracking from "./components/NGOSideBar/TeamTracking";
import SOPManuals from "./components/NGOSideBar/SOPManuals";

/**
 * AppContent handles the conditional rendering of Sidebars and NavBars 
 * based on the current URL path.
 */
function AppContent() {
  const location = useLocation();

  // Define routes that belong to the NGO Command Center
  const ngoRoutes = ["/ngo-main", "/inventory", "/team-tracking", "/sop-manuals"];
  const isNGORoute = ngoRoutes.includes(location.pathname);

  return (
    /* If we are on an NGO route, we use 'flex-row' to put the Sidebar next to the content.
       Otherwise, we use 'flex-col' for the standard top-to-bottom website layout.
    */
    <div className={`flex min-h-screen bg-[#fffdf1] ${isNGORoute ? "flex-row" : "flex-col"}`}>
      
      {/* 1. SIDEBAR: Only shows when an NGO is logged in and on a dashboard page */}
      {isNGORoute && <NGOSideBar />}

      {/* 2. NAVBAR: Only shows on public-facing pages */}
      {!isNGORoute && <NavBar />}

      {/* 3. MAIN CONTENT: Dynamically swaps based on Route */}
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register-ngo" element={<RegisterNGO />} />
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/awareness" element={<AwarenessPage />} />
          <Route path="/closest-ngo" element={<CloseNGO />} />

          {/* NGO Protected Routes */}
          <Route path="/ngo-main" element={<NGOMainPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/team-tracking" element={<TeamTracking />} />
          <Route path="/sop-manuals" element={<SOPManuals />} />
          {/* Fallback (Optional): Redirect to Home or 404 */}
          <Route path="*" element={<Body />} />
        </Routes>
      </main>

      {/* 4. FOOTER: Only shows on public-facing pages */}
      {!isNGORoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;