export const useOrderStatus = () => {
  const translateOrderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "İşleniyor";
      case "APPROVED":
        return "Onaylandı";
      case "SHIPPED":
        return "Kargoya Verildi";
      case "DELIVERED":
        return "Teslim Edildi";
      case "CANCELLED":
        return "İptal Edildi";
      default:
        return "Bilinmiyor";
    }
  };

  return { translateOrderStatus };
};
