import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ''
)
export async function createCheckout(jwtToken: string) {
  const stripe = await stripePromise

  // Call backend to create the Checkout Session
  const response = await fetch('/api/stripe/checkout/create', {
    method: 'POST',
    headers: {
      Authorization: `Bearer: ${jwtToken}`,
    },
  })

  const stripeSession = await response.json()

  // When the customer clicks on the button, redirect them to Checkout.
  // @ts-ignore stipe が nullの時の例外処理
  const result = await stripe.redirectToCheckout({
    sessionId: stripeSession.id,
  })

  if (result.error) {
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `result.error.message`.
  }
}
