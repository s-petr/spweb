import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { normalizeSearchString } from '@/lib/datetime'
import { cn } from '@/lib/shadcn'
import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

interface Option<T> {
  value: T
  label: string
}

interface AutoCompleteProps<T> {
  value: T | undefined
  onChange: (value: T) => void
  options: Option<T>[]
  placeholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  search?: string
  onSearchChange?: (value: string) => void
  getKeyFn?: (option: Option<T>) => string
}

export default function AutoComplete<T>({
  value,
  onChange,
  options = [],
  placeholder = 'Select option...',
  emptyMessage = 'No results found.',
  disabled = false,
  className,
  search = '',
  onSearchChange,
  getKeyFn = (option) => String(option.value)
}: AutoCompleteProps<T>) {
  const [open, setOpen] = React.useState(false)

  const selectedLabel = options.find((opt) => opt.value === value)?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'hover:bg-card h-10 w-full justify-between px-2 font-normal',
            className
          )}>
          <span className='truncate'>{selectedLabel || placeholder}</span>
          <ChevronsUpDown className='ml-2 size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-(--radix-popover-trigger-width) p-0'
        align='start'>
        <Command
          filter={(itemValue, search) =>
            normalizeSearchString(itemValue).includes(
              normalizeSearchString(search)
            )
              ? 1
              : 0
          }>
          <CommandInput
            value={search}
            placeholder={placeholder}
            className='h-9'
            onValueChange={onSearchChange}
          />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={getKeyFn(option)}
                  value={option.label}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}>
                  {option.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
