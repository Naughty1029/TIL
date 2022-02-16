export default function unknownSample() {
  const maybeNumber: unknown = 10
  console.log('any sample 1:', typeof maybeNumber, maybeNumber)

  // const sum = maybeNumber + 10 error
  if (typeof maybeNumber === 'number') {
    const sum = maybeNumber + 10
  }
}
