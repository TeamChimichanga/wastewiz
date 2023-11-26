import axios from "axios";

const API_URL = "https://wastewiz-model.onrender.com/";

const predict = async (imageUri) => {
  const formData = new FormData();

  formData.append("image", {
    uri: imageUri,
    type: "image/jpeg",
    name: "image.jpg",
  });

  try {
    const response = await axios.post(`${API_URL}predict`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const ping = async () => {
  try {
    const response = await axios.get(`${API_URL}healtz`);
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  predict,
  ping,
};
