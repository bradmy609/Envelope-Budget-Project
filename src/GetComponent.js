class GetComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            budget: 0
        };
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
    }

    getAll(event) {
        fetch('http://localhost:3000/envelopes')
        .then((response) => response.json())
        .then((data) => this.setState({data: data}))
    };

    getById (event) {
        const id = event.target.value;
        const url = `http://localhost:3000/envelopes/${id}`
        fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw('Please choose a valid item ID.')
            }
        })
        .then((data) => this.setState({data: [data]}))
        .catch((error) => console.log(error))
    }

    render() {
        return (
            <div>
                <div className="get-container">
                    <br/>
                    <label htmlFor="GetById" className='get-by-id'><h3>Request by ID</h3></label>
                    <br/>
                    <input name='id' type='number' onChange={this.getById} min='0' ></input>
                    <br />
                    <h3 className='sub-title'>OR</h3>
                    <button name='GetAll' className='get-all' onClick={this.getAll}>Get All</button>
                </div>
            {this.state.data ? <DataTable data={this.state.data} /> : null}
            </div>
        )
    }
}