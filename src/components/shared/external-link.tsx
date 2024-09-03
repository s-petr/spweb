import { cn } from '@/lib/shadcn'

export default function ExternalLink({
  children,
  href,
  className
}: {
  children: React.ReactNode
  href: string
  className?: string
}) {
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
