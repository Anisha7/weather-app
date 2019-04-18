import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DisplayWeather from './Components/DisplayWeather'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    // These will hold the user's location and the weather data when it is loaded
    this.state = {
      location: null,
      weather: null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((location) => {
      this.setState({ location })
      this.loadWeather()
    }, (err) => {
      console.log(err.message)
    })
  }
  
  loadWeather() {
    const apikey = WEATHER_API_KEY
    const { latitude, longitude } = this.state.location.coords
    const units = 'Imperial'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=${units}`
    // `fetch()` is used to load data
    fetch(url)
    // After a connection is made the data is streamed as JSON
    .then(res => res.json())
    // When that resolves we use `this.setState()` to assign the weather data to state which will also re-render the component.
    .then(json => this.setState({ weather: json }))
    .catch(err => console.log(err.message))
  }
  
  render() {
    return (
      <View style={styles.container}>
        <DisplayWeather />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
