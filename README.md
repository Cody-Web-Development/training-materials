# Laravel Training
1. [Introduction](#introduction)
2. [Installation and Setup](#installation-and-setup)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [DevOps](#devops)
4. [Cheat Sheet](#cheat-sheet)
   - [Composer Commands](#composer-commands) 
   - [NPM Commands](#npm-commands) 
   - [Artisan Commands](#artisan-commands) 
   - [VueJS](#vuejs) 


## Introduction
Laravel is a powerful PHP framework that simplifies building modern, secure, and scalable web applications. This training equips you with hands-on experience in routing, database management, authentication, and more.

Gain practical skills, adopt best coding practices, and accelerate your development workflow—preparing you to confidently tackle real-world projects and enhance your career prospects.

## Installation and Setup
### Prerequisites
* Docker
* WSL2 enabled if using Windows
* NodeJS >= `24.11.1`
* PHP version >= `8.1`
   * BCMath PHP Extension
   * Ctype PHP Extension
   * Fileinfo PHP Extension
   * JSON PHP Extension
   * Mbstring PHP Extension
   * OpenSSL PHP Extension
   * PDO PHP Extension
   * Tokenizer PHP Extension
   * XML PHP Extension
* Composer >= `2.9.2`

**Note:** Docker is not required if we are not using Laravel Sail, enabling WSL2 well be required if using Windows, See official [How to install Linux on Windows with WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

---

### Installation
#### Option 1: Using Laravel Sail (Docker) — macOS, Windows (WSL2), Linux

1. Install Docker Desktop
 - Windows: also enable `WSL2`.
2. Create a new Laravel project
	```
	curl -s https://laravel.build/example-app | bash
	```
3. Start Laravel Sail
	```
	cd example-app
	./vendor/bin/sail up
	```
4. Open in browser
	```
	Visit: http://localhost
	```

#### Option 2: Install via Composer (No Docker Required)
If you already have PHP & Composer installed:

1. Create project using Composer
	```
	composer create-project laravel/laravel example-app
	cd example-app
	php artisan serve
	```
	Visit: [http://127.0.0.1:8000](http://127.0.0.1:8000)
2. Using the Laravel Installer
	1. Install installer:
		```
		composer global require laravel/installer
		```
	2. Create a project:
		```
		laravel new example-app
		cd example-app
		php artisan serve
		```
	
## DevOps
## Cheat Sheet
### Composer Commands
##### Installing Dependencies
| Command | Description |
|:---|:---|
| `composer install` | Downloads and installs all the libraries and dependencies outlined in the composer.lock file. If the file does not exist it will look for `composer.json` and do the same, creating a `composer.lock` file. |
| `composer install --dry-run` | Simulates the install without installing anything. This command doesn’t change any file. If composer.lock is not present, it will create it.|

**Note:** `composer.lock` should always be committed to the repository. It has all the information needed to bring the local dependencies to the last committed state. If that file is modified on the repository, you will need to run composer install again after fetching the changes to update your local dependencies to those on that file.

---

##### Updating Packages
| Command | Description |
|:---|:---|
| `composer uodate` | Updates all packages |
| `composer update --with-dependencies` | Updates all packages and its dependencies |
| `composer update vendor/package	` | Updates a certain package from vendor |
| `composer update vendor/*` | Updates all packages from vendor |
| `composer update --lock` | Updates `composer.lock` hash without updating any packages |

**Note:** This command changes only the composer.lock file.

---

##### Adding packages
| Command | Description |
|:---|:---|
| `composer require vendor/package` | Adds package from vendor to composer.json’s require section and installs it |
| `composer require vendor/package --dev` | Adds package from vendor to composer.json’s require-dev section and installs it. |

**Note:** This command changes both the `composer.json` and `composer.lock` files.

---

##### Passing Versions packages
| Command | Description |
|:---|:---|
|`composer require vendor/pkg` | `1.3.2`	Installs `1.3.2` |
|`composer require vendor/pkg` | `>=1.3.2`	Above or equal `1.3.2` |
|`composer require vendor/pkg` | `<1.3.2`	Below `1.3.2` |
|`composer require vendor/pkg` | `1.3.*`	Latest of `>=1.3.0` `<1.4.0` |
|`composer require vendor/pkg` | `~1.3.2`	Latest of `>=1.3.2` `<1.4.0` |
|`composer require vendor/pkg` | `~1.3`	Latest of `>=1.3.0` `<2.0.0`
|`composer require vendor/pkg` | `^1.3.2`	Latest of `>=1.3.2` `<2.0.0` |
|`composer require vendor/pkg` | `^1.3`	Latest of `>=1.3.0` `<2.0.0`
|`composer require vendor/pkg` | `^0.3.2`	Latest of `>=0.3.0` `<0.4.0` (for `pre-1.0`) |
|`composer require vendor/pkg` | `dev-BRANCH_NAME`	From the branch `BRANCH_NAME` |

---

##### Removing Packages
| Command | Description |
|:---|:---|
|`composer remove vendor/package`|Removes vendor/package from `composer.json` and uninstalls it|

**Note:** This command changes both the composer.json and composer.lock files.

---

##### Verifying
| Command | Description |
|:---|:---|
|`composer outdated --direct`|Show only packages that are outdated directly required by the root package|

---

##### Updating Autloader
| Command | Description |
|:---|:---|
|`composer dumpautoload -o`|Generates optimized autoload files|
---

### NPM Commands

| Command | Flags / Options | Description / Notes |
|:---------|:----------------|:-------------------|
| `npm init` | `-y` | Initializes a new Node.js project with interactive prompts. `-y` skips prompts with defaults. |
| `npm install <package>` | `-D`, `--save-dev`, `-g`, `--global`, `--save-optional`, `--legacy-peer-deps` | Installs a package. By default, installs locally. Use `-D` for dev dependencies, `-g` for global installation. |
| `npm uninstall <package>` | `-g`, `--global` | Removes a package locally or globally. Updates `package.json`. |
| `npm update <package>` | `-g`, `--global` | Updates a package to latest version respecting semver rules. |
| `npm outdated` | | Shows outdated packages compared to the latest available version. |
| `npm list` | `-g`, `--global`, `--depth=0` | Lists installed packages. Use `--depth=0` to see only top-level packages. |
| `npm run <script>` | | Runs a script defined in `package.json` under `"scripts"`. Examples: `npm start`, `npm test`. |
| `npm start` | | Runs the `"start"` script from `package.json`. Commonly used to start apps. |
| `npm test` | | Runs the `"test"` script from `package.json`. |
| `npm publish` | `--access public`, `--tag <tag>` | Publishes a package to the npm registry. Use `--access public` for public packages. |
| `npm unpublish <package>@<version>` | | Removes a package version from the npm registry (within 72 hours). |
| `npm cache clean` | `--force` | Clears npm cache to fix caching issues. |
| `npm config get <key>` | | Gets a configuration value. Example: `npm config get registry`. |
| `npm config set <key> <value>` | | Sets an npm configuration value. Example: `npm config set init.author.name "Your Name"`. |
| `npm audit` | | Checks for security vulnerabilities in dependencies. |
| `npm audit fix` | `--force` | Fixes vulnerabilities automatically if possible. `--force` may apply breaking updates. |
| `npx <package>` | | Executes package binaries without global installation. Great for one-time commands like `npx create-react-app my-app`. |
| `npm init @<template>` | | Initializes a project using a template. Example: `npm init @vitejs/app`. |
| `npm prune` | | Removes extraneous packages not listed in `package.json`. |
| `npm version <patch\|minor\|major>` | | Bumps project version in `package.json` automatically. |
| `npm root` | `-g` | Shows the path to the local or global `node_modules` folder. |
| `npm help <command>` | | Displays help information for a specific npm command. |
| `npm doctor` | | Checks the health of your npm environment and installation. |
| `npm link <package>` | | Symlinks a local package for development, useful for testing local modules. |
| `npm rebuild` | | Rebuilds native addons after Node version upgrades. |
| `npm pack` | | Packages the project into a `.tgz` file without publishing. |
| `npm explore <package>` | | Opens a shell in the package folder. Useful for inspecting modules. |
| `npm login` | | Authenticates with the npm registry to publish packages. |
| `npm logout` | | Logs out from the npm registry. |
| `npm whoami` | | Displays the currently logged-in npm username. |
| `npm ci` | | Clean install for CI/CD environments. Faster than `npm install` and respects `package-lock.json`. |
| `npm shrinkwrap` | | Locks dependencies exactly like `package-lock.json` for reproducible installs. |

---

##### Quick Flags Reference
- `-g` / `--global` → Install/remove/update packages globally  
- `-D` / `--save-dev` → Save as dev dependency  
- `--save-optional` → Save as optional dependency  
- `--force` → Force an operation (may overwrite or break things)  
- `--legacy-peer-deps` → Ignore peer dependency conflicts  

---

##### Local vs Global Tips
- **Local**: Installed in `node_modules` of the project; available only in that project.  
- **Global**: Installed system-wide; CLI commands accessible anywhere (`npm i -g <package>`).  
- Use `npx` to avoid global installations for one-time commands.  

---

##### Recommended Workflow
1. `npm init -y` → initialize project  
2. `npm install` → install dependencies  
3. `npm run start` → run project  
4. `npm test` → run tests  
5. `npm audit` → check for vulnerabilities  
6. `npm update` → keep packages updated  
7. `npm run build` → prepare production build (if applicable)  
---

### Artisan Commands
##### General Commands
| Command                      | Description                  |
| :---------------------------- | :---------------------------- |
| `php artisan list`           | List all artisan commands    |
| `php artisan help <command>` | Show command help            |
| `php artisan --version`      | Show Laravel version         |
| `php artisan serve`          | Start the Laravel dev server |
| `php artisan env`            | Show current environment     |

---

##### Application Maintenance & Environment
| Command                            | Description                   |
| :---------------------------------- | :----------------------------- |
| `php artisan down`                 | Enable maintenance mode       |
| `php artisan down --render=<view>` | Use a custom maintenance view |
| `php artisan up`                   | Disable maintenance mode      |
| `php artisan key:generate`         | Generate app key              |
| `php artisan storage:link`         | Create storage symlink        |
| `php artisan inspire`              | Output a quote                |

---

##### Laravel Sail Commands
| Command                              | Description               |
| :------------------------------------ | :------------------------- |
| `./vendor/bin/sail up`               | Start Sail services       |
| `./vendor/bin/sail up -d`            | Start in detached mode    |
| `./vendor/bin/sail down`             | Stop all containers       |
| `./vendor/bin/sail build`            | Rebuild the Docker images |
| `./vendor/bin/sail artisan <cmd>`    | Run artisan inside Sail   |
| `./vendor/bin/sail node <cmd>`       | Run Node commands         |
| `./vendor/bin/sail npm install`      | Install npm dependencies  |
| `./vendor/bin/sail composer install` | Run Composer inside Sail  |
| `./vendor/bin/sail test`             | Run tests                 |
| `./vendor/bin/sail shell`            | Enter the container shell |
| `./vendor/bin/sail tinker`           | Use Tinker inside Sail    |

---

##### Cache & Optimization
| Command                          | Description                      |
| :-------------------------------- | :-------------------------------- |
| `php artisan cache:clear`        | Clear cache                      |
| `php artisan cache:forget <key>` | Remove single cache item         |
| `php artisan config:cache`       | Cache config files               |
| `php artisan config:clear`       | Clear config cache               |
| `php artisan route:cache`        | Cache routes                     |
| `php artisan route:clear`        | Clear route cache                |
| `php artisan view:cache`         | Cache Blade views                |
| `php artisan view:clear`         | Clear compiled views             |
| `php artisan optimize`           | Optimize + cache (routes/config) |
| `php artisan optimize:clear`     | Clear all optimizations          |

---

##### Routes
| Command                                            | Description                |
| :-------------------------------------------------- | :-------------------------- |
| `php artisan route:list`                           | List all routes            |
| `php artisan route:list --columns=method,uri,name` | List with specific columns |

---

##### Controllers
| Command                                      | Description                   |
| :-------------------------------------------- | :----------------------------- |
| `php artisan make:controller UserController` | Create controller             |
| `php artisan make:controller --resource`     | Resource controller           |
| `php artisan make:controller --api`          | API resource controller       |
| `php artisan make:controller --model=Post`   | Controller with model binding |

---

##### Models & Eloquent Commands
| Command                                         | Description                 |
| :----------------------------------------------- | :--------------------------- |
| `php artisan make:model Post`                   | Create a model              |
| `php artisan make:model Post -m`                | Model + migration           |
| `php artisan make:model Post -mf`               | Model + migration + factory |
| `php artisan make:model Post -a`                | Model + all related files   |
| `php artisan make:migration create_posts_table` | Create a migration          |
| `php artisan make:factory PostFactory`          | Create factory              |

---

##### Database: Migrations
| Command                                 | Description                     |
| :--------------------------------------- | :------------------------------- |
| `php artisan migrate`                   | Run pending migrations          |
| `php artisan migrate:rollback`          | Roll back last batch            |
| `php artisan migrate:rollback --step=1` | Roll back steps                 |
| `php artisan migrate:status`            | Migration status                |
| `php artisan migrate:reset`             | Roll back all                   |
| `php artisan migrate:refresh`           | Reset and re-run all            |
| `php artisan migrate:fresh`             | Drop all tables & migrate fresh |

---

##### Database: Seeders
| Command                                  | Description         |
| :---------------------------------------- | :------------------- |
| `php artisan make:seeder UserSeeder`     | Create seeder       |
| `php artisan db:seed`                    | Run all seeders     |
| `php artisan db:seed --class=UserSeeder` | Run specific seeder |
| `php artisan db:show`                    | Show DB info        |
| `php artisan db:wipe`                    | Drop all tables     |

---

##### Queues
| Command                          | Description                  |
| :-------------------------------- | :---------------------------- |
| `php artisan queue:work`         | Process jobs                 |
| `php artisan queue:listen`       | Listen for jobs              |
| `php artisan queue:retry <id>`   | Retry failed job             |
| `php artisan queue:failed`       | Show failed jobs             |
| `php artisan queue:failed-table` | Create failed jobs migration |
| `php artisan queue:restart`      | Restart queue workers        |
| `php artisan queue:flush`        | Remove failed jobs           |
| `php artisan queue:forget <id>`  | Delete a failed job          |

---

##### Events & Jobs
| Command                                           | Description                |
| :------------------------------------------------- | :-------------------------- |
| `php artisan make:event UserRegistered`           | Create event               |
| `php artisan make:listener SendEmailNotification` | Create listener            |
| `php artisan make:job ProcessVideo`               | Create queue job           |
| `php artisan event:generate`                      | Generate missing listeners |

---

##### Middleware
| Command                                 | Description       |
| :--------------------------------------- | :----------------- |
| `php artisan make:middleware CheckRole` | Create middleware |

---

##### Requests
| Command                                     | Description         |
| :------------------------------------------- | :------------------- |
| `php artisan make:request StorePostRequest` | Create form request |

---

##### Composer & Package Discovery
| Command                        | Description           |
| :------------------------------ |:--------------------- |
| `php artisan package:discover` | Rebuild package cache |

---

##### Notifications & Mail
| Command                                     | Description         |
| :------------------------------------------- | :------------------- |
| `php artisan make:notification InvoicePaid` | Create notification |
| `php artisan make:mail WelcomeEmail`        | Create mailable     |

---

##### Testing
| Command                              | Description           |
| :------------------------------------ | :--------------------- |
| `php artisan test`                   | Run tests             |
| `php artisan test --parallel`        | Run tests in parallel |
| `php artisan test --filter UserTest` | Run specific test     |

---

##### Tinker (Eloquent REPL Shell)
| Command                                         | Description                         |
| :----------------------------------------------- | :----------------------------------- |
| `php artisan tinker`                            | Open interactive shell              |
| `User::all()`                                   | Example tinker: list users          |
| `php artisan tinker --execute="User::count()"`  | Run one-line tinker command         |
| `php artisan tinker --execute="Cache::clear()"` | Execute code without entering shell |

---

##### Scheduling
| Command                            | Description          |
| :---------------------------------- | :-------------------- |
| `php artisan schedule:run`         | Run scheduled tasks  |
| `php artisan schedule:list`        | List scheduled tasks |
| `php artisan schedule:clear-cache` | Clear schedule cache |

### VueJS

| Command | Description |
|:---------|:-------------|
| `npm install -g @vue/cli` | Install Vue CLI globally. |
| `vue create <project>` | Create a new Vue project. |
| `cd <project>` | Go into project directory. |
| `npm run serve` | Start development server. |
| `npm run build` | Build project for production. |
| `npm run lint` | Run ESLint checks. |
| `vue add router` | Add Vue Router (SPA routing). |
| `vue add vuex` | Add Vuex (state management). |
| `vue ui` | Launch Vue GUI for project management. |
| `vue info` | Display system info & debug CLI issues. |
| `npm outdated` | Check for outdated packages. |
| `npm update` | Update dependencies. |

---

##### Directives (Most Used)
| Directive | Usage | Notes |
|:-----------|:-------|:------|
| `v-if` | `<div v-if="show">...</div>` | Conditional rendering. |
| `v-else` | `<div v-else>...</div>` | Alternative block if `v-if` is false. |
| `v-for` | `<li v-for="item in items">{{ item }}</li>` | Loop through arrays/objects. |
| `v-model` | `<input v-model="text">` | Two-way data binding. |
| `v-bind` | `<img :src="imageUrl">` | Bind attribute dynamically. |
| `v-on` | `<button @click="handleClick">Click</button>` | Listen to events. |

---

##### Component Essentials
| Feature | Usage |
|:---------|:-------|
| Props | Pass data to child: `props: ['name']` |
| Events | Emit to parent: `this.$emit('event')` |
| Slots | `<slot></slot>` for content injection |
| Single File Components | `.vue` with `<template>`, `<script>`, `<style>` |
| Lifecycle Hooks | `created`, `mounted`, `updated`, `beforeUnmount` |

---

##### Vue 3 Composition API
```js
import { ref, reactive, computed } from 'vue';

setup() {
  const count = ref(0);
  const state = reactive({ name: 'Vue' });
  const doubled = computed(() => count.value * 2);

  function increment() { count.value++ }

  return { count, state, doubled, increment };
}
