import useIsMobile from './hooks/useIsMobile';
import { AppRoutesDesktop, AppRoutesMobile } from './routes/AppRoutes';

export default function App() {
  const isMobile = useIsMobile();
  return isMobile ? <AppRoutesMobile /> : <AppRoutesDesktop />;
}
