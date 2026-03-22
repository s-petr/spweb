import { getTimeZones } from '@vvo/tzdb'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(customParseFormat)

export function parseDateTime(
  input: string,
  timezoneName?: string
): Date | null {
  const DATE_TIME_FORMATS_TO_PARSE = [
    'YYYY-MM-DDTHH:mm:ssZ',
    'YYYY-MM-DDTHH:mm:ss',
    'YYYY-MM-DDTHH:mm',

    'YYYY-MM-DD HH:mm:ss',
    'YYYY-MM-DD HH:mm',
    'YYYY-MM-DD h:mma',
    'YYYY-MM-DD h:mmA',

    'DD/MM/YYYY HH:mm:ss',
    'DD/MM/YYYY HH:mm',
    'DD/MM/YYYY h:mma',
    'DD/MM/YYYY h:mmA',
    'D/MM/YYYY HH:mm:ss',
    'D/MM/YYYY HH:mm',
    'D/MM/YYYY h:mma',
    'D/MM/YYYY h:mmA',
    'D/M/YYYY HH:mm:ss',
    'D/M/YYYY HH:mm',
    'D/M/YYYY h:mma',

    'DD.MM.YYYY HH:mm:ss',
    'DD.MM.YYYY HH:mm',
    'DD.MM.YYYY h:mma',
    'DD.MM.YYYY h:mmA',
    'D.M.YYYY HH:mm:ss',
    'D.M.YYYY HH:mm',
    'D.M.YYYY h:mma',

    'DD-MM-YYYY HH:mm:ss',
    'DD-MM-YYYY HH:mm',
    'DD-MM-YYYY h:mma',

    'DD MMM YYYY HH:mm:ss',
    'DD MMM YYYY HH:mm',
    'DD MMM YYYY H:mm',
    'DD MMM YYYY h:mma',
    'DD MMM YYYY h:mmA',
    'D MMM YYYY HH:mm:ss',
    'D MMM YYYY HH:mm',
    'D MMM YYYY H:mm',
    'D MMM YYYY h:mma',
    'DD MMMM YYYY HH:mm:ss',
    'DD MMMM YYYY HH:mm',
    'DD MMMM YYYY h:mma',
    'D MMMM YYYY HH:mm:ss',
    'D MMMM YYYY HH:mm',
    'D MMMM YYYY h:mma',

    'MM/DD/YYYY HH:mm:ss',
    'MM/DD/YYYY HH:mm',
    'MM/DD/YYYY h:mma',
    'MM/DD/YYYY h:mmA',
    'M/D/YYYY HH:mm:ss',
    'M/D/YYYY HH:mm',
    'M/D/YYYY h:mma',

    'MMMM D, YYYY HH:mm:ss',
    'MMMM D, YYYY HH:mm',
    'MMMM D, YYYY h:mma',
    'MMMM D, YYYY h:mmA',
    'MMM D, YYYY HH:mm:ss',
    'MMM D, YYYY HH:mm',
    'MMM D, YYYY h:mma',
    'MMM D, YYYY h:mmA',

    'YYYY-MM-DD',
    'YYYY.MM.DD',
    'YYYY/MM/DD',

    'DD/MM/YYYY',
    'D/MM/YYYY',
    'D/M/YYYY',
    'DD.MM.YYYY',
    'D.M.YYYY',
    'DD-MM-YYYY',
    'DD/MM/YY',
    'DD.MM.YY',
    'DD-MM-YY',

    'DD MMM YYYY',
    'DD MMMM YYYY',
    'D MMM YYYY',
    'D MMMM YYYY',
    'DD MMM YY',
    'DD MMMM YY',

    'MM/DD/YYYY',
    'M/D/YYYY',
    'MM/DD/YY',
    'M/D/YY',
    'MMMM D, YYYY',
    'MMMM Do, YYYY',
    'MMM D, YYYY',
    'MMMM D YYYY',
    'MMMM Do YYYY',
    'MMM D YYYY',

    'HH:mm:ss',
    'HH:mm',
    'H:mm',
    'h:mm A',
    'h:mm a',
    'h:mma',
    'h:mmA',
    'hh:mm A',
    'hh:mma'
  ]

  try {
    const trimmed = input.trim()
    if (!trimmed) return null

    const num = Number(trimmed)
    if (!isNaN(num) && trimmed !== '') {
      if (num >= 1e9 && num < 3e9) return new Date(num * 1000)
      if (num >= 1e12 && num < 3e12) return new Date(num)
    }

    if (timezoneName) {
      for (const format of DATE_TIME_FORMATS_TO_PARSE) {
        try {
          if (!dayjs(input, format, true).isValid())
            throw new Error(
              `Could not parse input with ${format} using strict mode`
            )
          const parsed = dayjs.tz(trimmed, format, timezoneName)
          return parsed.toDate()
        } catch {
          continue
        }
      }
    }

    const explicit = dayjs(trimmed, DATE_TIME_FORMATS_TO_PARSE, true)
    if (explicit.isValid()) return explicit.toDate()

    const native = new Date(trimmed)
    if (isFinite(native.getTime())) return native

    return null
  } catch {
    return null
  }
}

export type TimezoneData = {
  id: string
  name: string
  label: string
  gmtOffset: string
  offsetMinutes: number
}

const rawTimezoneDataList = getTimeZones()

export const timezoneDataList: TimezoneData[] = rawTimezoneDataList.flatMap(
  (tz) => {
    const sign = tz.currentTimeOffsetInMinutes >= 0 ? '+' : '-'
    const hours = Math.floor(
      Math.abs(tz.currentTimeOffsetInMinutes) / 60
    ).toString()
    const minutes = Math.abs(tz.currentTimeOffsetInMinutes) % 60
    const minutesText = minutes ? ':' + minutes.toString() : ''
    const gmtOffset = `GMT${sign}${hours}${minutesText}`

    return tz.mainCities.map((city) => ({
      id: `${tz.continentName}/${tz.countryName}/${city}`,
      name: tz.name,
      label: `${tz.countryName}, ${city}`,
      gmtOffset,
      offsetMinutes: tz.currentTimeOffsetInMinutes
    }))
  }
)

export function normalizeSearchString(input: string) {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, '')
    .toLowerCase()
    .trim()
}

export function lookupTimezoneData(timezoneName: string) {
  return timezoneDataList.find(
    (timezoneData) => timezoneData.name === timezoneName
  )
}

export function formatWithTimezone(date: Date, timezoneName: string) {
  const convertedTime = dayjs(date).tz(timezoneName)
  return convertedTime.format('DD MMM YYYY HH:mm:ss')
}
