/* This example requires Tailwind CSS v2.0+ */
import { FC, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import CloseIcon from '../../icons/closeIcon';
import { logOut, setCredentials } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store';
import { useLoginMutation, useRegisterMutation } from '../../../store/slices/accountApiSlice';
import { showLoginForm } from '../../../store/slices/showLoginFormSlice';


interface Props {
  isShow: boolean;

}
const Login: FC<Props> = ({ isShow }) => {


  const [choiceIsLogin, setChoiceIsLogin] = useState(true)
  const [underlinePosition, setUnderlinePosition] = useState('left-0')
  const [loginFontColor, setLoginFontColor] = useState('')
  const [registerFontColor, setRegisterFontColor] = useState('text-gray-400')
  const [confirmPassDisplay, setConfirmPassDisplay] = useState('scale-0 opacity-0')
  const [oAuthDisplay, setOAuthDisplay] = useState('scale-100 opacity-100')
  const [buttonText, setButtonText] = useState('Войти')

  const [email, setEmail] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [confirmPass, setConfirmPass] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState('')

  const cancelButtonRef = useRef(null)

  const dispatch = useAppDispatch()

  function hendleChoiceRegister() {
    setUnderlinePosition('left-1/2')
    setLoginFontColor('text-gray-400')
    setRegisterFontColor('')
    setConfirmPassDisplay('scale-100 opacity-100')
    setOAuthDisplay('scale-0 opacity-0')
    setButtonText('Зарегистрироваться')
    setChoiceIsLogin(false)
    setErrorMessage('')
  }

  function hendleChoiceLogin() {
    setUnderlinePosition('left-0')
    setLoginFontColor('')
    setRegisterFontColor('text-gray-400')
    setConfirmPassDisplay('scale-0 opacity-0')
    setOAuthDisplay('scale-100 opacity-100')
    setButtonText('Войти')
    setChoiceIsLogin(true)
    setErrorMessage('')
  }

  const [getLogin, { isError: isErrorLogin }] = useLoginMutation()
  const [getRegister, { isError: isErrorRegister, isSuccess, data }] = useRegisterMutation()

  async function hendleLoginButton(e: React.MouseEvent) {
    e.preventDefault()

    let accessToken = ''

    try {
      if (choiceIsLogin) {//------------- Login request
        const userData = await getLogin({ email: email, password: pass }).unwrap()
        if (userData.emailConfirmed) {
          accessToken = userData.accessToken
        }
        dispatch(setCredentials({
          userId: userData.id,
          userName: userData.email,
          userRole: userData.role,
          accessToken: accessToken,
          emailConfirmed:userData.emailConfirmed
        }))
        setErrorMessage('')
      } else { //------------- Register request
        if (pass !== confirmPass) {
          setErrorMessage('Введенные пароли не совпадают!')
          return
        }
        await getRegister({ email: email, password: pass }).unwrap()
        setErrorMessage('')
      }

      if (accessToken !== '') {
        dispatch(showLoginForm(false))        
      }
      else{
        setErrorMessage('Аккаунт не активирован, проверьте свою электронную почту и завершите регистрацию.');
      }
      //setIsShow(false)
    } catch (error: any) {
      setErrorMessage((error.data.message));
       
      dispatch(logOut())
    }
  }

  function hendleLoginVk() {
    const getTokenParam = '?client_id=51414570&redirect_uri=http://test125.tmweb.ru&display=page&response_type=token';
    window.location.href = "https://oauth.vk.com/authorize?" +
      "client_id=51414570&redirect_uri=http://test125.tmweb.ru&display=page&response_type=token"
  }

  return (
    <Transition.Root show={isShow} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef}
        onClose={() => { dispatch(showLoginForm(false)); setErrorMessage('') }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed  inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed  z-10 inset-0 overflow-y-auto">
          <div className="flex lg:items-center  justify-center min-h-full  text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white lg:rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[470px] lg:min-w-[470px]">
                <div className="bg-white px-8 py-6 ">
                  <div className='flex justify-end mt-1 mb-3 ' >
                    <span className='cursor-pointer' onClick={() => { dispatch(showLoginForm(false)); setErrorMessage('') }}><CloseIcon /></span>
                  </div>
                  <div className="text-center lg:text-3xl text-xl mb-7 ">
                    <div className='flex '>
                      <div className={`${loginFontColor} cursor-pointer w-1/2 transition-colors ease-in-out delay-250 duration-300`}
                        onClick={() => hendleChoiceLogin()}>Вход</div>

                      <div className={`${registerFontColor} cursor-pointer w-1/2 transition-colors ease-in-out delay-250 duration-300`}
                        onClick={() => hendleChoiceRegister()}>Регистрация</div>
                    </div>
                    <div className='relative h-[1px] bg-gray-400 mt-2'>
                      <div className={` h-1  w-1/2 bg-teal-800  absolute ${underlinePosition} -top-0.5
                        transition-all ease-in-out delay-250 duration-200`}></div>
                    </div>
                  </div>

                  <div className='text-lg'>Логин</div>
                  <div><input value={email} type='text' className='border border-gray-300 rounded-md mx-auto my-1 p-2 w-full'
                    onChange={(e) => setEmail(e.target.value)} /></div>

                  <div className='text-lg'>Пароль</div>
                  <div><input value={pass} type='password' className='border border-gray-300 rounded-md mx-auto my-1 p-2 w-full '
                    onChange={(e) => setPass(e.target.value)} /></div>

                  <div className={`relative h-20`}>
                    <div className={`${confirmPassDisplay}  w-full   transition-all ease-in-out delay-250 duration-200`}>
                      <div className='text-lg'>Подтверждение пароля</div>
                      <div><input value={confirmPass} type='password' className='border border-gray-300 rounded-md mx-auto my-1 p-2 w-full '
                        onChange={(e) => setConfirmPass(e.target.value)} /></div>
                    </div>
                    <div className={` ${oAuthDisplay} absolute top-1 w-full  pt-6 flex items-center 
                    transition-all ease-in-out delay-250 duration-200`}>
                      <div className='flex justify-center cursor-pointer p-2 mt-2 bg-[#5181b8] w-full text-white   rounded-md'
                        onClick={(e) => hendleLoginVk()}>
                        
                        Войти через ВКонтакте</div>

                    </div>
                  </div>


                  <button className='p-2 bg-teal-800 w-full text-white mt-5 mb-10 rounded-md'
                    onClick={(e) => hendleLoginButton(e)}
                  >{buttonText}</button>

                  <div className={`${errorMessage !== '' && 'bg-red-100 border border-red-300 rounded-md p-3 -mt-3'}  text-red-900 `}> {errorMessage}</div>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
export default Login
