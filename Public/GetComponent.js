var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetComponent = function (_React$Component) {
    _inherits(GetComponent, _React$Component);

    function GetComponent(props) {
        _classCallCheck(this, GetComponent);

        var _this = _possibleConstructorReturn(this, (GetComponent.__proto__ || Object.getPrototypeOf(GetComponent)).call(this, props));

        _this.state = {
            data: null,
            budget: 0
        };
        _this.getAll = _this.getAll.bind(_this);
        _this.getById = _this.getById.bind(_this);
        return _this;
    }

    _createClass(GetComponent, [{
        key: 'getAll',
        value: function getAll(event) {
            var _this2 = this;

            fetch('http://localhost:3000/envelopes').then(function (response) {
                return response.json();
            }).then(function (data) {
                return _this2.setState({ data: data });
            });
        }
    }, {
        key: 'getById',
        value: function getById(event) {
            var _this3 = this;

            var id = event.target.value;
            var url = 'http://localhost:3000/envelopes/' + id;
            fetch(url).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Please choose a valid item ID.';
                }
            }).then(function (data) {
                return _this3.setState({ data: [data] });
            }).catch(function (error) {
                return console.log(error);
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'get-container' },
                    React.createElement('br', null),
                    React.createElement(
                        'label',
                        { htmlFor: 'GetById', className: 'get-by-id' },
                        React.createElement(
                            'h3',
                            null,
                            'Request by ID'
                        )
                    ),
                    React.createElement('br', null),
                    React.createElement('input', { name: 'id', type: 'number', onChange: this.getById, min: '0' }),
                    React.createElement('br', null),
                    React.createElement(
                        'h3',
                        { className: 'sub-title' },
                        'OR'
                    ),
                    React.createElement(
                        'button',
                        { name: 'GetAll', className: 'get-all', onClick: this.getAll },
                        'Get All'
                    )
                ),
                this.state.data ? React.createElement(DataTable, { data: this.state.data }) : null
            );
        }
    }]);

    return GetComponent;
}(React.Component);