import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
}
interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  //useState varible for storing the game objects
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  //effect hook to send a fetch request to the backend
  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/games")
      .then((res) => setGames(res.data.results)) //use typescript to define an interface that reps the shape of the response object
      .catch((err) => setError(err.message));
  });
  return (
    <>
      {error && <Text>{error}</Text>}
      <ul>
        {games.map((game) => (
          <li key={game.id}>{game.name}</li>
        ))}
      </ul>
    </>
  );
};

export default GameGrid;
