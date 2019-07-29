import styles from "./styles.scss"
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import IdeaCard from '../components/IdeaCard'
import fetch from 'isomorphic-unfetch'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: this.props.data,
      additionalIdeasCount: 0 
    }
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:4000/ideas')
    const data = await res.json();
    return { data }
  }

  // Should handle all edits and removal of cards
  onClickCard(id, title, creationDate, body, clickType) {
    if (clickType === 'delete') {
      fetch('http://localhost:4000/ideas/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      }).then( r => {
        console.log(r.status)
      })
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

  onClickAdd() {
    this.setState({cards: this.state.cards.concat({title: "Title", body: "Temporary body", created_date: new Date().getTime(), id: 123})
  })
    // fetch('http://localhost:4000/ideas', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ title: 'test', body: 'some more text', created_date: new Date().getTime()})
    // }).then( r => {
    //   console.log(r.status)
    // })
  }

  render() {
    return (
      <div className={ styles.cardContainer }>
        {this.state.cards.map((idea, key) => 
          <IdeaCard 
            key={key}
            id={idea.id}
            title={idea.title}
            body={idea.body}
            creationDate={idea.created_date}
            onClick={this.onClickCard}/>)}
        <button onClick={() => { this.onClickAdd()}}>Add New Idea</button>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired
}

export default App