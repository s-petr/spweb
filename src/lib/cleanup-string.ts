export const cleanUpString = (input: string) => {
  let output = input.replace(/\\[ntr]/g, '')
  output = output.replace(/(?:\\(.))/g, '$1')
  output = decodeURIComponent(output)
  return output
}
