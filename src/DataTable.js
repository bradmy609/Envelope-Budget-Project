class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: 'loading...'
        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/budget')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw(response);
            }
        })
        .then((data) => this.setState({budget: data}))
        .then((data) => console.log(data));
    };

    renderTableData() {
        return this.props.data.map((envelope, index) => {
            const {id, name, weight, value} = envelope;
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td>{weight}</td>
                    <td>{value}</td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = Object.keys(this.props.data[0]);
        return header.map((key, index) => {
            if (key !== 'budget') {
                return <th key={index}>{key.toUpperCase()}</th>
            }
        })
    }

    render() {
        if (!this.props.data) {
            return null;
        }
        
        return (
            <div className='dataTable' id='data-table'>
                <h1 id='title' className='title'>Budget Table</h1>
                <h3>Total Budget: {this.props.budget ? this.props.budget : this.state.budget}</h3>
                {this.props.method == 'delete' ? <h3 style={{color: "green"}}>Successfully Deleted:</h3> : null}
                <table id='envelopes'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
    }
}