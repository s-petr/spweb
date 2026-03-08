import InputTypeIndicator from '@/components/formatter/input-type-indicator'
import CopyButton from '@/components/shared/copy-button'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { parseHtml } from '@/lib/html-parser'
import { getInputDataTypeLabel, InputDataType } from '@/lib/input-type-label'
import { parseJson } from '@/lib/json-parser'
import { parsePhp } from '@/lib/php-parser'
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
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'
import xml from 'react-syntax-highlighter/dist/esm/languages/hljs/xml'
import yaml from 'react-syntax-highlighter/dist/esm/languages/hljs/yaml'
import theme from 'react-syntax-highlighter/dist/esm/styles/hljs/stackoverflow-light'

SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('ts', ts)
SyntaxHighlighter.registerLanguage('php', php)
SyntaxHighlighter.registerLanguage('html', html)
SyntaxHighlighter.registerLanguage('xml', xml)
SyntaxHighlighter.registerLanguage('css', css)

const AI_FORMATTER_URL = 'https://formatter.spweb.dev'

const formatterApi = getRouteApi('/formatter')

export default function Formatter() {
  const { type: inputDataTypeOverride } = formatterApi.useSearch()

  const [status, setStatus] = useState<
    'ready' | 'formatting' | 'done' | 'failed'
  >('ready')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [inputDataType, setInputDataType] = useState<InputDataType>(
    inputDataTypeOverride || 'unknown'
  )
  const [willCleanupString, setWillCleanupString] = useState(false)
  const [willConvertToJson, setWillConvertToJson] = useState(false)

  async function formatWithAi(input: string) {
    setStatus('formatting')

    try {
      const res = await fetch(AI_FORMATTER_URL, {
        method: 'POST',
        headers: { 'content-type': 'text/plain' },
        body: input
      })

      if (!res.ok) {
        const errorData = await res.text()
        throw new Error(errorData)
      }

      const data = await res.text()

      if (!data || !data.length)
        throw new Error('Invalid or empty data in response.')

      setStatus('done')
      setOutput(data)
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error formatting with AI: ${error.message}`)
      } else {
        setOutput('Error formatting with AI.')
      }
      setStatus('failed')
    }
  }

  const handleSetInputDataType = (value: InputDataType) => {
    !inputDataTypeOverride && setInputDataType(value)
  }

  async function handleInput(newInput: string) {
    if (newInput.trim() === '') {
      setOutput('')
      handleSetInputDataType('unknown')
      setStatus('ready')
      return
    }

    setStatus('formatting')

    const handleParseJson = (
      input: string,
      inputDataTypeSetting: InputDataType = 'json-valid'
    ): [InputDataType, string] => {
      const output = parseJson(input, willCleanupString)
      return [inputDataTypeSetting, output]
    }

    const formattingSequence: {
      run: () => [InputDataType, string] | Promise<[InputDataType, string]>
      filters: InputDataType[]
    }[] = [
      {
        run: () => handleParseJson(newInput),
        filters: ['json-valid', 'json-broken']
      },
      {
        run: async () => {
          const output = await parsePhp(newInput, willCleanupString)
          return ['php', output]
        },
        filters: ['php']
      },
      {
        run: async () => {
          const output = await parseHtml(newInput, willCleanupString)
          return ['html', output]
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
          return ['xml', output]
        },
        filters: ['xml']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'babel')
          return ['js', output]
        },
        filters: ['js']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'typescript')
          return ['ts', output]
        },
        filters: ['ts']
      },
      {
        run: () => {
          const output = parseUrl(
            newInput,
            willCleanupString,
            willConvertToJson
          )
          return ['url', output]
        },
        filters: ['url']
      },
      {
        run: () => handleParseJson(jsonrepair(newInput), 'json-broken'),
        filters: ['json-broken']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'css')
          return ['css', output]
        },
        filters: ['css']
      },
      {
        run: async () => {
          const output = await parseWithPrettier(newInput, 'yaml')
          return ['yaml', output]
        },
        filters: ['yaml']
      },
      {
        run: () => ['ai', ''],
        filters: ['ai']
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
          const [dataType, output] = await action.run()
          setOutput(output)
          handleSetInputDataType(dataType)
          setStatus(action.filters.includes('ai') ? 'ready' : 'done')
          return
        } else {
          continue
        }
      } catch {
        continue
      }
    }
    setOutput('')
    setStatus('failed')
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
    if (['unknown', 'ai'].includes(inputDataType)) return undefined
    return inputDataType
  }

  return (
    <Card className='from-muted/75 to-card size-full space-y-2 border-none bg-linear-to-b p-2'>
      <CardHeader className='flex h-fit justify-between gap-x-4 p-2 md:flex-row md:items-center'>
        <div className='flex flex-col gap-y-1'>
          <CardTitle>Universal Code Formatter</CardTitle>
          <CardDescription className='text-sm'>
            Automatically detect and format JS, TS, PHP, HTML, CSS, JSON, XML,
            YAML and URLs.
          </CardDescription>
        </div>

        <div className='flex items-center gap-x-8'>
          <div className='flex flex-col items-start md:items-end'>
            <div className='flex flex-row-reverse items-center gap-x-1 md:flex-row'>
              <Label
                className={cn(
                  'text-right text-xs',
                  status !== 'ready' || inputDataType === 'ai'
                    ? 'text-muted-foreground cursor-auto select-none'
                    : 'cursor-pointer'
                )}
                htmlFor='cleanup-string'>
                Clean up URL-encoded text
              </Label>
              <Switch
                id='cleanup-string'
                aria-label='cleanup-string'
                className='scale-75 disabled:cursor-auto'
                checked={willCleanupString}
                disabled={status !== 'ready' || inputDataType === 'ai'}
                onCheckedChange={() =>
                  setWillCleanupString((current) => !current)
                }
              />
            </div>
            <div className='flex flex-row-reverse items-center gap-x-1 md:flex-row'>
              <Label
                className={cn(
                  'text-right text-xs',
                  status !== 'ready' || inputDataType === 'ai'
                    ? 'text-muted-foreground cursor-auto select-none'
                    : 'cursor-pointer'
                )}
                htmlFor='convert-to-json'>
                Convert XML and URLs to JSON
              </Label>
              <Switch
                id='convert-to-json'
                aria-label='convert-to-json'
                className='scale-75 disabled:cursor-auto'
                checked={willConvertToJson}
                disabled={status !== 'ready' || inputDataType === 'ai'}
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
              status === 'done' &&
                inputDataType === 'json-valid' &&
                'focus-visible:ring-green-700/50',
              status === 'done' &&
                inputDataType === 'json-broken' &&
                'focus-visible:ring-destructive/50'
            )}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className='relative'>
          {status === 'done' && (
            <CopyButton
              output={output}
              className='absolute top-4 right-6 z-20 size-6'
            />
          )}

          {!!input.trim().length &&
            (status === 'failed' ||
              (status === 'ready' && inputDataType === 'ai')) && (
              <div className='absolute top-1/2 z-20 flex w-full -translate-y-1/2 flex-col items-center gap-2'>
                <p className='text-muted-foreground w-1/2 text-center text-xs select-none'>
                  {inputDataTypeOverride &&
                    inputDataTypeOverride !== 'ai' &&
                    `Could not parse the data as ${getInputDataTypeLabel(inputDataTypeOverride, 'data')}. `}
                  Attempt to format text using an AI model. Can take some time
                  to complete. Do not send sensitive data. Check and verify the
                  output.
                </p>
                <Button
                  className='h-8 w-28 cursor-pointer text-xs disabled:cursor-default'
                  size='sm'
                  onClick={() => formatWithAi(input)}>
                  Send to AI
                </Button>
              </div>
            )}

          {status === 'formatting' && (
            <div className='bg-card absolute top-1/2 left-1/2 z-20 flex h-8 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-md p-2'>
              <Spinner className='text-muted-foreground' />
              <p className='text-muted-foreground text-center text-xs select-none'>
                Formatting...
              </p>
            </div>
          )}

          <SyntaxHighlighter
            className='bg-background absolute size-full overflow-y-auto rounded-md border text-xs break-all whitespace-pre-wrap'
            language={getMarkupHighlighter()}
            wrapLongLines={true}
            style={theme}>
            {output || ''}
          </SyntaxHighlighter>
        </div>
      </CardContent>

      <CardFooter className='flex justify-between'></CardFooter>
    </Card>
  )
}
