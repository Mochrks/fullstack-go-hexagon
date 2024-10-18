import { axiosInstance } from '@/utils/config';

// get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching Products', error);
    throw error;
  }
};
// get products by id
export const getProductsById = async (productId: number) => {
  try {
    const response = await axiosInstance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Products', error);
    throw error;
  }
};

// delete products
export const deleteProducts = async (productId: number) => {
  try {
    const response = await axiosInstance.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting products', error);
    throw error;
  }
};

export const createProducts = async (productsData: { name: string; description: string; stock: number; rating: number; price: number }) => {
  try {
 
    productsData.rating = parseFloat(productsData.rating.toString());
    
    const response = await axiosInstance.post('/products', productsData);
    return response.data;
  } catch (error) {
    console.error('Error creating products', error);
    throw error;
  }
};


export const updateProducts = async (
  productsId: number,
  productsData: { name: string; description: string; stock: number; rating:number; price:number}
) => {
  try {
     productsData.rating = parseFloat(productsData.rating.toString());
    const response = await axiosInstance.put(`/products/${productsId}`, productsData);
    return response.data;
  } catch (error) {
    console.error('Error updating products', error);
    throw error;
  }
};
