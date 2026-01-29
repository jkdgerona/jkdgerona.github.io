import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';
import GlassSurface from './GlassSurface'; // Ensure this path is correct

const DEFAULT_ITEMS = [
  { label: 'home', href: '#', rotation: -8 },
  { label: 'about', href: '#', rotation: 8 },
  { label: 'projects', href: '#', rotation: 8 },
];

export default function BubbleOverlay({
  isOpen,
  onClose,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12,
  // Default glass colors (can be overridden)
  menuContentColor = '#ffffff', 
}) {
  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  useEffect(() => {
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const overlay = overlayRef.current;

    if (!overlay) return;

    if (isOpen) {
      gsap.set(overlay, { display: 'flex', autoAlpha: 1 });

      bubbles.forEach((bubble, i) => {
        const rotation = menuItems[i]?.rotation || 0;
        gsap.set(bubble, { scale: 0, rotation: rotation });
      });
      
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay;
        const rotation = menuItems[i]?.rotation || 0;
        
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          rotation: rotation,
          duration: animationDuration,
          ease: animationEase
        });

        if (labels[i]) {
          tl.to(labels[i], {
            y: 0,
            autoAlpha: 1,
            duration: animationDuration,
            ease: 'power3.out'
          }, "-=0.4");
        }
      });

    } else {
      if (bubbles.length) {
        const rotationValues = bubbles.map((_, i) => menuItems[i]?.rotation || 0);
        
        gsap.to(bubbles, {
          scale: 0,
          rotation: (i) => rotationValues[i],
          duration: 0.3,
          ease: 'power3.in'
        });
        
        gsap.to(labels, {
          autoAlpha: 0,
          duration: 0.2
        });

        gsap.delayedCall(0.3, () => {
          gsap.set(overlay, { display: 'none' });
        });
      } else {
        gsap.set(overlay, { display: 'none' });
      }
    }
  }, [isOpen, animationEase, animationDuration, staggerDelay, menuItems]);

  return (
    <div
      ref={overlayRef}
      className="bubble-menu-items fixed"
      style={{ display: 'none', zIndex: 9999, background: 'rgba(0, 0, 0, 0.4)' }}
      onClick={onClose}
    >
      <ul className="pill-list" onClick={(e) => e.stopPropagation()}>
        {menuItems.map((item, idx) => (
          <li key={idx} className="pill-col">
            <a
              href={item.href}
              className="pill-link"
              style={{
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--pill-color': menuContentColor,
              }}
              ref={el => (bubblesRef.current[idx] = el)}
            >
              {/* GLASS SURFACE IMPLEMENTATION */}
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={100} // High value for pill shape
                // Glass Effects Configuration
                displace={0.4}
                distortionScale={-160}
                redOffset={5}
                greenOffset={10}
                blueOffset={20}
                brightness={55}
                opacity={0.8} // Slightly transparent
                mixBlendMode="normal" // 'screen' might be too washed out on light backgrounds
              >
                {/* Inner Content Container handles the padding/sizing */}
                <div className="glass-pill-inner">
                  <span 
                    className="pill-label"
                    ref={el => (labelRefs.current[idx] = el)}
                  >
                    {item.label}
                  </span>
                </div>
              </GlassSurface>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}