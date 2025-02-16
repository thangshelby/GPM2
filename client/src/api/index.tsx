export const fetchStock= async (params:string) => {

    const response = await fetch(`http://localhost:5000${params}`);
    const data = await response.json();
    return data;
}