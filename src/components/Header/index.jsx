import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from '../../assets/user.jpg'
import { Row } from "antd";
const Header = () => {
  const [user, loading] = useAuthState(auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutFnc() {
    signOut(auth)
      .then(() => {
        toast.success("Logged out!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <Row className="nav">
      <p className="logo">Financely</p>
      {user && (<div className="logo_div">
        <img src={user.photoURL ? user.photoURL:userImg} alt="" />
        <p onClick={logoutFnc} className="link">
          Logout
        </p>
        </div>)}
    </Row>
  );
};

export default Header;
