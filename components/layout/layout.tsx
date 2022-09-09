import { AppProps } from "next/app"
import { useState } from "react"
import { useAppSelctor } from "../../store"
import Footer from "./Footer"
import NavBar from "./NavBar"
import Login from "./UI/login"
import SlideOver from "./UI/SlideOver"



const Layout = ({ children }: any) => {

  const { isShowForm } = useAppSelctor(state => state.loginFormReducer)
  
  //const [loginIsShow, setLoginIsShow]= useState(false)
  const [slideOverIsShow, setSlideOverIsShow]= useState(false)
  return (
    <>
      <NavBar   setSlideOverIsShow={setSlideOverIsShow}/>
      <Login  isShow={isShowForm}/>
      <SlideOver setIsShow={setSlideOverIsShow} isShow={slideOverIsShow}/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout