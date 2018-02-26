class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };

	}
	
	componentWillMount() {
		this.timer = setInterval(() => {
			this.setState({ date: new Date() });
		}, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	render() {
		return <h1>Bonjour {this.props.name}, il est {this.state.date.toLocaleTimeString()}</h1>;
	}
}

ReactDOM.render(
	<div>
		<Welcome name="tata" />
		<Welcome name="toto" />
		<Welcome name="tutu" />
		<Welcome name="titi" />
	</div>,
	document.getElementById("root")
);