export default function tupleSample() {
  //一般的なタプルの型定義
  const response: [number, string] = [200, 'ok']
  // response = [400,'ok',300]

  console.log(response)

  //可変長引数を使ったタプル
  const girlfriends: [string, ...string[]] = ['Kana', 'Miku', 'Keiko']
  console.log(girlfriends)
}
