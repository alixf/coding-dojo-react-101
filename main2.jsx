const lineId = "50";

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.index = 0;
		this.state = { trips: [] };
		this.fetchData();
		setInterval(this.updateData, 1000);
	}

	fetchData = async () => {
		const response = await fetch(`https://ws.infotbm.com/ws/1.0/network/line-informations/line:TBC:${lineId}`);
		const result = await response.json();
		const stopPoints = result.routes[0].stopPoints.map(stopPoint => {
			return stopPoint.id.split(":")[3];
		});
		this.stopPoints = stopPoints;
		this.setState({ stopPoints });
	}
	
	updateData = async () => {
		this.index = (this.index + 1) % this.stopPoints.length;
		const stopId = this.stopPoints[this.index];
		const response = await fetch(`https://ws.infotbm.com/ws/1.0/get-realtime-pass/${stopId}/${lineId}`);
		const result = await response.json();
		const trips = JSON.parse(JSON.stringify(this.state.trips));
		for(const destinationId in result.destinations) {
			for(const trip of result.destinations[destinationId]) {
				const tripIndex = this.state.trips.findIndex(it => it.tripId == trip.tripId);
				if (tripIndex === -1) {
					trips.push(trip);
				} else {
					trips[tripIndex] = trip;
				}
			}
		}
		this.setState({ trips });
	}

	render() {
		return <div className="trip-list">{this.state.trips.map(trip =>
			<div className="trip" key={trip.trip_id}>{trip.trip_id} -> {trip.vehicle_id}:{trip.vehicle_longitude}:{trip.vehicle_lattitude}</div>
		)}</div>;
	}


}

ReactDOM.render(
	<div>
		<Map />
	</div>,
	document.getElementById("root")
);