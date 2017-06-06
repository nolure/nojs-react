'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nojsReact = require('../nojs-react');

var _utils = require('./utils');

require('../../../css/datepicker.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var dateParse = _nojsReact.utils.dateParse;
var joinClass = _nojsReact.utils.joinClass;

var Datetime = function (_React$Component) {
    _inherits(Datetime, _React$Component);

    function Datetime(props) {
        _classCallCheck(this, Datetime);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Datetime).call(this, props));

        var _this$props = _this.props;
        var value = _this$props.value;
        var min = _this$props.min;
        var max = _this$props.max;
        var months = _this$props.months;
        var mode = _this$props.mode;
        var format = _this$props.format;
        var weeks = _this$props.weeks;
        var startWeekIndex = _this$props.startWeekIndex;

        min = min && (0, _utils.getMonthData)(min, { startWeekIndex: startWeekIndex });
        max = max && (0, _utils.getMonthData)(max, { startWeekIndex: startWeekIndex });

        var hasDate = /^date/.test(mode); //允许选择日期
        var hasTime = /time$/.test(mode); //允许选择时间

        var currentMonth = void 0;
        if (mode == 'time') {
            var _times = value.match(/\b\d+\b/g) || [0, 0];
            currentMonth = [Object.assign({ hours: parseInt(_times[0]), minutes: parseInt(_times[1]) }, _utils.today)];
        } else {
            var startMonth = min && !value ? { year: min.year, month: min.month } : value;
            currentMonth = _this.getMonthGroups(startMonth);
        }

        if (min) {
            min = {
                date: (0, _utils.getTimestamp)(min),
                hours: (0, _utils.getTimestamp)(min, 4),
                minutes: (0, _utils.getTimestamp)(min, 5)
            };
        }
        if (max) {
            max = {
                date: (0, _utils.getTimestamp)(max),
                hours: (0, _utils.getTimestamp)(max, 4),
                minutes: (0, _utils.getTimestamp)(max, 5)
            };
        }

        //设置默认format
        var _format = format;
        if (!format) {
            switch (mode) {
                case 'date':
                    _format = 'yy-mm-dd';
                    break;
                case 'time':
                    _format = 'hh:mm:ss';
                    break;
                default:
                    _format = 'yy-mm-dd hh:mm:ss';
            }
        }

        //根据startWeekIndex来重新排序星期显示
        var _weeks = [].concat(weeks);
        if (startWeekIndex > 0) {
            for (var i = 0; i < startWeekIndex; i++) {
                _weeks.push(_weeks.shift());
            }
        }

        var _currentMonth$ = currentMonth[0];
        var year = _currentMonth$.year;
        var month = _currentMonth$.month;
        var date = _currentMonth$.date;
        var hours = _currentMonth$.hours;
        var minutes = _currentMonth$.minutes;

        var day = date && new Date(year, month - 1, date).getDay();

        _this.state = {
            currentMonth: currentMonth,
            value: value, min: min, max: max,
            hours: hours, minutes: minutes,
            format: _format,
            weeks: _weeks,
            hasDate: hasDate, hasTime: hasTime,
            //当前所选 默认今天 {year, month, date}
            currentDate: mode == 'time' ? _utils.today : value && { year: year, month: month, date: date, day: day },
            hoursItems: Array.prototype.concat.apply([], new Array(24)),
            minutesItems: Array.prototype.concat.apply([], new Array(60))
        };
        return _this;
    }

    _createClass(Datetime, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props;
            var months = _props.months;
            var onReady = _props.onReady;
            var _refs = this.refs;
            var group = _refs.group;
            var groups = _refs.groups;


            onReady && onReady.call(this);

            if (!groups) {
                return;
            }
            var groupsWidth = months * group.offsetWidth;
            var groupHeight = group.offsetHeight;
            groups.style.width = groupsWidth + 'px';
            groups.style.height = groupHeight + 'px';
        }
    }, {
        key: 'getMonthGroups',
        value: function getMonthGroups(startMonth) {
            var startWeekIndex = this.props.startWeekIndex;

            var currentMonth = [(0, _utils.getMonthData)(startMonth, { startWeekIndex: startWeekIndex })];
            for (var i = 1; i < this.props.months; i++) {
                var nowMonth = currentMonth[i - 1];
                var nextMonth = (0, _utils.getNearMonth)({
                    year: nowMonth.year,
                    month: nowMonth.month,
                    step: 1
                });
                currentMonth.push((0, _utils.getMonthData)(nextMonth, { startWeekIndex: startWeekIndex }));
            }
            return currentMonth;
        }
        //跳转月份

    }, {
        key: 'jumpTo',
        value: function jumpTo(step) {
            var _this2 = this;

            var _state = this.state;
            var _currentMonth = _state.currentMonth;
            var animated = _state.animated;
            var nextMonths = _state.nextMonths;

            //未完成的动画

            if (animated) {
                this.state.animated = clearTimeout(animated);
                _currentMonth = nextMonths || _currentMonth;
            }

            var _currentMonth$2 = _currentMonth[0];
            var year = _currentMonth$2.year;
            var month = _currentMonth$2.month;

            var startMonth = (0, _utils.getNearMonth)({ year: year, month: month, step: step });
            nextMonths = this.getMonthGroups(startMonth);

            if (this.props.disableAnimation) {
                this.setState({ currentMonth: nextMonths });
                return;
            }

            var currentMonth = step > 0 ? _currentMonth.concat(nextMonths) : nextMonths.concat(_currentMonth);

            this.setState({
                //保留了之前的数据
                currentMonth: currentMonth,
                //真实的月份
                nextMonths: nextMonths,
                // animate:true,
                //step>0月份增加 动画方向向左
                direction: step > 0 ? 'left' : 'right'
            });

            setTimeout(function (e) {
                _this2.setState({ animate: true });
            }, 10);

            //动画完毕后还原数据
            this.state.animated = setTimeout(function (e) {
                _this2.setState({
                    currentMonth: _this2.state.nextMonths,
                    nextMonths: null,
                    direction: null,
                    animate: null,
                    animated: null
                });
            }, 400);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            // console.log(21, this)
            this.state.animated = clearTimeout(this.state.animated);
        }
    }, {
        key: 'changeDate',
        value: function changeDate(_ref) {
            var _this3 = this;

            var year = _ref.year;
            var month = _ref.month;
            var date = _ref.date;
            var day = _ref.day;
            var current = _ref.current;
            var prevMonth = _ref.prevMonth;
            var _state2 = this.state;
            var hours = _state2.hours;
            var minutes = _state2.minutes;
            var hasDate = _state2.hasDate;
            var hasTime = _state2.hasTime;
            var format = _state2.format;
            var hoursItems = _state2.hoursItems;
            var minutesItems = _state2.minutesItems;
            var min = _state2.min;
            var max = _state2.max;

            if (hasDate && !date) {
                //没有选择天
                return;
            }
            if (!current) {
                //选择的日期是相邻的月份
                this.jumpTo(prevMonth ? -1 : 1);
            }

            var currentDate = { year: year, month: month, date: date, day: day };

            /**
             * 重置时间选择 当设置了min选项时
             * 如 min='2017-05-31 09:00:00' 当选择了下月某天的8点后 再切换到5月31时 时间会自动切到9点
             * 因为这一天9点之前不能被选中
             */
            if ((min || max) && hasTime) {
                hoursItems.map(function (h, i) {
                    var d = Object.assign({}, currentDate, { hours: i });
                    var timestamp = (0, _utils.getTimestamp)(d, 4);
                    var disabled = _this3.checkDisabled(timestamp, 'hours');

                    if (disabled && hours == i) {
                        //当前选中的被禁用
                        hours = undefined;
                    }
                    hoursItems[i] = disabled ? -1 : i;
                });
                var resetHour = void 0;
                if (hours == undefined) {
                    resetHour = true;
                    hours = hoursItems.filter(function (h) {
                        return h >= 0;
                    })[0];
                    this.setState({ hours: hours });
                }

                minutesItems.map(function (h, i) {
                    var d = Object.assign({}, currentDate, { hours: hours, minutes: i });
                    var timestamp = (0, _utils.getTimestamp)(d, 5);
                    var disabled = _this3.checkDisabled(timestamp, 'minutes');

                    if (disabled && minutes == i) {
                        //当前选中的被禁用
                        minutes = undefined;
                    }
                    minutesItems[i] = disabled ? -1 : i;
                });
                // console.log(hours, minutes, resetHour)
                if (minutes == undefined || resetHour) {
                    //当hours重置后 minutes也需重置
                    minutes = minutesItems.filter(function (h) {
                        return h >= 0;
                    })[0];
                    this.setState({ minutes: minutes });
                }
            }

            var value = dateParse({
                date: [year, month, date].join('-') + ' ' + [hours, minutes].join(':'),
                format: format
            });

            this.setState({ currentDate: currentDate, value: value }, function () {
                return _this3.submit();
            });
        }
    }, {
        key: 'submit',
        value: function submit() {
            var onChange = this.props.onChange;
            var _state3 = this.state;
            var hours = _state3.hours;
            var minutes = _state3.minutes;
            var currentDate = _state3.currentDate;
            var value = _state3.value;
            var hasTime = _state3.hasTime;
            var min = _state3.min;
            var max = _state3.max;

            //没有选中日期时 点击确定默认为今天

            if (!currentDate || !value) {
                var todayDisabled = void 0; //检测今天是否可选
                if (min) {
                    todayDisabled = +new Date() < min.minutes;
                }
                if (!todayDisabled && max) {
                    todayDisabled = +new Date() > min.minutes;
                }
                !todayDisabled && this.changeDate(Object.assign({}, _utils.today, {
                    current: true
                }));
                return;
            }
            var data = Object.assign({ hours: hours, minutes: minutes }, currentDate);
            var timestamp = (0, _utils.getTimestamp)(data, 6);
            onChange && onChange.call(this, value, data, timestamp);
        }
    }, {
        key: 'changeTime',
        value: function changeTime(key, e) {
            this.state[key] = parseInt(e.target.value);
            this.changeDate(Object.assign({ current: true }, this.state.currentDate));
        }
    }, {
        key: 'checkDisabled',
        value: function checkDisabled(data, key) {
            var _state4 = this.state;
            var min = _state4.min;
            var max = _state4.max;

            var disabled = void 0;

            if (min) {
                disabled = data < min[key];
            }
            if (!disabled && max) {
                //若min没禁用 再判断max
                disabled = data > max[key];
            }
            return disabled;
        }
    }, {
        key: 'getWeekStr',
        value: function getWeekStr(day) {
            var weeks = this.props.weeks;

            return weeks[day] ? '星期' + weeks[day] : '';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _props2 = this.props;
            var months = _props2.months;
            var mode = _props2.mode;
            var disableAnimation = _props2.disableAnimation;
            var _state5 = this.state;
            var weeks = _state5.weeks;
            var direction = _state5.direction;
            var animate = _state5.animate;
            var hours = _state5.hours;
            var minutes = _state5.minutes;
            var hasDate = _state5.hasDate;
            var hasTime = _state5.hasTime;
            var hoursItems = _state5.hoursItems;
            var minutesItems = _state5.minutesItems;
            var currentMonth = _state5.currentMonth;
            var _state5$currentDate = _state5.currentDate;
            var currentDate = _state5$currentDate === undefined ? {} : _state5$currentDate;

            //检查是否为当前选中日期

            var checkCurrentDate = function checkCurrentDate(item, i) {
                return item.current && item.timestamp == (0, _utils.getTimestamp)(currentDate, 3);
            };

            var weekEl = _nojsReact.React.createElement(
                'ul',
                { className: 'clearfix _weeks' },
                weeks.map(function (item, i) {
                    return _nojsReact.React.createElement(
                        'li',
                        { key: i },
                        item
                    );
                })
            );

            if (hasTime) {
                hoursItems = hoursItems.map(function (h, i) {
                    var disabled = void 0;
                    if (currentDate.date) {
                        var d = Object.assign({}, currentDate, { hours: i });
                        var timestamp = (0, _utils.getTimestamp)(d, 4);
                        disabled = _this4.checkDisabled(timestamp, 'hours');
                    }
                    return _nojsReact.React.createElement(
                        'option',
                        { disabled: disabled, key: i, value: i },
                        (0, _utils.parseNumber)(i)
                    );
                });

                minutesItems = minutesItems.map(function (h, i) {
                    var disabled = void 0;
                    if (currentDate.date) {
                        var d = Object.assign({}, currentDate, { hours: hours, minutes: i });
                        var timestamp = (0, _utils.getTimestamp)(d, 5);
                        disabled = _this4.checkDisabled(timestamp, 'minutes');
                    }
                    return _nojsReact.React.createElement(
                        'option',
                        { disabled: disabled, key: i, value: i },
                        (0, _utils.parseNumber)(i)
                    );
                });
            }

            var dateItem = function dateItem(item, i) {
                var disabled = _this4.checkDisabled(item.timestamp, 'date');
                var className = joinClass('date-item', checkCurrentDate(item, i) && 'active', !item.current && 'gray', disabled && 'disabled', item.isToday && 'today');
                return _nojsReact.React.createElement(
                    'button',
                    { 'data-mode': 'circle', type: 'button', disabled: disabled,
                        key: [item.year, item.month, item.date].join(''),
                        onClick: _this4.changeDate.bind(_this4, item),
                        className: className
                    },
                    _nojsReact.React.createElement(
                        'span',
                        { className: 'date' },
                        item.date
                    )
                );
            };

            var groupItem = function groupItem(item, i) {
                var year = item.year;
                var month = item.month;
                var dates = item.dates;

                return _nojsReact.React.createElement(
                    'div',
                    { className: '_group', key: [year, month, i].join('-'), ref: 'group' },
                    _nojsReact.React.createElement(
                        'div',
                        { className: '_head clearfix', key: '_head' },
                        year,
                        '\u5E74 ',
                        (0, _utils.parseNumber)(month),
                        '\u6708'
                    ),
                    weekEl,
                    _nojsReact.React.createElement(
                        'div',
                        { className: '_dates clearfix' },
                        dates.map(function (item) {
                            return dateItem(item, i);
                        })
                    )
                );
            };

            var groupClass = joinClass(!disableAnimation && 'animate-groups', direction && 'animate-' + direction, animate && 'animate-' + direction + '-active');

            var _ref2 = currentDate || _utils.today;

            var year = _ref2.year;
            var month = _ref2.month;
            var date = _ref2.date;
            var day = _ref2.day;


            return _nojsReact.React.createElement(
                'div',
                { className: 'nj-datepicker nj-datepicker-' + mode },
                hasDate ? _nojsReact.React.createElement(
                    'div',
                    { className: 'pop-side' },
                    _nojsReact.React.createElement(
                        'div',
                        { className: 'year gray' },
                        year,
                        '-',
                        (0, _utils.parseNumber)(month)
                    ),
                    _nojsReact.React.createElement(
                        'span',
                        { className: 'date' },
                        (0, _utils.parseNumber)(date)
                    ),
                    _nojsReact.React.createElement(
                        'div',
                        { className: 'mb30' },
                        this.getWeekStr(day)
                    ),
                    hasTime ? _nojsReact.React.createElement(
                        'div',
                        { className: 'gray' },
                        (0, _utils.parseNumber)(hours),
                        ':',
                        (0, _utils.parseNumber)(minutes),
                        ':00'
                    ) : null
                ) : null,
                _nojsReact.React.createElement(
                    'div',
                    { className: 'pop-main' },
                    hasDate ? _nojsReact.React.createElement(
                        'div',
                        { className: '_page' },
                        _nojsReact.React.createElement(
                            'span',
                            { className: '_item' },
                            _nojsReact.React.createElement(_nojsReact.Mui, { mode: 'circle', onClick: this.jumpTo.bind(this, -12), className: 'nj-icon nj-icon-left2' }),
                            _nojsReact.React.createElement(_nojsReact.Mui, { mode: 'circle', onClick: this.jumpTo.bind(this, -months), className: 'nj-icon nj-icon-left' })
                        ),
                        _nojsReact.React.createElement(
                            'span',
                            { className: '_item' },
                            _nojsReact.React.createElement(_nojsReact.Mui, { mode: 'circle', onClick: this.jumpTo.bind(this, months), className: 'nj-icon nj-icon-right' }),
                            _nojsReact.React.createElement(_nojsReact.Mui, { mode: 'circle', onClick: this.jumpTo.bind(this, 12), className: 'nj-icon nj-icon-right2' })
                        )
                    ) : null,
                    hasDate ? _nojsReact.React.createElement(
                        'div',
                        { className: '_groups clearfix', ref: 'groups' },
                        _nojsReact.React.createElement(
                            'div',
                            { className: groupClass },
                            currentMonth.map(groupItem)
                        )
                    ) : null,
                    hasTime ? _nojsReact.React.createElement(
                        'div',
                        { className: '_times' },
                        '\u65F6\u95F4\uFF1A',
                        _nojsReact.React.createElement(
                            'select',
                            {
                                value: hours
                                // disabled={hasDate&&!currentDate.date}
                                , onChange: this.changeTime.bind(this, 'hours')
                            },
                            hoursItems
                        ),
                        ' :',
                        _nojsReact.React.createElement(
                            'select',
                            {
                                value: minutes
                                // disabled={hasDate&&!currentDate.date}
                                , onChange: this.changeTime.bind(this, 'minutes')
                            },
                            minutesItems
                        )
                    ) : null
                )
            );
        }
    }]);

    return Datetime;
}(_nojsReact.React.Component);

Datetime.defaultProps = {
    mode: 'datetime',
    //显示的月份数
    months: 1,
    // format : 'yy-mm-dd hh:mm:ss',
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    //周一排在第一列 索引以weeks的排序为准
    startWeekIndex: 1
};

exports.default = Datetime;