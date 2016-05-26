/**
 * 控制组件显示方式及事件
 */
var nj = require('../lib/nojs-react');

module.exports = {
    getInitialState () {
        this._showEvents = nj.utils.addEventQueue.call(this, 'onShow')
        this._hideEvents = nj.utils.addEventQueue.call(this, 'onHide')

        return {
            visible : false, 
            className : this.effects()[2] || this.effects()[0]
        };
    },
    setDisplay (visible) {
        if( this.state.visible==visible ){
            return
        }
        var effect = this.effects()
        var className = nj.utils.joinClass(effect[visible?1:0], visible?'nj-show':'nj-hide', effect[2])
        //effect[2]始终存在的样式
        this.setState({visible:visible, className:className}) 

        this[visible ? '_showEvents' : '_hideEvents'].complete()

        // setTimeout(e=>{
        //     className = nj.utils.joinClass(effect[visible?1:0], visible?'nj-show':'nj-hide', effect[2])
        //     this.setState({visible:visible, className:className}) 
        // }, 0)
    },
    effects () {
        var effects = {
            'normal' : ['d_hide', 'd_show'],
            'fade' : ['fade-out', 'fade-in'],
            'drop' : ['nj_hide', 'drop_pop_show', 'drop_pop'],
            'scale' : ['scale-out', 'scale-in', 'scale-pop']
        }
        return effects[this.props.effect] || effects.normal
    }
}

