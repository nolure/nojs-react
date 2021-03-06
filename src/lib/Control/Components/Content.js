import React from 'react'
import {render, findDOMNode} from 'react-dom'
import $ from 'jquery'
import {Form} from 'nj/form'
import PropTypes from 'prop-types'

class Content extends React.Component{
    static onLeave (e) {
        Content.leaveEvent && Content.leaveEvent(e)
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        let {params, routes:[{props:rootProps}], root} = this.props
        let {onReady} = rootProps;
        
        // console.log(this.props)
        this.jump(null, function(){//页面首次载入完成后回调
            onReady && onReady(params)
        })

        root.reload = this.jump.bind(this)//对外提供reload方法

        this.context.router.setRouteLeaveHook(
            this.props.route, 
            this.routerWillLeave
        )
    }
    routerWillLeave(nextLocation) {
        //return false
        // console.log(nextLocation)
      // 返回 false 会继续停留当前页面，
      // 否则，返回一个字符串，会显示给用户，让其自己决定
      // if (!this.state.isSaved)
        //return '确认要离开？';
    }
    jump (props, callback) {
        let {routes:[{props:rootProps}], params} = props || this.props
        let {menu} = rootProps
        let {id, url} = params
        //获取当前节点
        let node = menu.filter(n=>n.id==id)[0]
        this.load(params, node, callback)//url||node&&node.link, id
    }
    componentWillReceiveProps (nextProps) {
        let {params, routes:[{props:rootProps}]} = this.props
        let {params:nParams} = nextProps;
        let {onChange, onChangeBefore} = rootProps;
        onChangeBefore && onChangeBefore(nParams, params);
        // (nParams.id!=params.id || nParams.url!=params.url) && 
        this.jump(nextProps);
        //url发生变化时回调
        onChange && onChange(nParams, params)
    }
    load (params, node, callback) {//(url, id)
        let {routes:[{props:rootProps}]} = this.props
        let {template, htmlParse, onComplete, loadScript, scripts={}} = rootProps

        let {url, id} = params
        url = url || node && node.link
        let realUrl = url

        if( url && typeof template=='function' ){
            realUrl = template({id, url})
        }

        // if( !realUrl ) return;

        onComplete && onComplete(params, node)           
        callback && callback(params, node)
        return;
        
        // this.setState({html:'<div class="page-pending">loading……</div>'})
        this.setState({status:'pending'})

        $.get(realUrl).then(html=>{
            let $wrap = $(this.refs.wrap)
            $wrap.scrollTop(0)
            if( typeof htmlParse=='function' ){
                html = htmlParse(html, {id, url})
            }
            //在html后添加随机个空格
            let random = Math.ceil(Math.random()*10)//获取10以内的随机数 
            for( let i=0; i<random; i++ ){
                html += '&nbsp;'
            }
            this.setState({html, status:'complete'}, e=>{
                let {parent} = this.props
                let node = rootProps.menu.filter(n=>n.id==id)[0]
                
                
                //更新html后 需要加载相应组件
                
                /**
                 * 在页面中添加一个隐藏域来标识当前页面 <input id="$pageName" value="index">
                 * 当id或url都不方便匹配时(url中存在动态参数) 可使用此方法
                 */
                let _pageName = $wrap.find('#__pageName__').val()

                let pageName = scripts[_pageName] || scripts[url] || scripts[id]

                if( !scripts[url] && scripts[id] ){//只有id匹配 需检查url是否跟id所在节点的link是否匹配
                    if( url != node.link ){
                        pageName = null
                        //return
                    }
                }
                if( pageName && typeof loadScript=='function' ){
                    // loadScript(pageName, p=>{
                        // this.constructor.leaveEvent = p.onLeave
                        // p.init && p.init(params, node)
                        
                    // })
                }   
                onComplete && onComplete(params, node, pageName, parent)           
                callback && callback(params, node)
                // setTimeout(e=>parent.forceUpdate(), 1)
            })
        })
        .fail(data=>{
            this.setState({status:'fail'})
        })
    }  
    render () {
        let {routes:[{props:rootProps}]} = this.props
        let {pending=<div className="page-pending"><i className="nj-icon nj-icon-loading"></i></div>} = rootProps
        const {html='', status} = this.state
        return <div className="grid-main" ref="wrap">
            {status=='pending' ? pending : null}
            <div className="grid-inner" dangerouslySetInnerHTML={{__html:html}}></div>
        </div>
    }
}

Content.contextTypes = {
    router : PropTypes.object
}

module.exports =  Content