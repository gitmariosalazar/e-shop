import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { type } from "os";
import { ToastCustom } from "@/utils/ToastMessage";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing the stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return res.status(400).send("Webhook error " + error);
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        await prisma?.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "complete",
            address: {
              set: {
                city: charge.shipping?.address?.city || "",
                country: charge.shipping?.address?.country || "",
                line1: charge.shipping?.address?.line1 || "",
                line2: charge.shipping?.address?.line2 || "",
                postalCode: charge.shipping?.address?.postal_code || "",
                state: charge.shipping?.address?.state || "",
              },
            },
          },
        });
      }
      ToastCustom(
        "success",
        "Pay order successfully!",
        "Message Pay",
        "top-center"
      );
      break;
    default:
      console.log("Unhandled event type: " + event.type);
  }
  res.json({ received: true });
}
