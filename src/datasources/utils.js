const snakeToCamel = (s) =>
  s.replace(/(_([a-z]))/gm, (_, __, p2) => p2.toUpperCase())

const genericReducer = (obj) => {
  let result = {}
  Object.entries(obj).forEach(([key, value]) => {
    result[snakeToCamel(key)] = value
  })
  return result
}

module.exports.makeReducer = (overrides) => {
  const reducer = (obj) => {
    let result = genericReducer(obj);
    Object.entries(overrides).forEach(([key, value]) => {
      result[key] = value
    })
  }
  return reducer;
}