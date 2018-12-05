const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`URL: ${argumentsList[0]}`);
    console.log(`Search Params: ${argumentsList[1]}`);

    return target.apply(thisArg, argumentsList);
  }
};

const fetchFactory = (method) => {
  let fetchFunction;
  
  switch (method) {
    case 'get': fetchFunction = async (baseUrl, params) => {
      let queryUrl = `${baseUrl}?${params.toString()}`;
      const res = await fetch(queryUrl);
      return res.json();
    }; break;
    
    case 'post': fetchFunction = async (baseUrl, params) => {
      const headers = new Headers({
        'x-api-key': params.get('apiKey')
      });
      const res = await fetch(baseUrl, {
        method: 'POST',
        body: params,
        headers: headers
      });
      return res.json();
    }; break;
  }
  
  return new Proxy (fetchFunction, handler);
};

export default fetchFactory;