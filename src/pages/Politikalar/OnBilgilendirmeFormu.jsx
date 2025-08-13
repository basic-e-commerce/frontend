import { Link } from "react-router-dom";
import "./Politika.scss";

const OnBilgilendirmeFormu = () => {
  return (
    <div className="bilgilendirme-formu container">
      <h1>Ön Bilgilendirme Formu</h1>

      <h2>Satıcı Bilgileri</h2>
      <p>
        <strong>Unvan:</strong> Uğur Soner Doğan (Şahıs Firması)
      </p>
      <p>
        <strong>Faaliyet Alanı:</strong> Bakkal ve marketlerde yapılan perakende
        ticaret (Gıda, içecek)
      </p>
      <p>
        <strong>İş Yeri Adresi:</strong> Cevatpaşa Mah. Kazım Karabekir Sokak
        No:22A Merkez / Çanakkale
      </p>
      <p>
        <strong>E-posta:</strong>info@gulcegida.com
      </p>
      <p>
        <strong>Telefon:</strong> +90 541 687 75 02
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
        Siparişleriniz, anlaşmalı kargo firması <strong>Geliver</strong> ile
        gönderilmektedir. Siparişler, stok durumuna göre en geç 3 iş günü içinde
        kargoya teslim edilir. Kargo ücreti ve teslim süresi sipariş sırasında
        belirtilecektir.
      </p>

      <h2>Ödeme Yöntemleri</h2>
      <p>
        Müşteri, kredi kartı/banka kartı ile ödeme yapabilir. Ödemelerde{" "}
        <strong>httponly cookie</strong> ve <strong>refresh token</strong>
        teknolojileri kullanılmaktadır. İşlem güvenliği en üst düzeyde
        sağlanmakta olup, müşteri verileri hash’li olarak sistemimizde
        saklanmaktadır.
      </p>

      <h2>Kişisel Verilerin Korunması</h2>
      <p>
        Kişisel veriler, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)
        kapsamında korunmaktadır. Kullanıcı verileri, yalnızca yasal
        zorunluluklar ve hizmet sunumu kapsamında işlenmekte olup, üçüncü
        kişilerle paylaşılmamaktadır. Ayrıca Meta Pixel teknolojisi yalnızca
        istatistik ve reklam optimizasyonu amacıyla kullanılmaktadır.
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
        Bu form, <strong>Mesafeli Satış Sözleşmesi</strong>’nin ayrılmaz bir
        parçasıdır. Sipariş onayından önce müşteri bu formu okuyarak onaylamış
        sayılır.
      </p>
    </div>
  );
};

export default OnBilgilendirmeFormu;
