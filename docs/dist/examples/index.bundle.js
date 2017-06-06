webpackJsonp([6],{0:function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var s=n(4),a=(i(s),n(17));i(a),n(32),n(155),n(154)},154:function(t,e,n){"use strict";function i(t,e){return t=0>t?0:t,t=t>e?t%e:t}var s=n(8),a=s.React,o=s.ReactDOM,r=s.mixins,l=n(4),c=n(56)["default"];n(156),l.extend(l.easing,{easeOutExpo:function(t,e,n,i,s){return e==s?n+i:i*(-Math.pow(2,-10*e/s)+1)+n}});var p=a.createClass({displayName:"Scroll",mixins:[r.childComponents.config],getDefaultProps:function(){return{direction:"y",children:[]}},getInitialState:function(){var t=this.props,e=t.step,n=void 0===e?1:e,i=t.time,s=t.repeat,a=void 0===s?!0:s,o=t.auto,r=void 0===o?!0:o;return n=parseInt(n),{step:n,time:i||(n?6e3:30),repeat:a,auto:r,index:0,size:{},scrollLength:0}},componentDidMount:function(){var t=this;this.scrollEvent=s.utils.addEventQueue.call(this,"onScroll"),this.scrollEndEvent=s.utils.addEventQueue.call(this,"onScrollEnd");var e=this.state.page;e&&(this.onScrollEnd(function(e){return t.start()}),e.forceUpdate()),d.getChildComponents(this),this.props.computed&&l(window).on("resize",function(){t.reset()}),setTimeout(function(){t.reset();var e=t.state,n=e.length,i=e.view,s=e.step,a=e.size,o=e.itemsComponent;if(!(i>=n)){var r=n%i;r&&t.append(0,s?i-r:i);var c=t.props.direction;"y"==c&&(a.total=l(o.refs.items).height()),t.start();var p=l(o.refs.wrap);if(p.hover(function(){t.stop()},function(){t.start()}),screen.width<=640){var h="y"==c?"swipeDown":"swipeRight",u="y"==c?"swipeUp":"swipeLeft";p[h](function(){return t.scroll(!1),!1}),p[u](function(){return t.scroll(),!1})}}},1),h.complete(this)},append:function(t,e){var n=this.state,i=n.repeat,s=n.length,a=n.size,o=n.itemsComponent;if(i){var r,l,c=o.props,p=c.children,h=c._children,u=s-t,m=h,d=[];e>u&&(r=p.slice(t),m&&p.forEach(function(e,n){n>=t&&d.push(n)}),t=0,e-=r.length),l=p.slice(t,t+e),m&&p.forEach(function(n,i){i>=t&&t+e>i&&d.push(i)}),r?Array.prototype.push.apply(r,l):r=l;var f=this.state.totalLength;Array.prototype.push.apply(p,r),this.state.totalLength=p.length,"x"==this.props.direction&&(a.total=this.state.totalLength*a.item),this.setState({size:a}),o.setState({children:p},function(t){m&&d.forEach(function(t){o.refs["item"+f].appendChild(m[t].cloneNode(!0)),f++})})}},start:function(){var t=this,e=this.state,n=e.auto,i=e.length,s=e.view,a=e.time;n&&i>s&&(clearInterval(this.delay),this.delay=setInterval(function(){t.scroll()},a))},stop:function(){this.delay=clearInterval(this.delay)},reset:function(){var t=this.props,e=(t.computed,t.direction),n=t.step,i=this.state.itemsComponent,s="x"==e,a=l(i.refs.wrap),o=l(i.refs.items),r=l(i.refs.item0),c=this.state.size={box:s?a.width():a.height(),total:s?null:o.height(),item:s?r.outerWidth(!0):r.outerHeight(!0)};s&&(c.total=this.state.totalLength*c.item),this.state.view=Math.ceil(c.box/c.item),"view"==n&&(this.state.step=this.state.view),this.setState({size:c}),i.forceUpdate()},scroll:function(t){var e,n=this,a=this.state,r=a.size,c=a.step,p=a.scrollLength,h=a.totalLength,u=a.length,m=a.view,d=a.itemsComponent;"number"==typeof t?e=i(t,u):t=t===!1?!1:!0,void 0!==t&&this.start();var f=l(d.refs.wrap),g=this.props.direction;f.stop();var v=s.utils.elementInDOM(o.findDOMNode(this));if(!v)return this.stop(),void f.stop();var w,x,C=0,y=(r.total-r.box,"x"==g?"scrollLeft":"scrollTop"),E={},T=f[y](),b=t?1:-1;if(0==c?w=1:(w=c*r.item,C=800),c){if(w=b*w,!t&&c>p&&"undefined"==typeof e){var N=h-(p+u);m>N&&(this.append(h%u,m-N),h=this.state.totalLength),f[y](f[y]()+r.item*u),p+=u}p+=b*c}else p=Math.floor(T/r.item);this.state.index=p%u,"undefined"==typeof e?(E[y]="+="+w,this.state[y]=x=T+b*w):(p=e,this.state.index=e,E[y]=this.state[y]=x=T=r.item*e),this.state.scrollLength=p,this.state.endIndex=i(this.state.index+m-1,u),f.animate(E,C,"easeOutExpo",function(){if(x>=u*r.item){var t=c?r.item*n.state.index:0;f[y](t),p=n.state.scrollLength=n.state.index=c?n.state.index:t}var e=h-p-m;m>e&&n.append(i(n.state.endIndex+e+1,u),m-e),n.scrollEndEvent.complete()}),this.state.childComponents.forEach(function(t){t.forceUpdate()}),this.scrollEvent.complete(this.state.index)},render:function(){var t=this.props,e=t.className,n=t.children;return e=s.utils.joinClass("nj-scroll",e),a.createElement("div",{className:e},n)}});p.PropTypes={step:a.PropTypes.number,time:a.PropTypes.number,pageTemplate:a.PropTypes.func};var h=s.utils.addEventQueue.call(p,"onCreated"),u=a.createClass({displayName:"ScrollItems",mixins:[r.childComponents.setParents([p])],getInitialState:function(){return{}},componentDidMount:function(){d.getChildComponents(this);var t=this.state.parentComponent;t.state.totalLength=t.state.length=this.props.children.length,t.state.itemsComponent=this;var e=t.props,n=e.direction,i=e.computed,s=e.view,a=void 0===s?1:s,o="x"==n,r={display:o?"inline-block":"block"};if(i){var c,p=l(this.refs.wrap);o?(c=p.width()/a,r.width=c,r.height=c/i):(c=p.height()/a,r.width=c*i,r.height=c)}this.setState({itemStyle:r})},render:function(){var t=this.state,e=t.parentComponent,n=t.itemStyle,i=e.props.direction,o="x"==i,r=this.props,l=r.children,c=r.className;c=s.utils.joinClass("nj-scroll-item clearfix",c);var p=e.state.size;return a.createElement("div",{ref:"wrap",className:"nj-scroll-wrap"},a.createElement("div",{ref:"items",className:"nj-scroll-items clearfix",style:o?{width:p.total}:{}},l.map(function(t,e){return a.createElement("span",{className:c,ref:"item"+e,key:e,style:n},t)})))}}),m=a.createClass({displayName:"ScrollPage",mixins:[r.childComponents.setParents([p])],getDefaultProps:function(){return{pages:0}},handleClick:function(t){var e=this.state.parentComponent;e.stop(),e.scroll(t)},componentDidMount:function(){d.getChildComponents(this);var t=this.state.parentComponent;t.state.page=this},render:function(){for(var t=this,e=this.state.parentComponent,n=e.state,i=n.length,o=n.index,r=[],l=0;i>l;l++)r.push(l+1);var c=this.props,p=c.trigger,h=c.className,u=this.props.template||e.props.pageTemplate;return a.createElement("div",{className:"nj-scroll-page "+h},a.createElement("div",{className:"-page-inner"},r.map(function(e,n){var i="function"==typeof u&&u.call(t,n),r=i||e,l={ref:"item"+n,className:s.utils.joinClass("-page-item",e-1==o&&"-page-active"),key:e};return"string"==typeof i&&(l.dangerouslySetInnerHTML={__html:i},r=null),l["hover"==p?"onMouseEnter":"onClick"]=t.handleClick.bind(t,e-1),a.createElement("span",l,r)})))}});m.PropTypes={pages:a.PropTypes.number};var d=new c({elementGroups:{scroll:{children:["scroll-items","scroll-page"],component:p},"scroll-items":{component:u,wrapItem:function(t,e,n){return t.refs["item"+n]}},"scroll-page":{component:m}},exports:e});d.start()},155:function(t,e,n){"use strict";var i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},s=n(8),a=s.React,o=(s.ReactDOM,s.mixins),r=(n(4),n(56)["default"]),l=a.createClass({displayName:"Switch",mixins:[o.childComponents.config],getInitialState:function(){return{index:0,trigger:this.props.trigger||"click"}},componentDidMount:function(){var t=this;h.getChildComponents(this);var e=this.props.interval;e&&window.setInterval(function(){t.change(++t.state.index)},e),this.changeEvent=s.utils.addEventQueue.call(this,"onChange"),this.readyEvent=s.utils.addEventQueue.call(this,"onReady"),setTimeout(function(e){return t.readyEvent.complete()},1)},change:function(t,e){var n=this.state.length;t=0>t?n-1:t,t=t>=n?0:t,this.state.index=t,this.setState({index:t}),this.state.childComponents.forEach(function(t){t.forceUpdate()}),this.changeEvent.complete(t,e)},render:function(){var t=s.utils.joinClass("nj-switch",this.props.className);return a.createElement("div",i({},this.props,{className:t}),this.props.children)}}),c=a.createClass({displayName:"SwitchMenu",mixins:[o.childComponents.setParents([l])],componentDidMount:function(){h.getChildComponents(this)},render:function(){var t=this.state.parentComponent,e=t.state.index,n=s.utils.joinClass("nj-switch-menu",e==this.state.index&&"nj-switch-menu-active"),i={className:n},o=t.state.trigger,r="hover"==o?"onMouseEnter":"onClick";return i[r]=t.change.bind(t,this.state.index),i=Object.assign({},this.props,i),a.createElement("div",i,this.props.children)}}),p=a.createClass({displayName:"SwitchItem",mixins:[o.childComponents.setParents([l])],componentDidMount:function(){h.getChildComponents(this),this.state.parentComponent.state.length=this.state.index+1},render:function(){var t=this.state.parentComponent.state.index,e=s.utils.joinClass("nj-switch-item",t==this.state.index?"nj-switch-item-active":"d_hide");return a.createElement("div",i({},this.props,{className:e}),this.props.children)}}),h=new r({elementGroups:{"switch":{children:["switch-menu","switch-item"],component:l},"switch-menu":{component:c},"switch-item":{component:p}},exports:e});h.start()},156:function(t,e,n){"use strict";function i(t){return"tagName"in t?t:t.parentNode}function s(t,e,n,i){var s=Math.abs(t-e),a=Math.abs(n-i);return s>=a?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function a(){h=null,m.last&&(m.el.trigger("longTap"),m={})}function o(){h&&clearTimeout(h),h=null}function r(){l&&clearTimeout(l),c&&clearTimeout(c),p&&clearTimeout(p),h&&clearTimeout(h),l=c=p=h=null,m={}}var l,c,p,h,u=n(4),m={},d=750;!function(){var t,e;u(document).on("touchstart",function(n){n=n.originalEvent?n.originalEvent:n,t=Date.now(),e=t-(m.last||t),m.el=u(i(n.touches[0].target)),l&&clearTimeout(l),m.x1=n.touches[0].pageX,m.y1=n.touches[0].pageY,e>0&&250>=e&&(m.isDoubleTap=!0),m.last=t,h=setTimeout(a,d)}).on("touchmove",function(t){t=t.originalEvent?t.originalEvent:t,o(),m.x2=t.touches[0].pageX,m.y2=t.touches[0].pageY,Math.abs(m.x1-m.x2)>10}).on("touchend",function(t){t=t.originalEvent?t.originalEvent:t,o(),m.x2&&Math.abs(m.x1-m.x2)>30||m.y2&&Math.abs(m.y1-m.y2)>30?p=setTimeout(function(){m.direction=s(m.x1,m.x2,m.y1,m.y2),m.el.trigger("swipe",m),m.el.trigger("swipe"+m.direction,m),m={}},0):"last"in m&&(c=setTimeout(function(){var t=u.Event("tap");t.cancelTouch=r,m.el.trigger(t),m.isDoubleTap?(m.el.trigger("doubleTap"),m={}):l=setTimeout(function(){l=null,m.el.trigger("singleTap"),m={}},250)},0))}).on("touchcancel",r),u(window).on("scroll",r)}(),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(t){u.fn[t]=function(e){return this.on(t,e)}})}});