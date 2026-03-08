import { motion, useAnimation } from 'framer-motion';
import { useMemo, useEffect } from 'react';
import './BubbleTransition.css';

const BubbleTransition = ({ isLoaded }) => {
  const controls = useAnimation();

  // 45 lag-free bubbles
  const bubbles = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      size: Math.random() * 20 + 10, // 10vw to 30vw
      left: Math.random() * 120 - 10, // Spread horizontally
      
      // Spawn right inside the screen so you see them pop into existence
      startY: Math.random() * 100, 
      
      // Travel up and off the top of the screen
      endY: -(Math.random() * 50 + 100), 
      
      // Staggered delay for the pop-in effect
      delay: Math.random() * 0.4, 
      
      // Speed of the upward sweep
      duration: 1.5 + Math.random() * 0.8, 
    }));
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      controls.set("hidden");
      controls.start("visible");
    }
  }, [isLoaded, controls]);

  return (
    <div className={`bubble-transition-container ${!isLoaded ? 'active' : ''}`}>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="realistic-bubble" // Make sure you are still using the lag-free CSS!
          custom={b}
          animate={controls}
          initial="hidden"
          variants={{
            // 1. Start invisible and shrunk to nothing, right on the screen
            hidden: (b) => ({
              y: b.startY + 'vh',
              x: b.left + 'vw',
              opacity: 0,
              scale: 0, // Start at 0 so they POP 
              transition: { duration: 0 } 
            }),
            // 2. Pop, fade, and rise!
            visible: (b) => ({
              y: b.endY + 'vh',
              opacity: 1, 
              scale: 1,   
              transition: {
                // The continuous upward travel
                y: { duration: b.duration, ease: "easeInOut", delay: b.delay },
                // The POP! (bouncy spring effect)
                scale: { duration: 0.6, type: "spring", bounce: 0.5, delay: b.delay },
                // The FADE IN! (happens very fast)
                opacity: { duration: 0.2, ease: "easeOut", delay: b.delay }
              }
            })
          }}
          style={{
            position: 'absolute',
            top: 0,   
            left: 0,  
            width: b.size + 'vw',
            height: b.size + 'vw',
            marginLeft: -(b.size / 2) + 'vw',
            marginTop: -(b.size / 2) + 'vw',
          }}
        />
      ))}
    </div>
  );
};

export default BubbleTransition;