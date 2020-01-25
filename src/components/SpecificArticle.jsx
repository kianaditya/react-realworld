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
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>{article.title}</h1>

              <div class="article-meta">
                <a href="">
                  <img src={article.author.image} />
                </a>
                <div class="info">
                  <a href="" class="author">
                    {article.author.username}
                  </a>
                  <span class="date">
                    {moment(article.updatedAt).format("Do MMM Y")}
                  </span>
                </div>
                <button
                  onClick={() => toggleFollow()}
                  class="btn btn-sm btn-outline-secondary"
                >
                 <i class="ion-plus-round"></i>
                  &nbsp; {followStatus ? "Following" : "Follow"} {article.author.username}{" "}
                  {/* <span class="counter">(10)</span> */}
                </button>
                &nbsp;&nbsp;
                <button onClick={()=>toggleFavorite()} class="btn btn-sm btn-outline-primary" data-cy="fav-button">
                  <i class="ion-heart"></i>
      &nbsp; {favorite ?  "Post favorited":"Favorite Post"} <span class="counter">({favoriteCount})</span>
                </button>
              </div>
            </div>
          </div>

          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>{article.body}</p>
                {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                <p>
                  It's a great solution for learning how other frameworks work.
                </p> */}
              </div>
            </div>

            <hr />

            <div class="article-actions">
              <div class="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div class="info">
                  <a href="" class="author">
                    {article.author.username}
                  </a>
                  <span class="date">
                    {moment(article.updatedAt).format("Do MMM Y")}
                  </span>
                </div>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp; Follow {article.author.username}{" "}
                  <span class="counter">(10)</span>
                </button>
                &nbsp;
                <button class="btn btn-sm btn-outline-primary" >
                  <i class="ion-heart"></i>
              &nbsp; Favorite Post <span class="counter">({favoriteCount})</span>
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-md-8 offset-md-2">
                <form class="card comment-form">
                  <div class="card-block">
                    <textarea
                      class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      class="comment-author-img"
                    />
                    <button class="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                {/* <div class="card">
                  <div class="card-block">
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        class="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">
                      Jacob Schmidt
                    </a>
                    <span class="date-posted">Dec 29th</span>
                  </div>
                </div> */}

                {/* <div class="card">
                  <div class="card-block">
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        class="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">
                      Jacob Schmidt
                    </a>
                    <span class="date-posted">Dec 29th</span>
                    <span class="mod-options">
                      <i class="ion-edit"></i>
                      <i class="ion-trash-a"></i>
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
