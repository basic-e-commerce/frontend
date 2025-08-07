const OrderDetailModal = ({ order, onClose }) => {
  const invoice = order.invoiceResponseDto;
  const kargoData = order?.orderStatusResponse?.orderPackages[0];
  const kargoIade = order?.orderStatusResponse?.refundOrderPackages[0];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        <div className="info-wrapper" style={{ display: "flex", gap: "2rem" }}>
          <table className="info-table">
            <tbody>
              <tr>
                <td>
                  <strong>Sipariş Kodu:</strong>
                </td>
                <td>{order.orderCode}</td>
              </tr>
              <tr>
                <td>
                  <strong>Ad Soyad:</strong>
                </td>
                <td>
                  {order.address.firstName} {order.address.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Telefon:</strong>
                </td>
                <td>{order.address.phoneNo}</td>
              </tr>
              <tr>
                <td>
                  <strong>Adres:</strong>
                </td>
                <td>
                  {order.address.addressLine1}, {order.address.postalCode}{" "}
                  {order.address.city} {order.address.country}
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
                <td>{order?.customerCouponDto?.couponCode || "Kupon Yok"}</td>
              </tr>

              <tr>
                <td>
                  <strong>Taksit:</strong>
                </td>
                <td>{order?.installment} taksit</td>
              </tr>

              <tr>
                <td>
                  <strong>Kargo:</strong>
                </td>
                <td>{order?.shippingFee} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>Kom + Kargo Ödenen:</strong>
                </td>
                <td>{order?.customerPrice} ₺</td>
              </tr>
            </tbody>
          </table>

          <table className="billing-table">
            <tbody>
              <tr>
                <td>
                  <strong>İlk indirimli Fiyat:</strong>
                </td>
                <td>
                  {(order?.substractDiscountPrice || 0) +
                    (order?.totalPrice || 0)}{" "}
                  ₺
                </td>
              </tr>

              <tr>
                <td>
                  <strong>Kupon İndirimi:</strong>
                </td>
                <td>{order?.substractDiscountPrice} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>İade Tutarı:</strong>
                </td>
                <td>{order?.refundPrice} ₺</td>
              </tr>

              <tr>
                <td>
                  <strong>Kupon Uyg. Toplam:</strong>
                </td>
                <td>{order?.totalPrice} ₺</td>
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
                  <td>{kargoIade.cargoStatus}</td>
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
            {order.orderItemResponseDtos.map((item, index) => (
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

        {order?.refundItemResponseDtos?.length > 0 && (
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
                {order?.refundItemResponseDtos?.map((item, index) => (
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

export default OrderDetailModal;
