import { useEffect, useState } from 'react';

export function CursorTrail() {
    const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        let trailId = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const newTrail = {
                id: trailId++,
                x: e.clientX,
                y: e.clientY,
            };

            setTrails((prev) => [...prev.slice(-8), newTrail]); // Keep last 8 trails
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup old trails
        const interval = setInterval(() => {
            setTrails((prev) => prev.slice(-3));
        }, 100);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            {trails.map((trail, index) => (
                <div
                    key={trail.id}
                    className="cursor-trail"
                    style={{
                        left: `${trail.x}px`,
                        top: `${trail.y}px`,
                        opacity: (index + 1) / trails.length * 0.6,
                        transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`,
                    }}
                />
            ))}
        </>
    );
}
