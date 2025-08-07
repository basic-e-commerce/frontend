const OrderDetailModalIadeSkleton = () => {
  const dummyRows = new Array(3).fill(0);

  return (
    <div className="modal-overlayIade">
      <div className="modal">
        <div className="skeleton-close-btn">×</div>
        <div className="skeleton-table">
          <table className="product-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Ürün Adı</th>
                <th>Adet</th>
                <th>İndirimli / Kuponlu</th>
                <th>İade Miktarı</th>
              </tr>
            </thead>
            <tbody>
              {dummyRows.map((_, i) => (
                <tr key={i}>
                  <td>
                    <div className="skeleton-img" />
                  </td>
                  <td>
                    <div className="skeleton-text short" />
                  </td>
                  <td>
                    <div className="skeleton-text tiny" />
                  </td>
                  <td>
                    <div className="skeleton-text medium" />
                  </td>
                  <td>
                    <div className="skeleton-text tiny" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "right" }}>
            <div className="skeleton-button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModalIadeSkleton;
