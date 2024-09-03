import { cleanUpString } from './cleanup-string'

export const parseJson = (
  input: string,
  willCleanupString: boolean = false
) => {
  if (willCleanupString) input = cleanUpString(input)
  return JSON.stringify(
    JSON.parse(input),
    willCleanupString
      ? (_, value) =>
          typeof value === 'string' ? value.replace(/\+/g, ' ') : value
      : undefined,
    2
  )
}
