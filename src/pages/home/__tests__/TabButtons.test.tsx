import { render, fireEvent } from "@testing-library/react";
import { ViewType } from "modules/ui";
import * as uiSlice from "modules/ui/slice";
import { Provider } from "react-redux";
import store from "store";
import TabButtons from "../TabButtons";

const mockSetHomeViewType = (payload: ViewType) => ({
  payload,
  type: "ui/setHomeViewType",
})

describe("<TabButtons />", () => {
  const tabButtons = (
    <Provider store={ store }>
      <TabButtons />
    </Provider>
  );

  it("renders the buttons", () => {
    const { queryByLabelText } = render(tabButtons);

    expect(queryByLabelText("list-view-button")).toBeTruthy();
    expect(queryByLabelText("grid-view-button")).toBeTruthy();
  });

  it("calls the correct action when the list view button is pressed", () => {
    jest.spyOn(uiSlice, "setHomeViewType")
      .mockImplementation(mockSetHomeViewType);

    const { getByLabelText } = render(tabButtons);

    const listViewButton = getByLabelText("list-view-button");

    fireEvent.click(listViewButton);
    expect(uiSlice.setHomeViewType).toHaveBeenCalledWith("list");
  });

  it("calls the correct action when the grid view button is pressed", () => {
    jest.spyOn(uiSlice, "setHomeViewType")
      .mockImplementation(mockSetHomeViewType);

    const { getByLabelText } = render(tabButtons);

    const gridViewButton = getByLabelText("grid-view-button");

    fireEvent.click(gridViewButton);
    expect(uiSlice.setHomeViewType).toHaveBeenCalledWith("grid");
  });
})
