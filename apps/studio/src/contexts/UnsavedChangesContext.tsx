import {
  type FunctionComponent,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import { UnsavedChangesModal } from "@newm-web/components";

const UNSAVED_MESSAGE =
  "You have unsaved changes. If you leave, your data will be lost.";

interface UnsavedChangesContextValue {
  readonly hasUnsavedChanges: boolean;
  readonly requestNavigation: (path: string | null) => void;
  readonly setHasUnsavedChanges: (value: boolean) => void;
}

const UnsavedChangesContext = createContext<
  UnsavedChangesContextValue | undefined
>(undefined);

export const useUnsavedChanges = (): UnsavedChangesContextValue => {
  const value = useContext(UnsavedChangesContext);
  if (value === undefined) {
    throw new Error(
      "useUnsavedChanges must be used within an UnsavedChangesProvider"
    );
  }
  return value;
};

interface UnsavedChangesProviderProps {
  readonly children: ReactNode;
}

export const UnsavedChangesProvider: FunctionComponent<
  UnsavedChangesProviderProps
> = ({ children }) => {
  const navigate = useNavigate();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const requestNavigation = useCallback((path: string | null) => {
    setPendingPath(path);
    setIsLeaveModalOpen(true);
  }, []);

  const handleLeaveConfirm = useCallback(() => {
    if (pendingPath !== null) {
      navigate(pendingPath);
    } else {
      navigate(-1);
    }
    setPendingPath(null);
    setIsLeaveModalOpen(false);
  }, [navigate, pendingPath]);

  const handleStay = useCallback(() => {
    setIsLeaveModalOpen(false);
  }, []);

  const value = useMemo<UnsavedChangesContextValue>(
    () => ({
      hasUnsavedChanges,
      requestNavigation,
      setHasUnsavedChanges,
    }),
    [hasUnsavedChanges, requestNavigation]
  );

  return (
    <UnsavedChangesContext.Provider value={ value }>
      { children }
      <UnsavedChangesModal
        isOpen={ isLeaveModalOpen }
        message={ UNSAVED_MESSAGE }
        onLeave={ handleLeaveConfirm }
        onStay={ handleStay }
      />
    </UnsavedChangesContext.Provider>
  );
};
