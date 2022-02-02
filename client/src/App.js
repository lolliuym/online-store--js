import React, { useContext, useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter'
import NavBar from './components/NavBar';
import { Context } from './index';
import { check } from './http/userAPI';
import Spinner from './components/animation/Spinner';
import { observer } from 'mobx-react-lite';


const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally(() => setLoading(false))


  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>

  );
})

export default App;
