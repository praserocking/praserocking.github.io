// Lord of the Rings Persona Configuration
const personaConfig = {
    name: 'lotr',
    displayName: 'Middle-earth',
    
    fonts: [
        'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap'
    ],
    
    styles: {
        variables: {
            // Middle-earth Color Palette
            '--primary-color': '#8B4513', // Saddle Brown (earth tones)
            '--primary-dark': '#654321', // Dark Brown
            '--secondary-color': '#2F4F2F', // Dark Slate Gray (forest green)
            '--accent-color': '#DAA520', // Goldenrod (ring gold)
            '--text-primary': '#2F1B14', // Dark Brown
            '--text-secondary': '#5D4E37', // Olive Drab
            '--text-light': '#8B7355', // Burlywood
            '--bg-primary': '#FDF5E6', // Old Lace (parchment)
            '--bg-secondary': '#F5F5DC', // Beige
            '--bg-dark': '#1C1C1C', // Very Dark Gray
            '--border-color': '#D2B48C', // Tan
            
            // Typography - Medieval/Fantasy fonts
            '--font-family': "'Cinzel', 'Crimson Text', serif",
            '--font-family-body': "'Crimson Text', Georgia, serif",
            
            // Hero background - Misty Mountains
            '--hero-bg': 'linear-gradient(135deg, #2F4F4F 0%, #696969 50%, #8FBC8F 100%)',
            '--hero-particles-bg': `
                radial-gradient(circle at 25% 75%, rgba(218, 165, 32, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, rgba(47, 79, 47, 0.1) 0%, transparent 50%)
            `
        },
        bodyClasses: ['persona-lotr'],
        cssFiles: ['css/lotr-theme.css']
    },
    
    content: {
        pageTitle: 'Shenbaga of the Shire - Master of the Digital Realm',
        
        // Hero section
        '.greeting': {
            text: "Greetings, I am"
        },
        '.name': {
            text: 'Shenbaga of the Shire'
        },
        '.hero-description': {
            text: 'Master Craftsman of Digital Realms at the Great Library of Amazonia, wielding ancient arts of Cloud Sorcery and the mystical powers of Large Language Models to serve kingdoms across Middle-earth.'
        },
        
        // Navigation
        '.logo-text': {
            text: '⚔️'
        },
        
        // TLDR Section
        '.tldr-header h2': {
            html: '<i class="fas fa-scroll"></i> The Tale Thus Far'
        },
        
        // About section
        '.about-section .section-title': {
            text: 'The Chronicles of My Quest'
        },
        '.about-section .section-subtitle': {
            text: 'A fellowship leader versed in the ancient arts of scalable enchantments'
        },
        
        // Update about cards with LOTR theme
        '.about-card:nth-child(1) h3': {
            text: 'Mastery of Ancient Arts'
        },
        '.about-card:nth-child(1) p': {
            text: 'Architect of great digital fortresses and cloud kingdoms. Weaver of mystical LLM spells and keeper of scalable enchantments that serve millions across the realms with unwavering strength.'
        },
        
        '.about-card:nth-child(2) h3': {
            text: 'Fellowship Leadership'
        },
        '.about-card:nth-child(2) p': {
            text: 'Guide fellowship expeditions across treacherous technical landscapes. Mentor young apprentices in the ways of code and lead brave companies of up to 4 warriors in delivering legendary quests.'
        },
        
        '.about-card:nth-child(3) h3': {
            text: 'Forge of Innovation'
        },
        '.about-card:nth-child(3) p': {
            text: 'Solve the riddles of complex engineering through ancient wisdom and innovation. Keeper of sacred scrolls (patents) in cloud sorcery and mystical viewing crystals (DVR technology).'
        },
        
        // Experience section
        '.experience-section .section-title': {
            text: 'Chronicles of Service'
        },
        '.experience-section .section-subtitle': {
            text: 'My journey through the realms'
        },
        
        // Update job titles with LOTR theme
        '.timeline-item:nth-child(1) h3': {
            text: 'Senior Keeper of Digital Mysteries'
        },
        '.timeline-item:nth-child(1) .company': {
            text: 'The Great Library of Amazonia'
        },
        
        '.timeline-item:nth-child(2) h3': {
            text: 'Apprentice & Journeyman of Code'
        },
        '.timeline-item:nth-child(2) .company': {
            text: 'The Great Library of Amazonia'
        },
        
        '.timeline-item:nth-child(3) h3': {
            text: 'Guardian Apprentice'
        },
        '.timeline-item:nth-child(3) .company': {
            text: 'The Fortress of Symantec'
        },
        
        // Projects section
        '.projects-section .section-title': {
            text: 'Legendary Quests'
        },
        '.projects-section .section-subtitle': {
            text: 'Epic adventures and mystical creations'
        },
        
        // Update project titles with LOTR theme
        '.project-card:nth-child(1) h3': {
            text: 'The Voice of Sauron Integration'
        },
        '.project-card:nth-child(1) p': {
            text: 'Led the great alliance between the Realm of Connected Devices and the Kingdom of Smart Vehicles. Forged the mystical Alexa+ artifact with the blessing of the Principal Engineers, creating a low-latency enchantment with device-context divination and ancient knowledge retrieval.'
        },
        
        '.project-card:nth-child(2) h3': {
            text: 'The Universal Tongue Platform'
        },
        '.project-card:nth-child(2) p': {
            text: 'Discovered the great gap in Alexa\'s ability to speak in all tongues of Middle-earth. Crafted runtime translation magic in the ancient APL scrolls, enabling communication across all realms. Delivered in the great APL tome of 2024.1 with 75% reduction in linguistic curses.'
        },
        
        '.project-card:nth-child(3) h3': {
            text: 'The Cartographer\'s Mystical Maps'
        },
        '.project-card:nth-child(3) p': {
            text: 'Forged custom mapping enchantments using the ancient OpenStreetMap scrolls for the AWS OpenSearch crystal balls. Created distributed task runners for real-time dictionary updates across all production strongholds.'
        },
        
        '.project-card:nth-child(4) h3': {
            text: 'The Palantír Recording System'
        },
        '.project-card:nth-child(4) p': {
            text: 'Engineered cloud-based seeing stones for the Fire TV Recast (a patented mystical artifact). Delivered backend architecture enabling seamless multi-realm viewing with 99.9% reliability across all kingdoms.'
        },
        
        // Skills section
        '.skills-section .section-title': {
            text: 'Arts & Mystical Powers'
        },
        '.skills-section .section-subtitle': {
            text: 'Ancient knowledge and magical abilities'
        },
        
        // Update skill categories
        '.skills-category:nth-child(1) h3': {
            text: 'Core Mystical Arts'
        },
        '.skills-category:nth-child(2) h3': {
            text: 'Cloud Sorcery & Fortifications'
        },
        '.skills-category:nth-child(3) h3': {
            text: 'Runic Languages & Artifacts'
        },
        
        // Education section
        '.education-section .section-title': {
            text: 'Halls of Learning'
        },
        '.education-section .section-subtitle': {
            text: 'Academic training in the ancient arts'
        },
        
        // Update education with LOTR theme
        '.education-item:nth-child(1) h3': {
            text: 'Master of Mystical Systems'
        },
        '.education-item:nth-child(1) .institution': {
            text: 'The Academy of BITS Pilani'
        },
        '.education-item:nth-child(1) p': {
            text: 'Networks and Cloud Sorcery focus: distributed enchantments, cloud architecture, scalable mystical solutions.'
        },
        
        '.education-item:nth-child(2) h3': {
            text: 'Bachelor of Information Mysteries'
        },
        '.education-item:nth-child(2) .institution': {
            text: 'The University of SASTRA'
        },
        '.education-item:nth-child(2) p': {
            text: 'Foundation in computational arts, software engineering principles, and information technology systems.'
        },
        
        // Patents section
        '.patents-section .section-title': {
            text: 'Sacred Scrolls & Patents'
        },
        '.patents-section .section-subtitle': {
            text: 'Mystical innovations and ancient wisdom'
        },
        
        // Update patent with LOTR theme
        '.patent-card h3': {
            text: 'Remote Scrying of Recorded Visions for Digital Palantíri'
        },
        '.patent-card p': {
            text: 'Patented cloud-based scrying system for Fire TV Recast remote vision management. Delivers seamless cross-realm experience with optimized mystical resource utilization and unwavering reliability.'
        },
        
        // Contact section
        '.contact-section .section-title': {
            text: 'Send Word by Raven'
        },
        '.contact-section .section-subtitle': {
            text: 'Open to discussing new quests and fellowship opportunities'
        },
        
        // Update contact cards
        '.contact-card:nth-child(1) h3': {
            text: 'Raven Post'
        },
        '.contact-card:nth-child(2) h3': {
            text: 'Palantír'
        },
        '.contact-card:nth-child(3) h3': {
            text: 'Realm'
        },
        '.contact-card:nth-child(4) h3': {
            text: 'Current Quest'
        },
        '.contact-card:nth-child(4) p': {
            text: 'Senior Keeper at the Great Library'
        },
        
        // Footer
        '.footer-text p': {
            text: '© Year 2024 of the Fourth Age, Shenbaga of the Shire. All rights reserved across Middle-earth.'
        }
    },
    
    customJS: `
        // LOTR persona specific JavaScript
        console.log('Middle-earth persona activated - The Ring has been found!');
        
        // Update typing effect texts for LOTR theme
        if (window.updateTypingTexts) {
            window.updateTypingTexts([
                'Master of Digital Realms',
                'Cloud Sorcery Expert',
                'Keeper of Ancient LLM Arts',
                'Fellowship Leader',
                'Mystical Code Weaver'
            ]);
        }
        
        // Add some LOTR-specific effects
        setTimeout(() => {
            // Add mystical glow effect to important elements
            const importantElements = document.querySelectorAll('.hero-title, .section-title, .project-icon, .skill-progress');
            importantElements.forEach(el => {
                el.style.textShadow = '0 0 10px rgba(218, 165, 32, 0.5)';
            });
            
            // Add ring glow to the logo
            const logo = document.querySelector('.logo-text');
            if (logo) {
                logo.style.textShadow = '0 0 15px #DAA520, 0 0 25px #DAA520';
                logo.style.animation = 'ring-glow 3s ease-in-out infinite alternate';
            }
        }, 500);
        
        // Add ring glow animation
        const style = document.createElement('style');
        style.textContent = \`
            @keyframes ring-glow {
                0% { text-shadow: 0 0 15px #DAA520, 0 0 25px #DAA520; }
                100% { text-shadow: 0 0 20px #DAA520, 0 0 35px #DAA520, 0 0 45px #DAA520; }
            }
        \`;
        document.head.appendChild(style);
    `
};
