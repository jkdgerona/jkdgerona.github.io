/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useId, useMemo } from 'react';
import './GlassSurface.css';

const GlassSurface = ({
  children,
  width = '100%',
  height = '100%',
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.93,
  blur = 11,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -180,
  redOffset = 0,
  greenOffset = 10,
  blueOffset = 20,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  className = '',
  forceFallback = false,
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const [svgSupported, setSvgSupported] = useState(false);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 400, h: 200 });

  // 1. Optimize: Memoize the SVG data URI to prevent re-parsing strings every render
  const displacementMapUri = useMemo(() => {
    const { w, h } = dimensions;
    const edgeSize = Math.min(w, h) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${w}" height="${h}" fill="black"></rect>
        <rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${w}" height="${h}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${w - edgeSize * 2}" height="${h - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }, [dimensions, borderRadius, borderWidth, brightness, opacity, blur, mixBlendMode, redGradId, blueGradId]);

  // 2. Optimize: Debounced ResizeObserver to prevent layout thrashing
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        // Use requestAnimationFrame to sync with browser painting
        requestAnimationFrame(() => {
          setDimensions({
            w: entry.contentRect.width || 400,
            h: entry.contentRect.height || 200
          });
        });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const supportsSVG = () => {
      if (typeof window === 'undefined') return false;
      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      return !forceFallback && !isWebkit && CSS.supports('backdrop-filter', 'blur(1px)');
    };
    setSvgSupported(supportsSVG());
  }, [forceFallback]);

  const containerStyle = {
    ...style,
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    '--glass-frost': backgroundOpacity,
    '--glass-saturation': saturation,
    '--filter-id': `url(#${filterId})`
  };

  return (
    <div
      ref={containerRef}
      className={`glass-surface ${svgSupported ? 'glass-surface--svg' : 'glass-surface--fallback'} ${className}`}
      style={containerStyle}
    >
      {svgSupported && (
        <svg className="glass-surface__filter" xmlns="http://www.w3.org/2000/svg">
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0" y="0" width="100%" height="100%">
            <feImage href={displacementMapUri} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
            
            <feDisplacementMap in="SourceGraphic" in2="map" scale={distortionScale + redOffset} xChannelSelector={xChannel} yChannelSelector={yChannel} result="red" />
            <feColorMatrix in="red" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="redOnly"/>

            <feDisplacementMap in="SourceGraphic" in2="map" scale={distortionScale + greenOffset} xChannelSelector={xChannel} yChannelSelector={yChannel} result="green" />
            <feColorMatrix in="green" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="greenOnly"/>

            <feDisplacementMap in="SourceGraphic" in2="map" scale={distortionScale + blueOffset} xChannelSelector={xChannel} yChannelSelector={yChannel} result="blue" />
            <feColorMatrix in="blue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blueOnly"/>

            <feBlend in="redOnly" in2="greenOnly" mode="screen" result="rg" />
            <feBlend in="rg" in2="blueOnly" mode="screen" result="output" />
            <feGaussianBlur in="output" stdDeviation={displace} />
          </filter>
        </svg>
      )}
      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

export default GlassSurface;