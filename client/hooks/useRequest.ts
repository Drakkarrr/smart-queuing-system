const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useRequest = () => {
  const get = async (endpoint: string = '/') => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
      },
    });

    return res;
  }

  const post = async (
    endpoint: string = '/', 
    data: Record<string, any>,
    headers: Record<string, any> = {},
  ) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
        ...headers,
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  const put = async (
    endpoint: string = '/', 
    data: Record<string, any> = {},
    headers: Record<string, any> = {},
    ) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
        ...headers,
      },
      body: JSON.stringify(data),
    });

    return res;
  }

  const destroy = async (
    endpoint: string = '/', 
    headers: Record<string, any> = {},
    ) => {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token') ?? ''}`,
        ...headers,
      },
    });

    return res;
  }

  return {
    get,
    post,
    put,
    delete: destroy,
  }
}

export default useRequest;