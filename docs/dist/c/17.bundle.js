webpackJsonp([17],{87:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(5),i=(r(u),n(17)),p=(r(i),n(46));t.init=function(){var e='\n        13123 <p style="color:red">123</p>\n        <p ><span style="color:red">123</span></p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n        <p style="color:red">123</p>\n    ',t=function(t){function n(t){o(this,n);var r=l(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,t));return r.state={html:e},r}return c(n,t),a(n,[{key:"render",value:function(){var t=this,n=this.state.html;return i.React.createElement(p.Form,{onSubmit:function(e){e.preventDefault(),console.log(1)}},i.React.createElement(p.Input,{type:"editor",className:"text",required:!0,"nj-minlength":"5",name:"content",defaultValue:e,onChange:function(e){return t.setState({html:e})}}),i.React.createElement("button",null,"submit"),i.React.createElement("div",{className:"ql-editor",dangerouslySetInnerHTML:{__html:n}}))}}]),n}(i.React.Component);(0,i.render)(i.React.createElement(t,null),document.getElementById("rootEditor"))}}});