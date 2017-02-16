/*
 * form 表单验证
 */
require('../../css/form.css')
var nj = require('./nojs-react')
var {React, ReactDOM, mixins} = nj
var $ = require('jquery')

var Directive = require('../mixins/directiveComponent').default

var formDirectives = {}

var getRules = function(){
    var attrs = this.props
    var type = attrs.type
    var rules = []
    
    if( formRules[type] ){//type="email"
        rules.push({
            key : 'type',
            name : type,
            target : attrs.type,
            fn : formRules[type]
        })
    }

    for( var i in attrs ){
        var name = i.replace(/^nj-/, '')
        var rule = formRules[i] || formRules[name]

        if( rule ){//有效规则
            if( formRules[i] ){
                name = i
            }
            rules[i=='required'?'unshift':'push']({
                key : i,
                name : name,
                target : attrs[i],
                fn : rule
            })            
        }
    }
    
    if( (type=='input-group' && attrs['nj-minlength']) || attrs['required'] ){
        rules.required = true
    }

    return rules
}

var formMixin = {
    //在组件外部手动更新验证状态 如异步场景
    setValid (valid, nextState) {
        this.setState(Object.assign(nextState||{}, {valid:valid, status:valid?'ok':'error'}))
        this.verifyEvent.complete(valid)
    }
}

//验证当前组件的所有子组件的状态
var verifyChildComponents = function(real){
    var valid = true
    this.state.childComponents.forEach((item)=>{
        if( item.verify ){
            var _valid = item.verify(real, true)
            if( !_valid ){
                // console.log(1,item.props.name, item.state.status)
                valid = _valid
                
            }
        }
    })
    this.setState({valid:valid})
    return valid
}

//验证单个组件
var verifyField = function(real, fromParent) {
    var textField

    let {validing, status, value, _value, dirty} = this.state
    
    //status存在表示用户未再次手动更改 value和_value不等表示从外部修改了value值（相等就是value没变）
    if( validing || (status && value===_value && dirty) ){
        // console.log(2,this.props.name, this.state.validing , this.state.status, this.state.valid)
        return this.state.valid
    }
    
    real = real===false ? false : (real||true)
    this.state.validing = true

    //status有值用来保存状态 不重复验证 输入后清除状态 重新验证
    // this.state.status = null
    this.state.status = 'ok'

    var valid = true
    var rules = this.state.rules
    var el = $(ReactDOM.findDOMNode(this))
    var visible = el.is(':visible') //隐藏的元素不验证

    for( var i=0,n=rules.length; i<n; i++ ){
        var rule = rules[i]
        valid = !visible ? true : rule.fn.call(this, value, rule.target)
        // console.log(3,valid,this.props.name, visible)
        if( !valid || valid=='pending' ){
            this.state.novalidName = rule.name
            // console.log(this.props.name)            
            break
        }
    }   


    if( !rules.required && !value ){//非必填项
        valid = true
    }

    //'input-group' 验证子项是否全部通过
    if( valid && this.props.type=='input-group' ){
        valid = this.state.valid_all
    }
    
    // console.log(valid,this.refs.input, this.state.value, this.state.status)
    var isFetching = valid=='pending'
    this.state.status = isFetching ? 'pending' : valid ? 'ok' : 'error'
    this.state.valid = valid = isFetching ? false : valid
    
    //input-group类 子组件输入时 需要更新父组件状态
    var parentComponent = this.state.parentComponent
    if( parentComponent && !fromParent ){
        //父组件是form时 有个特殊情况：更新form或导致所有子组件全部更新 为了减少干扰 引入real参数
        //real为false时 只验证其状态 不更新ui
        parentComponent.verify(parentComponent.props.type=='form'?false:true)
    }
    this.state.validing = null
    this.state._value = value//记录此次验证时的value
    // fromParent && console.log(real,valid)
    real && this.setState({valid:valid})
    return valid
} 

var Form = formDirectives['form'] = React.createClass({
    mixins : [mixins.childComponents.config],    
    getDefaultProps () {
        return {type:'form', showicon:'error',noValidate:true}
    },    
    handleSubmit (e) {
        e = e || window.event
        this.state.action = 'submit'
        window.setTimeout(()=>{
            this.state.action = null
        }, 1)
        this.submitBeforeEvent.complete(e)
        if( e.isDefaultPrevented() ){
            return
        }

        var valid = this.verify()

        if( !valid ){//未通过 阻止提交
            e.preventDefault()
            return
        }
        // if( this.props.ajaxsubmit ){
        //     var method = this.props.method.toLowerCase()
        //     var formEl = this.refs.wrap
        //     $.ajax({
        //         url : formEl.action,
        //         type : method,
        //         data : $(formEl).serialize(),
        //         dataType : 'json',
        //         success (json) {

        //         }
        //     })
        //     e.preventDefault()
        // }
        this.submitEvent.complete(e)        
    },
    submit (options) {//从外部触发submit动作
        var el = this.refs.wrap
        nj.utils.fireEvent('submit', el)
        //表单提交是异步的 所以下面return不是正确的valid
        return this.state.valid
    },
    reset () {
        this.state.childComponents.forEach((item)=>{
            item.setState({value:'',status:null})
        })
    },     
    componentDidMount () {
        directive.getChildComponents(this)   
        // console.log(this.state.childComponents) 

        this.submitBeforeEvent = nj.utils.addEventQueue.call(this, 'onSubmitBefore')
        this.submitEvent = nj.utils.addEventQueue.call(this, 'onSubmit')
        this.verifyEvent = nj.utils.addEventQueue.call(this, 'onVerify')

        this.state.verfiyCode = Form.verifyCode()

        var {parentComponent} = this.props//form表单所处的父组件
        if( parentComponent ){                
            //将表单状态同步到外部
            this.onVerify((valid)=>{
                parentComponent.setState({valid:valid})
            })
        }
    },
    verify (real) {
        var valid = verifyChildComponents.call(this, real)
        this.verifyEvent.complete(valid)
        return valid
    },
    render () {
        return (
            <form {...this.props} ref="wrap" 
                onSubmit={this.handleSubmit}>
                {this.props.children}
            </form>
        )
    }
})
formDirectives['input-group'] = React.createClass({
    mixins : [mixins.childComponents.setParents([formDirectives['form']])],
    getInitialState () {
        return {
            valid : true,
            dirty : false,
            rules : getRules.call(this)
        }
    },
    getDefaultProps (a) {
        return {type:'input-group', showicon:'error'}
    },    
    componentDidMount () {
        mixins.childComponents.getParentComponent.call(this)
        directive.getChildComponents(this)
    },
    verify (real, fromParent) {
        if( this.state.validing ){
            return this.state.valid
        }
        var valid//= verifyChildComponents.call(this)
        //取出选中的checkbox
        var checked = []
        var hasnovalid
        this.state.childComponents.forEach((item)=>{
            // console.log(item.state.value,item.state.valid, item.refs.input)
            if( !item.state.valid ){
                hasnovalid = true
            }else if( item.state.value ){
                checked.push(item)
            }
        })
        //this.state.status = null
        //子项是否全部验证通过[隐形规则]
        //当chekced满足了个数验证时 其中有非必填项输入了错误的值时 通过该属性检测group整体状态
        this.state.valid_all = !hasnovalid

        this.state.value = checked.length ? checked : null//没选中时 兼顾required
        var valid = verifyField.call(this, real, fromParent)
        return valid
    },
    render () {        
        return (
            <span>
                <span className="nj-input-group" ref="wrap">
                    {this.props.children}
                </span>
                <VerifyStatus field={this} />
            </span>
        )
    }
})
formDirectives['input'] = React.createClass({ 
    //React.addons.LinkedStateMixin
    mixins: [
        formMixin, 
        mixins.childComponents.setParents([formDirectives['input-group'], formDirectives['form']])
    ],
    getInitialState () {  
        return {
            dirty : false,
            valid : true,
            rules : getRules.call(this),
            value : this.props.defaultValue || this.props.value || ''
        }
    },  
    getDefaultProps () {
        return {type:'text', trigger:'keyup'}
    },
    verify (real, fromParent) {
        if( this.state.validing || /ok|pending/.test(this.state.status) && this.state.valid ){
            return this.state.valid
        }
        
        //更新input-group
        var parentComponent = this.state.parentComponent
        if( parentComponent ){
            parentComponent.setState({dirty:true})
        }

        var valid = verifyField.call(this, real, fromParent)        
        this.verifyEvent.complete(valid)
        //if( !valid && parentComponent && parentComponent.state.action=='submit' ){
            //this.refs.input.focus()
        //}
        return valid
    },   
    componentDidMount () {
        mixins.childComponents.getParentComponent.call(this)

        // this.changeEvent = nj.utils.addEventQueue.call(this, 'onChange')
        this.verifyEvent = nj.utils.addEventQueue.call(this, 'onVerify')
        //对外引用组件
        this.refs.input.$handle = this
    },      
    //外部value改变状态后 同步到内部value
    componentWillReceiveProps (nextProps) {
        //这里必须检测是否value发生变化 否则由Form组件默认添加的onVerify事件(将表单状态同步到外部) 会引发死循环
        var _value = nextProps.value
        if( _value!==undefined && this.state.value!==_value ){
            this.state.value = nextProps.value
            this.valueLink().requestChange()
        }
    },
    valueLink () {
        var _onChange = this.props.onChange
        var _value = this.props.value

        var {type, trigger} = this.props

        var valueLink = this.state.valueLink = {
            value : this.state.value,
            requestChange : e=>{
                var newValue
                if( typeof e=='boolean' ){
                    newValue = e
                }else{
                    newValue = e ? e.target.value : this.state.value
                }
                
                var textField = textReg.test(type);
                e && _onChange && _onChange(e)

                this.state.value = newValue
                this.state.status = null

                this.setState({
                    value : newValue,
                    dirty : true
                })

                // update = update===false ? false : (update||!textField)

                var parentComponent = this.state.parentComponent
                if( parentComponent ){
                    parentComponent.state.status = null
                    parentComponent.state.dirty = true
                }
                // update && this.verify.call(this,false); 
                
                //使用blur类型验证的文本框 在onChange事件中就不用重复执行verify了
                trigger!='blur' && this.verify(false)
                // this.changeEvent.complete()
            }
        }
        

        return valueLink
    },
    render () {            
        var attrs = this.props            
        var type = attrs.type  
        var {rules, dirty, status, value, parentComponent} = this.state    

        //触发验证的事件类型
        var trigger = {
            keyup : 'onKeyUp',
            blur : 'onBlur'
        }[this.props.trigger||parentComponent.props.trigger]

        var options = Object.assign({}, attrs, {
            ref : 'input'
        })

        if( type=='checkbox' || type=='radio' ){
            options.checkedLink = this.valueLink()

        }else{
            var mark
            if( rules.length && status ){
                mark = true
                if( !rules.required && !value ){
                    mark = false
                }
                if( !dirty && (!parentComponent || parentComponent.state.action!='submit') ){
                    mark = false
                }
            }
            options.value = this.state.value
            options.onChange = this.valueLink().requestChange
            options.className = nj.utils.joinClass(this.props.className, mark && 'input-'+status)
            var _event = options[trigger]

            options[trigger] = e=>{
                _event && _event(e) //外部添加的事件
                this.verify(true)
            }
        }
        if( type=='textarea' ){
            options.value = options.html || options.value
            delete options.defaultValue
            delete options.children
        }
        return (
            <label>
                {type=='textarea'?<textarea {...options} />:<input {...options} />}
                {type!='textarea'&&<span>{this.props.text}</span>}
                <VerifyStatus field={this} />
            </label>
        )
    }
})
formDirectives['select'] = React.createClass({
    mixins : [mixins.childComponents.setParents([formDirectives['input-group'], formDirectives['form']])],
    getInitialState () {  
        return {
            dirty : false,
            valid : true,
            rules : getRules.call(this),
            value : this.props.defaultValue
        }
    },  
    getDefaultProps () {
        return {type:'select'}    
    },
    componentDidMount () {
        mixins.childComponents.getParentComponent.call(this)
        directive.getChildComponents(this)

        this.changeEvent = nj.utils.addEventQueue.call(this, 'onChange')
        this.verifyEvent = nj.utils.addEventQueue.call(this, 'onVerify')
        this.refs.wrap.$handle = this
        //同步初始select初始值到state
        this.state.value = this.refs.wrap.value

        this.forceUpdate()//for nj-select
    },
    verify (real, fromParent) {
        var parentComponent = this.state.parentComponent
        if( parentComponent ){
            parentComponent.setState({dirty:true})
        }

        var valid = verifyField.call(this, real, fromParent)
        this.verifyEvent.complete(valid)       
        return valid
    },  
    valueLink () {
        var _valueLink = this.props.valueLink
        var _value = _valueLink && _valueLink.value

        //外部valueLink改变状态后 组件内部需同步
        if( _valueLink && _value !== this.state.value && _value!=undefined ){
            this.state.value = _value

            window.setTimeout(()=>{
                valueLink.requestChange(_value, true)
            }, 10)
        }

        var valueLink = this.state.valueLink = {
            value : this.state.value,
            requestChange : (e)=> { 
                var newValue = e.target.value
                // console.log(this.refs.wrap.selectedOptions[0].value)
                _valueLink && _valueLink.requestChange(newValue);//合并外部双向绑定
                
                this.state.value = newValue
                this.state.status = null

                this.setState({
                    value : newValue,
                    dirty : true
                })
                
                var parentComponent = this.state.parentComponent
                if( parentComponent ){
                    parentComponent.state.status = null
                    parentComponent.state.dirty = true
                }

                this.verify.call(this,false); 
                this.changeEvent.complete()
            }
        }      
        return valueLink
    },
    render () {
        var valueLink = this.valueLink()

        var options = Object.assign({}, this.props, {
            ref : 'wrap',
            value : valueLink.value,
            onChange : valueLink.requestChange
        })
        delete options.defaultValue

        //nj-select 获取的children 数组项为空的占位符
        var {children} = this.props
        children = children && children.filter(item=>item)
        return (
        <label>
            <select {...options}>
            {children}
            </select>
            <VerifyStatus field={this} />
        </label>  
        )
    }
})

var textReg = /^(text|textarea|number|email|password)$/

//验证状态显示
var VerifyStatus = React.createClass({
    render () {
        var field = this.props.field
        var rules = field.state.rules
        var showmsg = rules.length
        var parentComponent = field.state.parentComponent
        
        if( showmsg ){
            if( field.state.dirty ){
                //checkbox组合 子项不显示
                var textField
                
                //if( textReg.test(field.props.type) && parentComponent && parentComponent.props.type=='input-group' ){
                    //showmsg = false
                //}
            }else if(parentComponent){
                showmsg = parentComponent.state.action=='submit'
            }
            
            if( !field.state.value && !rules.required ){//非必填项
                showmsg = false
            }
        }
        var {novalidName, status, errortext, valid, childComponents} = field.state
        var novalidText = ''
        var ispending = status=='pending'

        // console.log(showmsg, valid, status, field.refs.input)
        
        if( showmsg ){
            if( ispending ){
                novalidText = 'loading……'
            }else if( !valid ){
                novalidText = errortext || field.props.errortext || statusText[novalidName] || ''
            }

            var showicon = parentComponent ? parentComponent.props.showicon : field.props.showicon
            if( showicon!='all' && status != showicon && !ispending ){//ispending始终显示
                return null
            }
            //适合'input-group'子项为text类
            if( field.props.type=='input-group' ){  
                if( !field.state.valid_all ){
                    //valid_all=false: 有未通过的验证项时 状态体现在子项上 不显示group状态
                    return null
                }else if( valid ){
                    var child = childComponents[0]
                    if( child && textReg.test(child.props.type) ){
                        //已输入的全部通过 状态体现在子项上 group无需显示状态 
                        return null
                    }
                }                
            }
        }

        // console.log(showmsg,field.state.status,field.refs.input)
        // console.log('verifyStatus:',showmsg,field.state.status)
        return showmsg && field.state.status ? (
            <span className={'nj-form-msg'}>
                <span className={'nj-form-msg-'+field.state.status}>{novalidText}</span>
            </span>
        ) : null
    }
})

var formRules = {
    required (value) {
        return !!value
    },
    minlength (value, target) {
        return value && value.length >= parseInt(target)
    },
    maxlength (value, target) {
        return value && value.length <= parseInt(target)
    },
    email (value) {
        return /^\w+(?:[-+.']\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/.test(value)
    },
    number (value) {
        return !isNaN(value)
    },
    url (value) {//验证输入是否是合法url地址 可以包含中文\u2E80-\u9FFF
        return /^(?:http(?:s)?:\/\/)?([\w-]+\.)+[\w-]+(?:\/[\w\W]*)?$/.test(value.split(/[\?#]/)[0]);
    },
    domain ( value ){//域名
        return /^([\w-]+\.)+[\w-]+(?:\/[\w\W]*)?$/.test(value);
    },
    mobile (value) {        
        return /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])[0-9]{8}$/.test(value)
    },
    qq (value) {
        return /^\s*[.0-9]{5,10}\s*$/.test(value)
    },
    telephone (value) {
        return /^\d{2,5}?[-]?\d{5,8}([-]\d{0,1})?$/.test(value)
    },
    tel400 (value) {
        return /^(400)[-]?\d{3}[-]?\d{4}$/.test(value)
    },
    idcard (value) {//验证身份证号是否合法18位或17位带字母
        return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(?:\d|[a-zA-Z])$/.test(value)
    },
    //二次确认输入项 target为比较的name值
    confirm (value, target) {
        var instances = formDirectives['input'].instances
        var self = this
        var field
        for( var i=0,n=instances.length; i<n; i++ ){
            field = instances[i].handle
            if( field.props.name==target ){
                if( !field.state.addConfirmEvent ){
                    //当target组件被重新修改时 清空当前组件的验证状态
                    field.onVerify(function(){
                        self.state.status = null
                        self.verify()
                        //self.setState({status:null, valid:false})
                    })
                    field.state.addConfirmEvent = true
                }
                return value===field.state.value
            }
        }
    }
}
//自定义规则
Form.addRule = function(name, fn, errortext){
    formRules[name] = fn
    if( errortext ){
        statusText[name] = errortext
    }
}

//验证码
Form.verifyCode = function(verify, refresh){
    verify = verify || 'verify_img';
    refresh = refresh || 'verify_refresh';
    verify = document.getElementById(verify);
    refresh = document.getElementById(refresh);
    if( !verify || !refresh ){
        return {}
    }
    verify.onclick = function(){
        var _src = this.src.split('?'),
            ver = _src[1] || '',
            r = /((\?|&)t=)[\d]+/;
        if( r.test(ver) ){
            ver = _src[0] + '?' + ver.replace(r,'$1'+(+new Date));
        }else{
            ver = 't='+(+new Date);
        }
        this.src = _src[0] + '?' + ver;
        //this.src= domain.login+'/Index-loginverify.html?t='+(+new Date);
    }
    refresh.onclick = function(){
        verify.click();
        return false;
    }
    return {
        refresh : function(){
            verify.click();
        }
    }
}

var statusText = {
    required : '不能为空',
    email : '邮箱格式错误',
    mobile : '手机号码格式错误',
    url : 'url格式错误',
    confirm : '2次输入不一致'
}

var directive = new Directive({
    elementGroups : {
        'form' : {children:['input-group','input','select'], component:formDirectives['form']},
        'input-group' : {children:['input','select'], component:formDirectives['input-group']},
        'input' : {component:formDirectives['input']},
        'select' : {component:formDirectives['select']}
    },
    exports : exports
})
//当脚本在页面底部运行时 直接运行一次可以后续代码中立即获取实例
directive.start()





/*填充表单数据*/
Form.fill = function(options){
    options = options || {};
        
    var Form = $(options.form||document.forms[0]),
        data = options.data,
        i, item, type, value;
        
    if( !Form.length || $.type(data)!='object' ){
        return;
    }
    
    for( i in data ){
        item = Form.find('[name="'+i+'"]');

        if( !item.length ){
            if( options.always ){//当options.always为true时 已隐藏域的形式填充到表单中
                Form.append('<input name="'+i+'" type="hidden" value="'+data[i]+'" />');
            }
            continue;
        }
        type = item[0].type;
        value = data[i];
        var handle = item[0].$handle
        var _item

        if( type=='radio' ){
            _item = item.filter('[value="'+value+'"]')
            _item.click()
            _item.attr('checked', true);
            handle && handle.setState({value}, e=>handle.verify(false))
            
        }else if( type=='checkbox' && $.type(value)=='array' ){
            $.each(value, function(i,v){
                _item = item.filter('[value="'+v+'"]')
                handle = _item[0].$handle
                handle && handle.setState({value:v}, e=>handle.verify(false))
                _item.click();
            })
        }else if( typeof value=='string' || typeof value=='number' ){
            item.val(value);         
            handle && handle.setState({value}, e=>handle.verify(false))
        }
    }
}

/*
 * 格式化表单数据
 * 主要针对非form对象 
 * 本身就是form对象则直接返回form.serialize()
 */
Form.parse = function(form, dataType){
    if( !form || !form.length ){
        return;
    }
    var _form = form.find('form'),
        $form = form[0].tagName.toLowerCase()=='form' ? form : _form.length ? _form : null,
        data;
    
    dataType = dataType || 'string';
        
    if( $form ){
        data = $form.serialize();
    }else{
        //Form = $('<form style="display:none"></form>').appendTo(document.body);
        //clone无法拷贝select值
        //Form.append(form.clone(true));
        //data = Form.serialize();
        //Form.remove();
        var item = form.find('input,textarea,select,button'),
            i=0, n=item.length, data = {};
        for( ; i<n; i++ ){
            if( item[i].name ){
                data[item[i].name] = item[i].value;
            }
        }
    }
    return data;
}

/*
 * post跨域 使用iframe实现
 */
Form.post = function(options){
    options = options || {};
    var _form = options.form
    var noForm = !_form
    if( noForm ){
        _form = $('<form action="" method="post"></form>').appendTo(document.body)[0];
    }
        
    var name = 'iframe_' + (+new Date),
        iframe = $('<iframe src="" name="'+name+'" style="display:none"></iframe>').appendTo(document.body),
        callback = 'jsoncallback_' + (+new Date);

    var data =  $.extend(true, options.data, {jsoncallback:callback});
    Form.fill({
        form : $(_form),
        data : data,
        always : true
    })

    if( options.url ){
        _form.action = options.url
    }
    _form.method = 'post';
    _form.target = name;
    
    window[callback] = function(json){
        // options.complete && options.complete.call(options, json);
        options.success && options.success.call(options, json);
        
        try{
            delete window[callback];
        }catch(e){//ie bug
            window[callback] = null;
        }
        
        iframe.remove();
        noForm && $(_form).remove()
        iframe = null;
    }
    options.beforeSend && options.beforeSend.call(options);
    
    //document.domain = domain.host;//此句可以在beforeSend中配置
    _form.submit();
}
