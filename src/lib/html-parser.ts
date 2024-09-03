import { cleanUpString } from './cleanup-string'
import { parseWithPrettier } from './prettier'

export async function parseHtml(input: string, willCleanupString: boolean) {
  if (!/<([a-z]+)(?![^>]*\/>)[^>]*>/.test(input))
    throw new Error('Not valid HTML')
  if (/<\?xml|xmlns=/.test(input)) throw new Error('Pass to XML parser')

  if (willCleanupString) input = cleanUpString(input)
  return await parseWithPrettier(input, 'html')
}
