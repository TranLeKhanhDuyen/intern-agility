import LoginForm from '@pages/Auth/Login'
import RegisterForm from '@pages/Auth/Register'
import HomePage from '@pages/Home'
import { useRoutes } from 'react-router-dom'

const Router = () => {
  return useRoutes([
    {
      path: '',
      element: <HomePage />
    },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: <LoginForm />
        },
        {
          path: 'register',
          element: <RegisterForm />
        }
      ]
    }
  ])
}
export default Router