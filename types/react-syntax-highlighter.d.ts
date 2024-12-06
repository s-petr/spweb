import { SyntaxHighlighterProps } from 'react-syntax-highlighter'

declare module 'react-syntax-highlighter' {
  export const Light: ComponentType<PropsWithChildren<SyntaxHighlighterProps>>
}
