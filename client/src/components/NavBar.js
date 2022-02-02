import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Context } from '../index'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'



const NavBar = observer(() => {
  const { user } = useContext(Context)
  const history = useHistory()
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  return (

    <div className="relative bg-white border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center   py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to={SHOP_ROUTE}>
              <span className="sr-only">Купидевайс</span>
              <img className="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
            </NavLink>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <button type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open menu</span>

            </button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <div className="relative">
              <NavLink to={SHOP_ROUTE}>
                КупиДевайс
              </NavLink>

            </div>
          

          </nav>
          <div className="flex items-center justify-end md:flex-1 lg:w-0">
            {user.isAuth ?
              <div> <button href="/" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => history.push(ADMIN_ROUTE)}>
                Админ панель
              </button>
                <button href="/"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={() => logOut()}>
                  Выйти
                </button> </div> :
              <div>
                <button href="/"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700" onClick={() => history.push(LOGIN_ROUTE)}>
                  Авторизация
                </button>
              </div>
            }


          </div>
        </div>
      </div >

    </div >


  )
})

export default NavBar
