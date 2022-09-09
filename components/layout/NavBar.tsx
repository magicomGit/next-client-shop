import { useRouter } from 'next/router'
import { FC, Fragment, useEffect, useState } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { MenuIcon, XIcon, } from '@heroicons/react/outline'
import Link from 'next/link'
import { useAppDispatch, useAppSelctor } from '../../store'
import { useLogoutMutation } from '../../store/slices/accountApiSlice'
import { logOut } from '../../store/slices/authSlice'
import { showLoginForm } from '../../store/slices/showLoginFormSlice'

const burgerMenu = [
    { name: 'Интернет магазин', href: '/', },
]



interface Props {    
    setSlideOverIsShow: (isShow: boolean) => void;
}


const NavBar: FC<Props> = ({  setSlideOverIsShow}) => {
    const { pathname } = useRouter()


    //--------------- account ----------------
    const [authText, setAuthText] = useState('')
    const [userNameText, setUserNameText] = useState('')
    const { userId, userRole, userName, isAuth } = useAppSelctor(state => state.authReducer)
    const dispatch = useAppDispatch()
    const [logoutAction, { isError }] = useLogoutMutation()
    
    async function logout() {
        try {
            const response = await logoutAction(userId)
        } catch (error) {

        }
        dispatch(logOut())
    }

    useEffect(()=>{
        if (isAuth) {
            setAuthText('Выйти')
            setUserNameText(userName)
        }else{
            setAuthText('Войти')
            setUserNameText('')
        }
    },[isAuth])

    const hendleAuthClick =()=>{
        if (isAuth) {
            logout()
        }else{            
            dispatch(showLoginForm(true))
        }
    }
    //--------------- ----------------
    const param = '?access_token=vk1.a.Nu0gNUtbSrqFVK4k6HZj5z4oIj9EAHPuFxnuE7_ZfpzAdTREKV1ZIIFZJS2xb2dDc_rLZ00cx_hYWqM5VVqUjz5O3C7T2WMBR5Ai3NYe3OhhxyH6Bq29RzDnMXOdzIRThcOYzXLszntrlmfodIvW4MdY5DLshubZsKV6eWxAwhK_x3B26lVpyNKcNBJrEfzR'
    const navigation = [
        { name: 'Интернет магазин', href: '/', current: pathname === '/' ? true : false },
        //{ name: 'Телефоны', href: '/oauth/yandex?code=1422261', current: pathname === '/phones' ? true : false },
        { name: 'О проекте', href: '/about' + param, current: pathname === '/about' ? true : false },
        { name: 'vk', href: '/oauth/vk' + param, current: pathname === '/vk' ? true : false },
        
    ]


    function hendleProfile(){
        if (userRole === 'ADMIN') {
            setSlideOverIsShow(true)
            
        }
    }
    //------------------------------------------
    return (
        <Disclosure as="nav" className="bg-teal-800 ">
            {({ open }) => (
                <>
                    <div className="max-w-[1200px] mx-auto px-2  ">
                        <div className="relative flex justify-between items-center h-16">
                            <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-teal-600 focus:outline-none ">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>


                            <div className="hidden  lg:ml-6 lg:flex  ">
                                <div className="flex ">
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href}>
                                            <a
                                                className={`${item.current ? 'text-white bg-teal-700' : 'text-gray-200  hover:text-white'}  
                                                px-2 py-2 rounded-md text-sm font-medium`}
                                            >
                                                {item.name}
                                            </a></Link>
                                    ))}

                                </div>


                            </div>
                            <div className='flex items-center'>
                                <div className='hidden  lg:block text-white p-2 cursor-pointer' onClick={()=> hendleProfile()}>
                                    {userNameText}</div>
                                <div onClick={()=> hendleAuthClick()}
                                className="ml-3 border border-blue-gray-200 cursor-pointer text-gray-200  hover:text-white p-2 rounded-md text-sm font-medium"
                                >{authText}</div>
                                
                            </div>


                        </div>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Disclosure.Panel className="lg:hidden">
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {burgerMenu.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className='text-gray-200 hover:bg-teal-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium'


                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </Transition>
                </>
            )}
        </Disclosure>
    )
}
export default NavBar