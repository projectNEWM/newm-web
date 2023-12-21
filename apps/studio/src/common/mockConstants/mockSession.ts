import { PersistPartial } from "redux-persist/lib/persistReducer";
import { SessionState } from "../../modules/session";

export const mockSession: SessionState & PersistPartial = {
  _persist: { rehydrated: false, version: 0 },
  isLoggedIn: true,
  verificationPingStartedAt: undefined,
};
