export const useTabLabels = () => {
  const getTabLabel = (tab) => {
    switch (tab) {
      case "APPROVED":
        return "Onaylanmış";
      case "PENDING":
        return "İşlenenler";
      case "PRE_TRANSIT":
        return "Kargo Kaydı Açılmış";
      case "TRANSIT":
        return "Kargoda Olanlar";
      case "DELIVERED":
        return "Teslim Olanlar";
      case "FAILURE":
        return "Kargoda Kaybolanlar";
      case "RETURNED":
        return "İade Edilenler";
      default:
        return tab;
    }
  };

  return { getTabLabel };
};
