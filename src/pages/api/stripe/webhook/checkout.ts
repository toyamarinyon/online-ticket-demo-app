import type { NextApiRequest, NextApiResponse } from 'next'
import { buffer } from 'micro'
import prismaClient from 'lib/prisma/client'

import Stripe from 'stripe'
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY
async function CheckoutWebhook(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature']

  const buf = await buffer(req)
  let event: Stripe.Event

  try {
    // @ts-ignore
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
  } catch (err) {
    if (err instanceof Error) {
      // On error, log and return the error message
      console.log(`â Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
    }
    return
  }

  // Cast event data to Stripe object
  if (event.type === 'payment_intent.succeeded') {
    const stripeObject: Stripe.PaymentIntent = event.data
      .object as Stripe.PaymentIntent
    console.log(`ð° PaymentIntent status: ${stripeObject.status}`)
  } else if (event.type === 'charge.succeeded') {
    const charge = event.data.object as Stripe.Charge
    console.log(`ðµ Charge id: ${charge.id}`)
  } else if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session
    console.log(`ðµ CheckoutSession id: ${checkoutSession.id}`)
    await prismaClient.order.create({
      data: {
        // @ts-ignore checkoutSession.client_reference_id ã nullã®æã®ä¾å¤å¦ç
        userId: parseInt(checkoutSession.client_reference_id),
        paymentMethod: 'stripe',
        paymentStatus: 'paid',
        paymentId: checkoutSession.id,
        paidAmount: checkoutSession.amount_total || 0,
      },
    })
  } else {
    console.warn(`ð¤·ââï¸ Unhandled event type: ${event.type}`)
  }
  res.send(200)
}

export default CheckoutWebhook
