import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Route Guards
import ProtectedRoute from "./ProtectedRoute";
// (Optional – only if you created it)
// import PublicRoute from "./PublicRoute";

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
 * AppContent handles conditional rendering of Sidebar / Navbar / Footer
 * based on current route.
 */
function AppContent() {
  const location = useLocation();

  // All NGO protected routes
  const ngoRoutes = ["/ngo-main", "/inventory", "/team-tracking", "/sop-manuals"];
  const isNGORoute = ngoRoutes.includes(location.pathname);

  return (
    <div
      className={`flex min-h-screen bg-[#fffdf1] ${
        isNGORoute ? "flex-row" : "flex-col"
      }`}
    >
      {/* Sidebar – only for NGO protected routes */}
      {isNGORoute && <NGOSideBar />}

      {/* Navbar – only for public routes */}
      {!isNGORoute && <NavBar />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Body />} />
          <Route path="/awareness" element={<AwarenessPage />} />
          <Route path="/closest-ngo" element={<CloseNGO />} />

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register-ngo" element={<RegisterNGO />} />
          <Route path="/register-user" element={<RegisterUser />} />

          {/* ================= PROTECTED NGO ROUTES ================= */}
          <Route
            path="/ngo-main"
            element={
              <ProtectedRoute>
                <NGOMainPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <InventoryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/team-tracking"
            element={
              <ProtectedRoute>
                <TeamTracking />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sop-manuals"
            element={
              <ProtectedRoute>
                <SOPManuals />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Body />} />
        </Routes>
      </main>

      {/* Footer – only for public routes */}
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
