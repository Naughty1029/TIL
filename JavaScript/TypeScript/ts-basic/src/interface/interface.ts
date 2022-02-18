interface Bread {
  calories: number
}

interface Bread {
  type: string
}

const francePan: Bread = {
  calories: 300,
  type: 'hard',
}

//型エイリアスで表現
type MaboDofu = {
  calories: number
  spicyLevel: number
}

type Rice = {
  calories: number
  gram: number
}

type MaboDon = MaboDofu & Rice

const maboDon: MaboDon = {
  calories: 500,
  spicyLevel: 10,
  gram: 350,
}

//interfaceの拡張
interface Book {
  page: number
  title: string
}

interface Magazine extends Book {
  cycle: 'daily' | 'weekly' | 'monthly'
}

const Jump: Magazine = {
  page: 300,
  title: '週刊少年ジャンプ',
  cycle: 'weekly',
}

type BookTyoe = {
  page: number
  title: string
}

interface Handbook extends BookTyoe {
  theme: string
}

const cotrip: Handbook = {
  page: 120,
  title: 'ことりっぷ',
  theme: '旅行',
}

//implementsを使う
class Comic implements Book {
  page: number
  title: string

  constructor(page: number, title: string, private publishYear: number) {
    ;(this.page = page), (this.title = title)
  }

  getPublishYear() {
    return this.title + 'が発売されたのは' + this.publishYear + '年です'
  }
}

const popularComic = new Comic(200, '鬼滅の刃', 2016)
console.log(popularComic.getPublishYear())
