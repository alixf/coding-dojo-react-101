import * as React from "react";
import GoogleMapReact from 'google-map-react';
import { TBMScanner } from "tbm-scanner";

const defaultCenter = {lat: 44.843531, lng: -0.571213};

export class App extends React.PureComponent {
  constructor(props) {
     super(props);
     this.state = {buses: []};
  }

  // componentDidMount() {
  //   this.addBus({trip_id: "1", vehicle_lattitude: 44.843531, vehicle_longitude: -0.571213});
  //   setInterval(() => {
  //     this.updateBus({trip_id: "1", vehicle_lattitude: 44.843531 + Math.random() * 0.001, vehicle_longitude: -0.571213 + Math.random() * 0.001});
  //   }, 100);
  // }

  addBus = (bus) => {
    const buses = this.state.buses.slice();
    buses.push(bus);
    this.setState({buses});
  }

  updateBus = (bus) => {
    const buses = this.state.buses.slice();
    const tripIndex = buses.findIndex(it => it.trip_id === bus.trip_id);
    buses[tripIndex] = bus;
    this.setState({buses});
  }

  render() {
    return <div style={{height: "100vh"}}>
      <TBMScanner lineId="04" onNewBus={this.addBus} onBusUpdate={this.updateBus} />
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCOwDabYXgUqgb7nGr6lYDyU_zV0akhzvk" }}
        defaultCenter={defaultCenter}
        defaultZoom={15}
      >
        {this.state.buses.map(bus => this.renderBus(bus))}
      </GoogleMapReact>
    </div>;
  }

  renderBus(bus) {
    if(bus.vehicle_lattitude !== null && bus.vehicle_longitude !== null) {
      return <BusMarker key={bus.trip_id} lat={bus.vehicle_lattitude} lng={bus.vehicle_longitude} />
    }
    return null;
  }
}


class BusMarker extends React.Component {
  render() {
    return <div style={{
      width: 30,
      height: 30,
      background: "red",
      borderRadius:40,
      position: "relative",
      left:-15,
      top: -15
    }}></div>
  }
}