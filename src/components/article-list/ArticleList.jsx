import React from 'react'
import { Link } from 'react-router-dom'

const ArticleList = ({ articles }) => {
  if (articles.length > 0) {
    const articleList = articles.map((article, index) => (
      <ArticleListItem article={article} index={index} />
    ))
    return <>{articleList}</>
  }
  return <>Nothing here yet!</>
}

export default ArticleList

const ArticleListItem = ({ article, index }) => {
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
        data-cy="specific-article"
        className="nav-link active"
        to={`/article/${article.slug}`}
      >
        <h1 data-cy="article-title">{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}
