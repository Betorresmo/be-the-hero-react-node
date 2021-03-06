import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg'

const Logon = ()=>{

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleId (event){
        event.preventDefault();

        try{
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (error) {
            alert(`${error}
            Esse ID não existe.`);
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleId} >
                    <h1>Faça seu logon</h1>

                    <input
                     placeholder="Sua ID"
                     value={id}
                     onChange={event => setId(event.target.value)} />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}

export default Logon;