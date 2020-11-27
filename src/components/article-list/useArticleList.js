import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppContext";
import axios from "../../helpers/axiosService";

export const useArticleList = () => {
  const [state, setState] = useContext(AppContext);
  const [activeTab, setActiveTab] = useState("globalFeed");
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [feedArticles, setFeedArticles] = useState([]);
  const [tags, setTags] = useState([]);
  const [userIsSignedIn, setUserIsSignedIn] = useState();
  const fetchArticles = async () => {
    const response = await axios.getArticles();
    setAllArticles(response.data.articles);
  };
  const fetchFeedArticles = async () => {
    const response = await axios.getFeedArticles();
    setFeedArticles(response.data.articles);
  };
  const fetchTags = async () => {
    const response = await axios.fetchTags();
    setTags(response.data.tags);
  };
  const setDisplayArticles = () => {
    if (activeTab === "myFeed") {
      setArticles(feedArticles);
    } else {
      setArticles(allArticles);
    }
  };
  useEffect(() => {
    state.currentUser.isSignedIn && setActiveTab("myFeed");
    setUserIsSignedIn(state.currentUser.isSignedIn);
  }, [state.currentUser]);

  useEffect(() => {
    fetchArticles();
    fetchTags();
  }, []);

  useEffect(() => {
    state.currentUser.isSignedIn && fetchFeedArticles();
  }, [state.currentUser]);

  useEffect(() => {
    setDisplayArticles();
  }, [allArticles, feedArticles, activeTab]);

  return [articles, tags, userIsSignedIn, activeTab, setActiveTab];
};