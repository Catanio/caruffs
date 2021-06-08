import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api'
import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    primary: '#63fca3',

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const SignUp = ({ handleClose }) => {
  const classes = useStyles();
  // create state variables for each input
  const [userName, setuserName] = useState('');
  const [idUffs, setidUffs] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    const newProfile = {
      "idUffs": idUffs,
      "password": password,
      "name": userName,
      "bio": bio,
      "phone": phone,
      "mail":email,
     "confirmed_email": true
   }

    api.post("/profile", newProfile)
      .then((res) => {
        setComplete(true);
        setTimeout(() => {
          history.push("/");
        }, 5000);
      })
      .catch((err)=>{
          setError(`Erro ao logar: ${err}`);
      })
  };

  return (

    <div className={"signup-wrapper"}>
      <form className={classes.root} onSubmit={handleSubmit}>
        {error &&
         <p className='error'>{error}</p>
        }
        <TextField
          label="Nome Completo"
          variant="filled"
          required
          value={userName}
          onChange={e => setuserName(e.target.value)}
        />
        <TextField
          label="Id Uffs"
          variant="filled"
          required
          value={idUffs}
          onChange={e => setidUffs(e.target.value)}
        />
        <TextField
          label="E-mail"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Telefone (apenas números)"
          variant="filled"
          required
          value={phone}
          // mask="(99) 9 9999 9999"
          onChange={e => setPhone(e.target.value)}
          name="phone"
          />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Escreva brevemente sobre você"
          variant="filled"
          type="password"
          required
          multiline
          rows="4"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
        <hr />
          {complete &&
          <p>Cadastro concluído! você será direcionado ao login em 5 segundos</p>
          }
          <button type="submit">Criar Conta!</button>
          <hr />
          <Link to="/">voltar ao login</Link>
        <div>

        </div>
      </form>
    </div>

  );

};

export default SignUp;