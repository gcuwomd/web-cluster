export const alovaErrorHandler = (code: number, message: string) => {
  if (code === 200) {
    return
  }
  if (code === 1) {
    throw new Error(message)
  }
}
