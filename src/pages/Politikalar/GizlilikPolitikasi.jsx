import "./Politika.scss";

const GizlilikPolitikasi = () => {
  return (
    <div className="privacy-policy container">
      <h1>Gizlilik Politikası</h1>
      <p>
        <strong>Yürürlük Tarihi:</strong> 07.08.2025
      </p>
      <p>
        <strong>İşletme Adı:</strong> Uğur Soner Doğan – Şahıs Firması
      </p>
      <p>
        <strong>İş Yeri Adresi:</strong> Cevatpaşa Mah. Kazım Karabekir Sokak
        No:22A Merkez / Çanakkale
      </p>
      <p>
        <strong>Ana Faaliyet Alanı:</strong> Bakkal ve marketlerde yapılan
        perakende ticaret (Gıda, içecek)
      </p>
      <p>
        <strong>İletişim Bilgisi: </strong> info@gulcegida.com
      </p>

      <h2>1. Kişisel Verilerin Korunması</h2>
      <p>
        Tarafımıza iletilen tüm kişisel veriler,{" "}
        <strong>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</strong>{" "}
        başta olmak üzere yürürlükteki mevzuata uygun şekilde işlenmekte,
        saklanmakta ve korunmaktadır. Müşterilerimizin kişisel verileri, sadece
        belirli amaçlarla sınırlı olarak ve açık rızaları doğrultusunda
        işlenmektedir.
      </p>
      <p>
        <strong>Saklama Şekli:</strong> Kişisel veriler, kendi sistemimizde{" "}
        <strong>hash algoritmaları</strong> ile korunmakta ve güvenli veri
        tabanlarında saklanmaktadır.
      </p>

      <h2>2. Çerez (Cookie) Kullanımı</h2>
      <p>
        Web sitemizde kullanıcı deneyimini geliştirmek ve analiz süreçlerini
        desteklemek amacıyla <strong>çerezler (cookies)</strong>{" "}
        kullanılmaktadır. Bu çerezler;
      </p>
      <ul>
        <li>Ziyaretçi tercihlerini hatırlamak,</li>
        <li>Web sitesi trafiğini analiz etmek,</li>
        <li>
          <strong>Meta Pixel</strong> teknolojisi ile kullanıcı davranışlarını
          analiz ederek reklam performansını artırmak,
        </li>
        <li>
          Giriş oturumlarının güvenliğini sağlamak için{" "}
          <strong>HttpOnly refresh token cookie'leri</strong> kullanmak
        </li>
      </ul>
      <p>
        Kullanıcılar, tarayıcı ayarları üzerinden zorunlu çerezler dışındaki
        çerezlerin kullanımını kontrol edebilir veya tamamen devre dışı
        bırakabilir.
      </p>

      <h2>3. Üçüncü Taraf Entegrasyonlar</h2>
      <p>
        Sitemizde, sipariş süreçlerini daha hızlı ve verimli kılmak adına{" "}
        <strong>Geliver Kargo entegrasyonu</strong> kullanılmaktadır. Bu
        entegrasyon aracılığıyla yalnızca gönderim için gerekli olan bilgiler
        paylaşılır ve üçüncü taraf hizmet sağlayıcının da veri koruma
        yükümlülüklerine uygun hareket etmesi beklenmektedir.
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
        <li>KVKK’ya uygun olarak silinmesini veya yok edilmesini isteme,</li>
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
