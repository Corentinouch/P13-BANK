import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLoginForm, clearLoginForm } from '../reducers/loginFormSlice';

function Login() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.loginForm);
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    dispatch(setLoginForm({ ...formData, [e.target.name]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    dispatch(setLoginForm({ ...formData, rememberMe: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.username,
          password: formData.password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la requête");
      }
  
      const data = await response.json();
      localStorage.setItem('token', data.body.token);
      localStorage.setItem('rememberMe', JSON.stringify(formData.rememberMe));
  
      dispatch(clearLoginForm());
      history("/profile", { replace: true });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error.message);
      setError("Invalid username or password");
    }
  };
  

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">Sign In</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>
    </main>
  );
}

export default Login;
