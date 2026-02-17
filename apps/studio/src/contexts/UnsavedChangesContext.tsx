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

export interface RequestNavigationOptions {
  readonly message?: ReactNode;
  readonly title?: string;
}

interface UnsavedChangesContextValue {
  readonly hasUnsavedChanges: boolean;
  readonly requestNavigation: (
    path: string | null,
    options?: RequestNavigationOptions
  ) => void;
  readonly setHasUnsavedChanges: (value: boolean) => void;
  readonly setUnsavedModalContent: (
    options: RequestNavigationOptions | null
  ) => void;
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
  const [pendingTitle, setPendingTitle] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<ReactNode | null>(null);
  const [defaultModalContent, setDefaultModalContent] =
    useState<RequestNavigationOptions | null>(null);

  const setUnsavedModalContent = useCallback(
    (options: RequestNavigationOptions | null) => {
      setDefaultModalContent(options);
    },
    []
  );

  const requestNavigation = useCallback(
    (path: string | null, options?: RequestNavigationOptions) => {
      setPendingPath(path);
      const content = options ?? defaultModalContent;
      setPendingTitle(content?.title ?? null);
      setPendingMessage(content?.message ?? null);
      setIsLeaveModalOpen(true);
    },
    [defaultModalContent]
  );

  const handleLeaveConfirm = useCallback(() => {
    if (pendingPath !== null) {
      navigate(pendingPath);
    } else {
      navigate(-1);
    }
    setPendingPath(null);
    setPendingTitle(null);
    setPendingMessage(null);
    setIsLeaveModalOpen(false);
  }, [navigate, pendingPath]);

  const handleStay = useCallback(() => {
    setPendingTitle(null);
    setPendingMessage(null);
    setIsLeaveModalOpen(false);
  }, []);

  const value = useMemo<UnsavedChangesContextValue>(
    () => ({
      hasUnsavedChanges,
      requestNavigation,
      setHasUnsavedChanges,
      setUnsavedModalContent,
    }),
    [hasUnsavedChanges, requestNavigation, setUnsavedModalContent]
  );

  return (
    <UnsavedChangesContext.Provider value={ value }>
      { children }
      <UnsavedChangesModal
        isOpen={ isLeaveModalOpen }
        message={ pendingMessage ?? UNSAVED_MESSAGE }
        title={ pendingTitle ?? undefined }
        onLeave={ handleLeaveConfirm }
        onStay={ handleStay }
      />
    </UnsavedChangesContext.Provider>
  );
};
