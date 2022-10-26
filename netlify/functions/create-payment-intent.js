require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_SECRET_KEY);

exports.handler = async (event) => {
  console.log(event.body);
  try {
    const { amount, personalFields, addressFields } = JSON.parse(event.body);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
      shipping: {
        address: {
          city: addressFields.city,
          line1: addressFields.line1,
          state: addressFields.state,
          postal_code: addressFields.postal_code,
        },
        name: personalFields.name,
      },
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
