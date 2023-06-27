# Trailerflix

This is a project that clones Netflix but only shows trailers of movies. It uses the TMDB API to fetch movie data.

Demo: https://trailerflix-bruno.netlify.app/demo

(To log in you can sign up [here](https://www.themoviedb.org/signup))

## Features

- Shows a list of trending movies and tv shows.
- Plays the trailer of any of those movies/tv shows and shows the movie overview 
- Allows you to mark movies as favorites and watched on TMDB.
- Stores viewed movies and profile data (such as name and preferred language) on LocalStorage since they are not supported by the TMDB API.
- Login persistence is not implemented, as this is just a test project and it seemed unnecessary.

## How to run

### Environment

You will need a valid TMDB API key (which you can request [here](https://developers.themoviedb.org/3/getting-started/introduction)) and a Base URL.

Create a copy of `.env.sample` with your keys.

### Installation

Use `yarn` to install the required packages:
`yarn`

### Start server

Use `yarn dev` to start the server:
`yarn dev`


### You need to configure a `.env` file with:
```
VITE_BASE_API_URL=
VITE_TMDB_KEY=
```
