import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";

type personalFieldsType = {
  name: string | undefined,
  email: string,
}

type addressFieldsType = {
  line1: string,
  city: string,
  state: string,
  postal_code: string,
}

const personalFieldsDefault: personalFieldsType = {
  name: "",
  email: "",
}

const addressFieldsDefault: addressFieldsType = {
    line1: "",
    city: "",
    state: "",
    postal_code: ""
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartTotal = parseFloat((useSelector(selectCartTotal)*1.1).toFixed(2));
  const currentUser = useSelector(selectCurrentUser);

  const [personalFields, setPersonalFields] = useState(personalFieldsDefault);
  const [addressFields, setAddressFields] = useState(addressFieldsDefault);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {//populates these fields automatically when logged in
    if (currentUser) setPersonalFields({
      name: currentUser.displayName,
      email: currentUser.email
    });
  }, [currentUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    
    if (name === "name" || name=== "email") {
      setPersonalFields({...personalFields, [name]: value});
    } else {
      setAddressFields({...addressFields, [name]: value})
    }
  }
  
  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    
    if (!elements || !stripe) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsProcessingPayment(false);
      return;
    }

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100, personalFields, addressFields  }),
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement);

    if (cardDetails === null) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: personalFields.name,
          email: personalFields.email,
          address: {
            city: addressFields.city,
            line1: addressFields.line1,
            postal_code: addressFields.postal_code,
            state: addressFields.state
          }
        },
      },
    });

    if (paymentResult.error) {
      alert(paymentResult.error.message);
      console.log({ paymentResult });
    } else if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Succeeded");
      }
    setIsProcessingPayment(false);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        
        <h2>Credit Card Payment: </h2>

        <FormInput label="Name" name="name" value={personalFields.name} onChange={handleChange} required/>
        <FormInput label="Email" name="email" value={personalFields.email} onChange={handleChange} required/>
        <FormInput label="Street Address" name="line1" value={addressFields.line1} onChange={handleChange} required/>
        <FormInput label="City" name="city" value={addressFields.city} onChange={handleChange} required/>
        <FormInput label="State" name="state" value={addressFields.state} onChange={handleChange} required/>
        <FormInput label="Zip Code" name="postal_code" value={addressFields.postal_code} onChange={handleChange} required/>

        <CardElement />

        <PaymentButton
          isLoading={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
