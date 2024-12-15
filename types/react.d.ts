import 'react'

declare module 'react' {
  interface JSX extends React.ReactElement<any, any> {}
}
