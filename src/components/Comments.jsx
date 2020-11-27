import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "../helpers/axiosService";

const Comments = ({currentUser, article}) => {
  const [
    comments,
    commentText,
    postComment,
    deleteComment,
    onInputChangeHandler
  ] = useCommentsHook(article);
  const renderComments = comments && comments.map(comment => {
    return (
      <div data-cy="comment" key={comment.id} className="card">
        <div className="card-block">
          <p data-cy="comment-body">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a className="comment-author">
            <img src={comment.author.image} className="comment-author-img" />
          </a>
          &nbsp;
          <a className="comment-author">{comment.author.username}</a>
          <span className="date-posted">
            {moment(comment.createdAt).format("ddd MMM DD YYYY")}
          </span>
          {currentUser.username === comment.author.username && (
            <span className="mod-options">
              <i className="ion-edit"></i>
              <i
                className="ion-trash-a"
                onClick={() => deleteComment(comment.id)}
                data-cy="delete-comment"
              ></i>
            </span>
          )}
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-md-8 offset-md-2">
          <form className="card comment-form" onSubmit={postComment}>
            <div className="card-block">
              <textarea
                data-cy="comment-text"
                className="form-control"
                placeholder="Write a comment..."
                rows="3"
                name="commentText"
                onChange={onInputChangeHandler}
                value={commentText}
              ></textarea>
            </div>
            <div className="card-footer">
              <img src={currentUser.image} className="comment-author-img" />
              <button data-cy="post-comment" className="btn btn-sm btn-primary">
                Post Comment
              </button>
            </div>
          </form>
          {renderComments}
        </div>
      </div>
    </>
  );
};

export default Comments;

const useCommentsHook = article => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState();
  const onInputChangeHandler = e => {
    setCommentText(e.target.value);
  };
  const fetchComments = async () => {
    try {
      const response = await axios.getComments(article.slug);
      setComments(
        response.data.comments !== comments && response.data.comments
      );
    } catch (error) {
      console.error(error);
    }
  };
  const postComment = async e => {
    e.preventDefault();
    const comment = {
      body: commentText
    };
    try {
      const response = await axios.addComment(article.slug, comment);
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };
  const deleteComment = async id => {
    try {
      const response = await axios.deleteComments(article.slug, id);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return [comments,commentText, postComment, deleteComment, onInputChangeHandler];
};
