import LinkButtons from '@/components/home/link-buttons'
import { Card, CardContent } from '@/components/ui/card'

export default function Home() {
  return (
    <Card className='size-full border-none bg-gradient-to-b from-muted/75 to-card px-4 py-8'>
      <CardContent className='flex flex-col items-center gap-y-8 px-0'>
        <LinkButtons />

        <section className='flex max-w-[800px] flex-col gap-8 text-justify text-lg'>
          <p>
            I am a Web Developer and IT Operations specialist with over five
            years of experience building, testing and maintaining online payment
            systems. With a proven track record of resolving complex technical
            challenges, I have played key roles in product development, project
            management and technical support.
          </p>

          <p>
            Building full-stack web applications is my primary focus. I enjoy
            experimenting with new tech stacks and staying up-to-date with the
            latest web technologies, tools, and design patterns. The JavaScript
            and TypeScript ecosystem is my area of expertise. I am also
            proficient in languages like Go for back-end development and PHP for
            supporting legacy systems.
          </p>

          <p>
            Simplicity and freedom are the core principles that guide my
            personal philosophy. I prefer using simple, open-source, and
            self-hosted solutions. I steer clear of unnecessary complexity and
            avoid an over-reliance on proprietary third-party services. My goal
            is to create products that solve problems efficiently. I want to
            write code that is easy to understand, maintain, and reuse.
          </p>

          <p>
            Having completed my university education in the United Kingdom, I am
            bilingual in English and Russian. My professional experience spans
            multiple industries such as chemistry, data analytics and online
            payments. I am a second-generation immigrant with roots in Russia
            and Ukraine who has lived and worked in multiple cities across
            Western Europe, currently based in Cyprus.
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
