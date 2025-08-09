import { useState, useEffect } from "react";
import { getCity, getDistrict } from "../../../../../api/apiAdress";

export const useLocationDataKargo = () => {
  const [citys, setCitys] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCity = async () => {
    try {
      setLoading(true);
      const response = await getCity();
      setCitys(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDistrict = async (cityCode) => {
    if (!cityCode) {
      setDistricts([]);
      return;
    }

    try {
      setLoading(true);
      const response = await getDistrict(cityCode);
      setDistricts(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCity();
  }, []);

  return {
    citys,
    districts,
    loading,
    fetchDistrict,
  };
};
