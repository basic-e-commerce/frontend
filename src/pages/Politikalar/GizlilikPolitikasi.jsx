import "./Politika.scss";
import companyData from "./companyData.json";

const GizlilikPolitikasi = () => {
  return (
    <div className="privacy-policy container">
      <h1>Gizlilik Politikası</h1>
      <p>
        <strong>Yürürlük Tarihi:</strong> {companyData.policies.effectiveDate}
      </p>
      <p>
        <strong>İşletme Adı:</strong> {companyData.company.fullName}
      </p>
      <p>
        <strong>İş Yeri Adresi:</strong>{" "}
        {companyData.company.address.fullAddress}
      </p>
      <p>
        <strong>Ana Faaliyet Alanı:</strong> {companyData.company.businessArea}
      </p>
      <p>
        <strong>İletişim Bilgisi: </strong> {companyData.company.contact.email}
      </p>
      <p>
        <strong>Telefon: </strong> {companyData.company.contact.phone}
      </p>

      <h2>1. Kişisel Verilerin Korunması</h2>
      <p>
        Tarafımıza iletilen tüm kişisel veriler,{" "}
        <strong>{companyData.legal.kvkkLaw}</strong> başta olmak üzere
        yürürlükteki mevzuata uygun şekilde işlenmekte, saklanmakta ve
        korunmaktadır. Müşterilerimizin kişisel verileri, sadece belirli
        amaçlarla sınırlı olarak ve açık rızaları doğrultusunda işlenmektedir.
      </p>
      <p>
        <strong>Saklama Şekli:</strong> Kişisel veriler, güvenli sunucularda ve
        yetkisiz erişime karşı korumalı veri tabanlarında saklanır. Gerekli
        durumlarda endüstri standartlarında şifreleme ve güvenlik yöntemleri
        kullanılır.
      </p>

      <h2>2. Çerez (Cookie) Kullanımı</h2>
      <p>
        Web sitemizde kullanıcı deneyimini geliştirmek ve analiz süreçlerini
        desteklemek amacıyla <strong>çerezler (cookies)</strong>{" "}
        kullanılmaktadır. Bu çerezler aşağıdaki amaçlarla kullanılır:
      </p>
      <ul>
        <li>Ziyaretçi tercihlerini hatırlamak,</li>
        <li>Web sitesi trafiğini analiz etmek,</li>
        <li>
          <strong>{companyData.services.analytics} Pixel</strong> teknolojisi
          ile kullanıcı davranışlarını analiz ederek reklam performansını
          artırmak,
        </li>
        <li>Oturum güvenliğini sağlamak</li>
      </ul>
      <p>
        Kullanıcılar, tarayıcı ayarları üzerinden zorunlu çerezler dışındaki
        çerezlerin kullanımını kontrol edebilir veya tamamen devre dışı
        bırakabilir.
      </p>

      <h2>3. Üçüncü Taraf Entegrasyonlar</h2>
      <p>
        Sitemizde, sipariş süreçlerini daha hızlı ve verimli kılmak adına{" "}
        <strong>{companyData.services.cargo} Kargo entegrasyonu</strong>{" "}
        kullanılmaktadır. Bu entegrasyon aracılığıyla yalnızca gönderim için
        gerekli olan bilgiler paylaşılır ve üçüncü taraf hizmet sağlayıcının da
        veri koruma yükümlülüklerine uygun hareket etmesi beklenmektedir.
      </p>

      <h2>4. Verilerin Paylaşımı</h2>
      <p>
        Toplanan veriler, yasal zorunluluklar dışında hiçbir şekilde üçüncü
        kişilerle paylaşılmaz. Yalnızca kullanıcı onayı ile veya yasal
        mercilerden gelen resmi talepler doğrultusunda paylaşım yapılabilir.
      </p>

      <h2>5. Kullanıcı Hakları</h2>
      <p>KVKK kapsamında kullanıcıların aşağıdaki hakları bulunmaktadır:</p>
      <ul>
        <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
        <li>
          İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını
          öğrenme,
        </li>
        <li>
          Yurt içinde veya yurt dışında verilerin aktarıldığı üçüncü kişileri
          bilme,
        </li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
        <li>KVKK'ya uygun olarak silinmesini veya yok edilmesini isteme,</li>
        <li>
          Otomatik sistemler ile analiz sonucu aleyhte bir durum ortaya çıkarsa
          itiraz etme.
        </li>
      </ul>
      <p>
        Bu haklarınızı kullanmak için bizimle{" "}
        <em>[email veya iletişim formu yolu]</em> üzerinden iletişime
        geçebilirsiniz.
      </p>

      <h2>6. Gizlilik Politikası Değişiklikleri</h2>
      <p>
        Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler web
        sitemiz üzerinden duyurulacaktır. En güncel versiyon her zaman bu
        sayfada yer alır.
      </p>
    </div>
  );
};

export default GizlilikPolitikasi;
