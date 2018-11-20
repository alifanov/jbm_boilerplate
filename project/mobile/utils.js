export const objectToQuery = params => {
  if (!params || params === {}) {
    return "";
  }
  let array = [];
  for (let key in params) {
    if (params[key] === null) {
      continue;
    }
    if (!(params[key] instanceof Array)) {
    }
    if (params[key] instanceof Array) {
      if (params[key].length > 0) {
        for (let val of params[key]) {
          array.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        }
      }
    } else {
      array.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      );
    }
  }
  return `?${array.join("&")}`;
};
