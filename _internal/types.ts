export interface useSwrProps {
  url: any;
  fetcher: any;
  options?: {
    fetcher?: any;
    loadingTimeout?: number;
    onLoadingSlow?: (key: any, config: any) => void;
    onSuccess?: (newData: object | null, key: any, config: any) => void;
    onError?: (error: any, key: any, config: any) => void;
  };
}
