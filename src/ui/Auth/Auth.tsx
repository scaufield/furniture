import React, {useState} from "react";
import {TUserName} from "../../domain/user";
import {useAuthenticate} from "../../application/authenticate";
import styles from './Auth.module.css';
import Button from "../Button";
import {useHistory} from "react-router-dom";

export function Auth() {
    const [name, setName] = useState<TUserName>("");
    const [email, setEmail] = useState<TEmail>("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const {user, authenticate} = useAuthenticate();
    if (!!user) history.push("/");

    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();

        await authenticate(name, email);
        setLoading(false);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.container}>
                <input
                    className={styles.input}
                    placeholder="Имя"
                    type="text"
                    name="name"
                    required
                    title="Введите не менее 6 символов"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                />
                <input
                    className={styles.input}
                    placeholder="Email"
                    type="email"
                    required
                    title="Введите не менее 6 символов"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <Button type="submit" disabled={loading} backgroundColor="black" textColor="white">
                {loading ? "Пытаемся войти..." : "Войти"}
            </Button>
        </form>
    );
}
