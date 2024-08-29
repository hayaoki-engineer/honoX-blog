import { css } from 'hono/css'
import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import TestPage from '../islands/test'

const className = css`
  font-family: sans-serif;
`

export default createRoute((c) => {
  const name = c.req.query('name')
  console.log('クエリパラメーター', name)

  return c.render(
    <div class={className}>
      <h1>Hello, {name}!</h1>
      <Counter />
      <TestPage />
    </div>,
    { title: name }
  )
})
