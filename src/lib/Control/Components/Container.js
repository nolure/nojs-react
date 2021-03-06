import $ from 'jquery'
import nj, {React, utils} from '../../'
import Menu from './Menu'
import Topbar from './Topbar'
import PropTypes from 'prop-types'

const {localStorage, joinClass} = utils
const menuVisible = 'menu_visible'

class Container extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            menuVisible:this.setVisible(),
            topbarItems : [
                {content:<i className="nj-icon nj-icon-menu"></i>, type:'button', handle:this.toggleMenu.bind(this), align:'left'},
                {content:<i className="nj-icon nj-icon-back"></i>, type:'button', handle:e=>this.context.router.goBack(), align:'left'}
            ]
        }
    }    
    componentDidMount () {
        let self = this
        let {routes:[{props:rootProps}]} = this.props
        let {menu, root} = rootProps
        root.tree = this.refs.menu.refs.tree

        $(document).delegate('div.grid-main a, div.grid-topbar a', 'click', function(e){
            let target = this.target
            if( !target && !e.isDefaultPrevented() ){//如果之前添加了preventDefault 这里不再跳转
                e.preventDefault()
                let href = this.getAttribute('href')
                if( !href ){
                    return
                }
                let {params:{id, url}} = self.props

                //如果url与另一个节点的link匹配 则直接跳都那个node
                let node_url = menu.filter(n=>n.link==href&&n.id!=id)[0]
                if( node_url ){
                    self.context.router.push('/id/'+node_url.id)
                }else{
                    self.context.router.push('/id/'+id+'/url/'+encodeURIComponent(href))
                }
            }
        })
    }
    toggleMenu (e) {
        this.setState({menuVisible:this.setVisible(true)})
        e.preventDefault()
    }
    setVisible (turn) {
        let visible = localStorage.get(menuVisible) || true
        visible = visible ? JSON.parse(visible) : visible
        visible = turn ? !visible : visible
        localStorage.set(menuVisible, visible)
        return visible
    }
    render () {
        let {routes:[{props:rootProps}], location} = this.props//this.props.routes[0].props
        let {menu, sidebar, showTopbar=true, topbarItems=[], style, root, parentSelect} = rootProps

        const {menuVisible} = this.state
        const {children, params} = this.props
        const _children = children && React.cloneElement(children, {parent:this,root})

        let path = location.pathname
        let node = menu.filter(item=>item.link && '/'+item.link==path)[0]
        // console.log(0, path, node)//.location.pathname

        let className = joinClass(
            'app-container', 
            !menuVisible && 'hide-menu',
            showTopbar && 'show-topbar',
            style && 'app-style'+style
        )
        return <div className={className}>
            <Menu node={node} menu={menu} sidebar={sidebar} ref="menu" parentSelect={parentSelect}/>
            { showTopbar ?  <Topbar items={this.state.topbarItems.concat(topbarItems)}/> : null }
            {_children}
        </div>
    }
}

Container.contextTypes = {
    router : PropTypes.object
}

module.exports =  Container