export default function genericsSample() {
  //ジェネリック型を使わない場合
  const stringReduce = (array: string[], initialValue: string): string => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }

  console.log(stringReduce(['a', 'b', 'c'], ''))

  const numberReduce = (array: number[], initialValue: number): number => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }

  console.log(numberReduce([1, 2, 3], 0))

  //ジェネリック型を使う場合
  type Reduce<T> = {
    (array: T[], initialValue: T): T
  }

  const stringReduce2: Reduce<string> = (array, initialValue) => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }
  console.log(stringReduce2(['a', 'b', 'c'], ''))

  const numberReduce2: Reduce<number> = (array, initialValue) => {
    let result = initialValue
    for (let i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  }

  console.log(numberReduce2([1, 2, 3], 0))
}
