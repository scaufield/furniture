import {TUserName} from "../domain/user";
import {useAuth} from "../services/authAdapter";
import {useUserStorage} from "../services/storageAdapter";

// Обратите внимание, что интерфейсы портов находятся на _прикладном уровне_,
// но их реализация находится в слое _adapter_.
import {AuthenticationService, UserStorageService} from "./ports";

export function useAuthenticate() {
// Обычно мы обращаемся к сервисам через Dependency Injection.
// Здесь мы можем использовать хуки в качестве кривого «DI-контейнера».

// Функция прецедента не вызывает сторонние сервисы напрямую,
// вместо этого он опирается на интерфейсы, которые мы объявили ранее.
    const storage: UserStorageService = useUserStorage();
    const auth: AuthenticationService = useAuth();

// В идеале мы должны передать команду в качестве аргумента,
// который будет инкапсулировать все входные данные.
    async function authenticate(name: TUserName, email: TEmail): Promise<void> {
        const user = await auth.auth(name, email);
        storage.updateUser(user);
    }

    return {
        user: storage.user,
        authenticate,
    };
}
