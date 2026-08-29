import { useEffect, useState } from 'react';

/**
 * Detecta se a viewport atual é mobile (abaixo do breakpoint informado).
 * Usado para alternar entre o layout desktop completo (gestão) e o
 * layout mobile reduzido (apenas localização de produtos).
 */
export default function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}
