import { useState, useEffect } from "react";

interface useSwrProps {
  url: string;
  fetcher: any;
}

function useSwr({ url, fetcher }: useSwrProps) {
  const [data, setData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

export default useSwr;
