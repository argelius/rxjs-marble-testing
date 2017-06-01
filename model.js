function model(query$, COUNTRIES) {
  return query$
    .map((query) => {
      if (query.length < 2) {
        return { countries: [] };
      }
      const countries = COUNTRIES.filter(
        country => country.toLowerCase().indexOf(query.toLowerCase()) === 0,
      );
      return {
        countries,
      };
    });
}

export default model;
