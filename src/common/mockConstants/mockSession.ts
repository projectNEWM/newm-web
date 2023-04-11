import { SessionState } from "modules/session";
import { PersistPartial } from "redux-persist/lib/persistReducer";

export const mockSession: SessionState & PersistPartial = {
  _persist: { version: 0, rehydrated: false },
  isLoggedIn: true,
  verificationPingStartedAt: undefined,
};
