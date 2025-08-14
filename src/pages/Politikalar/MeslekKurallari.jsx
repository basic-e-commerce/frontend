import "./Politika.scss";
import companyData from "./companyData.json";

const MeslekKurallari = () => {
  return (
    <div className="meslek-kurallari container">
      <h1>Meslek Odası ve Davranış Kuralları</h1>
      <p>
        <strong>Yürürlük Tarihi:</strong>{" "}
        {companyData.policies.meslekKurallariDate}
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
        <strong>İletişim Bilgisi:</strong> {companyData.company.contact.email}
      </p>

      <h2>1. Meslek Odası Bilgileri</h2>
      <p>
        İşletmemiz, <strong>{companyData.professional.chamber}</strong>
        'na kayıtlıdır. Oda,{" "}
        <strong>{companyData.professional.confederation}</strong>'e bağlı olarak
        faaliyet göstermektedir.
      </p>
      <p>
        TESK Resmi Web Sitesi:{" "}
        <a
          href={companyData.professional.teskWebsite}
          target="_blank"
          rel="noopener noreferrer"
        >
          www.tesk.org.tr
        </a>
      </p>

      <h2>2. Meslekle İlgili Davranış Kuralları</h2>
      <ul>
        <li>{companyData.legal.esnafLaw}'na uymak.</li>
        <li>
          Fiyat tarifelerini mevzuata uygun hazırlamak ve görünür şekilde
          sergilemek.
        </li>
        <li>Gıda güvenliği ve hijyen şartlarını sağlamak.</li>
        <li>Son kullanma tarihi geçmiş, kaçak veya sahte ürün satmamak.</li>
        <li>Tüketici Kanunu'na uygun satış ve iade süreçlerini uygulamak.</li>
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
          Yerel meslek odasının web sitesi ({companyData.professional.chamber})
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
