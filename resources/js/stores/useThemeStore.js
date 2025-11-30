import { defineStore } from 'pinia';
import { ref } from 'vue';

/**
 * Manages the theme state ('light' or 'dark').
 */
export const useThemeStore = defineStore('theme', () => {
    
    // STATE: Holds the current theme setting.
    const currentTheme = ref('light');

    // ACTION: Toggles the theme and saves the preference.
    function toggleTheme() {        
        document.documentElement.classList.toggle('dark');
        currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
        console.log(document.documentElement.classList.classList);
        
        
        localStorage.setItem('theme', currentTheme.value);
    }

    // ACTION: Initializes theme from localStorage or system preference.
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            currentTheme.value = savedTheme;
        } else if (prefersDark) {
            currentTheme.value = 'dark';
        } else {
            currentTheme.value = 'light';
        }
    }
    
    return { currentTheme, toggleTheme, initializeTheme };
});