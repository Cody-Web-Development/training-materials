# Queue System Documentation

This document describes the generic queue system implemented for sending messages to various queue backends (RabbitMQ, Redis, Database).

## Overview

The queue system provides a unified interface for sending messages to different queue types through Laravel's job system. It includes:

- **QueueMessageJob**: Generic job class for handling queue messages
- **MessageDispatcher**: Utility class for easy message dispatching
- Support for multiple queue types: RabbitMQ, Redis, Database

## Components

### 1. QueueMessageJob
**Location**: `app/Jobs/QueueMessageJob.php`

A generic job that can send messages to different queue types based on configuration.

**Features:**
- Support for RabbitMQ, Redis, and Database queues
- Automatic queue routing based on type
- Error handling and logging
- Failed job handling

### 2. MessageDispatcher
**Location**: `app/Service/MessageDispatcher.php`

A utility class providing static methods for easy message dispatching.

**Features:**
- Pre-built methods for common events (auth success/failure, user updates)
- Generic event dispatching
- Synchronous dispatching for testing
- Error handling without breaking application flow

## Usage

### Basic Usage

```php
use App\Service\MessageDispatcher;

// Send to RabbitMQ (default)
MessageDispatcher::toRabbitMQ([
    'event' => 'user_registered',
    'user_id' => 123,
    'email' => 'user@example.com'
], 'user.registered');

// Send to Redis
MessageDispatcher::toRedis([
    'event' => 'order_created',
    'order_id' => 456,
    'amount' => 99.99
]);

// Send to Database (for testing)
MessageDispatcher::toDatabase([
    'event' => 'test_event',
    'data' => 'test_data'
]);
```

### Authentication Events

```php
use App\Service\MessageDispatcher;

// Authentication success
MessageDispatcher::authSuccess([
    'email' => 'user@example.com',
    'ip_address' => '192.168.1.100',
    'user_agent' => 'Mozilla/5.0...'
], 'rabbitmq');

// Authentication failure
MessageDispatcher::authFailure([
    'email' => 'user@example.com',
    'ip_address' => '192.168.1.100',
    'user_agent' => 'Mozilla/5.0...',
    'failure_reason' => 'invalid_credentials'
], 'rabbitmq');
```

### User Events

```php
use App\Service\MessageDispatcher;

// User updated
MessageDispatcher::userUpdated([
    'id' => 123,
    'email' => 'user@example.com',
    'changes' => ['name' => 'New Name']
], 'rabbitmq');
```

### Generic Events

```php
use App\Service\MessageDispatcher;

// Custom event
MessageDispatcher::event('custom_event', [
    'custom_data' => 'value',
    'timestamp' => now()->toIso8601String()
], 'rabbitmq', 'custom.routing.key');
```

## Configuration

### Queue Configuration
Update `config/queue.php` to set your default queue type:

```php
'default' => env('QUEUE_CONNECTION', 'rabbitmq'), // or 'redis', 'database'
```

### RabbitMQ Configuration
```php
'rabbitmq' => [
    'driver' => 'rabbitmq',
    'host' => env('RABBITMQ_HOST', '127.0.0.1'),
    'port' => env('RABBITMQ_PORT', 5672),
    'user' => env('RABBITMQ_USER', 'guest'),
    'password' => env('RABBITMQ_PASSWORD', 'guest'),
    'vhost' => env('RABBITMQ_VHOST', '/'),
    'exchange' => env('RABBITMQ_EXCHANGE', 'app_events'),
    'exchange_type' => env('RABBITMQ_EXCHANGE_TYPE', 'topic'),
],
```

### Environment Variables
```env
QUEUE_CONNECTION=rabbitmq
RABBITMQ_HOST=127.0.0.1
RABBITMQ_PORT=5672
RABBITMQ_USER=guest
RABBITMQ_PASSWORD=guest
RABBITMQ_EXCHANGE=app_events
RABBITMQ_EXCHANGE_TYPE=topic
```

## Message Format

All messages follow a consistent JSON structure:

```json
{
  "event_type": "user_authentication",
  "timestamp": "2025-12-04T10:30:00.000000Z",
  "user_email": "user@example.com",
  "status": "success",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0...",
  "failure_reason": null,
  "metadata": {
    "source": "laravel_app",
    "version": "1.0.0"
  }
}
```

## Queue Types

### RabbitMQ
- **Exchange**: Configurable (default: `app_events`)
- **Exchange Type**: Configurable (default: `topic`)
- **Routing Keys**: Event-specific (e.g., `auth.login.success`, `user.updated`)
- **Persistence**: Messages are persistent
- **Requirements**: `php-amqplib/php-amqplib` package

### Redis
- **Key**: Configurable via options (`redis_key`)
- **Streams Support**: Optional Redis Streams support
- **Default Key**: `queue:messages`
- **Options**:
  ```php
  MessageDispatcher::toRedis($message, null, null, [
      'redis_key' => 'custom:key',
      'use_streams' => true
  ]);
  ```

### Database
- **Table**: `queue_messages`
- **Purpose**: Testing and fallback storage
- **Auto-creates table structure if needed**

## Routing Keys

### Authentication Events
- `auth.login.success` - Successful login
- `auth.login.failed` - Failed login attempt

### User Events
- `user.updated` - User profile updated

### Generic Events
- Uses event type as routing key by default
- Can be overridden with custom routing key

## Error Handling

### Job-Level Errors
- Failed jobs are logged with full context
- Jobs can be retried based on Laravel queue configuration
- Permanent failures trigger the `failed()` method

### Dispatcher-Level Errors
- MessageDispatcher catches exceptions and logs them
- Application continues running even if queue dispatch fails
- No exceptions thrown to prevent breaking user workflows

## Testing

### Synchronous Dispatching

For testing, you can dispatch messages synchronously:

```php
use App\Service\MessageDispatcher;

MessageDispatcher::dispatchSync('rabbitmq', [
    'event' => 'test_event',
    'data' => 'test'
], 'test.routing.key');
```

### Queue Worker

Make sure your queue worker is running:

```bash
php artisan queue:work
```

Or for specific queue:

```bash
php artisan queue:work --queue=rabbitmq
```

## Monitoring

### Logs
Check Laravel logs for queue activity:

```bash
tail -f storage/logs/laravel.log | grep -i queue
```

### Queue Monitoring
- RabbitMQ Management UI: `http://localhost:15672`
- Laravel Horizon (if installed): `/horizon`
- Database table: `queue_messages` (for database queue type)

## Examples

### In a Controller
```php
<?php

namespace App\Http\Controllers;

use App\Service\MessageDispatcher;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function update(Request $request, $id)
    {
        // Update user logic...
        $user = User::find($id);
        $changes = $user->update($request->validated());

        // Dispatch event
        MessageDispatcher::userUpdated([
            'id' => $user->id,
            'email' => $user->email,
            'changes' => $changes
        ]);

        return response()->json(['message' => 'User updated']);
    }
}
```

### In a Job
```php
<?php

namespace App\Jobs;

use App\Service\MessageDispatcher;

class ProcessOrder extends Job
{
    public function handle()
    {
        // Process order logic...

        // Dispatch event
        MessageDispatcher::event('order_processed', [
            'order_id' => $this->orderId,
            'status' => 'completed',
            'processed_at' => now()
        ], 'rabbitmq', 'order.processed');
    }
}
```

### In an Event Listener
```php
<?php

namespace App\Listeners;

use App\Service\MessageDispatcher;
use Illuminate\Auth\Events\Login;

class LogSuccessfulLogin
{
    public function handle(Login $event)
    {
        MessageDispatcher::authSuccess([
            'email' => $event->user->email,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent()
        ]);
    }
}
```

## Best Practices

1. **Use Appropriate Queue Types**: Choose RabbitMQ for production, Database for testing
2. **Handle Failures Gracefully**: Queue failures shouldn't break user workflows
3. **Monitor Queue Health**: Set up monitoring for queue workers and message processing
4. **Use Descriptive Routing Keys**: Make routing keys specific and hierarchical
5. **Include Metadata**: Always include source and version information
6. **Test Thoroughly**: Use synchronous dispatching for unit tests
7. **Log Strategically**: Use appropriate log levels (debug for success, error for failures)

## Troubleshooting

### RabbitMQ Connection Issues
- Verify RabbitMQ is running and accessible
- Check credentials and virtual host permissions
- Ensure exchange exists or can be auto-created

### Redis Connection Issues
- Verify Redis is running and accessible
- Check Redis configuration in Laravel
- Test Redis connectivity with `php artisan tinker`

### Job Processing Issues
- Check queue worker status: `php artisan queue:status`
- Review failed jobs: `php artisan queue:failed`
- Verify job class imports and dependencies

### Message Not Appearing
- Check queue worker logs for processing errors
- Verify routing keys match consumer expectations
- Test with synchronous dispatching first
