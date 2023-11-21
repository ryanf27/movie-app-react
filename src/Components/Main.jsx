/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
const baseUrl = process.env.REACT_APP_BASEURL;
const APIKEY = process.env.REACT_APP_APIKEY;
let url = baseUrl + "/discover/movie?sort_by=popularity.desc&api_key=" + APIKEY;
let arr = ["Popular", "Now Playing", "Kids", "Drama", "Comedy"];
const Main = () => {
  const [movieData, setMovieData] = useState([]);
  const [urlEndpoint, seturlEndpoint] = useState(url);
  const [search, setSearch] = useState();

  const toggleMenu = () => {
    const menuToggle = document.querySelector(".menuToggle");
    const navigation = document.querySelector(".navigation");
    menuToggle.classList.toggle("active");
    navigation.classList.toggle("active");
  };

  useEffect(() => {
    axios
      .get(urlEndpoint, {
        headers: {
          Authorization: `Bearer ${APIKEY}`,
        },
      }) // Use Axios instead of fetch
      .then((response) => {
        setMovieData(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [urlEndpoint]);

  const getData = (movieType) => {
    if (movieType == "Popular") {
      url =
        baseUrl + "/discover/movie?sort_by=popularity.desc&api_key=" + APIKEY;
    }
    if (movieType == "Now Playing") {
      url =
        baseUrl + "/movie/now_playing?language=en-US&page=1&api_key=" + APIKEY;
    }
    if (movieType == "Kids") {
      url =
        baseUrl +
        "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=" +
        APIKEY;
    }
    if (movieType == "Drama") {
      url =
        baseUrl +
        "/discover/movie?with_genres=18&primary_release_year=2014&api_key=" +
        APIKEY;
    }
    if (movieType == "Comedy") {
      url =
        baseUrl +
        "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=" +
        APIKEY;
    }
    seturlEndpoint(url);
  };

  const searchMovie = (event) => {
    if (event.key == "Enter") {
      url =
        baseUrl +
        "/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query=" +
        search;
      seturlEndpoint(url);
      setSearch("");
    }
  };
  return (
    <>
      <div className="header">
        <div className="logo">
          <h2>
            <span>M</span>ovie App
          </h2>
        </div>
        <div classNamee="menuToggle" onClick={toggleMenu}></div>
        <nav>
          <ul>
            {arr.map((value, index) => {
              return (
                <li key={index}>
                  <a
                    href="#home"
                    name={value}
                    onClick={(e) => {
                      getData(e.target.name);
                    }}
                  >
                    {value}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <form>
          <div className="search-btn">
            <input
              type="text"
              placeholder="Enter Movie Name"
              className="inputText"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              onKeyPress={searchMovie}
            ></input>
          </div>
        </form>
      </div>

      <div className="container">
        {movieData.length === 0 ? (
          <p className="notfound">Not Found</p>
        ) : (
          movieData.map((res, pos) => {
            return <Card info={res} key={pos} />;
          })
        )}
      </div>
    </>
  );
};

export default Main;
