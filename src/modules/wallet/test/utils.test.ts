import { mockEnabledWallet } from "common"; // eslint-disable-line
import { getBalance, getUtxos } from "modules/wallet"; // eslint-disable-line

/**
 * Tests where @emurgo package is imported break. This issue is being
 * investigated (https://github.com/Emurgo/cardano-serialization-lib/issues/453).
 * Hopefully it will be fixed in the future and these tests can be uncommented.
 */

// describe("Wallet utils", () => {
//   beforeEach(() => {
//     window.Wallets = {};
//     window.Wallets.example = mockEnabledWallet;
//   });

//   describe("getBalance()", () => {
//     it("returns the correct float value", () => {
//       expect(getBalance("example")).toEqual(418825699);
//     });
//   });

//   describe("getUtxos()", () => {
//     it("returns the correct utxo values", () => {
//       expect(JSON.stringify(getUtxos("example"))).toEqual(JSON.stringify([
//         169825699,
//         40000000,
//         209000000,
//       ]));
//     });
//   });
// });

it("placeholder", () => {
  expect(true).toEqual(true);
});
