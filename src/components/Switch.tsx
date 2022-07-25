import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export type SwitchSize = "small" | "medium" | "large";
export type SwitchColor = "gray" | "green" | "red" | "purple" | "blue";

export type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultValue?: boolean;
  size?: SwitchSize;
  color?: SwitchColor;
  className?: string;
  thumbClassName?: string;
  checkedClassName?: string;
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onCheckedChange,
      defaultValue,
      size = "medium",
      color = "gray",
      className,
      thumbClassName: additionalThumbClassName,
      checkedClassName = "",
    },
    ref
  ) => {
    const [isOn, setIsOn] = useState(defaultValue ?? checked ?? false);

    useEffect(() => {
      if (typeof checked === "undefined") return;

      setIsOn(checked);
    }, [checked]);

    const toggle = () => {
      onCheckedChange?.(!checked);
      setIsOn((prev) => !prev);
    };

    const switchClassName = useMemo(() => {
      return clsx(
        "flex cursor-pointer",
        className,
        {
          "w-10 h-6 p-1 rounded-xl": size === "small",
          "w-16 h-8 p-1 rounded-2xl": size === "medium",
          "w-20 h-11 p-2 rounded-3xl": size === "large",
        },
        {
          "bg-gray-500": color === "gray",
          "bg-violet-500": color === "purple",
          "bg-red-500": color === "red",
          "bg-green-500": color === "green",
          "bg-blue-500": color === "blue",
        },
        {
          "justify-end": isOn,
        },
        {
          [checkedClassName]: isOn,
        }
      );
    }, [className, checkedClassName, size, color, isOn]);

    const thumbClassName = useMemo(() => {
      return clsx("bg-white h-full rounded-full", additionalThumbClassName, {
        "w-4": size === "small",
        "w-6": size === "medium",
        "w-7": size === "large",
      });
    }, [additionalThumbClassName, size]);

    return (
      <motion.button className={switchClassName} onClick={toggle} ref={ref}>
        <motion.div
          layout
          transition={{ duration: 0.15 }}
          className={thumbClassName}
        />
      </motion.button>
    );
  }
);

Switch.displayName = "Switch";
