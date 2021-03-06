'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Switch组件
                                                                                                                                                                                                                                                                   */


var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _nojsReact = require('./nojs-react');

var _nojsReact2 = _interopRequireDefault(_nojsReact);

var _directiveComponent = require('../mixins/directiveComponent');

var _directiveComponent2 = _interopRequireDefault(_directiveComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Switch = _nojsReact.React.createClass({
    displayName: 'Switch',

    mixins: [_nojsReact.mixins.childComponents.config],
    getInitialState: function getInitialState() {
        return { index: this.props.index || 0, trigger: this.props.trigger || 'click' };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        directive.getChildComponents(this);

        //自动切换
        var interval = this.props.interval;
        interval && window.setInterval(function () {
            _this.change(++_this.state.index);
        }, interval);

        this.changeEvent = _nojsReact2.default.utils.addEventQueue.call(this, 'onChange'); //.add(this.props.onChange)

        this.readyEvent = _nojsReact2.default.utils.addEventQueue.call(this, 'onReady');
        setTimeout(function (e) {
            return _this.readyEvent.complete();
        }, 1);
    },
    change: function change(index, e) {
        var length = this.state.length;
        index = index < 0 ? length - 1 : index;
        index = index >= length ? 0 : index;
        this.state.index = index;
        this.setState({ index: index });

        this.state.childComponents.forEach(function (c) {
            c.forceUpdate();
        });
        this.changeEvent.complete(index, e);
    },
    render: function render() {
        var className = _nojsReact2.default.utils.joinClass('nj-switch', this.props.className);
        return _nojsReact.React.createElement(
            'div',
            _extends({}, this.props, { className: className }),
            this.props.children
        );
    }
});

var SwitchMenu = _nojsReact.React.createClass({
    displayName: 'SwitchMenu',

    mixins: [_nojsReact.mixins.childComponents.setParents([Switch], 1)],
    componentDidMount: function componentDidMount() {
        directive.getChildComponents(this);
    },
    render: function render() {
        var parentComponent = this.state.parentComponent;
        var index = parentComponent.state.index;
        var className = _nojsReact2.default.utils.joinClass('nj-switch-menu', index == this.state.index && 'nj-switch-menu-active');

        var options = { className: className };

        var trigger = parentComponent.state.trigger;
        var eventType = trigger == 'hover' ? 'onMouseEnter' : 'onClick';
        //调用父组件的change方法
        options[eventType] = parentComponent.change.bind(parentComponent, this.state.index);

        options = Object.assign({}, this.props, options);

        return _nojsReact.React.createElement(
            'div',
            options,
            this.props.children
        );
    }
});

var SwitchItem = _nojsReact.React.createClass({
    displayName: 'SwitchItem',

    mixins: [_nojsReact.mixins.childComponents.setParents([Switch], 1)],
    componentDidMount: function componentDidMount() {
        directive.getChildComponents(this);
        //以SwitchItem的数量来更新Switch组件的切换子项个数
        this.state.parentComponent.state.length = this.state.index + 1;
    },
    render: function render() {
        var index = this.state.parentComponent.state.index;
        var className = _nojsReact2.default.utils.joinClass('nj-switch-item', index == this.state.index ? 'nj-switch-item-active' : 'd_hide');
        return _nojsReact.React.createElement(
            'div',
            _extends({}, this.props, { className: className }),
            this.props.children
        );
    }
});

var directive = new _directiveComponent2.default({
    elementGroups: {
        'switch': { children: ['switch-menu', 'switch-item'], component: Switch },
        'switch-menu': { component: SwitchMenu },
        'switch-item': { component: SwitchItem }
    },
    exports: exports
});
// directive.start()