import ExternalLink from '../shared/external-link'
import { GitHubIcon } from '../shared/icons'
import ScrollToTopButton from './scroll-to-top'

export default function Footer() {
  return (
    <footer className='md:mt-auto'>
      <ScrollToTopButton />
      <div className='text-muted-foreground grid grid-cols-1 gap-0.5 px-2 pb-2 text-xs md:grid-cols-3'>
        <p className='text-center md:text-left'>
          © {new Date().getFullYear()} Sergei Petrov
        </p>{' '}
        <p className='text-center'>
          Hosted with{' '}
          <ExternalLink href='https://dokploy.com'>Dokploy</ExternalLink> on a{' '}
          <ExternalLink href='https://www.hetzner.com/cloud'>
            Hetzner VPS
          </ExternalLink>
        </p>
        <p className='flex gap-1 justify-self-center md:justify-self-end'>
          <GitHubIcon className='text-muted-foreground size-4' />
          <ExternalLink href='https://github.com/s-petr/spweb'>
            Source code
          </ExternalLink>
        </p>
      </div>
    </footer>
  )
}
