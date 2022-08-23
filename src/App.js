import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
// import Authentication from "./components/routes/authentication/authentication.component";
import CheckOut from "./components/routes/checkout/checkout.component";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Shop from "./components/routes/shop/shop";
import Spinner from "./components/spinner/spinner.component";
import { selectCartItems } from "./store/cart/cart.selector";
import { checkUserSession } from "./store/user/user.action";

const Authentication = lazy(() =>
  import("./components/routes/authentication/authentication.component")
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Redux-Saga fetching for an action that's listened by a saga
    dispatch(checkUserSession());

    // Redux-Saga fetching, with a Promise
    // getCurrentUser();

    // Original way to fetch user (Observable Listener, async code here)
    // const unsubscribe = onAuthStateChangedListener(async (user) => {
    //   if (user) {
    //     try {
    //       await createUserDocFromAuth(user);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    //   dispatch(setCurrentUser(user));
    // });
    // return unsubscribe;
  }, [dispatch]);

  // useEffect(() => {
  //   const getCartItems = async () => {
  //     const cartItems =
  //   }

  //   return getCartItems
  // }, [dispatch]);

  useSelector(selectCartItems);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="shop/*" element={<Shop />} />
            <Route path="auth" element={<Authentication />} />
            <Route path="checkout" element={<CheckOut />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
