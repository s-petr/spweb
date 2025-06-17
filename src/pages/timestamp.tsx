import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'

const DEFAULT_START_INPUT = '1999-12-31'

function DisplayPair({
  valueStart,
  valueEnd,
  label,
  className,
  placeholder,
  onChangeStart,
  onChangeEnd
}: {
  valueStart: string
  valueEnd: string
  label?: string
  className?: string
  placeholder?: string
  onChangeStart?: (input: string) => void
  onChangeEnd?: (input: string) => void
}) {
  return (
    <div className='flex flex-col gap-y-2'>
      {!!label && <Label>{label}</Label>}
      <div className='flex flex-col gap-2 md:flex-row md:gap-0'>
        <Input
          readOnly={!onChangeStart}
          aria-label={`Start Date - ${label ?? 'input'}`}
          className={cn(
            'bg-primary-foreground/25 md:rounded-r-none',
            className
          )}
          type='text'
          placeholder={placeholder}
          value={valueStart}
          onChange={(e) => onChangeStart && onChangeStart(e.target.value)}
        />
        <Input
          readOnly={!onChangeEnd}
          aria-label={`End Date - ${label ?? 'input'}`}
          className={cn(
            'bg-primary-foreground/25 md:rounded-l-none md:text-right',
            className
          )}
          type='text'
          placeholder={placeholder}
          value={valueEnd}
          onChange={(e) => onChangeEnd && onChangeEnd(e.target.value)}
        />
      </div>
    </div>
  )
}

export default function TimestampTool() {
  const [inputStart, setInputStart] = useState(DEFAULT_START_INPUT)
  const [dateTimeStart, setDateTimeStart] = useState<Date | null>(
    new Date(DEFAULT_START_INPUT)
  )
  const [inputEnd, setInputEnd] = useState('')
  const [dateTimeEnd, setDateTimeEnd] = useState<Date | null>(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  const start = dateTimeStart
    ? dateTimeStart?.getTime()
    : inputStart
      ? 0
      : currentDateTime.getTime()

  const end = dateTimeEnd
    ? dateTimeEnd?.getTime()
    : inputEnd
      ? 0
      : currentDateTime.getTime()

  const deltaTimestamps = Math.abs(end - start)

  const deltas = [
    31_556_952_000,
    31_556_952_000 / 12,
    24 * 60 * 60 * 1000,
    60 * 60 * 1000,
    60 * 1000,
    1000,
    1
  ].map((item, index, arr) =>
    Math.floor(
      (index ? deltaTimestamps % arr[index - 1] : deltaTimestamps) / item
    )
  )

  const deltaTimestampMessage =
    end === start
      ? 'The start and end dates are the same.'
      : end > start
        ? `The end date is ahead of start date by:`
        : `The end date is behind the start date by:`

  useEffect(() => {
    const ticker = setInterval(() => setCurrentDateTime(new Date()), 1000)
    return () => clearInterval(ticker)
  }, [])

  const setDateTime = (input: string) => {
    try {
      if (!input.length) {
        return null
      } else if (Number(input) >= 1 * 10 ** 9 && Number(input) < 3 * 10 ** 9) {
        return new Date(Number(input) * 1000)
      } else if (Number(input) > 0 && Number(input) < 3 * 10 ** 12) {
        return new Date(Number(input))
      } else if (
        !(
          new Date(input) instanceof Date && isFinite(new Date(input).getTime())
        )
      ) {
        return null
      } else {
        return new Date(input)
      }
    } catch {
      return null
    }
  }

  const handleInput = (field: 'start' | 'end', input: string) => {
    if (field === 'start') {
      setInputStart(input)
      setDateTimeStart(setDateTime(input))
    } else {
      setInputEnd(input)
      setDateTimeEnd(setDateTime(input))
    }
  }

  const handleGetValue = (
    type: 'start' | 'end',
    dateTransformFn: (date: Date) => string
  ) =>
    type === 'start'
      ? inputStart === ''
        ? dateTransformFn(currentDateTime)
        : dateTimeStart
          ? dateTransformFn(dateTimeStart)
          : ''
      : inputEnd === ''
        ? dateTransformFn(currentDateTime)
        : dateTimeEnd
          ? dateTransformFn(dateTimeEnd)
          : ''

  return (
    <Card className='from-muted/75 to-card border-none bg-linear-to-b px-4'>
      <CardHeader className='mx-auto flex max-w-[800px] flex-col justify-between gap-y-1 px-0'>
        <CardTitle>Timestamp Tool</CardTitle>
        <CardDescription className='text-sm'>
          Convert and compare dates and Unix timestamps.
        </CardDescription>
      </CardHeader>

      <CardContent className='mx-auto flex max-w-[800px] flex-col gap-y-4 px-0'>
        <div className='hidden justify-between md:flex'>
          <h3 className='text-card-foreground text-base uppercase'>Start</h3>
          <h3 className='text-card-foreground text-base uppercase'>End</h3>
        </div>

        <DisplayPair
          className='bg-background'
          valueStart={inputStart}
          valueEnd={inputEnd}
          placeholder='Now'
          onChangeStart={handleInput.bind(null, 'start')}
          onChangeEnd={handleInput.bind(null, 'end')}
        />

        <DisplayPair
          label='Unix Timestamp'
          valueStart={handleGetValue('start', (startDate: Date) =>
            String(startDate.getTime())
          )}
          valueEnd={handleGetValue('end', (endDate: Date) =>
            String(endDate.getTime())
          )}
        />

        <DisplayPair
          label={`Local Timezone (${Intl.DateTimeFormat().resolvedOptions().timeZone})`}
          valueStart={handleGetValue('start', (startDate: Date) =>
            String(startDate.toLocaleString())
          )}
          valueEnd={handleGetValue('end', (endDate: Date) =>
            String(endDate.toLocaleString())
          )}
        />

        <DisplayPair
          label='GMT Timezone (ISO Format)'
          valueStart={handleGetValue('start', (startDate: Date) =>
            String(startDate.toISOString())
          )}
          valueEnd={handleGetValue('end', (endDate: Date) =>
            String(endDate.toISOString())
          )}
        />

        <DisplayPair
          label='GMT Timezone (UTC Format)'
          valueStart={handleGetValue('start', (startDate: Date) =>
            String(startDate.toUTCString())
          )}
          valueEnd={handleGetValue('end', (endDate: Date) =>
            String(endDate.toUTCString())
          )}
        />

        <div className='flex w-full flex-col justify-between gap-4'>
          <p className='pt-4 text-justify text-sm'>{deltaTimestampMessage}</p>

          <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
            <div className='flex gap-0'>
              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-years'>Years</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-r-none text-center'
                  type='text'
                  id='delta-years'
                  value={deltas[0]}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-months'>Months</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-none text-center'
                  type='text'
                  id='delta-months'
                  value={deltas[1]}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-days'>Days</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-l-none text-center md:rounded-r-none'
                  type='text'
                  id='delta-days'
                  value={deltas[2]}
                />
              </div>
            </div>

            <div className='flex gap-0'>
              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-hours'>Hrs</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-r-none text-center md:rounded-l-none'
                  type='text'
                  id='delta-hours'
                  value={deltas[3]}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-minutes'>Mins</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-none text-center'
                  type='text'
                  id='delta-minutes'
                  value={deltas[4]}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-seconds'>Secs</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-none text-center'
                  type='text'
                  id='delta-seconds'
                  value={deltas[5]}
                />
              </div>

              <div className='flex w-full flex-col items-center gap-2'>
                <Label htmlFor='delta-milliseconds'>Ms</Label>
                <Input
                  readOnly
                  className='bg-primary-foreground/25 rounded-l-none text-center'
                  type='text'
                  id='delta-milliseconds'
                  value={deltas[6]}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
