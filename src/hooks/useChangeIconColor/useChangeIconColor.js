import { useEffect } from 'react';

/**
 * Change the favicon color dynamically.
 * @param {string} color - Hex color code for favicon, defaults to #000000
 * @returns {void}
 */
export function useChangeIconColor(color = '#000000') {
    useEffect(() => {
        const favicon = document.getElementById('favicon');
        if (!favicon) return;

        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-server-cog ">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5"></path>
          <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5"></path>
          <path d="M6 6h.01"></path>
          <path d="M6 18h.01"></path>
          <path d="m15.7 13.4-.9-.3"></path>
          <path d="m9.2 10.9-.9-.3"></path>
          <path d="m10.6 15.7.3-.9"></path>
          <path d="m13.6 15.7-.4-1"></path>
          <path d="m10.8 9.3-.4-1"></path>
          <path d="m8.3 13.6 1-.4"></path>
          <path d="m14.7 10.8 1-.4"></path>
          <path d="m13.4 8.3-.3.9"></path>
          </svg>
        `;

        try {
            const blob = new Blob([svgContent], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            favicon.href = url;
        } catch (error) {
            console.warn('useChangeIconColor: Failed to update favicon', error);
        }
    }, [color]);
}
