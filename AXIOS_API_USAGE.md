# Vue.js Axios API Utility - Complete Guide

A reusable, type-safe API client built with Axios and Pinia for Vue 3 applications. This utility provides centralized API communication with automatic token management, error handling, and reactive state management.

## Features

✅ **Axios-based HTTP client** with request/response interceptors
✅ **Automatic token management** - stores and applies Bearer tokens
✅ **TypeScript types** for all endpoints and responses
✅ **Pinia stores** for reactive state management
✅ **Error handling** - centralized error responses with 401 auth checks
✅ **Loading states** - automatic isLoading flags for UI feedback
✅ **Reusable service layer** - organized endpoint methods
✅ **Zero configuration** - works out of the box with sensible defaults

## Installation

### 1. Ensure dependencies are installed

```bash
npm install axios pinia
```

### 2. Files included

- `resources/js/lib/axios-client.ts` - Core API client
- `resources/js/lib/axios-services.ts` - Typed service methods
- `resources/js/stores/axios-store.ts` - Pinia stores for state management

## Configuration

### Environment Variables

Add to your `.env` file:

```env
VITE_API_URL=http://localhost:8000
```

If not set, defaults to `http://localhost`.

### Setup in main.ts

```typescript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## Usage Examples

### 1. Using the API Client Directly

#### Login and get token

```typescript
import { apiClient } from '@/lib/axios-client'
import { authService } from '@/lib/axios-services'

// Login
const response = await authService.login({
    email: 'user@example.com',
    password: 'password123'
})

// Token is automatically stored and used in all requests
console.log(response.user) // User data
```

#### Fetch data with authentication

```typescript
// Token is automatically included in headers
const user = await authService.getProfile()
console.log(user.email) // Fully typed!
```

#### Manual API calls

```typescript
import { apiClient } from '@/lib/axios-client'

// GET request
const data = await apiClient.get('/api/v1/users')

// POST request
const newUser = await apiClient.post('/api/v1/users', {
    name: 'John Doe',
    email: 'john@example.com'
})

// PATCH request
const updated = await apiClient.patch('/api/v1/users/1', {
    name: 'Jane Doe'
})

// DELETE request
await apiClient.delete('/api/v1/users/1')
```

#### Manage tokens manually

```typescript
import { apiClient } from '@/lib/axios-client'

// Set token (usually done after login)
apiClient.setToken('your-api-token-here')

// Get current token
const token = apiClient.getToken()

// Clear token (logout)
apiClient.clearToken()
```

### 2. Using Services (Recommended)

Services provide typed, ready-to-use methods for common operations.

#### Authentication Service

```typescript
import { authService } from '@/lib/axios-services'

// Login
const response = await authService.login({
    email: 'user@example.com',
    password: 'password'
})
// Token auto-saved, returns: { access_token, user }

// Register
const newUser = await authService.register({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    password_confirmation: 'password123'
})

// Get profile
const user = await authService.getProfile()

// Update profile
const updated = await authService.updateProfile({
    name: 'Jane Doe',
    email: 'jane@example.com'
})

// Change password
await authService.changePassword({
    current_password: 'old123',
    password: 'new123',
    password_confirmation: 'new123'
})

// Logout
await authService.logout() // Clears token
```

#### User Service

```typescript
import { userService } from '@/lib/axios-services'

// List users with pagination
const response = await userService.list(1) // Page 1
console.log(response.data) // User[]
console.log(response.current_page) // 1
console.log(response.total) // 42

// Get single user
const user = await userService.get(1)

// Create user
const newUser = await userService.create({
    name: 'John Doe',
    email: 'john@example.com'
})

// Update user
const updated = await userService.update(1, {
    name: 'Jane Doe'
})

// Delete user
await userService.delete(1)
```

#### Bank Service

```typescript
import { bankService } from '@/lib/axios-services'

// List banks
const response = await bankService.list(1)

// Get bank
const bank = await bankService.get(1)

// Create bank
const newBank = await bankService.create({
    name: 'First National Bank',
    code: 'FNB'
})

// Update bank
const updated = await bankService.update(1, {
    name: 'First Bank of America',
    code: 'FBA'
})

// Delete bank
await bankService.delete(1)
```

### 3. Using Pinia Stores (Best for UI)

Stores provide reactive state and automatically handle loading/error states.

#### Auth Store

```typescript
<script setup lang="ts">
import { useAuthStore } from '@/stores/axios-store'

const authStore = useAuthStore()

// Reactive properties
const user = authStore.user // UserResponse | null
const isLoading = authStore.isLoading // boolean
const error = authStore.error // string | null
const isAuthenticated = authStore.isAuthenticated // computed boolean

// Methods
await authStore.login('user@example.com', 'password')
await authStore.register('John', 'john@example.com', 'pass123', 'pass123')
await authStore.logout()
await authStore.fetchProfile()
await authStore.updateProfile('Jane Doe', 'jane@example.com')
await authStore.changePassword('old', 'new', 'new')
</script>

<template>
    <div v-if="authStore.isLoading">Loading...</div>
    <div v-if="authStore.error" class="error">{{ authStore.error }}</div>
    <div v-if="authStore.isAuthenticated">
        Welcome, {{ authStore.user?.name }}!
    </div>
</template>
```

#### User Store

```typescript
<script setup lang="ts">
import { useUserStore } from '@/stores/axios-store'

const userStore = useUserStore()

// Load users
await userStore.fetchUsers(1) // Page 1

// Reactive properties
const users = userStore.users // UserResponse[]
const currentPage = userStore.currentPage // number
const totalPages = userStore.totalPages // number
const total = userStore.total // number
const isLoading = userStore.isLoading // boolean
const error = userStore.error // string | null

// CRUD operations
const newUser = await userStore.createUser('John Doe', 'john@example.com')
const fetched = await userStore.fetchUser(1)
const updated = await userStore.updateUser(1, 'Jane Doe', 'jane@example.com')
await userStore.deleteUser(1)
</script>

<template>
    <div v-if="userStore.isLoading">Loading...</div>
    <div v-if="userStore.error" class="error">{{ userStore.error }}</div>
    <ul>
        <li v-for="user in userStore.users" :key="user.id">
            {{ user.name }} ({{ user.email }})
        </li>
    </ul>
    <p>Page {{ userStore.currentPage }} of {{ userStore.totalPages }}</p>
</template>
```

#### Bank Store

```typescript
<script setup lang="ts">
import { useBankStore } from '@/stores/axios-store'

const bankStore = useBankStore()

// Load banks
await bankStore.fetchBanks(1)

// Reactive properties
const banks = bankStore.banks // BankResponse[]
const isLoading = bankStore.isLoading
const error = bankStore.error

// CRUD operations
const newBank = await bankStore.createBank('FNB', 'FNB')
const updated = await bankStore.updateBank(1, 'First National', 'FN')
await bankStore.deleteBank(1)
</script>

<template>
    <ul v-if="!bankStore.isLoading">
        <li v-for="bank in bankStore.banks" :key="bank.id">
            {{ bank.name }} ({{ bank.code }})
        </li>
    </ul>
</template>
```

## Error Handling

Errors are automatically caught and formatted. Handle them in your components:

```typescript
try {
    await authStore.login('user@example.com', 'password')
} catch (error: any) {
    console.error(error.message) // Error message
    console.error(error.errors) // Validation errors: { field: ['error'] }
    console.error(error.status) // HTTP status code
}
```

### 401 Unauthorized Handling

When a 401 error occurs, the token is automatically cleared and a custom event is emitted:

```typescript
window.addEventListener('unauthorized', () => {
    // Redirect to login
    window.location.href = '/login'
})
```

## Advanced Usage

### Custom API calls

Use the API client directly for endpoints not covered by services:

```typescript
import { apiClient } from '@/lib/axios-client'

const result = await apiClient.post('/api/v1/custom-endpoint', {
    data: 'value'
}, {
    headers: { 'X-Custom-Header': 'value' }
})
```

### Access raw axios instance

For advanced axios features:

```typescript
import { apiClient } from '@/lib/axios-client'

const axiosInstance = apiClient.getInstance()
// Use any axios feature
```

### Initialize with custom config

```typescript
import { AxiosApiClient } from '@/lib/axios-client'

const client = new AxiosApiClient({
    baseURL: 'https://api.example.com',
    timeout: 20000,
    headers: {
        'X-Custom': 'value'
    }
})
```

## Type Safety

All services and stores are fully typed with TypeScript:

```typescript
import {
    UserResponse,
    LoginRequest,
    BankListResponse,
    ChangePasswordRequest
} from '@/lib/axios-services'

// You get full IDE autocomplete and type checking
const user: UserResponse = await authService.getProfile()

const credentials: LoginRequest = {
    email: 'user@example.com',
    password: 'password'
}
```

## Best Practices

1. **Use stores in components** - They provide reactive state and loading indicators
2. **Handle errors** - Always wrap API calls in try/catch
3. **Show loading states** - Use `isLoading` flag for UX feedback
4. **Don't expose tokens in templates** - Keep sensitive data in stores only
5. **Create custom services** - Extend `axios-services.ts` for domain-specific logic
6. **Test with mocks** - Mock the API client in unit tests

## Architecture

```
┌─────────────────────────────────────┐
│   Vue Components                    │
│   (use stores and services)         │
└──────────────┬──────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼────────┐  ┌───▼──────────┐
│  Pinia Stores │  │  Services    │
│  (state mgmt) │  │  (API logic) │
└──────┬────────┘  └───┬──────────┘
       │                │
       └───────┬────────┘
               │
        ┌──────▼──────────┐
        │  Axios Client   │
        │  (HTTP layer)   │
        │  - Token mgmt   │
        │  - Interceptors │
        │  - Error handle │
        └─────────────────┘
```

## Troubleshooting

### Token not persisting
Check that localStorage is enabled in your browser.

### 401 errors on every request
Ensure the token is being set after login:
```typescript
await authService.login(email, password) // Sets token automatically
```

### CORS errors
Configure CORS on your Laravel backend:
```php
// config/cors.php
'allowed_origins' => ['http://localhost:5173'],
```

### Type errors in components
Make sure you're importing types from `axios-services.ts`:
```typescript
import type { UserResponse } from '@/lib/axios-services'
```

## License

MIT - Feel free to use and modify for your projects.
