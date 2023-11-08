import { CanceledError } from "axios";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../services/api-client";


export interface Platform{
  id: number;
  name: string;
  slug: string; 
}
export interface Game {
    id: number;
    name: string;
    background_image: string;
    parent_platforms:{platform: Platform}[]
    metacritic: number;
  }
  interface FetchGamesResponse {
    count: number;
    results: Game[];
  }

const useGames = () => {
    //useState varible for storing the game objects
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send a fetch request to the backend
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGamesResponse>("/games", {signal: controller.signal})
      .then((res) => {
      setGames(res.data.results);
      setLoading(false);
      }) //use typescript to define an interface that reps the shape of the response object
      .catch((err) => {
        if(err instanceof CanceledError) return 
        setError(err.message)
        setLoading(false); 
      });

      return() => controller.abort();
  }, []);

  return{games, error, isLoading};
}

export default useGames