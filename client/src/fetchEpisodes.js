export default async () => {
  const res = await fetch('http://localhost:5000/api/episodes');
  const json = await res.json();

  return json;
};
