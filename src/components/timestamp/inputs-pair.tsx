import { cn } from '@/lib/shadcn'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'

export default function InputsPair({
  valueStart,
  valueEnd,
  errorStart = false,
  errorEnd = false,
  label,
  className,
  placeholder,
  onChangeStart,
  onChangeEnd
}: {
  valueStart: string
  valueEnd: string
  errorStart?: boolean
  errorEnd?: boolean
  label?: string
  className?: string
  placeholder?: string
  onChangeStart?: (input: string) => void
  onChangeEnd?: (input: string) => void
}) {
  const handleEscKeyPress = (
    field: 'start' | 'end',
    event: React.KeyboardEvent
  ) => {
    if (event.key !== 'Escape') return
    if (field === 'start') {
      if (onChangeStart && valueStart) onChangeStart('')
    } else {
      if (onChangeEnd && valueEnd) onChangeEnd('')
    }
  }

  return (
    <div className='flex flex-col gap-y-2'>
      {!!label && <Label>{label}</Label>}
      <div className='flex flex-col gap-2 md:flex-row md:gap-0'>
        <Input
          readOnly={!onChangeStart}
          aria-label={`Start Date - ${label ?? 'input'}`}
          className={cn(
            'bg-primary-foreground/25 md:rounded-r-none',
            errorStart && 'focus-visible:ring-destructive/50',
            className
          )}
          type='text'
          placeholder={placeholder}
          value={valueStart}
          onKeyUp={handleEscKeyPress.bind(null, 'start')}
          onChange={(e) => onChangeStart && onChangeStart(e.target.value)}
        />
        <Input
          readOnly={!onChangeEnd}
          aria-label={`End Date - ${label ?? 'input'}`}
          className={cn(
            'bg-primary-foreground/25 md:rounded-l-none md:text-right',
            errorEnd && 'focus-visible:ring-destructive/50',
            className
          )}
          type='text'
          placeholder={placeholder}
          value={valueEnd}
          onKeyUp={handleEscKeyPress.bind(null, 'end')}
          onChange={(e) => onChangeEnd && onChangeEnd(e.target.value)}
        />
      </div>
    </div>
  )
}
