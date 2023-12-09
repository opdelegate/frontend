export interface OPDelegatedResponse {
  newBalance: number;
  evt_block_time: string;
}

export interface OPDelegatedDailyChange {
  date: string;
  change: number;
}

export interface NumDelegatorsResponse {
  day: string;
  count: number;
};

