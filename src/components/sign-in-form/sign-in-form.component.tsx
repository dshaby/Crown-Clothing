import "./sign-in-form.styles.scss";
import { useState, FormEvent, ChangeEvent } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    // await signInWithGooglePopup();
    dispatch(googleSignInStart()); //with Redux Saga
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const { user } = await signInAuthUserWithEmailAndPassword(
      //   email,
      //   password
      // );
      dispatch(emailSignInStart(email, password)); //with Redux-Saga
      resetFormFields();
      navigate("/");
      // return user.accessToken;
    } catch (err: any) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("Wrong password, please try again.");
          break;
        case "auth/user-not-found":
          alert("This email wasn't found. Try signing up?");
          break;
        default:
          alert("Error signing in: " + err.message);
          console.log(err);
      }
    }
  };

  return (
    <div className="sign-in">
      <h2 className="title">Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(e) => handleSubmit} className="sign-in-form">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
        <div className="buttons-container">
          <Button buttonType={BUTTON_TYPE_CLASSES.base} type="submit">
            SIGN IN
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
