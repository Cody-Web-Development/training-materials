/**
 * Authentication Service
 * Handles login, logout, and token management
 */

import { ApiClient } from '@/lib/axios-client'
import {
    LoginRequest,
    LoginResponse,
    ApiResponse,
    RegisterRequest,
    UserResponse,
    UpdateUserRequest,
    ChangePasswordRequest,
} from '@/types/axios'

export const authService = {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await ApiClient.post<ApiResponse<LoginResponse>>(
            '/api/v1/auth',
            credentials
        )
        if (response.data) {
            ApiClient.setToken(response.data.access_token)
            return response.data
        }
        throw new Error('No auth token received')
    },

    async register(data: RegisterRequest): Promise<UserResponse> {
        const response = await ApiClient.post<ApiResponse<UserResponse>>(
            '/api/v1/register',
            data
        )
        return response.data || ({} as UserResponse)
    },

    async logout(): Promise<void> {
        try {
            await ApiClient.post('/api/v1/deauth')
        } finally {
            ApiClient.clearToken()
        }
    },

    async getProfile(): Promise<UserResponse> {
        const response = await ApiClient.get<ApiResponse<UserResponse>>('/api/v1/user')
        return response.data || ({} as UserResponse)
    },

    async updateProfile(data: UpdateUserRequest): Promise<UserResponse> {
        const response = await ApiClient.patch<ApiResponse<UserResponse>>(
            '/api/v1/user',
            data
        )
        return response.data || ({} as UserResponse)
    },

    async changePassword(data: ChangePasswordRequest): Promise<void> {
        await ApiClient.post('/api/v1/user/password', data)
    },
}