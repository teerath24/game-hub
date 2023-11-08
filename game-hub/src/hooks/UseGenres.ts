import { useState } from "react";
import { CanceledError } from "axios";
import { useEffect } from "react";
import apiClient from "../services/api-client";

interface Genre{
    id: number;
    name: string;
}
interface FetchGenresResponse{
    count: number;
    results: Genre[];
}
const useGenres = () => {
  //useState varible for storing the game objects
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send a fetch request to the backend
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchGenresResponse>("/genres", {signal: controller.signal})
      .then((res) => {
      setGenres(res.data.results);
      setLoading(false);
      }) //use typescript to define an interface that reps the shape of the response object
      .catch((err) => {
        if(err instanceof CanceledError) return 
        setError(err.message)
        setLoading(false); 
      });

      return() => controller.abort();
  }, []);

  return{genres, error, isLoading};
}

export default useGenres;