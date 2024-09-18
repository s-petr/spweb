import CopyButton from '@/components/shared/copy-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getCities } from '@/lib/cities'
import { useState } from 'react'

const escapedNewLineToLineBreakTag = (input: string) =>
  input
    .split('\\n')
    .map((item, index) => (index === 0 ? item : [<br key={index} />, item]))

export default function BulkLinks() {
  const [input, setInput] = useState(() => getCities(10))
  const [inputSeparator, setInputSeparator] = useState(',')
  const [outputSeparator, setOutputSeparator] = useState('\\n')
  const [labelTemplate, setLabelTemplate] = useState('Location #%i% - %v%')
  const [urlTemplate, setUrlTemplate] = useState(
    'https://www.google.com/search?q=%v%'
  )

  const applyTemplate = (templateText: string, value: string, index: number) =>
    templateText.replace(/%v%/g, value).replace(/%i%/g, String(index + 1))

  const splitInput = (input: string) => {
    try {
      return input
        .split(
          /^\/.*\/$/.test(inputSeparator)
            ? new RegExp(inputSeparator.slice(1, -1))
            : inputSeparator.replace(/\\n/g, '\n')
        )
        .map((item) => item.trim().replace(/\\n/, ''))
    } catch {
      return []
    }
  }

  const makeHtmlForCopy = (input: string) =>
    splitInput(input)
      .map(
        (value, index) =>
          `<a href="${encodeURI(applyTemplate(urlTemplate, value, index))}">${applyTemplate(labelTemplate, value, index)}</a>`
      )
      .join(outputSeparator)
      .replace(/\\n/g, '<br>')

  const fieldsAreValid = Boolean(
    input.length &&
      !['', '/', '//'].includes(inputSeparator) &&
      urlTemplate.length &&
      labelTemplate.length
  )

  return (
    <Card className='border-none bg-gradient-to-b from-muted/75 to-card px-4'>
      <CardHeader className='mx-auto flex max-w-[800px] flex-col justify-between gap-y-1 px-0'>
        <CardTitle>Bulk Link Builder</CardTitle>
        <CardDescription className='text-justify text-sm'>
          Split a block of text into a list using a separator string or regular
          expression. Output a list of hyperlinks by following a template. The
          placeholder for the index of each item (starts with 1) is{' '}
          <span className='font-medium text-card-foreground'>%i%</span> and the
          placeholder for the value is{' '}
          <span className='font-medium text-card-foreground'>%v%</span>.
        </CardDescription>
      </CardHeader>

      <CardContent className='mx-auto flex max-w-[800px] flex-col gap-y-8 px-0'>
        <div className='space-y-1'>
          <Label htmlFor='input'>Data List</Label>
          <Textarea
            id='input'
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className='flex w-full flex-col justify-between gap-4 md:flex-row'>
          <div className='w-full space-y-1'>
            <Label htmlFor='input-separator'>Split Input By</Label>
            <Input
              type='text'
              id='input-separator'
              value={inputSeparator}
              onChange={(e) => setInputSeparator(e.target.value)}
            />
          </div>

          <div className='w-full space-y-1'>
            <Label htmlFor='output-separator'>Join Output With</Label>
            <Input
              type='text'
              id='output-separator'
              value={outputSeparator}
              onChange={(e) => setOutputSeparator(e.target.value)}
            />
          </div>
        </div>

        <div className='flex w-full flex-col justify-between gap-4 md:flex-row'>
          <div className='w-full space-y-1'>
            <Label htmlFor='url-template'>Link Template</Label>
            <Input
              type='text'
              id='url-template'
              value={urlTemplate}
              onChange={(e) => setUrlTemplate(e.target.value)}
            />
          </div>

          <div className='w-full space-y-1'>
            <Label htmlFor='label-template'>Label Template</Label>
            <Input
              type='text'
              id='label-template'
              value={labelTemplate}
              onChange={(e) => setLabelTemplate(e.target.value)}
            />
          </div>
        </div>

        <div className='relative'>
          {fieldsAreValid && (
            <CopyButton
              output={makeHtmlForCopy(input)}
              mode='html'
              className='absolute right-6 top-4'
            />
          )}
          <div className='max-h-96 min-h-32 overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
            {fieldsAreValid &&
              splitInput(input).map((value, index) => (
                <>
                  <a
                    key={`${value}-${index}`}
                    target='_blank'
                    rel='noreferrer'
                    className='hover:underline'
                    href={applyTemplate(urlTemplate, value, index)}>
                    {applyTemplate(labelTemplate, value, index)}
                  </a>
                  {outputSeparator.includes('\\n')
                    ? escapedNewLineToLineBreakTag(outputSeparator)
                    : outputSeparator}
                </>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
