import { useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../App";

export default function LoginPage() {
    const[email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try {
            await instance.post('/login', email,password)
            alert('Giriş başarılı!');
        } catch (e) {
            alert('Giriş başarısız!');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Giriş Yap</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" 
                    placeholder={"your@email.com"} 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)} />
                    <input type="password"
                    placeholder={"password"} 
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)} />
                    <button className="primary">Giriş Yap</button>
                    <div className="text-center py-2 text-gray-500">
                        Henüz kayıt olmadınız mı?
                        <Link className="underline text-black" to={'/register'}> Kayıt Ol!</Link >
                    </div>
                </form>
            </div>
        </div>
    )
}
