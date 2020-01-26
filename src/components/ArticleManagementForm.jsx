import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "../helpers/axiosService";

const ArticleManagementForm = props => {
  const [formData, setFormData] = useState({});
  const onInputChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitArticle = async e => {
    e.preventDefault();
    const payload = { article: formData };
    try {
      const response = await axios.createArticle(payload);
      props.history.push({
        pathname: `/article/${response.data.article.slug}`
      });
    } catch (error) {
      console.error(error);
    }
  };
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
                name="article-title"
                onChange={onInputChangeHandler}
                data-cy="article-title"
              />

              <input
                type="text"
                className="form-control"
                placeholder="What's this article about?"
                name="article-slug"
                onChange={onInputChangeHandler}
                data-cy="article-slug"
              />

              <textarea
                className="form-control"
                rows="8"
                placeholder="Write your article (in markdown)"
                name="article-description"
                onChange={onInputChangeHandler}
                data-cy="article-description"
              ></textarea>

              <input
                type="text"
                className="form-control"
                placeholder="Enter tags"
                name="article-tags"
                onChange={onInputChangeHandler}
                data-cy="article-tags"
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
  );
};

export default withRouter(ArticleManagementForm);
