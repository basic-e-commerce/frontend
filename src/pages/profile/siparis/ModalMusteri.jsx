const ModalMusteri = ({ handleCloseModal, selectedOrder }) => {
  const invoice = selectedOrder.invoiceResponseDto;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={handleCloseModal}>
          ×
        </button>

        {/* Kullanıcı ve Fatura Bilgileri */}
        <div className="info-wrapper" style={{ display: "flex", gap: "2rem" }}>
          {/* Kullanıcı Bilgileri Tablosu */}
          <table className="info-table">
            <tbody>
              <tr>
                <td>
                  <strong>Sipariş Kodu:</strong>
                </td>
                <td>{selectedOrder.orderCode}</td>
              </tr>
              <tr>
                <td>
                  <strong>Ad Soyad:</strong>
                </td>
                <td>
                  {selectedOrder.firstName} {selectedOrder.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Telefon:</strong>
                </td>
                <td>{selectedOrder.address.phoneNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Adres:</strong>
                </td>
                <td>
                  {selectedOrder.address.addressLine1},{" "}
                  {selectedOrder.address.postalCode}{" "}
                  {selectedOrder.address.city} {selectedOrder.address.country}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Fatura Adresi Tablosu */}
          <table className="billing-table">
            <tbody>
              <tr>
                <td>
                  <strong>Fatura Tipi:</strong>
                </td>
                <td>
                  {invoice?.invoiceType == "CORPORATE"
                    ? "Kurumsal"
                    : "Bireysel"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>İsim Soyisim:</strong>
                </td>
                <td>
                  {invoice.firstName} {invoice.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Telefon:</strong>
                </td>
                <td>{invoice.phoneNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Adres:</strong>
                </td>
                <td>
                  {invoice.addressLine1}, {invoice.postalCode} {invoice.city}{" "}
                  {invoice.countryName}
                </td>
              </tr>
              {invoice?.invoiceType === "CORPORATE" && (
                <>
                  <tr>
                    <td>
                      <strong>Ticaret Ünvanı:</strong>
                    </td>
                    <td>{invoice.corporateInvoice.companyName}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vergi No:</strong>
                    </td>
                    <td>{invoice.corporateInvoice.taxNumber}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Vergi Dairesi:</strong>
                    </td>
                    <td>{invoice.corporateInvoice.taxOffice}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Ürünler Tablosu */}
        <table className="product-table">
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Ürün Adı</th>
              <th>Adet</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.orderItemResponseDtos.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.coverImage} alt={item.productName} />
                </td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalMusteri;
