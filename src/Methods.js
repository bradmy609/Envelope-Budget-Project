const methodVerbs = ['Get', 'Put', 'Post', 'Delete'];

class Methods extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            method: ''
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(event) {
        let methodState = event.target.id;
        this.setState({
            method: methodState
        })
    }

    componentDidMount() {
        fetch('http://localhost:3000/budget')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw('Invalid server response')
            }
        })
        .then((data) => this.setState({budget: data}))
    };

    render() {
        return (
            <div className='method-container' id='method-container'>
                {methodVerbs.map(verb => {
                    return (
                            <button className='method-buttons' id={verb} key={verb} onClick={this.clickHandler}>{verb} Request</button>
                    )
                })}
                {this.state.method === 'Get' && <GetComponent method={this.state.method} />}
                {this.state.method === 'Put' && <PutComponent method={this.state.method} />}
                {this.state.method === 'Delete' && <DeleteComponent method={this.state.method} />}
            </div>
        )
    }
}