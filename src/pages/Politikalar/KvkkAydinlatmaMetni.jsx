import "./Politika.scss";

const KvkkAydinlatmaMetni = () => {
  return (
    <div className="kvkkAydinlatmaMetni container">
      <h1>KVKK Aydınlatma Metni</h1>

      <p>
        Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu
        (“KVKK”) uyarınca, <strong>Uğur Soner Doğan</strong> (Şahıs firması)
        tarafından, veri sorumlusu sıfatıyla kişisel verilerinizin işlenmesine
        ilişkin olarak hazırlanmıştır.
      </p>
      <p>
        <strong>İşletme Unvanı:</strong> Uğur Soner Doğan
        <br />
        <strong>Adres:</strong> Cevatpaşa Mah. Kazım Karabekir Sokak No:22A
        Merkez / Çanakkale
        <br />
        <strong>Ana Faaliyet Alanı:</strong> Bakkal ve marketlerde yapılan
        perakende ticaret (gıda, içecek)
      </p>

      <h2>1. Kişisel Verilerin İşlenme Amaçları</h2>
      <p>
        Toplanan kişisel verileriniz; e-ticaret faaliyetlerinin yürütülmesi,
        sipariş süreçlerinin yönetilmesi, kargo ve teslimat işlemlerinin
        gerçekleştirilmesi (Geliver kargo entegrasyonu dahil), kullanıcı
        hesaplarının güvenliğinin sağlanması (örneğin HTTPOnly cookie ile
        refresh token işlemleri), pazarlama ve reklam faaliyetleri
        (Facebook/Meta Pixel algoritması aracılığıyla), müşteri destek
        hizmetlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi
        amaçlarıyla işlenmektedir.
      </p>

      <h2>2. İşlenen Kişisel Veriler</h2>
      <p>
        İşlenen başlıca kişisel veriler şunlardır:
        <ul>
          <li>Kimlik bilgileri (ad, soyad)</li>
          <li>İletişim bilgileri (telefon numarası, e-posta adresi, adres)</li>
          <li>Ödeme ve fatura bilgileri</li>
          <li>Çerez verileri (HTTPOnly Cookie, Refresh Token)</li>
          <li>Kullanıcı davranış bilgileri (Pixel ile elde edilen veriler)</li>
        </ul>
        Verileriniz, sistemlerimizde{" "}
        <strong>hash’lenmiş şekilde güvenli olarak</strong> saklanmaktadır.
      </p>

      <h2>3. Kişisel Verilerin Aktarılması</h2>
      <p>
        Kişisel verileriniz;
        <ul>
          <li>Kargo şirketlerine (örneğin Geliver)</li>
          <li>Yazılım, bulut, ödeme ve pazarlama altyapı sağlayıcılarına</li>
          <li>Yetkili kamu kurum ve kuruluşlarına</li>
        </ul>
        KVKK’nın 8. ve 9. maddelerine uygun olarak aktarılabilir.
      </p>

      <h2>4. Veri Toplama Yöntemi ve Hukuki Sebep</h2>
      <p>
        Kişisel verileriniz, e-ticaret sitemiz, mobil uygulamamız, çerezler,
        kargo entegrasyonları ve iletişim formları aracılığıyla elektronik
        ortamda toplanmakta olup;
        <ul>
          <li>Sözleşmenin kurulması ve ifası</li>
          <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
          <li>Meşru menfaatlerimiz için veri işlenmesinin zorunlu olması</li>
          <li>Açık rızanız (pazarlama çerezleri ve benzeri alanlar için)</li>
        </ul>
        hukuki sebeplerine dayanarak işlenmektedir.
      </p>

      <h2>5. KVKK Kapsamındaki Haklarınız</h2>
      <p>
        KVKK’nın 11. maddesi uyarınca, veri sahipleri olarak aşağıdaki haklara
        sahipsiniz:
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme
          </li>
          <li>
            Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
          </li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li>KVKK’ya uygun olarak silinmesini veya yok edilmesini isteme</li>
          <li>
            Bu işlemlerin aktarıldığı üçüncü kişilere bildirilmesini isteme
          </li>
          <li>
            Otomatik sistemlerle analiz sonucu aleyhinize bir sonucun ortaya
            çıkmasına itiraz etme
          </li>
          <li>Zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
      </p>

      <h2>İletişim</h2>
      <p>
        KVKK kapsamındaki haklarınızı kullanmak için bizimle iletişime
        geçebilirsiniz:
        <br />
        <strong>E-posta:</strong> [E-posta adresinizi buraya yazabilirsiniz]
        <br />
        <strong>Adres:</strong> Cevatpaşa Mah. Kazım Karabekir Sokak No:22A
        Merkez / Çanakkale
        <br />
        <strong>Veri Sorumlusu:</strong> Uğur Soner Doğan
      </p>
    </div>
  );
};

export default KvkkAydinlatmaMetni;
