class DeleteComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            budget: 0,
            cleared: false
        };
        this.deleteAll = this.deleteAll.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    deleteAll(event) {
        event.preventDefault();
        const result = window.confirm('Are you sure you want to delete all contents of the database?');
        if (!result) {
            return;
        }
        const url = 'http://localhost:3000/envelopes'
        fetch(url, {
            method: 'delete',
            header: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw(response)
            }
        })
        .then((data) => this.setState({cleared: true}))
        .catch((error) => window.alert(error));
    };

    deleteById (event) {
        event.preventDefault();
        const id = event.target.id.value;
        if (!id) {
            window.alert('Please input a valid ID.');
            return;
        }
        const url = `http://localhost:3000/envelopes/${id}`

        fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw(response);
            }
        })
        .then((data) => this.setState({data: [data]}))
        .catch((error) => console.log(error));
        let result = window.confirm(`Are you sure you want to delete item ID: ${id}?`);
        if (!result) {
            return;
        }
        fetch(url, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null
        })
        .then((response) => {
            if (response.ok) {
                return response;
            } else {
                throw(response)
            }
        })
        .catch((error) => window.alert(error));
    }

    render() {
        return (
            <div>
                <div className="delete-container">
                    <form onSubmit={this.deleteById}>
                        <label htmlFor="DeleteById" className='get-by-id'><h3>Delete by ID</h3></label>
                        <input name='id' type='number' min='0' ></input>
                        <br/>
                        <input type='submit'></input>
                    </form>
                    <h3 className='sub-title'>OR</h3>
                    <form onSubmit={this.deleteAll}>
                        <button name='DeleteAll' className='delete-all'>Delete All</button>
                    </form>
                </div>
            {this.state.data && <DataTable data={this.state.data} budget={this.state.budget} method='delete' />}
            </div>
        )
    }
}