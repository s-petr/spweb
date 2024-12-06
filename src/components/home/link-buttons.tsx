import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/shadcn'
import { PropsWithChildren } from 'react'
import {
  CvIcon,
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  SkypeIcon
} from '../shared/icons'

function ContactLink({
  children,
  href,
  tooltip,
  className,
  rel = 'noreferrer',
  obfuscate = false
}: PropsWithChildren<{
  href: string
  tooltip?: string
  className?: string
  rel?: string
  obfuscate?: boolean
}>) {
  const linkStyle =
    'flex cursor-pointer items-center gap-2 text-lg transition-all ease-in-out hover:scale-105 active:scale-100'
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger aria-label={tooltip}>
          {obfuscate ? (
            <div
              className={cn(linkStyle, className)}
              onClick={() => window.open(atob(href), '_blank')}>
              {children}
            </div>
          ) : (
            <a
              target='_blank'
              rel={rel}
              aria-label={tooltip}
              className={cn(linkStyle, className)}
              href={href}>
              {children}
            </a>
          )}
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent className='px-1 py-0.5'>
            <p className='text-xs'>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default function LinkButtons() {
  return (
    <nav className='flex flex-row items-end justify-center gap-8'>
      <ContactLink
        href='https://linkedin.com/in/spetr'
        tooltip='LinkedIn Profile'>
        <LinkedInIcon />
      </ContactLink>
      <ContactLink
        href='/cv/Sergei Petrov CV.pdf'
        tooltip='Download CV PDF'
        rel='noreferrer nofollow'
        className='plausible-event-name--cv'>
        <CvIcon />
      </ContactLink>
      <ContactLink href='https://github.com/s-petr' tooltip='GitHub Profile'>
        <GitHubIcon />
      </ContactLink>
      <ContactLink
        obfuscate
        href='aHR0cHM6Ly9qb2luLnNreXBlLmNvbS9pbnZpdGUvT0ZOT2ZQbUlwN1cx'
        tooltip='Skype Chat'>
        <SkypeIcon />
      </ContactLink>
      <ContactLink
        obfuscate
        href='bWFpbHRvOnNlcmdlaS5wZXRyb3ZAc3B3ZWIuZGV2'
        tooltip='Send Email'>
        <EmailIcon />
      </ContactLink>
    </nav>
  )
}
