export type Tokens = 'wld' | 'eth'; // example tokens
export type Network = 'polygon' | 'ethereum'; // example networks

export type TokensPayload = {
  symbol: Tokens;
  token_amount: string;
};

export type PayCommandInput = {
  reference: string;
  to: string;
  tokens: TokensPayload[];
  network?: Network;
  description: string;
};

export interface MiniAppPaymentSuccessPayload {
  reference: string;
  transaction_id: string;
}