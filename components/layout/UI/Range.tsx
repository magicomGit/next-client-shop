//import { Slider } from "@material-ui/core"
import { Slider } from "@material-ui/core"
import { FC, useEffect, useState } from "react"
import useDebounce from "../../Debounce"

interface IProps {
    values: number[],
    setValues: (values: number[]) => void
}


//-----------------------------------------------
const Range: FC<IProps> = ({ values, setValues }) => {
    const [value, setValue] = useState([1000, 200000])    

    const setValuesDeb = useDebounce(setValues, 1000)

    const updateRange = (e: any, data: any) => {
        setValue(data)
        setValuesDeb(data)
    }

    const hendleInput1 = (val: number) => {
        if (val < 0) { val = 1000 }
        setValue([Number(val), value[1]])
        setValuesDeb([Number(val), value[1]])
    }

    const hendleInput2 = (val: number) => {
        if (val < 0) { val = 1000 }
        setValue([value[0], Number(val)])
        setValuesDeb([value[0], Number(val)])
    }

    return (
        <div className="mb-3">
            <div className="my-2" >Цена ₽</div>
            <div className="flex justify-between text-sm">
                <input className="p-1 w-16 rounded-md" step={1000} min="1000" max="200000"
                    type={"number"} onChange={(e: any) => hendleInput1(e.target.value)} value={value[0]} />

                <input className="p-1 w-16 rounded-md" step={1000} max="200000"
                    type={"number"} onChange={(e: any) => hendleInput2(e.target.value)} value={value[1]} />
            </div>
            <div className="mx-1">
                <Slider value={value} onChange={updateRange} max={200000} min={1000} step={1000} color="secondary" />
            </div>

        </div>
    )
}

export default Range  