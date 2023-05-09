export const getKeyArgs = (_key: any) => {
  let key: any;
  if (typeof _key === "function") {
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
  return key;
};
