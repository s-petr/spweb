import ExternalLink from '../shared/external-link'
import ScrollToTopButton from './scroll-to-top'

export default function Footer() {
  return (
    <>
      <ScrollToTopButton className='mx-auto' />
      <footer className='grid grid-cols-1 px-2 pb-2 text-xs text-muted-foreground md:mt-auto md:grid-cols-3'>
        <p className='text-center md:text-left'>
          © {new Date().getFullYear()} Sergei Petrov
        </p>{' '}
        <p className='text-center'>
          Hosted with{' '}
          <ExternalLink href='https://coolify.io/'>Coolify</ExternalLink> on a{' '}
          <ExternalLink href='https://www.hetzner.com/cloud'>
            Hetzner VPS
          </ExternalLink>
        </p>
        <p className='text-center md:text-right'>
          Website{' '}
          <ExternalLink href='https://github.com/s-petr/spweb'>
            source code
          </ExternalLink>
        </p>
      </footer>
    </>
  )
}
