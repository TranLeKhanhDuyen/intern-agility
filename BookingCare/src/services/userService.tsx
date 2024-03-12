import axios from "../axios";

const handleLoginAPi = async (email: string, password: string) => {
  try {
    const res = await axios.post('/api/login', { email, password });
    console.log("res: ", res);
    return res;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

const getAllUser = (id: string)=> {
  return axios.get('/api/get-all-user', { params: { id } });
};
export { handleLoginAPi, getAllUser };
