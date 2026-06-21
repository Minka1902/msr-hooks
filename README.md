<div align="center">

# 🪝 msr-hooks

### A comprehensive collection of production-ready React hooks

[![npm version](https://img.shields.io/npm/v/msr-hooks.svg)](https://www.npmjs.com/package/msr-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

**61+ hooks** • **TypeScript & JavaScript** • **SSR-Safe** • **Tree-Shakeable** • **Zero Dependencies**

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

- 🎯 **61+ Production-Ready Hooks** - Cover all common use cases and advanced patterns
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

### 🧰 State Helpers (6 hooks)
| Hook | Description |
|------|-------------|
| `useCounter` | Numeric counter with min/max/step controls |
| `useArray` | Array state with push/removeAt/updateAt helpers |
| `useMap` | Stateful Map with set/get/has/delete actions |
| `useSet` | Stateful Set with add/toggle/delete actions |
| `useStep` | Multi-step / wizard navigation state |
| `useSessionStorage` | Persist state to sessionStorage |

### 📱 Browser & Device APIs (6 hooks)
| Hook | Description |
|------|-------------|
| `useGeolocation` | Track the user's location via the Geolocation API |
| `useIdle` | Detect user inactivity after a threshold |
| `useScript` | Dynamically load an external script + status |
| `useBroadcastChannel` | Cross-tab messaging via BroadcastChannel |
| `useScrollDirection` | Detect vertical scroll direction |
| `useLongPress` | Press-and-hold gesture handlers |

### 📡 Realtime & Async (3 hooks)
| Hook | Description |
|------|-------------|
| `useWebSocket` | WebSocket connection with auto-reconnect |
| `useEventSource` | Server-Sent Events (great for LLM token streams) |
| `useCountdown` | Countdown timer with start/pause/reset |

### 🐛 Dev & Debug (4 hooks)
| Hook | Description |
|------|-------------|
| `useRenderCount` | Count how many times a component rendered |
| `useWhyDidYouUpdate` | Log which props changed between renders |
| `useUpdateEffect` | useEffect that skips the initial mount |
| `useLatest` | Ref that always holds the latest value |

### 🧩 Component Primitives (6 hooks)
| Hook | Description |
|------|-------------|
| `useControllableState` | Merge controlled/uncontrolled value with onChange |
| `useFocusTrap` | Trap focus in a container and restore it on close |
| `usePosition` | Anchor a floating element with viewport flipping |
| `useListNavigation` | Roving keyboard navigation for flat lists |
| `useAnimationFrame` | requestAnimationFrame loop with delta/elapsed time |
| `useMousePosition` | Track the cursor relative to an element and its center |

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

### useCounter - Bounded Counter

<details open>
<summary>JavaScript</summary>

```javascript
import { useCounter } from 'msr-hooks';

function Quantity() {
  const { count, increment, decrement, reset } = useCounter(1, { min: 1, max: 10 });

  return (
    <div>
      <button onClick={() => decrement()}>-</button>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useCounter, type UseCounterReturn } from 'msr-hooks';

const Quantity: React.FC = () => {
  const { count, increment, decrement }: UseCounterReturn =
    useCounter(1, { min: 1, max: 10 });

  return (
    <div>
      <button onClick={() => decrement()}>-</button>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
    </div>
  );
};
```

</details>

### useGeolocation - Track User Location

<details open>
<summary>JavaScript</summary>

```javascript
import { useGeolocation } from 'msr-hooks';

function LocationDisplay() {
  const { loading, latitude, longitude, error } = useGeolocation({
    enableHighAccuracy: true
  });

  if (loading) return <p>Locating…</p>;
  if (error) return <p>Unable to get location</p>;

  return <p>You are at {latitude?.toFixed(4)}, {longitude?.toFixed(4)}</p>;
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useGeolocation, type UseGeolocationReturn } from 'msr-hooks';

const LocationDisplay: React.FC = () => {
  const { loading, latitude, longitude }: UseGeolocationReturn =
    useGeolocation();

  if (loading) return <p>Locating…</p>;
  return <p>{latitude}, {longitude}</p>;
};
```

</details>

### useEventSource - Stream Server-Sent Events (LLM tokens)

<details open>
<summary>JavaScript</summary>

```javascript
import { useEventSource } from 'msr-hooks';
import { useEffect, useState } from 'react';

function StreamingAnswer({ url }) {
  const { data, readyState } = useEventSource(url);
  const [text, setText] = useState('');

  // Append each streamed token chunk as it arrives
  useEffect(() => {
    if (data) setText((prev) => prev + data);
  }, [data]);

  return (
    <div>
      <p>{text}</p>
      {readyState === 1 && <span>● streaming…</span>}
    </div>
  );
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useEventSource, type UseEventSourceReturn } from 'msr-hooks';

const StreamingAnswer: React.FC<{ url: string }> = ({ url }) => {
  const { data, readyState, close }: UseEventSourceReturn =
    useEventSource(url);

  return (
    <div>
      <p>{data}</p>
      <button onClick={close} disabled={readyState !== 1}>Stop</button>
    </div>
  );
};
```

</details>

### useWhyDidYouUpdate - Debug Re-renders

<details open>
<summary>JavaScript</summary>

```javascript
import { useWhyDidYouUpdate } from 'msr-hooks';

function ExpensiveChart(props) {
  // Logs which props changed on every re-render
  useWhyDidYouUpdate('ExpensiveChart', props);

  return <Chart {...props} />;
}
```

</details>

<details>
<summary>TypeScript</summary>

```typescript
import { useWhyDidYouUpdate } from 'msr-hooks';

interface ChartProps {
  data: number[];
  color: string;
}

const ExpensiveChart: React.FC<ChartProps> = (props) => {
  useWhyDidYouUpdate('ExpensiveChart', props);
  return <Chart {...props} />;
};
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

### useControllableState - Controlled/Uncontrolled State

```javascript
import { useControllableState } from 'msr-hooks';

function Toggle({ checked, defaultChecked, onChange }) {
  // Works whether `checked` is passed (controlled) or not (uncontrolled).
  const [value, setValue] = useControllableState({
    value: checked,
    defaultValue: defaultChecked ?? false,
    onChange,
  });

  return <button onClick={() => setValue(!value)}>{value ? 'On' : 'Off'}</button>;
}
```

### useAnimationFrame - Per-Frame Loop

```javascript
import { useRef } from 'react';
import { useAnimationFrame } from 'msr-hooks';

function Spinner({ running }) {
  const ref = useRef(null);
  const angle = useRef(0);

  useAnimationFrame((deltaMs) => {
    angle.current = (angle.current + deltaMs * 0.1) % 360;
    if (ref.current) ref.current.style.transform = `rotate(${angle.current}deg)`;
  }, running);

  return <div ref={ref}>⟳</div>;
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
