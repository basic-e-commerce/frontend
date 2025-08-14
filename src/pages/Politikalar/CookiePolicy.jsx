import "./Politika.scss";
import companyData from "./companyData.json";

const CookiePolicy = () => {
  return (
    <div className="cookiePolicy container">
      <h1>Çerez Politikası</h1>

      <h2>1. Taraflar ve Amaç</h2>
      <p>
        Bu Çerez Politikası, <strong>{companyData.company.name}</strong> şahıs
        firmasına ait olan ve {companyData.company.address.fullAddress}{" "}
        adresinde faaliyet gösteren işletmeye ait e-ticaret web sitesi üzerinden
        sunulan hizmetlerde kullanılan çerezlerin kullanım koşullarını açıklamak
        amacıyla hazırlanmıştır.
      </p>

      <h2>2. Çerez (Cookie) Nedir?</h2>
      <p>
        Çerezler, bir internet sitesini ziyaret ettiğinizde tarayıcınız
        aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Bu
        dosyalar, web sitesinin daha verimli çalışmasını sağlamak, kullanıcı
        deneyimini geliştirmek ve bazı analizlerin yapılmasına olanak tanımak
        için kullanılır.
      </p>

      <h2>3. Hangi Çerezleri Kullanıyoruz?</h2>
      <p>Sitemizde aşağıdaki türde çerezler kullanılmaktadır:</p>
      <ul>
        <li>
          <strong>Zorunlu (Temel) Çerezler:</strong> Web sitemizin düzgün
          şekilde çalışması için gereklidir. Örneğin, oturum yönetimi ve
          güvenlik için kullanılan <strong>HttpOnly Refresh Token</strong>{" "}
          çerezi bu kapsamdadır.
        </li>
        <li>
          <strong>Performans ve Analiz Çerezleri:</strong> Kullanıcıların
          sitemizi nasıl kullandığına dair anonim veriler toplar. Bu veriler,
          siteyi geliştirmemize yardımcı olur.
        </li>
        <li>
          <strong>Reklam ve Hedefleme Çerezleri:</strong>{" "}
          <strong>{companyData.services.analytics} Pixel</strong> gibi
          algoritmalar aracılığıyla kullanıcı davranışlarını analiz ederek
          kişiselleştirilmiş reklamlar sunmamıza olanak tanır.
        </li>
      </ul>

      <h2>4. Üçüncü Taraf Çerezleri</h2>
      <p>
        Web sitemiz,{" "}
        <strong>{companyData.services.cargo} Kargo Entegrasyonu</strong> gibi
        üçüncü taraf hizmetleri kullanabilir. Bu hizmetler de kendi çerezlerini
        kullanabilir. Bu tür çerezler hakkında detaylı bilgi ilgili üçüncü taraf
        sağlayıcılarının politikalarında yer almaktadır.
      </p>

      <h2>5. Kişisel Verilerin Korunması</h2>
      <p>
        Topladığımız kişisel veriler, <strong>hashlenmiş şekilde</strong>{" "}
        güvenli olarak sistemimizde saklanmakta ve {companyData.legal.kvkkLaw}
        &apos;na uygun olarak işlenmektedir. Detaylı bilgi için{" "}
        <strong>Gizlilik Politikamızı</strong> inceleyebilirsiniz.
      </p>

      <h2>6. Çerezlerin Yönetimi</h2>
      <p>
        Tarayıcı ayarlarınız üzerinden çerezleri kontrol edebilir, silebilir ya
        da tamamen engelleyebilirsiniz. Ancak bu durumda sitemizin bazı
        bölümleri düzgün çalışmayabilir.
      </p>
      <p>
        <strong>Çerez Ayarları:</strong> Chrome, Firefox, Safari, Edge gibi
        tarayıcılar üzerinden çerezleri yönetebilirsiniz.
      </p>

      <h2>7. İletişim</h2>
      <p>
        Çerez politikamız hakkında sorularınız varsa veya KVKK kapsamında
        taleplerinizi iletmek isterseniz aşağıdaki adrese başvurabilirsiniz:
      </p>
      <ul>
        <li>
          <strong>Firma Adı:</strong> {companyData.company.fullName}
        </li>
        <li>
          <strong>Adres:</strong> {companyData.company.address.fullAddress}
        </li>
        <li>
          <strong>E-posta:</strong> {companyData.company.contact.email}
        </li>
        <li>
          <strong>Telefon:</strong> {companyData.company.contact.phone}
        </li>
      </ul>
    </div>
  );
};

export default CookiePolicy;
