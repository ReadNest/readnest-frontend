import aspida from "@aspida/axios";
import axiosInstance from "@/lib/axios";
import api from "@/api/$api";

const client = api(aspida(axiosInstance));

export default client;
