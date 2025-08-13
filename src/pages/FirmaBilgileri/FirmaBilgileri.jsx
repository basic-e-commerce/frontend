import React from "react";
import "./FirmaBilgileri.scss";
import firmaData from "./dummyData.json";

const FirmaBilgileri = () => {
  return (
    <div className="firma-bilgileri">
      <div className="container">
        <h1 className="page-title">Firma Bilgileri</h1>

        <div className="firma-table">
          <div className="table-row">
            <div className="table-label">Firma Adı</div>
            <div className="table-value">{firmaData.firmaAdi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Telefon</div>
            <div className="table-value">{firmaData.telefon1}</div>
          </div>

          <div className="table-row">
            <div className="table-label">E-mail</div>
            <div className="table-value">{firmaData.email}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Adres</div>
            <div className="table-value">{firmaData.adres}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Ülke</div>
            <div className="table-value">{firmaData.ulke}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Şehir</div>
            <div className="table-value">{firmaData.sehir}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Semt</div>
            <div className="table-value">{firmaData.semt}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Sicil Numarası</div>
            <div className="table-value">{firmaData.sicilNumarasi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Vergi No</div>
            <div className="table-value">{firmaData.vergiNo}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Vergi Dairesi</div>
            <div className="table-value">{firmaData.vergiDairesi}</div>
          </div>

          <div className="table-row">
            <div className="table-label">Mersis No</div>
            <div className="table-value">{firmaData.mersisNo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirmaBilgileri;
