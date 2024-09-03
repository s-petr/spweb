import { cleanUpString } from './cleanup-string'

const validateQueryParams = (params: string) => {
  if (!params.split('&').some((param) => param.split('=').length === 2))
    throw new Error('String is not valid URL params')
}

const queryParamsToJson = (params: string, willCleanupString: boolean) => {
  validateQueryParams(params)
  return Object.fromEntries(
    params
      .split('&')
      .filter((param: string) => param.split('=').length === 2)
      .map((param) =>
        willCleanupString
          ? [param.split('=')[0], param.split('=')[1].replace(/\+/g, ' ')]
          : param.split('=')
      )
  )
}

const queryParamsToText = (params: string, willCleanupString: boolean) => {
  validateQueryParams(params)
  return params
    .split('&')
    .filter((param: string) => param.split('=').length === 2)
    .map(
      (param: string) =>
        `${param.split('=')[0]}=${
          willCleanupString
            ? param.split('=')[1].replace(/\+/g, ' ')
            : param.split('=')[1]
        }`
    )
}

export const parseUrl = (
  input: string,
  willCleanupString: boolean,
  willConvertToJson: boolean
) => {
  if (willCleanupString) input = cleanUpString(input)

  const output = willConvertToJson
    ? JSON.stringify(
        input.split('?').length === 2 && input.startsWith('http')
          ? {
              url: input.split('?')[0],
              parameters: queryParamsToJson(
                input.split('?')[1],
                willCleanupString
              )
            }
          : queryParamsToJson(input, willCleanupString),
        null,
        2
      )
    : input.split('?').length === 2 && input.startsWith('http')
      ? [`URL: ${input.split('?')[0]}\n`, 'Parameters:']
          .concat(queryParamsToText(input.split('?')[1], willCleanupString))
          .join('\n')
      : queryParamsToText(input, willCleanupString).join('\n')

  return output
}
