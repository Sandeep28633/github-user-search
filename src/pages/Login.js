import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import loginImg from '../images/login-img.svg';
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
  const {
    loginWithRedirect
  } = useAuth0();

  return (
    <Wrapper>
      <div className="container">
        <img src={loginImg} alt="Github User"/>
        <h1>Github User</h1>
        <Link className="btn" onClick={loginWithRedirect}>Login/Signup</Link>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
