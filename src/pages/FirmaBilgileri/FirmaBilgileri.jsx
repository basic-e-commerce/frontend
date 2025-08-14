import "./FirmaBilgileri.scss";
import { firmaBilgileri } from "../Politikalar/companyData.json";

const FirmaBilgileri = () => {
  return (
    <div className="firma-bilgileri">
      <div className="container">
        <h1 className="page-title">Firma Bilgileri</h1>

        <div className="firma-table">
          <div className="table-row">
            <div className="table-label">Firma Adı</div>
            <div className="table-value">{firmaBilgileri.firmaAdi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Telefon</div>
            <div className="table-value">{firmaBilgileri.telefon1}</div>
          </div>

          <div className="table-row">
            <div className="table-label">E-mail</div>
            <div className="table-value">{firmaBilgileri.email}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Adres</div>
            <div className="table-value">{firmaBilgileri.adres}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Ülke</div>
            <div className="table-value">{firmaBilgileri.ulke}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Şehir</div>
            <div className="table-value">{firmaBilgileri.sehir}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Semt</div>
            <div className="table-value">{firmaBilgileri.semt}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Esnaf ve Sanatkar Sicil No</div>
            <div className="table-value">{firmaBilgileri.sicilNumarasi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Vergi No</div>
            <div className="table-value">{firmaBilgileri.vergiNo}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Vergi Dairesi</div>
            <div className="table-value">{firmaBilgileri.vergiDairesi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Kep Adresi</div>
            <div className="table-value">{firmaBilgileri.kepAdresi}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmaBilgileri;
