webpackJsonp([6],{137:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.onLeave=t.init=void 0;var n=r(19),a=r(53),o=r(84);a.Form.addAsyncRule("checkname",function(e,t){var r=this;setTimeout(function(e){r.props.name;console.log(t),r.setValid(!1,{errortext:"账号已存在"})},500)},"账号检测中……");var m=(t.init=function(e){var t=(e.id,e.url);(0,n.render)(n.React.createElement(m,{url:t}),document.getElementById("demo-nav")),a.Form.start(),a.Form.startOne("verify");var r=a.Form.getByHandle("verify-input-group");r&&r.onSubmit(function(e){e.preventDefault(),alert("通过")});var u={data:[{id:2,name:"Mask"},{id:21,name:"Mask1",parentid:2},{id:3,name:"Popup"},{id:5,name:"Tree"}]};(0,n.render)(n.React.createElement(o.LinkTree,u),document.getElementById("linkTree"))},t.onLeave=function(e){console.log(e)},n.React.createClass({displayName:"Nav",getDefaultProps:function(){return{items:[{text:"nj-form",url:"form/normal.html"},{text:"React Component",url:"form/component.html"},{text:"InputGroup",url:"form/input-group.html"}]}},render:function(){var e=this.props,t=e.items,r=e.url;return n.React.createElement("div",null,n.React.createElement("a",{href:"form/form",className:"back"},"<<返回"),t.map(function(e){return n.React.createElement("a",{href:e.url,className:e.url==r?"current":"",key:e.url},e.text)}))}}))}});