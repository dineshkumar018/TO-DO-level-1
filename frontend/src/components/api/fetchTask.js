async function fetchTaskAPI(handleResponse, handleError) {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/task";
    const url = `${baseUrl}${endpoint}`;

    const response = await fetch(url);

    if(!response.ok){
        const errorText = await response.text();
        console.error("Error response",errorText);
        throw new Error(`http Error ${response.status}: ${errorText}`)
        
    }
    const jsonData = await response.json();
    handleResponse(jsonData);
  } catch (error) {
    handleError(error.message)
  }
}

export default fetchTaskAPI;
