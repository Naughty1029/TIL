//オプションパラメータをもつ関数
export const isUserSignedIn = (userId: string, username?: string): boolean => {
  if (userId === 'ABC') {
    console.log('Function parameters sample 1:', username)
    return true
  } else {
    console.log('Function parameters sample 2:user is not signed in')
    return false
  }
}

//デフォルトパラメータ
export const isUserSignedIn2 = (userId: string, username = 'no-name'): boolean => {
  if (userId === 'ABC') {
    console.log('Function parameters sample 1:', username)
    return true
  } else {
    console.log('Function parameters sample 2:user is not signed in')
    return false
  }
}

//レストパラメータを持つ関数
export const sumProductPrice = (...productsPrice: number[]): number => {
  return productsPrice.reduce((prevTotal: number, productPrice: number) => {
    return prevTotal + productPrice
  }, 0)
}

//呼び出しシグネチャ（省略記法）
type LogMessage = (message: string) => void

export const logMessage6: LogMessage = (message) => {
  console.log('Function parameters sample 6:' + message)
}

//呼び出しシグネチャ（完全記法）
type LogMessage2 = {
  (message: string): void
}

export const logMessage7: LogMessage2 = (message) => {
  console.log('Function parameters sample 7:' + message)
}
