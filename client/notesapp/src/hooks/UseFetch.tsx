import { useState } from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';


type QueryType = string | object | number[] | string[];
type PayloadType = string | object | number[] | string[];

const useFetch = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const axiosFunction = async (
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    params?: string,
    query?: QueryType,
    payload?: PayloadType
  ) => {
    setLoading(true);
    setError(null);

    let fullUrl = url;

    if (params) fullUrl += `/${params}`;
    if (query && typeof query === 'object') {
      const queryString = new URLSearchParams(query as Record<string, string>).toString();
      fullUrl += `?${queryString}`;
    }

    try {
      let response: AxiosResponse;

      switch (method) {
        case 'get':
          response = await axios.get(fullUrl);
          break;
        case 'post':
          response = await axios.post(fullUrl, payload);
          break;
        case 'put':
          response = await axios.put(fullUrl, payload);
          break;
        case 'delete':
          response = await axios.delete(fullUrl);
          break;
        default:
          throw new Error('Invalid HTTP method');
      }

      setData(response.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, axiosFunction };
};

export default useFetch;
