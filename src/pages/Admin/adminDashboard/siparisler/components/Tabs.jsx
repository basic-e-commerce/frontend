import "../Tabs.scss";
import { useTabLabels } from "../hooks";

const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  const { getTabLabel } = useTabLabels();

  return (
    <div className="tabs">
      {tabs?.map((tab) => (
        <div
          key={tab}
          className={`tab ${selectedTab === tab ? "active" : ""}`}
          onClick={() => setSelectedTab(tab)}
        >
          {getTabLabel(tab)}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
