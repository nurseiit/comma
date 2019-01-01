const readFile = filename => {
  const folder = "./assets/data/";
  return fetch(folder + filename).then(response => {
    if (response.status === 200) {
      return response;
    } else {
      throw new Error(`${response.status} code!`);
    }
  });
};

export default readFile;
