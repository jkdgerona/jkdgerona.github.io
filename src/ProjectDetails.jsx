import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AnimatedContent from './components/AnimatedContent.jsx';
import './ProjectDetails.css'; 
import LightRays from './components/LightRays.jsx';
import SplashCursor from './components/splashcursor.jsx';
import Footer from './footer.jsx';

const ProjectDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state?.project) {
      navigate('/projects');
    }
  }, [state, navigate]);

  if (!state?.project) return null;

  const { project } = state;

  return (
    
    <div className="main-content project-details-container">
      <button
            onClick={() => navigate(-1)}
            className="back-button"
          >
            ← Back to Projects
          </button>

        <div className="light-rays-wrapper" style={{ height: '100lvh', position: 'fixed', top: 0, left: 0, opacity: 0.05, zIndex: 2, pointerEvents: 'none' }}>
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={10}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.03}
                    noiseAmount={0}
                    distortion={0}
                    className="custom-rays"
                    pulsating={false}
                    fadeDistance={100}
                    saturation={1}
                />
            </div>
            <div style={{ pointerEvents: 'none' }}>
            <SplashCursor
                colors={[
                    { r: 0.137, g: 0.475, b: 0.663 }, // Color 2 (Highlight)
                    { r: 0.071, g: 0.239, b: 0.329 }, // Color 3 (Base)
                    { r: 0.0, g: 0.0, b: 0.0 },       // Color 4 (Shadow)
                ]}
                style={{ opacity: 0.15 }} // Lower opacity for dark mode feel
            />
            </div>
      <AnimatedContent 
        distance={50} 
        direction="vertical" 
        duration={1}
        initialOpacity={0}
        animateOpacity
      >
        
        <div className="project-details-wrapper">
          
          <img src={project.showcaseimageSrc} alt={project.title} className="image-main" />

          {/* Details Card */}
          <div className="details-card">

            <div className="details-content">
            <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                <h1 className="project-title">
                {project.title}
              </h1>
              <div className="tech-stack-section">
                    <div className="tech-stack-list">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
            </div>
              
              <p className="project-description">
                {project.description}
              </p>

              <div className="overview-section">
                <h2 className="overview-title">Overview</h2>
                {/* You can add a 'longDescription' to your cardData array later to populate this! */}
                <p className="overview-text">
                  {project.longDescription || 
                  "Detailed insights, challenges faced, and the development process for this project go here. You can update your cardData array in MagicBento.jsx to include a 'longDescription' property for each project to make this unique!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedContent>
      <Footer />
    </div>
  );
};

export default ProjectDetails;