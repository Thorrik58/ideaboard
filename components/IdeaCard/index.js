import styles from "./styles.scss"
import PropTypes from 'prop-types'

const IdeaCard = ({ id, title, body, creationDate, onClick }) => {
  return (
    <div className={ styles.card } onClick={()=>{ onClick(id, title, creationDate, body, 'delete') }}>
      <p>{title}</p>
      <p>{id}</p>
      <p>{body}</p>
      <p>{creationDate}</p>
    </div>
  )
  }

IdeaCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default IdeaCard