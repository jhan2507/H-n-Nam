export const TOTAL_ACCOUNT = 'TOTAL_ACCOUNT';
export const SELECT_ORG = 'SELECT_ORG';
export const GET_INPUT = 'GET_INPUT';
export const SELECT_CONTEST = 'SELECT_CONTEST';
export const GET_USERNAME = 'GET_USERNAME';
export const GET_ORGANIZATION = 'GET_ORGANIZATION';
export const GET_ACCOUNT_CODE = 'GET_ACCOUNT_CODE';

export const getTotalAccount = (total) => ({
  type: TOTAL_ACCOUNT,
  total,
});

export const selectOrg = (oid) => ({
  type: SELECT_ORG,
  oid,
});

export const getInput = (input) => ({
  type: GET_INPUT,
  input,
});
export const selectContest = (contestId) => ({
  type: SELECT_CONTEST,
  contestId,
});
export const getUsername = (name) => ({
  type: GET_USERNAME,
  name,
});
export const getOrganizations = (organizations) => ({
  type: GET_ORGANIZATION,
  organizations,
});
export const getAccountCode = (code) => ({
  type: GET_ACCOUNT_CODE,
  code,
});
