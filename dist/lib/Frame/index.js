'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _Container = require('./Components/Container');

var _Container2 = _interopRequireDefault(_Container);

var _Content = require('./Components/Content');

var _Content2 = _interopRequireDefault(_Content);

require('../../../css/frame.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_React$Component) {
    _inherits(Root, _React$Component);

    function Root() {
        _classCallCheck(this, Root);

        return _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
    }

    _createClass(Root, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.options = {};
        }
        //对外提供go方法

    }, {
        key: 'go',
        value: function go(params, options) {
            var menu = this.props.menu;
            var routers = this.refs.routers;
            var state = routers.state,
                router = routers.router;
            //如果url与另一个节点的link匹配 则直接跳都那个node

            if (params.url && !params.id) {
                var node_url = menu.filter(function (n) {
                    return n.link == params.url || n.link == location.origin + params.url;
                });
                if (node_url.length > 1) {
                    //多个节点匹配的话 优先选择和当前选中id相同的
                    node_url = node_url.filter(function (n) {
                        return n.id == state.params.id;
                    })[0] || node_url[0];
                } else {
                    node_url = node_url[0];
                }
                if (node_url) {
                    params.url = null;
                    params.id = node_url.id;
                }
            }
            this.options = options || {};
            var url = this.constructor.parse(params, state.params);
            router.push(url);
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var _constructor$config_r = this.constructor.config_route,
                config_route = _constructor$config_r === undefined ? '' : _constructor$config_r;

            return _react2.default.createElement(
                _reactRouter.Router,
                { history: _reactRouter.hashHistory, ref: 'routers' },
                _react2.default.createElement(
                    _reactRouter.Route,
                    { path: '/', component: _Container2.default, props: Object.assign({ root: this }, props) },
                    props.defaultNode ? _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/id/' + props.defaultNode }) : null,
                    _react2.default.createElement(_reactRouter.Route, { path: '/id/:id(/url/:url)' + config_route, component: _Content2.default, onLeave: _Content2.default.onLeave })
                )
            );
        }
    }], [{
        key: 'config',
        value: function config() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            //options.route 添加自定义可选路由 Array
            var route = options.route;

            this.config_routeKeys = route;
            this.config_route = Array.isArray(route) && route.map(function (item) {
                return '(/' + item + '/:' + item + ')';
            }).join('');
        }
    }, {
        key: 'parse',
        value: function parse(params, oldParams) {
            var routeKeys = ['id', 'url'].concat(this.config_routeKeys);
            var keys = Object.keys(params);
            return routeKeys.map(function (key) {
                if (params[key] == null && keys.indexOf(key) >= 0) {
                    //清除此key
                    return;
                }
                var v = params[key] || oldParams[key];
                return v && '/' + key + '/' + encodeURIComponent(v);
            }).filter(function (k) {
                return !!k;
            }).join('');
        }
    }]);

    return Root;
}(_react2.default.Component);

module.exports = Root;