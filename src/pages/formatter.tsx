import InputTypeIndicator from '@/components/formatter/input-type-indicator'
import CopyButton from '@/components/shared/copy-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { parseHtml } from '@/lib/html-parser'
import { getInputDataTypeLabel, InputDataType } from '@/lib/input-type-label'
import { parseJson } from '@/lib/json-parser'
import { parseWithPrettier } from '@/lib/prettier'
import { cn } from '@/lib/shadcn'
import { parseUrl } from '@/lib/url-parser'
import { parseXml } from '@/lib/xml-parser'
import { getRouteApi } from '@tanstack/react-router'
import { jsonrepair } from 'jsonrepair'
import { useEffect, useState } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import css from 'react-syntax-highlighter/dist/esm/languages/hljs/css'
import html from 'react-syntax-highlighter/dist/esm/languages/hljs/htmlbars'
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/hljs/json'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light'

SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('xml', xml)
SyntaxHighlighter.registerLanguage('css', css)

const formatterApi = getRouteApi('/formatter')

export default function Formatter() {
  const { type: inputDataTypeOverride } = formatterApi.useSearch()

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [parsingHasFailed, setParsingHasFailed] = useState(false)
  const [inputDataType, setInputDataType] = useState<InputDataType>(
    inputDataTypeOverride || 'unknown'
  )
  const [willCleanupString, setWillCleanupString] = useState(false)
  const [willConvertToJson, setWillConvertToJson] = useState(false)

  const handleSetInputDataType = (value: InputDataType) => {
    !inputDataTypeOverride && setInputDataType(value)
  }

  async function handleInput(newInput: string) {
    setParsingHasFailed(false)

    if (newInput === '') {
      handleSetInputDataType('unknown')
      setOutput('')
      return
    }

    const handleParseJson = (
      input: string,
      inputDataTypeSetting: InputDataType = 'json-valid'
    ) => {
      const output = parseJson(input, willCleanupString)
      setOutput(output)
      handleSetInputDataType(inputDataTypeSetting)
    }

    const formattingSequence: {
      run: () => void | Promise<void>
      filters: InputDataType[]
    }[] = [
      {
        run: () => handleParseJson(newInput),
        filters: ['json-valid', 'json-broken']
      },
      {
        run: async () => {
          const output = await parseHtml(newInput, willCleanupString)
          setOutput(output)
          handleSetInputDataType('html')
        },
        filters: ['html']
      },
      {
        run: async () => {
          const output = await parseXml(
            newInput,
            willCleanupString,
            willConvertToJson
          )
          setOutput(output)
          handleSetInputDataType('xml')
        },
        filters: ['xml']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'babel')
          setOutput(output)
          handleSetInputDataType('js')
        },
        filters: ['js']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'typescript')
          setOutput(output)
          handleSetInputDataType('ts')
        },
        filters: ['ts']
      },
      {
        run: () => handleParseJson(jsonrepair(newInput), 'json-broken'),
        filters: ['json-broken']
      },
      {
        run: () => {
          const output = parseUrl(
            newInput,
            willCleanupString,
            willConvertToJson
          )
          handleSetInputDataType('url')
          setOutput(output)
        },
        filters: ['url']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'css')
          setOutput(output)
          handleSetInputDataType('css')
        },
        filters: ['css']
      },
      {
        run: () => handleParseJson(jsonrepair(`{${newInput}}`), 'json-broken'),
        filters: ['json-broken']
      },
      {
        run: () => handleParseJson(jsonrepair(`[${newInput}]`), 'unknown'),
        filters: ['json-broken']
      },
      {
        run: () => {
          handleSetInputDataType('unknown')
          setOutput('')
          setParsingHasFailed(true)
        },
        filters: []
      }
    ]

    for (const action of formattingSequence) {
      try {
        if (
          !inputDataTypeOverride ||
          !action.filters.length ||
          (inputDataTypeOverride &&
            action.filters.includes(inputDataTypeOverride))
        ) {
          await action.run()
          break
        } else {
          continue
        }
      } catch {
        continue
      }
    }
  }

  useEffect(() => {
    handleInput(input)
  }, [input, willCleanupString, willConvertToJson])

  useEffect(() => {
    setOutput('')
    setInputDataType(inputDataTypeOverride || 'unknown')
    handleInput(input)
  }, [inputDataTypeOverride])

  function getMarkupHighlighter() {
    if (
      (willConvertToJson && ['xml', 'url'].includes(inputDataType)) ||
      inputDataType.includes('json')
    )
      return 'json'
    if (inputDataType === 'unknown') return undefined
    return inputDataType
  }

  const outputPlaceholder = parsingHasFailed
    ? 'Could not parse data' +
      (inputDataTypeOverride
        ? ` as ${getInputDataTypeLabel(inputDataTypeOverride)}`
        : '')
    : ''

  return (
    <Card className='from-muted/75 to-card size-full space-y-2 border-none bg-linear-to-b p-2'>
      <CardHeader className='flex h-fit justify-between gap-x-4 p-2 md:flex-row md:items-center'>
        <div className='flex flex-col gap-y-1'>
          <CardTitle>Universal Code Formatter</CardTitle>
          <CardDescription className='text-sm'>
            Automatically detect and format JS, TS, HTML, CSS, JSON, XML and
            URLs.
          </CardDescription>
        </div>

        <div className='flex items-center gap-x-8'>
          <div className='flex flex-col items-start md:items-end'>
            <div className='flex flex-row-reverse items-center gap-x-1 md:flex-row'>
              <Label
                className='cursor-pointer text-right text-xs'
                htmlFor='cleanup-string'>
                Clean up URL-encoded text
              </Label>
              <Switch
                id='cleanup-string'
                aria-label='cleanup-string'
                className='scale-75'
                checked={willCleanupString}
                onCheckedChange={() =>
                  setWillCleanupString((current) => !current)
                }
              />
            </div>
            <div className='flex flex-row-reverse items-center gap-x-1 md:flex-row'>
              <Label
                className='cursor-pointer text-right text-xs'
                htmlFor='convert-to-json'>
                Convert XML and URLs to JSON
              </Label>
              <Switch
                id='convert-to-json'
                aria-label='convert-to-json'
                className='scale-75'
                checked={willConvertToJson}
                onCheckedChange={() =>
                  setWillConvertToJson((current) => !current)
                }
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className='grid h-dvh grid-cols-1 gap-4 px-2 py-0 md:h-[85%] md:grid-cols-2'>
        <div className='relative'>
          <InputTypeIndicator
            className='bg-background absolute top-4 right-6 size-6 rounded-md saturate-50'
            inputDataType={inputDataType}
            inputIsEmpty={!!input.length}
            inputDataTypeOverride={inputDataTypeOverride}
          />
          <Textarea
            value={input}
            aria-label='Code Input'
            autoComplete='off'
            autoCorrect='off'
            autoCapitalize='off'
            spellCheck='false'
            className={cn(
              'h-full resize-none font-mono text-xs',
              input.length
                ? ['unknown', 'json-broken'].includes(inputDataType)
                  ? 'focus-visible:ring-destructive/50'
                  : 'focus-visible:ring-green-700/50'
                : ''
            )}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className='relative'>
          {!!input.length && (
            <CopyButton
              output={output}
              className='absolute top-4 right-6 z-20 size-6'
            />
          )}
          <SyntaxHighlighter
            className='bg-background absolute size-full overflow-y-auto rounded-md border text-xs break-all whitespace-pre-wrap'
            language={getMarkupHighlighter()}
            wrapLongLines={true}
            style={theme}>
            {output || outputPlaceholder}
          </SyntaxHighlighter>
        </div>
      </CardContent>

      <CardFooter className='flex justify-between'></CardFooter>
    </Card>
  )
}
