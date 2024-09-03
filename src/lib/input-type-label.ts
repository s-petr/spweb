export const inputDataTypes = [
  'unknown',
  'json-valid',
  'json-broken',
  'url',
  'xml',
  'js',
  'ts',
  'html',
  'css'
] as const

export type InputDataType = (typeof inputDataTypes)[number]

export function getInputDataTypeLabel(
  inputDataType: InputDataType,
  labelType: 'data' | 'action' = 'data'
) {
  switch (inputDataType) {
    case 'unknown':
      return labelType === 'data' ? 'Unknown Input' : 'Auto Format'
    case 'json-valid':
      return labelType === 'data' ? 'Valid JSON' : 'Validate JSON'
    case 'json-broken':
      return labelType === 'data' ? 'Broken JSON' : 'Repair JSON'
    case 'url':
      return 'URL Parameters'
    case 'xml':
      return 'XML'
    case 'js':
      return 'Javascript'
    case 'ts':
      return 'Typescript'
    case 'html':
      return 'HTML'
    case 'css':
      return 'CSS'
  }
}
