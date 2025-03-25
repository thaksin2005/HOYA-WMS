import axios from "axios";

const handleDelete = async (id, target) => {
  try {
    const result = await axios.delete(
      `http://192.168.195.45:3333/api/${target}/${id}`
    );
    return {
      messageType: "success",
      messageText: "Delete Success",
    };
  } catch (error) {
    console.log(error);
    return {
      messageType: "error",
      messageText: "Delete Failed",
    };
  }
};

export default handleDelete;
