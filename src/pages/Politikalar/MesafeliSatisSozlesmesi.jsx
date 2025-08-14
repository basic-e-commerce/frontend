import "./Politika.scss";
import companyData from "./companyData.json";

const MesafeliSatisSozlesmesi = () => {
  return (
    <div className="mesafeli-satis-sozlesmesi container">
      <h1>Mesafeli Satış Sözleşmesi</h1>

      <h2>1. Taraflar</h2>
      <p>
        Bu sözleşme, aşağıda bilgileri yer alan satıcı ile elektronik ortamda
        ürün/hizmet satın alan alıcı arasında, {companyData.legal.consumerLaw}{" "}
        ve ilgili Mesafeli Sözleşmeler Yönetmeliği kapsamında düzenlenmiştir.
      </p>
      <p style={{ marginTop: "1rem" }}>
        <strong>Satıcı:</strong>
        <br />
        Ünvan: {companyData.company.fullName}
        <br />
        Faaliyet Alanı: {companyData.company.businessArea}
        <br />
        Adres: {companyData.company.address.fullAddress}
        <br />
        E-posta: {companyData.company.contact.email}
        <br />
        Telefon: {companyData.company.contact.phone}
      </p>

      <h2>2. Konu</h2>
      <p>
        Bu sözleşmenin konusu, alıcının, satıcıya ait internet sitesi üzerinden
        elektronik ortamda sipariş verdiği ürünlerin satışı ve teslimi ile
        ilgili hak ve yükümlülüklerin belirlenmesidir.
      </p>

      <h2>3. Ürün Bilgileri</h2>
      <p>
        Ürün türü, adeti, satış bedeli ve teslimat bilgileri, sipariş sırasında
        alıcı tarafından onaylanan özet bilgilerde yer almaktadır.
      </p>

      <h2>4. Teslimat</h2>
      <p>
        Ürün, alıcının sipariş formunda belirttiği adrese, sistemimize entegre
        edilmiş <strong>{companyData.services.cargo} Kargo</strong> aracılığıyla
        teslim edilir.
      </p>

      <h2>5. Ödeme Bilgileri</h2>
      <p>
        Ödeme, güvenli ödeme altyapısı {companyData.services.payment} üzerinden
        online olarak alınır.
      </p>

      <h2>6. Cayma Hakkı</h2>
      <p>
        Alıcı, 14 gün içinde cayma hakkına sahiptir. Ancak gıda, içecek gibi
        çabuk bozulabilen ürünlerde cayma hakkı bulunmamaktadır.
      </p>

      <h2>7. Kişisel Verilerin Korunması</h2>
      <p>
        Alıcıya ait kişisel veriler, KVKK kapsamında korunmakta ve yalnızca
        sözleşmenin ifası amacıyla kullanılmaktadır. Veriler hash'li olarak
        güvenli biçimde saklanır.
      </p>

      <h2>8. Yetkili Merciler</h2>
      <p>
        Sözleşmeden doğabilecek uyuşmazlıklarda, Gümrük ve Ticaret Bakanlığı
        tarafından ilan edilen değere kadar İl/İlçe Tüketici Hakem Heyetleri; bu
        değerin üzerindeki durumlarda ise Tüketici Mahkemeleri yetkilidir.
      </p>

      <h2>9. Yürürlük</h2>
      <p>
        Alıcı, site üzerinden sipariş vererek bu sözleşmeyi elektronik ortamda
        kabul etmiş sayılır.
      </p>
    </div>
  );
};

export default MesafeliSatisSozlesmesi;
