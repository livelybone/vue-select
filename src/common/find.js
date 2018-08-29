export function find(arr, rule, defaultVal = {}) {
  let item = defaultVal
  arr.some((item1) => {
    if (rule(item1)) {
      item = item1
      return true
    }
    return false
  })
  return item
}
