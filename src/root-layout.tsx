import Navigation from '@/components/navigation/navigation'
import { Outlet } from '@tanstack/react-router'
import Footer from './components/footer/footer'

export default function RootLayout() {
  return (
    <div className='flex flex-col justify-between gap-4 px-4 py-2 md:h-dvh'>
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}
