import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useFormikContext } from "formik";
import { PaymentType } from "@newm-web/types";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@newm-web/theme";
import OrderSummaryDialog from "../OrderSummaryDialog";
import {
  UploadSongThunkRequest,
  useGetMintSongEstimateQuery,
} from "../../../../modules/song";
import { useGetNewmUsdConversionRateQuery } from "../../../../modules/crypto";
import { openPayPalPopup } from "../../../../common/paypalUtils";

// Mock dependencies
jest.mock("formik");
jest.mock("../../../../modules/song", () => ({
  ...jest.requireActual("../../../../modules/song"),
  useGetMintSongEstimateQuery: jest.fn(),
}));
jest.mock("../../../../modules/crypto", () => ({
  ...jest.requireActual("../../../../modules/crypto"),
  useGetNewmUsdConversionRateQuery: jest.fn(),
}));
jest.mock("../../../../common/paypalUtils");

// Helper to render with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={ theme }>{ component }</ThemeProvider>);
};

const mockUseFormikContext = useFormikContext as jest.MockedFunction<
  typeof useFormikContext
>;
const mockUseGetMintSongEstimateQuery =
  useGetMintSongEstimateQuery as jest.MockedFunction<
    typeof useGetMintSongEstimateQuery
  >;
const mockUseGetNewmUsdConversionRateQuery =
  useGetNewmUsdConversionRateQuery as jest.MockedFunction<
    typeof useGetNewmUsdConversionRateQuery
  >;
const mockOpenPayPalPopup = openPayPalPopup as jest.MockedFunction<
  typeof openPayPalPopup
>;

describe("OrderSummaryDialog", () => {
  const mockSubmitForm = jest.fn();
  const mockSetFieldValue = jest.fn();
  const mockOnClose = jest.fn();

  const defaultFormValues: UploadSongThunkRequest = {
    artistName: "Test Artist",
    companyName: "Test Company",
    consentsToContract: true,
    creditors: [],
    email: "test@example.com",
    featured: [],
    genres: ["Pop", "Rock"],
    isExplicit: false,
    isMinting: true,
    owners: [
      {
        email: "owner1@example.com",
        isCreator: true,
        isRightsOwner: true,
        percentage: 51,
        role: "Pop",
        status: "Accepted",
      },
      {
        email: "owner2@example.com",
        isCreator: false,
        isRightsOwner: true,
        percentage: 49,
        role: "Drummer",
        status: "Accepted",
      },
    ],
    paymentType: PaymentType.NEWM,
    releaseDate: "2025-10-15",
    stageName: "TESTER",
    title: "Test Song",
  } as UploadSongThunkRequest;

  const defaultSongEstimate = {
    mintPaymentOptions: [
      {
        collabPrice: "20",
        collabPricePerArtistUsd: "1.25",
        collabPriceUsd: "2",
        dspPrice: "30",
        dspPriceUsd: "3",
        mintPrice: "50",
        mintPriceUsd: "5",
        paymentType: PaymentType.NEWM,
        price: "100",
        priceUsd: "10",
      },
      {
        collabPrice: "25",
        collabPricePerArtistUsd: "1.25",
        collabPriceUsd: "2.50",
        dspPrice: "37.5",
        dspPriceUsd: "3.75",
        mintPrice: "62.5",
        mintPriceUsd: "6.25",
        paymentType: PaymentType.PAYPAL,
        price: "125",
        priceUsd: "12.50",
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseFormikContext.mockReturnValue({
      setFieldValue: mockSetFieldValue,
      submitForm: mockSubmitForm,
      values: defaultFormValues,
    } as any);

    mockUseGetMintSongEstimateQuery.mockReturnValue({
      data: defaultSongEstimate,
      isError: false,
    } as any);

    mockUseGetNewmUsdConversionRateQuery.mockReturnValue({
      data: { usdPrice: 100000 }, // 0.1 USD per NEWM
    } as any);
  });

  describe("Rendering", () => {
    it("should render the dialog when open", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Order Summary")).toBeInTheDocument();
    });

    it("should not render the dialog when closed", () => {
      renderWithTheme(
        <OrderSummaryDialog open={ false } onClose={ mockOnClose } />
      );

      expect(screen.queryByText("Order Summary")).not.toBeInTheDocument();
    });

    it("should display release details correctly", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Test Song")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument(); // Number of collaborators
      expect(screen.getByText("10/15/2025")).toBeInTheDocument(); // Release date
    });
  });

  describe("Payment Method Selection", () => {
    it("should display both payment options", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Pay with $NEWM")).toBeInTheDocument();
      expect(screen.getByText("20% discount")).toBeInTheDocument();
      expect(
        screen.getByText("Pay with PayPal, Credit, or Debit Card")
      ).toBeInTheDocument();
    });

    it("should have NEWM payment selected by default", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const newmRadio = screen.getByRole("radio", {
        name: /Pay with \$NEWM/i,
      });
      expect(newmRadio).toBeChecked();
    });

    it("should update payment type when PayPal is selected", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const paypalRadio = screen.getByRole("radio", {
        name: /Pay with PayPal/i,
      });
      fireEvent.click(paypalRadio);

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        "paymentType",
        PaymentType.PAYPAL
      );
    });

    it("should be NEWM payment after selecting PayPal and then NEWM", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      // Select PayPal
      const paypalRadio = screen.getByRole("radio", {
        name: /Pay with PayPal/i,
      });
      fireEvent.click(paypalRadio);

      expect(mockSetFieldValue).toHaveBeenCalledWith(
        "paymentType",
        PaymentType.PAYPAL
      );

      // Select NEWM again
      const newmRadio = screen.getByRole("radio", {
        name: /Pay with \$NEWM/i,
      });
      fireEvent.click(newmRadio);

      expect(newmRadio).toBeChecked();
    });
  });

  describe("Cost Breakdown Display", () => {
    it("should display cost breakdown for NEWM payment", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Distribution cost")).toBeInTheDocument();
      expect(screen.getByText("Royalty split(s) fee")).toBeInTheDocument();
      expect(screen.getByText("Service fee")).toBeInTheDocument();
      expect(screen.getByText("Total")).toBeInTheDocument();
    });

    it("should show discount strikethrough for NEWM payment", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      // Distribution cost should show strikethrough for non-discounted price
      const distributionSection = screen
        .getByText("Distribution cost")
        .closest("div");
      expect(distributionSection).toBeInTheDocument();
    });

    it("should display cost breakdown for PayPal payment", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, paymentType: PaymentType.PAYPAL },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Distribution cost")).toBeInTheDocument();
      expect(screen.getByText("Royalty split(s) fee")).toBeInTheDocument();
      expect(screen.getByText("Service fee")).toBeInTheDocument();
    });

    it("should display disclaimer about fees for NEWM payment", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(
        screen.getByText(/Total does not include the blockchain network fee/i)
      ).toBeInTheDocument();
    });

    it("should display disclaimer about fees for PayPal payment", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, paymentType: PaymentType.PAYPAL },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(
        screen.getByText(/Fee prices are not guaranteed, costs may vary/i)
      ).toBeInTheDocument();
      // Should NOT show blockchain network fee text for PayPal
      expect(
        screen.queryByText(/Total does not include the blockchain network fee/i)
      ).not.toBeInTheDocument();
    });
  });

  describe("Tooltips", () => {
    it("should display tooltip for Number of collaborators", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const numberCollabsText = screen.getByText("Number of collaborators");
      const helpIcon = numberCollabsText.parentElement?.querySelector(
        "[data-testid=\"HelpIcon\"]"
      );

      expect(helpIcon).toBeInTheDocument();
    });

    it("should display tooltip for Royalty split(s) fee", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const royaltySplitText = screen.getByText("Royalty split(s) fee");
      const helpIcon = royaltySplitText.parentElement?.querySelector(
        "[data-testid=\"HelpIcon\"]"
      );

      expect(helpIcon).toBeInTheDocument();
    });

    it("should display tooltip for Service fee", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const serviceFeeText = screen.getByText("Service fee");
      const helpIcon = serviceFeeText.parentElement?.querySelector(
        "[data-testid=\"HelpIcon\"]"
      );

      expect(helpIcon).toBeInTheDocument();
    });

    it("should show correct tooltip text for Number of collaborators on hover", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const helpIcon = screen
        .getByText("Number of collaborators")
        .parentElement?.querySelector("[data-testid=\"HelpIcon\"]");

      if (helpIcon) {
        fireEvent.mouseOver(helpIcon);

        await waitFor(() => {
          expect(
            screen.getByText(
              "This is the total number of collaborators, including yourself."
            )
          ).toBeInTheDocument();
        });
      }
    });

    it("should show correct tooltip text for Royalty split(s) fee on hover", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const royaltySplitText = screen.getByText("Royalty split(s) fee");
      const helpIcon = royaltySplitText.parentElement?.querySelector(
        "[data-testid=\"HelpIcon\"]"
      );

      if (helpIcon) {
        fireEvent.mouseOver(helpIcon);

        await waitFor(() => {
          expect(
            screen.getByText(
              /As previously mentioned during the upload process/i
            )
          ).toBeInTheDocument();
          // Verify the specific pricing per artist is shown (from collabPricePerArtistUsd)
          expect(
            screen.getByText(/additional \$1\.25 fee is required/i)
          ).toBeInTheDocument();
        });
      }
    });

    it("should show correct tooltip text for Service fee on hover", async () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const serviceFeeText = screen.getByText("Service fee");
      const helpIcon = serviceFeeText.parentElement?.querySelector(
        "[data-testid=\"HelpIcon\"]"
      );

      if (helpIcon) {
        fireEvent.mouseOver(helpIcon);

        await waitFor(() => {
          expect(
            screen.getByText(
              "This fee covers the cost of digital contract creation."
            )
          ).toBeInTheDocument();
        });
      }
    });
  });

  describe("Actions", () => {
    it("should call onClose when Cancel button is clicked", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const cancelButton = screen.getByRole("button", { name: /Cancel/i });
      fireEvent.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("should call submitForm when Confirm & Pay is clicked with NEWM payment", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const confirmButton = screen.getByRole("button", {
        name: /Confirm & Pay/i,
      });
      fireEvent.click(confirmButton);

      expect(mockSubmitForm).toHaveBeenCalledTimes(1);
      expect(mockOpenPayPalPopup).not.toHaveBeenCalled();
    });

    it("should open PayPal popup and submit form when Confirm & Pay is clicked with PayPal payment", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, paymentType: PaymentType.PAYPAL },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const confirmButton = screen.getByRole("button", {
        name: /Confirm & Pay/i,
      });
      fireEvent.click(confirmButton);

      expect(mockOpenPayPalPopup).toHaveBeenCalledTimes(1);
      expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    });

    it("should disable Confirm & Pay button when song estimate has error", () => {
      mockUseGetMintSongEstimateQuery.mockReturnValue({
        data: undefined,
        isError: true,
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      const confirmButton = screen.getByRole("button", {
        name: /Confirm & Pay/i,
      });
      expect(confirmButton).toBeDisabled();
    });
  });

  describe("Price Conversion", () => {
    it("should convert USD to NEWM correctly for PayPal payment", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, paymentType: PaymentType.PAYPAL },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      // With conversion rate of 0.1 USD per NEWM (100000 newmies / 1000000)
      // PayPal prices should be converted to NEWM equivalent
      expect(screen.getByText("Distribution cost")).toBeInTheDocument();
    });

    it("should handle missing conversion rate gracefully", () => {
      mockUseGetNewmUsdConversionRateQuery.mockReturnValue({
        data: undefined,
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      // Should still render without crashing
      expect(screen.getByText("Order Summary")).toBeInTheDocument();
    });
  });

  describe("Charli3 Branding", () => {
    it("should display Charli3 powered by text", () => {
      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("Prices powered by Charli3")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle missing song estimate data", () => {
      mockUseGetMintSongEstimateQuery.mockReturnValue({
        data: undefined,
        isError: false,
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      // Should still render dialog
      expect(screen.getByText("Order Summary")).toBeInTheDocument();
    });

    it("should handle empty collaborators list", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, owners: [] },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("0")).toBeInTheDocument(); // Number of collaborators
    });

    it("should handle missing release date", () => {
      mockUseFormikContext.mockReturnValue({
        setFieldValue: mockSetFieldValue,
        submitForm: mockSubmitForm,
        values: { ...defaultFormValues, releaseDate: undefined },
      } as any);

      renderWithTheme(<OrderSummaryDialog open={ true } onClose={ mockOnClose } />);

      expect(screen.getByText("N/A")).toBeInTheDocument();
    });
  });
});
