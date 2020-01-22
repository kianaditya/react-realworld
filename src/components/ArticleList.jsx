import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import { AppContext } from "../AppContext";
import axios from "../helpers/axiosService";

const ArticleList = () => {
  const [state, setState] = useContext(AppContext);
  const [activeTab, setactiveTab] = useState("globalFeed");
  useEffect(() => {
    state.currentUser.isSignedIn && setactiveTab("myFeed");
  }, []);
  const fetchArticles = async () => {
    const response = await axios.fetchArticles();
    // setArticles(response.data.articles);
    setState(state => ({ ...state, articles: response.data.articles }));
  };
  const fetchTags = async () => {
    const response = await axios.fetchTags();
    // setTags(response.data.tags);
    setState(state => ({ ...state, tags: response.data.tags }));
  };
  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);
  const renderArticles = state.articles.map((article, index) => {
    return (
      <div key={index} className="article-preview">
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
  const renderTags = state.tags.map((tag, index) => {
    return (
      <span key={index}>
        <a href="" className="tag-pill tag-default">
          {tag}
        </a>
      </span>
    );
  });
  return (
    <>
      <div
        className="home-page"
        data-cy={state.currentUser.isSignedIn ? "my-articles" : "allArticles"}
      >
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {state.currentUser.isSignedIn && (
                    <li className="nav-item">
                      <a
                        className={
                          activeTab === "myFeed"
                            ? "active nav-link"
                            : "nav-link disabled"
                        }
                        href=""
                        onClick={() => setactiveTab("myFeed")}
                      >
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a
                      className={
                        activeTab === "globalFeed"
                          ? "active nav-link"
                          : "nav-link disabled"
                      }
                      href=""
                      onClick={() => setactiveTab("globalFeed")}
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>
              {renderArticles}
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div data-cy="tagList" className="tag-list">
                  {renderTags}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
