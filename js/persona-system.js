// Persona System - Modular theme switching for portfolio
class PersonaSystem {
    constructor() {
        this.currentPersona = 'professional'; // default
        this.personas = {};
        this.initialized = false;
        
        // Bind methods
        this.switchPersona = this.switchPersona.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.updateStyles = this.updateStyles.bind(this);
    }

    // Initialize the persona system
    async init() {
        if (this.initialized) return;
        
        try {
            // Load persona configurations
            await this.loadPersonaConfigs();
            
            // Create persona switcher UI
            this.createPersonaSwitcher();
            
            // Load saved persona from localStorage
            const savedPersona = localStorage.getItem('selectedPersona') || 'professional';
            await this.switchPersona(savedPersona, false);
            
            this.initialized = true;
            console.log('Persona System initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Persona System:', error);
        }
    }

    // Load persona configuration files
    async loadPersonaConfigs() {
        try {
            // Load persona configurations directly (no fetch needed)
            this.personas.professional = this.getProfessionalConfig();
            this.personas.lotr = this.getLotrConfig();
            this.personas.harrypotter = this.getHarryPotterConfig();
            
        } catch (error) {
            console.error('Error loading persona configs:', error);
            throw error;
        }
    }

    // Professional persona configuration
    getProfessionalConfig() {
        return {
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
                
                // Update about cards back to professional theme
                '.about-card:nth-child(1) h3': {
                    text: 'Technical Excellence'
                },
                '.about-card:nth-child(1) p': {
                    text: 'Architect large-scale distributed systems, LLM integration, and cloud-native solutions. Build robust, scalable infrastructure serving millions with high performance and reliability.'
                },
                
                '.about-card:nth-child(2) h3': {
                    text: 'Leadership Impact'
                },
                '.about-card:nth-child(2) p': {
                    text: 'Lead cross-functional teams, mentor developers, and drive technical initiatives from concept to production. Manage teams up to 4 engineers delivering complex projects on time.'
                },
                
                '.about-card:nth-child(3) h3': {
                    text: 'Innovation Focus'
                },
                '.about-card:nth-child(3) p': {
                    text: 'Solve complex engineering challenges through innovation. Patent holder in cloud services and DVR technology, creating solutions with measurable business impact.'
                },
                
                // Experience section
                '.experience-section .section-title': {
                    text: 'Professional Experience'
                },
                '.experience-section .section-subtitle': {
                    text: 'My career journey'
                },
                
                // Update job titles back to professional theme
                '.timeline-item:nth-child(1) h3': {
                    text: 'Senior Software Engineer'
                },
                '.timeline-item:nth-child(1) .company': {
                    text: 'Amazon'
                },
                
                '.timeline-item:nth-child(2) h3': {
                    text: 'Software Development Engineer I & II'
                },
                '.timeline-item:nth-child(2) .company': {
                    text: 'Amazon'
                },
                
                '.timeline-item:nth-child(3) h3': {
                    text: 'Associate Software Engineer'
                },
                '.timeline-item:nth-child(3) .company': {
                    text: 'Symantec Corporation'
                },
                
                // Projects section
                '.projects-section .section-title': {
                    text: 'Featured Projects'
                },
                '.projects-section .section-subtitle': {
                    text: 'Innovative solutions I\'ve built'
                },
                
                // Update project titles back to professional theme
                '.project-card:nth-child(1) h3': {
                    text: 'LLM-Integrated Automotive Voice Control'
                },
                '.project-card:nth-child(1) p': {
                    text: 'Led cross-org collaboration (Alexa Connected Devices + Smart Vehicles) for Alexa+ feature. Secured Principal Engineer approval, engineered low-latency solution with device-context biasing, RAG optimization, and infrastructure reuse.'
                },
                
                '.project-card:nth-child(2) h3': {
                    text: 'Global Localization Platform Enhancement'
                },
                '.project-card:nth-child(2) p': {
                    text: 'Identified Alexa localization testing gap causing inefficiencies. Implemented runtime pseudolocalization in APL, enabling global scalability. Delivered in APL 2024.1 with 75% L10n defect reduction.'
                },
                
                '.project-card:nth-child(3) h3': {
                    text: 'Geospatial Visualization Service'
                },
                '.project-card:nth-child(3) p': {
                    text: 'Built custom Maps service with OpenStreetMap for AWS OpenSearch visualizations. Implemented distributed task runner for real-time dictionary updates across production clusters.'
                },
                
                '.project-card:nth-child(4) h3': {
                    text: 'Fire TV Cloud DVR System'
                },
                '.project-card:nth-child(4) p': {
                    text: 'Engineered cloud DVR services for Fire TV Recast (patented). Delivered backend architecture enabling seamless multi-platform DVR with 99.9% uptime.'
                },
                
                // Skills section
                '.skills-section .section-title': {
                    text: 'Skills & Expertise'
                },
                '.skills-section .section-subtitle': {
                    text: 'Technologies and competencies'
                },
                
                // Update skill categories back to professional theme
                '.skills-category:nth-child(1) h3': {
                    text: 'Core Competencies'
                },
                '.skills-category:nth-child(2) h3': {
                    text: 'Cloud & Infrastructure'
                },
                '.skills-category:nth-child(3) h3': {
                    text: 'Programming & Tools'
                },
                
                // Education section
                '.education-section .section-title': {
                    text: 'Education'
                },
                '.education-section .section-subtitle': {
                    text: 'Academic background and qualifications'
                },
                
                // Update education back to professional theme
                '.education-item:nth-child(1) h3': {
                    text: 'Master of Technology - Software Systems'
                },
                '.education-item:nth-child(1) .institution': {
                    text: 'BITS Pilani'
                },
                '.education-item:nth-child(1) p': {
                    text: 'Networks and Cloud Computing focus: distributed systems, cloud architecture, scalable software solutions.'
                },
                
                '.education-item:nth-child(2) h3': {
                    text: 'Bachelor of Technology - Information Technology'
                },
                '.education-item:nth-child(2) .institution': {
                    text: 'SASTRA University'
                },
                '.education-item:nth-child(2) p': {
                    text: 'Foundation in computer science, software engineering principles, and IT systems.'
                },
                
                // Patents section
                '.patents-section .section-title': {
                    text: 'Patents'
                },
                '.patents-section .section-subtitle': {
                    text: 'Intellectual property and innovations'
                },
                
                // Update patent back to professional theme
                '.patent-card h3': {
                    text: 'Remote Scheduling of Recorded Content for Digital Video Recorders'
                },
                '.patent-card p': {
                    text: 'Patented cloud DVR scheduling system for Fire TV Recast remote recording management. Delivers seamless cross-platform experience with optimized resource utilization and reliability.'
                },
                
                // Contact section
                '.contact-section .section-title': {
                    text: 'Let\'s Connect'
                },
                '.contact-section .section-subtitle': {
                    text: 'Open to discussing new opportunities and collaborations'
                },
                
                // Update contact cards back to professional theme
                '.contact-card:nth-child(1) h3': {
                    text: 'Email'
                },
                '.contact-card:nth-child(2) h3': {
                    text: 'Phone'
                },
                '.contact-card:nth-child(3) h3': {
                    text: 'Location'
                },
                '.contact-card:nth-child(4) h3': {
                    text: 'Current Role'
                },
                '.contact-card:nth-child(4) p': {
                    text: 'Senior SDE at Amazon'
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
    }

    // LOTR persona configuration
    getLotrConfig() {
        return {
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
    }

    // Harry Potter persona configuration
    getHarryPotterConfig() {
        return {
            name: 'harrypotter',
            displayName: 'Hogwarts',
            
            fonts: [
                'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&display=swap',
                'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap'
            ],
            
            styles: {
                variables: {
                    // Hogwarts Color Palette
                    '--primary-color': '#740001', // Gryffindor Red
                    '--primary-dark': '#5D0001', // Dark Red
                    '--secondary-color': '#1A472A', // Slytherin Green
                    '--accent-color': '#D3A625', // Golden Snitch Gold
                    '--text-primary': '#2C1810', // Dark Brown
                    '--text-secondary': '#5D4037', // Medium Brown
                    '--text-light': '#8D6E63', // Light Brown
                    '--bg-primary': '#FFF8E1', // Parchment
                    '--bg-secondary': '#F3E5AB', // Light Parchment
                    '--bg-dark': '#1A1A1A', // Very Dark
                    '--border-color': '#D7CCC8', // Light Brown Border
                    
                    // Typography - Magical fonts
                    '--font-family': "'Cinzel Decorative', 'Libre Baskerville', serif",
                    '--font-family-body': "'Libre Baskerville', Georgia, serif",
                    
                    // Hero background - Hogwarts Castle
                    '--hero-bg': 'linear-gradient(135deg, #1A237E 0%, #3F51B5 30%, #673AB7 70%, #9C27B0 100%)',
                    '--hero-particles-bg': `
                        radial-gradient(circle at 30% 70%, rgba(211, 166, 37, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 70% 30%, rgba(116, 0, 1, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 50% 50%, rgba(26, 71, 42, 0.15) 0%, transparent 50%)
                    `
                },
                bodyClasses: ['persona-harrypotter'],
                cssFiles: ['css/harrypotter-theme.css']
            },
            
            content: {
                pageTitle: 'Shenbaga Potter - Senior Wizard of Digital Arts',
                
                // Hero section
                '.greeting': {
                    text: "Welcome, I am"
                },
                '.name': {
                    text: 'Shenbaga Potter'
                },
                '.hero-description': {
                    text: 'Senior Wizard of Digital Arts at the Ministry of Amazonian Magic, specializing in Cloud Charms, LLM Potions, and Scalable Enchantments that serve magical communities across the wizarding world.'
                },
                
                // Navigation
                '.logo-text': {
                    text: '⚡'
                },
                
                // TLDR Section
                '.tldr-header h2': {
                    html: '<i class="fas fa-magic"></i> The Magical Summary'
                },
                
                // About section
                '.about-section .section-title': {
                    text: 'My Magical Journey'
                },
                '.about-section .section-subtitle': {
                    text: 'A Hogwarts graduate mastering the ancient arts of digital wizardry'
                },
                
                // Update about cards with Harry Potter theme
                '.about-card:nth-child(1) h3': {
                    text: 'Mastery of Digital Spells'
                },
                '.about-card:nth-child(1) p': {
                    text: 'Architect of magical cloud infrastructures and digital fortresses. Brewer of powerful LLM potions and keeper of scalable enchantments that serve millions of muggles and wizards alike with unwavering reliability.'
                },
                
                '.about-card:nth-child(2) h3': {
                    text: 'Leadership in the Order'
                },
                '.about-card:nth-child(2) p': {
                    text: 'Lead magical expeditions across complex technical realms. Mentor young witches and wizards in the art of code magic and guide teams of up to 4 skilled practitioners in delivering legendary digital quests.'
                },
                
                '.about-card:nth-child(3) h3': {
                    text: 'Innovation & Invention'
                },
                '.about-card:nth-child(3) p': {
                    text: 'Solve the most complex magical engineering puzzles through innovation and ancient wisdom. Keeper of sacred patents in cloud sorcery and inventor of mystical viewing enchantments (DVR magic).'
                },
                
                // Experience section
                '.experience-section .section-title': {
                    text: 'Magical Career Chronicles'
                },
                '.experience-section .section-subtitle': {
                    text: 'My journey through the wizarding corporate world'
                },
                
                // Update job titles with Harry Potter theme
                '.timeline-item:nth-child(1) h3': {
                    text: 'Senior Wizard of Digital Arts'
                },
                '.timeline-item:nth-child(1) .company': {
                    text: 'Ministry of Amazonian Magic'
                },
                
                '.timeline-item:nth-child(2) h3': {
                    text: 'Junior Wizard & Spell Developer'
                },
                '.timeline-item:nth-child(2) .company': {
                    text: 'Ministry of Amazonian Magic'
                },
                
                '.timeline-item:nth-child(3) h3': {
                    text: 'Apprentice Auror'
                },
                '.timeline-item:nth-child(3) .company': {
                    text: 'Department of Symantec Security'
                },
                
                // Projects section
                '.projects-section .section-title': {
                    text: 'Legendary Magical Projects'
                },
                '.projects-section .section-subtitle': {
                    text: 'Extraordinary spells and enchantments I\'ve created'
                },
                
                // Update project titles with Harry Potter theme
                '.project-card:nth-child(1) h3': {
                    text: 'The Voldemort Voice Integration Spell'
                },
                '.project-card:nth-child(1) p': {
                    text: 'Led the magical alliance between the Department of Connected Devices and the Bureau of Smart Vehicles. Forged the mystical Alexa+ enchantment with approval from the Council of Principal Wizards, creating a low-latency spell with device-context divination and ancient knowledge retrieval.'
                },
                
                '.project-card:nth-child(2) h3': {
                    text: 'The Universal Translation Potion'
                },
                '.project-card:nth-child(2) p': {
                    text: 'Discovered the great gap in Alexa\'s ability to speak all magical languages. Brewed runtime translation potions in the ancient APL grimoires, enabling communication across all magical realms. Delivered in the great APL spellbook of 2024.1 with 75% reduction in linguistic hexes.'
                },
                
                '.project-card:nth-child(3) h3': {
                    text: 'The Marauder\'s Digital Map'
                },
                '.project-card:nth-child(3) p': {
                    text: 'Created custom mapping enchantments using ancient OpenStreetMap scrolls for AWS OpenSearch crystal balls. Developed distributed task runners for real-time dictionary updates across all magical production environments.'
                },
                
                '.project-card:nth-child(4) h3': {
                    text: 'The Pensieve Recording System'
                },
                '.project-card:nth-child(4) p': {
                    text: 'Engineered cloud-based memory extraction bowls for Fire TV Recast (a patented magical artifact). Delivered backend architecture enabling seamless multi-realm memory viewing with 99.9% reliability across all magical households.'
                },
                
                // Skills section
                '.skills-section .section-title': {
                    text: 'Magical Abilities & Spells'
                },
                '.skills-section .section-subtitle': {
                    text: 'Wizarding skills and enchantment expertise'
                },
                
                // Update skill categories
                '.skills-category:nth-child(1) h3': {
                    text: 'Core Magical Arts'
                },
                '.skills-category:nth-child(2) h3': {
                    text: 'Cloud Charms & Protective Wards'
                },
                '.skills-category:nth-child(3) h3': {
                    text: 'Ancient Runes & Magical Languages'
                },
                
                // Education section
                '.education-section .section-title': {
                    text: 'Magical Education'
                },
                '.education-section .section-subtitle': {
                    text: 'Academic training in the wizarding arts'
                },
                
                // Update education with Harry Potter theme
                '.education-item:nth-child(1) h3': {
                    text: 'Master of Magical Systems'
                },
                '.education-item:nth-child(1) .institution': {
                    text: 'Hogwarts School of BITS Pilani'
                },
                '.education-item:nth-child(1) p': {
                    text: 'Networks and Cloud Charms focus: distributed enchantments, magical architecture, scalable spell solutions with emphasis on Defense Against the Dark Arts of system failures.'
                },
                
                '.education-item:nth-child(2) h3': {
                    text: 'Bachelor of Information Magic'
                },
                '.education-item:nth-child(2) .institution': {
                    text: 'SASTRA Academy of Magical Arts'
                },
                '.education-item:nth-child(2) p': {
                    text: 'Foundation in computational magic, software enchantment principles, and information technology spells with specialization in Transfiguration of data systems.'
                },
                
                // Patents section
                '.patents-section .section-title': {
                    text: 'Magical Patents & Inventions'
                },
                '.patents-section .section-subtitle': {
                    text: 'Registered spells and magical innovations'
                },
                
                // Update patent with Harry Potter theme
                '.patent-card h3': {
                    text: 'Remote Scrying of Recorded Memories for Digital Pensieves'
                },
                '.patent-card p': {
                    text: 'Patented cloud-based memory extraction system for Fire TV Recast remote viewing management. Delivers seamless cross-realm experience with optimized magical resource utilization and unbreakable protective charms.'
                },
                
                // Contact section
                '.contact-section .section-title': {
                    text: 'Send an Owl'
                },
                '.contact-section .section-subtitle': {
                    text: 'Open to discussing new magical quests and wizarding opportunities'
                },
                
                // Update contact cards
                '.contact-card:nth-child(1) h3': {
                    text: 'Owl Post'
                },
                '.contact-card:nth-child(2) h3': {
                    text: 'Floo Network'
                },
                '.contact-card:nth-child(3) h3': {
                    text: 'Magical Realm'
                },
                '.contact-card:nth-child(4) h3': {
                    text: 'Current Position'
                },
                '.contact-card:nth-child(4) p': {
                    text: 'Senior Wizard at the Ministry'
                },
                
                // Footer
                '.footer-text p': {
                    text: '© 2024 Magical Year, Shenbaga Potter. All spells reserved. Mischief Managed.'
                }
            },
            
            customJS: `
                // Harry Potter persona specific JavaScript
                console.log('Hogwarts persona activated - Expelliarmus!');
                
                // Update typing effect texts for Harry Potter theme
                if (window.updateTypingTexts) {
                    window.updateTypingTexts([
                        'Senior Wizard of Digital Arts',
                        'Cloud Charms Expert',
                        'Master of LLM Potions',
                        'Order of the Phoenix Leader',
                        'Magical Code Enchanter'
                    ]);
                }
                
                // Add some Harry Potter-specific effects
                setTimeout(() => {
                    // Add magical sparkle effect to important elements
                    const importantElements = document.querySelectorAll('.hero-title, .section-title, .project-icon, .skill-progress');
                    importantElements.forEach(el => {
                        el.style.textShadow = '0 0 10px rgba(211, 166, 37, 0.6)';
                    });
                    
                    // Add lightning bolt glow to the logo
                    const logo = document.querySelector('.logo-text');
                    if (logo) {
                        logo.style.textShadow = '0 0 15px #D3A625, 0 0 25px #D3A625';
                        logo.style.animation = 'lightning-glow 2s ease-in-out infinite alternate';
                    }
                }, 500);
                
                // Add lightning glow animation
                const style = document.createElement('style');
                style.textContent = \`
                    @keyframes lightning-glow {
                        0% { text-shadow: 0 0 15px #D3A625, 0 0 25px #D3A625; }
                        100% { text-shadow: 0 0 20px #D3A625, 0 0 35px #D3A625, 0 0 45px #740001; }
                    }
                \`;
                document.head.appendChild(style);
            `
        };
    }

    // Create the persona switcher UI
    createPersonaSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'persona-switcher';
        switcher.innerHTML = `
            <div class="persona-switcher-container">
                <div class="persona-switcher-label">
                    <i class="fas fa-palette"></i>
                    <span>Theme</span>
                </div>
                <div class="persona-options">
                    <button class="persona-btn" data-persona="professional">
                        <i class="fas fa-briefcase"></i>
                        <span>Professional</span>
                    </button>
                    <button class="persona-btn" data-persona="lotr">
                        <i class="fas fa-ring"></i>
                        <span>Middle-earth</span>
                    </button>
                    <button class="persona-btn" data-persona="harrypotter">
                        <i class="fas fa-magic"></i>
                        <span>Hogwarts</span>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        const buttons = switcher.querySelectorAll('.persona-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const persona = e.currentTarget.getAttribute('data-persona');
                this.switchPersona(persona);
            });
        });

        // Insert into header
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(switcher);
        }

        // Add styles for the switcher
        this.addPersonaSwitcherStyles();
    }

    // Switch to a different persona
    async switchPersona(personaName, saveToStorage = true) {
        if (!this.personas[personaName]) {
            console.error(`Persona '${personaName}' not found`);
            return;
        }

        try {
            // Show loading state
            this.showLoadingState();

            // Update current persona
            this.currentPersona = personaName;
            
            // Update active button
            this.updateActiveButton(personaName);
            
            // Apply persona changes
            await this.applyPersona(this.personas[personaName]);
            
            // Save to localStorage
            if (saveToStorage) {
                localStorage.setItem('selectedPersona', personaName);
            }

            // Hide loading state
            this.hideLoadingState();

            // Trigger custom event
            document.dispatchEvent(new CustomEvent('personaChanged', {
                detail: { persona: personaName, config: this.personas[personaName] }
            }));

        } catch (error) {
            console.error('Error switching persona:', error);
            this.hideLoadingState();
        }
    }

    // Apply persona configuration
    async applyPersona(personaConfig) {
        // Update CSS variables and styles
        this.updateStyles(personaConfig.styles);
        
        // Update content
        this.updateContent(personaConfig.content);
        
        // Update fonts if specified
        if (personaConfig.fonts) {
            this.updateFonts(personaConfig.fonts);
        }
        
        // Update favicon if specified
        if (personaConfig.favicon) {
            this.updateFavicon(personaConfig.favicon);
        }

        // Update page title
        if (personaConfig.content.pageTitle) {
            document.title = personaConfig.content.pageTitle;
        }

        // Apply any custom JavaScript
        if (personaConfig.customJS) {
            this.executeCustomJS(personaConfig.customJS);
        }
    }

    // Update CSS styles and variables
    updateStyles(styles) {
        const root = document.documentElement;
        
        // Update CSS custom properties
        if (styles.variables) {
            Object.entries(styles.variables).forEach(([property, value]) => {
                root.style.setProperty(property, value);
            });
        }

        // Add/remove CSS classes
        if (styles.bodyClasses) {
            document.body.className = document.body.className
                .replace(/persona-\w+/g, '') // Remove existing persona classes
                .trim();
            styles.bodyClasses.forEach(className => {
                document.body.classList.add(className);
            });
        }

        // Load additional CSS files if specified
        if (styles.cssFiles) {
            styles.cssFiles.forEach(cssFile => {
                this.loadCSS(cssFile);
            });
        }
    }

    // Update content elements
    updateContent(content) {
        Object.entries(content).forEach(([selector, updates]) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                if (updates.text) {
                    element.textContent = updates.text;
                }
                if (updates.html) {
                    element.innerHTML = updates.html;
                }
                if (updates.attributes) {
                    Object.entries(updates.attributes).forEach(([attr, value]) => {
                        element.setAttribute(attr, value);
                    });
                }
            });
        });
    }

    // Update fonts
    updateFonts(fonts) {
        // Remove existing font links
        const existingFontLinks = document.querySelectorAll('link[data-persona-font]');
        existingFontLinks.forEach(link => link.remove());

        // Add new font links
        fonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontUrl;
            link.setAttribute('data-persona-font', 'true');
            document.head.appendChild(link);
        });
    }

    // Update favicon
    updateFavicon(faviconUrl) {
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = faviconUrl;
    }

    // Load additional CSS file
    loadCSS(cssFile) {
        const existingLink = document.querySelector(`link[href="${cssFile}"]`);
        if (existingLink) return; // Already loaded

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = cssFile;
        link.setAttribute('data-persona-css', 'true');
        document.head.appendChild(link);
    }

    // Execute custom JavaScript
    executeCustomJS(jsCode) {
        try {
            const script = new Function(jsCode);
            script();
        } catch (error) {
            console.error('Error executing custom JS:', error);
        }
    }

    // Update active button state
    updateActiveButton(personaName) {
        const buttons = document.querySelectorAll('.persona-btn');
        buttons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-persona') === personaName) {
                btn.classList.add('active');
            }
        });
    }

    // Show loading state
    showLoadingState() {
        let loader = document.querySelector('.persona-loader');
        if (!loader) {
            loader = document.createElement('div');
            loader.className = 'persona-loader';
            loader.innerHTML = `
                <div class="persona-loader-content">
                    <div class="persona-loader-spinner"></div>
                    <span>Switching theme...</span>
                </div>
            `;
            document.body.appendChild(loader);
        }
        loader.style.display = 'flex';
    }

    // Hide loading state
    hideLoadingState() {
        const loader = document.querySelector('.persona-loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }

    // Add styles for persona switcher
    addPersonaSwitcherStyles() {
        const styles = document.createElement('style');
        styles.textContent = `
            .persona-switcher {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-left: auto;
                flex-shrink: 0;
            }

            .persona-switcher-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border-radius: 25px;
                padding: 0.4rem;
                border: 1px solid var(--border-color);
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            .persona-switcher-label {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                color: var(--text-primary);
                font-size: 0.8rem;
                font-weight: 500;
                padding: 0 0.4rem;
                white-space: nowrap;
            }

            .persona-options {
                display: flex;
                gap: 0.2rem;
                flex-wrap: nowrap;
            }

            .persona-btn {
                display: flex;
                align-items: center;
                gap: 0.4rem;
                padding: 0.4rem 0.6rem;
                border: none;
                background: transparent;
                color: var(--text-secondary);
                border-radius: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.8rem;
                font-weight: 500;
                white-space: nowrap;
                min-width: auto;
            }

            .persona-btn:hover {
                background: rgba(37, 99, 235, 0.1);
                color: var(--primary-color);
                transform: translateY(-1px);
            }

            .persona-btn.active {
                background: var(--primary-color);
                color: white;
                box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
            }

            .persona-btn i {
                font-size: 0.9rem;
                flex-shrink: 0;
            }

            .persona-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: none;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                backdrop-filter: blur(5px);
            }

            .persona-loader-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                color: white;
                text-align: center;
            }

            .persona-loader-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @media (max-width: 768px) {
                .persona-switcher {
                    order: -1;
                    margin-left: 0;
                    margin-right: auto;
                }

                .persona-switcher-container {
                    background: rgba(255, 255, 255, 0.95);
                    border: 1px solid var(--border-color);
                }

                .persona-btn span {
                    display: none;
                }

                .persona-btn {
                    padding: 0.5rem;
                    min-width: 40px;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Get current persona
    getCurrentPersona() {
        return this.currentPersona;
    }

    // Get persona config
    getPersonaConfig(personaName) {
        return this.personas[personaName];
    }
}

// Initialize persona system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.personaSystem = new PersonaSystem();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PersonaSystem;
}
