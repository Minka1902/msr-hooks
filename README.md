<div align="center">

# 🪝 msr-hooks

### A comprehensive collection of production-ready React hooks

[![npm version](https://img.shields.io/npm/v/msr-hooks.svg)](https://www.npmjs.com/package/msr-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**40+ hooks** • **TypeScript & JavaScript** • **SSR-Safe** • **Tree-Shakeable** • **Zero Dependencies**

</div>

---

## 📦 Installation

```bash
# npm
npm install msr-hooks

# yarn
yarn add msr-hooks

# pnpm
pnpm add msr-hooks
```

---

## ✨ Features

- 🎯 **40+ Production-Ready Hooks** - Cover all common use cases and advanced patterns
- 🔷 **Full TypeScript Support** - Complete type definitions included
- 🌐 **SSR-Safe** - Proper guards for Next.js, Gatsby, and other SSR frameworks
- 🌲 **Tree-Shakeable** - Import only what you need
- 📦 **Zero Dependencies** - Only React as peer dependency
- 📚 **Well-Documented** - JSDoc comments for IntelliSense
- ⚡ **Lightweight** - Minimal bundle impact
- ⏱️ **Time-Travel State** - Full timeline navigation with useStateHistory

---

## 📚 Available Hooks

### 🔧 Core Utilities (6 hooks)
| Hook | Description |
|------|-------------|
| `useEffectAfterMount` | Run effect only after component mounts |
| `useWindowSize` | Track window dimensions |
| `useDebounce` | Debounce values |
| `usePrevious` | Access previous prop/state value |
| `useToggle` | Simple boolean toggle state |
| `useLocalStorage` | Persist state to localStorage |

### 🎨 UI & Interaction (7 hooks)
| Hook | Description |
|------|-------------|
| `usePreventZoom` | Prevent pinch-zoom on mobile |
| `useChangeIconColor` | Dynamically change SVG icon colors |
| `useClickOutsideObject` | Detect clicks outside an element |
| `useKeyboardNavigation` | Navigate with arrow keys |
| `useEscapeKey` | Handle Escape key presses |
| `useParentWidth` | Track parent element width |
| `useResize` | Monitor element resize |

### 🛠️ Utility Hooks (7 hooks)
| Hook | Description |
|------|-------------|
| `useMediaQuery` | Reactive media query matching |
| `useClipboard` | Copy/paste clipboard operations |
| `useInterval` | Controlled interval with cleanup |
| `useTimeout` | Controlled timeout with cleanup |
| `useThrottle` | Throttle function execution |
| `useIntersectionObserver` | Detect element visibility |
| `useFetch` | Data fetching with caching |

### 📊 State Management & History (2 hooks)
| Hook | Description |
|------|-------------|
| `useUndoRedo` | Simple undo/redo (last 50 states) |
| `useStateHistory` | Full timeline with jump-to-index navigation |

### 🎬 Scroll & Animation (2 hooks)
| Hook | Description |
|------|-------------|
| `useElementScrollProgress` | Track scroll progress (0-1) |
| `useSpringValue` | Spring physics animation |

### 🌐 Network & Browser (4 hooks)
| Hook | Description |
|------|-------------|
| `useNetworkStatus` | Online/offline + connection quality |
| `useDocumentVisibility` | Tab focus/blur detection |
| `usePageLeave` | Trigger on page/tab close |
| `usePrefersReducedMotion` | Detect motion preference |

### 🏗️ DOM & Layout (2 hooks)
| Hook | Description |
|------|-------------|
| `useLockBodyScroll` | Lock/unlock body scrolling |
| `usePortal` | Portal element management |

### ⌨️ Events & Interaction (3 hooks)
| Hook | Description |
|------|-------------|
| `useKeyPressSequence` | Detect key sequences (like Konami codes) |
| `useHoverIntent` | Smart hover detection with delay |
| `useEventListener` | Generic event listener with cleanup |

### 🚀 Advanced Effects (3 hooks)
| Hook | Description |
|------|-------------|
| `useAsyncEffect` | Async effect with AbortSignal |
| `useDeepCompareEffect` | Effect with deep dependency comparison |
| `useIsomorphicLayoutEffect` | SSR-safe useLayoutEffect |

---

## 📖 Quick Examples

### useStateHistory - Time-Travel State

<details open>
<summary>Full Timeline Navigation</summary>

```javascript
import { useStateHistory } from 'msr-hooks';

function Editor() {
  const {
    state,
    set,
    history,
    pointer,
    jump,
    canUndo,
    canRedo,
    undo,
    redo,
    clearHistory,
  } = useStateHistory({ text: '' });

  return (
    <div>
      <textarea
        value={state.text}
        onChange={(e) => set({ text: e.target.value })}
      />
      
      <div>
        <button onClick={undo} disabled={!canUndo}>↶ Undo</button>
        <button onClick={redo} disabled={!canRedo}>↷ Redo</button>
        <button onClick={clearHistory}>Clear</button>
        <span>Position: {pointer + 1} / {history.length}</span>
      </div>

      <div>
        <h4>Timeline:</h4>
        {history.map((entry, idx) => (
          <button
            key={idx}
            onClick={() => jump(idx)}
            style={{ fontWeight: idx === pointer ? 'bold' : 'normal' }}
          >
            {idx}: {entry.text || '(empty)'}
          </button>
        ))}
      </div>
    </div>
  );
}
```

</details>

### useMediaQuery - Responsive Design

<details>
<summary>JavaScript</summary>

```javascript
import { useMediaQuery } from 'msr-hooks';

function ResponsiveNav() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  
  return (
    <nav>
      {isMobile && <MobileMenu />}
      {isDesktop && <DesktopMenu />}
    </nav>
  );
}
```

</details>

### useFetch - Data Fetching

<details>
<summary>JavaScript</summary>

```javascript
import { useFetch, useDebounce } from 'msr-hooks';
import { useState } from 'react';

function UsersList() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  
  const { data, loading, error, refetch } = useFetch(
    'https://api.example.com/users'
  );
  
  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {data?.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

</details>

### useLocalStorage - Persist State

<details>
<summary>JavaScript</summary>

```javascript
import { useLocalStorage } from 'msr-hooks';

function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  );
}
```

</details>

---

## 🚀 Advanced Examples

### useHoverIntent - Smart Hover Detection

```javascript
import { useRef } from 'react';
import { useHoverIntent } from 'msr-hooks';

function Tooltip() {
  const ref = useRef(null);
  const hovered = useHoverIntent(ref, {
    delay: 120,
    leaveDelay: 80,
    sensitivity: 8,
  });

  return (
    <div ref={ref}>
      Hover here
      {hovered && <TooltipContent />}
    </div>
  );
}
```

### useAsyncEffect - Async Operations with Cleanup

```javascript
import { useAsyncEffect } from 'msr-hooks';

function DataLoader() {
  const [data, setData] = useState(null);

  useAsyncEffect(async (signal) => {
    const response = await fetch('/api/data', { signal });
    if (!signal.aborted) {
      setData(await response.json());
    }
  }, []);

  return <div>{data?.title}</div>;
}
```

### useSpringValue - Physics-Based Animation

```javascript
import { useSpringValue } from 'msr-hooks';

function Counter({ target }) {
  const animated = useSpringValue(target, {
    stiffness: 170,
    damping: 26,
    mass: 1,
  });

  return <div>{Math.round(animated)}</div>;
}
```

---

## 🔗 API Reference

Visit the [GitHub repository](https://github.com/Minka1902/msr-hooks) for detailed API documentation for each hook.

---

## 📄 License

MIT © MSR

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Found {filteredPosts.length} posts</p>
      {filteredPosts.map(post => (
        <Post key={post.id} {...post} />
      ))}
      <button onClick={refetch}>Refresh Posts</button>
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useFetch, type UseFetchReturn } from 'msr-hooks';

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsList: React.FC = () => {
  const { data, loading, error, refetch }: 
    UseFetchReturn<Post[]> = useFetch<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  
  if (loading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {data?.map((post: Post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </article>
      ))}
      <button onClick={refetch}>Refresh</button>
    </div>
  );
};
```

</details>

### useClipboard - Copy to Clipboard

<details open>
<summary>JavaScript</summary>

```javascript
import { useClipboard, useTimeout } from 'msr-hooks';
import { useState } from 'react';

function CodeBlock({ code, language = 'javascript' }) {
  const [copy, isCopied] = useClipboard();
  const [showNotification, setShowNotification] = useState(false);
  
  const handleCopy = async () => {
    await copy(code);
    setShowNotification(true);
  };
  
  // Hide notification after 2 seconds
  useTimeout(() => {
    if (showNotification) setShowNotification(false);
  }, showNotification ? 2000 : null);
  
  return (
    <div className="code-block">
      <div className="code-header">
        <span className="language">{language}</span>
        <button 
          onClick={handleCopy}
          className={isCopied ? 'copied' : ''}
        >
          {isCopied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
      {showNotification && (
        <div className="notification">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useClipboard } from 'msr-hooks';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [copy, isCopied]: 
    [(text: string) => Promise<void>, boolean] = 
      useClipboard();
  
  return (
    <div className="code-block">
      <pre>{code}</pre>
      <button onClick={() => copy(code)}>
        {isCopied ? '✓ Copied!' : 'Copy'}
      </button>
    </div>
  );
};
```

</details>

### useInterval & useTimeout - Timers

<details open>
<summary>JavaScript</summary>

```javascript
import { 
  useInterval, 
  useTimeout, 
  useToggle,
  useLocalStorage
} from 'msr-hooks';
import { useState } from 'react';

function Timer() {
  const [count, setCount] = useState(0);
  const [isPaused, togglePause] = useToggle(false);
  const [speed, setSpeed] = useState(1000);
  const [showWarning, setShowWarning] = useState(false);
  const [bestTime] = useLocalStorage('bestTime', 0);
  
  // Interval with dynamic speed
  useInterval(() => {
    setCount(c => c + 1);
  }, isPaused ? null : speed);
  
  // Show warning at 30 seconds
  useTimeout(() => {
    if (count >= 30 && !showWarning) {
      setShowWarning(true);
    }
  }, count >= 30 && !showWarning ? 100 : null);
  
  const reset = () => {
    setCount(0);
    setShowWarning(false);
  };
  
  return (
    <div className="timer">
      <h2>Count: {count}s</h2>
      {bestTime > 0 && <p>Best: {bestTime}s</p>}
      {showWarning && (
        <div className="warning">⚠️ 30 seconds!</div>
      )}
      <div className="controls">
        <button onClick={togglePause}>
          {isPaused ? '▶️ Resume' : '⏸️ Pause'}
        </button>
        <button onClick={reset}>🔄 Reset</button>
        <select 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
        >
          <option value={500}>Fast (0.5s)</option>
          <option value={1000}>Normal (1s)</option>
          <option value={2000}>Slow (2s)</option>
        </select>
      </div>
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useInterval, useTimeout } from 'msr-hooks';

const Timer: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  
  useInterval(() => {
    setCount((c: number) => c + 1);
  }, isPaused ? null : 1000);
  
  useTimeout(() => {
    alert('5 seconds passed!');
  }, 5000);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsPaused(!isPaused)}>
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  );
};
```

</details>

### useIntersectionObserver - Lazy Loading

<details open>
<summary>JavaScript</summary>

```javascript
import { 
  useIntersectionObserver,
  useToggle 
} from 'msr-hooks';
import { useState, useEffect } from 'react';

function LazyImage({ src, alt, lowQualitySrc }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showDetails, toggleDetails] = useToggle(false);
  
  useEffect(() => {
    if (isVisible && !imageLoaded) {
      // Preload the image
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setHasError(true);
    }
  }, [isVisible, src, imageLoaded]);
  
  return (
    <div 
      ref={ref} 
      className="image-container"
      onClick={toggleDetails}
    >
      {!isVisible && (
        <div className="placeholder">
          <div className="skeleton" />
        </div>
      )}
      {isVisible && !imageLoaded && !hasError && (
        <img 
          src={lowQualitySrc} 
          alt={alt}
          className="blur"
        />
      )}
      {imageLoaded && (
        <img 
          src={src} 
          alt={alt}
          className="fade-in"
        />
      )}
      {hasError && (
        <div className="error">Failed to load image</div>
      )}
      {showDetails && imageLoaded && (
        <div className="overlay">
          <p>{alt}</p>
        </div>
      )}
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useIntersectionObserver } from 'msr-hooks';

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }) => {
  const [ref, isVisible]: 
    [React.RefObject<HTMLElement>, boolean] = 
      useIntersectionObserver({ threshold: 0.1 });
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {isVisible && <img src={src} alt={alt} />}
    </div>
  );
};
```

</details>

### useLocalStorage - Persistent State

<details open>
<summary>JavaScript</summary>

```javascript
import { 
  useLocalStorage,
  useMediaQuery,
  useToggle 
} from 'msr-hooks';
import { useEffect } from 'react';

function Settings() {
  const systemPrefersDark = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );
  
  const [settings, setSettings] = useLocalStorage(
    'app-settings',
    {
      theme: 'auto',
      notifications: true,
      language: 'en',
      fontSize: 'medium',
      soundEnabled: true
    }
  );
  
  const [showAdvanced, toggleAdvanced] = useToggle(false);
  
  // Auto theme based on system preference
  const effectiveTheme = settings.theme === 'auto'
    ? (systemPrefersDark ? 'dark' : 'light')
    : settings.theme;
  
  useEffect(() => {
    document.body.className = effectiveTheme;
  }, [effectiveTheme]);
  
  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };
  
  const resetToDefaults = () => {
    setSettings({
      theme: 'auto',
      notifications: true,
      language: 'en',
      fontSize: 'medium',
      soundEnabled: true
    });
  };
  
  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="setting-group">
        <label>Theme</label>
        <select 
          value={settings.theme}
          onChange={(e) => updateSetting('theme', e.target.value)}
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <small>Current: {effectiveTheme}</small>
      </div>
      
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => 
              updateSetting('notifications', e.target.checked)
            }
          />
          Enable Notifications
        </label>
      </div>
      
      <button onClick={toggleAdvanced}>
        {showAdvanced ? 'Hide' : 'Show'} Advanced
      </button>
      
      {showAdvanced && (
        <div className="advanced">
          <div className="setting-group">
            <label>Font Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => 
                updateSetting('fontSize', e.target.value)
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => 
                  updateSetting('soundEnabled', e.target.checked)
                }
              />
              Sound Effects
            </label>
          </div>
        </div>
      )}
      
      <button onClick={resetToDefaults}>
        Reset to Defaults
      </button>
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useLocalStorage } from 'msr-hooks';

interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = 
    useLocalStorage<AppSettings>(
      'app-settings',
      { 
        theme: 'light', 
        notifications: true, 
        language: 'en' 
      }
    );
  
  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings({ ...settings, theme });
  };
  
  return (
    <select 
      value={settings.theme} 
      onChange={(e) => updateTheme(
        e.target.value as 'light' | 'dark'
      )}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};
```

</details>
} from 'msr-hooks';
import { useEffect } from 'react';

function Settings() {
  const systemPrefersDark = useMediaQuery(
    '(prefers-color-scheme: dark)'
  );
  
  const [settings, setSettings] = useLocalStorage(
    'app-settings',
    {
      theme: 'auto',
      notifications: true,
      language: 'en',
      fontSize: 'medium',
      soundEnabled: true
    }
  );
  
  const [showAdvanced, toggleAdvanced] = useToggle(false);
  
  // Auto theme based on system preference
  const effectiveTheme = settings.theme === 'auto'
    ? (systemPrefersDark ? 'dark' : 'light')
    : settings.theme;
  
  useEffect(() => {
    document.body.className = effectiveTheme;
  }, [effectiveTheme]);
  
  const updateSetting = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };
  
  const resetToDefaults = () => {
    setSettings({
      theme: 'auto',
      notifications: true,
      language: 'en',
      fontSize: 'medium',
      soundEnabled: true
    });
  };
  
  return (
    <div className="settings">
      <h2>Settings</h2>
      
      <div className="setting-group">
        <label>Theme</label>
        <select 
          value={settings.theme}
          onChange={(e) => updateSetting('theme', e.target.value)}
        >
          <option value="auto">Auto</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <small>Current: {effectiveTheme}</small>
      </div>
      
      <div className="setting-group">
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => 
              updateSetting('notifications', e.target.checked)
            }
          />
          Enable Notifications
        </label>
      </div>
      
      <button onClick={toggleAdvanced}>
        {showAdvanced ? 'Hide' : 'Show'} Advanced
      </button>
      
      {showAdvanced && (
        <div className="advanced">
          <div className="setting-group">
            <label>Font Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => 
                updateSetting('fontSize', e.target.value)
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
          
          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => 
                  updateSetting('soundEnabled', e.target.checked)
                }
              />
              Sound Effects
            </label>
          </div>
        </div>
      )}
      
      <button onClick={resetToDefaults}>
        Reset to Defaults
      </button>
    </div>
  );
}
```

</td>
<td width="50%">

**TypeScript**

```typescript
import { useLocalStorage } from 'msr-hooks';

interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = 
    useLocalStorage<AppSettings>(
      'app-settings',
      { 
        theme: 'light', 
        notifications: true, 
        language: 'en' 
      }
    );
  
  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings({ ...settings, theme });
  };
  
  return (
    <select 
      value={settings.theme} 
      onChange={(e) => updateTheme(
        e.target.value as 'light' | 'dark'
      )}
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};
```

</td>
</tr>
</table>     value={settings.theme} 
        onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
```

```typescript
// TypeScript
import { useLocalStorage } from 'msr-hooks';

interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    'app-settings',
    { theme: 'light', notifications: true, language: 'en' }
  );
  
  const updateTheme = (theme: 'light' | 'dark') => {
    setSettings({ ...settings, theme });
  };
  
  return (
    <select value={settings.theme} onChange={(e) => updateTheme(e.target.value as 'light' | 'dark')}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};
```

---

## 🔍 API Reference

### useEffectAfterMount
```typescript
useEffectAfterMount(effect: () => void | (() => void), deps?: DependencyList): void
```
Run an effect only after the component has mounted (skips first render).

### useDebounce
```typescript
useDebounce<T>(value: T, delay?: number): T
```
Debounce a changing value. Default delay: 300ms.

### useThrottle
```typescript
useThrottle<T>(value: T, limit?: number): T
```
Throttle a changing value. Default limit: 500ms.

### usePrevious
```typescript
usePrevious<T>(value: T): T | undefined
```
Get the previous value from the last render.

### useToggle
```typescript
useToggle(initial?: boolean): [boolean, () => void, () => void, () => void]
```
Returns `[value, toggle, setTrue, setFalse]`.

### useLocalStorage
```typescript
useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void]
```
Sync state to localStorage with JSON parsing. SSR-safe.

### useFetch
```typescript
useFetch<T = any>(url: string, options?: RequestInit): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}
```
Data fetching with loading/error states.

### useWindowSize
```typescript
useWindowSize(): { width: number; height: number }
```
Track window dimensions. SSR-safe.

### useMediaQuery
```typescript
useMediaQuery(query: string): boolean
```
Returns boolean if media query matches.

### useClipboard
```typescript
useClipboard(): [(text: string) => Promise<void>, boolean]
```
Returns `[copyFn, isCopied]`.

### useInterval
```typescript
useInterval(callback: () => void, delay: number | null): void
```
Declarative interval. Pass `null` as delay to pause.

### useTimeout
```typescript
useTimeout(callback: () => void, delay: number | null): void
```
Declarative timeout. Pass `null` as delay to cancel.

### useIntersectionObserver
```typescript
useIntersectionObserver(options?: IntersectionObserverInit): [RefObject<HTMLElement>, boolean]
```
Returns `[ref, isIntersecting]`.

### useClickOutsideObject
```typescript
useClickOutsideObject(
  ref: RefObject<HTMLElement>,
  handler: () => void,
  dontReactTo?: string,
  excludeRef?: RefObject<HTMLElement>
): void
```
Detect clicks outside an element.

### useEscapeKey
```typescript
useEscapeKey(handler: () => void): void
```
Trigger callback on Escape key.

### useKeyboardNavigation
```typescript
useKeyboardNavigation(config: {
  selectedIndex: number | null;
  handleSelect: (index: number | null) => void;
  totalBytes: number;
  bytesPerRow: number;
}): void
```
Arrow key navigation for grid structures.

### usePreventZoom
```typescript
usePreventZoom(scrollCheck?: boolean, keyboardCheck?: boolean): void
```
Prevent browser zoom. Both default to `true`.

### useParentWidth
```typescript
useParentWidth(): {
  parentWidth: number | null;
  childRef: RefObject<HTMLDivElement>;
}
```
Get parent element width with ResizeObserver.

### useResize
```typescript
useResize(config: {
  defaultSize: number;
  minSize?: number;
  maxSize?: number;
}): {
  size: number;
  setSize: (size: number) => void;
  isDragging: boolean;
  setIsDragging: (dragging: boolean) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
}
```
Manage resizable element state.

### useChangeIconColor
```typescript
useChangeIconColor(color?: string): void
```
Change favicon color dynamically. Default: `#000000`.

---

## 🎯 Best Practices

### Tree Shaking
Import only what you need for optimal bundle size:

```javascript
// ✅ Good - Tree shakeable
import { useDebounce, useToggle } from 'msr-hooks';

// ❌ Avoid - Imports everything
import * as hooks from 'msr-hooks';
```

### TypeScript Usage
Leverage full type safety:

```typescript
import { useFetch, useLocalStorage } from 'msr-hooks';

// Generic types are inferred
const { data } = useFetch<User[]>('/api/users');
const [count] = useLocalStorage<number>('count', 0);
```

### SSR Compatibility
All hooks with browser APIs include SSR guards:

```javascript
// Safe to use in Next.js, Gatsby, etc.
const { width } = useWindowSize(); // Returns { width: 0, height: 0 } on server
const [theme] = useLocalStorage('theme', 'light'); // Safe on server
```

---

## 📄 License

MIT © MSR

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/msr-hooks)
- [GitHub Repository](https://github.com/yourusername/msr-hooks)
- [Issue Tracker](https://github.com/yourusername/msr-hooks/issues)

---

<div align="center">

**Made with ❤️ for the React community**

If you find this useful, please give it a ⭐️

</div>
