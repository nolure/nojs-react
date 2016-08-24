/**
 * 分页组件
 */
var nj = require('./nojs-react') 
var {React, ReactDOM, mixins} = nj
var $ = require('jquery')

var Page = React.createClass({
    getInitialState () {
        return {
            start : 0,
            end : this.props.perpage,
            page : this.props.page || 1,
            pages : this.getPages()
        }
    },
    getDefaultProps () {
        return {
            data : [],
            perpage : 10//每页个数
            //page : 1//当前页码
            //pages : 
            //count : //数据数量
        }
    },
    componentWillReceiveProps (nextProps) {
        this.setState({pages:this.getPages(nextProps)})
    },
    componentDidMount () {
        var {onChange} = this.props
        setTimeout(()=>{
            onChange && onChange(this.setData(this.state.page))
        }, 10)
    },
    getPages (props) {
        props = props || this.props
        return Math.ceil(props.data.length/props.perpage)
    },
    handleChange (action, e) {
        var {onChange, perpage, data} = this.props
        var {page} = this.state
        var _page = page
        if( typeof action=='number' ){
            page = action
        }else{
            switch (action) {            
            case 'next':
                page++
                break
            case 'prev':
                page--
                break
            }
        }        
        onChange && onChange(this.setData(page), _page, page)
        e.preventDefault()        
    },
    setData (page) {
        page = page || this.state.page
        var {perpage, data} = this.props
        var start = (page-1)*perpage
        var end = start+perpage
        end = end >=data.length ? data.length : end
        this.setState({page:page, start:start, end:end})
        var _data = data.slice(start, start+perpage)
        return _data
    },
    render () {
        var {page} = this.state
        var pages = this.getPages()//总页数
        // console.log(page,pages,this.props.data.length,this.props.perpage)
        return (
        <div className={'nj-page '+this.props.className}>
            {page>1&&(<a href="" onClick={this.handleChange.bind(this,1)}>首页</a>)}
            {page>1&&(<a href="" onClick={this.handleChange.bind(this,'prev')}>上一页</a>)}
            {this.state.page}/{pages}
            {page<pages&&pages>1&&<a href="" onClick={this.handleChange.bind(this,'next')}>下一页</a>}
            {page<pages&&pages>1&&<a href="" onClick={this.handleChange.bind(this,pages)}>尾页</a>}
        </div>
        )
    }
})
Page.propTypes = {
    data : React.PropTypes.array,
    onChange : React.PropTypes.func
}

module.exports = Page