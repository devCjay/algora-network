const API_BASE_URL = 'https://api-v1.algora.network';

export const API_ENDPOINTS = {
  PURCHASE_TICKET: `${API_BASE_URL}/raffle/purchase-tickets`,
  MY_TICKETS: (raffle_id) => `${API_BASE_URL}/raffle/${raffle_id}/my-tickets`,
  RAFFLE_STATS: (raffle_id) => `${API_BASE_URL}/raffle/${raffle_id}/stats`,
  RAFFLE_LIST: `${API_BASE_URL}/raffles`,
  USER_LOGIN: `${API_BASE_URL}/account/login`,
  USER_REGISTER: `${API_BASE_URL}/account/create`,
  CURRENCY_RATE: `${API_BASE_URL}/account/current-rate`,
  USER_DATA: `${API_BASE_URL}/account/data`,
  EARNINGS: `${API_BASE_URL}/account/earnings`,
  REFERRALS: `${API_BASE_URL}/referrals/list`,
  FUND_ACCOUNT: `${API_BASE_URL}/account/fund`,
  MINERS: `${API_BASE_URL}/account/miners`,
  LIST_MINERS: `${API_BASE_URL}/order/list-miners`,
  EXTEND_MINER: `${API_BASE_URL}/miner/extend`,
  LIST_ORDERS: `${API_BASE_URL}/order/list`,
  CREATE_ORDER: `${API_BASE_URL}/order/create`,
};