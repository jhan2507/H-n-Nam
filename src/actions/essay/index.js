export const SEARCH_ESSAY = 'SEARCH_ESSAY';
export const TOTAL_ESSAY = 'TOTAL_ESSAY';
export const SEARCH_CONTEST_CODE = 'SEARCH_CONTEST_CODE';
export const SEARCH_EXAM = 'SEARCH_EXAM';
export const EXPORT_EXCEL = 'EXPORT_EXCEL';
export const searchEssay = (username) => ({
  type: SEARCH_ESSAY,
  username,
});
export const searchTotalEssay = (totalEssay) => ({
  type: TOTAL_ESSAY,
  totalEssay,
});
export const searchContestCode = (contest_code) => ({
  type: SEARCH_CONTEST_CODE,
  contest_code,
});
export const searchExam = (exam_code) => ({
  type: SEARCH_EXAM,
  exam_code,
});
