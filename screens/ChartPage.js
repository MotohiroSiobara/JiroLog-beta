import React, { Component, } from 'react'
import { View, } from 'react-native'
import Chart from '../components/Chart'

class ChartPage extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View style={{flex:1}}>
        <View style={{flex: 2}}>
          <Chart />
        </View>
      </View>
    )
  }
}

export default ChartPage