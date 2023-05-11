type ArgumentsTuple = [any, ...unknown[]] | readonly [any, ...unknown[]];

export type Arguments =
  | string
  | ArgumentsTuple
  | Record<any, any>
  | null
  | undefined
  | false;

export type Key = Arguments | (() => Arguments);

export const isFunction = <
  T extends (...args: any[]) => any = (...args: any[]) => any
>(
  v: unknown
): v is T => typeof v == "function";

export const getKeyArgs = (_key: Key) => {
  let key: any;
  if (isFunction(_key)) {
    // 核心所在:
    // 当 url 抛出异常时意味着它的依赖还没有就绪则暂停请求
    // 也就是将 key 设置为空字符串
    try {
      key = _key();
    } catch (err) {
      key = "";
    }
  } else {
    // convert null to ''
    key = String(_key || "");
  }
  return [key];
};
