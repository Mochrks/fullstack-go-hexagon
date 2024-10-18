import { axiosInstance } from '@/utils/config';

// get all data in mongodb
export const getSpeed = async () => {
  try {
    const response = await axiosInstance.get('/execution-logs');
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};