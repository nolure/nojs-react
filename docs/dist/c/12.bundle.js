webpackJsonp([12],{296:function(t,i,e){"use strict";var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=e(5);o(document.body).append("<style>.addIndex{z-index:99999}</style>");var a=function(t,i,e){this.drag=t,this.opt=e=e||{},this.move=i||t,this.delegat=!0===e.delegat,this.setDrag=e.setDrag,this.moveing=!1,this.onDragDown=e.onDragDown,this.onDragStart=e.onDragStart,this.MoveEvent=e.MoveEvent,this.UpEvent=e.UpEvent,this.dragLastPos=[],this.dragNowPos=[],this.mouseLastPos={},this.disable=!1,this.limit=e.limit,this.wrap=e.wrap,this.overflow=e.overflow,this.A=null,this.delay=this.opt.delay||9,this.delegat;var s=this;this.move.bind("mousedown.drag",function(t){s.DragDown(t)})};a.prototype={DragDown:function(t){if(this.disable)return!1;t=t||window.event;var i,e,a,r,n,h,l,f,u=this,p=o(t.target);if(this.delegat&&(p.attr("isdrag")||p.attr("isdragmove")?this.drag=p.attr("isdragmove")?p.closest("[isdrag]"):p:this.drag=null),this.drag&&this.drag.length){if(this.onDragDown&&0==this.onDragDown.call(this,t))return!1;for(this.moveing=!0,this.dragNowPos=[],this.dragLastPos=[],this.maxSize={L:[],T:[],B:[],R:[],W:null,H:null},this.group=this.group||this.drag,this.drag.addClass("addIndex"),a=0,r=this.drag.length;a<r;a++)e=this.drag.eq(a),i="static"===e.css("position"),n=i?e.offset().left:parseInt(e.css("left"),10)||0,h=i?e.offset().top:parseInt(e.css("top"),10)||0,this.wrap&&this.wrap.length&&(n-=this.wrap.offset().left-this.wrap.scrollLeft(),h-=this.wrap.offset().top-this.wrap.scrollTop()),l=e.outerWidth(),f=e.outerHeight(),this.dragLastPos.push({x:n,y:h}),i&&e.css({position:"absolute"}),e.css({left:n,top:h}),this.group&&!e.is(this.group)||(this.maxSize.L.push(n),this.maxSize.T.push(h),this.maxSize.R.push(n+l),this.maxSize.B.push(h+f));if(t.preventDefault(),this.maxSize.L=Math.min.apply(null,this.maxSize.L),this.maxSize.T=Math.min.apply(null,this.maxSize.T),this.maxSize.W=Math.max.apply(null,this.maxSize.R)-this.maxSize.L,this.maxSize.H=Math.max.apply(null,this.maxSize.B)-this.maxSize.T,this.limit&&(this.maxSize.l=this.limit.offset().left+parseInt(this.limit.css("border-left-width")),this.maxSize.t=this.limit.offset().top+parseInt(this.limit.css("border-top-width")),"static"!==this.limit.css("position")&&this.limit.find(e).length&&(this.maxSize.l=this.maxSize.t=0),this.maxSize.w=this.limit.innerWidth()-this.maxSize.W+this.maxSize.l,this.maxSize.h=this.limit.innerHeight()-this.maxSize.H+this.maxSize.t,this.overflow)){if("object"==s(this.overflow))var d=this.overflow,n=d.x,h=d.y,m=d.width,c=d.height;else{var n,h,m,c;n=h=m=c=this.overflow}this.maxSize.l-=n,this.maxSize.t-=h,this.maxSize.w+=m,this.maxSize.h+=c}if(this.mouseLastPos={x:t.clientX,y:t.clientY},this.onDragStart&&0==this.onDragStart.call(this,t))return!1;o(document).bind("mousemove.drag",function(t){u.DragMove(t)}).bind("mouseup.drag",function(t){u.DragUp(t)})}},DragMove:function(t){if(this.moveing&&!this.disable&&this.drag){t=t||window.event,t.preventDefault();var i,e,s,o,a,r={x:t.clientX-this.mouseLastPos.x,y:t.clientY-this.mouseLastPos.y},n=r.x,h=r.y,l=this.drag.length,f=this;for(this.limit&&(o=this.maxSize.L+n,a=this.maxSize.T+h,r.x=o<this.maxSize.l?this.maxSize.l-this.maxSize.L:n,r.x=o>this.maxSize.w?this.maxSize.w-this.maxSize.L:r.x,r.y=a<this.maxSize.t?this.maxSize.t-this.maxSize.T:h,r.y=a>this.maxSize.h?this.maxSize.h-this.maxSize.T:r.y),this.setOffset&&(r=this.setOffset.call(this,r)),n=r.x,h=r.y,i=0;i<l;i++)e=this.drag.eq(i),s=this.dragLastPos[i],this.dragNowPos[i]={x:s.x+n,y:s.y+h},e.css({left:this.dragNowPos[i].x,top:this.dragNowPos[i].y});this.MoveEvent&&(clearTimeout(f.A),f.A=setTimeout(function(){f.MoveEvent.call(f,{x:n,y:h,w:f.maxSize.W,h:f.maxSize.H,left:s.x+n,top:s.y+h},t)},f.delay))}},DragUp:function(t){if(!this.disable){var i=this;this.moveing=!1,o(document).off("mousemove.drag mouseup.drag"),this.drag.removeClass("addIndex"),i.A=clearTimeout(i.A),this.UpEvent&&this.UpEvent.call(this,t),this.maxSize=this.dragLastPos=this.dragNowPos=null,t.preventDefault()}}},t.exports=a},78:function(t,i,e){"use strict";function s(t){return t&&t.__esModule?t:{default:t}}function o(t,i){if(!(t instanceof i))throw new TypeError("Cannot call a class as a function")}function a(t,i){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!i||"object"!=typeof i&&"function"!=typeof i?t:i}function r(t,i){if("function"!=typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function, not "+typeof i);t.prototype=Object.create(i&&i.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),i&&(Object.setPrototypeOf?Object.setPrototypeOf(t,i):t.__proto__=i)}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function t(t,i){for(var e=0;e<i.length;e++){var s=i[e];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(i,e,s){return e&&t(i.prototype,e),s&&t(i,s),i}}(),h=e(5),l=s(h),f=e(17),u=e(296),p=s(u),d=function(t){function i(){return o(this,i),a(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return r(i,t),n(i,[{key:"componentDidMount",value:function(){var t=this,i=(0,l.default)(f.ReactDOM.findDOMNode(this)),e=this.props,s=e.onDragDown,o=e.onDragMove,a=e.onDragUp;this.holder=i.clone(),this.drag=new p.default(i,null,{wrap:(0,l.default)("div.page-side")});var r=void 0,n=void 0;this.drag.onDragDown=function(e){var o=i.offset();i.css({position:"absolute",top:o.top,left:o.left}).addClass("drag_target").after(t.holder),s&&s.call(this,t.props),i.find(".layer").css({top:100*(e.clientY-o.top)/i.innerHeight()+"%",left:100*(e.clientX-o.left)/i.innerWidth()+"%"}),r=e.clientX,n=e.clientY},this.drag.MoveEvent=function(i,e){r=e.clientX,n=e.clientY,o&&o.call(this,r,n,t.props)},this.drag.UpEvent=function(e){t.holder.remove(),i.removeClass("drag_target").removeAttr("style"),a&&a.call(this,r,n,t.props)}}},{key:"componentWillReceiveProps",value:function(t){}},{key:"render",value:function(){return this.props.children}}]),i}(f.React.Component);i.default=d}});