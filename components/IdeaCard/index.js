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
    const { onClick, id, title, creationDate, body, index } = this.props
    return (
        <div className={ styles.card } >
          <button onClick={()=>{ onClick(id, title, creationDate, body, 'delete', index)}}>
            x
          </button>          
          <label>
            Title:
            <input
              type="text"
              value={this.state.title}
              onChange={e => this.handleChange(e, "title")}
              autoFocus={this.props.isNewCard}
              onBlur={()=>{ onClick(id, title, creationDate, body, 'edit', index)}}
            />
          </label>
          <label>
            Body:
            <input
              type="text"
              value={this.state.body}
              onChange={e => this.handleChange(e, "body")}
            />
          </label>
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