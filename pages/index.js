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
      cardAdded: false
    }
    this.onClickCard = this.onClickCard.bind(this)
  }

  static async getInitialProps() {
    const res = await fetch('http://localhost:4000/ideas')
    const data = await res.json();
    return { data }
  }

  removeIdeaById(index) {
    var array = [...this.state.cards];
    array.splice(index, 1);
    this.setState({cards: array});
  }

  // Should handle all edits and removal of cards
  onClickCard(id, title, creationDate, body, clickType, index) {
    if (clickType === 'delete') {
      fetch('http://localhost:4000/ideas/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      }).then( r => {
        console.log(r.status)
        if (r.status === 200) {
          // Remove id if successful
          this.removeIdeaById(index)
        } else {
          // eslint-disable-next-line no-console
          console.log(r.status)
        }
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

  addIdea() {
    // Get new id and creation date
    fetch('http://localhost:4000/new', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then( r => r.json() )
    .then( data => {
      // hack to get unique id
      const id = data.id + Math.floor(Math.random() * Math.floor(100))
      // Post new idea with blank body and title
      fetch('http://localhost:4000/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: '', body: '', created_date: data.created_date, id: id})
    }).then( r => {
      console.log(r.status)
      if (r.status === 201) {
        // If successful add to state array to reflect changes right away
        this.setState({cards: this.state.cards.concat({title: "", body: "", created_date: data.created_date, id: id, isNewCard: true}), cardAdded: true})
      }
    })
    });
  }

  // }

  render() {
    
    return (
      <div className={ styles.cardContainer }>
        {this.state.cards.map((idea, key, index) => 
          <IdeaCard 
            key={key}
            id={idea.id}
            title={idea.title}
            body={idea.body}
            creationDate={idea.created_date}
            onClick={this.onClickCard}
            index={index}
            isNewCard={this.state.cardAdded}/>)}
        <button className={styles.card} onClick={() => { this.addIdea() }}>Add New Idea</button>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired
}

export default App