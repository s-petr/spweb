import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

export default function TimestampDiff({
  timestampStart,
  timestampEnd
}: {
  timestampStart: number | null
  timestampEnd: number | null
}) {
  const isValidComparison = timestampStart != null && timestampEnd != null

  let diffs = Array(7).fill('')
  let timestampDiffMessage = 'Enter a valid timestamp to compare.'

  if (isValidComparison) {
    const timestampDiff = Math.abs((timestampEnd ?? 0) - (timestampStart ?? 0))

    diffs = [
      31_556_952_000,
      31_556_952_000 / 12,
      24 * 60 * 60 * 1000,
      60 * 60 * 1000,
      60 * 1000,
      1000,
      1
    ].map((item, index, arr) =>
      isValidComparison
        ? String(
            Math.floor(
              (index ? timestampDiff % arr[index - 1] : timestampDiff) / item
            )
          )
        : ''
    )

    timestampDiffMessage =
      timestampEnd === timestampStart
        ? 'The start and end dates are the same.'
        : timestampEnd > timestampStart
          ? `The end date is ahead of start date by:`
          : `The end date is behind the start date by:`
  }

  return (
    <div className='flex w-full flex-col justify-between gap-4 text-sm'>
      <p className='pt-4 text-justify text-sm'>{timestampDiffMessage}</p>

      <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
        <div className='flex gap-0'>
          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-years'>Years</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-r-none text-center'
              type='text'
              id='delta-years'
              value={diffs[0]}
            />
          </div>

          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-months'>Months</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-none text-center'
              type='text'
              id='delta-months'
              value={diffs[1]}
            />
          </div>

          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-days'>Days</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-l-none text-center md:rounded-r-none'
              type='text'
              id='delta-days'
              value={diffs[2]}
            />
          </div>
        </div>

        <div className='flex gap-0'>
          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-hours'>Hrs</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-r-none text-center md:rounded-l-none'
              type='text'
              id='delta-hours'
              value={diffs[3]}
            />
          </div>

          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-minutes'>Mins</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-none text-center'
              type='text'
              id='delta-minutes'
              value={diffs[4]}
            />
          </div>

          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-seconds'>Secs</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-none text-center'
              type='text'
              id='delta-seconds'
              value={diffs[5]}
            />
          </div>

          <div className='flex w-full flex-col items-center gap-1'>
            <Label htmlFor='delta-milliseconds'>Ms</Label>
            <Input
              readOnly
              className='bg-primary-foreground/25 rounded-l-none text-center'
              type='text'
              id='delta-milliseconds'
              value={diffs[6]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
