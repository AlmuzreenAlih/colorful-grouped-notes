import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const PrivateRoutes = () => {
  const [Token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost/cgapi/auth/auth.php");
        console.log(res.data + "");
        setToken(res.data);
      } catch (error) {
        console.error(error);
        setToken(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return loading ? null : Token ? <Outlet /> : <Navigate to="/login" />;
//   if (loading) {
//     return null;
//   }
//   else {
//     if (Token) {
//         return Outlet
//     }
//     else {
//         return Login
//     }
//   }
};

export default PrivateRoutes;
