import React, { useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index';
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'


const Auth = observer(() => {
  const { user } = useContext(Context)
  const location = useLocation()
  const history = useHistory()

  const isLogin = location.pathname === LOGIN_ROUTE

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password)
      }
      else {
        data = await registration(email, password)
      }
      user.setUser(user)
      user.setIsAuth(true)
      history.push(SHOP_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }

  }

  console.log(location)
  return (

    <div className="container">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{isLogin ? "Авторизация" : "Регистрация"} </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST"><input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input id="email-address"
                  name="email" type="email" required
                  className=" rounded relative block w-full px-3 py-2 mt-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Введите эл.почту..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} /></div>
              <div>

                <input id="password" name="password"
                  type="password" required
                  className=" rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm mt-2"
                  placeholder="Введите пароль..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} /></div>
            </div>
            <div className="flex items-center justify-between">
              {isLogin ?
                <div className="flex items-center">
                  <p className="ml-2 block text-sm text-gray-900 mr-2">Нет аккаунта?</p>
                  <NavLink to={REGISTRATION_ROUTE}
                    className="text-cyan-500">Зарегистируйся!</NavLink>
                </div>
                :
                <div className="flex items-center">
                  <p className="ml-2 block text-sm text-gray-900 mr-2">Есть аккаунт?</p>
                  <NavLink to={LOGIN_ROUTE}
                    className="text-cyan-500">Войдите!</NavLink>
                </div>
              }

              <div>
                <a type="submit"
                  className="group  w-32 relative   py-2 px-4  border-solid border-2 border-teal-500 text-sm font-medium rounded-md text-teal-500	  hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={click}>
                  {isLogin ? "Войти" : "Регистрация"}
                </a>
              </div>


            </div>
          </form>
        </div>
      </div>
    </div>
  )
})

export default Auth
