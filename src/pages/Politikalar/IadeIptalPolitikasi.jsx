import { Link } from "react-router-dom";
import companyData from "./companyData.json";

const IadeIptalPolitikasi = () => {
  return (
    <div className="iadeveiptalpolitikasi container">
      <h1>İade ve İptal Politikası</h1>

      <p>
        Bu İade ve İptal Politikası, <strong>{companyData.company.name}</strong>{" "}
        adına faaliyet gösteren şahıs firması tarafından işletilen e-ticaret
        sitesi üzerinden yapılan alışverişlerde geçerlidir.
      </p>

      <p>
        <strong>Firma Ünvanı:</strong> {companyData.company.name}
        <br />
        <strong>Ana Faaliyet Alanı:</strong> {companyData.company.businessArea}
        <br />
        <strong>İş Yeri Adresi:</strong>{" "}
        {companyData.company.address.fullAddress}
      </p>

      <h2>Sipariş İptali</h2>
      <ul>
        <li>
          Siparişinizi, kargo işlemleri başlamadan önce{" "}
          <Link to="/iletisim">
            <strong>iletişim sayfamızdan</strong>
          </Link>{" "}
          ya da müşteri hizmetleri üzerinden iptal talebinde bulunarak ücretsiz
          şekilde iptal edebilirsiniz.
        </li>
        <li>
          Kargoya verilen siparişlerde iptal işlemi mümkün değildir; bu durumda
          iade süreci devreye girer.
        </li>
      </ul>

      <h2>İade Koşulları</h2>
      <ul>
        <li>
          İade hakkı, mesafeli satış sözleşmesi uyarınca 14 gün içinde
          kullanılabilir.
        </li>
        <li>
          İade edilecek ürün;
          <ul>
            <li>Orijinal ambalajında,</li>
            <li>Kullanılmamış,</li>
            <li>Satılabilir özelliğini kaybetmemiş olmalıdır.</li>
          </ul>
        </li>
        <li>
          Gıda ve hızlı tüketim ürünlerinde (bozulma riski olan, son kullanma
          tarihi yakın ürünler vb.) cayma hakkı yasal olarak kullanılamaz.
        </li>
        <li>
          Dijital ürünler veya hizmetler için cayma hakkı, hizmetin ifasına
          başlanmamış olması koşuluna bağlıdır.
        </li>
      </ul>

      <h2>İade Süreci</h2>
      <ul>
        <li>Ürün bize ulaştıktan sonra 3 iş günü içerisinde incelenir.</li>
        <li>
          İade uygun bulunursa, ödeme yöntemine bağlı olarak 7 iş günü
          içerisinde ücret iadesi gerçekleştirilir.
        </li>
        <li>
          Kargo bedeli, yalnızca ürünün kusurlu çıkması halinde tarafımızca
          karşılanır. Diğer durumlarda kargo ücreti iade edilmez.
        </li>
      </ul>

      <h2>Gizlilik ve Güvenlik</h2>
      <p>
        Kişisel verilerinizin korunması ve işlenmesi hakkında detaylı bilgi için
        lütfen{" "}
        <Link to="/gizlilikpolitikasi">
          <strong>Gizlilik Politikamızı</strong>
        </Link>{" "}
        inceleyiniz.
      </p>

      <h2>İletişim</h2>
      <p>
        Her türlü soru ve talepleriniz için bizimle{" "}
        <Link to="/iletisim">
          <strong>iletişim sayfası</strong>
        </Link>{" "}
        üzerinden ya da e-posta / telefon yoluyla iletişime geçebilirsiniz.
      </p>
    </div>
  );
};

export default IadeIptalPolitikasi;
