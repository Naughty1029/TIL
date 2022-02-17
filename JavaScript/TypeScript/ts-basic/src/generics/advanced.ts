export default function genericsAdvancedSample() {
  // map関数のシグネチャ
  type Map<T, U> = (array: T[], fn: (item: T) => U) => U[]

  const mapStringToNumber: Map<string, number> = (array, fn) => {
    const result = []
    for (let i = 0; i < array.length; i++) {
      const item = array[i]
      result[i] = fn(item)
    }
    return result
  }

  const numbers = mapStringToNumber(['123', '345'], (item) => Number(item))

  console.log(numbers)
}
