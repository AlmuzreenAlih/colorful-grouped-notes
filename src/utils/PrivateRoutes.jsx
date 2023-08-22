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
        // alert("TokenSave: "+TokenSaved);
        let homeorigin = "http://localhost/cgapi"
        homeorigin = window.location.origin
        const res = await axios.post(homeorigin+"/auth/auth.php", {
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

  return loading ? null : Token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
