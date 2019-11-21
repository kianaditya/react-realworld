import React, { useState, useEffect } from "react";
import Banner from "./Banner";
const axios = require("axios");

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const fetchArticles = async () => {
    const response = await axios.get(
      "https://conduit.productionready.io/api/articles"
    );
    setArticles(response.data.articles);
  };
  const fetchTags = async () => {
    const response = await axios.get(
      "https://conduit.productionready.io/api/tags"
    );
    setTags(response.data.tags);
  };
  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);
  const renderArticles = articles.map((article, index) => {
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
        <a href="" className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    );
  });
  const renderTags = tags.map((tag, index) => {
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
      <div className="home-page" data-cy="allArticles">
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link disabled" href="">
                      Your Feed
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="">
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
                <div data-cy="tagList" className="tag-list">{renderTags}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleList;
