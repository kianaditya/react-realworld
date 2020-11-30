import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import { withRouter } from "react-router-dom";
import moment from "moment";
import axios from "../../helpers/axiosService";
import Comments from "./Comments";

const SpecificArticle = props => {
  const [
    currentUser,
    article,
    followStatus,
    toggleFollow,
    favorite,
    toggleFavorite,
    favoriteCount,
    deleteArticle
  ] = useSpecificArticle(props);

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
            <Comments currentUser={currentUser} article={article}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(SpecificArticle);

const useSpecificArticle = props => {
  const [state, setState] = useContext(AppContext);
  const [article, setArticle] = useState();
  const [followStatus, setFollowStatus] = useState();
  const [favorite, setFavorite] = useState();
  const [favoriteCount, setFavoriteCount] = useState(0);
  const slug = props.history.location.pathname.split("/")[2];

  const fetchSpecificArticle = async () => {
    const response = await axios.getSpecificArticle(slug);
    setArticle(response.data.article);
    setFollowStatus(response.data.article.author.following);
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

  useEffect(() => {
    fetchSpecificArticle();
  }, []);

  return [
    state.currentUser,
    article,
    followStatus,
    toggleFollow,
    favorite,
    toggleFavorite,
    favoriteCount,
    deleteArticle
  ];
};
