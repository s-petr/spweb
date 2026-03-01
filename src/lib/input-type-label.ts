export const inputDataTypes = [
  'unknown',
  'json-valid',
  'json-broken',
  'yaml',
  'url',
  'xml',
  'js',
  'ts',
  'php',
  'html',
  'css',
  'ai'
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
    case 'yaml':
      return 'YAML'
    case 'url':
      return 'URL Parameters'
    case 'xml':
      return 'XML'
    case 'js':
      return 'Javascript'
    case 'ts':
      return 'Typescript'
    case 'php':
      return 'PHP'
    case 'html':
      return 'HTML'
    case 'css':
      return 'CSS'
    case 'ai':
      return 'AI'
  }
}
