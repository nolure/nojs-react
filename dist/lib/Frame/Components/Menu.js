'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = require('react-router');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _tree = require('nj/tree');

var _tree2 = _interopRequireDefault(_tree);

var _nojsReact = require('../../nojs-react');

var _nojsReact2 = _interopRequireDefault(_nojsReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = function (_React$Component) {
    _inherits(Menu, _React$Component);

    function Menu() {
        _classCallCheck(this, Menu);

        return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).apply(this, arguments));
    }

    _createClass(Menu, [{
        key: 'changeHandle',
        value: function changeHandle(node, e) {
            if (!node.link) {
                e.preventDefault();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var tree = this.refs[this.props.menuVisible ? 'tree' : 'menu'];
            var _props2 = this.props,
                onReady = _props2.onReady,
                parentSelect = _props2.parentSelect;
            //组件渲染完毕后 向外传递格式化后的节点数据

            onReady && onReady(tree.state.dataFormat.databyid);

            // if( !parentSelect ){//不允许父节点选中 点击展开
            tree.onChange(function (node, e) {
                if (node.children.length && !node.link) {
                    // if ( node.open && node.link ){
                    //     return
                    // }
                    e.preventDefault();
                    tree.toggle(node);
                }
            });
            // }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            //通过props.defaultNode来更新当前选中节点
            var _refs = this.refs,
                tree = _refs.tree,
                menu = _refs.menu;
            var defaultNode = nextProps.defaultNode;


            var treeDefaultNode = tree.state.dataFormat.databyid[defaultNode];
            treeDefaultNode && tree.select(treeDefaultNode);
            var menuDefaultNode = menu.state.dataFormat.databyid[defaultNode];
            menuDefaultNode && menu.select(menuDefaultNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props,
                defaultNode = _props3.defaultNode,
                menu = _props3.menu,
                sidebar = _props3.sidebar,
                parentSelect = _props3.parentSelect,
                menuVisible = _props3.menuVisible;

            var _props = {
                data: menu,
                onChange: this.changeHandle.bind(this),
                defaultNode: defaultNode,
                //使用Link组件更新路由 css控制Link覆盖文字之上
                defineName: function defineName(item) {
                    var allowSelect = item.link;
                    if (item.children.length && !parentSelect) {
                        //不允许父节点选中
                        allowSelect = false;
                    }
                    return _nojsReact.React.createElement(
                        'span',
                        null,
                        allowSelect ? _nojsReact.React.createElement(_reactRouter.Link, { to: '/id/' + item.id }) : null,
                        ' ',
                        item.name
                    );
                }
            };
            var tree = _nojsReact.React.createElement(
                'span',
                null,
                _nojsReact.React.createElement(
                    'div',
                    { className: _nojsReact.utils.joinClass('nj-tree', 'nj-max-tree', !menuVisible && 'd_hide') },
                    _nojsReact.React.createElement(_tree2.default, _extends({}, _props, { ref: 'tree' }))
                ),
                _nojsReact.React.createElement(
                    'div',
                    { className: _nojsReact.utils.joinClass('nj-tree', 'nj-menu-tree', menuVisible && 'd_hide') },
                    _nojsReact.React.createElement(_tree2.default, _extends({}, _props, { ref: 'menu', style: 'menu' }))
                )
            );

            if (typeof sidebar == 'function') {
                tree = sidebar(tree);
            }
            return _nojsReact.React.createElement(
                'div',
                { className: 'grid-menu' },
                _nojsReact.React.createElement(
                    'div',
                    { className: 'grid-inner' },
                    tree
                )
            );
        }
    }]);

    return Menu;
}(_nojsReact.React.Component);

module.exports = Menu;