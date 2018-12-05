const errorHandler = (() => {
  let instance;
 
  const init = () => {
    const drawError = (message) => {
      const news = document.querySelector('.news');
      news.innerHTML = `<div class="error">${message}</div>`;
    };
 
    return {
      drawError: drawError
    };
  };
 
  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }
 
      return instance;
    }
  };
 
})();

export default errorHandler;