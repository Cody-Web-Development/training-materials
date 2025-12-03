/**
 * User Service
 * Handles user CRUD operations
 */
import { ApiClient } from '@/lib/axios-client'
import {
    ApiResponse,
    UserResponse,
    UpdateUserRequest,
    BankListResponse,
    BankResponse,
    CreateBankRequest
 } from '@/types/axios'

export const userService = {
    async list(page = 1): Promise<BankListResponse> {
        const response = await ApiClient.get<ApiResponse<BankListResponse>>(
            `/api/v1/user?page=${page}`
        )
        return response.data || { data: [], current_page: 1, per_page: 15, total: 0, last_page: 1 }
    },

    async get(id: number): Promise<UserResponse> {
        const response = await ApiClient.get<ApiResponse<UserResponse>>(`/api/v1/user/${id}`)
        return response.data || ({} as UserResponse)
    },

    async create(data: UpdateUserRequest): Promise<UserResponse> {
        const response = await ApiClient.post<ApiResponse<UserResponse>>('/api/v1/user', data)
        return response.data || ({} as UserResponse)
    },

    async update(id: number, data: UpdateUserRequest): Promise<UserResponse> {
        const response = await ApiClient.patch<ApiResponse<UserResponse>>(
            `/api/v1/user/${id}`,
            data
        )
        return response.data || ({} as UserResponse)
    },

    async delete(id: number): Promise<void> {
        await ApiClient.delete(`/api/v1/user/${id}`)
    },
}