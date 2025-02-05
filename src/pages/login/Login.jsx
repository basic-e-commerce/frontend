import React, { useState } from "react";
import "./Login.scss";
import { Container } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  handleAuthChange,
  handleNameChange,
  handleLastNameChange,
  handleEmailChange,
  handleUserTypeChange,
} from "../../store/slices/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isAccount, setIsAcconut] = useState(true);
  const handleButtonClick = () => {
    setIsAcconut(!isAccount);
  };

  const userParametersChange = (data) => {
    dispatch(handleAuthChange(true));
    dispatch(handleNameChange(data.name));
    dispatch(handleLastNameChange(data.lastName));
    dispatch(handleEmailChange(data.email));
    dispatch(handleUserTypeChange(data.userType));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });

      const response = await axios.post(
        "http://localhost:8080/login",
        jsonData,
        {
          withCredentials: true, // Çerezleri otomatik olarak gönder
          headers: {
            "Content-Type": "application/json", // İsteğin içeriğinin JSON olduğunu belirtiyoruz
          },
        }
      );
      userParametersChange(response.data);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login">
      <Container className="cont">
        {isAccount && (
          <div className="loginSection">
            <div className="loginSectionLeft">
              <div className="title">
                <h2>Giriş Yap</h2>
                <div className="socialMedia">
                  <InstagramIcon />
                  <XIcon />
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="userName abc">
                  <p>Kullanıcı Adı</p>
                  <input name="username" className="textInput" type="email" />
                </div>

                <div className="password abc">
                  <p>Şifre</p>
                  <input
                    name="password"
                    className="textInput"
                    type="password"
                  />
                </div>
                <div className="controller">
                  <div className="button">
                    <button className="btn-card">Giriş Yap</button>
                  </div>
                  <div className="forgetPassword">
                    <a href="lll">
                      <p style={{ fontSize: "0.9rem" }}>Şifremi Unuttum</p>
                    </a>
                  </div>
                </div>
              </form>
            </div>
            <div className="loginSectionRight">
              <div className="title">
                <h3>Henüz üye değil misin?</h3>
                {/* <p>Bir hesap açarak ilk adımı atabilirsin.</p> */}
              </div>

              <div className="button">
                <button onClick={handleButtonClick} className="button-uyeol">
                  Üye Ol
                </button>
              </div>
            </div>
          </div>
        )}
        {!isAccount && (
          <div className="loginSection">
            <div className="loginSectionLeft">
              <div className="title">
                <h2>Üye Ol</h2>
                <div className="socialMedia">
                  <InstagramIcon />
                  <XIcon />
                </div>
              </div>
              <form action="">
                <div className="userName abc">
                  <p>Ad Soyad</p>
                  <input className="textInput" type="email" />
                </div>

                <div className="userMail abc">
                  <p>E-mail</p>
                  <input className="textInput" type="email" />
                </div>

                <div className="userPassword abc">
                  <p>Şifre</p>
                  <input className="textInput" type="password" />
                </div>

                <div className="tryUserPassword abc">
                  <p>Şifre Tekrar</p>
                  <input className="textInput" type="password" />
                </div>
                <div className="controller">
                  <div className="button">
                    <button className="btn-card">Üye Ol</button>
                  </div>
                  <div className="forgetPassword"></div>
                </div>
              </form>
            </div>
            <div className="loginSectionRight">
              <div className="title">
                <h3>Hesabın var mı?</h3>
                {/* <p>Hemen giriş yapabilirsin.</p> */}
              </div>

              <div className="button">
                <button onClick={handleButtonClick} className="button-uyeol">
                  Giriş Yap
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Login;
