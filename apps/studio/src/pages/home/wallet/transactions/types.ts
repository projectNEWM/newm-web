import { PaymentType } from "@newm-web/types";

export enum TransactionType {
  Claim = "claim",
  Mint = "mint",
}

export interface CombinedTransaction {
  readonly amount: number;
  readonly date: string;
  readonly id: string;
  readonly mintPaymentType?: PaymentType;
  readonly subheading?: string;
  readonly type: TransactionType;
}

export type TransactionsGroupedByDate = Record<string, CombinedTransaction[]>;

export interface SingleTransactionProps {
  readonly amount: number;
  readonly date: string;
  readonly mintPaymentType?: PaymentType;
  readonly subheading?: string;
  readonly type: TransactionType;
}
