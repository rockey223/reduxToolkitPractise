import Axios from "axios";

async function Get(params, query) {
  try {
    const response = await Axios.get(
      `https://jsonplaceholder.typicode.com/${params}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function Post(params,data){
    try {
        const response = await Axios.post(
          `https://jsonplaceholder.typicode.com/${params}`,data
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
}


export { Get,Post };
