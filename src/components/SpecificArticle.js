import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
const axios = require("axios");

const SpecificArticle = props => {
  const [article, setArticle] = useState();
  const [comments, setComments] = useState()
  const slug = props.history.location.pathname.split("/")[2];
  const fetchSpecificArticle = async () => {
    const response = await axios.get(
      `https://conduit.productionready.io/api/articles/${slug}`
    );
    setArticle(response.data.article);
  };
  const fetchComments = async () => {
    const response = await axios.get(
      `https://conduit.productionready.io/api/articles/${slug}/comments`
    );
    console.log(response.data.comments);
    setComments(response.data.comments);
  }
  // debugger;
  useEffect(() => {
    fetchSpecificArticle();
    fetchComments();
  }, []);
  return (
    <div>
      {article && (
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>{article.title}</h1>

              <div class="article-meta">
                <a href="">
                  <img src={article.author.image} />
                </a>
                <div class="info">
                  <a href="" class="author">
                    {article.author.username}
                  </a>
                  <span class="date">{article.updatedAt}</span>
                </div>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp; Follow {article.author.username}{" "}
                  <span class="counter">(10)</span>
                </button>
                &nbsp;&nbsp;
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  &nbsp; Favorite Post <span class="counter">(29)</span>
                </button>
              </div>
            </div>
          </div>

          <div class="container page">
            <div class="row article-content">
              <div class="col-md-12">
                <p>
                  {article.body}
                </p>
                {/* <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                <p>
                  It's a great solution for learning how other frameworks work.
                </p> */}
              </div>
            </div>

            <hr />

            <div class="article-actions">
              <div class="article-meta">
                <a href="profile.html">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div class="info">
                  <a href="" class="author">
                    {article.author.username}
                  </a>
                  <span class="date">{article.updatedAt}</span>
                </div>
                <button class="btn btn-sm btn-outline-secondary">
                  <i class="ion-plus-round"></i>
                  &nbsp; Follow {article.author.username}{" "}
                  <span class="counter">(10)</span>
                </button>
                &nbsp;
                <button class="btn btn-sm btn-outline-primary">
                  <i class="ion-heart"></i>
                  &nbsp; Favorite Post <span class="counter">(29)</span>
                </button>
              </div>
            </div>

            <div class="row">
              <div class="col-xs-12 col-md-8 offset-md-2">
                <form class="card comment-form">
                  <div class="card-block">
                    <textarea
                      class="form-control"
                      placeholder="Write a comment..."
                      rows="3"
                    ></textarea>
                  </div>
                  <div class="card-footer">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      class="comment-author-img"
                    />
                    <button class="btn btn-sm btn-primary">Post Comment</button>
                  </div>
                </form>

                {/* <div class="card">
                  <div class="card-block">
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        class="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">
                      Jacob Schmidt
                    </a>
                    <span class="date-posted">Dec 29th</span>
                  </div>
                </div> */}

                {/* <div class="card">
                  <div class="card-block">
                    <p class="card-text">
                      With supporting text below as a natural lead-in to
                      additional content.
                    </p>
                  </div>
                  <div class="card-footer">
                    <a href="" class="comment-author">
                      <img
                        src="http://i.imgur.com/Qr71crq.jpg"
                        class="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">
                      Jacob Schmidt
                    </a>
                    <span class="date-posted">Dec 29th</span>
                    <span class="mod-options">
                      <i class="ion-edit"></i>
                      <i class="ion-trash-a"></i>
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(SpecificArticle);
