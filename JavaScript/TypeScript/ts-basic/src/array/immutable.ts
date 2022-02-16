export default function immutableSample() {
  const mutableNumbers: number[] = [1, 2, 3]
  mutableNumbers[2] = 4

  const command: readonly string[] = ['a', 'b', 'c']
  // command[0] = 'a'
}
