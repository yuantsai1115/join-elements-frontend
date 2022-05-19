import axios from 'axios';
import authHeader from '../Auth/auth-header';
import { baseUrl } from './../../settings/AppSettings';

class UserService {
    getPublicContent() {
        return axios.get(baseUrl + 'all');
    }
    //   getUserBoard() {
    //     return axios.get(baseUrl + 'user', { headers: authHeader() });
    //   }
    //   getModeratorBoard() {
    //     return axios.get(baseUrl + 'mod', { headers: authHeader() });
    //   }
    //   getAdminBoard() {
    //     return axios.get(baseUrl + 'admin', { headers: authHeader() });
    //   }
}
export default new UserService();
