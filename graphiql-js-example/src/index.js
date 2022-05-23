import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import "graphiql/graphiql.min.css";
import GraphiQL from "graphiql";

// const URL = "https://swapi-graphql.netlify.com/.netlify/functions/index";
const URL = "http://127.0.0.1:8360/graphql";

function graphQLFetcher(graphQLParams) {
  let url = URL;
  url = `${url}?query=${graphQLParams.query}`
  return fetch(url, {
    method: "get",
    headers: { "Content-Type": "application/json" },
  }).then(response => response.json());
}

const container = document.getElementById("root");

const defaultQuery = `
{
  allFilms {
    edges {
      node {
        id
        title
        producers
        episodeID
        created
      }
    }
  }
}
`;

render(
  <GraphiQL fetcher={graphQLFetcher} defaultQuery={defaultQuery} />,
  container
);
