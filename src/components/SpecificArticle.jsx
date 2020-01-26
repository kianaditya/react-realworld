import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import axios from "../helpers/axiosService";

const SpecificArticle = props => {
  const [article, comments, followStatus, toggleFollow, favorite, toggleFavorite, favoriteCount] = useSpecificArticle(
    props
  );

  return (
    <div>
      {article && (
        <div className="article-page">
          <div className="banner">
            <div className="container">
              <h1>{article.title}</h1>

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
                <button
                  onClick={() => toggleFollow()}
                  className="btn btn-sm btn-outline-secondary"
                >
                 <i className="ion-plus-round"></i>
                  &nbsp; {followStatus ? "Following" : "Follow"} {article.author.username}{" "}
                  {/* <span className="counter">(10)</span> */}
                </button>
                &nbsp;&nbsp;
                <button onClick={()=>toggleFavorite()} className="btn btn-sm btn-outline-primary" data-cy="fav-button">
                  <i className="ion-heart"></i>
      &nbsp; {favorite ?  "Post favorited":"Favorite Post"} <span className="counter">({favoriteCount})</span>
                </button>
              </div>
            </div>
          </div>

          <div className="container page">
            <div className="row article-content">
              <div className="col-md-12">
                <p>{article.body}</p>
                {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                <p>
                  It's a great solution for learning how other frameworks work.
                </p> */}
              </div>
            </div>

            <hr />

            <div className="article-actions">
              <div className="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    {article.author.username}
                  </a>
                  <span className="date">
                    {moment(article.updatedAt).format("Do MMM Y")}
                  </span>
                </div>
                <button className="btn btn-sm btn-outline-secondary">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow {article.author.username}{" "}
                  <span className="counter">(10)</span>
                </button>
                &nbsp;
                <button className="btn btn-sm btn-outline-primary" >
                  <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">({favoriteCount})</span>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                    <button className="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                {/* <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href="" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                  </div>
                </div> */}

                {/* <div className="card">
                  <div className="card-block">
                    <p className="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div className="card-footer">
                    <a href="" className="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        className="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" className="comment-author">
                      Jacob Schmidt
                    </a>
                    <span className="date-posted">Dec 29th</span>
                    <span className="mod-options">
                      <i className="ion-edit"></i>
                      <i className="ion-trash-a"></i>
                    </span>
                  </div>
                </div> */}
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
  const [article, setArticle] = useState();
  const [comments, setComments] = useState();
  const [followStatus, setFollowStatus] = useState();
  const [favorite,setFavorite] = useState()
  const [favoriteCount, setFavoriteCount] = useState(0)
  const slug = props.history.location.pathname.split("/")[2];
  const fetchSpecificArticle = async () => {
    const response = await axios.getSpecificArticle(slug);
    setArticle(response.data.article);
    setFollowStatus(response.data.article.author.following);
  };
  const fetchComments = async () => {
    const response = await axios.getComments(slug);
    setComments(response.data.comments);
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
      setFavoriteCount(response.data.article.favoritesCount)
    } else {
      const response = await axios.unfavoriteArticle(article.slug);
      setFavoriteCount(response.data.article.favoritesCount)
    }
    setFavorite(!favorite);
  };
  useEffect(() => {
    fetchSpecificArticle();
    fetchComments();
  }, []);
  return [article, comments, followStatus, toggleFollow, favorite, toggleFavorite, favoriteCount];
};
