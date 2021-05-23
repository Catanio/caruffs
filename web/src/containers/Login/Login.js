import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import "./styles.css";

function Login()  {
    const history = useHistory();
    const [mail, setUser] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const handleSubmit = async e => {
        e.preventDefault();

        if (!mail || !password) {
            setError("Preencha login e senha para continuar!");
        } else {
            try {
                const res = await api.post("/login", { mail, password });
                login(res.data.token);
                history.push("/app");
            } catch (err) {
                console.log(err);
                setError(`Erro ao logar: ${err}`);
            }
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <label > Usuário:
                    <input type="text" placeholder="E-mail ou idUffs" onChange={e => setUser(e.target.value)}/>
                </label>
                <label > Senha:
                    <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Continuar</button>
                <hr />
                <Link to="/signup">Criar conta!</Link>
            </form>
        </div>
    );
}

export default Login;