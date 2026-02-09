import { fireEvent, waitFor } from "@testing-library/react";
import { PaymentType } from "@newm-web/types";
import { NEWM_STUDIO_OUTLETS_URL, renderWithContext } from "../../../common";
import * as sessionModule from "../../../modules/session";
/**
 * Note: DistributionPricingDialog must be imported AFTER renderWithContext.
 * If imported before, it causes "baseReducer is not a function" errors because
 * the component's dependencies try to load before the test utilities and mocks
 * are properly initialized.
 */
// eslint-disable-next-line import/order
import DistributionPricingDialog from "../DistributionPricingDialog";

// Mock functions that will be used in jest.mock factories
const mockUpdateProfile = jest.fn();
const mockUseGetMintSongEstimateQuery = jest.fn();

// Mock LocalStorage
jest.mock("@newm-web/utils", () => ({
  ...jest.requireActual("@newm-web/utils"),
  LocalStorage: {
    setItem: jest.fn(),
  },
}));

// Mock the session module
jest.mock("../../../modules/session", () => {
  const actual = jest.requireActual("../../../modules/session");
  return {
    ...actual,
    useUpdateProfileThunk: jest.fn(() => [
      mockUpdateProfile,
      { isError: false, isLoading: false, isSuccess: false },
    ]),
  };
});

// Mock the song module
jest.mock("../../../modules/song", () => {
  const actual = jest.requireActual("../../../modules/song");
  return {
    ...actual,
    useGetMintSongEstimateQuery: jest.fn(() =>
      mockUseGetMintSongEstimateQuery()
    ),
  };
});

describe("<DistributionPricingDialog />", () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up default mock return values
    mockUpdateProfile.mockResolvedValue({});
    mockUseGetMintSongEstimateQuery.mockReturnValue({
      data: {
        mintPaymentOptions: [
          {
            dspPriceUsd: "14.99",
            paymentType: PaymentType.PAYPAL,
          },
        ],
      },
    });
  });

  describe("when the modal is open", () => {
    it("renders the modal with pricing information", () => {
      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      expect(getByText("Your music, your way")).toBeInTheDocument();
      expect(
        getByText(
          "Pay once to distribute and keep 100% of your future royalties!"
        )
      ).toBeInTheDocument();
      expect(getByText("$14.99 / RELEASE")).toBeInTheDocument();
    });

    it("renders all pricing criteria", () => {
      const { getByText, getByRole } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      // Normal details with a link at the end
      expect(
        getByText(/Distribute your music to all major platforms/)
      ).toBeInTheDocument();
      const viewFullListLink = getByRole("link", { name: "view full list" });
      expect(viewFullListLink).toBeInTheDocument();
      expect(viewFullListLink).toHaveAttribute("href", NEWM_STUDIO_OUTLETS_URL);

      // highlighted text for the first part and normal details followed
      expect(getByText("20% discount")).toBeInTheDocument();
      expect(getByText(/for paying in \$NEWM Tokens/)).toBeInTheDocument();

      // All other details are normal text
      expect(getByText("Automate royalty splits")).toBeInTheDocument();
      expect(
        getByText("Free EAN Release Code & ISRC generation")
      ).toBeInTheDocument();
      expect(
        getByText("Add and manage release collaborators")
      ).toBeInTheDocument();
      expect(getByText("Customize your artist profile")).toBeInTheDocument();
      expect(getByText("Track catalog status")).toBeInTheDocument();
      expect(
        getByText("Sell music rights to your fans on the NEWM Marketplace!")
      ).toBeInTheDocument();
    });

    it("renders Get started and Cancel buttons", () => {
      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      expect(getByText("Get started")).toBeInTheDocument();
      expect(getByText("Cancel")).toBeInTheDocument();
    });
  });

  describe("when the modal is closed", () => {
    it("does not render the modal content", () => {
      const { queryByText } = renderWithContext(
        <DistributionPricingDialog
          open={ false }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      expect(queryByText("Your music, your way")).not.toBeInTheDocument();
    });
  });

  describe("when the Get started button is clicked", () => {
    it("calls updateProfile with dspPlanSubscribed: true", async () => {
      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      const getStartedButton = getByText("Get started");
      fireEvent.click(getStartedButton);

      await waitFor(() => {
        expect(mockUpdateProfile).toHaveBeenCalledWith({
          dspPlanSubscribed: true,
        });
      });
    });

    it("calls the onConfirm callback", async () => {
      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      const getStartedButton = getByText("Get started");
      fireEvent.click(getStartedButton);

      await waitFor(() => {
        expect(mockOnConfirm).toHaveBeenCalled();
      });
    });
  });

  describe("when the Cancel button is clicked", () => {
    it("calls the onCancel callback", () => {
      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      const cancelButton = getByText("Cancel");
      fireEvent.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });

  describe("when the profile update is loading", () => {
    it("disables the buttons", () => {
      // Override the mock to return loading state
      (sessionModule.useUpdateProfileThunk as jest.Mock).mockReturnValueOnce([
        mockUpdateProfile,
        { isError: false, isLoading: true, isSuccess: false },
      ]);

      const { getAllByRole } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      const buttons = getAllByRole("button");

      // Both buttons should be disabled when loading
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });
  });

  describe("when pricing data is not available", () => {
    it("displays a fallback price", () => {
      mockUseGetMintSongEstimateQuery.mockReturnValue({
        data: {},
      });

      const { getByText } = renderWithContext(
        <DistributionPricingDialog
          open={ true }
          onCancel={ mockOnCancel }
          onConfirm={ mockOnConfirm }
        />
      );

      // Should explicitly show a fallback when price is unavailable
      expect(getByText("N/A / RELEASE")).toBeInTheDocument();
    });
  });
});
