import { useEffect, useState, useContext, useCallback } from "react";
import { useSwrProps } from "./useSwr";
import useFetchConfigContext from "@_internal/context";
import { getKeyArgs } from "@_internal/utils";

const useAsyncAwr = ({ url, fetcher, options }: useSwrProps) => {
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // 通过 useContext 获取 useFetchConfigContext 的全局配置
  const config = Object.assign({}, useContext(useFetchConfigContext), options);

  const key = getKeyArgs(url);

  const fetchData = useCallback(async (): Promise<any> => {
    if (!key) return false;

    setIsLoading(true);

    let loading = true;

    let newData: object | null;

    try {
      // 请求超时触发 onLoadingSlow 回调函数
      if (config.loadingTimeout) {
        setTimeout(() => {
          if (loading)
            config.onLoadingSlow && config.onLoadingSlow(key, config);
        }, config.loadingTimeout);
      }

      newData = await fetcher(key);

      // 触发请求成功时的回调函数
      config.onSuccess && config.onSuccess(newData, key, config);

      setData(newData);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

      // 触发请求失败时的回调函数
      config.onError && config.onError(error, key, config);
    }

    loading = false;
    return true;
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, isLoading, isError];
};

export default useAsyncAwr;
