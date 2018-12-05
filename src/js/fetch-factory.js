const createQuery = (field, value, i) => {
  return `${i === 0 ? '?' : '&'}${field}=${encodeURIComponent(value)}`;
};

const fetchFactory = (method) => {
  switch (method) {
    case 'get' : return (url, params) => {
      let i = 0;
      for (const param in params) {
        //
      }
      fetch();
    }
  }
};

export default fetchFactory;