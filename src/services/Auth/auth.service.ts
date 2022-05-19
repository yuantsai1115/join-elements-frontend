import axios from 'axios';
import qs from 'qs';
import { baseUrl } from './../../settings/AppSettings';

class AuthService {
    login(account: string, password: string) {
        const options = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        };
        return axios
            .post(
                baseUrl + 'login',
                qs.stringify({
                    email: account, //HOT-FIX:: backend should accept account for login instead of email
                    password: password,
                }),
                options,
            )
            .then(response => {
                if (response.data.data.token) {
                    console.log(response.data.data);
                    localStorage.setItem('coinrokaki.user', JSON.stringify(response.data.data));
                }
                return response.data;
            });
    }

    isAuthenticated() {
        return this.getCurrentUser() != null;
    }

    logout() {
        localStorage.removeItem('coinrokaki.user');
    }
    register(account: string, email: string, password: string) {
        return axios.post(baseUrl + 'signup', {
            account,
            email,
            password,
        });
    }
    getCurrentUser() {
        const userStr = localStorage.getItem('coinrokaki.user');
        if (userStr) return JSON.parse(userStr);
        return null;
    }
}
export default new AuthService();
