export const handleApiError = (error) => {
  if (!error.response) {
    console.error("Network error");
    return "Sunucuya ulaşılamıyor. İnternet bağlantınızı kontrol edin.";
  }

  const status = error.response.status;
  switch (status) {
    case 400:
      return "Geçersiz istek.";
    case 401:
      return "Yetkisiz giriş. Lütfen tekrar giriş yapın.";
    case 403:
      return "Bu işlem için yetkiniz yok.";
    case 404:
      return "İstenen veri bulunamadı.";
    case 500:
      return "Sunucu hatası. Daha sonra tekrar deneyin.";
    default:
      return "Bilinmeyen bir hata oluştu.";
  }
};
