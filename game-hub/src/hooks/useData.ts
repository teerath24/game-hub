import { useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";
import { useEffect } from "react";
import apiClient from "../services/api-client";


interface FetchResponse<T>{
    count: number;
    results: T[];
}
const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, deps?:any[]) => {
  //useState varible for storing the game objects
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  //effect hook to send a fetch request to the backend
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, {signal: controller.signal,...requestConfig})
      .then((res) => {
      setData(res.data.results);
      setLoading(false);
      }) //use typescript to define an interface that reps the shape of the response object
      .catch((err) => {
        if(err instanceof CanceledError) return 
        setError(err.message)
        setLoading(false); 
      });

      return() => controller.abort();
  }, deps ? [...deps] : []);

  return{data, error, isLoading};
}

export default useData;