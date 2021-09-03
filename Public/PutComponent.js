var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PutComponent = function (_React$Component) {
    _inherits(PutComponent, _React$Component);

    function PutComponent(props) {
        _classCallCheck(this, PutComponent);

        var _this = _possibleConstructorReturn(this, (PutComponent.__proto__ || Object.getPrototypeOf(PutComponent)).call(this, props));

        _this.state = {
            data: null,
            target: null,
            budget: null
        };
        _this.updateDbIndex = _this.updateDbIndex.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        _this.updateBudget = _this.updateBudget.bind(_this);
        return _this;
    }

    _createClass(PutComponent, [{
        key: 'updateDbIndex',
        value: function updateDbIndex(event) {
            var _this2 = this;

            event.preventDefault();
            var data = {
                id: event.target.id.value,
                name: event.target.name.value,
                weight: event.target.weight.value
            };
            var id = event.target.value;
            var url = 'http://localhost:3000/envelopes/' + id;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (response) {

                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Invalid server response. ID may be out of DB range.';
                }
            }).then(function (data) {
                return _this2.setState({ data: [data] });
            }).catch(function (error) {
                return window.alert(error);
            });
        }
    }, {
        key: 'updateBudget',
        value: function updateBudget(event) {
            var _this3 = this;

            event.preventDefault();
            var budget = event.target.budget.value;
            if (budget && typeof Number(budget) === 'number') {
                this.setState({
                    budget: Number(budget)
                });
            }
            var data = {
                budget: budget
            };
            var url = 'http://localhost:3000/budget';
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw 'Invalid server response.';
                }
            }).then(function (data) {
                return _this3.setState({ data: data });
            }).catch(function (error) {
                return window.alert(error);
            });
        }
    }, {
        key: 'renderForm',
        value: function renderForm() {
            if (this.state.target === 'index') {
                return React.createElement(
                    'div',
                    null,
                    this.props.method === 'Put' ? React.createElement(
                        'div',
                        null,
                        React.createElement(
                            'form',
                            { onSubmit: this.updateDbIndex, className: 'put-form' },
                            React.createElement(
                                'h2',
                                null,
                                'Update By ID'
                            ),
                            React.createElement(
                                'label',
                                { htmlFor: 'id', className: 'put' },
                                'ID: '
                            ),
                            React.createElement('input', { type: 'number', name: 'id', className: 'put' }),
                            React.createElement('br', null),
                            React.createElement(
                                'label',
                                { htmlFor: 'name', className: 'put' },
                                'Name: '
                            ),
                            React.createElement('input', { type: 'text', name: 'name', className: 'put' }),
                            React.createElement('br', null),
                            React.createElement(
                                'label',
                                { htmlFor: 'weight', className: 'put' },
                                'Weight: '
                            ),
                            React.createElement('input', { type: 'number', name: 'weight', step: '5', max: '100', min: '0', className: 'put' }),
                            React.createElement('br', null),
                            React.createElement('input', { type: 'submit', className: 'put' })
                        )
                    ) : null
                );
            } else {
                return React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'form',
                        { onSubmit: this.updateBudget },
                        React.createElement(
                            'h2',
                            null,
                            'Update Budget'
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'budget' },
                            'Budget: '
                        ),
                        React.createElement('input', { type: 'number', name: 'budget', className: 'put' }),
                        React.createElement('br', null),
                        React.createElement('input', { type: 'submit' })
                    )
                );
            }
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var target = e.target.name;
            this.setState({
                target: target
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                { className: 'put-container' },
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        { name: 'index', onClick: this.handleClick, className: 'put-button' },
                        'Update Database by Index'
                    ),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { name: 'budget', onClick: this.handleClick, className: 'put-button' },
                        'Update Budget'
                    )
                ),
                this.state.target && this.renderForm(),
                this.state.data && React.createElement(DataTable, { data: this.state.data, budget: this.state.budget })
            );
        }
    }]);

    return PutComponent;
}(React.Component);