import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Analytics } from "@vercel/analytics/react";

import React, { Suspense } from "react";

import "react-toastify/dist/ReactToastify.css";

function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="flex flex-col items-center">
        <svg
          className="animate-spin h-12 w-12 text-indigo-500 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        <span className="text-xl font-semibold text-indigo-700">
          Loading...
        </span>
      </div>
    </div>
  );
}

function AppRoutes() {
  const { user, initializing } = useAuth();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate waiting for auth state
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [user]);

  if (loading) return <Loader />;

  const ProductsComponent = React.lazy(() =>
    import(/* webpackChunkName: "ProductsComponentChunk" */ "./pages/Products")
  );

  const ProfileComponent = React.lazy(() =>
    import(/* webpackChunkName: "ProfileComponentChunk" */ "./pages/Profile")
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/products" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/products" />}
      />

      {/* <Route
        path="/products"
        element={
          user ? (
            <Suspense fallback={<Loader />}>
              <ProductsComponent />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      /> */}
      <Route
        path="/products"
        element={
          initializing ? (
            <Loader /> // ⏳ wait until auth state is known
          ) : user ? (
            <Suspense fallback={<Loader />}>
              <ProductsComponent />
            </Suspense>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/profile"
        element={
          user ? (
            <Suspense fallback={<Loader />}>
              <ProfileComponent />
            </Suspense>
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/products" : "/login"} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Analytics />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
