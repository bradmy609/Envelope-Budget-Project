var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var methodVerbs = ['Get', 'Put', 'Post', 'Delete'];

var Methods = function (_React$Component) {
    _inherits(Methods, _React$Component);

    function Methods(props) {
        _classCallCheck(this, Methods);

        var _this = _possibleConstructorReturn(this, (Methods.__proto__ || Object.getPrototypeOf(Methods)).call(this, props));

        _this.state = {
            method: ''
        };
        _this.clickHandler = _this.clickHandler.bind(_this);
        return _this;
    }

    _createClass(Methods, [{
        key: 'clickHandler',
        value: function clickHandler(event) {
            var methodState = event.target.id;
            this.setState({
                method: methodState
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://localhost:3000/budget').then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Invalid server response';
                }
            }).then(function (data) {
                return _this2.setState({ budget: data });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                { className: 'method-container', id: 'method-container' },
                methodVerbs.map(function (verb) {
                    return React.createElement(
                        'button',
                        { className: 'method-buttons', id: verb, key: verb, onClick: _this3.clickHandler },
                        verb,
                        ' Request'
                    );
                }),
                this.state.method === 'Get' && React.createElement(GetComponent, { method: this.state.method }),
                this.state.method === 'Put' && React.createElement(PutComponent, { method: this.state.method }),
                this.state.method === 'Delete' && React.createElement(DeleteComponent, { method: this.state.method })
            );
        }
    }]);

    return Methods;
}(React.Component);