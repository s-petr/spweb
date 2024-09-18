import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/shadcn'

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      className={cn('size-8', className)}>
      <path
        d='M2 1C1.44772 1 1 1.44772 1 2V13C1 13.5523 1.44772 14 2 14H13C13.5523 14 14 13.5523 14 13V2C14 1.44772 13.5523 1 13 1H2ZM3.05 6H4.95V12H3.05V6ZM5.075 4.005C5.075 4.59871 4.59371 5.08 4 5.08C3.4063 5.08 2.925 4.59871 2.925 4.005C2.925 3.41129 3.4063 2.93 4 2.93C4.59371 2.93 5.075 3.41129 5.075 4.005ZM12 8.35713C12 6.55208 10.8334 5.85033 9.67449 5.85033C9.29502 5.83163 8.91721 5.91119 8.57874 6.08107C8.32172 6.21007 8.05265 6.50523 7.84516 7.01853H7.79179V6.00044H6V12.0047H7.90616V8.8112C7.8786 8.48413 7.98327 8.06142 8.19741 7.80987C8.41156 7.55832 8.71789 7.49825 8.95015 7.46774H9.02258C9.62874 7.46774 10.0786 7.84301 10.0786 8.78868V12.0047H11.9847L12 8.35713Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'></path>
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className={cn('size-8', className)}>
      <path d='M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z' />
      <path d='M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z' />
    </svg>
  )
}

function CvIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      version='1.1'
      viewBox='0 0 448 512'
      fill='currentColor'
      className={cn('size-8', className)}>
      <g>
        <path
          d='M 48 32 C 21.5 32 0 53.5 0 80 L 0 432 C 0 458.5 21.5 480 48 480 L 400 480 C 426.5 480 448 458.5 448 432 L 448 80 C 448 53.5 426.5 32 400 32 L 48 32 z M 146.88086 165.23438 C 166.51551 165.23438 183.96176 172.02263 196.80859 182.20508 C 208.68854 191.6569 214.25262 201.11234 219.10742 209.59766 L 185.18359 226.54688 C 182.75692 220.98152 179.83663 215.15976 172.33789 208.86523 C 164.0899 202.3133 155.85965 200.38086 148.81445 200.38086 C 121.18778 200.38086 106.64453 226.07442 106.64453 254.66797 C 106.64453 292.24121 125.80523 310.88867 148.81445 310.88867 C 171.11309 310.88867 180.09182 295.37817 185.89453 285.45312 L 219.59961 302.66016 C 213.28505 312.58559 207.22637 322.29529 193.65039 331.72852 C 186.3879 336.8192 169.67288 346.76562 145.91406 346.76562 C 100.58611 346.76562 64 313.80959 64 255.87109 C 64 205.2352 98.415334 165.23438 146.88086 165.23438 z M 222.36328 170.5625 L 267.92773 170.5625 L 303.31055 292.24023 L 338.43555 170.5625 L 384 170.5625 L 324.62109 341.67383 L 281.00977 341.67383 L 222.36328 170.5625 z '
          id='path2'
        />
      </g>
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='currentColor'
      className={cn('size-8', className)}>
      <path
        d='M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'></path>
    </svg>
  )
}

function SkypeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='15'
      width='15'
      version='1.1'
      id='Layer_1'
      fill='currentColor'
      className={cn('size-8', className)}
      viewBox='0 0 300 300'>
      <g id='XMLID_818_'>
        <path
          id='XMLID_819_'
          d='M289.391,181.848c2.133-9.755,3.268-19.881,3.268-30.273c0-77.917-63.166-141.084-141.086-141.084
          c-8.226,0-16.286,0.711-24.128,2.064C114.836,4.611,99.918,0,83.916,0C38.728,0,2.097,36.635,2.097,81.816
          c0,15.104,4.109,29.24,11.246,41.385c-1.871,9.166-2.854,18.653-2.854,28.373c0,77.917,63.165,141.084,141.084,141.084
          c8.826,0,17.459-0.817,25.834-2.367c11.518,6.19,24.688,9.709,38.678,9.709c45.189,0,81.818-36.631,81.818-81.816
          C297.903,205.127,294.83,192.797,289.391,181.848z M223.932,218.998c-6.527,9.236-16.17,16.555-28.664,21.749
          c-12.373,5.143-27.205,7.751-44.088,7.751c-20.264,0-37.253-3.564-50.513-10.598c-9.479-5.121-17.296-12.056-23.229-20.613
          c-5.993-8.645-9.033-17.223-9.033-25.494c0-5.17,1.98-9.652,5.886-13.32c3.865-3.636,8.818-5.478,14.724-5.478
          c4.848,0,9.029,1.456,12.429,4.328c3.247,2.752,6.034,6.824,8.273,12.083c2.5,5.726,5.226,10.561,8.105,14.369
          c2.767,3.663,6.748,6.742,11.832,9.145c5.115,2.422,12.01,3.649,20.491,3.649c11.663,0,21.226-2.49,28.419-7.402
          c7.025-4.797,10.441-10.555,10.441-17.604c0-5.57-1.783-9.947-5.449-13.382c-3.84-3.591-8.904-6.386-15.055-8.303
          c-6.412-1.999-15.117-4.155-25.884-6.409c-14.586-3.124-26.985-6.83-36.86-11.019c-0.038-0.015-0.077-0.031-0.115-0.048
          c-10.117-4.303-18.271-10.27-24.236-17.736c-6.059-7.582-9.129-17.094-9.129-28.275c0-10.658,3.223-20.265,9.58-28.552
          c6.309-8.229,15.523-14.624,27.385-19.012c11.709-4.33,25.637-6.524,41.396-6.524c12.6,0,23.678,1.455,32.924,4.33
          c9.299,2.896,17.139,6.807,23.299,11.619c6.205,4.848,10.82,10.035,13.719,15.422c2.928,5.441,4.412,10.856,4.412,16.094
          c0,5.041-1.947,9.622-5.787,13.615c-3.863,4.016-8.738,6.055-14.49,6.055c-5.225,0-9.314-1.275-12.152-3.789
          c-2.641-2.334-5.379-5.973-8.42-11.209c-3.518-6.684-7.775-11.953-12.66-15.666c-4.74-3.606-12.666-5.437-23.555-5.437
          c-10.113,0-18.338,2.03-24.445,6.034c-5.885,3.858-8.744,8.282-8.744,13.523c0,3.215,0.92,5.901,2.813,8.213
          c2.005,2.449,4.833,4.6,8.408,6.388c3.708,1.864,7.529,3.345,11.357,4.402c3.921,1.088,10.5,2.7,19.522,4.784
          c9.506,2.041,18.359,4.289,26.418,6.695c1.619,0.483,3.219,0.972,4.771,1.468c9.395,3.007,17.514,6.716,24.135,11.022
          c6.758,4.401,12.109,10.053,15.906,16.8c3.807,6.771,5.736,15.132,5.736,24.844C233.803,199.135,230.481,209.727,223.932,218.998z'
        />
      </g>
    </svg>
  )
}

function ContactLink({
  children,
  href,
  tooltip,
  className,
  rel = 'noreferrer',
  obfuscate = false
}: {
  children: React.ReactNode
  href: string
  tooltip?: string
  className?: string
  rel?: string
  obfuscate?: boolean
}) {
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