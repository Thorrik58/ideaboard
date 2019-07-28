import styles from "./styles.scss"
import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import IdeaCard from '../components/IdeaCard'

class HelloUA extends Component {
  // static async getInitialProps({ req }) {
  //   const userAgent = req ? req.headers['user-agent'] :navigator.userAgent
  //   return { userAgent }
  // }

  // Should handle all edits and removal of cards
  onClickCard(id, title, creationDate, body, clickType) {
    if (clickType === 'delete') {
      // eslint-disable-next-line no-console
      console.log('delete '+ id + ' ' + title + ' ' + creationDate + ' ' + body)
    }
    if (clickType === 'edit') {
      // eslint-disable-next-line no-console
      console.log('edit '+ id + ' ' + title + ' ' + creationDate + ' ' + body)
    }
    else {
      // eslint-disable-next-line no-console
      console.log('clicked '+ id + ' ' + title + ' ' + creationDate + ' ' + body)
    }
  }

  render() {
    return (
    <div className={ styles.example }>
      <IdeaCard title={'title'} body={'body'} id={'1'} creationDate={'2019something'} onClick={this.onClickCard}/>
    </div>
    )
  }
}

// HelloUA.propTypes = {
//   userAgent: PropTypes.object.isRequired
// }

export default HelloUA