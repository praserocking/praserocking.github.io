// Professional Persona Configuration
const personaConfig = {
    name: 'professional',
    displayName: 'Professional',
    
    fonts: [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ],
    
    styles: {
        variables: {
            // Color Palette
            '--primary-color': '#2563eb',
            '--primary-dark': '#1d4ed8',
            '--secondary-color': '#64748b',
            '--accent-color': '#f59e0b',
            '--text-primary': '#1e293b',
            '--text-secondary': '#64748b',
            '--text-light': '#94a3b8',
            '--bg-primary': '#ffffff',
            '--bg-secondary': '#f8fafc',
            '--bg-dark': '#0f172a',
            '--border-color': '#e2e8f0',
            
            // Typography
            '--font-family': "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            
            // Hero background
            '--hero-bg': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '--hero-particles-bg': `
                radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
            `
        },
        bodyClasses: ['persona-professional']
    },
    
    content: {
        pageTitle: 'Shenbaga Prasanna - Senior Software Engineer',
        
        // Hero section
        '.greeting': {
            text: "Hello, I'm"
        },
        '.name': {
            text: 'Shenbaga Prasanna'
        },
        '.hero-description': {
            text: 'Senior Software Engineer at Amazon with 10+ years building scalable cloud infrastructure, LLM systems, and backend solutions serving millions globally.'
        },
        
        // Navigation
        '.logo-text': {
            text: 'SP'
        },
        
        // TLDR Section
        '.tldr-header h2': {
            html: '<i class="fas fa-bolt"></i> TL;DR'
        },
        
        // About section
        '.about-section .section-title': {
            text: 'About Me'
        },
        '.about-section .section-subtitle': {
            text: 'Engineering leader passionate about scalable solutions'
        },
        
        // Experience section
        '.experience-section .section-title': {
            text: 'Professional Experience'
        },
        '.experience-section .section-subtitle': {
            text: 'My career journey'
        },
        
        // Projects section
        '.projects-section .section-title': {
            text: 'Featured Projects'
        },
        '.projects-section .section-subtitle': {
            text: 'Innovative solutions I\'ve built'
        },
        
        // Skills section
        '.skills-section .section-title': {
            text: 'Skills & Expertise'
        },
        '.skills-section .section-subtitle': {
            text: 'Technologies and competencies'
        },
        
        // Education section
        '.education-section .section-title': {
            text: 'Education'
        },
        '.education-section .section-subtitle': {
            text: 'Academic background and qualifications'
        },
        
        // Patents section
        '.patents-section .section-title': {
            text: 'Patents'
        },
        '.patents-section .section-subtitle': {
            text: 'Intellectual property and innovations'
        },
        
        // Contact section
        '.contact-section .section-title': {
            text: 'Let\'s Connect'
        },
        '.contact-section .section-subtitle': {
            text: 'Open to discussing new opportunities and collaborations'
        },
        
        // Footer
        '.footer-text p': {
            text: '© 2024 Shenbaga Prasanna. All rights reserved.'
        }
    },
    
    customJS: `
        // Professional persona specific JavaScript
        console.log('Professional persona activated');
        
        // Update typing effect texts for professional theme
        if (window.updateTypingTexts) {
            window.updateTypingTexts([
                'Senior Software Engineer',
                'Cloud Architecture Expert',
                'LLM Infrastructure Specialist',
                'Full-Stack Developer',
                'Technical Leader'
            ]);
        }
    `
};
