import { NextPage } from "next";

const About: NextPage = () => {

    return (
        <div className="max-w-[1200px] mx-auto min-h-[700px]">
            <div className="text-center text-2xl p-5 ">
                Учебный проект: Интернет магазин с неполным функционалом.
            </div>
            <div className="text-center text-xl p-5 ">

                <p className="font-bold"> FrontEnd:</p>
                <p>Framework - Next js(ssr)</p>
                <p>CSS - Tailwind</p>
                <p>State management - RTK Query</p>

                <br />

                <p className="font-bold"> BackEnd:</p>

                <p> Framework - Express</p>
                <p>База данных - MySQL</p>
                <p>ORM - Sequelize</p>


                <br />

                <p className="font-bold">Адаптивная верстка:</p>
                <p>Mobile first с одной отсечкой  (960px) </p>
                <br />

                <p className="font-bold">Авторизация:</p>

                <p>JWT - access token + refresh token</p>
                <p>OAuth ВКонтакте</p>
                <p>Разграничение прав пользоватля по ролям</p>

                <br />



                <p className="font-bold">Админка:</p>
                <p>Управление товарами, брэндами, категориями, фильтрами </p>
                <br />

            </div>
        </div>
    )
}
export default About