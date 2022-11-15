const { REACT_APP_API_DOMAIN } = process.env;
const REACT_APP_API_BASE_ENDPOINT = `${REACT_APP_API_DOMAIN}/api/v1`;

export const LOGIN_ENDPOINT = `${REACT_APP_API_DOMAIN}/login`;
export const ACCOUNT_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/account`;
export const BORROWER_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/borrower`;
export const EMAIL_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/email`;
export const TEST_TOKEN_ENDPOINT = `${ACCOUNT_ENDPOINT}/test`;
export const GOP_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/gop`;
export const MEMBERSHIP_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/booking/admin/membership`;
export const DASHBOARD_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/dashboard`;



