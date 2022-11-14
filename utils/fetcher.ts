export const fetcher = async (url: any) =>
  await fetch(url).then((res) => res.json());
