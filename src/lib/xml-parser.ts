import { XMLParser } from 'fast-xml-parser'
import { cleanUpString } from './cleanup-string'
import { parseWithPrettier } from './prettier'

export const parseXml = async (
  input: string,
  willCleanupString: boolean = false,
  willConvertToJson: boolean = false
) => {
  if (!/<([a-z]+)(?![^>]*\/>)[^>]*>/.test(input))
    throw new Error('Not valid XML')
  if (willCleanupString) input = cleanUpString(input)
  const prettyXml = await parseWithPrettier(input, 'xml')

  const xmlParser = new XMLParser({ ignoreAttributes: false })
  const jsFromXml = xmlParser.parse(input)
  if ('?xml' in jsFromXml) delete jsFromXml['?xml']
  const jsonFromXml = JSON.stringify(jsFromXml, null, 2)

  if (!prettyXml || !jsonFromXml) throw new Error('invalid XML')

  return willConvertToJson ? jsonFromXml : prettyXml
}
