export default function notExistSample() {
  const name = null
  console.log('notExist sample 1:', typeof name, name)

  if (!name) {
    console.log('notExist sample 2:', '名前はまだない')
  } else {
    console.log('notExist sample 3:', '吾輩は猫である')
  }

  const age = undefined
  console.log('notExist sample 4:', typeof age, age)

  if (!age) {
    console.log('notExist sample 5:', '年齢不詳')
  } else {
    console.log('notExist sample 6:', '年齢は20歳')
  }
}
