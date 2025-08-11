import "./ModalMusteri.scss";
import { useEffect } from "react";

const ModalMusteri = ({ handleCloseModal, selectedOrder }) => {
  const invoice = selectedOrder.invoiceResponseDto;
  const kargoData = selectedOrder?.orderStatusResponse?.orderPackages[0];
  const kargoIade = selectedOrder?.orderStatusResponse?.refundOrderPackages[0];

  console.log(selectedOrder);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="modal-musteri-overlay">
      <div className="modal-musteri">
        <button className="close-btn" onClick={handleCloseModal}>
          ×
        </button>

        <div className="info-wrapper" style={{ display: "flex", gap: "2rem" }}>
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
                  {selectedOrder.address.firstName}{" "}
                  {selectedOrder.address.lastName}
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

        <div className="info-wrapper" style={{ display: "flex", gap: "2rem" }}>
          <table className="billing-table">
            <tbody>
              <tr>
                <td>
                  <strong>Kupon:</strong>
                </td>
                <td>
                  {selectedOrder?.customerCouponDto?.couponCode || "Kupon Yok"}
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Taksit:</strong>
                </td>
                <td>{selectedOrder?.installment} taksit</td>
              </tr>

              <tr>
                <td>
                  <strong>Kargo:</strong>
                </td>
                <td>{selectedOrder?.shippingFee} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>Kom + Kargo Ödenen:</strong>
                </td>
                <td>{selectedOrder?.customerPrice} ₺</td>
              </tr>
            </tbody>
          </table>

          <table className="billing-table">
            <tbody>
              <tr>
                <td>
                  <strong>İlk indirimli Fiyat + Kargo:</strong>
                </td>
                <td>
                  {(selectedOrder?.substractDiscountPrice || 0) +
                    (selectedOrder?.totalPrice || 0)}{" "}
                  ₺
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Kupon İndirimi:</strong>
                </td>
                <td>{selectedOrder?.substractDiscountPrice} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>İade Tutarı:</strong>
                </td>
                <td>{selectedOrder?.refundPrice} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>Kupon Uyg. Toplam + Kargo:</strong>
                </td>
                <td>{selectedOrder?.totalPrice} ₺</td>
              </tr>
            </tbody>
          </table>
        </div>

        {kargoData && (
          <div
            className="info-wrapper"
            style={{ display: "flex", gap: "2rem" }}
          >
            <table className="billing-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Kargo Firması:</strong>
                  </td>
                  <td>{kargoData.cargoCompanyName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Kargo ID:</strong>
                  </td>
                  <td>{kargoData.cargoId}</td>
                </tr>
              </tbody>
            </table>

            <table className="billing-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Kargo Durumu:</strong>
                  </td>
                  <td>{kargoData.cargoStatus}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Kargo Nerde:</strong>
                  </td>
                  <td>{kargoData.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {kargoIade && (
          <div
            className="info-wrapper"
            style={{ display: "flex", gap: "2rem" }}
          >
            <table className="billing-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Kargo Firması:</strong>
                  </td>
                  <td>{kargoIade.cargoCompanyName}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Kargo ID:</strong>
                  </td>
                  <td>{kargoIade.cargoId}</td>
                </tr>
              </tbody>
            </table>

            <table className="billing-table">
              <tbody>
                <tr>
                  <td>
                    <strong>Kargo Durumu:</strong>
                  </td>
                  <td>
                    {selectedOrder?.orderStatusResponse?.refundOrderPackages[0]
                      ?.cargoStatus ||
                      selectedOrder?.orderStatusResponse?.orderPackages[0]
                        ?.cargoStatus ||
                      selectedOrder?.orderStatusResponse?.status}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Kargo Nerde:</strong>
                  </td>
                  <td>{kargoIade.location}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <table className="product-table">
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Ürün Adı</th>
              <th>Adet</th>
              <th>İndirimli / Kuponlu</th>
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
                <td>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      textDecoration: "line-through",
                    }}
                  >
                    {item.price}
                  </span>
                  <br />
                  {item.discountPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedOrder?.refundItemResponseDtos?.length > 0 && (
          <>
            <h4 style={{ margin: "4rem 0rem 2rem 0rem" }}>İade Olanlar</h4>

            <table className="product-table">
              <thead>
                <tr>
                  <th>Görsel</th>
                  <th>Ürün Adı</th>
                  <th>Adet</th>
                  <th>İndirimli / Kuponlu</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.refundItemResponseDtos?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img src={item.coverImage} alt={item.productName} />
                    </td>
                    <td>{item.productName}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          textDecoration: "line-through",
                        }}
                      >
                        {item.price}
                      </span>{" "}
                      <br />
                      {item.discountPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalMusteri;
