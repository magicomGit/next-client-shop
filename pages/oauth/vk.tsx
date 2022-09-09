import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import { useVkAuthMutation } from "../../store/slices/accountApiSlice";
import { setCredentials } from "../../store/slices/authSlice";


const Vk = () => {

    const { query } = useRouter()

    const [VkAuth, { data }] = useVkAuthMutation()

    //const getTokenParam ='?client_id=51414570&redirect_uri=http://test125.tmweb.ru&display=page&response_type=token'
    //const getUserDataParam = {access_token: query.access_token, v:'5.131'}
    const router = useRouter()
    const dispatch = useAppDispatch()

    useEffect(() => {
        VkAuth(String(query.access_token))
            .then((resp: any) => {
                dispatch(setCredentials({
                    userId: resp.data.id,
                    userName: resp.data.firstName,
                    userRole: resp.data.role,
                    accessToken: resp.data.accessToken,
                    emailConfirmed: resp.data.emailConfirmed
                }))
                router.push("/");
            })

    }, [])


    const hendleAuth = async () => {



    }

    return (
        <>

        </>
    )
}

export default Vk