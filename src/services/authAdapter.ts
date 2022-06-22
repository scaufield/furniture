import { TUserName } from "../domain/user";

import { AuthenticationService } from "../application/ports";
import { fakeApi } from "./api";

export function useAuth(): AuthenticationService {
  return {
    auth(name: TUserName, email: TEmail) {
      return fakeApi({
        name,
        email,
        id: "sample-user-id",
      });
    },
  };
}
