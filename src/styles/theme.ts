import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const styles = {
  global: (props: { colorMode: string }) => ({
    'html, body': {
      backgroundColor: props.colorMode === 'dark' ? 'blue.800' : 'blue.50',
      color: props.colorMode === 'dark' ? 'white' : 'blue.800',
    },
  }),
}
const colors = {
  brown: {
    50: '#EFEBE7',
    900: '#1A3424',
  },
  pink: {
    50: '#FFBFC6',
  },
  darkBlue: {
    900: '#09004B',
  },
}
const fonts = {
  body: '"Noto Sans JP", system-ui, serif',
  heading: '"Noto Sans JP", system-ui, serif',
}
const components = {
  Heading: {
    variants: {
      strong: {
        fontWeight: 'extrabold',
      },
    },
  },
}

const theme = extendTheme({ config, styles, colors, fonts, components })

export default theme
