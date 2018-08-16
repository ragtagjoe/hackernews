import { sortBy } from 'lodash';

const DEFAULT_QUERY = 'react';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page='
const SORTS = {
  NONE: items => items,
  TITLE: items => sortBy(items, 'title'),
  AUTHOR: items => sortBy(items, 'author'),
  COMMENTS: items => sortBy(items, 'num_comments').reverse(),
  POINTS: items => sortBy(items, 'points').reverse(),
}

export { DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, SORTS }