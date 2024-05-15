import React, { useState } from "react";
import "./style.css";
import Input from "../Input";
import Button from "../Button";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { auth, doc, setDoc, db, getDoc, provider } from "../../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const SigninSignup = () => {
  const [loginForm, setLoginForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function signupWithEmail() {
    setLoading(true);

    if (name === "" || email === "" || password === "") {
      toast.error("All Fields are mandatory!");
      setLoading(false);
      return;
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password should match!");
      setLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await createDoc(user);
      toast.success("User Created Successfully!");
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  // Function to create a document in the "users" collection
  async function createDoc(user) {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Document created successfully!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      // toast.error("Document already exists!");
    }
  }

  function loginWithEmail() {
    setLoading(true);
    console.log(email, password);

    if (email === "" || password === "") {
      toast.error("All Fields are manadatory!");
      console.log("errr");
      setLoading(false);
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login Successful!");
        setLoading(false);
        navigate("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message);
        setLoading(false);
      });
  }

  function signInWithGoogle() {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          createDoc(user);
          setLoading(false);
          navigate("/dashboard")
          toast.success("Google Auth Successful!");
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData?.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          toast.error(error.message);
          setLoading(false);
          // ...
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }
  return (
    <>
      {loginForm ? (
        <div className="signup_wrapper">
          <p className="title">
            Login on <span style={{ color: "var(--theme)" }}>Financely</span>
          </p>
          <Input
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"johndoe@mail.com"}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"example1234"}
          />
          <Button
            text={loading ? "Loading..." : "Login using Email and Password"}
            onClick={loginWithEmail}
            disabled={loading}
          />
          <p style={{ textAlign: "center" }}>Or</p>
          <Button
            onClick={signInWithGoogle}
            text={loading ? "Loading..." : "Login Using Google"}
            blue={true}
            disabled={loading}
          />
          <p className="p-click-here" onClick={() => setLoginForm(false)}>
            Or don't have an account? Click Here.
          </p>
        </div>
      ) : (
        <div className="signup_wrapper">
          <p className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>Financely</span>
          </p>
          <Input
            label={"Full Name"}
            state={name}
            setState={setName}
            placeholder={"John Doe"}
          />
          <Input
            label={"Email"}
            state={email}
            setState={setEmail}
            placeholder={"johndoe@mail.com"}
          />
          <Input
            type={"password"}
            label={"Password"}
            state={password}
            setState={setPassword}
            placeholder={"example1234"}
          />
          <Input
            type={"password"}
            label={"Confirm Password"}
            state={confirmPassword}
            setState={setConfirmPassword}
            placeholder={"example1234"}
          />
          <Button
            text={loading ? "Loading..." : "Signup using Email and Password"}
            onClick={signupWithEmail}
            disabled={loading}
          />
          <p style={{ textAlign: "center" }}>Or</p>
          <Button
            onClick={signInWithGoogle}
            text={loading ? "Loading..." : "Signup Using Google"}
            blue={true}
            disabled={loading}
          />
          <p className="p-click-here" onClick={() => setLoginForm(true)}>
            Or have an account already? Click Here.{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default SigninSignup;
