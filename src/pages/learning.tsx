import ExternalLink from '@/components/shared/external-link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PropsWithChildren } from 'react'

function Section({
  children,
  title
}: PropsWithChildren<{
  title: string
}>) {
  return (
    <section className='flex flex-col gap-4'>
      <h3 className='text-center text-base uppercase text-card-foreground'>
        {title}
      </h3>
      {children}
    </section>
  )
}

function Paragraph({ children }: PropsWithChildren) {
  return <p className='text-justify text-sm'>{children}</p>
}

export default function Learning() {
  return (
    <Card className='border-none bg-gradient-to-b from-muted/75 to-card px-4'>
      <CardHeader className='mx-auto flex max-w-[800px] flex-col items-center justify-between gap-2 px-0 py-8'>
        <CardTitle>Learning Resources</CardTitle>
        <CardDescription className='text-justify text-sm'>
          This is a collection of courses and tutorials for learning web
          development that I found useful, broken down by category. I tried to
          include the best ones that cover the most important topics.
        </CardDescription>
      </CardHeader>

      <CardContent className='mx-auto flex max-w-[800px] flex-col items-center gap-y-8 px-0 text-muted-foreground'>
        <Section title='HTML and CSS'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/html-and-css-bootcamp'>
              The HTML and CSS Bootcamp
            </ExternalLink>{' '}
            - this is a new course developed by the same creator (
            <ExternalLink href='https://www.udemy.com/user/coltsteele/'>
              Colt Steele
            </ExternalLink>
            ) who made the most popular all-in-one{' '}
            <ExternalLink href='https://www.udemy.com/course/the-web-developer-bootcamp'>
              Web Developer Bootcamp
            </ExternalLink>{' '}
            on Udemy. This is the most complete and up-to-date course if you
            want to learn pure HTML and CSS. The original bootcamp is still
            great and covers more topics. However, some of the material is now
            outdated and is better presented in other courses.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/ui-design-bootcamp-master-typography-colour-grids'>
              UI Design Bootcamp: Master Typography, Color and Grids
            </ExternalLink>{' '}
            - explains the basics of design, composition, color and typography.
            Useful to be familiar with these concepts if you are doing front-end
            development. Even if you are using UI frameworks it helps to
            understand why some layouts look good and others don&apos;t. Also
            useful if you are working in a team with UI/UX designers.
          </Paragraph>
        </Section>

        <Section title='JavaScript'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/javascript-the-complete-guide-2020-beginner-advanced'>
              JavaScript: The Complete Guide
            </ExternalLink>{' '}
            - one of the best courses for learning regular JavaScript. It covers
            all the important topics of vanilla JS in more detail than
            you&apos;re likely to ever need. Covers all the new ES6+ syntax and
            browser APIs. This course is focused on teaching pure JavaScript. It
            does not get distracted by going into specific packages and
            frameworks. The creator (
            <ExternalLink href='https://www.udemy.com/user/maximilian-schwarzmuller/'>
              Maximilian Schwarzmüller
            </ExternalLink>
            ) is a top teacher on Udemy and this is his flagship product. It is
            updated every time a new version of ECMAScript gets released to
            cover all the new JavaScript features.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass'>
              JavaScript Algorithms and Data Structures Masterclass
            </ExternalLink>{' '}
            - all the skills you need to solve Leetcode-style coding challenges
            using regular JavaScript. Explains all the key computer science
            concepts like Big O notation, time and space complexity. Goes
            through implementing recursion and sorting algorithms. Explains how
            to work with common data structures like linked lists, queues,
            binary search trees and graphs. This is not required knowledge to be
            a JS developer but it&apos;s a common interview topic. Also, knowing
            these things will improve your problem-solving skills, helping you
            write better code.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/javascript-unit-testing-the-practical-guide'>
              JavaScript Unit Testing - The Practical Guide
            </ExternalLink>{' '}
            - explains how to write unit tests for your JavaScript projects and
            why you should consider writing them. Goes through the steps of
            setting up a test environment using modern tools like Vitest.
          </Paragraph>
        </Section>

        <Section title='TypeScript'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/typescript-course'>
              TypeScript Masterclass
            </ExternalLink>{' '}
            - best all-round course to learn TypeScript from scratch. Goes
            through each language feature step by step in a lot of detail. There
            is a project at the end that explains how to integrate TypeScript
            into a full-stack React + Node JS project. The author updates the
            course regularly as new TS versions come out.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.totaltypescript.com/workshops/typescript-pro-essentials'>
              Total TypeScript Pro Essentials
            </ExternalLink>{' '}
            - a very detailed TypeScript workshop, includes lots of interactive
            tutorials. The author is a major influencer and TypeScript expert.
            The workshop covers some lesser-known topics like writing
            declaration (.d.ts) files. The course is a bit on the expensive
            side, but there is a{' '}
            <ExternalLink href='https://www.totaltypescript.com/books/total-typescript-essentials'>
              free e-book
            </ExternalLink>{' '}
            that gives a summary of the key points and{' '}
            <ExternalLink href='https://www.totaltypescript.com/tutorials'>
              video tutorials
            </ExternalLink>{' '}
            on various TypeScript topics.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/advanced-typescript-bible'>
              Advanced TypeScript: Production-grade TypeScript Course
            </ExternalLink>{' '}
            - lots of questions and exercises covering very advanced topics like
            conditional types, mapped types, recursive types and type
            predicates. Discusses topics of assignability and covariance vs
            contravariance. It is useful if you are preparing for job interviews
            or need good TypeScript challenges when interviewing new members for
            your team.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/design-patterns-using-typescript'>
              TypeScript Design Patterns And SOLID Principles
            </ExternalLink>{' '}
            - object-oriented programming key concepts, SOLID principles, and
            design patterns explained with examples written in TypeScript. This
            is not mandatory to learn for most projects using TypeScript.
            However, it is essential knowledge for many other programming
            languages and a common interview question. There&apos;s a free
            website (
            <ExternalLink href='https://refactoring.guru/design-patterns'>
              Refactoring Guru
            </ExternalLink>
            ) that explains the same OOP principles in more general terms.
          </Paragraph>
        </Section>

        <Section title='React and Next JS'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/the-ultimate-react-course'>
              Ultimate React Course
            </ExternalLink>{' '}
            - hands down the best course available for learning both React and
            Next JS. All the code and example projects are done from scratch
            using the latest React and Next JS versions. Explains all the
            details of how React and Next JS work under the hood. Including the
            new features in React 19 and Next JS 14+ like server components,
            server actions and suspense. It also touches on popular tools like
            Redux, React Query, React Router and Supabase. There&apos;s a big
            project you can use for practice. Only drawback is that all examples
            are using JavaScript and not TypeScript. Other courses by{' '}
            <ExternalLink href='https://www.udemy.com/user/jonasschmedtmann/'>
              Jonas Schmedtmann
            </ExternalLink>{' '}
            are equally high quality.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://developedbyed.com/p/the-full-stack-react-course'>
              Ultimate Next JS Course
            </ExternalLink>{' '}
            - goes through more advanced topics like using TypeScript with React
            and Next JS. You build one big project and learn how to use the all
            the popular tools in the React/Next JS ecosystem. Like Next Auth
            (authentication), React Hook Form (forms), Zod (validation), Drizzle
            ORM (SQL query builder), and Zustand (modern state manager, Redux
            alternative). Also Tailwind CSS, ShadCN UI, Framer Motion and
            Recharts for styles and visualizations. Teaches how to integrate
            third party services like Stripe (payments), Resend (emails),
            Algolia (search), Neon DB (cloud SQL database) with your Next JS
            project. The course author has a large active{' '}
            <ExternalLink href='https://www.youtube.com/@developedbyed'>
              YouTube channel
            </ExternalLink>{' '}
            and updates his courses regularly.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/react-testing-library-and-jest'>
              React Testing Library and Jest: The Complete Guide
            </ExternalLink>{' '}
            - explains the correct way to write unit tests for React projects
            using React Testing Library. Assumes you are already familiar with
            writing tests for vanilla JS projects using Jest or Vitest.
          </Paragraph>
        </Section>

        <Section title='Node JS'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/understanding-nodejs-core-concepts'>
              Understanding Node JS: Core Concepts
            </ExternalLink>{' '}
            - best course on Udemy for Node JS. It goes into great detail about
            how Node JS works. Explains all the important concepts of back-end
            development - how servers work, networking, HTTP, events, threads
            and processes, data transfer using streams and buffers. Teaches you
            how to build a web server framework like Express JS from scratch
            using only low-level Node JS packages. You will be able to use any
            JavaScript web framework and understand how it works behind the
            scenes.
          </Paragraph>
        </Section>

        <Section title='Go'>
          <Paragraph>
            Go is a great choice for a second language to specialize in as a
            JavaScript developer. It is a new language invented in 2009 at
            Google. It was designed for cloud services and server-side web
            applications. It is a strongly typed compiled language similar to C
            and C++. This means it runs much faster and is more memory efficient
            compared to interpreted languages like JavaScript. It compiles to a
            binary and doesn&apos;t need a runtime. At the same time it is easy
            to learn and has a garbage collector. So you do not need to manually
            manage memory like you do with low-level languages. Its popularity
            keeps growing and a lot of the new exciting startup companies are
            using Go as the back-end for their web services.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.youtube.com/playlist?list=PLoILbKo9rG3skRCj37Kn5Zj803hhiuRK6'>
              Go Class by Matt Holiday
            </ExternalLink>{' '}
            - best series to learn fundamentals of the Go programming language.
            Available for free on YouTube and way better than the majority of
            paid courses out there. This is a purely theoretical class to go
            through how the language works. It does not cover packages or
            real-world projects, but it&apos;s a great starting point for
            learning Go and for deciding whether you should continue learning
            it.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/lets-build-a-go-version-of-laravel'>
              Let&apos;s Build a Go Version of Laravel - Part 1
            </ExternalLink>
            {' and '}
            <ExternalLink href='https://www.udemy.com/course/lets-build-a-go-version-of-laravel-part-two'>
              Part 2
            </ExternalLink>{' '}
            - all the courses by{' '}
            <ExternalLink href='https://www.udemy.com/user/trevor-sawler/'>
              Trevor Sawler
            </ExternalLink>{' '}
            are great. I think this one is the most useful overall. You build an
            MVC web framework from scratch with functionality similar to
            PHP&apos;s Laravel. It covers almost anything you might want to do
            with Go on a web server. Creating API endpoints, serving HTML
            templates, sending emails, connecting to databases, setting up a
            cache, uploading files, performing authentication, writing tests and
            creating a command line tool. Most of the code you write is
            universal and can easily be adapted for your own projects.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/working-with-concurrency-in-go-golang'>
              Working with Concurrency in Go
            </ExternalLink>{' '}
            - great concurrency support is the key feature that makes Go stand
            out from other programming languages. But the topic is confusing if
            you come from a JavaScript background. A lot of the concepts will be
            completely unfamiliar to you. This is the most detailed course on
            Go&apos;s concurrency model and its practical applications. It goes
            through all the key concepts like goroutines, waitgroups, mutexes
            and channels. There is a real-world project at the end to build a
            concurrent mailer app.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/working-with-design-patterns-in-go-golang'>
              Working with Design Patterns in Go
            </ExternalLink>{' '}
            - the Go language supports object-oriented programming but it is
            implemented in an unusual way. The classical design patterns used in
            OOP languages like Java and C# do not translate easily to Go. This
            course teaches the correct way to use design patterns in Go.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/leetcode-in-go-algorithms-coding-interview-questions'>
              50 days of LeetCode in Go: Algorithms Coding Interview
            </ExternalLink>{' '}
            - this course covers 50 data structures and algorithms coding
            challenges taken from interview questions given by Big Tech
            companies. It&apos;s good practice, whether or not you are trying to
            land a job at one of these places. There are multiple versions of
            the course available with answers to challenges in different
            programming languages.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/introduction-to-testing-in-go-golang'>
              Introduction to Testing in Go
            </ExternalLink>{' '}
            - there is very good testing package included as part of the Go
            standard library. Writing unit tests is recommended when developing
            with Go. This is the best and most complete course about writing
            tests in Go.
          </Paragraph>
        </Section>

        <Section title='PHP'>
          <Paragraph>
            Learning PHP is a good idea even if you don&apos;t plan to use this
            language as part of your stack. 75% of web servers are still running
            PHP. So you will end up having to work with PHP eventually. The
            benefits of PHP are its popularity, a mature ecosystem of frameworks
            and tools, a large library of built-in utility functions and good
            object-oriented programming support.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.youtube.com/playlist?list=PLr3d3QYzkw2xabQRUpcZ_IBk9W50M9pe-'>
              Learn PHP The Right Way
            </ExternalLink>{' '}
            - this is the best and most complete PHP course on the internet. And
            it&apos;s available for free on YouTube. This course will teach you
            the fundamentals of PHP in great detail. It is more than enough
            knowledge to jump into any PHP framework or tool that you need to
            use.
          </Paragraph>
        </Section>

        <Section title='Cloud and Microservices'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/docker-complete'>
              Docker and Kubernetes: The Complete Practical Guide
            </ExternalLink>{' '}
            - Docker is becoming a mandatory technology for professional web
            development. Kubernetes is useful to know about, depending on your
            role and the company you work for. This course covers both. It
            covers useful real-world projects, for example deploying a Node JS
            server with a MongoDB database, or a containerized WordPress site.
            It doesn&apos;t cover everything but it will give you a solid
            foundation and the confidence to use containers in your own
            projects.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/aws-cloud-practitioner-complete-aws-introduction'>
              AWS Certified Cloud Practitioner
            </ExternalLink>{' '}
            - most modern web applications are built using a cloud service
            provider, AWS being the most popular one by far. This is an
            introductory course. It is like a guided tour of all the services
            AWS has to offer. Cloud infrastructure is a separate discipline all
            by itself and a very deep rabbit hole. There are certifications and
            more advanced courses you can take. This course is a good starting
            point.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/microservices-with-nodejs-react-typescript-and-kubernetes'>
              Microservices with NodeJS, React, TypeScript and Kubernetes
            </ExternalLink>{' '}
            - practice building a large microservices application. It&apos;s
            better to go through this course after you are already familiar with
            other topics on this list. The instructor doesn&apos;t hold your
            hand and assumes that you are familiar with all the technologies
            being used, like TypeScript, React, Node JS, databases, Docker,
            Kubernetes, AWS. This course is massive, and just the videos are
            almost 100 hours long. But it&apos;s a good investment if you want
            to learn the entire process of building a microservices application
            from the ground up. Especially how the cloud infrastructure is set
            up, how all the components are connected and how they communicate
            with each other. How to set up services like Jenkins for the
            deployment pipeline, Elasticsearch with Kibana to collect logs, and
            Prometheus and Grafana for monitoring resources. How to spin up a
            Kubernetes cluster and use the Docker container registry. How to
            publish private custom NPM packages and use them in your services.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/working-with-microservices-in-go'>
              Working with Microservices in Go
            </ExternalLink>{' '}
            - different approach to writing microservices. Build an app using Go
            as the back-end. Explains how to deploy Go microservices without
            relying on frameworks. Gives examples of how to set up messaging
            using a regular REST API as well as with RabbitMQ, Go RPC and gRPC.
            Learn how to deploy with Docker Swarm or Kubernetes.
          </Paragraph>
        </Section>

        <Section title='Clean Code'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/writing-clean-code'>
              Clean Code
            </ExternalLink>{' '}
            - the best introductory course about clean code. Teaches the
            fundamentals of creating readable and maintainable code. Shows
            common pitfalls and how to fix them. Most of the examples are
            written in JavaScript but the material is programming
            language-agnostic. Will teach you many &quot;quick wins&quot; -
            things that are easy to learn and implement that will substantially
            improve the quality of your code.
          </Paragraph>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/write-better-code-20-code-smells-how-to-fix-them'>
              Write Clean Code: 20 Code Smells and How to Get Rid of Them
            </ExternalLink>{' '}
            - an overview of the 20 most common bad code anti-patterns
            (&quot;code smells&quot;) and how to recognize, fix and avoid them.
            These patterns often indicate badly structured code. They are not
            technically wrong but can slow down development and make it easy to
            introduce bugs in the future. The idea was made popular in the
            classic 1999 book{' '}
            <ExternalLink href='https://a.co/d/11QNGid'>
              Refactoring: Improving the Design of Existing Code
            </ExternalLink>
            . This course contains videos and coding exercises based on the
            material in the book. The examples are using TypeScript but the
            advice is applicable to any object-oriented programming language.
          </Paragraph>
        </Section>

        <Section title='Git and Version Control'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/git-and-github-bootcamp'>
              The Git and GitHub Bootcamp
            </ExternalLink>{' '}
            - being able to use Git and GitHub for version control is a
            must-know skill for any software development. This course is the
            most complete one out there. It goes over all the key features,
            including the more advanced and obscure ones like git reflog and
            writing custom aliases.
          </Paragraph>
        </Section>

        <Section title='Databases'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/complete-sql-databases-bootcamp-zero-to-mastery'>
              Complete SQL and Databases Bootcamp
            </ExternalLink>{' '}
            - covers the basics of databases and SQL without taking up too much
            of your time. There are better courses out there that go into more
            detail on specific topics and database types. But this one is the
            best introduction and starting point.
          </Paragraph>

          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/database-engines-crash-course'>
              Fundamentals of Database Engineering
            </ExternalLink>{' '}
            - a deep dive into the inner workings of databases. Explains key
            concepts like transactions, ACID, isolation levels, locks and
            concurrency control. Discusses how databases store records in memory
            and on disk, what happens during reads and writes, how indexes work
            and the data structures they use. There are many practical exercises
            where you work with big tables, plan, evaluate and optimize SQL
            queries. This course will help you make intelligent decisions about
            which database technologies to use, how to structure tables and
            write performant queries.
          </Paragraph>
        </Section>

        <Section title='Linux'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/master-linux-administration'>
              Linux Administration: The Complete Linux Bootcamp
            </ExternalLink>{' '}
            - you can get away with doing web development without knowing Linux,
            but it will put you at a big disadvantage. It will severely limit
            your options regarding the tools you can use and the jobs you are
            comfortable doing. This course covers all the important topics -
            setting up a Linux machine, using the command line, using package
            managers and common tools. There is a second part to this course
            where you practice setting up different Linux servers (
            <ExternalLink href='https://www.udemy.com/course/linux-administration-build-hands-on-linux-projects'>
              Linux Administration: Build 5 Hands-On Linux Projects
            </ExternalLink>
            ). It&apos;s not required, but it expands on the material in the
            first part and gives you real-world examples to experiment with.
          </Paragraph>
        </Section>

        <Section title='End to End Testing Automation'>
          <Paragraph>
            <ExternalLink href='https://www.udemy.com/course/cypress-io-master-class'>
              The Complete Cypress Course
            </ExternalLink>{' '}
            - being able to run automated end-to-end tests is a very useful
            skill to have. Cypress is a popular end-to-end testing framework. If
            you are familiar with JavaScript and writing unit tests using tools
            like Jest, Cypress should be easy to learn. This course is the most
            detailed Cypress course on Udemy and goes into all the important
            topics. You can use Cypress to run automated tests on any website.
            Both on your machine as well as inside a headless browser on a CI/CD
            server. It can also be used for web scraping.
          </Paragraph>
        </Section>
      </CardContent>
    </Card>
  )
}
