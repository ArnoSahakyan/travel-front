import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setGlobalNavigate } from '../api/navigationRegistry';

/**
 * A renderless component that injects the React Router navigate function
 * into the global Axios navigation registry.
 */
export const GlobalNavigateSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setGlobalNavigate(navigate);

    return () => {
      // Optional: Cleanup on unmount, though typically this persists at the app root level
      setGlobalNavigate(null as any);
    };
  }, [navigate]);

  return null;
};
