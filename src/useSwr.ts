import { useEffect, useState, useContext, useCallback, useRef } from "react";
import { useFetchConfigContext, getKeyArgs } from "./../_internal/index";
import { useSwrProps } from "./../_internal/types";
import { cacheGet } from "./cache";

const useSwr = ({ url, fetcher, options }: useSwrProps) => {
  // 约定 `key` 是发送请求的唯一标识符
  const [key] = getKeyArgs(url);

  const [data, setData] = useState<any>(cacheGet(key) || null);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // 通过 useContext 获取 useFetchConfigContext 的全局配置
  const config = Object.assign({}, useContext(useFetchConfigContext), options);

  let fn = fetcher;
  if (typeof fn === "undefined") {
    // 使用全局的 fetcher
    fn = config.fetcher;
  }

  const revalidate = useCallback(async (): Promise<any> => {
    if (!key) return false;

    setIsValidating(true);

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
      setIsValidating(false);
    } catch (error) {
      setIsError(true);
      setIsValidating(false);

      // 触发请求失败时的回调函数
      config.onError && config.onError(error, key, config);
    }

    loading = false;
    return true;
  }, [key]);

  useEffect(() => {
    revalidate();
  }, [revalidate]);

  return [data, isValidating, isError];
};

export default useSwr;
