import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.post(`${BASE_URL}/api/v1/customer/list`, {
        sortBy: "createdAt",
        sortDirection: "desc",
        isEnable: true,
        startDate: "2024-01-01T00:00:00Z",
        endDate: "2039-08-31T23:59:59Z",
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th className="col-1">Ad Soyad</th>
          <th className="col-1">Telefon</th>
          <th className="col-1">Kullanıcı Adı</th>
          <th className="col-1">Kayıt Tarihi</th>
          <th className="col-0"></th>
        </tr>
      </thead>
      <tbody>
        {users?.length > 0 ? (
          users?.map((user) => (
            <tr key={user.id}>
              <td>
                {user?.firstName} {user.lastName}
              </td>
              <td>{user?.phoneNumber}</td>
              <td>{user?.username}</td>
              <td>{user?.createAt?.split("T")?.[0]}</td>
              <td className="actions">
                <button>
                  <VisibilityIcon className="icon" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">Kullanıcı bulunamadı.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default User;
