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

  sortArray(e) {
    var arr = [...this.state.cards];
    if (e.target.value === 'alphabet') {
      arr.sort(function(a, b){
        if(a.title < b.title) { return -1; }
        if(a.title > b.title) { return 1; }
        return 0;
      })
      this.setState({cards: arr});
    }
    if (e.target.value === 'date') {
      arr.sort(function(a, b){
        if(a.created_date < b.created_date) { return -1; }
        if(a.created_date > b.created_date) { return 1; }
        return 0;
        })
      this.setState({cards: arr});
    }
  }


  removeIdeaById(id) {
    var arr = [...this.state.cards];
    var found
    for (var i = 0; i < arr.length; i++) {      
      if (arr[i].id === id) {
        found = i;
        break
      }
      else {
        found = -1
      }
    }
    arr.splice(found, 1);
    this.setState({cards: arr});
  }

   updateIdeaById(title, body, id) {
    var arr = [...this.state.cards];
    for (var i = 0; i < arr.length; i++) {      
      if (arr[i].id === id) {
        arr[i].body = body
        arr[i].title = title
        break
      }
    }
    this.setState({cards: arr});
  }

  showSnackBar() {
    this.setState({showSnackBar: true})
    setTimeout(() => {
      this.setState({showSnackBar: false})
    }, 3000)
  }

  // Handles all edits and removal of cards
  onClickCard(id, title, creationDate, body, clickType) {
    if (clickType === 'delete') {
      fetch('http://localhost:4000/ideas/'+id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      }).then( r => {
        if (r.status === 200) {
          // Remove id if successful
          this.removeIdeaById(id)
        } else {
          // eslint-disable-next-line no-console
          console.log(r.status)
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
          this.showSnackBar()
          this.updateIdeaById(title, body, id)
        } else {
          // eslint-disable-next-line no-console
          console.log(r.status)
        }
      })
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
      // hack to get unique id since im using a mocker
      const id = data.id + Math.floor(Math.random() * Math.floor(100))
      const createdDate = data.created_date + Math.floor(Math.random() * Math.floor(100000))
      // Post new idea with blank body and title
      fetch('http://localhost:4000/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: '', body: '', created_date: createdDate, id: id})
    }).then( r => {
      if (r.status === 201) {
        // If successful add to state array to reflect changes right away
        this.setState({cards: this.state.cards.concat({title: "", body: "", created_date: createdDate, id: id, isNewCard: true}), cardAdded: true})
      }
    })
    });
  }

  render() {
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
        <button className={styles.add_idea_btn} onClick={() => { this.addIdea() }}><p>Add New Idea</p></button>
        <form >
          <select
          onChange={(e) => {this.sortArray(e)}}>
            <option value="alphabet">Sort by alphabet</option>
            <option value="date">Sort by date</option>
          </select>
        </form>
        <div className={this.state.showSnackBar ? styles.snack_bar_show : styles.snack_bar}>Success</div>
      </div>
    )
  }
}

App.propTypes = {
  data: PropTypes.array.isRequired
}

export default App