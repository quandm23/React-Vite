import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, BookOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react'
import {Button, Menu, message } from 'antd';
import { AuthContext } from '../auth/Authen';

const Header = () => {
  const [current, setCurrent] = useState('/');
  const { user,setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(">>> check data: ", user)

  const onClick = (e) => {
    setCurrent(e.key);
  };
  
  const handleLogout = ()=>{
    setUser({});
    localStorage.removeItem("access_token");
    navigate("/");
    message.open({
      type: 'success',
      content: 'Đăng Xuất Thành Công',
    });
  }

  const items = [
    {
      label: (<Link to="/">Home</Link>),
      key: '/',
      icon: <HomeOutlined />,
    },
    {
      label: (<Link to="/users">User</Link>),
      key: 'users',
      icon: <UserOutlined />,
    },
    {
      label: (<Link to="/books">Book</Link>),
      key: 'books',
      icon: <BookOutlined />,
    },

    ...(user && user.id ? [{
      label: (<span>Welcome{user.fullName}</span>),
      key: 'overview',
      icon: <BookOutlined />,
      children: [
        {
            label: <Button type='text' ><Link to={"/infor"}>Infor</Link></Button>,
            key: 'infor',
        },
        {
            label: <Button type='text' onClick={handleLogout}>Đăng xuất</Button>,
            key: 'logout',
        },
    ],

    }] : [{
      label: (<Link to="/login">Login</Link>),
      key: 'login',
      icon: <BookOutlined />,
    },
    {
      label: (<Link to="/register">Register</Link>),
      key: 'register',
      icon: <BookOutlined />,
    }])
  ];
  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  )
}

export default Header;