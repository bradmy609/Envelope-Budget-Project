class PutComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            target: null,
            budget: null
        }
        this.updateDbIndex = this.updateDbIndex.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateBudget = this.updateBudget.bind(this);
    } 

    updateDbIndex (event) {
        event.preventDefault();
        const data = {
            id: event.target.id.value,
            name: event.target.name.value,
            weight: event.target.weight.value
        }
        const id = event.target.value;
        const url = `http://localhost:3000/envelopes/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {

            if (response.ok) {
                return response.json()
            } else {
                throw ('Invalid server response. ID may be out of DB range.')
            }
        })
        .then((data) => this.setState({data: [data]}))
        .catch((error) => window.alert(error));
    }

    updateBudget(event) {
        event.preventDefault();
        let budget = event.target.budget.value;
        if (budget && typeof Number(budget) === 'number') {
            this.setState({
                budget: Number(budget)
            })
        }
        let data = {
            budget: budget
        }
        const url = 'http://localhost:3000/budget'
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw('Invalid server response.')
            }
        })
        .then((data) => this.setState({data: data}))
        .catch((error) => window.alert(error));
    }

    renderForm () {
        if (this.state.target === 'index') {
            return (
                <div>
                {this.props.method === 'Put' ? (
                    <div>
                        <form onSubmit={this.updateDbIndex} className='put-form'>
                            <h2>Update By ID</h2>
                            <label htmlFor='id' className='put'>ID: </label>
                            <input type='number' name='id' className='put'></input>
                            <br />
                            <label htmlFor='name' className='put'>Name: </label>
                            <input type='text' name='name' className='put'></input>
                            <br />
                            <label htmlFor="weight" className='put'>Weight: </label>
                            <input type='number' name='weight' step='5' max='100' min='0' className='put'></input>
                            <br />
                            <input type='submit' className='put'></input>
                        </form>
                    </div>
                ) : null}
                </div>
            )
        }
        else {
            return (
                <div>
                    <form onSubmit={this.updateBudget}>
                        <h2>Update Budget</h2>
                        <label htmlFor='budget'>Budget: </label>
                        <input type='number' name='budget' className='put'></input>
                        <br/>
                        <input type='submit'></input>
                    </form>
                </div>
            )
        }
    }

    handleClick(e) {
        let target = e.target.name;
        this.setState({
            target: target
        })
    }

    render() {
        return (
            <div className='put-container'>
                <div>
                    <button name='index' onClick={this.handleClick} className='put-button' >Update Database by Index</button>
                    <br />
                    <button name='budget' onClick={this.handleClick} className='put-button' >Update Budget</button>
                </div>
                {this.state.target && this.renderForm()}
                {this.state.data && <DataTable data={this.state.data} budget={this.state.budget} />}
            </div>
        )
    }
}