import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = loadStripe(
  `${"pk_test_51JDzqaLFcMnjeViH27w3hFvjICbkJQ7xnxFgFDcnZ4QpcIOoGBYwpHiF7XJebglSzj7RCKqO7gqW0bBK7Si80hEY00EXQy8sRn"}`
);
