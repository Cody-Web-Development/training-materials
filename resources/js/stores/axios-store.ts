import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
    authService,
    userService,
    bankService
} from '@/services/'

import {
    type UserResponse,
    type BankResponse,
    type BankListResponse
} from '@/types/axios'

/**
 * Authentication Store
 * Manages user authentication state and operations
 */
export const useAuthStore = defineStore('auth', () => {
    const user = ref<UserResponse | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const isAuthenticated = computed(() => !!user.value)

    const login = async (email: string, password: string) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await authService.login({ email, password })
            user.value = response.user
            return response
        } catch (err: any) {
            error.value = err.message || 'Login failed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
        isLoading.value = true
        error.value = null
        try {
            const newUser = await authService.register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            })
            user.value = newUser
            return newUser
        } catch (err: any) {
            error.value = err.message || 'Registration failed'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        isLoading.value = true
        error.value = null
        try {
            await authService.logout()
            user.value = null
        } catch (err: any) {
            error.value = err.message || 'Logout failed'
        } finally {
            isLoading.value = false
        }
    }

    const fetchProfile = async () => {
        isLoading.value = true
        error.value = null
        try {
            user.value = await authService.getProfile()
            return user.value
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch profile'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateProfile = async (name?: string, email?: string) => {
        isLoading.value = true
        error.value = null
        try {
            user.value = await authService.updateProfile({ name, email })
            return user.value
        } catch (err: any) {
            error.value = err.message || 'Failed to update profile'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const changePassword = async (currentPassword: string, password: string, passwordConfirmation: string) => {
        isLoading.value = true
        error.value = null
        try {
            await authService.changePassword({
                current_password: currentPassword,
                password,
                password_confirmation: passwordConfirmation,
            })
        } catch (err: any) {
            error.value = err.message || 'Failed to change password'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        user,
        isLoading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
        fetchProfile,
        updateProfile,
        changePassword,
    }
})

/**
 * User Store
 * Manages user CRUD operations and list state
 */
export const useUserStore = defineStore('users', () => {
    const users = ref<UserResponse[]>([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const perPage = ref(15)
    const total = ref(0)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const selectedUser = ref<UserResponse | null>(null)

    const fetchUsers = async (page = 1) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await userService.list(page)
            users.value = response.data
            currentPage.value = response.current_page
            totalPages.value = response.last_page
            perPage.value = response.per_page
            total.value = response.total
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch users'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const fetchUser = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            selectedUser.value = await userService.get(id)
            return selectedUser.value
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch user'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const createUser = async (name: string, email: string) => {
        isLoading.value = true
        error.value = null
        try {
            const newUser = await userService.create({ name, email })
            users.value.push(newUser)
            return newUser
        } catch (err: any) {
            error.value = err.message || 'Failed to create user'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateUser = async (id: number, name?: string, email?: string) => {
        isLoading.value = true
        error.value = null
        try {
            const updated = await userService.update(id, { name, email })
            const index = users.value.findIndex(u => u.id === id)
            if (index !== -1) users.value[index] = updated
            if (selectedUser.value?.id === id) selectedUser.value = updated
            return updated
        } catch (err: any) {
            error.value = err.message || 'Failed to update user'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const deleteUser = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            await userService.delete(id)
            users.value = users.value.filter(u => u.id !== id)
        } catch (err: any) {
            error.value = err.message || 'Failed to delete user'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        users,
        currentPage,
        totalPages,
        perPage,
        total,
        isLoading,
        error,
        selectedUser,
        fetchUsers,
        fetchUser,
        createUser,
        updateUser,
        deleteUser,
    }
})

/**
 * Bank Store
 * Manages bank CRUD operations and list state
 */
export const useBankStore = defineStore('banks', () => {
    const banks = ref<BankResponse[]>([])
    const currentPage = ref(1)
    const totalPages = ref(1)
    const perPage = ref(15)
    const total = ref(0)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const selectedBank = ref<BankResponse | null>(null)

    const fetchBanks = async (page = 1) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await bankService.list(page)
            banks.value = response.data
            currentPage.value = response.current_page
            totalPages.value = response.last_page
            perPage.value = response.per_page
            total.value = response.total
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch banks'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const fetchBank = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            selectedBank.value = await bankService.get(id)
            return selectedBank.value
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch bank'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const createBank = async (name: string, code: string) => {
        isLoading.value = true
        error.value = null
        try {
            const newBank = await bankService.create({ name, code })
            banks.value.push(newBank)
            return newBank
        } catch (err: any) {
            error.value = err.message || 'Failed to create bank'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const updateBank = async (id: number, name: string, code: string) => {
        isLoading.value = true
        error.value = null
        try {
            const updated = await bankService.update(id, { name, code })
            const index = banks.value.findIndex(b => b.id === id)
            if (index !== -1) banks.value[index] = updated
            if (selectedBank.value?.id === id) selectedBank.value = updated
            return updated
        } catch (err: any) {
            error.value = err.message || 'Failed to update bank'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    const deleteBank = async (id: number) => {
        isLoading.value = true
        error.value = null
        try {
            await bankService.delete(id)
            banks.value = banks.value.filter(b => b.id !== id)
        } catch (err: any) {
            error.value = err.message || 'Failed to delete bank'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        banks,
        currentPage,
        totalPages,
        perPage,
        total,
        isLoading,
        error,
        selectedBank,
        fetchBanks,
        fetchBank,
        createBank,
        updateBank,
        deleteBank,
    }
})
