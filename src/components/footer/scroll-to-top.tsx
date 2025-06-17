import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/shadcn'
import { CircleChevronUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export default function ScrollToTopButton({
  className
}: {
  className?: string
}) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.scrollY > 400) {
        setShowButton(true)
      } else if (showButton && window.scrollY <= 400) {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', checkScrollHeight)
    return () => window.removeEventListener('scroll', checkScrollHeight)
  }, [showButton])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    showButton && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='link'
              className={cn(
                'text-muted-foreground mb-2 size-8 items-center gap-1 rounded-full p-0 transition-all ease-in-out hover:scale-105 hover:no-underline active:scale-100',
                className
              )}
              disabled={!showButton}
              onClick={scrollToTop}>
              <CircleChevronUpIcon size={32} />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='px-1 py-0.5'>
            <p className='text-xs'>Back to Top</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  )
}
