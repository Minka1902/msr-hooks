export interface UseResizeConfig {
    defaultSize: number;
    minSize?: number;
    maxSize?: number;
}

export interface UseResizeReturn {
    size: number;
    setSize: (size: number) => void;
    isDragging: boolean;
    setIsDragging: (dragging: boolean) => void;
    handleMouseDown: (e: React.MouseEvent) => void;
    handleMouseUp: () => void;
}

export function useResize(config: UseResizeConfig): UseResizeReturn;
