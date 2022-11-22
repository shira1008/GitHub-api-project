import React, { useState, useEffect } from "react";

import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  //for info(followers,repos,following,gists) and card
  const [githubUser, setGithubUser] = useState(mockUser);
  //charts etc
  const [repos, setRepose] = useState(mockRepos);
  //followers with pics...
  const [followers, setFollowers] = useState(mockFollowers);

  //req loading
  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  //error
  const [error, setError] = useState({ show: false, msg: "" });

  // fetch when search
  const searchGithubUser = async (user) => {
    //***by default its false and ""
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    );
    if (response) {
      setGithubUser(response.data);
      const { login, followers_url } = response.data;

      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`),
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = "fulfilled";
          if (repos.status === status) {
            setRepose(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch((err) => console.log(err));

      //more here
      // https://api.github.com/users/shira1008/repos?per_page=100

      //https://api.github.com/users/shira1008/followers
    } else {
      toggleError(true, "there is no user with that name");
    }
    checkRequests();
    setIsLoading(false);
  };

  //check rate - how many req to the api left
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data;
        // remaining = 0;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, "sorry, You have exceeded your hourly rate limit ");
        }
      })
      .catch((err) => console.log(err));
  };

  //error function
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  useEffect(checkRequests, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        isLoading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

//export them:
export { GithubContext, GithubProvider };

//wrap them in index.js
