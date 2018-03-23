webpackJsonp([9],{174:function(e,a,l){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}var u=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var l=arguments[a];for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t])}return e},h=l(5),f=(t(h),l(24)),v=t(f),y=l(77),b=t(y),k=f.React.createClass({displayName:"Switch",mixins:[f.mixins.childComponents.config],getInitialState:function(){return{index:0,trigger:this.props.trigger||"click"}},componentDidMount:function(){var e=this;n.getChildComponents(this);var a=this.props.interval;a&&window.setInterval(function(){e.change(++e.state.index)},a),this.changeEvent=v.default.utils.addEventQueue.call(this,"onChange"),this.readyEvent=v.default.utils.addEventQueue.call(this,"onReady"),setTimeout(function(a){return e.readyEvent.complete()},1)},change:function(e,a){var l=this.state.length;e=e<0?l-1:e,e=e>=l?0:e,this.state.index=e,this.setState({index:e}),this.state.childComponents.forEach(function(e){e.forceUpdate()}),this.changeEvent.complete(e,a)},render:function(){var e=v.default.utils.joinClass("nj-switch",this.props.className);return f.React.createElement("div",u({},this.props,{className:e}),this.props.children)}}),q=f.React.createClass({displayName:"SwitchMenu",mixins:[f.mixins.childComponents.setParents([k],1)],componentDidMount:function(){n.getChildComponents(this)},render:function(){var e=this.state.parentComponent,a=e.state.index,l=v.default.utils.joinClass("nj-switch-menu",a==this.state.index&&"nj-switch-menu-active"),t={className:l};return t["hover"==e.state.trigger?"onMouseEnter":"onClick"]=e.change.bind(e,this.state.index),t=Object.assign({},this.props,t),f.React.createElement("div",t,this.props.children)}}),i=f.React.createClass({displayName:"SwitchItem",mixins:[f.mixins.childComponents.setParents([k],1)],componentDidMount:function(){n.getChildComponents(this),this.state.parentComponent.state.length=this.state.index+1},render:function(){var e=this.state.parentComponent.state.index,a=v.default.utils.joinClass("nj-switch-item",e==this.state.index?"nj-switch-item-active":"d_hide");return f.React.createElement("div",u({},this.props,{className:a}),this.props.children)}}),n=new b.default({elementGroups:{switch:{children:["switch-menu","switch-item"],component:k},"switch-menu":{component:q},"switch-item":{component:i}},exports:a})},303:function(e,a,l){"use strict";var t=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var l=arguments[a];for(var t in l)Object.prototype.hasOwnProperty.call(l,t)&&(e[t]=l[t])}return e},u=l(24),h=u.React,f=(u.ReactDOM,u.mixins),v=u.utils,y=u.Mui,b=l(5),k=l(173),q=l(46),i=(q.Form,q.Input),n=l(77),s=e.exports=h.createClass({displayName:"exports",mixins:[f.childComponents.config],getDefaultProps:function(){return{getItem:function(e){return String(e)},disableEnter:!1,max:20}},getInitialState:function(){var e=this.props,a=e.results,l=void 0===a?[]:a,t=e.disable,u=e.value;return{results:l,value:void 0===u?"":u,disable:t,cache:{}}},keyup:function(e){var a=this,l=e.keyCode,t=e.target.value;if(8==l||32==l||46==l||229==l||l>47&&l<58||l>64&&l<91||l>95&&l<112||l>185&&l<193||l>218&&l<223){var u=function(){a.filter(t),a.keyupEvent.complete(t,l)};clearTimeout(this._delay),this._delay=setTimeout(u,this.props.source?300:0)}},keydown:function(e){switch(e.keyCode){case 13:this.move("enter"),this.props.disableEnter,e.preventDefault();break;case 38:this.move("up");break;case 40:this.move("down")}},move:function(e){var a,l,t=this.state,u=t.index,h=t.results,f=h.length;if(u="number"==typeof u?u:-1,"enter"==e)return l=h[u],a=l?this.props.getItem(l):this.state.value,this.enterEvent.complete(u,a),void(u>=0&&this.select(u,"enter"));"up"==e?u=u<=0?f-1:--u:"down"==e&&(u=u>=f-1?0:++u),l=h[u],a=l?this.props.getItem(l):this.state.value,this.setState({index:u,value:a}),this.moveEvent.complete(u,a);var v=this.props.onChange;v&&v(a,u)},select:function(e,a,l){var t=this,u=this.state.results[e];if(u){var h=this.refs,f=h.text,v=(h.container,f.refs.input),y=this.props.getItem(u),b=this.props.onChange;b&&b(y),this.state.value=y,this.state.index=e,this.setState({value:y,index:e}),this.chooseEvent.complete(u,"enter"===a),"click"==a&&v.focus(),this.setDisplay(!1),window.setTimeout(function(e){return t.setDisplay(!1)},450)}},componentDidMount:function(){this.state.results&&this.forceUpdate(function(){}),this.fetchBeforeEvent=v.addEventQueue.call(this,"onFetchBefore"),this.fetchEvent=v.addEventQueue.call(this,"onFetch"),this.fetchCompleteEvent=v.addEventQueue.call(this,"onFetchComplete"),this.completeEvent=v.addEventQueue.call(this,"onComplete"),this.chooseEvent=v.addEventQueue.call(this,"onChoose"),this.enterEvent=v.addEventQueue.call(this,"onEnter"),this.moveEvent=v.addEventQueue.call(this,"onMove"),this.keyupEvent=v.addEventQueue.call(this,"onKeyup")},componentDidUpdate:function(){var e=this,a=this.refs,l=a.text,t=a.container,u=l.refs.input;t&&!t._init_&&(t._init_=!0,t.onShow(function(e){b(t.wrap).width(b(u).outerWidth())}).onDisplayChange(function(a){var l=e.state.results;if(a&&(!l.length||!u.value))return!1}))},componentWillReceiveProps:function(e){var a=e.value,l=e.disable;this.setState({disable:l}),void 0!==a&&this.setState({value:a})},setDisplay:function(e){var a=this.refs.container;a&&(a.setDisplay(e),e&&a.align.set())},filter:function(e){var a=this,l=this.refs,t=l.text,u=(l.container,t.refs.input),h=function(e){e=e.slice(0,i),a.setState({results:e,index:null}),a.setDisplay(!(!e.length||!u.value)),a.completeEvent.complete(e,u.value)};if(!e){var f=this.props.results||[];return void h(f)}var v=this.props,y=v.data,k=v.source,q=v.getItem,i=v.max;if(y=y&&"string"==typeof y?JSON.parse(y):y){var f=y.filter(function(a){return q(a).indexOf(e)>=0});h(f)}else if(k){var n=this.state.cache,s=n[k+e],r=this.fetchBeforeEvent.complete(e,s);if(!1===r)return;if(s)return void h(s);var c=b.getJSON(k+e);c=this.fetchEvent.complete(c,e)||c,c.then(function(l){l=a.fetchCompleteEvent.complete(l)||l||[],n[k+e]=l,u.value?h(l):a.setDisplay(!1)})}},change:function(e){var a=this.props.onChange,l=e.target.value;this.setState({value:l}),a&&a(l),e.stopPropagation()},render:function(){var e=this,a=this.props,l=a.container,u=a.getItem,f=a.name,v=this.state,b=v.index,q=v.value,n=v.results,s=v.disable,r=this.refs.text;if(!l&&q)var c=h.createElement("ul",null,n.map(function(a,l){return a=u(a),h.createElement("li",{key:a,onClick:e.select.bind(e,l,"click"),className:l===b?"active nj-mui-active":""},h.createElement(y,null,a))}));return h.createElement("span",null,h.createElement(i,t({},this.props,{ref:"text",value:q,onChange:this.change,onKeyDown:this.keydown,onKeyUp:!s&&this.keyup})),!l&&r&&!s&&h.createElement(k,{nearby:r.refs.input,trigger:"click",ref:"container",name:"auto-complete-pop auto-complete-"+f,template:c}))}});new n({elementGroups:{autocomplete:{component:s}},exports:a})},307:function(e,a,l){"use strict";e.exports={base:"http://www.fuhaodq.com/fhimg/",data:[{name:"动物系列",items:[{key:"2/bqfh0",value:"🐶",title:"小狗符号"},{key:"2/bqfh1",value:"🐺",title:"狼狗符号"},{key:"2/bqfh2",value:"🐱",title:"小猫头像"},{key:"2/bqfh3",value:"🐭",title:"老鼠头像"},{key:"2/bqfh4",value:"🐹",title:"花鼠头像"},{key:"2/bqfh5",value:"🐰",title:"兔子头像"},{key:"2/bqfh6",value:"🐸",title:"青蛙头像"},{key:"2/bqfh7",value:"🐯",title:"老虎头像"},{key:"2/bqfh8",value:"🐨",title:"考拉头像"},{key:"2/bqfh9",value:"🐻",title:"小熊头像"},{key:"2/bqfh10",value:"🐷",title:"猪的头像"},{key:"2/bqfh11",value:"🐽",title:"猪鼻符号"},{key:"2/bqfh12",value:"🐮",title:"牛的头像"},{key:"2/bqfh13",value:"🐗",title:"野猪头像"},{key:"2/bqfh14",value:"🐵",title:"猴子头像"},{key:"2/bqfh15",value:"🐒",title:"小猴子图像"},{key:"2/bqfh16",value:"🐴",title:"马的头像"},{key:"2/bqfh17",value:"🐑",title:"绵羊符号"},{key:"2/bqfh18",value:"🐘",title:"大象符号"},{key:"2/bqfh19",value:"🐼",title:"熊猫头像"},{key:"2/bqfh20",value:"🐧",title:"企鹅头像"},{key:"2/bqfh21",value:"🐦",title:"鸽子头像"},{key:"2/bqfh22",value:"🐤",title:"小鸟头像"},{key:"2/bqfh23",value:"🐥",title:"小鸡图像"},{key:"2/bqfh24",value:"🐣",title:"小鸡"},{key:"2/bqfh25",value:"🐔",title:"母鸡头像"},{key:"2/bqfh26",value:"🐍",title:"蛇的符号"},{key:"2/bqfh27",value:"🐢",title:"乌龟符号"},{key:"2/bqfh28",value:"🐛",title:"虫子符号"},{key:"2/bqfh29",value:"🐝",title:"蜜蜂符号"},{key:"2/bqfh30",value:"🐜",title:"蚂蚁符号"},{key:"2/bqfh31",value:"🐞",title:"瓢虫符号"},{key:"2/bqfh32",value:"🐌",title:"蜗牛符号"},{key:"2/bqfh33",value:"🐙",title:"章鱼"},{key:"2/bqfh34",value:"🐚",title:"海螺壳"},{key:"2/bqfh35",value:"🐠",title:"热带鱼"},{key:"2/bqfh36",value:"🐟",title:"鱼"},{key:"2/bqfh37",value:"🐬",title:"海豚"},{key:"2/bqfh38",value:"🐳",title:"喷水鲸鱼"},{key:"2/bqfh39",value:"🐋",title:"长须鲸"},{key:"2/bqfh40",value:"🐄",title:"奶牛"},{key:"2/bqfh41",value:"🐏",title:"绵羊"},{key:"2/bqfh42",value:"🐀",title:"老鼠"},{key:"2/bqfh43",value:"🐃",title:"牛"},{key:"2/bqfh44",value:"🐅",title:"老虎"},{key:"2/bqfh45",value:"🐇",title:"兔子"},{key:"2/bqfh46",value:"🐉",title:"龙"},{key:"2/bqfh47",value:"🐎",title:"马"},{key:"2/bqfh48",value:"🐐",title:"羊"},{key:"2/bqfh49",value:"🐓",title:"鸡"},{key:"2/bqfh50",value:"🐕",title:"狗"},{key:"2/bqfh51",value:"🐖",title:"猪"},{key:"2/bqfh52",value:"🐁",title:"老鼠"},{key:"2/bqfh53",value:"🐂",title:"牛"},{key:"2/bqfh54",value:"🐲",title:"龙头"},{key:"2/bqfh55",value:"🐡",title:"鱼"},{key:"2/bqfh56",value:"🐊",title:"鳄鱼"},{key:"2/bqfh57",value:"🐫",title:"骆驼"},{key:"2/bqfh58",value:"🐪",title:"骆驼"},{key:"2/bqfh59",value:"🐆",title:"牧羊犬"},{key:"2/bqfh60",value:"🐈",title:"牧羊犬"},{key:"2/bqfh61",value:"🐩",title:"狮子狗"},{key:"2/bqfh62",value:"🐾",title:"爪印"},{key:"1/bqfh84",value:"🙈",title:"害羞的猴子"},{key:"1/bqfh85",value:"🙉",title:"捂着耳朵的猴子"},{key:"1/bqfh86",value:"🙊",title:"偷笑的猴子"},{key:"1/bqfh87",value:"💀",title:"骷髅"},{key:"1/bqfh88",value:"👽",title:"外星人"},{key:"1/bqfh73",value:"😺",title:"微笑的猫脸"},{key:"1/bqfh74",value:"😸",title:"咧着嘴笑得猫脸"},{key:"1/bqfh75",value:"😻",title:"色迷迷的猫脸"},{key:"1/bqfh76",value:"😽",title:"接吻猫"},{key:"1/bqfh77",value:"😼",title:"苦笑的猫脸"},{key:"1/bqfh78",value:"🙀",title:"疲倦的猫脸"},{key:"1/bqfh79",value:"😿",title:"哭的猫脸"},{key:"1/bqfh80",value:"😹",title:"流着泪的猫脸"},{key:"1/bqfh81",value:"😾",title:"撅嘴的猫脸"}]},{name:"水果食物",items:[{key:"3/bqfh169",value:"☕"},{key:"3/bqfh170",value:"🍵"},{key:"3/bqfh171",value:"🍶"},{key:"3/bqfh172",value:"🍼"},{key:"3/bqfh173",value:"🍺"},{key:"3/bqfh174",value:"🍻"},{key:"3/bqfh175",value:"🍸"},{key:"3/bqfh176",value:"🍹"},{key:"3/bqfh177",value:"🍷"},{key:"3/bqfh178",value:"🍴"},{key:"3/bqfh179",value:"🍕"},{key:"3/bqfh180",value:"🍔"},{key:"3/bqfh181",value:"🍟"},{key:"3/bqfh182",value:"🍗"},{key:"3/bqfh183",value:"🍖"},{key:"3/bqfh184",value:"🍝"},{key:"3/bqfh185",value:"🍛"},{key:"3/bqfh186",value:"🍤"},{key:"3/bqfh187",value:"🍱"},{key:"3/bqfh188",value:"🍣"},{key:"3/bqfh189",value:"🍥"},{key:"3/bqfh190",value:"🍙"},{key:"3/bqfh191",value:"🍘"},{key:"3/bqfh192",value:"🍚"},{key:"3/bqfh193",value:"🍜"},{key:"3/bqfh194",value:"🍲"},{key:"3/bqfh195",value:"🍢"},{key:"3/bqfh196",value:"🍡"},{key:"3/bqfh197",value:"🍳"},{key:"3/bqfh198",value:"🍞"},{key:"3/bqfh199",value:"🍩"},{key:"3/bqfh200",value:"🍮"},{key:"3/bqfh201",value:"🍦"},{key:"3/bqfh202",value:"🍨"},{key:"3/bqfh203",value:"🍧"},{key:"3/bqfh204",value:"🎂"},{key:"3/bqfh205",value:"🍰"},{key:"3/bqfh206",value:"🍪"},{key:"3/bqfh207",value:"🍫"},{key:"3/bqfh208",value:"🍬"},{key:"3/bqfh209",value:"🍭"},{key:"3/bqfh210",value:"🍯"},{key:"3/bqfh211",value:"🍎"},{key:"3/bqfh212",value:"🍏"},{key:"3/bqfh213",value:"🍊"},{key:"3/bqfh214",value:"🍋"},{key:"3/bqfh215",value:"🍒"},{key:"3/bqfh216",value:"🍇"},{key:"3/bqfh217",value:"🍉"},{key:"3/bqfh218",value:"🍓"},{key:"3/bqfh219",value:"🍑"},{key:"3/bqfh220",value:"🍈"},{key:"3/bqfh221",value:"🍌"},{key:"3/bqfh222",value:"🍐"},{key:"3/bqfh223",value:"🍍"},{key:"3/bqfh224",value:"🍠"},{key:"3/bqfh225",value:"🍆"},{key:"3/bqfh226",value:"🍅"},{key:"3/bqfh227",value:"🌽"}]},{name:"表情系列",items:[{key:"1/bqfh0",value:"😄"},{key:"1/bqfh1",value:"😃"},{key:"1/bqfh2",value:"😀"},{key:"1/bqfh3",value:"😊"},{key:"1/bqfh4",value:"☺"},{key:"1/bqfh5",value:"😉"},{key:"1/bqfh6",value:"😍"},{key:"1/bqfh7",value:"😘"},{key:"1/bqfh8",value:"😚"},{key:"1/bqfh9",value:"😗"},{key:"1/bqfh10",value:"😙"},{key:"1/bqfh11",value:"😜"},{key:"1/bqfh12",value:"😝"},{key:"1/bqfh13",value:"😛"},{key:"1/bqfh14",value:"😳"},{key:"1/bqfh15",value:"😁"},{key:"1/bqfh16",value:"😔"},{key:"1/bqfh17",value:"😌"},{key:"1/bqfh18",value:"😒"},{key:"1/bqfh19",value:"😞"},{key:"1/bqfh20",value:"😣"},{key:"1/bqfh21",value:"😢"},{key:"1/bqfh22",value:"😂"},{key:"1/bqfh23",value:"😭"},{key:"1/bqfh24",value:"😪"},{key:"1/bqfh25",value:"😥"},{key:"1/bqfh26",value:"😰"},{key:"1/bqfh27",value:"😅"},{key:"1/bqfh28",value:"😓"},{key:"1/bqfh29",value:"😩"},{key:"1/bqfh30",value:"😫"},{key:"1/bqfh31",value:"😨"},{key:"1/bqfh32",value:"😱"},{key:"1/bqfh33",value:"😠"},{key:"1/bqfh34",value:"😡"},{key:"1/bqfh35",value:"😤"},{key:"1/bqfh36",value:"😖"},{key:"1/bqfh37",value:"😆"},{key:"1/bqfh38",value:"😋"},{key:"1/bqfh39",value:"😷"},{key:"1/bqfh40",value:"😎"},{key:"1/bqfh41",value:"😴"},{key:"1/bqfh42",value:"😵"},{key:"1/bqfh43",value:"😲"},{key:"1/bqfh44",value:"😟"},{key:"1/bqfh45",value:"😦"},{key:"1/bqfh46",value:"😧"},{key:"1/bqfh47",value:"😈"},{key:"1/bqfh48",value:"👿"},{key:"1/bqfh49",value:"😮"},{key:"1/bqfh50",value:"😬"},{key:"1/bqfh51",value:"😐"},{key:"1/bqfh52",value:"😕"},{key:"1/bqfh53",value:"😯"},{key:"1/bqfh54",value:"😶"},{key:"1/bqfh55",value:"😇"},{key:"1/bqfh56",value:"😏"},{key:"1/bqfh57",value:"😑"},{key:"1/bqfh73",value:"😺"},{key:"1/bqfh74",value:"😸"},{key:"1/bqfh75",value:"😻"},{key:"1/bqfh76",value:"😽"},{key:"1/bqfh77",value:"😼"},{key:"1/bqfh78",value:"🙀"},{key:"1/bqfh79",value:"😿"},{key:"1/bqfh80",value:"😹"},{key:"1/bqfh81",value:"😾"},{key:"1/bqfh82",value:"👹"},{key:"1/bqfh83",value:"👺"}]},{name:"植物自然",items:[{key:"2/bqfh63",value:"💐"},{key:"2/bqfh64",value:"🌸"},{key:"2/bqfh65",value:"🌷"},{key:"2/bqfh66",value:"🍀"},{key:"2/bqfh67",value:"🌹"},{key:"2/bqfh68",value:"🌻"},{key:"2/bqfh69",value:"🌺"},{key:"2/bqfh70",value:"🍁"},{key:"2/bqfh71",value:"🍃"},{key:"2/bqfh72",value:"🍂"},{key:"2/bqfh73",value:"🌿"},{key:"2/bqfh74",value:"🌾"},{key:"2/bqfh75",value:"🍄"},{key:"2/bqfh76",value:"🌵"},{key:"2/bqfh77",value:"🌴"},{key:"2/bqfh78",value:"🌲"},{key:"2/bqfh79",value:"🌳"},{key:"2/bqfh80",value:"🌰"},{key:"2/bqfh81",value:"🌱"},{key:"2/bqfh82",value:"🌼"},{key:"2/bqfh83",value:"🌐"},{key:"2/bqfh84",value:"🌞"},{key:"2/bqfh85",value:"🌝"},{key:"2/bqfh86",value:"🌚"},{key:"2/bqfh87",value:"🌑"},{key:"2/bqfh88",value:"🌒"},{key:"2/bqfh89",value:"🌓"},{key:"2/bqfh90",value:"🌔"},{key:"2/bqfh91",value:"🌕"},{key:"2/bqfh92",value:"🌖"},{key:"2/bqfh93",value:"🌗"},{key:"2/bqfh94",value:"🌘"},{key:"2/bqfh95",value:"🌜"},{key:"2/bqfh96",value:"🌛"},{key:"2/bqfh97",value:"🌙"},{key:"2/bqfh98",value:"🌍"},{key:"2/bqfh99",value:"🌎"},{key:"2/bqfh100",value:"🌏"},{key:"2/bqfh101",value:"🌋"},{key:"2/bqfh102",value:"🌌"},{key:"2/bqfh103",value:"🌠"},{key:"2/bqfh104",value:"⭐"},{key:"2/bqfh105",value:"☀"},{key:"2/bqfh106",value:"⛅"},{key:"2/bqfh107",value:"☁"},{key:"2/bqfh108",value:"⚡"},{key:"2/bqfh109",value:"☔"},{key:"2/bqfh110",value:"❄"},{key:"2/bqfh111",value:"⛄"},{key:"2/bqfh112",value:"🌀"},{key:"2/bqfh113",value:"🌁"},{key:"2/bqfh114",value:"🌈"},{key:"2/bqfh115",value:"🌊"},{key:"1/bqfh90",value:"🔥"},{key:"1/bqfh91",value:"✨"},{key:"1/bqfh92",value:"🌟"},{key:"1/bqfh93",value:"💫"},{key:"1/bqfh94",value:"💥"},{key:"1/bqfh95",value:"💢"},{key:"1/bqfh96",value:"💦"},{key:"1/bqfh97",value:"💧"},{key:"1/bqfh98",value:"💤"},{key:"1/bqfh99",value:"💨"}]},{name:"生肖星座",items:[{key:"2/bqfh52",value:"🐁",title:"鼠"},{key:"2/bqfh53",value:"🐂",title:"牛"},{key:"2/bqfh44",value:"🐅",title:"虎"},{key:"2/bqfh45",value:"🐇",title:"兔"},{key:"2/bqfh46",value:"🐉",title:"龙"},{key:"2/bqfh26",value:"🐍",title:"蛇"},{key:"2/bqfh47",value:"🐎",title:"马"},{key:"2/bqfh48",value:"🐐",title:"羊"},{key:"2/bqfh15",value:"🐒",title:"猴"},{key:"2/bqfh49",value:"🐓",title:"鸡"},{key:"2/bqfh50",value:"🐕",title:"狗"},{key:"2/bqfh51",value:"🐖",title:"猪"},{key:"5/bqfh110",value:"♈",title:"白羊座"},{key:"5/bqfh111",value:"♉",title:"金牛座"},{key:"5/bqfh112",value:"♊",title:"双子座"},{key:"5/bqfh113",value:"♋",title:"巨蟹座"},{key:"5/bqfh114",value:"♌",title:"狮子座"},{key:"5/bqfh115",value:"♍",title:"处女座"},{key:"5/bqfh116",value:"♎",title:"天秤座"},{key:"5/bqfh117",value:"♏",title:"天蝎座"},{key:"5/bqfh118",value:"♐",title:"射手座"},{key:"5/bqfh119",value:"♑",title:"摩羯座"},{key:"5/bqfh120",value:"♒",title:"水瓶座"},{key:"5/bqfh121",value:"♓",title:"双鱼座"}]},{name:"运动休闲",items:[{key:"3/bqfh131",value:"📰"},{key:"3/bqfh132",value:"🎨"},{key:"3/bqfh133",value:"🎬"},{key:"3/bqfh134",value:"🎤"},{key:"3/bqfh135",value:"🎧"},{key:"3/bqfh136",value:"🎼"},{key:"3/bqfh137",value:"🎵"},{key:"3/bqfh138",value:"🎶"},{key:"3/bqfh139",value:"🎹"},{key:"3/bqfh140",value:"🎻"},{key:"3/bqfh141",value:"🎷"},{key:"3/bqfh142",value:"🎸"},{key:"3/bqfh143",value:"👾"},{key:"3/bqfh144",value:"🎮"},{key:"3/bqfh145",value:"🃏"},{key:"3/bqfh146",value:"🎴"},{key:"3/bqfh147",value:"🀄"},{key:"3/bqfh148",value:"🎲"},{key:"3/bqfh149",value:"🎯"},{key:"3/bqfh150",value:"🏈"},{key:"3/bqfh151",value:"🏀"},{key:"3/bqfh152",value:"⚽"},{key:"3/bqfh153",value:"⚾"},{key:"3/bqfh154",value:"🎾"},{key:"3/bqfh155",value:"🎱"},{key:"3/bqfh156",value:"🏉"},{key:"3/bqfh157",value:"🎳"},{key:"3/bqfh158",value:"⛳"},{key:"3/bqfh159",value:"🚵"},{key:"3/bqfh160",value:"🚴"},{key:"3/bqfh161",value:"🏁"},{key:"3/bqfh162",value:"🏇"},{key:"3/bqfh163",value:"🏆"},{key:"3/bqfh164",value:"🎿"},{key:"3/bqfh165",value:"🏂"},{key:"3/bqfh166",value:"🏊"},{key:"3/bqfh167",value:"🏄"},{key:"3/bqfh168",value:"🎣"}]},{name:"人物相关",items:[{key:"1/bqfh100",value:"👂"},{key:"1/bqfh101",value:"👀"},{key:"1/bqfh102",value:"👃"},{key:"1/bqfh103",value:"👅"},{key:"1/bqfh104",value:"👄"},{key:"1/bqfh105",value:"👍"},{key:"1/bqfh106",value:"👎"},{key:"1/bqfh107",value:"👌"},{key:"1/bqfh108",value:"👊"},{key:"1/bqfh109",value:"✊"},{key:"1/bqfh110",value:"✌"},{key:"1/bqfh111",value:"👋"},{key:"1/bqfh112",value:"✋"},{key:"1/bqfh113",value:"👐"},{key:"1/bqfh114",value:"👆"},{key:"1/bqfh115",value:"👇"},{key:"1/bqfh116",value:"👉"},{key:"1/bqfh117",value:"👈"},{key:"1/bqfh118",value:"🙌"},{key:"1/bqfh119",value:"🙏"},{key:"1/bqfh120",value:"☝"},{key:"1/bqfh121",value:"👏"},{key:"1/bqfh122",value:"💪"},{key:"1/bqfh123",value:"🚶"},{key:"1/bqfh124",value:"🏃"},{key:"1/bqfh125",value:"💃"},{key:"1/bqfh126",value:"👫"},{key:"1/bqfh127",value:"👪"},{key:"1/bqfh128",value:"👬"},{key:"1/bqfh129",value:"👭"},{key:"1/bqfh130",value:"💏"},{key:"1/bqfh131",value:"💑"},{key:"1/bqfh132",value:"👯"},{key:"1/bqfh133",value:"🙆"},{key:"1/bqfh134",value:"🙅"},{key:"1/bqfh135",value:"💁"},{key:"1/bqfh136",value:"🙋"},{key:"1/bqfh137",value:"💇"},{key:"1/bqfh138",value:"💅"},{key:"1/bqfh139",value:"👰"},{key:"1/bqfh140",value:"🙎"},{key:"1/bqfh141",value:"🙍"},{key:"1/bqfh142",value:"🙇"},{key:"1/bqfh143",value:"🎩"},{key:"1/bqfh144",value:"👑"},{key:"1/bqfh145",value:"👒"},{key:"1/bqfh146",value:"👟"},{key:"1/bqfh147",value:"👞"},{key:"1/bqfh148",value:"👡"},{key:"1/bqfh149",value:"👠"},{key:"1/bqfh150",value:"👢"},{key:"1/bqfh151",value:"👕"},{key:"1/bqfh152",value:"👔"},{key:"1/bqfh153",value:"👚"},{key:"1/bqfh154",value:"👗"},{key:"1/bqfh155",value:"🎽"},{key:"1/bqfh156",value:"👖"},{key:"1/bqfh157",value:"👘"},{key:"1/bqfh158",value:"👙"},{key:"1/bqfh159",value:"💼"},{key:"1/bqfh160",value:"👜"},{key:"1/bqfh161",value:"👝"},{key:"1/bqfh162",value:"👛"},{key:"1/bqfh163",value:"👓"},{key:"1/bqfh164",value:"🎀"},{key:"1/bqfh165",value:"🌂"},{key:"1/bqfh166",value:"💄"},{key:"1/bqfh180",value:"💋"},{key:"1/bqfh185",value:"👣"},{key:"1/bqfh181",value:"💎"},{key:"1/jiezhi",value:"💍"}]},{name:"花样庆祝",items:[{key:"1/bqfh144",value:"👑",title:"皇冠"},{key:"1/bqfh90",value:"🔥"},{key:"1/bqfh91",value:"✨"},{key:"1/bqfh92",value:"🌟"},{key:"1/bqfh93",value:"💫"},{key:"1/bqfh94",value:"💥"},{key:"1/bqfh164",value:"🎀"},{key:"1/bqfh165",value:"🌂"},{key:"1/bqfh166",value:"💄"},{key:"1/bqfh167",value:"💛"},{key:"1/bqfh168",value:"💙"},{key:"1/bqfh169",value:"💜"},{key:"1/bqfh170",value:"💚"},{key:"1/bqfh171",value:"❤"},{key:"1/bqfh172",value:"💔"},{key:"1/bqfh173",value:"💗"},{key:"1/bqfh174",value:"💓"},{key:"1/bqfh175",value:"💕"},{key:"1/bqfh176",value:"💖"},{key:"1/bqfh177",value:"💞"},{key:"1/bqfh178",value:"💘"},{key:"1/bqfh179",value:"💌"},{key:"1/bqfh180",value:"💋"},{key:"3/bqfh0",value:"🎍"},{key:"3/bqfh1",value:"💝"},{key:"3/bqfh2",value:"🎎"},{key:"3/bqfh3",value:"🎒"},{key:"3/bqfh4",value:"🎓"},{key:"3/bqfh5",value:"🎏"},{key:"3/bqfh6",value:"🎆"},{key:"3/bqfh7",value:"🎇"},{key:"3/bqfh8",value:"🎐"},{key:"3/bqfh9",value:"🎑"},{key:"3/bqfh10",value:"🎃"},{key:"3/bqfh11",value:"👻"},{key:"3/bqfh12",value:"🎅"},{key:"3/bqfh13",value:"🎄"},{key:"3/bqfh14",value:"🎁"},{key:"3/bqfh15",value:"🎋"},{key:"3/bqfh16",value:"🎉"},{key:"3/bqfh17",value:"🎊"},{key:"3/bqfh18",value:"🎈"},{key:"3/bqfh19",value:"🎌"}]},{name:"文字系列",items:[{key:"5/bqfh51",value:"🈯"},{key:"5/bqfh52",value:"🈳"},{key:"5/bqfh53",value:"🈵"},{key:"5/bqfh54",value:"🈴"},{key:"5/bqfh55",value:"🈲"},{key:"5/bqfh56",value:"🉐"},{key:"5/bqfh57",value:"🈹"},{key:"5/bqfh58",value:"🈺"},{key:"5/bqfh59",value:"🈶"},{key:"5/bqfh60",value:"🈚"},{key:"5/bqfh65",value:"🚾"},{key:"5/bqfh68",value:"🅿"},{key:"5/bqfh71",value:"🈷"},{key:"5/bqfh72",value:"🈸"},{key:"5/bqfh73",value:"🈂"},{key:"5/bqfh74",value:"Ⓜ"},{key:"5/bqfh79",value:"🉑"},{key:"5/bqfh80",value:"㊙"},{key:"5/bqfh81",value:"㊗"},{key:"5/bqfh82",value:"🆑"},{key:"5/bqfh83",value:"🆘"},{key:"5/bqfh84",value:"🆔"},{key:"5/bqfh86",value:"🔞"},{key:"5/bqfh85",value:"🚫"},{key:"5/bqfh100",value:"🆚"},{key:"5/bqfh103",value:"🅰"},{key:"5/bqfh104",value:"🅱"},{key:"5/bqfh105",value:"🆎"},{key:"5/bqfh106",value:"🅾"},{key:"5/bqfh95",value:"❇"}]},{name:"物体物件",items:[{key:"3/bqfh20",value:"🔮"},{key:"3/bqfh21",value:"🎥"},{key:"3/bqfh22",value:"📷"},{key:"3/bqfh23",value:"📹"},{key:"3/bqfh24",value:"📼"},{key:"3/bqfh25",value:"💿"},{key:"3/bqfh26",value:"📀"},{key:"3/bqfh27",value:"💽"},{key:"3/bqfh28",value:"💾"},{key:"3/bqfh29",value:"💻"},{key:"3/bqfh30",value:"📱"},{key:"3/bqfh31",value:"☎"},{key:"3/bqfh32",value:"📞"},{key:"3/bqfh33",value:"📟"},{key:"3/bqfh34",value:"📠"},{key:"3/bqfh35",value:"📡"},{key:"3/bqfh36",value:"📺"},{key:"3/bqfh37",value:"📻"},{key:"3/bqfh38",value:"🔊"},{key:"3/bqfh39",value:"🔉"},{key:"3/bqfh40",value:"🔈"},{key:"3/bqfh41",value:"🔇"},{key:"3/bqfh42",value:"🔔"},{key:"3/bqfh43",value:"🔕"},{key:"3/bqfh44",value:"📢"},{key:"3/bqfh45",value:"📣"},{key:"3/bqfh46",value:"⏳"},{key:"3/bqfh47",value:"⌛"},{key:"3/bqfh48",value:"⏰"},{key:"3/bqfh49",value:"⌚"},{key:"3/bqfh50",value:"🔓"},{key:"3/bqfh51",value:"🔒"},{key:"3/bqfh52",value:"🔐"},{key:"3/bqfh53",value:"🔑"},{key:"3/bqfh54",value:"🔎"},{key:"3/bqfh55",value:"💡"},{key:"3/bqfh56",value:"🔦"},{key:"3/bqfh57",value:"🔆"},{key:"3/bqfh58",value:"🔅"},{key:"3/bqfh59",value:"🔌"},{key:"3/bqfh60",value:"🔋"},{key:"3/bqfh61",value:"🔍"},{key:"3/bqfh62",value:"🛁"},{key:"3/bqfh63",value:"🛀"},{key:"3/bqfh64",value:"🚿"},{key:"3/bqfh65",value:"🚽"},{key:"3/bqfh66",value:"🔧"},{key:"3/bqfh67",value:"🔩"},{key:"3/bqfh68",value:"🔨"},{key:"3/bqfh69",value:"🚪"},{key:"3/bqfh70",value:"🚬"},{key:"3/bqfh71",value:"💣"},{key:"3/bqfh72",value:"🔫"},{key:"3/bqfh73",value:"🔪"},{key:"3/bqfh74",value:"💊"},{key:"3/bqfh75",value:"💉"},{key:"3/bqfh76",value:"💰"},{key:"3/bqfh77",value:"💴"},{key:"3/bqfh78",value:"💵"},{key:"3/bqfh79",value:"💷"},{key:"3/bqfh80",value:"💶"},{key:"3/bqfh81",value:"💳"},{key:"3/bqfh82",value:"💸"},{key:"3/bqfh83",value:"📲"},{key:"3/bqfh84",value:"📧"},{key:"3/bqfh85",value:"📥"},{key:"3/bqfh86",value:"📤"},{key:"3/bqfh87",value:"✉"},{key:"3/bqfh88",value:"📩"},{key:"3/bqfh89",value:"📨"},{key:"3/bqfh90",value:"📯"},{key:"3/bqfh91",value:"📫"},{key:"3/bqfh92",value:"📪"},{key:"3/bqfh93",value:"📬"},{key:"3/bqfh94",value:"📭"},{key:"3/bqfh95",value:"📮"},{key:"3/bqfh96",value:"📦"},{key:"3/bqfh97",value:"📝"},{key:"3/bqfh98",value:"📄"},{key:"3/bqfh99",value:"📃"},{key:"3/bqfh100",value:"📑"},{key:"3/bqfh101",value:"📊"},{key:"3/bqfh102",value:"📈"},{key:"3/bqfh103",value:"📉"},{key:"3/bqfh104",value:"📜"},{key:"3/bqfh105",value:"📋"},{key:"3/bqfh106",value:"📅"},{key:"3/bqfh107",value:"📆"},{key:"3/bqfh108",value:"📇"},{key:"3/bqfh109",value:"📁"},{key:"3/bqfh110",value:"📂"},{key:"3/bqfh111",value:"✂"},{key:"3/bqfh112",value:"📌"},{key:"3/bqfh113",value:"📎"},{key:"3/bqfh114",value:"✒"},{key:"3/bqfh115",value:"✏"},{key:"3/bqfh116",value:"📏"},{key:"3/bqfh117",value:"📐"},{key:"3/bqfh118",value:"📕"},{key:"3/bqfh119",value:"📗"},{key:"3/bqfh120",value:"📘"},{key:"3/bqfh121",value:"📙"},{key:"3/bqfh122",value:"📓"},{key:"3/bqfh123",value:"📔"},{key:"3/bqfh124",value:"📒"},{key:"3/bqfh125",value:"📚"},{key:"3/bqfh126",value:"📖"},{key:"3/bqfh127",value:"🔖"},{key:"3/bqfh128",value:"📛"},{key:"3/bqfh129",value:"🔬"},{key:"3/bqfh130",value:"🔭"}]},{name:"各种标识",items:[{key:"5/bqfh61",value:"🚻"},{key:"5/bqfh62",value:"🚹"},{key:"5/bqfh63",value:"🚺"},{key:"5/bqfh64",value:"🚼"},{key:"5/bqfh66",value:"🚰"},{key:"5/bqfh67",value:"🚮"},{key:"5/bqfh69",value:"♿"},{key:"5/bqfh70",value:"🚭"},{key:"5/bqfh75",value:"🛂"},{key:"5/bqfh76",value:"🛄"},{key:"5/bqfh77",value:"🛅"},{key:"5/bqfh78",value:"🛃"},{key:"5/bqfh85",value:"🚫"},{key:"5/bqfh86",value:"🔞"},{key:"5/bqfh88",value:"🚯"},{key:"5/bqfh89",value:"🚱"},{key:"5/bqfh90",value:"🚳"},{key:"5/bqfh91",value:"🚷"},{key:"5/bqfh92",value:"🚸"},{key:"5/bqfh93",value:"⛔"},{key:"5/bqfh94",value:"✳"},{key:"5/bqfh95",value:"❇"},{key:"5/bqfh96",value:"❎"},{key:"5/bqfh97",value:"✅"},{key:"5/bqfh98",value:"✴"},{key:"5/bqfh99",value:"💟"},{key:"5/bqfh101",value:"📳"},{key:"5/bqfh102",value:"📴"},{key:"5/bqfh107",value:"💠"},{key:"5/bqfh108",value:"➿"},{key:"5/bqfh109",value:"♻"},{key:"5/bqfh122",value:"⛎"},{key:"5/bqfh0",value:"0⃣"},{key:"5/bqfh1",value:"1⃣"},{key:"5/bqfh2",value:"2⃣"},{key:"5/bqfh3",value:"3⃣"},{key:"5/bqfh4",value:"4⃣"},{key:"5/bqfh5",value:"5⃣"},{key:"5/bqfh6",value:"6⃣"},{key:"5/bqfh7",value:"7⃣"},{key:"5/bqfh8",value:"8⃣"},{key:"5/bqfh9",value:"9⃣"},{key:"5/bqfh10",value:"🔟"},{key:"5/bqfh11",value:"⬆"},{key:"5/bqfh12",value:"⬇"},{key:"5/bqfh13",value:"⬅"},{key:"5/bqfh14",value:"➡"},{key:"5/bqfh15",value:"🔣"},{key:"5/bqfh16",value:"🔢"},{key:"5/bqfh17",value:"🔠"},{key:"5/bqfh18",value:"🔡"},{key:"5/bqfh19",value:"🔤"},{key:"5/bqfh20",value:"↗"},{key:"5/bqfh21",value:"↖"},{key:"5/bqfh22",value:"↘"},{key:"5/bqfh23",value:"↙"},{key:"5/bqfh24",value:"↔"},{key:"5/bqfh25",value:"↕"},{key:"5/bqfh26",value:"🔄"},{key:"5/bqfh27",value:"◀"},{key:"5/bqfh28",value:"▶"},{key:"5/bqfh29",value:"🔼"},{key:"5/bqfh30",value:"🔽"},{key:"5/bqfh31",value:"↩"},{key:"5/bqfh32",value:"↪"},{key:"5/bqfh33",value:"ℹ"},{key:"5/bqfh34",value:"⏪"},{key:"5/bqfh35",value:"⏫"},{key:"5/bqfh36",value:"⏬"},{key:"5/bqfh37",value:"⤵"},{key:"5/bqfh38",value:"⤴"},{key:"5/bqfh39",value:"🆗"},{key:"5/bqfh40",value:"🔀"},{key:"5/bqfh41",value:"🔁"},{key:"5/bqfh42",value:"🔂"},{key:"5/bqfh43",value:"🆕"},{key:"5/bqfh44",value:"🆙"},{key:"5/bqfh45",value:"🆒"},{key:"5/bqfh46",value:"🆓"},{key:"5/bqfh47",value:"🆖"},{key:"5/bqfh48",value:"📶"},{key:"5/bqfh49",value:"🎦"},{key:"5/bqfh50",value:"🈁"},{key:"5/bqfh122",value:"⛎"},{key:"5/bqfh123",value:"🔯"},{key:"5/bqfh124",value:"🏧"},{key:"5/bqfh125",value:"💹"},{key:"5/bqfh126",value:"💲"},{key:"5/bqfh127",value:"💱"},{key:"5/bqfh128",value:"™"},{key:"5/bqfh129",value:"❌"},{key:"5/bqfh130",value:"‼"},{key:"5/bqfh131",value:"⁉"},{key:"5/bqfh132",value:"❗"},{key:"5/bqfh133",value:"❓"},{key:"5/bqfh134",value:"❕"},{key:"5/bqfh135",value:"❔"},{key:"5/bqfh136",value:"⭕"},{key:"5/bqfh137",value:"🔝"},{key:"5/bqfh138",value:"🔚"},{key:"5/bqfh139",value:"🔙"},{key:"5/bqfh140",value:"🔛"},{key:"5/bqfh141",value:"🔜"},{key:"5/bqfh142",value:"🔃"},{key:"5/bqfh143",value:"🕛"},{key:"5/bqfh144",value:"🕧"},{key:"5/bqfh145",value:"🕐"},{key:"5/bqfh146",value:"🕜"},{key:"5/bqfh147",value:"🕑"},{key:"5/bqfh148",value:"🕝"},{key:"5/bqfh149",value:"🕒"},{key:"5/bqfh150",value:"🕞"},{key:"5/bqfh151",value:"🕓"},{key:"5/bqfh152",value:"🕟"},{key:"5/bqfh153",value:"🕔"},{key:"5/bqfh154",value:"🕠"},{key:"5/bqfh155",value:"🕕"},{key:"5/bqfh156",value:"🕖"},{key:"5/bqfh157",value:"🕗"},{key:"5/bqfh158",value:"🕘"},{key:"5/bqfh159",value:"🕙"},{key:"5/bqfh160",value:"🕚"},{key:"5/bqfh161",value:"🕡"},{key:"5/bqfh162",value:"🕢"},{key:"5/bqfh163",value:"🕤"},{key:"5/bqfh164",value:"🕥"},{key:"5/bqfh165",value:"🕦"},{key:"5/bqfh166",value:"➕"},{key:"5/bqfh167",value:"➖"},{key:"5/bqfh168",value:"➗"},{key:"5/bqfh169",value:"♠"},{key:"5/bqfh170",value:"♥"},{key:"5/bqfh171",value:"♣"},{key:"5/bqfh172",value:"♦"},{key:"5/bqfh173",value:"💮"},{key:"5/bqfh174",value:"💯"},{key:"5/bqfh175",value:"✔"},{key:"5/bqfh176",value:"☑"},{key:"5/bqfh177",value:"🔘"},{key:"5/bqfh178",value:"🔗"},{key:"5/bqfh179",value:"➰"},{key:"5/bqfh180",value:"〰"},{key:"5/bqfh181",value:"〽"},{key:"5/bqfh182",value:"🔱"},{key:"5/bqfh183",value:"◼"},{key:"5/bqfh184",value:"◻"},{key:"5/bqfh185",value:"◾"},{key:"5/bqfh186",value:"◽"},{key:"5/bqfh187",value:"▪"},{key:"5/bqfh188",value:"▫"},{key:"5/bqfh189",value:"🔺"},{key:"5/bqfh190",value:"🔲"},{key:"5/bqfh191",value:"🔳"},{key:"5/bqfh192",value:"⚫"},{key:"5/bqfh193",value:"⚪"},{key:"5/bqfh194",value:"🔴"},{key:"5/bqfh195",value:"🔵"},{key:"5/bqfh196",value:"🔻"},{key:"5/bqfh197",value:"🔶"},{key:"5/bqfh198",value:"🔷"},{key:"5/bqfh199",value:"🔸"},{key:"5/bqfh200",value:"🔹"},{key:"5/bqfh201",value:"✖"}]},{name:"房车交通",items:[{key:"4/bqfh0",value:"🏠"},{key:"4/bqfh1",value:"🏡"},{key:"4/bqfh2",value:"🏫"},{key:"4/bqfh3",value:"🏢"},{key:"4/bqfh4",value:"🏣"},{key:"4/bqfh5",value:"🏥"},{key:"4/bqfh6",value:"🏦"},{key:"4/bqfh7",value:"🏪"},{key:"4/bqfh8",value:"🏩"},{key:"4/bqfh9",value:"🏨"},{key:"4/bqfh10",value:"💒"},{key:"4/bqfh11",value:"⛪"},{key:"4/bqfh12",value:"🏬"},{key:"4/bqfh13",value:"🏤"},{key:"4/bqfh14",value:"🌇"},{key:"4/bqfh15",value:"🌆"},{key:"4/bqfh16",value:"🏯"},{key:"4/bqfh17",value:"🏰"},{key:"4/bqfh18",value:"⛺"},{key:"4/bqfh19",value:"🏭"},{key:"4/bqfh20",value:"🗼"},{key:"4/bqfh21",value:"🗾"},{key:"4/bqfh22",value:"🗻"},{key:"4/bqfh23",value:"🌄"},{key:"4/bqfh24",value:"🚢"},{key:"4/bqfh25",value:"⛵"},{key:"4/bqfh26",value:"🚤"},{key:"4/bqfh27",value:"🚣"},{key:"4/bqfh28",value:"⚓"},{key:"4/bqfh29",value:"🚀"},{key:"4/bqfh30",value:"✈"},{key:"4/bqfh31",value:"💺"},{key:"4/bqfh32",value:"🚁"},{key:"4/bqfh33",value:"🚂"},{key:"4/bqfh34",value:"🚊"},{key:"4/bqfh35",value:"🚉"},{key:"4/bqfh36",value:"🚞"},{key:"4/bqfh37",value:"🚆"},{key:"4/bqfh38",value:"🚄"},{key:"4/bqfh39",value:"🚅"},{key:"4/bqfh40",value:"🚈"},{key:"4/bqfh41",value:"🚇"},{key:"4/bqfh42",value:"🚝"},{key:"4/bqfh43",value:"🚋"},{key:"4/bqfh44",value:"🚃"},{key:"4/bqfh45",value:"🚎"},{key:"4/bqfh46",value:"🚌"},{key:"4/bqfh47",value:"🚍"},{key:"4/bqfh48",value:"🚙"},{key:"4/bqfh49",value:"🚘"},{key:"4/bqfh50",value:"🚗"},{key:"4/bqfh51",value:"🚕"},{key:"4/bqfh52",value:"🚖"},{key:"4/bqfh53",value:"🚛"},{key:"4/bqfh54",value:"🚚"},{key:"4/bqfh55",value:"🚨"},{key:"4/bqfh56",value:"🚓"},{key:"4/bqfh57",value:"🚔"},{key:"4/bqfh58",value:"🚒"},{key:"4/bqfh59",value:"🚑"},{key:"4/bqfh60",value:"🚐"},{key:"4/bqfh61",value:"🚲"},{key:"4/bqfh62",value:"🚡"},{key:"4/bqfh63",value:"🚟"},{key:"4/bqfh64",value:"🚠"},{key:"4/bqfh65",value:"🚜"},{key:"4/bqfh66",value:"💈"},{key:"4/bqfh67",value:"🚏"},{key:"4/bqfh68",value:"🎫"},{key:"4/bqfh69",value:"🚦"},{key:"4/bqfh70",value:"🚥"},{key:"4/bqfh71",value:"⚠"},{key:"4/bqfh72",value:"🚧"},{key:"4/bqfh73",value:"🔰"},{key:"4/bqfh74",value:"⛽"},{key:"4/bqfh75",value:"🏮"},{key:"4/bqfh76",value:"🎰"},{key:"4/bqfh77",value:"♨"},{key:"4/bqfh78",value:"🗿"},{key:"4/bqfh79",value:"🎪"},{key:"4/bqfh80",value:"🎭"},{key:"4/bqfh81",value:"📍"},{key:"4/bqfh82",value:"🚩"}]}],fix:".png"}},308:function(module,exports,__webpack_require__){"use strict";function insertOnCursor(e){e&&e.length&&(this.textBox=e,this.setCaret())}var $=__webpack_require__(5),_require=__webpack_require__(17),React=_require.React,render=_require.render,utils=_require.utils,ReactDOM=_require.ReactDOM,Popover=__webpack_require__(173),_require2=__webpack_require__(174),Switch=_require2.Switch,SwitchMenu=_require2.SwitchMenu,SwitchItem=_require2.SwitchItem,Emoji=__webpack_require__(307),Face=React.createClass({displayName:"Face",statics:{create:function(e){var a=e,l=a.insert;e=Object.assign(e,{name:"nj-face-pop",trigger:"click"});var t=Popover.create(e).onShow(function(){var a=this;e.popover=this,e.insert=utils.dom(l),this.setState({template:React.createElement(Face,e)},function(){a.align.set()})});return t.insertEvent=utils.addEventQueue.call(t,"onInsert"),t},replaceFace:function replaceFace(con,faces,replaceImage){var T=this,_con;faces=this._config.themeItems,replaceImage&&(_con=$("<div></div>").html(con));for(var i in faces){var v=faces[i],faceArray=v.item,N,pic,item;for(var j in faceArray)item=faceArray[j],N=i+"_"+item,-1!=con.indexOf("[:"+N+"]")?(pic='<img src="'+v.url+j+v.fix+'" alt="'+item+'" class="nj_face_image" title="'+item+'" />',con=con.replace(eval("/\\[:"+N.replace("(","\\(").replace(")","\\)")+"\\]/g"),pic)):replaceImage&&_con.find("img.nj_face_image").each(function(){$(this).replaceWith("<span>[:"+N+"]</span>")})}return replaceImage?_con.text():con},config:function(e){return $.extend(!0,this._config,e)},_config:{themeItems:{default:{name:"默认表情",url:"/",item:{0:"微笑",1:"撇嘴",2:"色",3:"发呆",4:"得意",5:"流泪",6:"害羞",7:"闭嘴",8:"睡",9:"大哭",10:"尴尬",11:"发怒",12:"调皮",13:"龇牙",14:"惊讶",15:"难过",16:"酷",17:"冷汗",18:"抓狂",19:"吐",20:"偷笑",21:"可爱",22:"白眼",23:"傲慢",24:"饥饿",25:"困",26:"惊恐",27:"流汗",28:"憨笑",29:"大兵",30:"奋斗",31:"咒骂",32:"疑问",33:"嘘",34:"晕",35:"折磨",36:"衰",37:"骷髅",38:"敲打",39:"再见",40:"擦汗",41:"抠鼻",42:"鼓掌",43:"糗大了",44:"坏笑",45:"左哼哼",46:"右哼哼",47:"哈欠",48:"鄙视",49:"委屈",50:"快哭了",51:"阴险",52:"亲亲",53:"吓",54:"可怜"},fix:".gif"}}}},getDefaultProps:function(){return{}},getInitialState:function(){var e=Object.assign({faces:[],themes:["default"]},this.constructor._config);e.themes=[].concat(e.themes);var a=e.themes.indexOf("emoji");a>-1&&(e.themes.splice(a,1),e.hasEmoji=!0);var l=e.themes,t=e.themeItems,u=e.faces;return l.forEach(function(e){var a=t[e];a&&(a.id=e,u.push(a))}),e.faces=u,e},componentDidMount:function(){var e=this,a=this.state,l=a.faces,t=a.hasEmoji,u=this.refs,h=u.tab,f=u.emojiTab;t&&(f.state.listinit={},f.onChange(function(a){e.loadEmoji(a)}),l.length?h.onChange(function(a){a==l.length&&e.loadEmoji(0)}):this.loadEmoji(0))},loadEmoji:function(e){var a=this,l=this.refs.emojiTab;if(!l.state.listinit[e]){var t=(Emoji.base,Emoji.data),u=(Emoji.fix,t[e]),h=$(ReactDOM.findDOMNode(l)).find(".nj-switch-item")[e],f=function(e){return React.createElement("ul",{className:"pack clearfix"},u.items.map(function(e,l){return React.createElement("li",{key:e.key+e.value+l,onClick:a.insertTo.bind(a,e.value,"emoji"),title:e.title},e.value)}))};render(React.createElement(f,null),h),l.state.listinit[e]=!0}},insertTo:function(e,a){var l=this.props,t=l.insert,u=l.popover;new insertOnCursor(t).insertAtCaret(e),t.focus();var h=this.refs.tab,f={theme:this.state.themes[h.state.index],text:e,content:Face.replaceFace(e)},v=t[0].$handle;v&&(v.state.value=t.val()),u.setDisplay(!1),u.insertEvent.complete(f)},render:function(){var e=this,a=this.state,l=a.faces,t=a.hasEmoji,u=(Emoji.base,Emoji.data);Emoji.fix;return React.createElement(Switch,{ref:"tab",className:"tab"},React.createElement("ul",{className:"nj-switch-menus clearfix"},l.map(function(e,a){return React.createElement(SwitchMenu,{key:a},React.createElement("span",null,e.name))}),t?React.createElement(SwitchMenu,null,"Emoji"):null),React.createElement("div",{className:"face-wrap"},l.map(function(a,l){return React.createElement(SwitchItem,{key:l},React.createElement("ul",{className:"pack clearfix face-"+a.id},function(){var l=[],t=a.item;for(var u in t)l.push(React.createElement("li",{key:u,onClick:e.insertTo.bind(e,"[:"+a.id+"_"+t[u]+"]")},React.createElement("img",{src:a.url+u+a.fix,title:t[u]})));return l}()))})),t?React.createElement(SwitchItem,null,React.createElement(Switch,{className:"emoji-tab clearfix font-emoji",ref:"emojiTab"},React.createElement("ul",{className:"_menu clearfix"},u.map(function(e){return React.createElement("li",{key:"t"+e.name},React.createElement(SwitchMenu,null,e.name))})),React.createElement("div",{className:"_body"},u.map(function(e){return React.createElement(SwitchItem,{key:e.name})})))):null)}});insertOnCursor.prototype={setCaret:function(){if(document.selection){var e=this;e.textBox.on("click select keyup",function(){e.textBox[0].caretPos=document.selection.createRange().duplicate()})}},insertAtCaret:function(e){if(this.textBox&&this.textBox.length){var a=this.textBox[0];if(document.all&&a.createTextRange&&a.caretPos){var l=a.caretPos;l.text=""==l.text.charAt(l.text.length-1)?e+"":e}else if(a.setSelectionRange){var t=a.selectionStart,u=a.selectionEnd,h=a.value.substring(0,t),f=a.value.substring(u);a.value=h+e+f;var v=e.length;a.setSelectionRange(t+v,t+v)}else a.value+=e}},unselectContents:function(){window.getSelection?window.getSelection().removeAllRanges():document.selection&&document.selection.empty()},selectContents:function(){this.textBox.each(function(e){var a,l,t,u,h=this;(t=h.ownerDocument)&&(u=t.defaultView)&&void 0!==u.getSelection&&void 0!==t.createRange&&(a=window.getSelection())&&void 0!==a.removeAllRanges?(l=t.createRange(),l.selectNode(h),0==e&&a.removeAllRanges(),a.addRange(l)):document.body&&void 0!==document.body.createTextRange&&(l=document.body.createTextRange())&&(l.moveToElementText(h),l.select())})}},Face.insertOnCursor=insertOnCursor,module.exports=Face},88:function(e,a,l){"use strict";function t(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(a,"__esModule",{value:!0}),a.onLeave=a.init=void 0;var u=l(5),h=t(u),f=l(17),v=l(46),y=l(79),b=l(308),k=t(b),q=l(303),i=t(q);v.Form.addAsyncRule("checkname",function(e,a){var l=this;setTimeout(function(e){l.props.name;l.setValid(!0)},500)},"账号检测中……");var n=(a.init=function(e){var a=(e.id,e.url);(0,f.render)(f.React.createElement(n,{url:a}),document.getElementById("demo-nav")),v.Form.startOne("verify"),i.default.start(),k.default.config({themes:[]}),k.default.create({nearby:"addFace",insert:(0,h.default)('textarea[name="comment"]')});var l=v.Form.getByHandle("verify-input-group");l&&l.onSubmit(function(e){e.preventDefault(),alert("通过")});var t={data:[{id:2,name:"Mask"},{id:21,name:"Mask1",parentid:2},{id:3,name:"Popup"},{id:5,name:"Tree"}]};(0,f.render)(f.React.createElement(y.LinkTree,t),document.getElementById("linkTree"))},a.onLeave=function(e){console.log(e)},f.React.createClass({displayName:"Nav",getDefaultProps:function(){return{items:[{text:"nj-form",url:"form/normal.html"},{text:"React Component",url:"form/component.html"},{text:"InputGroup",url:"form/input-group.html"}]}},render:function(){var e=this.props,a=e.items,l=e.url;return f.React.createElement("div",null,f.React.createElement("a",{href:"form/form",className:"back"},"<<返回"),a.map(function(e){return f.React.createElement("a",{href:e.url,className:e.url==l?"current":"",key:e.url},e.text)}))}}))}});