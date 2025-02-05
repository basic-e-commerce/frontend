import { useState } from 'react'
import Baslik from '../../baslik/Baslik'
import "./SikSorulan.scss"

const SikSorulan = () => {
    const faqs = [
        {
          question: "İnşaat ruhsatı nasıl alınır?",
          answer:
            "İnşaat ruhsatı almak için öncelikle belediyeye veya ilgili kurumlara başvurmanız gerekir. Gerekli belgeler arasında tapu fotokopisi, aplikasyon krokisi, mimari proje, statik proje, elektrik ve mekanik projeler bulunur. Başvuru onaylandıktan sonra inşaat ruhsatı düzenlenir.",
        },
        {
          question: "Anahtar teslim inşaat ne anlama gelir?",
          answer:
            "Anahtar teslim inşaat, proje başlangıcından tamamlanmasına kadar tüm sürecin müteahhit firma tarafından yönetildiği bir sistemdir. Müşteri, tüm detaylar tamamlandıktan sonra yalnızca anahtarını alarak binayı kullanmaya başlayabilir.",
        },
        {
          question: "İnşaat maliyetleri nasıl hesaplanır?",
          answer:
            "İnşaat maliyetleri; arsa maliyeti, proje masrafları, malzeme giderleri, işçilik maliyetleri ve yönetmelik gerekliliklerine göre hesaplanır. Ayrıca, inşaatın türü (konut, ticari bina vb.) ve büyüklüğü de maliyetleri doğrudan etkiler. Ortalama bir metrekare maliyeti üzerinden hesaplama yapılabilir.",
        },
        {
          question: "Bir inşaat projesinde yasal olarak nelere dikkat edilmelidir?",
          answer:
            "İlgili yönetmeliklere uygun mimari ve mühendislik projeleri hazırlanmalıdır. Yapı ruhsatı, imar durumu belgesi, zemin etüt raporu gibi belgeler eksiksiz olmalıdır. Ayrıca, inşaat sırasında çevreye zarar verilmemeli ve iş güvenliği kurallarına uyulmalıdır.",
        },
      ];
      const [openIndex, setOpenIndex] = useState(null);
      const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
      };
  return (
    <div className="container">
        <div className="sikcaSorulan">
          <Baslik title="Sıkça Sorulanlar" desc="Siz sorun biz cevaplayalım" />
          <div className="acardions">
            {faqs.map((faq, index) => (
              <div
                className={`acardion ${openIndex === index ? "active" : ""}`}
                key={index}
              >
                <div
                  className="acardionSummary"
                  onClick={() => toggleAccordion(index)}
                >
                  <p>{faq.question}</p>
                  <span className="expandIcon">
                    {openIndex === index ? "-" : "+"}
                  </span>
                </div>
                <div
                  className="acardionDetails"
                  style={{ display: openIndex === index ? "block" : "none" }}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default SikSorulan
