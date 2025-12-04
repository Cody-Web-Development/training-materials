<?php
namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Service\UserService;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\PersonalAccessToken;

class MetricsController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Return simple admin metrics used by the minimal dashboard.
     */
    public function index(Request $request): JsonResponse
    {
        $totalUsers = User::count();

        // Count logged-in users using UserService
        $loggedInUsers = $this->userService->countLoggedInUsers();

        // Failed login attempts counter stored in cache (incremented on auth failure).
        $failedAttempts = Cache::get('auth_failed_count', 0);

        return response()->json([
            'total_users' => $totalUsers,
            'logged_in_users' => $loggedInUsers,
            'failed_attempts' => $failedAttempts,
        ]);
    }
}
