import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import './index.css'

class CommentItem extends Component {
  changeLikeStatus = () => {
    const {details, onLike} = this.props
    const {id} = details
    onLike(id)
  }

  onDelete = () => {
    const {details, onDel} = this.props
    const {id} = details
    onDel(id)
  }

  render() {
    const {details} = this.props
    const {name, comment, bgColor, isLiked, createdAt} = details
    const firstLetter = name.slice(0, 1)
    const imageUrl = isLiked
      ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
    const style = isLiked ? 'blue-like' : 'like'
    return (
      <li className="list-style">
        <div className="container">
          <p className={`${bgColor} profile`}>{firstLetter}</p>
          <div>
            <div className="name-container">
              <p className="name">{name}</p>
              <p className="time">
                {formatDistanceToNow(new Date(createdAt))} ago
              </p>
            </div>
            <p className="comment">{comment}</p>
          </div>
        </div>
        <div className="like-container">
          <div className="like-container">
            <button
              className="btn-like"
              type="button"
              onClick={this.changeLikeStatus}
            >
              <img className="like-image" src={imageUrl} alt="like" />
            </button>
            <p className={style}>Like</p>
          </div>
          <button
            type="button"
            data-testid="delete"
            className="btn-like"
            onClick={this.onDelete}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
              className="btn-like like-image"
            />
          </button>
        </div>
        <hr />
      </li>
    )
  }
}

export default CommentItem
