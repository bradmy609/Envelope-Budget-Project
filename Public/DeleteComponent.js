var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeleteComponent = function (_React$Component) {
    _inherits(DeleteComponent, _React$Component);

    function DeleteComponent(props) {
        _classCallCheck(this, DeleteComponent);

        var _this = _possibleConstructorReturn(this, (DeleteComponent.__proto__ || Object.getPrototypeOf(DeleteComponent)).call(this, props));

        _this.state = {
            data: null,
            budget: 0,
            cleared: false
        };
        _this.deleteAll = _this.deleteAll.bind(_this);
        _this.deleteById = _this.deleteById.bind(_this);
        return _this;
    }

    _createClass(DeleteComponent, [{
        key: 'deleteAll',
        value: function deleteAll(event) {
            var _this2 = this;

            event.preventDefault();
            var result = window.confirm('Are you sure you want to delete all contents of the database?');
            if (!result) {
                return;
            }
            var url = 'http://localhost:3000/envelopes';
            fetch(url, {
                method: 'delete',
                header: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                if (response.ok) {
                    return response;
                } else {
                    throw response;
                }
            }).then(function (data) {
                return _this2.setState({ cleared: true });
            }).catch(function (error) {
                return window.alert(error);
            });
        }
    }, {
        key: 'deleteById',
        value: function deleteById(event) {
            var _this3 = this;

            event.preventDefault();
            var id = event.target.id.value;
            if (!id) {
                window.alert('Please input a valid ID.');
                return;
            }
            var url = 'http://localhost:3000/envelopes/' + id;

            fetch(url).then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            }).then(function (data) {
                return _this3.setState({ data: [data] });
            }).catch(function (error) {
                return console.log(error);
            });
            var result = window.confirm('Are you sure you want to delete item ID: ' + id + '?');
            if (!result) {
                return;
            }
            fetch(url, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: null
            }).then(function (response) {
                if (response.ok) {
                    return response;
                } else {
                    throw response;
                }
            }).catch(function (error) {
                return window.alert(error);
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
                    { className: 'delete-container' },
                    React.createElement(
                        'form',
                        { onSubmit: this.deleteById },
                        React.createElement(
                            'label',
                            { htmlFor: 'DeleteById', className: 'get-by-id' },
                            React.createElement(
                                'h3',
                                null,
                                'Delete by ID'
                            )
                        ),
                        React.createElement('input', { name: 'id', type: 'number', min: '0' }),
                        React.createElement('br', null),
                        React.createElement('input', { type: 'submit' })
                    ),
                    React.createElement(
                        'h3',
                        { className: 'sub-title' },
                        'OR'
                    ),
                    React.createElement(
                        'form',
                        { onSubmit: this.deleteAll },
                        React.createElement(
                            'button',
                            { name: 'DeleteAll', className: 'delete-all' },
                            'Delete All'
                        )
                    )
                ),
                this.state.data && React.createElement(DataTable, { data: this.state.data, budget: this.state.budget, method: 'delete' })
            );
        }
    }]);

    return DeleteComponent;
}(React.Component);