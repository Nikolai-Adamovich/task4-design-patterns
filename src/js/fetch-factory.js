const createQuery = ([field, value], i) => {
  return `${i === 0 ? '?' : '&'}${field}=${encodeURIComponent(value)}`;
};

const fetchFactory = (method) => {
  switch (method) {
    case 'get': return async (baseUrl, params) => {
      let queryUrl = `${baseUrl}?${params.toString()}`;
      const res = await fetch(queryUrl);
      return res.json();
    }
    
    case 'post': return async (baseUrl, params) => {
      const headers = new Headers({
        'x-api-key': params.get('apiKey')
      });
      const res = await fetch(baseUrl, {
        method: 'POST',
        body: params,
        headers: headers
      });
      return res.json();
    }
  }
};

export default fetchFactory;