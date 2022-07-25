import { Switch } from "@/components/Switch";
import { Tab, Tabs, TabsColor, TabsVariant } from "@/components/Tabs";
import { NextPage } from "next";
import { useState } from "react";

const IndexPage: NextPage = () => {
  const [tabsVariant, setTabsVariant] = useState<TabsVariant>("underline");
  const [tabsColor, setTabsColor] = useState<TabsColor>("gray");

  const updateTabsVariant = () => {
    if (tabsVariant === "underline") {
      return setTabsVariant("pills");
    }

    setTabsVariant("underline");
  };

  const updateTabsColor = () => {
    if (tabsColor === "gray") setTabsColor("red");
    else if (tabsColor === "red") setTabsColor("blue");
    else if (tabsColor === "blue") setTabsColor("purple");
    else if (tabsColor === "purple") setTabsColor("gray");
  };

  return (
    <div className="p-2">
      <h1 className="text-xl">
        learning{" "}
        <a
          href="https://framer.com/motion"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline hover:text-blue-400"
        >
          <code className="bg-gray-300 shadow-sm py-1 px-2 rounded">
            framer-motion
          </code>
        </a>{" "}
        here
      </h1>

      <div className="flex gap-2 my-2">
        <button onClick={updateTabsVariant}>change tabs variant</button>
        <button onClick={updateTabsColor}>change tabs color</button>
      </div>

      <Tabs
        tabs={tabs}
        variant={tabsVariant}
        color={tabsColor}
        className="mt-2"
        tabClassName="text-sm"
      />
    </div>
  );
};

const SwitchesTab: React.FC = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Switch size="large" />
      <Switch size="medium" />
      <Switch size="small" />

      <hr />

      <Switch color="gray" />
      <Switch color="purple" />
      <Switch color="red" />
      <Switch color="green" />
      <Switch color="blue" defaultValue={true} />

      <hr />

      <h3>Controlled switch</h3>
      <pre>{JSON.stringify({ isOn }, undefined, "  ")}</pre>

      <Switch
        checked={isOn}
        onCheckedChange={setIsOn}
        color="gray"
        checkedClassName="!bg-green-500"
      />
    </div>
  );
};

const tabs: Array<Tab> = [
  {
    label: "Switches",
    content: <SwitchesTab />,
  },
  {
    label: "empty",
    content: (
      <div>
        <h2>hi mom</h2>
      </div>
    ),
  },
  {
    label: "very long tab label",
    content: (
      <div>
        <h2>Never gonna give you up</h2>
      </div>
    ),
  },
];

export default IndexPage;
