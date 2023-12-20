export interface OPDelegated {
  evt_block_time: string;
  newBalance: number;
}

export interface NumDelegators {
  day: string;
  count: number;
}

export interface DailyChange {
  date: string;
  dailyDifference: number;
}

export interface DelegatorAmount {
  delegator: string;
  amount: number;
  rank: number;
  ensName: string;
  searchedEnsName: boolean;
}
