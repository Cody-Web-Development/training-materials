<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\User; // Assuming User model

class ApiAuthController extends Controller
{
    /**
     * Handle API Token Login.
     */
    public function auth(Request $request): JsonResponse
    {
        // 1. Basic Validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Authenticate Credentials
        if (!Auth::attempt($request->only('email', 'password'))) {
            // Throw a standard HTTP response error (401 Unauthorized)
            throw ValidationException::withMessages([
                'email' => ['Invalid Email/Password. Pleas try again.'],
            ]);
        }

        // 3. Authentication Successful: Create Sanctum Token
        $user = Auth::user();

        // Ensure old tokens are revoked if desired, then create a new one.
        $user->tokens()->delete(); 
        
        // Create the token with defined abilities (permissions)
        $token = $user->createToken('auth-token', ['server:update'])->plainTextToken;

        return response()->json([
            'token' => $token,
            'token_type' => 'Bearer',
            'user' => $user->only('id', 'name', 'email'),
        ], 200);
    }

    /**
     * Revoke API Token (Logout).
     */
    public function logout(Request $request): JsonResponse
    {
        // The current token is available via $request->user()->currentAccessToken()
        // Delete the token used for the current request.
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Token revoked successfully.'], 200);
    }
}