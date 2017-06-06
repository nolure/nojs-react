import $ from 'jquery'
import nj, {React, render} from 'nj'
import Datepicker, {Datetime} from 'nj/datepicker'
import {Form} from 'nj/form'


export const init = ()=>{
    let startVal = "2017-06-04 05:01:00"
    let start = (max)=>render(
        <Datepicker months="1" 
            min={new Date()} 
            value={startVal} 
            placeholder="开始时间" 
            max={max} 
            onChange={value=>end(value)} 
        />, 
        document.getElementById('rootDatepicker')
    )
    let end = (min)=>render(
        <Datepicker min={min||new Date()} onChange={value=>start(value)} />, 
        document.getElementById('rootDatepicker1')
    )
    start()
    end(startVal)
    
    Form.start()

    let input = $('input[name="starttime"]')[0]
    render(
        <Datepicker mode="date" input={input}/>, 
        input
    )

    // console.log(Datepicker.Datetime)
}