import Link from "next/link"
import {  FC} from "react"

interface Props {    
    setLoginIsShow: (isShow: boolean) => void;
}

const Head:FC<Props> = ({setLoginIsShow}) => {
    
    return (
        <div className="bg-teal-800 text-white">
            <div className="flex justify-between w-[1200px] mx-auto ">
                <div className="flex items-center py-3">
                    <Link href='/'>Home</Link>
                </div>
                <div className="flex items-center py-3">
                <div className="cursor-pointer"  onClick={()=>{setLoginIsShow(true)}}>Вход</div>
                
                </div>
            </div>
        </div>
    )
}

export default Head