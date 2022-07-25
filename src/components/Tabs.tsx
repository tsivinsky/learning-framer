import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import React, { useId, useState } from "react";

export type Tab = {
  label: string;
  content: React.ReactNode;
};

const colorClasses = {
  gray: "bg-gray-200",
  blue: "bg-blue-200",
  red: "bg-red-200",
  purple: "bg-violet-200",
};

export type TabsVariant = "underline" | "pills";
export type TabsColor = keyof typeof colorClasses;

export type TabsProps = {
  tabs: Array<Tab>;
  variant?: TabsVariant;
  color?: TabsColor;
  className?: string;
  tabClassName?: string;
};

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  variant = "underline",
  color = "gray",
  className,
  tabClassName,
}) => {
  const preferReducedMotion = useReducedMotion();

  const [activeTab, setActiveTab] = useState(0);

  const activeTabLayoutId = useId();

  return (
    <div className={className}>
      <div className="flex gap-2">
        {tabs.map((tab, i) => (
          <div
            key={i}
            className={clsx("relative cursor-pointer", tabClassName)}
            onClick={() => setActiveTab(i)}
          >
            <button className={clsx("py-1 px-2 rounded-md")}>
              {tab.label}
            </button>
            {activeTab === i && variant === "underline" && (
              <motion.div
                layoutId={preferReducedMotion ? undefined : activeTabLayoutId}
                className={clsx(
                  "w-full h-0.5 mt-0.5 rounded",
                  colorClasses[color]
                )}
              />
            )}
            {activeTab === i && variant === "pills" && (
              <motion.div
                layoutId={preferReducedMotion ? undefined : activeTabLayoutId}
                className={clsx(
                  "absolute inset-0 -z-10 rounded",
                  colorClasses[color]
                )}
              />
            )}
          </div>
        ))}
      </div>

      <div>{tabs[activeTab].content}</div>
    </div>
  );
};
