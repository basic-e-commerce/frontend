import "./Politika.scss";

const MeslekKurallari = () => {
  return (
    <div className="meslek-kurallari container">
      <h1>Meslek Odası ve Davranış Kuralları</h1>
      <p>
        <strong>Yürürlük Tarihi:</strong> 13.08.2025
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
        <strong>İletişim Bilgisi:</strong> info@gulcegida.com
      </p>

      <h2>1. Meslek Odası Bilgileri</h2>
      <p>
        İşletmemiz, <strong>Çanakkale Bakkallar ve Bayiler Esnaf Odası</strong>
        ’na kayıtlıdır. Oda,{" "}
        <strong>Türkiye Esnaf ve Sanatkârlar Konfederasyonu (TESK)</strong>’e
        bağlı olarak faaliyet göstermektedir.
      </p>
      <p>
        TESK Resmi Web Sitesi:{" "}
        <a
          href="https://www.tesk.org.tr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.tesk.org.tr
        </a>
      </p>

      <h2>2. Meslekle İlgili Davranış Kuralları</h2>
      <ul>
        <li>
          5362 sayılı Esnaf ve Sanatkârlar Meslek Kuruluşları Kanunu’na uymak.
        </li>
        <li>
          Fiyat tarifelerini mevzuata uygun hazırlamak ve görünür şekilde
          sergilemek.
        </li>
        <li>Gıda güvenliği ve hijyen şartlarını sağlamak.</li>
        <li>Son kullanma tarihi geçmiş, kaçak veya sahte ürün satmamak.</li>
        <li>Tüketici Kanunu’na uygun satış ve iade süreçlerini uygulamak.</li>
      </ul>

      <h2>3. Elektronik Olarak Ulaşım</h2>
      <p>
        Meslek kurallarına ve ilgili mevzuata şu kaynaklardan ulaşabilirsiniz:
      </p>
      <ul>
        <li>
          <a
            href="https://www.tesk.org.tr/tr/mevzuat"
            target="_blank"
            rel="noopener noreferrer"
          >
            TESK – Mevzuat Bölümü
          </a>
        </li>
        <li>
          <a
            href="https://www.tarimorman.gov.tr"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tarım ve Orman Bakanlığı – Gıda Hijyeni Yönetmeliği
          </a>
        </li>
        <li>
          Yerel meslek odasının web sitesi (Çanakkale Bakkallar ve Bayiler Esnaf
          Odası)
        </li>
      </ul>

      <h2>4. Değişiklikler</h2>
      <p>
        Meslek kuralları ve mevzuat zaman zaman güncellenebilir. En güncel
        bilgiler her zaman resmi web siteleri ve odamız aracılığıyla duyurulur.
      </p>
    </div>
  );
};

export default MeslekKurallari;
