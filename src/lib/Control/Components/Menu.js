import React from 'react'
import {Link} from 'react-router'
import $ from 'jquery'
import Tree from 'nj/tree'

class Menu extends React.Component{
    changeHandle (node, e) {
        if( !node.link ){
            e.preventDefault()
        }
    }
    componentDidMount () {
        const {tree} = this.refs
        const {onReady, parentSelect} = this.props
        //组件渲染完毕后 向外传递格式化后的节点数据
        onReady && onReady(tree.state.dataFormat.databyid)

        if( !parentSelect ){//不允许父节点选中 点击展开
            tree.onChange((node,e)=>{
                if( node.children.length ){
                    e.preventDefault()
                    tree.toggle(node)
                }
            })
        }
    }
    componentWillReceiveProps (nextProps) {
        //通过props.defaultNode来更新当前选中节点
        const {tree} = this.refs
        let {defaultNode} = nextProps
        defaultNode = tree.state.dataFormat.databyid[defaultNode]        
        // defaultNode && tree.select(defaultNode)
        // console.log(3, defaultNode)
    }
    render () {
        let {node, menu, sidebar, parentSelect} = this.props
        // console.log(node && node.id)
        let tree = <div className="nj-tree">
            <Tree ref="tree" 
                data={menu} 
                onChange={this.changeHandle.bind(this)} 
                defaultNode={node && node.id}
                //使用Link组件更新路由 css控制Link覆盖文字之上
                defineName={item=>{
                    let allowSelect = item.link
                    if( item.children.length && !parentSelect ){//不允许父节点选中
                        allowSelect = false
                    }
                    return <span>{allowSelect ? <Link to={'/'+item.link}/> : null} {item.name}</span>
                } }
            />
        </div>            
        if( typeof sidebar=='function' ){
            tree = sidebar(tree)
        }
        return <div className="grid-menu">
            <div className="grid-inner">{tree}</div>
        </div>
    }
}

module.exports =  Menu