import React, { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
  const [bgBlur, setBgBlur] = useState(false);
  const profileRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    // Show profile card immediately on load
    if (profileRef.current) {
      profileRef.current.classList.add('visible');
    }

    const onScroll = () => {
      setBgBlur(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    projectRefs.current.forEach(ref => ref && observer.observe(ref));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section id="decoration" className={bgBlur ? 'blur' : ''}>
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="circle" style={{ '--i': idx + 1 }} />
        ))}
      </section>
      <div className="projects-container">
        <div className="profile-section">
          <div className="profile-card" ref={profileRef}>
            <img className="avatar" src="https://via.placeholder.com/150" alt="Profile" />
            <div className="info">
              <h1>Akash Maiti</h1>
              <p><a href="mailto:akash@example.com">akash.maiti@utexas.edu</a></p>
              <p><a href="https://linkedin.com/in/akash--maiti" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
            </div>
          </div>
        </div>

        <div className="timeline">
          <div className="timeline-dot"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-dot"></div>
          <div className="timeline-dot"></div>
        </div>

        {/* Projects */}
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="project-card"
            ref={el => (projectRefs.current[idx] = el)}
          >
            <h2>Project {idx + 1}</h2>
            <p>Placeholder description for project {idx + 1}.</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;