import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
// import { ThemeProvider } from "my-ui-lib"
// import { TranslationProvider } from "my-i18n-lib"
// import defaultStrings from "i18n/en-x-default"
import { loadEnvConfig } from '@next/env'

// @ts-ignore
const Providers = ({ children }) => {
  return children
  // return (
  //   <ThemeProvider theme="light">
  //     <TranslationProvider messages={defaultStrings}>
  //       {children}
  //     </TranslationProvider>
  //   </ThemeProvider>
  // )
}

// @ts-ignore
const customRender = (ui, options = {}) => {
  const projectDir = process.cwd()
  loadEnvConfig(projectDir)
  // @ts-ignore
  return render(ui, { wrapper: Providers, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
