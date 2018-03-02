class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}
	
	componentWillMount() {
		this.timer = setInterval(this.updateTime, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timer);
	}

	updateTime = () => {
		this.setState({ date: new Date() });
	}

	updateTime() {
		this.state = new Date();
	}

	render() {
		return <h1>Bonjour à {this.props.location}, il est {this.state.date.toLocaleTimeString()}</h1>;
	}
}

ReactDOM.render(
	<div>
		<Clock location="Bordeaux" />
	</div>,
	document.getElementById("root")
);
