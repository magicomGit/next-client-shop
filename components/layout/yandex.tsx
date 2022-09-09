import { useRouter } from "next/router"
import axios from "axios";
import { useEffect } from "react";

const Yandex = () => {
  const { query } = useRouter()

  console.log(query.code)



  const headers = {
    'Content-Type': 'multipart/form-data'    
  };


  useEffect(() => {
    req()
  }, [])

  const reqParam = {
    grant_type: 'authorization_code',
    code: '4050969',
    client_id: '74294c854986418fb0cbb047602f071b',
    client_secret: 'fce0aff9db5c4dc8b198d44eaa2f2f5b'
  }

  const formData = new FormData()
  formData.append('grant_type', 'authorization_code' )
  formData.append('code', '4050969' )
  formData.append('client_id', '74294c854986418fb0cbb047602f071b' )
  formData.append('client_secret', 'fce0aff9db5c4dc8b198d44eaa2f2f5b' )

  const axiosAuth = axios.create({
withCredentials: true,
    method:'post',
    baseURL: 'oauth.yandex.ru',
    headers: headers
  });

  async function req() {
    //let resp = await fetch('http://oauth.yandex.ru');
    const resp = await axios.post('http://oauth.yandex.ru', formData, {headers})

    // let resp = await fetch('http://oauth.yandex.ru', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8'
    //   },
    //   body: JSON.stringify(reqParam)
    // });
    console.log(resp)

  }

  return (
    <></>
  )
}

export default Yandex