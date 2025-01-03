import axios from 'axios'
const axiosInstance = axios.create({
	baseURl: "http://localhost:5000/api",
	headers: "{
		content-Type: "application/json",
	}
	)};

export default axiosInstance;
