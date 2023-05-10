import { State } from "./types";

const __cache = new Map();

export function cacheGet(key: string) {
  return __cache.get(key) || undefined;
}

export function cacheSet(key: string, value: State<any>) {
  return __cache.set(key, value);
}

export function cacheClear() {
  __cache.clear();
}

// 记录并发的请求函数集合
export const CONCURRENT_PROMISES = {};

// 记录聚焦的验证函数集合
export const FOCUS_REVALIDATORS = {};

// 记录缓存中的验证函数集合
export const CACHE_REVALIDATORS = {};
