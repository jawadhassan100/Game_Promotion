import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const ProtectedRoute = ({ component: Component }) => {
  const [location, setLocation] = useLocation();
  const [allowed, setAllowed] = useState(null);

  useEffect(() => {
    const regData = localStorage.getItem("userRegistrationData");
    if (!regData) {
      setLocation("/"); // Redirect to home
      return;
    }

    try {
      const parsedData = JSON.parse(regData);
      if (parsedData && parsedData.email) {
        setAllowed(true);
      } else {
        setLocation("/"); // Redirect
      }
    } catch (err) {
      setLocation("/"); // Redirect
    }
  }, [setLocation]);

  if (allowed === null) return null; // Or show loading spinner
  return <Component />;
};

export default ProtectedRoute;
