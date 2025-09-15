import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";

const ProtectedRoute = ({ children }) => {
  const { isUserAuthenticated, isLoading } = useContext(ShoppingCartContext);

  if (isLoading) {
    // while session is being restored, show loader/splash
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!isUserAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;
