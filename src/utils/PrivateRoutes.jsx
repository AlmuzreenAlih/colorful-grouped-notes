import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie';

const PrivateRoutes = () => {
  const [Token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookies = new Cookies();
        var TokenSaved = cookies.get('TokenSaved');
        if (TokenSaved == undefined) {TokenSaved=" ";}
        alert("TokenSave: "+TokenSaved);
        const res = await axios.post("http://localhost/cgapi/auth/auth.php", {
          token: TokenSaved
        });
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
  // return null;
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
