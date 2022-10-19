const { REACT_APP_API_DOMAIN } = process.env;
const REACT_APP_API_BASE_ENDPOINT = `${REACT_APP_API_DOMAIN}/api/v1`;

export const LOGIN_ENDPOINT = `${REACT_APP_API_DOMAIN}/login`;
export const ACCOUNT_ENDPOINT = `${REACT_APP_API_BASE_ENDPOINT}/account`;
export const TEST_TOKEN_ENDPOINT = `${ACCOUNT_ENDPOINT}/test`;
