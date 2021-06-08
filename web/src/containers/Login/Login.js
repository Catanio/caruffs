import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import "./styles.css";

function Login()  {
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const history = useHistory();
     
    const handleSubmit = async e => {
        e.preventDefault();

        if (!user || !password) {
            setError("Preencha login e senha para continuar!");
        } else {
            api.post("/login", { user, password })
                .then((res) => {
                    login(res.data.token);
                    
                    console.log(res.data.token)
                    history.push("/app");
                })
                .catch((err)=>{
                    setError(`Erro ao logar: ${err}`);
                })
        }
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
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