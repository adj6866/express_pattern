type BodyField = { field: string; required: boolean; type: string };

type Endpoint = {
  method: string;
  path: string;
  body?: BodyField[];
  contentType?: 'application/json' | 'multipart/form-data';
};

export const endPoints: Endpoint[] = [
  { method: 'get', path: 'v1/users' },
  {
    method: 'post',
    path: 'v1/users',
    body: [
      { field: 'name', required: true, type: 'string' },
      { field: 'email', required: true, type: 'string' },
      { field: 'phone', required: true, type: 'string' },
      { field: 'isActive', required: true, type: 'boolean' },
      { field: 'roles', required: true, type: 'array' },
    ],
  },
  { method: 'get', path: 'v1/users/{id}' },
  { method: 'delete', path: 'v1/users/{id}' },
  {
    method: 'put',
    path: 'v1/users/{id}',
    body: [
      { field: 'name', required: true, type: 'string' },
      { field: 'email', required: true, type: 'string' },
      { field: 'phone', required: true, type: 'string' },
      { field: 'isActive', required: true, type: 'boolean' },
      { field: 'roles', required: true, type: 'array' },
    ],
  },
];
