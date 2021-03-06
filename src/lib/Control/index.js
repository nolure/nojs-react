import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, hashHistory, IndexRedirect} from 'react-router'
import Container from './Components/Container'
import Content from './Components/Content'
import '../../../css/frame.css'

class Root extends React.Component{
    static config (options={}) {
        //options.route 添加自定义可选路由 Array
        let {route} = options
        this.config_routeKeys = route
        this.config_route = Array.isArray(route) && route.map(item=>`(/${item}/:${item})`).join('')
    }
    static parse (params, oldParams) {
        let routeKeys = ['id', 'url'].concat(this.config_routeKeys)
        var keys = Object.keys(params)
        return routeKeys.map(key=>{
            if( params[key]==null && keys.indexOf(key)>=0  ){//清除此key
                return
            }
            let v = params[key]||oldParams[key]
            return v && `/${key}/${encodeURIComponent(v)}`
        }).filter(k=>!!k).join('')
    }   
    componentDidMount () {
        this.options = {}
    }
    //对外提供go方法
    go (params, options) {
        let {menu} = this.props
        let {routers} = this.refs
        let {state, router} = routers
        //如果url与另一个节点的link匹配 则直接跳都那个node
        if( params.url && !params.id ){
            let node_url = menu.filter(n=>n.link==params.url)
            if( node_url.length>1 ){
                //多个节点匹配的话 优先选择和当前选中id相同的
                node_url = node_url.filter(n=>n.id==state.params.id)[0] || node_url[0]
            }else{
                node_url = node_url[0]
            }
            if( node_url ){
                params.url = null
                params.id = node_url.id
            }
        }
        this.options = options || {}
        let url = this.constructor.parse(params, state.params)
        router.push(url)
    }
    render () {
        let {props} = this
        let {routes, defaultNode} = props
        let paths = Object.keys(routes)
        // console.log(1, paths)
        let {config_route=''} = this.constructor
        return (
            <Router history={hashHistory} ref="routers">
              <Route path="/" component={Container} props={Object.assign({root:this}, props)}>
                {defaultNode ? <IndexRedirect to={paths[0]} /> : null}
                {paths.map(path=>
                    <Route key={path} path={'/'+path} component={Content} onLeave={Content.onLeave} />
                )}
              </Route>
            </Router>
        )
    }
}

module.exports = Root
