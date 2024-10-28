export enum TransactionType {
  Claim = "claim",
  Mint = "mint",
}

export interface CombinedTransaction {
  readonly amount: number;
  readonly date: string;
  readonly id: string;
  readonly subheading?: string;
  readonly type: TransactionType;
}

export type TransactionsGroupedByDate = Record<string, CombinedTransaction[]>;

export interface TransactionProps {
  readonly amount: number;
  readonly date: string;
  readonly subheading?: string;
  readonly type: TransactionType;
}

export interface TransactionConfig {
  readonly amountColor: string;
  readonly converter: (amount: number) => number;
  readonly formatter: (amount: number) => string;
  readonly heading: string;
  readonly icon: JSX.Element | null;
  readonly iconBackground: string;
  readonly isPositive: boolean;
}
