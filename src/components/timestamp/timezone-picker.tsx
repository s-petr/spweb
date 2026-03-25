import { timezoneDataList, type TimezoneData } from '@/lib/datetime'
import { useState } from 'react'
import AutoComplete from '../ui/autocomplete'

interface TimezonePickerProps {
  className: string
  value: TimezoneData
  onChange: (timezone: TimezoneData) => void
}

export function TimezonePicker({
  className,
  value,
  onChange
}: TimezonePickerProps) {
  const [searchInput, setSearchInput] = useState('')

  const options = timezoneDataList.map((timezone) => ({
    value: timezone,
    label: `${timezone.label} (${timezone.gmtOffset})`
  }))

  const handleSelectTimezone = (newTimezone: TimezoneData) => {
    onChange(newTimezone)
    setSearchInput('')
  }

  return (
    <AutoComplete
      options={options}
      value={value}
      search={searchInput}
      placeholder='Search for location'
      getKeyFn={(option) => option.value.id}
      className={className}
      onSearchChange={setSearchInput}
      onChange={handleSelectTimezone}
    />
  )
}
