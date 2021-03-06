'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _ = require('../../');

var _2 = _interopRequireDefault(_);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Topbar = require('./Topbar');

var _Topbar2 = _interopRequireDefault(_Topbar);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var localStorage = _.utils.localStorage,
    joinClass = _.utils.joinClass;

var menuVisible = 'menu_visible';

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

        _this.state = {
            menuVisible: _this.setVisible(),
            topbarItems: [{ content: _.React.createElement('i', { className: 'nj-icon nj-icon-menu' }), type: 'button', handle: _this.toggleMenu.bind(_this), align: 'left' }, { content: _.React.createElement('i', { className: 'nj-icon nj-icon-back' }), type: 'button', handle: function handle(e) {
                    return _this.context.router.goBack();
                }, align: 'left' }]
        };
        return _this;
    }

    _createClass(Container, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var self = this;

            var _props$routes = _slicedToArray(this.props.routes, 1),
                rootProps = _props$routes[0].props;

            var menu = rootProps.menu,
                root = rootProps.root;

            root.tree = this.refs.menu.refs.tree;

            (0, _jquery2.default)(document).delegate('div.grid-main a, div.grid-topbar a', 'click', function (e) {
                var target = this.target;
                if (!target && !e.isDefaultPrevented()) {
                    //如果之前添加了preventDefault 这里不再跳转
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    if (!href) {
                        return;
                    }
                    var _self$props$params = self.props.params,
                        id = _self$props$params.id,
                        url = _self$props$params.url;

                    //如果url与另一个节点的link匹配 则直接跳都那个node

                    var node_url = menu.filter(function (n) {
                        return n.link == href && n.id != id;
                    })[0];
                    if (node_url) {
                        self.context.router.push('/id/' + node_url.id);
                    } else {
                        self.context.router.push('/id/' + id + '/url/' + encodeURIComponent(href));
                    }
                }
            });
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(e) {
            this.setState({ menuVisible: this.setVisible(true) });
            e.preventDefault();
        }
    }, {
        key: 'setVisible',
        value: function setVisible(turn) {
            var visible = localStorage.get(menuVisible) || true;
            visible = visible ? JSON.parse(visible) : visible;
            visible = turn ? !visible : visible;
            localStorage.set(menuVisible, visible);
            return visible;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$routes2 = _slicedToArray(_props.routes, 1),
                rootProps = _props$routes2[0].props,
                location = _props.location; //this.props.routes[0].props


            var menu = rootProps.menu,
                sidebar = rootProps.sidebar,
                _rootProps$showTopbar = rootProps.showTopbar,
                showTopbar = _rootProps$showTopbar === undefined ? true : _rootProps$showTopbar,
                _rootProps$topbarItem = rootProps.topbarItems,
                topbarItems = _rootProps$topbarItem === undefined ? [] : _rootProps$topbarItem,
                style = rootProps.style,
                root = rootProps.root,
                parentSelect = rootProps.parentSelect;
            var menuVisible = this.state.menuVisible;
            var _props2 = this.props,
                children = _props2.children,
                params = _props2.params;

            var _children = children && _.React.cloneElement(children, { parent: this, root: root });

            var path = location.pathname;
            var node = menu.filter(function (item) {
                return item.link && '/' + item.link == path;
            })[0];
            // console.log(0, path, node)//.location.pathname

            var className = joinClass('app-container', !menuVisible && 'hide-menu', showTopbar && 'show-topbar', style && 'app-style' + style);
            return _.React.createElement(
                'div',
                { className: className },
                _.React.createElement(_Menu2.default, { node: node, menu: menu, sidebar: sidebar, ref: 'menu', parentSelect: parentSelect }),
                showTopbar ? _.React.createElement(_Topbar2.default, { items: this.state.topbarItems.concat(topbarItems) }) : null,
                _children
            );
        }
    }]);

    return Container;
}(_.React.Component);

Container.contextTypes = {
    router: _propTypes2.default.object
};

module.exports = Container;