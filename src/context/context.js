import React, { useState, useEffect } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  //request loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const checkRequest = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(
            true,
            "sorry, you have exceeded your hourly rate limit !"
          );
        }
      })
      .catch((err) => {});
  };

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(checkRequest, []);

  const onSearchClick = async(user) => {
    toggleError();
    setLoading(true);

    const {data} = await axios.get(`${rootUrl}/users/${user}`);

    if(data) {
      setGithubUser(data);
      const {repos_url, followers_url} = data;
      const repoData = await axios.get(`${repos_url}?per_page=100`).catch(err=>{
        toggleError(true,'oh! something went wrong at our end, please try again.');
        setLoading(false);
      });
      
      const followerData = await axios.get(`${followers_url}?per_page=100`).catch(err=>{
        toggleError(true,'oh! something went wrong at our end, please try again.');
        setLoading(false);
      });

      if(followerData) setFollowers(followerData.data);
      if(repoData) setRepos(repoData.data);

    }
    else{
      toggleError(true,'oh! there is not user with that username.')
    }
    checkRequest();
    setLoading(false);
  };

  return (
    <GithubContext.Provider
      value={{ githubUser, repos, followers, onSearchClick, requests, error,isLoading }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export { GithubProvider, GithubContext };
