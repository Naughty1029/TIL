export default function ObjectSample() {
  const a = {
    name: 'name',
    age: 20,
  }

  //オブジェクトリテラルで型定義
  let country: {
    language: string
    name: string
  } = {
    language: 'Japanese',
    name: 'Japan',
  }

  console.log(country.name)

  country = {
    language: 'English',
    name: 'USA',
  }

  //オプショナルとreadonly
  const people: {
    age: number
    lastName: string
    readonly firstName: string
    gender?: string
  } = {
    age: 28,
    lastName: 'Yamada',
    firstName: 'Taro',
  }

  people.gender = 'male'
  people.lastName = 'Kamado'
  // people.firstName = 'Tanjiro'
  console.log(people)

  //インデックスシグネチャー
  const capitals: {
    [countryName: string]: string
  } = {
    Japan: 'Tokyo',
    Korea: 'Seoul',
  }

  //型エイリアス
  type Country = {
    capital: string
    language: string
    name: string
  }

  const Japan: Country = {
    capital: 'Tokyo',
    language: 'Japanese',
    name: 'Japan',
  }

  //合併型と交差型
  type Knight = {
    hp: number
    sp: number
    weapon: string
    swordSkill: string
  }

  type Wizard = {
    hp: number
    mp: number
    weapon: string
    magicSkill: string
  }

  //合併型（KnightまたはWizardの型を持つ）
  type Adventurer = Knight | Wizard

  //交差型（KnightかたWizardの型を持つ）
  type Paladin = Knight & Wizard

  const Adventurer1: Adventurer = {
    hp: 100,
    sp: 100,
    weapon: '木の剣',
    swordSkill: '三連切り',
  }

  const Adventurer2: Adventurer = {
    hp: 100,
    mp: 100,
    weapon: '杖',
    magicSkill: '回復魔法',
  }

  const Paladin1: Paladin = {
    hp: 100,
    mp: 100,
    sp: 100,
    weapon: '杖',
    swordSkill: '三連切り',
    magicSkill: '回復魔法',
  }
}
