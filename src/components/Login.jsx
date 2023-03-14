import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [validation, setValidation] = useState(false);
  const mini = 6;
  const history = useHistory();
  //   const validation = senha.length <= mini && email.length <= mini;
  useEffect(() => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validationn = regex.test(email);
    setValidation(validationn);
  }, [email]);
  const saveLocalStorege = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };
  return (
    <div className="capa-login">
      <form
        className="form-login"
      >
        <label htmlFor="email" className="email">
          <input
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            data-testid="email-input"
            type="text"
            placeholder="Email"
          />
        </label>
        <label htmlFor="senha" className="senha">
          <input
            onChange={ ({ target }) => setSenha(target.value) }
            name="senha"
            data-testid="password-input"
            type="text"
            placeholder="Password"
          />
        </label>
        <button
          disabled={ !(validation && senha.length > mini) }
          data-testid="login-submit-btn"
          type="button"
          onClick={ saveLocalStorege }
          className="button-login"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
