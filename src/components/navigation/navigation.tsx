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
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors duration-100 hover:bg-card hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}>
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
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
        <NavigationMenuItem className='left-auto right-0'>
          <NavigationMenuTrigger
            aria-label='Main Menu'
            className='px-4 focus:bg-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit'>
            <MenuIcon />
          </NavigationMenuTrigger>
          <NavigationMenuContent className='border-none'>
            <ul className='grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
              <li className='row-span-3'>
                <NavigationMenuLink asChild aria-label='Learning Resources'>
                  <Link
                    className='flex size-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/75 to-card p-6 no-underline outline-none focus:shadow-md'
                    to='/learning'>
                    <div className='mb-2 mt-4 text-lg font-medium'>
                      Learning Resources
                    </div>
                    <p className='text-sm leading-tight text-muted-foreground'>
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
