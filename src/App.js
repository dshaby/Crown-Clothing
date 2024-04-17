import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import CheckOut from "./components/routes/checkout/checkout.component";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Shop from "./components/routes/shop/shop";
import Spinner from "./components/spinner/spinner.component";
import { selectCartItems } from "./store/cart/cart.selector";
import { checkUserSession } from "./store/user/user.action";
import { GlobalStyle } from "./global.styles";
import ContactUs from "./components/routes/contact/contact.component";
const Authentication = lazy(() =>
  import("./components/routes/authentication/authentication.component")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  useSelector(selectCartItems);

  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="contact" element={<ContactUs />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
