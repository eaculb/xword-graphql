const snakeToCamel = (s) =>
  s.replace(/(_([a-z]))/gm, (_, __, p2) => p2.toUpperCase())

const camelToSnake = (s) =>
  s.replace(/([a-z])([A-Z])/gm, (_, p1, p2) => `${p1}_${p2.toLowerCase()}`)

const genericReducer = ({ data }) => {
  let result = {}
  Object.entries(data).forEach(([key, value]) => {
    result[snakeToCamel(key)] = value
  })
  return result
}

module.exports.transformInputs = (data) => {
  let result = {}
  Object.entries(data).forEach(([key, value]) => {
    result[camelToSnake(key)] = value
  })
  return result;
}

module.exports.makeReducer = (config) => {
  const reducer = (obj) => {
    let result = genericReducer(obj);
    if (!config) {
      return result;
    }
    Object.entries(config).forEach(([key, callback]) => {
      result[key] = callback(result)
    })
    return result;
  }
  return reducer;
}