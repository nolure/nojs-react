import Popup from 'nj/popup'
import $ from 'jquery'

export const init = ()=>{
    var popup = Popup.create({
        title : 'Popup Title',
        template : '<div>12</div>',
        buttons : [
            {text:'确定'}, {text:'取消'}
        ]
    })

    $('#showPopup').click(()=>(
        popup.setDisplay(true)
    ))

    $('#alertPopup').click(()=>(
        Popup.alert({
            template : '操作成功！'
        })
    ))

    $('#confirmPopup').click(()=>(
        Popup.confirm({
            template : '确认操作?'
        }).then((res)=>{
            Popup.tip.show('ok', res?'选择了是':'选择了否')
        })
    ))
}