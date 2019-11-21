import React, { useState, useEffect } from "react";
const axios = require("axios");

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const fetchArticles = async () => {
    const response = await axios.get(
      "https://conduit.productionready.io/api/articles"
    );
    setArticles(response.data.articles);
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  const renderArticles = articles.map((article, index) => {
    return (
      <>
        <div key={index}>{article.title}</div>
      </>
    );
  });
  return <div data-cy="allArticles">{renderArticles}</div>;
};

export default ArticleList;
