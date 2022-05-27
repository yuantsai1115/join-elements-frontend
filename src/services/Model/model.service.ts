import axios from 'axios';
import authHeader from '../Auth/auth-header';

const BASE_URL = 'https://join-elements-backend.herokuapp.com/';

class ModelService {
    public static async uploadModel(file: File) {
        try {
            console.log('[Model] start uploading model');
            // console.log(file);
            let formData = new FormData();
            formData.set('input', file);

            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data;',
                },
            };
            let { data } = await axios.post(`${BASE_URL}work-items`, formData, options);
            console.log('[Model] upload model to backend succeed');

            if (data.status == 201) {
                console.log(data.message);
                return data.data;
            }

            if (data.data.status == 500 && data.data.message == 'File too large') {
                console.log(['[File Upload] File too loarge']);
                return;
            }

            return;
        } catch (error) {
            console.error(error);
        }
    }

    public static async getWorkItemStatus(workItemId: string) {
        try {
            let { data } = await axios.get(`${BASE_URL}work-items/${workItemId}/status`);

            if (data.status == 200) {
                console.log(data.message);
                return data.data;
            }

            if (data.status == 404) {
                console.log('no work item found');
            }

            return;
        } catch (error) {
            console.error(error);
        }
    }

    public static async getWorkItem(workItemId: string) {
        try {
            let { data } = await axios.get(`${BASE_URL}work-items/${workItemId}`);

            if (data.status == 200) {
                console.log(data.message);
                return data.data;
            }

            if (data.status == 404) {
                console.log('no work item found');
            }

            return;
        } catch (error) {
            console.error(error);
        }
    }
}
export default ModelService;
