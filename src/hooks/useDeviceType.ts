import { useMediaQuery } from "@mantine/hooks";

export const useDeviceType = () => {
  const isMobile = useMediaQuery("screen and (max-width: 767.9px)", false);
  const isTablet = useMediaQuery("screen and (max-width: 1023.9px)", false);

  return {
    isMobile,
    isTablet,
  };
};
