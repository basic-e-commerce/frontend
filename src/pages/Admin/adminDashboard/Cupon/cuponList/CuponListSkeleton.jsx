import "./CuponList.scss"; // Aynı tablo stillerini kullansın diye
import Skeleton from "@mui/material/Skeleton";

const ROW_COUNT = 5; // Kaç satır skeleton gözüksün

const CuponListSkeleton = () => {
  return (
    <table className="cupon-table">
      <thead>
        <tr>
          <th className="col-2">Kupon Kodu</th>
          <th className="col-2">Açıklama</th>
          <th className="col-2">Tip</th>
          <th className="col-1">Değer</th>
          <th className="col-1">Kullanım</th>
          <th className="col-1">Toplam Limit</th>
          <th className="col-1">Min. Tutar</th>
          <th className="col-2">Başlangıç</th>
          <th className="col-2">Bitiş</th>
          <th className="col-1">Durum</th>
          <th className="col-1">Aktif/Pasif</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(ROW_COUNT)].map((_, idx) => (
          <tr key={idx}>
            <td>
              <Skeleton variant="text" width={80} />
            </td>
            <td>
              <Skeleton variant="text" width={120} />
            </td>
            <td>
              <Skeleton variant="text" width={60} />
            </td>
            <td>
              <Skeleton variant="text" width={40} />
            </td>
            <td>
              <Skeleton variant="text" width={40} />
            </td>
            <td>
              <Skeleton variant="text" width={60} />
            </td>
            <td>
              <Skeleton variant="text" width={60} />
            </td>
            <td>
              <Skeleton variant="text" width={90} />
            </td>
            <td>
              <Skeleton variant="text" width={90} />
            </td>
            <td>
              <Skeleton variant="text" width={40} />
            </td>
            <td>
              <Skeleton variant="circular" width={32} height={32} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CuponListSkeleton;
