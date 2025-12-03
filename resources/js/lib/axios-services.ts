import { apiClient } from './axios-client'

/**
 * TypeScript Interfaces for Type-Safe API Calls
 */

// Auth Types
export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    access_token: string
    token_type: string
    user: UserResponse
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
    password_confirmation: string
}

// User Types
export interface UserResponse {
    id: number
    name: string
    email: string
    email_verified_at?: string | null
    created_at: string
    updated_at: string
}

export interface UpdateUserRequest {
    name?: string
    email?: string
}

export interface ChangePasswordRequest {
    current_password: string
    password: string
    password_confirmation: string
}

// Bank Types
export interface BankResponse {
    id: number
    name: string
    code: string
    created_at: string
    updated_at: string
}

export interface BankListResponse {
    data: BankResponse[]
    current_page: number
    per_page: number
    total: number
    last_page: number
}

export interface CreateBankRequest {
    name: string
    code: string
}

// Generic API Response Wrapper
export interface ApiResponse<T> {
    data?: T
    message?: string
    errors?: Record<string, string[]>
}

/**
 * Authentication Service
 * Handles login, logout, and token management
 */
export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<ApiResponse<LoginResponse>>(
            '/api/v1/auth',
            credentials
        )
        if (response.data) {
            apiClient.setToken(response.data.access_token)
            return response.data
        }
        throw new Error('No auth token received')
    },

    async register(data: RegisterRequest): Promise<UserResponse> {
        const response = await apiClient.post<ApiResponse<UserResponse>>(
            '/api/v1/register',
            data
        )
        return response.data || ({} as UserResponse)
    },

    async logout(): Promise<void> {
        try {
            await apiClient.post('/api/v1/deauth')
        } finally {
            apiClient.clearToken()
        }
    },

    async getProfile(): Promise<UserResponse> {
        const response = await apiClient.get<ApiResponse<UserResponse>>('/api/v1/user')
        return response.data || ({} as UserResponse)
    },

    async updateProfile(data: UpdateUserRequest): Promise<UserResponse> {
        const response = await apiClient.patch<ApiResponse<UserResponse>>(
            '/api/v1/user',
            data
        )
        return response.data || ({} as UserResponse)
    },

    async changePassword(data: ChangePasswordRequest): Promise<void> {
        await apiClient.post('/api/v1/user/password', data)
    },
}

/**
 * User Service
 * Handles user CRUD operations
 */
export const userService = {
    async list(page = 1): Promise<BankListResponse> {
        const response = await apiClient.get<ApiResponse<BankListResponse>>(
            `/api/v1/user?page=${page}`
        )
        return response.data || { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 }
    },

    async get(id: number): Promise<UserResponse> {
        const response = await apiClient.get<ApiResponse<UserResponse>>(`/api/v1/user/${id}`)
        return response.data || ({} as UserResponse)
    },

    async create(data: UpdateUserRequest): Promise<UserResponse> {
        const response = await apiClient.post<ApiResponse<UserResponse>>('/api/v1/user', data)
        return response.data || ({} as UserResponse)
    },

    async update(id: number, data: UpdateUserRequest): Promise<UserResponse> {
        const response = await apiClient.patch<ApiResponse<UserResponse>>(
            `/api/v1/user/${id}`,
            data
        )
        return response.data || ({} as UserResponse)
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/api/v1/user/${id}`)
    },
}

/**
 * Bank Service
 * Handles bank data operations
 */
export const bankService = {
    async list(page = 1): Promise<BankListResponse> {
        const response = await apiClient.get<ApiResponse<BankListResponse>>(
            `/api/v1/bank?page=${page}`
        )
        return response.data || { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 }
    },

    async get(id: number): Promise<BankResponse> {
        const response = await apiClient.get<ApiResponse<BankResponse>>(`/api/v1/bank/${id}`)
        return response.data || ({} as BankResponse)
    },

    async create(data: CreateBankRequest): Promise<BankResponse> {
        const response = await apiClient.post<ApiResponse<BankResponse>>('/api/v1/bank', data)
        return response.data || ({} as BankResponse)
    },

    async update(id: number, data: CreateBankRequest): Promise<BankResponse> {
        const response = await apiClient.patch<ApiResponse<BankResponse>>(
            `/api/v1/bank/${id}`,
            data
        )
        return response.data || ({} as BankResponse)
    },

    async delete(id: number): Promise<void> {
        await apiClient.delete(`/api/v1/bank/${id}`)
    },
}

export default {
    authService,
    userService,
    bankService,
}
