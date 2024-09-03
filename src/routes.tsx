import { InputDataType, inputDataTypes } from '@/lib/input-type-label'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import TimestampTool from '@/pages/timestamp'
import RootLayout from '@/root-layout'
import {
  createRootRoute,
  createRoute,
  createRouter
} from '@tanstack/react-router'
import BulkLinks from './pages/bulk-links'
import Formatter from './pages/formatter'
import Learning from './pages/learning'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound
})

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home
})

const learningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/learning',
  component: Learning
})

const formatterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/formatter',
  validateSearch: (
    search: Record<string, unknown>
  ): { type?: InputDataType } => {
    const isInputDataType = (type: unknown): type is InputDataType =>
      inputDataTypes && inputDataTypes.includes(type as InputDataType)
    return { type: isInputDataType(search.type) ? search.type : undefined }
  },

  component: Formatter
})

const timestampRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timestamp',
  component: TimestampTool
})

const bulkLinkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/bulk-links',
  component: BulkLinks
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  learningRoute,
  formatterRoute,
  timestampRoute,
  bulkLinkRoute
])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router
