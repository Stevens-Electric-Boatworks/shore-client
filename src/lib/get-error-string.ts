import axios from "axios";

const getErrorString = (err: Error) => {
  if (axios.isAxiosError(err)) {
    if (err.response) return err.response.data.error;
    else return err.message;
  }

  return err.message;
};

export default getErrorString;
