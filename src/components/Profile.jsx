import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosService from "../helpers/axiosService";
import { AppContext } from "../AppContext";

const Profile = () => {
  const [state, setState] = useContext(AppContext);
  const [userProfile, setUserProfile] = useState();
  const [userArticles, setUserArticles] = useState([]);
  const fetchUserProfile = async () => {
    try {
      const response = await axiosService.getProfile(
        state.currentUser.username
      );
      setUserProfile(response.data.profile);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUserArticles = async () => {
    try {
      const response = await axiosService.getUserArticles(
        state.currentUser.username
      );
      setUserArticles(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };
  const renderUserArticles = userArticles.map(article => {
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
  useEffect(() => {
    fetchUserProfile();
    fetchUserArticles();
  }, []);
  return (
    <div class="profile-page">
      <div class="user-info">
        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <img src={state.currentUser.image} class="user-img" />
              <h4>{state.currentUser.username}</h4>
              <p>{state.currentUser.bio}</p>
              <button class="btn btn-sm btn-outline-secondary action-btn">
                <i class="ion-plus-round"></i>
                &nbsp; Follow ${state.currentUser.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <div class="articles-toggle">
              <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                  <a class="nav-link active">My Articles</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link">Favorited Articles</a>
                </li>
              </ul>
            </div>

            {/* <div class="article-preview">
              <div class="article-meta">
                <a>
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div class="info">
                  <a class="author">Eric Simons</a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 29
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div class="article-preview">
              <div class="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div class="info">
                  <a href="" class="author">
                    Albert Pai
                  </a>
                  <span class="date">January 20th</span>
                </div>
                <button class="btn btn-outline-primary btn-sm pull-xs-right">
                  <i class="ion-heart"></i> 32
                </button>
              </div>
              <a href="" class="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                
                <ul class="tag-list">
                  <li class="tag-default tag-pill tag-outline">Music</li>
                  <li class="tag-default tag-pill tag-outline">Song</li>
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

export default Profile;
