import { cleanUpString } from './cleanup-string'
import { parseWithPrettier } from './prettier'

function isLikelyPph(input: string) {
  if (input.includes('<?php')) return true

  const matches = input.match(/\$\w+/g) || []
  const density = matches.length / input.length
  return density > 0.01
}

export async function parsePhp(input: string, willCleanupString: boolean) {
  if (!isLikelyPph(input)) throw new Error('Not likely PHP')
  if (willCleanupString) input = cleanUpString(input)
  return await parseWithPrettier(input, 'php')
}
