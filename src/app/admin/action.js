"use server"


 export const fetchPyq = async () => {
    const response = await fetch("http://localhost:3000/api/pyq");
    return response.json();
  };