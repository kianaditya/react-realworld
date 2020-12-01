import React from 'react'
import { withRouter } from 'react-router-dom'

import { useArticleManagementHook } from './formHooks'

const ArticleManagementForm = (props) => {
  const [
    formData,
    onInputChangeHandler,
    submitArticle,
  ] = useArticleManagementHook(props)
  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form id="article-management-form" onSubmit={submitArticle}>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Article Title"
                name="title"
                onChange={onInputChangeHandler}
                data-cy="article-title-input"
                value={formData.title}
              />

              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                name="description"
                onChange={onInputChangeHandler}
                data-cy="article-description"
                value={formData.description}
              />

              <textarea
                className="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                name="body"
                onChange={onInputChangeHandler}
                data-cy="article-body"
                value={formData.body}
              ></textarea>

              <input
                type="text"
                className="form-control"
                placeholder="Enter tags"
                name="tags"
                onChange={onInputChangeHandler}
                data-cy="article-tags"
                value={formData.tags}
              />
              <div className="tag-list"></div>

              <button
                className="btn btn-lg pull-xs-right btn-primary"
                type="button"
                data-cy="submit-article"
                onClick={submitArticle}
              >
                Publish Article
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ArticleManagementForm)
