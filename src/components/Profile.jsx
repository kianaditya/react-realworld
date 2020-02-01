import React, { useContext, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axiosService from "../helpers/axiosService";
import { AppContext } from "../AppContext";

const Profile = props => {
  const [state, setState] = useContext(AppContext);
  const [userProfile, setUserProfile] = useState({});
  const [articles, setArticles] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [userFavArticles, setUserFavArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("myArticles");
  const userProfileName = props.match.params.username;
  const fetchUserProfile = async () => {
    try {
      const response = await axiosService.getProfile(userProfileName);
      setUserProfile(response.data.profile);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserArticles = async () => {
    try {
      const response = await axiosService.getUserArticles(userProfileName);
      setUserArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFavoriteArticles = async () => {
    try {
      const response = await axiosService.getUserFavoriteArticles(
        userProfileName
      );
      setUserFavArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };
  const setDisplayArticles = () => {
    if (activeTab === "myArticles") {
      setArticles(userArticles);
    } else {
      setArticles(userFavArticles);
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchUserArticles();
    fetchFavoriteArticles();
  }, []);
  useEffect(() => {
    setDisplayArticles();
  }, [userArticles, userFavArticles, activeTab]);
  const renderUserArticles = articles.map(article => {
    return (
      <div key={article.slug} className="article-preview">
        <div className="article-meta">
          <a href="profile.html">
            <img src={article.author.image} />
          </a>
          <div className="info">
            <a href="" className="author">
              {article.author.userName}
            </a>
            <span className="date">{article.createdAt}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
        {/* <a href="" className="preview-link">
          <h1 data-cy="article-title">{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </a> */}
        <Link
          data-cy="signUpLink"
          className="nav-link active"
          to={`/article/${article.slug}`}
        >
          <h1 data-cy="article-title">{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    );
  });

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={userProfile.image} className="user-img" />
              <h4>{userProfileName}</h4>
              <p>{userProfile.bio}</p>
              {state.currentUser.username !== userProfileName ? (
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-plus-round"></i>
                  &nbsp; Follow ${userProfile.username}
                </button>
              ) : (
                <Link to="/settings">
                  <button className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-plus-round"></i>
                    &nbsp; Edit profile settings
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a
                    className={
                      activeTab === "myArticles"
                        ? "active nav-link"
                        : "nav-link disabled"
                    }
                    onClick={() => setActiveTab("myArticles")}
                  >
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      activeTab === "favArticles"
                        ? "active nav-link"
                        : "nav-link disabled"
                    }
                    onClick={() => setActiveTab("favArticles")}
                  >
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {/* <div className="article-preview">
              <div className="article-meta">
                <a>
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a className="author">Eric Simons</a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>*/}
            {renderUserArticles}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Profile);
