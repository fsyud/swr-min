import { useState, useEffect, useContext } from "react";
import useFetchConfigContext from "@_internal/context";
import { useSwrProps } from "./types";

function useSwr({ url, fetcher, options = {} }: useSwrProps) {
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // 通过 useContext 获取 useFetchConfigContext 的全局配置
  const config = Object.assign({}, useContext(useFetchConfigContext), options);

  let fn = fetcher;

  if (typeof fn === "undefined") {
    // 使用全局配置的 fetcher
    fn = config.fetcher;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        // 这里直接调用外部传进来的 fetcher，并使用 url 作为参数
        const newData = await fn(url);
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

// 导出 useFetchConfig
const useFetchConfig = useFetchConfigContext.Provider;
export { useFetchConfig };

export default useSwr;
