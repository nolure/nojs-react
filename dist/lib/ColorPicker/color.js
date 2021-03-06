'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _nojsReact = require('../nojs-react');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var doc = (0, _jquery2.default)(document);

var Color = function (_React$Component) {
    _inherits(Color, _React$Component);

    function Color(props) {
        _classCallCheck(this, Color);

        var _this = _possibleConstructorReturn(this, (Color.__proto__ || Object.getPrototypeOf(Color)).call(this, props));

        var data = _this.props.data;

        _this.state = {
            hue: 'rgb(255, 0, 0)', //色相对应的颜色
            pos: {},
            data: Object.assign({
                h: 0,
                s: 0,
                b: 100,
                R: 255,
                G: 255,
                B: 255,
                color: 'ffffff'
            }, data)
        };
        var dataType = 'hsb';
        if (data.color) {
            dataType = 'color';
        } else if (data.R) {
            dataType = 'rgb';
        }
        _this.update(dataType, true);
        return _this;
    }

    _createClass(Color, [{
        key: 'startChoose',
        value: function startChoose(ref, e) {
            var _this2 = this;

            this.moveHandle(ref, e);
            doc.on('mousemove.color', function (e) {
                _this2.moveHandle(ref, e);
            }).on('mouseup.color', function (e) {
                doc.off('mousemove.color mouseup.color');
            });
        }
    }, {
        key: 'moveHandle',
        value: function moveHandle(ref, e) {
            var data = this.state.data;

            var target = (0, _jquery2.default)(this.refs[ref]);
            var S = ref == 'mask',
                mouse = { //鼠标位置
                x: e.clientX,
                y: e.clientY
            },
                top = mouse.y + (0, _jquery2.default)(window).scrollTop() - target.offset().top;

            top = top < 0 ? 0 : top;
            top = top > 255 ? 255 : top;

            if (S) {
                data.b = 100 - top * 100 / 255; //亮度
                var left = mouse.x + (0, _jquery2.default)(window).scrollLeft() - target.offset().left;
                left = left < 0 ? 0 : left;
                left = left > 255 ? 255 : left;
                data.s = left * 100 / 255; //饱和度
            } else {
                data.h = 360 - top * 360 / 255;
                // if( data.h )
                var maxHue = this.state.maxHue = data.h >= 360; //最大最小 色相显示值均为0 用maxHue区分
                data.h = maxHue ? 0 : data.h; //色相
            }
            e.preventDefault();

            this.update('hsb');
        }
    }, {
        key: 'update',
        value: function update(changeType, reset) {
            var onChange = this.props.onChange;
            var _state = this.state,
                data = _state.data,
                pos = _state.pos;
            var _data = data,
                h = _data.h,
                s = _data.s,
                b = _data.b,
                R = _data.R,
                G = _data.G,
                B = _data.B,
                color = _data.color;

            if (changeType == 'hsb') {
                var RGB = (0, _utils.HsbToRgb)(h, s, b);
                R = RGB.R;
                G = RGB.G;
                B = RGB.B;
            } else if (changeType == 'rgb') {
                var _RgbToHsb = (0, _utils.RgbToHsb)(R, G, B),
                    h = _RgbToHsb.H,
                    s = _RgbToHsb.S,
                    b = _RgbToHsb.B;
            } else {
                //change hex
                var Color = (0, _utils.HexToRgb)(color);
                if (typeof Color == 'string' || color.length < 6) {
                    this.setState({ data: data });
                    return;
                }
                var R = Color.R,
                    G = Color.G,
                    B = Color.B;

                var _RgbToHsb2 = (0, _utils.RgbToHsb)(R, G, B),
                    h = _RgbToHsb2.H,
                    s = _RgbToHsb2.S,
                    b = _RgbToHsb2.B;
            }
            data = {
                h: Math.round(h),
                s: Math.round(s),
                b: Math.round(b),
                color: (0, _utils.RgbToHex)(R, G, B).toUpperCase(), //16进制的颜色值
                R: Math.round(R),
                G: Math.round(G),
                B: Math.round(B)
            };

            var rgb = (0, _utils.HsbToRgb)(h, 100, 100);
            this.state.hue = 'rgb(' + Math.round(rgb.R) + ', ' + Math.round(rgb.G) + ', ' + Math.round(rgb.B) + ')';

            if (reset) {
                this.state.maxHue = !h;
            }

            this.getPos(data);

            if (reset) {
                this.state.data = data;
            } else {
                onChange && onChange(data);
                this.setState({ data: data });
            }
        }
    }, {
        key: 'getPos',
        value: function getPos(data) {
            var _state2 = this.state,
                maxHue = _state2.maxHue,
                pos = _state2.pos;
            var h = data.h,
                s = data.s,
                b = data.b;


            pos.roll_top = maxHue ? -3 : (360 - h) / 360 * 255 - 3; //roll top 反比
            pos.left = s * 255 / 100 - 6; //mask left 正比
            pos.top = (100 - b) * 255 / 100 - 6; //mask top反比
        }
    }, {
        key: 'changeHandle',
        value: function changeHandle(key, e) {
            var data = this.state.data;

            var v = e.target.value;

            this.state.maxHue = false;

            if (key == 'color') {
                //change 'hex'
                data[key] = v;
                this.update(key);
                return;
            }

            v = parseInt(v);
            v = isNaN(v) ? data[key] : v;

            if (key.toLowerCase() != key) {
                //change RGB
                v = v < 0 || v > 255 ? data[key] : v;
                data[key] = v;
                this.update('rgb');
            } else {
                //change hsb
                if (key == 'h') {
                    v = v < 0 || v > 359 ? data[key] : v;
                } else {
                    v = v < 0 || v > 100 ? data[key] : v;
                }
                data[key] = v;
                this.update('hsb');
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                onSubmit = _props.onSubmit,
                onCancel = _props.onCancel;
            var _state3 = this.state,
                hue = _state3.hue,
                data = _state3.data,
                pos = _state3.pos;


            return _nojsReact.React.createElement(
                'div',
                { className: 'color-picker-box clearfix' },
                _nojsReact.React.createElement(
                    'div',
                    { className: 'mask', ref: 'mask', style: { background: hue }, onMouseDown: this.startChoose.bind(this, 'mask') },
                    _nojsReact.React.createElement('div', { className: 'b' }),
                    _nojsReact.React.createElement('div', { className: 'c', style: { top: pos.top, left: pos.left } })
                ),
                _nojsReact.React.createElement(
                    'div',
                    { className: 'roll', ref: 'roll', onMouseDown: this.startChoose.bind(this, 'roll') },
                    _nojsReact.React.createElement('div', { className: 'c', style: { top: pos.roll_top } })
                ),
                _nojsReact.React.createElement(
                    'div',
                    { className: 'r' },
                    _nojsReact.React.createElement(
                        'span',
                        { className: 'preview' },
                        _nojsReact.React.createElement('i', { style: { background: '#' + data.color } }),
                        '\u989C\u8272'
                    ),
                    _nojsReact.React.createElement(
                        'dl',
                        null,
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'H\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'h'), value: data.h }),
                            '\u5EA6'
                        ),
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'S\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 's'), value: data.s }),
                            '%'
                        ),
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'B\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'b'), value: data.b }),
                            '%'
                        )
                    ),
                    _nojsReact.React.createElement(
                        'dl',
                        null,
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'R\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'R'), value: data.R })
                        ),
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'G\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'G'), value: data.G })
                        ),
                        _nojsReact.React.createElement(
                            'dd',
                            null,
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                'B\uFF1A'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'B'), value: data.B })
                        ),
                        _nojsReact.React.createElement(
                            'dd',
                            { className: 'color' },
                            _nojsReact.React.createElement(
                                'label',
                                null,
                                '#'
                            ),
                            _nojsReact.React.createElement('input', { onChange: this.changeHandle.bind(this, 'color'), value: data.color })
                        )
                    ),
                    _nojsReact.React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return onSubmit(data, e);
                            }, className: 'nj-button nj-button-red nj-button-small ok' },
                        '\u786E\u5B9A'
                    ),
                    _nojsReact.React.createElement(
                        'button',
                        { onClick: function onClick(e) {
                                return onCancel(data, e);
                            }, className: 'nj-button nj-button-small close' },
                        '\u53D6\u6D88'
                    )
                )
            );
        }
    }]);

    return Color;
}(_nojsReact.React.Component);

exports.default = Color;