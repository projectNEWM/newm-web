import { PaymentType } from "@newm-web/types";

export enum TransactionType {
  Claim = "claim",
  Mint = "mint",
}

export interface CombinedTransaction {
  readonly amount: number;
  readonly date: string;
  readonly id: string;
  readonly mintPaymentType: PaymentType;
  readonly subheading?: string;
  readonly type: TransactionType;
}

export type TransactionsGroupedByDate = Record<string, CombinedTransaction[]>;

export interface SingleTransactionProps {
  readonly amount: number;
  readonly date: string;
  readonly mintPaymentType: PaymentType;
  readonly subheading?: string;
  readonly type: TransactionType;
}

export interface TransactionConfig {
  readonly amountColor: string;
  readonly heading: string;
  readonly icon: JSX.Element | null;
  readonly iconBackground: string;
  readonly isPositive: boolean;
}

export interface PaymentConfig {
  readonly converter: (amount: number) => number;
  readonly formatter: (amount: number) => string;
}
