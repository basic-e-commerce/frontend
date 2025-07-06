export const useTabLabels = () => {
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

  return { getTabLabel };
};
