import styles from "./styles.scss"
import PropTypes from 'prop-types'
import React, {Component} from 'react'

class IdeaCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      body: this.props.body
    }
  }

  handleChange(e, field) {
    this.setState({
      [field]: e.target.value
    });
  }

  render() {
    console.log(this.props)
    const { onClick, id, title, creationDate, body, index } = this.props
    const characterLimit = 140
    return (
        <div className={ styles.card } >
          <button className={styles.delete_button} onClick={()=>{ onClick(id, title, creationDate, body, 'delete', index)}}>
            x
          </button>          
            <input
              type="text"
              placeholder="Title"
              value={this.state.title}
              onChange={e => this.handleChange(e, "title")}
              autoFocus={this.props.isNewCard}
              onBlur={()=>{ onClick(id, title, creationDate, body, 'edit', index)}}
            />
            <textarea
              rows={6}
              type="text"
              placeholder="Body"
              value={this.state.body}
              maxLength={characterLimit}
              onBlur={()=>{ onClick(id, title, creationDate, body, 'edit', index)}}
              onChange={e => this.handleChange(e, "body")}
            />
            { characterLimit - this.state.body.length < 15?
            <p>{this.state.body.length } / {characterLimit}</p>
            : null}
        </div>
    );
  }
}

IdeaCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  creationDate: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  isNewCard: PropTypes.boolean,
  onBlur: PropTypes.func,
  index: PropTypes.number.isRequired
}

export default IdeaCard