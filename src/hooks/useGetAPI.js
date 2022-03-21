import axios from "axios";

const useGetAPI = async (character = "", range = undefined) => {
  try {
    let url = "https://pokeapi.co/api/v2/pokemon/";

    if (typeof range === "object") {
      url += `?limit=${range.limit}&offset=${range.offset}`;
    } else {
      url += character;
    }
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error(error);
    return { fail: true };
  }
};

export default useGetAPI;
