import {
  formatWithTimezone,
  lookupTimezoneData,
  type TimezoneData
} from '@/lib/datetime'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { Input } from '../ui/input'
import { TimezonePicker } from './timezone-picker'

const FALLBACK_TIMEZONE_DATA = lookupTimezoneData('Europe/London')!

export default function TimezoneDisplay({
  dateTimeStart,
  dateTimeEnd,
  label = 'Time with timezone',
  defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  onTimezoneChange = () => {}
}: {
  dateTimeStart: Date | null | undefined
  dateTimeEnd: Date | null | undefined
  label?: string
  defaultTimezone?: string
  onTimezoneChange?: (timezoneData: TimezoneData) => void
}) {
  const [timezoneData, setTimezoneData] = useState(
    lookupTimezoneData(defaultTimezone) ?? FALLBACK_TIMEZONE_DATA
  )

  const handleTimezoneChange = (newTimezoneData: TimezoneData) => {
    setTimezoneData(newTimezoneData)
    onTimezoneChange(newTimezoneData)
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {!!label && <Label>{label}</Label>}
      <div className='grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-0'>
        <Input
          readOnly
          aria-label={`Start Date - ${timezoneData.name} timezone`}
          className='bg-primary-foreground/25 order-2 md:order-0 md:rounded-r-none'
          type='text'
          value={
            dateTimeStart
              ? formatWithTimezone(dateTimeStart, timezoneData.name)
              : ''
          }
        />
        <TimezonePicker
          className='bg-background focus:ring-ring focus:ring-offset-background order-1 focus:ring-2 md:order-0 md:rounded-none'
          value={timezoneData}
          onChange={handleTimezoneChange}
        />
        <Input
          readOnly
          aria-label={`End Date - ${timezoneData.name} timezone`}
          className='bg-primary-foreground/25 order-3 md:order-0 md:rounded-l-none md:text-right'
          type='text'
          value={
            dateTimeEnd
              ? formatWithTimezone(dateTimeEnd, timezoneData.name)
              : ''
          }
        />
      </div>
    </div>
  )
}
