import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './BubbleMenu.css';
import GlassSurface from './GlassSurface';

const DEFAULT_ITEMS = [
  { label: 'home', href: '/', rotation: -8 },
  { label: 'about', href: '/about', rotation: 8 },
  { label: 'projects', href: '/projects', rotation: 8 },
];

export default function BubbleOverlay({
  isOpen,
  onClose,
  items,
  animationEase = 'back.out(1.7)',
  animationDuration = 0.4,
  staggerDelay = 0.08,
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
      // Show overlay and enable pointer events
      gsap.set(overlay, { display: 'flex', autoAlpha: 1, pointerEvents: 'auto' });

      bubbles.forEach((bubble, i) => {
        const rotation = menuItems[i]?.rotation || 0;
        gsap.set(bubble, { scale: 0, rotation: rotation });
      });
      
      gsap.set(labels, { y: 15, autoAlpha: 0 });

      // Faster, smoother staggering
      const tl = gsap.timeline();
      
      tl.to(bubbles, {
        scale: 1,
        rotation: (i) => menuItems[i]?.rotation || 0,
        duration: animationDuration,
        ease: animationEase,
        stagger: staggerDelay
      });

      tl.to(labels, {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        ease: 'power2.out',
        stagger: staggerDelay
      }, "-=0.3");

    } else {
      // Close animation
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(overlay, { display: 'none', pointerEvents: 'none' });
        }
      });

      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isOpen, animationEase, animationDuration, staggerDelay, menuItems]);

  return (
    <div
      ref={overlayRef}
      className="bubble-menu-items fixed"
      style={{ display: 'none', zIndex: 9999, background: 'rgba(0, 0, 0, 0.4)' }}
      // Clicking the dark background triggers onClose
      onClick={onClose}
    >
      <ul 
        className="pill-list" 
        // Important: Stop clicks on the menu container from closing the menu
        onClick={(e) => e.stopPropagation()}
      >
        {menuItems.map((item, idx) => (
          <li key={idx} className="pill-col">
            <Link
              to={item.href}
              className="pill-link"
              style={{
                '--item-rot': `${item.rotation ?? 0}deg`,
                '--pill-color': menuContentColor,
              }}
              ref={el => (bubblesRef.current[idx] = el)}
              onClick={onClose}
            >
              <GlassSurface
                width="100%"
                height="100%"
                borderRadius={100}
                displace={0.2}
                distortionScale={-120} // Reduced for performance
                brightness={55}
                opacity={0.8}
                forceFallback={!isOpen} // Use simple CSS blur while animating
              >
                <div className="glass-pill-inner">
                  <span 
                    className="pill-label"
                    ref={el => (labelRefs.current[idx] = el)}
                  >
                    {item.label}
                  </span>
                </div>
              </GlassSurface>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}