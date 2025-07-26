export const useOrderStatus = () => {
  const translateOrderStatus = (status) => {
    switch (status) {
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
        return "Bilinmiyor";
    }
  };

  return { translateOrderStatus };
};
