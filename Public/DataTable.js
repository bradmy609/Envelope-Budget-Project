var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataTable = function (_React$Component) {
    _inherits(DataTable, _React$Component);

    function DataTable(props) {
        _classCallCheck(this, DataTable);

        var _this = _possibleConstructorReturn(this, (DataTable.__proto__ || Object.getPrototypeOf(DataTable)).call(this, props));

        _this.state = {
            budget: 'loading...'
        };
        return _this;
    }

    _createClass(DataTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch('http://localhost:3000/budget').then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            }).then(function (data) {
                return _this2.setState({ budget: data });
            }).then(function (data) {
                return console.log(data);
            });
        }
    }, {
        key: 'renderTableData',
        value: function renderTableData() {
            return this.props.data.map(function (envelope, index) {
                var id = envelope.id,
                    name = envelope.name,
                    weight = envelope.weight,
                    value = envelope.value;

                return React.createElement(
                    'tr',
                    { key: id },
                    React.createElement(
                        'td',
                        null,
                        id
                    ),
                    React.createElement(
                        'td',
                        null,
                        name
                    ),
                    React.createElement(
                        'td',
                        null,
                        weight
                    ),
                    React.createElement(
                        'td',
                        null,
                        value
                    )
                );
            });
        }
    }, {
        key: 'renderTableHeader',
        value: function renderTableHeader() {
            var header = Object.keys(this.props.data[0]);
            return header.map(function (key, index) {
                if (key !== 'budget') {
                    return React.createElement(
                        'th',
                        { key: index },
                        key.toUpperCase()
                    );
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.data) {
                return null;
            }

            return React.createElement(
                'div',
                { className: 'dataTable', id: 'data-table' },
                React.createElement(
                    'h1',
                    { id: 'title', className: 'title' },
                    'Budget Table'
                ),
                React.createElement(
                    'h3',
                    null,
                    'Total Budget: ',
                    this.props.budget ? this.props.budget : this.state.budget
                ),
                this.props.method == 'delete' ? React.createElement(
                    'h3',
                    { style: { color: "green" } },
                    'Successfully Deleted:'
                ) : null,
                React.createElement(
                    'table',
                    { id: 'envelopes' },
                    React.createElement(
                        'tbody',
                        null,
                        React.createElement(
                            'tr',
                            null,
                            this.renderTableHeader()
                        ),
                        this.renderTableData()
                    )
                )
            );
        }
    }]);

    return DataTable;
}(React.Component);