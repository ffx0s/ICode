import React, { Component } from 'react'
import { Text } from 'react-native'

export class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch (error, info) {
    this.setState({ error, hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return <Text>{this.state.error && this.state.error.toString()}</Text>
    }
    return this.props.children
  }
}
