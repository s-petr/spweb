import { cn } from '@/lib/shadcn'
import { PropsWithChildren } from 'react'

export default function ExternalLink({
  children,
  href,
  className
}: PropsWithChildren<{
  href: string
  className?: string
}>) {
  return (
    <a
      href={href}
      className={cn('font-medium text-card-foreground', className)}
      target='_blank'
      rel='noreferrer'>
      {children}
    </a>
  )
}
