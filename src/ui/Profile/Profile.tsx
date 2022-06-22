import styles from "./Profile.module.css";
import {useUserStorage} from "../../services/storageAdapter";

export function Profile() {
    const {user} = useUserStorage();
    if (!user) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>{user.name}</h1>
            <p className={styles.email}>{user.email}</p>
        </div>
    )
}
