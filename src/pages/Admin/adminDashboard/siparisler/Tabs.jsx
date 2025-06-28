import "./Tabs.scss";

const Tabs = ({ tabs, selectedTab, setSelectedTab }) => {
  const getTabLabel = (tab) => {
    switch (tab) {
      case "APPROVED":
        return "Onaylanmış";
      case "PENDING":
        return "İşlenenler";
      case "SHIPPED":
        return "Kargoda Olanlar";
      case "DELIVERED":
        return "Teslim Olanlar";
      case "CANCELLED":
        return "İptal Olanlar";
      default:
        return tab;
    }
  };

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
