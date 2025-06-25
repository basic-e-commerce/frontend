import "./Tabs.scss";

const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="tabs">
      {tabs?.map((tab) => (
        <div
          key={tab}
          className={`tab ${selectedTab === tab ? "active" : ""}`}
          onClick={() => {
            setSelectedTab(tab);
          }}
        >
          {tab === "APPROVED"
            ? "Onaylanmış"
            : tab === "PENDING"
            ? "Bekleyenler"
            : tab === "REJECTED"
            ? "Reddedilenler"
            : "Bitenler"}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
