// src/dataProvider.ts
import simpleRestProvider from 'ra-data-simple-rest';
import {
  fetchUtils,
  DataProvider,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyResult,
} from 'react-admin';

const API_URL = 'http://localhost:3001/api/admin';

const httpClient = (url: string, options: any = {}) => {
  options.headers = options.headers || new Headers({ Accept: 'application/json' });
  const token = localStorage.getItem('token');
  if (token) options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const baseProvider = simpleRestProvider(API_URL, httpClient);

const dataProvider: DataProvider = {
  ...baseProvider,

  // Paginated list override
  getList: async (
    resource: string,
    params: GetListParams
  ): Promise<GetListResult> => {
    const page    = params.pagination?.page    ?? 1;
    const perPage = params.pagination?.perPage ?? 20;
    const url = `${API_URL}/${resource}?page=${page}&perPage=${perPage}`;
    const { json } = await httpClient(url);
    console.log('getList for', resource, '=>', json);

    // Map each record to include an explicit `id` field
    const data = Array.isArray(json.data)
      ? json.data.map((record: any) => ({
          ...record,
          id: record._id,
        }))
      : [];

    const total = typeof json.total === 'number' ? json.total : data.length;
    return { data, total };
  },

  // Batch GET_MANY override to support ReferenceField
  getMany: async (
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult> => {
    // Build filter query for GET_MANY
    const filter = encodeURIComponent(
      JSON.stringify({ id: params.ids })
    );
    const url = `${API_URL}/${resource}?filter=${filter}`;
    const { json } = await httpClient(url);

    // Server returns a raw array of records
    const data = Array.isArray(json)
      ? json.map((record: any) => ({
          ...record,
          id: record._id,
        }))
      : [];

    return { data };
  },
};

export default dataProvider;
