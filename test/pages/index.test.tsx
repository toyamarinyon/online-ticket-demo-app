import React from 'react'
import IndexPage from 'pages/index'
import { render } from '@test/test-support'

test('indexページが表示される', () => {
  const {getByRole} = render(<IndexPage />)
  expect(getByRole('heading')).toHaveTextContent('Welcome to Next.js!')
})
