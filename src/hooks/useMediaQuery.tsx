import { useEffect, useState } from "react";

interface DeviceType {
  isTablet: boolean;
  isMobile: boolean;
  isDesktop: boolean;
}

export const useMediaQuery = (): DeviceType => {
  const [deviceType, setDeviceType] = useState({
    isTablet: false,
    isMobile: false,
    isDesktop: true,
  });
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 480px)").matches) {
        setDeviceType({ isTablet: false, isMobile: true, isDesktop: false });
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setDeviceType({ isTablet: true, isMobile: false, isDesktop: false });
      } else {
        setDeviceType({ isTablet: false, isMobile: false, isDesktop: true });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
};
