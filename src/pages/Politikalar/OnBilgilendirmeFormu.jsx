import { Link } from "react-router-dom";
import "./Politika.scss";
import companyData from "./companyData.json";

const OnBilgilendirmeFormu = () => {
  return (
    <div className="bilgilendirme-formu container">
      <h1>Ön Bilgilendirme Formu</h1>

      <h2>Satıcı Bilgileri</h2>
      <p>
        <strong>Unvan:</strong> {companyData.company.fullName}
      </p>
      <p>
        <strong>Faaliyet Alanı:</strong> {companyData.company.businessArea}
      </p>
      <p>
        <strong>İş Yeri Adresi:</strong>{" "}
        {companyData.company.address.fullAddress}
      </p>
      <p>
        <strong>E-posta:</strong>
        {companyData.company.contact.email}
      </p>
      <p>
        <strong>Telefon:</strong> {companyData.company.contact.phone}
      </p>

      <h2>Ürün ve Hizmet Bilgileri</h2>
      <p>
        Sitemizde satışa sunulan ürünlerin temel özellikleri, ürün detay
        sayfalarında yer almakta olup, müşteri tarafından sipariş verilmeden
        önce incelenmesi mümkündür. Satışa sunulan ürünlerin tümü vergiler dahil
        Türk Lirası (TL) cinsinden fiyatlandırılmıştır.
      </p>

      <h2>Teslimat ve Kargo</h2>
      <p>
        Siparişleriniz, anlaşmalı kargo firması{" "}
        <strong>{companyData.services.cargo}</strong> ile gönderilmektedir.
        Siparişler, stok durumuna göre en geç 3 iş günü içinde kargoya teslim
        edilir. Kargo ücreti ve teslim süresi sipariş sırasında belirtilecektir.
      </p>

      <h2>Ödeme Yöntemleri</h2>
      <p>
        Müşteri, kredi kartı/banka kartı ile ödeme yapabilir. Ödemelerde{" "}
        <strong>httponly cookie</strong> ve <strong>refresh token</strong>
        teknolojileri kullanılmaktadır. İşlem güvenliği en üst düzeyde
        sağlanmakta olup, müşteri verileri hash'li olarak sistemimizde
        saklanmaktadır.
      </p>

      <h2>Kişisel Verilerin Korunması</h2>
      <p>
        Kişisel veriler, {companyData.legal.kvkkLaw} kapsamında korunmaktadır.
        Kullanıcı verileri, yalnızca yasal zorunluluklar ve hizmet sunumu
        kapsamında işlenmekte olup, üçüncü kişilerle paylaşılmamaktadır. Ayrıca{" "}
        {companyData.services.analytics} Pixel teknolojisi yalnızca istatistik
        ve reklam optimizasyonu amacıyla kullanılmaktadır.
      </p>

      <h2>Cayma Hakkı ve İade Şartları</h2>
      <p>
        Müşteri, mesafeli satış kapsamında 14 gün içinde herhangi bir gerekçe
        göstermeksizin cayma hakkına sahiptir. Gıda ürünleri gibi çabuk
        bozulabilen veya son kullanma tarihi geçebilecek ürünlerde cayma hakkı
        geçerli değildir.
      </p>
      <p>
        İade için ürünün kullanılmamış, ambalajının bozulmamış ve tekrar
        satılabilir durumda olması gereklidir. İade koşulları ve süreci hakkında
        detaylı bilgi için lütfen{" "}
        <Link to={"/"}>
          <strong>iade politikası sayfasını</strong>
        </Link>{" "}
        ziyaret edin veya bizimle iletişime geçin.
      </p>

      <h2>Diğer Hükümler</h2>
      <p>
        Bu form, <strong>Mesafeli Satış Sözleşmesi</strong>'nin ayrılmaz bir
        parçasıdır. Sipariş onayından önce müşteri bu formu okuyarak onaylamış
        sayılır.
      </p>
    </div>
  );
};

export default OnBilgilendirmeFormu;
