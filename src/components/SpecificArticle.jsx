import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppContext";
import { withRouter } from "react-router-dom";
import moment from "moment";
import axios from "../helpers/axiosService";

const SpecificArticle = props => {
  const [
    currentUser,
    article,
    comments,
    followStatus,
    toggleFollow,
    favorite,
    toggleFavorite,
    favoriteCount,
    deleteArticle,
    postComment,
    deleteComment,
    commentText,
    onInputChangeHandler
  ] = useSpecificArticle(props);

  const renderComments = comments.map(comment => {
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
    <div>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1 data-cy="article-title">{article.title}</h1>

              <div className="article-meta">
                <a href="">
                  <img src={article.author.image} />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {article.author.username}
                  </a>
                  <span className="date">
                    {moment(article.updatedAt).format("Do MMM Y")}
                  </span>
                </div>
                {article.author.username === currentUser.username ? (
                  <>
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      data-cy="edit-article"
                      onClick={() =>
                        props.history.push({
                          pathname: `/update/${article.slug}`,
                          state: { article }
                        })
                      }
                    >
                      Edit Article
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      data-cy="delete-article"
                      onClick={deleteArticle}
                    >
                      Delete Article
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => toggleFollow()}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <i className="ion-plus-round"></i>
                      &nbsp; {followStatus ? "Following" : "Follow"}{" "}
                      {article.author.username}{" "}
                      {/* <span className="counter">(10)</span> */}
                    </button>
                    &nbsp;&nbsp;
                    <button
                      onClick={() => toggleFavorite()}
                      className="btn btn-sm btn-outline-primary"
                      data-cy="fav-button"
                    >
                      <i className="ion-heart"></i>
                      &nbsp; {favorite
                        ? "Post favorited"
                        : "Favorite Post"}{" "}
                      <span className="counter">({favoriteCount})</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <h2>{article.body}</h2>
                <p>{article.description}</p>
              </div>
            </div>
            <hr />
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
                    <img
                      src={currentUser.image}
                      className="comment-author-img"
                    />
                    <button
                      data-cy="post-comment"
                      className="btn btn-sm btn-primary"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
                {renderComments}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(SpecificArticle);

const useSpecificArticle = props => {
  const [state, setState] = useContext(AppContext);
  const [commentText, setCommentText] = useState();
  const [article, setArticle] = useState();
  const [comments, setComments] = useState([]);
  const [followStatus, setFollowStatus] = useState();
  const [favorite, setFavorite] = useState();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const slug = props.history.location.pathname.split("/")[2];
  const onInputChangeHandler = e => {
    setCommentText(e.target.value);
  };
  const fetchSpecificArticle = async () => {
    const response = await axios.getSpecificArticle(slug);
    setArticle(response.data.article);
    setFollowStatus(response.data.article.author.following);
  };
  const fetchComments = async () => {
    try {
      const response = await axios.getComments(slug);
      setComments(
        response.data.comments !== comments && response.data.comments
      );
    } catch (error) {
      console.error(error);
    }
  };
  const toggleFollow = async () => {
    if (followStatus) {
      const response = await axios.unfollowUser(article.author.username);
    } else {
      const response = await axios.followUser(article.author.username);
    }
    setFollowStatus(!followStatus);
  };
  const toggleFavorite = async () => {
    if (!favorite) {
      const response = await axios.favoriteArticle(article.slug);
      setFavoriteCount(response.data.article.favoritesCount);
    } else {
      const response = await axios.unfavoriteArticle(article.slug);
      setFavoriteCount(response.data.article.favoritesCount);
    }
    setFavorite(!favorite);
  };
  const deleteArticle = async () => {
    try {
      const response = await axios.deleteArticle(article.slug);
      props.history.push({
        pathname: "/"
      });
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
      setCommentText("")
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
    fetchSpecificArticle();
    fetchComments();
  }, []);

  return [
    state.currentUser,
    article,
    comments,
    followStatus,
    toggleFollow,
    favorite,
    toggleFavorite,
    favoriteCount,
    deleteArticle,
    postComment,
    deleteComment,
    commentText,
    onInputChangeHandler
  ];
};
