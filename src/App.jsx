
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { getAccount } from './services/UserServices';
import { AuthContext } from './components/auth/Authen';
import { Spin } from 'antd';
import "./styles/global.css"


const App = () => {
  const { user, setUser ,loading,setLoading} = useContext(AuthContext);

  useEffect(() => {
    const fet = async () => {
      const result = await getAccount();
      if(result.data && result.data.user){
        setUser(result.data.user);
      }
      setLoading(true);
    }
    setTimeout(() => {
      fet();
    }, 2000);
  }, []);
  console.log(user);
  return (
    <>
      {loading?
        (<>
          <Header />
          <Outlet />
          <Footer />
        </>) :
        (
          <>
           <div className='center'><Spin size="large" /></div>
          </>

        )}

    </>
  )
}

export default App
