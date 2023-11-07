import { CanceledError } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../services/api-client";

export interface Game {
    id: number;
    name: string;
    background_image: string;
  }
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
    //useState varible for storing the game objects
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  //effect hook to send a fetch request to the backend
  useEffect(() => {
    const controller = new AbortController()
    apiClient
      .get<FetchGamesResponse>("/games", {signal: controller.signal})
      .then((res) => setGames(res.data.results)) //use typescript to define an interface that reps the shape of the response object
      .catch((err) => {
        if(err instanceof CanceledError) return 
        setError(err.message)});
      return() => controller.abort();
  }, []);

  return{games, error};
}

export default useGames