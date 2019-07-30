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

  removeIdeaById(id) {
    var dno = [...this.state.cards];
    var found
    for (var i = 0; i < dno.length; i++) {      
      if (dno[i].id === id) {
        found = i;
        break
      }
      else {
        found = -1
      }
    }
    dno.splice(found, 1);
    this.setState({cards: dno});
  }

   updateIdeaById(title, body, id) {
    var dno = [...this.state.cards];
    var found
    for (var i = 0; i < dno.length; i++) {      
      if (dno[i].id === id) {
        found = i;
        break
      }
      else {
        found = -1
      }
    }
    console.log(body)
    dno[found].body = body
    console.log(title)
    dno[found].title = title
    console.log(dno[found])
    this.setState({cards: dno});
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
        if (r.status === 200) {
          console.log('remove '+id)
          // Remove id if successful
          this.removeIdeaById(id)
        } else {
          // eslint-disable-next-line no-console
        }
      })
    }
    if (clickType === 'edit') {
      fetch('http://localhost:4000/ideas/'+id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, body: body, created_date: creationDate, id: id})
      }).then( r => {
        if (r.status === 200) {
          this.updateIdeaById(title, body, id)
        } else {
          // eslint-disable-next-line no-console
        }
      })
    }
    else {
      // eslint-disable-next-line no-console
      // console.log('clicked '+ id + ' ' + title + ' ' + creationDate + ' ' + body)
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
      if (r.status === 201) {
        console.log('add '+id)
        // If successful add to state array to reflect changes right away
        this.setState({cards: this.state.cards.concat({title: "", body: "", created_date: data.created_date, id: id, isNewCard: true}), cardAdded: true})
      }
    })
    });
  }

  // }

  render() {
    console.log(this.state.cards)
    return (
      <div className={ styles.cardContainer }>
        {this.state.cards.map((idea) => 
          <IdeaCard 
            key={idea.id}
            id={idea.id}
            title={idea.title}
            body={idea.body}
            creationDate={idea.created_date}
            onClick={this.onClickCard}
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