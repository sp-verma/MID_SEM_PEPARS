"use server"

export const fetchPyq = async ({ branch, sem, subject }) => {
  const response = await fetch(
    `http://localhost:3000/api/pyq?branch=${branch}&sem=${sem}&subject=${subject}`,
  
  );
  const data = await response.json();
  return data;
};