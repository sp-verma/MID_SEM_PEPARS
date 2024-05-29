'usre server';


export const fetchSubjects = async ({ branch, sem }) => {
  const response = await fetch(
    `http://localhost:3000/api/subject?branch=${branch}&sem=${sem}`,
    {
      cache:"no-cache"
    },
  );
  const data = await response.json();
  return data;
};