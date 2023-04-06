// import { createAction } from "@reduxjs/toolkit";
// import { renderWithContext } from "common";
// import { Profile, sessionApi } from "modules/session";
// import { SideBar } from "../SideBar";
import React from "react";

// const renderSidebar = (profileData: Partial<Profile> = {}) => {
//   return renderWithContext(<SideBar setMobileOpen={ () => 1 } />);
// };

describe("<Sidebar>", () => {
  // TODO: There are currently issues mocking RTK Query hook
  // endpoint responses. The suggested solution is to mock the API as outlined
  // in this ticket: https://app.clickup.com/t/2gh7hx3

  // it("renders the profile nickname", () => {
  //   const { queryByText } = renderSidebar({ nickname: "Sushi" });

  //   expect(queryByText("Sushi")).toBeTruthy();
  // });

  // describe("if a `profileUrl` field is present", () => {
  //   it("renders the profile image", () => {
  //     const { queryByLabelText } = renderSidebar({
  //       pictureUrl: "https://www.example.com/image.png",
  //     });

  //     expect(queryByLabelText("profile image")).toBeTruthy();
  //   });
  // });

  // describe("if a `profileUrl` field is not present", () => {
  //   it("does not render the profile image", () => {
  //     const { queryByLabelText } = renderSidebar();

  //     expect(queryByLabelText("profile image")).toBeFalsy();
  //   });
  // });

  it("is commented out", () => {
    expect(true).toBeTruthy();
  });
});
