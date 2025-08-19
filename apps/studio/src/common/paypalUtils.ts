let paypalPopup: Window | null = null;

const calculatePopUpLocation = (width: number, height: number) => {
  const openerX = (window.screenX ?? (window as any).screenLeft ?? 0) as number;
  const openerY = (window.screenY ?? (window as any).screenTop ?? 0) as number;
  const left = Math.max(
    0,
    Math.floor(openerX + (window.outerWidth - width) / 2)
  );
  const top = Math.max(
    0,
    Math.floor(openerY + (window.outerHeight - height) / 2)
  );
  return { left, top };
};

export const openPayPalPopup = (): Window | null => {
  // No "noopener"/"noreferrer" so window.opener works for postMessage
  const features = `width=300,height=300,left=${window.screenX},top=${window.screenY},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`;

  paypalPopup =
    window.open(
      `${window.location.origin}/paypal-loading-session`,
      "PayPalPayment",
      features
    ) ?? null;

  return paypalPopup;
};

export const navigatePayPalPopup = async (url: string): Promise<boolean> => {
  if (!paypalPopup || paypalPopup.closed) return false;

  try {
    paypalPopup.location.replace(url);
  } catch {
    // Intentionally ignore: touching popup.document or replacing location can throw
    // due to cross-origin restrictions or if the popup is mid-navigation.
  }

  try {
    paypalPopup.resizeTo(400, 650);
    const { left, top } = calculatePopUpLocation(400, 650);
    paypalPopup.moveTo(left, top);
  } catch {
    // Intentionally ignore: some browsers/OSes block programmatic move/resize.
  }
  return true;
};

export const getPayPalPopup = (): Window | null => {
  return paypalPopup && !paypalPopup.closed ? paypalPopup : null;
};

export const closePayPalPopup = () => {
  if (paypalPopup && !paypalPopup.closed) {
    try {
      paypalPopup.close();
    } catch {
      // Intentionally ignore: UA may block close() or window may be already closed.
    }
  }
  paypalPopup = null;
};
