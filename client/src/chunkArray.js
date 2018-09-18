export default (array = [], chunkSize = 1) => {
  const unchunkedLength = array.length;
  const chunked = [];

  for (let i = 0; i < unchunkedLength; i += chunkSize) {
    chunked.push(array.slice(i, i + chunkSize));
  }

  return chunked;
};
