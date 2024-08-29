
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx';
import UserPage from './pages/user.jsx';
import BookPage from './pages/book.jsx';
import './styles/global.css';
import TodoApp from './components/todo/TodoApp.jsx';
import ErrorPage from './pages/error.jsx';
import { AuthWrapper } from './components/auth/Authen.jsx';
import AuthenLogin from './components/auth/AuthenLogin.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <TodoApp />
      },
      {
        path: "/users",
        element: <UserPage />,
      },
      {
        path: "/books",
        element: <AuthenLogin><BookPage /></AuthenLogin>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
 <AuthWrapper>
  <RouterProvider router={router} />
 </AuthWrapper>
 
)
