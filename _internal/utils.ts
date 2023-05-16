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

export function deepEqual(obj1: any, obj2: any) {
  // 如果 obj1 和 obj2 都是基本类型，则直接比较它们的值
  if (obj1 === obj2) {
    return true;
  }

  // 如果 obj1 和 obj2 有任意一个不是对象，则它们不相等
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // 获取 obj1 和 obj2 的属性名数组
  const obj1Props = Object.keys(obj1);
  const obj2Props = Object.keys(obj2);

  // 如果属性名数量不同，则 obj1 和 obj2 不相等
  if (obj1Props.length !== obj2Props.length) {
    return false;
  }

  // 逐个比较属性值
  for (const prop of obj1Props) {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(prop)) {
      return false;
    }

    if (!deepEqual(obj1[prop], obj2[prop])) {
      return false;
    }
  }

  // 如果以上都通过，则 obj1 和 obj2 相等
  return true;
}

export function throttle(func: any, delay: any) {
  let timer: any = null;
  let lastCall = 0;

  return function (...args: any[]) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastCall = now;
        func(...args);
      }, delay - (now - lastCall));
    } else {
      lastCall = now;
      func(...args);
    }
  };
}
