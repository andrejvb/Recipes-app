import React, { useState, useEffect } from 'react';
import Footer from './Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [validation, setValidation] = useState(false);
  const mini = 6;

  //   const validation = senha.length <= mini && email.length <= mini;
  useEffect(() => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\)?$/i;
    const validationn = regex.test(email);
    setValidation(validationn);
  }, [email]);

  return (
    <div>
      <form>
        <label htmlFor="email">
          Email
          <input
            onChange={ ({ target }) => setEmail(target.value) }
            name="email"
            data-testid="email-input"
            type="text"
          />
        </label>
        <label htmlFor="senha">
          Senha
          <input
            onChange={ ({ target }) => setSenha(target.value) }
            name="senha"
            data-testid="password-input"
            type="text"
          />
        </label>
        <button
          disabled={ !(validation && senha.length > mini) }
          data-testid="login-submit-btn"
          type="button"
        >
          Enter
        </button>
      </form>
      <Footer />
    </div>
  );
}
// nova branch
