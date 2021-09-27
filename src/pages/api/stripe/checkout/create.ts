import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import path from 'path'
import { getUserByRequest } from 'lib/auth/server/get-user'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2020-08-27',
})

async function CreateCheckout(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserByRequest(req)
  if (!user) {
    res.send(404)
    return
  }
  const prices = await stripe.prices.list({
    product: process.env.STRIPE_PRODUCT_ID,
  })
  const price = prices.data[0]
  const protocol = process.env['NODE_ENV'] === 'development' ? 'http' : 'https'
  const url = path.join(process.env['HOST'] || '')
  const stripeSessionParams: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ['card'],
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${protocol}://${url}`,
    cancel_url: `${protocol}://${url}`,
    client_reference_id: `${user.id}`,
    allow_promotion_codes: true,
  }
  stripeSessionParams.customer_email = user.email
  const stripeSession = await stripe.checkout.sessions.create(
    stripeSessionParams
  )
  res.json({ id: stripeSession.id })
}

export default CreateCheckout
