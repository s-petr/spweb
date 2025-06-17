import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/shadcn'
import { Link } from '@tanstack/react-router'
import { MenuIcon } from 'lucide-react'
import React from 'react'
import Logo from './logo'

function MenuItem({
  children,
  to,
  title,
  className
}: {
  children: React.ReactNode
  to: string
  title: string
  className?: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          to={to}
          aria-label={title}
          className={cn(
            'hover:bg-card hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors duration-100 select-none',
            className
          )}>
          <div className='text-sm leading-none font-medium'>{title}</div>
          <p className='text-muted-foreground line-clamp-2 text-sm leading-snug'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default function Navigation() {
  return (
    <NavigationMenu className='max-h-14 max-w-full justify-between py-2'>
      <Link aria-label='Home Page' to='/' className='px-4'>
        <Logo className='w-64 sm:w-72' />
      </Link>

      <NavigationMenuList>
        <NavigationMenuItem className='right-0 left-auto'>
          <NavigationMenuTrigger
            aria-label='Main Menu'
            className='px-4 focus:bg-inherit data-active:bg-inherit data-[state=open]:bg-inherit'>
            <MenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='border-none'>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild aria-label='Learning Resources'>
                  <Link
                    className='from-muted/75 to-card flex size-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md'
                    to='/learning'>
                    <div className='mt-4 mb-2 text-lg font-medium'>
                      Learning Resources
                    </div>
                    <p className='text-muted-foreground text-sm leading-tight'>
                      Collection of links to courses and tutorials
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <MenuItem to='/formatter' title='Code Formatter'>
                Automatically detect and format JS/TS, HTML, CSS, JSON, XML and
                URLs
              </MenuItem>
              <MenuItem to='/timestamp' title='Timestamp Tool'>
                Convert, create and compare timestamps
              </MenuItem>
              <MenuItem to='/bulk-links' title='Bulk Link Builder'>
                Generate lists of links from a template
              </MenuItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
