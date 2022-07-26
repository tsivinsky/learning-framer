import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import clsx from "clsx";
import { useDeviceType } from "@/hooks/useDeviceType";

export type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  maxTopOffset?: number;
  className?: string;
  children?: React.ReactNode;
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  maxTopOffset = 0,
  className,
  children,
}) => {
  const { isMobile, isTablet } = useDeviceType();

  const [top, setTop] = useState<string | number>("50%");

  const [left, right] = useMemo(() => {
    if (isMobile) return [0, 0];
    if (isTablet) return ["20%", "20%"];

    return ["30%", "30%"];
  }, [isMobile, isTablet]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y >= 150 && top === "50%") {
      onClose();
    } else if (info.offset.y <= -150 && top === "50%") {
      setTop(maxTopOffset);
    } else if (info.offset.y >= 150 && top === maxTopOffset) {
      setTop("50%");
    }
  };

  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <>
          <motion.div
            className="fixed z-modalBackdrop inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => onClose()}
          />
          <motion.div
            className={clsx("fixed z-modal", className)}
            style={{ left, right }}
            initial={{ top: 1000, height: 0 }}
            animate={{ top, height: 1000 }}
            exit={{ top: 1000, height: 0 }}
            drag="y"
            dragElastic={0}
            dragSnapToOrigin
            onDragEnd={handleDragEnd}
            transition={{ type: "tween" }}
          >
            <motion.div className="w-12 h-[3px] bg-gray-500 relative top-[6px] left-1/2 -translate-x-1/2 rounded-full cursor-pointer" />
            <div className="w-full h-full mt-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
