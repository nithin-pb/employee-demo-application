import axios from "axios";

const BASE_URL = 'https://secret-cove-15132.herokuapp.com'
export default {
    employee() {
        return {
            getAllEmployees: () => axios.get(BASE_URL + "/employee",),
            getSelectedEmployee: (id) => axios.get(`${BASE_URL}/employee/${id}`),
            updateEmployee: (params) => axios.put(BASE_URL + "/employee", params),
            createEmployee: (params) => axios.post(BASE_URL + "/employee", params),
            deleteEmployee: (id) => axios.delete(BASE_URL + `/employee/${id}`),
        }
    }
}