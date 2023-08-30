import axios from "axios";

export const url = "http://localhost:5000";

export const getCurrencyCodes = async() => {
  try{
    const response = await axios.get(`${url}/extra`);
    return response.data;
  }catch(err){
    if(err){
      return err;
    }
  }
};
export const postApis = async(url, data) => {
  try {
    const response = await axios.post(url, data, {
      Headers: {
        "Content-Type": "application/json"
      },
    });
    return response.data;
  } catch (error) {
    if(error){
      return error;
    }
    
  }
};