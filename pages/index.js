import styles from "./styles.scss"
import React, {Component} from 'react'
import PropTypes from 'prop-types'

class HelloUA extends Component {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] :navigator.userAgent
    return { userAgent }
  }

  render() {
    return <div className={ styles.example }>Hello World test{this.props.userAgent}</div>
  }
}

HelloUA.propTypes = {
  userAgent: PropTypes.object.isRequired
}

export default HelloUA