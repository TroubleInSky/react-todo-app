
export const apiUrl = "https://uxcandy.com/~shapoval/test-task-backend/v2/";

export const defaultQueryParams = {
  developer: 'VladimirBoyarchuck'
};


export const statusValues = {
  0: 'задача не выполнена',
  1: 'задача не выполнена, отредактирована админом',
  10: 'задача выполнена',
  11: 'задача отредактирована админом и выполнена',
};

export const todoFilters = {
  DEFAULT: 'id',
  USERNAME: 'username',
  EMAIL: 'email',
  STATUS: 'status',
  TEXT: 'text'
};
export const todoSorts = {
  ASC: 'asc',
  DESC: 'desc'
};