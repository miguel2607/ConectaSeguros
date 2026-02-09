/**
 * Configuración y utilidades para comunicación con el Backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Obtiene el token de autenticación desde localStorage
   */
  private getToken(): string | null {
    return localStorage.getItem('admin_token');
  }

  /**
   * Guarda el token de autenticación en localStorage
   */
  private setToken(token: string): void {
    localStorage.setItem('admin_token', token);
  }

  /**
   * Realiza una petición HTTP con autenticación automática
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = this.getToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token inválido o expirado
          localStorage.removeItem('admin_token');
          throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      // Si la respuesta está vacía (DELETE exitoso)
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // ==================== AUTENTICACIÓN ====================

  /**
   * Inicia sesión y guarda el token
   */
  async login(username: string, password: string) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Credenciales inválidas' }));
      throw new Error(error.message || 'Error en el login');
    }

    const data = await response.json();
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  /**
   * Cierra sesión (elimina el token)
   */
  logout(): void {
    localStorage.removeItem('admin_token');
  }

  /**
   * Verifica si hay una sesión activa
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // ==================== PRECIOS ====================

  async getPricing() {
    return this.request<any>('/pricing');
  }

  async updatePricing(pricingData: any) {
    return this.request<any>('/pricing', {
      method: 'PUT',
      body: JSON.stringify(pricingData),
    });
  }

  // ==================== BLOGS ====================

  async getBlogs() {
    return this.request<any[]>('/blogs');
  }

  async getBlogById(id: number) {
    return this.request<any>(`/blogs/${id}`);
  }

  async getBlogBySlug(slug: string) {
    return this.request<any>(`/blogs/slug/${slug}`);
  }

  async createBlog(blog: {
    title: string;
    excerpt: string;
    content?: string;
    date?: string;
    image?: string;
    slug?: string;
  }) {
    return this.request<any>('/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    });
  }

  async updateBlog(id: number, blog: {
    title?: string;
    excerpt?: string;
    content?: string;
    date?: string;
    image?: string;
    slug?: string;
  }) {
    return this.request<any>(`/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    });
  }

  async deleteBlog(id: number) {
    return this.request<void>(`/blogs/${id}`, {
      method: 'DELETE',
    });
  }

  // ==================== SERVICIOS ====================

  async getServices() {
    return this.request<any[]>('/services');
  }

  async getServiceById(id: number) {
    return this.request<any>(`/services/${id}`);
  }

  async getServiceBySlug(slug: string) {
    return this.request<any>(`/services/slug/${slug}`);
  }

  async createService(service: {
    title: string;
    description: string;
    icon?: string;
    priceFrom?: string;
    includes?: string;
    howItWorks?: string;
    idealFor?: string;
    slug?: string;
  }) {
    return this.request<any>('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: number, service: {
    title?: string;
    description?: string;
    icon?: string;
    priceFrom?: string;
    includes?: string;
    howItWorks?: string;
    idealFor?: string;
    slug?: string;
  }) {
    return this.request<any>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  async deleteService(id: number) {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }
}

// Exportar instancia única del cliente API
export const api = new ApiClient(API_BASE_URL);

// Exportar también la clase por si se necesita crear otra instancia
export default ApiClient;

