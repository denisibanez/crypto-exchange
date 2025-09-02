import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { ApiConfig, ApiError } from '@/types/api';
import { useToastStore } from '@/stores/toast.store';

class ApiService {
  private instance: AxiosInstance;

  constructor(config: ApiConfig) {
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      config => {
        // Add auth token if available
        // const token = localStorage.getItem('auth_token');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }

        console.log(
          `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      error => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log(
          `✅ API Response: ${response.status} ${response.config.url}`
        );
        return response;
      },
      error => {
        const apiError: ApiError = {
          message:
            error.response?.data?.message ||
            error.message ||
            'An error occurred',
          status: error.response?.status,
          code: error.code,
        };

        console.error('❌ Response Error:', apiError);

        // Get toast store instance
        const toastStore = useToastStore();

        // Handle specific error cases with toast notifications
        if (error.response?.status === 401) {
          console.warn('🔒 Unauthorized access detected');
          toastStore.error('Unauthorized', 'Please check your credentials');
        } else if (error.response?.status === 403) {
          console.warn('🚫 Forbidden access detected');
          toastStore.error(
            'Access Denied',
            'You do not have permission to access this resource'
          );
        } else if (error.response?.status === 404) {
          toastStore.error('Not Found', 'The requested resource was not found');
        } else if (error.response?.status >= 500) {
          toastStore.error(
            'Server Error',
            'Something went wrong on our end. Please try again later.'
          );
        } else if (error.code === 'ECONNABORTED') {
          apiError.message = 'Request timeout - please try again';
          toastStore.error(
            'Request Timeout',
            'The request took too long. Please try again.'
          );
        } else if (error.code === 'NETWORK_ERROR') {
          toastStore.error(
            'Network Error',
            'Please check your internet connection'
          );
        } else {
          // Generic error toast for other cases
          toastStore.error('Request Failed', apiError.message);
        }

        return Promise.reject(apiError);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

// Create API instance with configuration
const apiConfig: ApiConfig = {
  baseURL:
    import.meta.env.VITE_COINGECKO_API_URL ||
    'https://api.coingecko.com/api/v3/simple/price',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiService = new ApiService(apiConfig);
export default apiService;
