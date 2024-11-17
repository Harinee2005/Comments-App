import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentList: []}

  getName = event => {
    this.setState({name: event.target.value})
  }

  getComment = event => {
    this.setState({comment: event.target.value})
  }

  onDeletingComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  onLikingComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onSubmitData = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const newComment = {
      id: uuid(),
      name,
      comment,
      bgColor:
        initialContainerBackgroundClassNames[Math.floor(Math.random() * 7)],
      isLiked: false,
      createdAt: new Date(),
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      comment: '',
    }))
  }

  render() {
    const {name, comment, commentList} = this.state
    const count = commentList.length

    return (
      <div className="main-container">
        <h1 className="title">Comments</h1>
        <div className="whole-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
            className="comment-image"
          />
          <form className="form-container" onSubmit={this.onSubmitData}>
            <p className="sub-title">Say something about 4.0 Technologies</p>
            <input
              onChange={this.getName}
              value={name}
              className="input-box"
              type="text"
              placeholder="Your Name"
            />
            <textarea
              onChange={this.getComment}
              value={comment}
              className="input-box"
              rows="5"
              cols="20"
              placeholder="Your Comment"
            />
            <button className="btn" type="submit">
              Add Comment
            </button>
          </form>
        </div>
        <hr />
        <div className="comment-count-container">
          <p className="count-box">{count}</p>
          <p className="comment">Comments</p>
        </div>
        <ul className="ul-styles">
          {commentList.map(eachItem => (
            <CommentItem
              details={eachItem}
              key={eachItem.id}
              onLike={this.onLikingComment}
              onDel={this.onDeletingComment}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
