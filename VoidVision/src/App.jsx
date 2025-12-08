import { useState, useEffect, useRef } from 'react'
import TextType from './TypeText.jsx';
import './App.css'

function App() {
  const [visibleSections, setVisibleSections] = useState(new Set([0]));
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.section);
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.password) {
      alert(`Welcome to Void Vision, ${formData.name}!`);
      setShowModal(false);
      setFormData({ name: '', email: '', password: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <>
      <div className="nav-dots">
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={`nav-dot ${visibleSections.has(index) ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </div>
    
      <div className="scroll-container">
        
        {/* Section 1: Welcome */}
        <section
          ref={el => sectionRefs.current[0] = el}
          data-section="0"
          className={`section section-1 ${visibleSections.has(0) ? 'visible' : ''}`}
        >
          <div className="content">
            <div className="Name-App">
              <h1>Void Vision</h1>
            </div>
            
            <div className="TypeText-Welcome">
              <TextType
                text={["Welcome to Void Vision", "Experience the Void", "Unlock Your Imagination"]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseDuration={1500}
                initialDelay={500}
                loop={true}
                showCursor={true}
                cursorCharacter="_"
                textColors={["#ffffff", "#ffd700", "#ff69b4"]}
              />
            </div>

            <div className="scroll-indicator">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
              </svg>
            </div>
          </div>
        </section>

        {/* Section 2: About */}
        <section
          ref={el => sectionRefs.current[1] = el}
          data-section="1"
          className={`section section-2 ${visibleSections.has(1) ? 'visible' : ''}`}
        >
          <div className="content slide-left">
            <h1>About the Void</h1>
            <p>
              Void Vision is a video editing service that specializes in creating 
              captivating and immersive visual experiences.
            </p>
            <div className="feature-box">
              <p> Professional Video Editing</p>
            </div>
          </div>
        </section>

        {/* Section 3: Our Expertise */}
        <section
          ref={el => sectionRefs.current[2] = el}
          data-section="2"
          className={`section section-3 ${visibleSections.has(2) ? 'visible' : ''}`}
        >
          <div className="content slide-right">
            <h1>Our Expertise</h1>
            <p>
              Our team of skilled editors and designers work closely with clients 
              to bring their visions to life, whether it's for personal projects, 
              promotional content, or artistic endeavors.
            </p>
            <div className="feature-box">
              <p> Creative Collaboration</p>
            </div>
          </div>
        </section>

        {/* Section 4: Quality */}
        <section
          ref={el => sectionRefs.current[3] = el}
          data-section="3"
          className={`section section-4 ${visibleSections.has(3) ? 'visible' : ''}`}
        >
          <div className="content">
            <h1>Cutting-Edge Quality</h1>
            <p>
              We utilize cutting-edge technology and innovative techniques to ensure 
              that every video we produce is of the highest quality and resonates 
              with the intended audience.
            </p>
            <div className="feature-box">
              <p>Premium Results<br/> High Quality<br/> Audience Focus</p>
            </div>
          </div>
        </section>

        {/* Section 5: Sign Up */}
        <section
          ref={el => sectionRefs.current[4] = el}
          data-section="4"
          className={`section section-5 ${visibleSections.has(4) ? 'visible' : ''}`}
        >
          <div className="content">
            <h1>Join the Void</h1>
            <p>Ready to elevate your visual content? Sign up with Void Vision today and embark on a journey of creativity and innovation!</p>
            <button 
              className='sign-up-button'
              onClick={() => setShowModal(true)}
            >
              Sign Up Now
            </button>
          </div>
        </section>

      </div>

      {/* MODAL POPUP PARA SA SIGN UP*/}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <h2>Join Void Vision</h2>
            <div className="modal-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a password"
                />
              </div>
              <button className="submit-button" onClick={handleSubmit}>
                Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;