import InputsPair from '@/components/timestamp/inputs-pair'
import TimestampDiff from '@/components/timestamp/timestamp-diff'
import TimezoneDisplay from '@/components/timestamp/timezone-display'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { parseDateTime } from '@/lib/datetime'
import { useEffect, useState } from 'react'

export default function TimestampTool() {
  const [inputStart, setInputStart] = useState('')
  const [dateTimeStart, setDateTimeStart] = useState<Date | null>(null)
  const [inputEnd, setInputEnd] = useState('')
  const [dateTimeEnd, setDateTimeEnd] = useState<Date | null>(null)
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'Europe/London'
  )

  const bothInputsEmpty = !inputStart.length && !inputEnd.length

  const getTimestamp = (
    dateTime: Date | null,
    hasInput: boolean
  ): number | null => {
    if (bothInputsEmpty) return null
    if (dateTime) return dateTime.getTime()
    if (hasInput) return null
    return currentDateTime.getTime()
  }

  const timestampStart = getTimestamp(dateTimeStart, !!inputStart.length)
  const timestampEnd = getTimestamp(dateTimeEnd, !!inputEnd.length)

  useEffect(() => {
    const ticker = setInterval(() => setCurrentDateTime(new Date()), 1000)
    return () => clearInterval(ticker)
  }, [])

  const handleInput = (field: 'start' | 'end', input: string) => {
    if (field === 'start') {
      setInputStart(input)
      setDateTimeStart(parseDateTime(input, timezone))
    } else {
      setInputEnd(input)
      setDateTimeEnd(parseDateTime(input, timezone))
    }
  }

  const handleGetValue = <T,>(
    type: 'start' | 'end',
    dateTransformFn: (date: Date) => T,
    fallbackValue: T
  ) =>
    type === 'start'
      ? inputStart === ''
        ? dateTransformFn(currentDateTime)
        : dateTimeStart
          ? dateTransformFn(dateTimeStart)
          : fallbackValue
      : inputEnd === ''
        ? dateTransformFn(currentDateTime)
        : dateTimeEnd
          ? dateTransformFn(dateTimeEnd)
          : fallbackValue

  return (
    <Card className='from-muted/75 to-card border-none bg-linear-to-b px-4'>
      <CardHeader className='mx-auto flex max-w-[800px] flex-col justify-between gap-y-1 px-0'>
        <CardTitle>Timestamp Tool</CardTitle>
        <CardDescription className='text-sm'>
          Convert and compare dates, timezones and Unix timestamps.
        </CardDescription>
      </CardHeader>

      <CardContent className='mx-auto flex max-w-[800px] flex-col gap-y-4 px-0'>
        <div className='hidden justify-between md:flex'>
          <h3 className='text-card-foreground text-base uppercase'>Start</h3>
          <h3 className='text-card-foreground text-base uppercase'>End</h3>
        </div>

        <InputsPair
          className='bg-background'
          valueStart={inputStart}
          valueEnd={inputEnd}
          errorStart={!!inputStart && !dateTimeStart}
          errorEnd={!!inputEnd && !dateTimeEnd}
          placeholder='Now'
          onChangeStart={handleInput.bind(null, 'start')}
          onChangeEnd={handleInput.bind(null, 'end')}
        />

        <InputsPair
          label='Unix Timestamp'
          valueStart={handleGetValue(
            'start',
            (startDate) => String(startDate.getTime()),
            ''
          )}
          valueEnd={handleGetValue(
            'end',
            (endDate) => String(endDate.getTime()),
            ''
          )}
        />

        <TimezoneDisplay
          dateTimeStart={handleGetValue(
            'start',
            (startDate) => startDate,
            null
          )}
          dateTimeEnd={handleGetValue('end', (endDate) => endDate, null)}
          defaultTimezone={timezone}
          label='Current Timezone'
          onTimezoneChange={(timezoneData) => setTimezone(timezoneData.name)}
        />

        <TimezoneDisplay
          dateTimeStart={handleGetValue(
            'start',
            (startDate) => startDate,
            null
          )}
          dateTimeEnd={handleGetValue('end', (endDate) => endDate, null)}
          label='Reference Timezone'
          defaultTimezone='Europe/London'
        />

        <TimestampDiff
          timestampStart={timestampStart}
          timestampEnd={timestampEnd}
        />
      </CardContent>
    </Card>
  )
}
