import { useState, useEffect } from "react";
//eg fetcher 自定义请求
// import fetch from 'isomorphic-unfetch'

// const customFetch = async (...args) => {
//   const res = await fetch(...args)
//   return await res.json()
// }

// const Home = () => {
// useFetch 的第二个参数可以使用自定义的 customFetch
//   const [data, isLoading, isError] = useFetch('api/data', customFetch);
//   return ()
// }
interface useFetchProps {
  url: string;
  fetcher: any;
}
// 支持传入 fetcher 用于自定义请求
function useFetch({ url, fetcher }: useFetchProps) {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        // 这里直接调用外部传进来的 fetcher，并使用 url 作为参数
        const newData = await fetcher(url);
        setData(newData);
      } catch (error) {
        setIsError(false);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [data, isLoading, isError];
}

export default useFetch;
