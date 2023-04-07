import { SessionState } from "modules/session";
import { PersistPartial } from "redux-persist/lib/persistReducer";
import { mockProfile } from "./mockProfile";

export const mockSession: SessionState & PersistPartial = {
  _persist: { version: 0, rehydrated: false },
  isLoggedIn: true,
  profile: mockProfile,
  verificationPingStartedAt: undefined,
  isLoading: false,
};
