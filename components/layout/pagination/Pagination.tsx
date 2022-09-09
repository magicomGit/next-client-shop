import { FC, useState } from "react"

interface IProps {
  setCurrentPage: (page: number) => void,
  limit: number,
  page: number,
  pagesQty: number,
}

const Pagination: FC<IProps> = (props) => {



  const pages = []
  if (props.pagesQty > 1) {
    for (let index = 0; index < props.pagesQty; index++) {
      pages.push(index)
    }
  }

  const hendleClickPage = (page: number) => {
    props.setCurrentPage(page)
    //console.log('page',page)
  }

  return (
    <div className="flex justify-center ">

      {pages.map((page, index) =>

        <div key={index} className={`${index + 1 === props.page ? 'rounded-lg bg-teal-300 text-white' : 'cursor-pointer'}
                w-10 h-9  text-center pt-1  `}
          onClick={() => hendleClickPage(index + 1)}>
          {index + 1}
        </div>

      )}
    </div>
  )
}

export default Pagination