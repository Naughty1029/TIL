export default function arraySample() {
  //シンプルな配列の型定義
  const colors: string[] = ['red', 'blue']
  colors.push('yellow')
  // colors.push(1)

  console.log(colors)

  const even: Array<number> = [1, 2, 3]
  even.push(4)
  // even.push('a')
  console.log(even)

  const ids: (string | number)[] = ['ABC', 123]
  ids.push(1)
  ids.push('aaa')
  console.log(ids)

  //配列の型推論
  const generateSomeArray = () => {
    const _someArray = []
    _someArray.push(123)
    _someArray.push('ABC')
    return _someArray
  }
  const someArray = generateSomeArray()
  someArray.push(111)
  //   someArray.push(true)
}
