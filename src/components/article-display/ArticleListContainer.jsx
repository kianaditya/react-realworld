import React from 'react'
import Banner from '../Banner'
import { useArticleList } from './useArticleList'
import ArticleList from './ArticleList'

const ArticleListContainer = () => {
  const [
    articles,
    tags,
    userIsSignedIn,
    activeTab,
    setActiveTab,
  ] = useArticleList()

  const renderTags = tags.map((tag, index) => {
    return (
      <span key={index}>
        <a href="" className="tag-pill tag-default">
          {tag}
        </a>
      </span>
    )
  })
  return (
    <>
      <div
        className="home-page"
        data-cy={userIsSignedIn ? 'my-articles' : 'allArticles'}
      >
        <Banner />
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    {userIsSignedIn && (
                      <a
                        className={
                          activeTab === 'myFeed'
                            ? 'active nav-link'
                            : 'nav-link disabled'
                        }
                        onClick={() => setActiveTab('myFeed')}
                        data-cy="myFeed"
                      >
                        Your Feed
                      </a>
                    )}
                  </li>
                  <li className="nav-item">
                    <a
                      className={
                        activeTab === 'globalFeed'
                          ? 'active nav-link'
                          : 'nav-link disabled'
                      }
                      onClick={() => setActiveTab('globalFeed')}
                      data-cy="globalFeed"
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              <ArticleList articles={articles} />
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
  )
}

export default ArticleListContainer
