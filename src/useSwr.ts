import { useEffect, useState, useContext, useCallback } from "react";
import { useFetchConfigContext, getKeyArgs } from "./../_internal/index";
import { useSwrProps } from "./../_internal/types";
// import { Key } from "./../_internal/utils";
import { CONCURRENT_PROMISES } from "./cache";
import { State } from "./types";
import { cacheGet, cacheSet } from "./cache";

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
    // 当前 key 为空（及并行请求缓存）
    if (!key) return false;

    setIsValidating(true);

    let loading = true;

    let newData: State;

    try {
      // 请求超时触发 onLoadingSlow 回调函数
      if (config.loadingTimeout) {
        setTimeout(() => {
          if (loading)
            config.onLoadingSlow && config.onLoadingSlow(key, config);
        }, config.loadingTimeout);
      }

      // 将请求记录到 CONCURRENT_PROMISES 对象
      CONCURRENT_PROMISES[key] = fn(key);

      newData = await CONCURRENT_PROMISES[key];

      // 触发请求成功时的回调函数
      config.onSuccess && config.onSuccess(newData, key, config);

      // 将请求结果存储到 缓存 cache 中
      cacheSet(key, newData);
      setData(newData);

      setIsValidating(false);
    } catch (error) {
      delete CONCURRENT_PROMISES[key];

      setIsError(true);
      setIsValidating(false);

      // 触发请求失败时的回调函数
      config.onError && config.onError(error, key, config);
    }

    loading = false;
    return true;
  }, [key]);

  useEffect(() => {
    // 在 key 更新之后，我们需要将其标记为 mounted
    revalidate();
  }, [revalidate]);

  return [data, isValidating, isError];
};

export default useSwr;
