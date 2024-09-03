import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useRouter } from '@tanstack/react-router'

export default function NotFound() {
  const router = useRouter()
  return (
    <Card className='size-full border-none bg-gradient-to-b from-muted/75 to-card'>
      <CardHeader className='mx-auto flex flex-col items-center justify-between gap-y-1'>
        <CardTitle>Something went wrong</CardTitle>
        <CardDescription className='text-sm'>
          The page you are looking for does not exist.
        </CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col items-center gap-y-8'>
        <Button onClick={() => router.history.back()}>Go Back</Button>
      </CardContent>
    </Card>
  )
}
