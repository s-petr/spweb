import { cleanUpString } from './cleanup-string'

const PRETTIER_SETTINGS = {
  trailingComma: 'none',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  singleAttributePerLine: false,
  bracketSameLine: true,
  jsxSingleQuote: true,
  printWidth: 100,
  endOfLine: 'auto',
  xmlWhitespaceSensitivity: 'ignore',
  phpVersion: '8.4'
} as const

async function loadClientSidePrettier() {
  const prettier = await import('prettier/standalone')
  const prettierPluginBabel = await import('prettier/plugins/babel')
  const prettierPluginEstree = await import('prettier/plugins/estree')
  const prettierPluginHtml = await import('prettier/plugins/html')
  const prettierPluginXml = await import('@prettier/plugin-xml')
  const prettierPluginCSS = await import('prettier/plugins/postcss')
  const prettierPluginYaml = await import('prettier/plugins/yaml')
  const prettierPluginTypescript = await import('prettier/plugins/typescript')
  const prettierPluginPhp = await import('@prettier/plugin-php/standalone')

  const plugins = [
    prettierPluginBabel.default,
    prettierPluginEstree.default,
    prettierPluginHtml.default,
    prettierPluginXml.default,
    prettierPluginCSS.default,
    prettierPluginYaml.default,
    prettierPluginTypescript.default,
    prettierPluginPhp.default
  ]

  return (input: string, parser: string) =>
    prettier.default.format(input, { parser, plugins, ...PRETTIER_SETTINGS })
}

export const parseWithPrettier = async (
  input: string,
  inputDataType: string = 'babel',
  willCleanupString: boolean = false
) => {
  if (willCleanupString) input = cleanUpString(input)

  const format = await loadClientSidePrettier()

  const output = await format(input, inputDataType)

  if (!output) throw new Error(`Input is not ${inputDataType}`)
  return output
}
