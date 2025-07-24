import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { CircleChevronUpIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

export default function ScrollToTopButton() {
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
      <div className='flex w-full items-center'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant='link'
                className='text-muted-foreground mx-auto mb-2 size-8 cursor-pointer items-center gap-1 rounded-full p-0 transition-all ease-in-out hover:scale-105 hover:no-underline active:scale-100'
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
      </div>
    )
  )
}
