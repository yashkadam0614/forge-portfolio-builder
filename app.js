// Portfolio Builder Pro - Main Application Logic
class PortfolioBuilder {
    constructor() {
        this.currentTheme = null;
        this.portfolioData = {
            hero: {
                name: "Your Name",
                title: "Full Stack Developer", 
                description: "I create digital experiences that make people's lives better through thoughtful design and clean code."
            },
            about: {
                bio: "Passionate developer with 3+ years of experience building web applications. I specialize in React, Node.js, and modern web technologies.",
                skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "AWS"]
            },
            projects: [
                {
                    title: "E-commerce Platform",
                    description: "Full-stack e-commerce solution with React frontend and Node.js backend",
                    tech: ["React", "Node.js", "MongoDB"],
                    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
                    demo: "https://demo.example.com",
                    github: "https://github.com/username/project"
                }
            ],
            contact: {
                email: "hello@yourname.com",
                github: "https://github.com/username",
                linkedin: "https://linkedin.com/in/username"
            }
        };
        this.customization = {
            colors: {
                primary: "#2563eb",
                secondary: "#64748b"
            },
            font: "modern-sans",
            contentWidth: "centered"
        };
        this.themes = {
            "minimalist-pro": {
                colors: {"primary": "#2563eb", "secondary": "#64748b", "background": "#ffffff", "text": "#1e293b"}
            },
            "dark-mode": {
                colors: {"primary": "#06b6d4", "secondary": "#8b5cf6", "background": "#0f172a", "text": "#f8fafc"}
            },
            "creative-grid": {
                colors: {"primary": "#f59e0b", "secondary": "#10b981", "background": "#f9fafb", "text": "#111827"}
            },
            "classic-portfolio": {
                colors: {"primary": "#7c3aed", "secondary": "#6b7280", "background": "#ffffff", "text": "#374151"}
            },
            "glassmorphism": {
                colors: {"primary": "#ec4899", "secondary": "#3b82f6", "background": "#1e1b4b", "text": "#f1f5f9"}
            },
            "brutalist": {
                colors: {"primary": "#dc2626", "secondary": "#000000", "background": "#ffffff", "text": "#000000"}
            }
        };
    }

    init() {
        this.bindEvents();
        this.populateForm();
        this.updateProjectsList();
    }

    bindEvents() {
        // Theme selection - Fix the event binding
        const themeCards = document.querySelectorAll('.theme-card');
        themeCards.forEach(card => {
            const selectBtn = card.querySelector('.theme-select-btn');
            if (selectBtn) {
                selectBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const themeId = card.dataset.theme;
                    console.log('Selecting theme:', themeId); // Debug log
                    this.selectTheme(themeId);
                });
            }
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tabId = e.target.dataset.tab;
                this.switchTab(tabId);
            });
        });

        // Content form inputs
        this.bindContentInputs();
        
        // Customization inputs
        this.bindCustomizationInputs();

        // Project management
        const addProjectBtn = document.getElementById('add-project');
        if (addProjectBtn) {
            addProjectBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addProject();
            });
        }

        // Preview controls
        document.querySelectorAll('.preview-mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const mode = e.target.dataset.mode;
                this.switchPreviewMode(mode);
            });
        });

        // Navigation
        const backBtn = document.getElementById('back-to-themes');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showThemeSelection();
            });
        }

        const previewToggle = document.getElementById('preview-toggle');
        if (previewToggle) {
            previewToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePreview();
            });
        }

        // Export functionality
        const exportBtn = document.getElementById('export-btn');
        if (exportBtn) {
            exportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showExportModal();
            });
        }

        const closeExportModal = document.getElementById('close-export-modal');
        if (closeExportModal) {
            closeExportModal.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideExportModal();
            });
        }

        const cancelExport = document.getElementById('cancel-export');
        if (cancelExport) {
            cancelExport.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideExportModal();
            });
        }

        const downloadBtn = document.getElementById('download-portfolio');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.downloadPortfolio();
            });
        }

        const resetBtn = document.getElementById('reset-theme');
        if (resetBtn) {
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetToThemeDefaults();
            });
        }

        // Modal backdrop click
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', () => {
                this.hideExportModal();
            });
        }
    }

    bindContentInputs() {
        // Hero section
        const heroName = document.getElementById('hero-name');
        if (heroName) {
            heroName.addEventListener('input', (e) => {
                this.portfolioData.hero.name = e.target.value;
                this.updatePreview();
            });
        }

        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            heroTitle.addEventListener('input', (e) => {
                this.portfolioData.hero.title = e.target.value;
                this.updatePreview();
            });
        }

        const heroDescription = document.getElementById('hero-description');
        if (heroDescription) {
            heroDescription.addEventListener('input', (e) => {
                this.portfolioData.hero.description = e.target.value;
                this.updatePreview();
            });
        }

        // About section
        const aboutBio = document.getElementById('about-bio');
        if (aboutBio) {
            aboutBio.addEventListener('input', (e) => {
                this.portfolioData.about.bio = e.target.value;
                this.updatePreview();
            });
        }

        const aboutSkills = document.getElementById('about-skills');
        if (aboutSkills) {
            aboutSkills.addEventListener('input', (e) => {
                this.portfolioData.about.skills = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                this.updatePreview();
            });
        }

        // Contact section
        const contactEmail = document.getElementById('contact-email');
        if (contactEmail) {
            contactEmail.addEventListener('input', (e) => {
                this.portfolioData.contact.email = e.target.value;
                this.updatePreview();
            });
        }

        const contactGithub = document.getElementById('contact-github');
        if (contactGithub) {
            contactGithub.addEventListener('input', (e) => {
                this.portfolioData.contact.github = e.target.value;
                this.updatePreview();
            });
        }

        const contactLinkedin = document.getElementById('contact-linkedin');
        if (contactLinkedin) {
            contactLinkedin.addEventListener('input', (e) => {
                this.portfolioData.contact.linkedin = e.target.value;
                this.updatePreview();
            });
        }
    }

    bindCustomizationInputs() {
        const primaryColor = document.getElementById('primary-color');
        if (primaryColor) {
            primaryColor.addEventListener('change', (e) => {
                this.customization.colors.primary = e.target.value;
                this.updatePreview();
            });
        }

        const secondaryColor = document.getElementById('secondary-color');
        if (secondaryColor) {
            secondaryColor.addEventListener('change', (e) => {
                this.customization.colors.secondary = e.target.value;
                this.updatePreview();
            });
        }

        const fontSelection = document.getElementById('font-selection');
        if (fontSelection) {
            fontSelection.addEventListener('change', (e) => {
                this.customization.font = e.target.value;
                this.updatePreview();
            });
        }

        document.querySelectorAll('input[name="content-width"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.customization.contentWidth = e.target.value;
                this.updatePreview();
            });
        });
    }

    selectTheme(themeId) {
        console.log('selectTheme called with:', themeId); // Debug log
        this.currentTheme = themeId;
        const theme = this.themes[themeId];
        
        if (!theme) {
            console.error('Theme not found:', themeId);
            return;
        }
        
        // Update customization with theme colors
        this.customization.colors = { ...theme.colors };
        
        // Update color inputs
        const primaryColorInput = document.getElementById('primary-color');
        const secondaryColorInput = document.getElementById('secondary-color');
        
        if (primaryColorInput) primaryColorInput.value = theme.colors.primary;
        if (secondaryColorInput) secondaryColorInput.value = theme.colors.secondary;
        
        console.log('Showing editor...'); // Debug log
        this.showEditor();
        
        // Update preview after a short delay to ensure DOM is updated
        setTimeout(() => {
            this.updatePreview();
        }, 100);
    }

    showThemeSelection() {
        const themeSelection = document.getElementById('theme-selection');
        const editorView = document.getElementById('editor-view');
        
        if (themeSelection) themeSelection.classList.add('view--active');
        if (editorView) editorView.classList.remove('view--active');
    }

    showEditor() {
        const themeSelection = document.getElementById('theme-selection');
        const editorView = document.getElementById('editor-view');
        
        console.log('Elements found:', { themeSelection, editorView }); // Debug log
        
        if (themeSelection) {
            themeSelection.classList.remove('view--active');
            console.log('Removed active from theme selection');
        }
        if (editorView) {
            editorView.classList.add('view--active');
            console.log('Added active to editor view');
        }
    }

    switchTab(tabId) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('tab-btn--active');
        });
        const activeTabBtn = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeTabBtn) {
            activeTabBtn.classList.add('tab-btn--active');
        }

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('tab-content--active');
        });
        const activeTabContent = document.getElementById(`${tabId}-tab`);
        if (activeTabContent) {
            activeTabContent.classList.add('tab-content--active');
        }
    }

    populateForm() {
        const heroName = document.getElementById('hero-name');
        const heroTitle = document.getElementById('hero-title');
        const heroDescription = document.getElementById('hero-description');
        const aboutBio = document.getElementById('about-bio');
        const aboutSkills = document.getElementById('about-skills');
        const contactEmail = document.getElementById('contact-email');
        const contactGithub = document.getElementById('contact-github');
        const contactLinkedin = document.getElementById('contact-linkedin');

        if (heroName) heroName.value = this.portfolioData.hero.name;
        if (heroTitle) heroTitle.value = this.portfolioData.hero.title;
        if (heroDescription) heroDescription.value = this.portfolioData.hero.description;
        if (aboutBio) aboutBio.value = this.portfolioData.about.bio;
        if (aboutSkills) aboutSkills.value = this.portfolioData.about.skills.join(', ');
        if (contactEmail) contactEmail.value = this.portfolioData.contact.email;
        if (contactGithub) contactGithub.value = this.portfolioData.contact.github;
        if (contactLinkedin) contactLinkedin.value = this.portfolioData.contact.linkedin;
    }

    addProject() {
        const newProject = {
            title: "New Project",
            description: "Project description...",
            tech: ["JavaScript"],
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
            demo: "",
            github: ""
        };
        
        this.portfolioData.projects.push(newProject);
        this.updateProjectsList();
        this.updatePreview();
    }

    updateProjectsList() {
        const projectsList = document.getElementById('projects-list');
        if (!projectsList) return;
        
        projectsList.innerHTML = '';

        this.portfolioData.projects.forEach((project, index) => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item';
            projectElement.innerHTML = `
                <div class="project-header">
                    <span class="project-title">Project ${index + 1}</span>
                    <button class="remove-project" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="form-group">
                    <label class="form-label">Project Title</label>
                    <input type="text" class="form-control project-title-input" data-index="${index}" value="${project.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control project-desc-input" data-index="${index}" rows="2">${project.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Technologies (comma separated)</label>
                    <input type="text" class="form-control project-tech-input" data-index="${index}" value="${project.tech.join(', ')}">
                </div>
                <div class="form-group">
                    <label class="form-label">Demo URL</label>
                    <input type="url" class="form-control project-demo-input" data-index="${index}" value="${project.demo}">
                </div>
                <div class="form-group">
                    <label class="form-label">GitHub URL</label>
                    <input type="url" class="form-control project-github-input" data-index="${index}" value="${project.github}">
                </div>
            `;
            
            projectsList.appendChild(projectElement);
        });

        // Bind project input events
        this.bindProjectInputs();
    }

    bindProjectInputs() {
        document.querySelectorAll('.project-title-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.portfolioData.projects[index].title = e.target.value;
                this.updatePreview();
            });
        });

        document.querySelectorAll('.project-desc-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.portfolioData.projects[index].description = e.target.value;
                this.updatePreview();
            });
        });

        document.querySelectorAll('.project-tech-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.portfolioData.projects[index].tech = e.target.value.split(',').map(s => s.trim()).filter(s => s);
                this.updatePreview();
            });
        });

        document.querySelectorAll('.project-demo-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.portfolioData.projects[index].demo = e.target.value;
                this.updatePreview();
            });
        });

        document.querySelectorAll('.project-github-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.portfolioData.projects[index].github = e.target.value;
                this.updatePreview();
            });
        });

        document.querySelectorAll('.remove-project').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const index = parseInt(e.target.closest('.remove-project').dataset.index);
                this.portfolioData.projects.splice(index, 1);
                this.updateProjectsList();
                this.updatePreview();
            });
        });
    }

    switchPreviewMode(mode) {
        document.querySelectorAll('.preview-mode-btn').forEach(btn => {
            btn.classList.remove('preview-mode-btn--active');
        });
        const activeModeBtn = document.querySelector(`[data-mode="${mode}"]`);
        if (activeModeBtn) {
            activeModeBtn.classList.add('preview-mode-btn--active');
        }

        const container = document.querySelector('.preview-container');
        if (container) {
            if (mode === 'mobile') {
                container.classList.add('preview-container--mobile');
            } else {
                container.classList.remove('preview-container--mobile');
            }
        }
    }

    togglePreview() {
        const isEditorView = document.getElementById('editor-view').classList.contains('view--active');
        if (isEditorView) {
            // Already in editor view with preview
            return;
        } else {
            // Show editor view if we're in theme selection
            if (this.currentTheme) {
                this.showEditor();
            }
        }
    }

    updatePreview() {
        if (!this.currentTheme) return;
        
        const previewFrame = document.getElementById('preview-frame');
        if (!previewFrame) return;
        
        const portfolioHTML = this.generatePortfolioHTML();
        
        const blob = new Blob([portfolioHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        previewFrame.src = url;
        
        // Clean up previous blob URL after a delay
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }

    generatePortfolioHTML() {
        const fontFamily = this.getFontFamily();
        const themeStyles = this.generateThemeStyles();
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.portfolioData.hero.name} - ${this.portfolioData.hero.title}</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Poppins:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Open+Sans:wght@400;600&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">
    <style>
        ${themeStyles}
    </style>
</head>
<body class="theme-${this.currentTheme}">
    <nav class="navbar">
        <div class="container">
            <a href="#home" class="nav-brand">${this.portfolioData.hero.name}</a>
            <ul class="nav-menu">
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <main>
        <section id="home" class="hero">
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-name">${this.portfolioData.hero.name}</h1>
                    <p class="hero-title">${this.portfolioData.hero.title}</p>
                    <p class="hero-description">${this.portfolioData.hero.description}</p>
                    <div class="hero-actions">
                        <a href="#projects" class="btn btn-primary">View My Work</a>
                        <a href="#contact" class="btn btn-outline">Get In Touch</a>
                    </div>
                </div>
            </div>
        </section>

        <section id="about" class="about">
            <div class="container">
                <h2>About Me</h2>
                <div class="about-content">
                    <div class="about-text">
                        <p>${this.portfolioData.about.bio}</p>
                        <div class="skills">
                            <h3>Skills</h3>
                            <div class="skills-list">
                                ${this.portfolioData.about.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="projects" class="projects">
            <div class="container">
                <h2>Featured Projects</h2>
                <div class="projects-grid">
                    ${this.portfolioData.projects.map(project => `
                        <div class="project-card">
                            <div class="project-image">
                                <img src="${project.image}" alt="${project.title}">
                            </div>
                            <div class="project-content">
                                <h3>${project.title}</h3>
                                <p>${project.description}</p>
                                <div class="project-tech">
                                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                                <div class="project-links">
                                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="btn btn-sm">Live Demo</a>` : ''}
                                    ${project.github ? `<a href="${project.github}" target="_blank" class="btn btn-sm btn-outline">GitHub</a>` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <section id="contact" class="contact">
            <div class="container">
                <h2>Get In Touch</h2>
                <div class="contact-content">
                    <p>Ready to work together? Let's create something amazing!</p>
                    <div class="contact-info">
                        <a href="mailto:${this.portfolioData.contact.email}" class="contact-item">
                            <i class="fas fa-envelope"></i>
                            ${this.portfolioData.contact.email}
                        </a>
                        ${this.portfolioData.contact.github ? `<a href="${this.portfolioData.contact.github}" target="_blank" class="contact-item">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>` : ''}
                        ${this.portfolioData.contact.linkedin ? `<a href="${this.portfolioData.contact.linkedin}" target="_blank" class="contact-item">
                            <i class="fab fa-linkedin"></i>
                            LinkedIn
                        </a>` : ''}
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 ${this.portfolioData.hero.name}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle (if needed)
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    </script>
</body>
</html>`;
    }

    getFontFamily() {
        const fontMap = {
            'modern-sans': { primary: 'Inter', secondary: 'system-ui' },
            'classic-serif': { primary: 'Playfair Display', secondary: 'Georgia' },
            'tech-mono': { primary: 'JetBrains Mono', secondary: 'Monaco' },
            'creative-mix': { primary: 'Poppins', secondary: 'Open Sans' },
            'editorial': { primary: 'Merriweather', secondary: 'Source Sans Pro' }
        };
        return fontMap[this.customization.font] || fontMap['modern-sans'];
    }

    generateThemeStyles() {
        const fontFamily = this.getFontFamily();
        const colors = this.customization.colors;
        
        return `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "${fontFamily.primary}", "${fontFamily.secondary}", sans-serif;
            line-height: 1.6;
            color: ${colors.text};
            background: ${colors.background};
        }

        .container {
            max-width: ${this.customization.contentWidth === 'full-width' ? '100%' : '1200px'};
            margin: 0 auto;
            padding: 0 20px;
        }

        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: ${colors.background}ee;
            backdrop-filter: blur(10px);
            z-index: 1000;
            padding: 1rem 0;
            border-bottom: 1px solid ${colors.secondary}33;
        }

        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-brand {
            font-size: 1.5rem;
            font-weight: bold;
            color: ${colors.primary};
            text-decoration: none;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-menu a {
            color: ${colors.text};
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .nav-menu a:hover {
            color: ${colors.primary};
        }

        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            text-align: center;
            background: ${this.currentTheme === 'glassmorphism' ? `linear-gradient(135deg, ${colors.background}, ${colors.primary}22)` : colors.background};
        }

        .hero-name {
            font-size: 3.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            color: ${colors.text};
        }

        .hero-title {
            font-size: 1.5rem;
            color: ${colors.primary};
            margin-bottom: 1.5rem;
            font-weight: 500;
        }

        .hero-description {
            font-size: 1.2rem;
            color: ${colors.secondary};
            margin-bottom: 2.5rem;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .hero-actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1rem;
        }

        .btn-primary {
            background: ${colors.primary};
            color: white;
        }

        .btn-primary:hover {
            background: ${colors.primary}ee;
            transform: translateY(-2px);
        }

        .btn-outline {
            background: transparent;
            color: ${colors.primary};
            border: 2px solid ${colors.primary};
        }

        .btn-outline:hover {
            background: ${colors.primary};
            color: white;
        }

        .btn-sm {
            padding: 8px 16px;
            font-size: 0.9rem;
        }

        section {
            padding: 5rem 0;
        }

        section h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: ${colors.text};
        }

        .about-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }

        .about-text p {
            font-size: 1.1rem;
            margin-bottom: 2rem;
            color: ${colors.secondary};
        }

        .skills h3 {
            margin-bottom: 1.5rem;
            color: ${colors.text};
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
        }

        .skill-tag {
            background: ${colors.primary}22;
            color: ${colors.primary};
            padding: 8px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
            border: 1px solid ${colors.primary}33;
        }

        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .project-card {
            background: ${this.currentTheme === 'glassmorphism' ? `${colors.text}11` : colors.background === '#ffffff' ? '#f8f9fa' : `${colors.text}11`};
            border-radius: 12px;
            overflow: hidden;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: 1px solid ${colors.secondary}22;
            ${this.currentTheme === 'glassmorphism' ? 'backdrop-filter: blur(10px);' : ''}
        }

        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px ${colors.primary}22;
        }

        .project-image {
            height: 200px;
            overflow: hidden;
        }

        .project-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }

        .project-card:hover .project-image img {
            transform: scale(1.05);
        }

        .project-content {
            padding: 1.5rem;
        }

        .project-content h3 {
            margin-bottom: 1rem;
            color: ${colors.text};
        }

        .project-content p {
            color: ${colors.secondary};
            margin-bottom: 1.5rem;
        }

        .project-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1.5rem;
        }

        .tech-tag {
            background: ${colors.secondary}22;
            color: ${colors.secondary};
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
        }

        .project-links {
            display: flex;
            gap: 1rem;
        }

        .contact-content {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
        }

        .contact-content p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            color: ${colors.secondary};
        }

        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: ${colors.text};
            text-decoration: none;
            font-size: 1.1rem;
            transition: color 0.3s ease;
        }

        .contact-item:hover {
            color: ${colors.primary};
        }

        .contact-item i {
            width: 24px;
            text-align: center;
        }

        .footer {
            background: ${this.currentTheme === 'dark-mode' ? colors.text + '11' : colors.secondary + '11'};
            padding: 2rem 0;
            text-align: center;
            color: ${colors.secondary};
        }

        /* Theme-specific styles */
        ${this.getThemeSpecificStyles()}

        /* Responsive design */
        @media (max-width: 768px) {
            .hero-name {
                font-size: 2.5rem;
            }
            
            .hero-actions {
                flex-direction: column;
                align-items: center;
            }
            
            .nav-menu {
                display: none;
            }
            
            section {
                padding: 3rem 0;
            }
            
            .projects-grid {
                grid-template-columns: 1fr;
            }
        }
        `;
    }

    getThemeSpecificStyles() {
        switch(this.currentTheme) {
            case 'brutalist':
                return `
                    .project-card {
                        transform: rotate(-1deg);
                        border: 3px solid ${this.customization.colors.text};
                    }
                    .project-card:nth-child(even) {
                        transform: rotate(1deg);
                    }
                    .project-card:hover {
                        transform: rotate(0deg) translateY(-5px);
                    }
                    .skill-tag, .tech-tag {
                        border-radius: 0;
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                `;
            case 'glassmorphism':
                return `
                    .project-card, .navbar {
                        backdrop-filter: blur(20px);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                    }
                `;
            case 'creative-grid':
                return `
                    .projects-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                        grid-auto-rows: minmax(200px, auto);
                        gap: 1rem;
                    }
                    .project-card:nth-child(3n) {
                        grid-column: span 2;
                    }
                `;
            default:
                return '';
        }
    }

    resetToThemeDefaults() {
        if (!this.currentTheme) return;
        
        const theme = this.themes[this.currentTheme];
        this.customization.colors = { ...theme.colors };
        
        // Update form inputs
        const primaryColor = document.getElementById('primary-color');
        const secondaryColor = document.getElementById('secondary-color');
        const fontSelection = document.getElementById('font-selection');
        const contentWidthCentered = document.querySelector('input[name="content-width"][value="centered"]');
        
        if (primaryColor) primaryColor.value = theme.colors.primary;
        if (secondaryColor) secondaryColor.value = theme.colors.secondary;
        if (fontSelection) fontSelection.value = 'modern-sans';
        if (contentWidthCentered) contentWidthCentered.checked = true;
        
        this.customization.font = 'modern-sans';
        this.customization.contentWidth = 'centered';
        
        this.updatePreview();
    }

    showExportModal() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    hideExportModal() {
        const modal = document.getElementById('export-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }

    downloadPortfolio() {
        const portfolioHTML = this.generatePortfolioHTML();
        const blob = new Blob([portfolioHTML], { type: 'text/html' });
        
        // Create download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.portfolioData.hero.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.hideExportModal();
        
        // Show success message
        this.showNotification('Portfolio downloaded successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--color-surface);
                    border: 1px solid var(--color-border);
                    padding: 1rem 1.5rem;
                    border-radius: var(--radius-base);
                    box-shadow: var(--shadow-lg);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    animation: slideIn 0.3s ease;
                }
                .notification--success {
                    border-color: var(--color-success);
                    color: var(--color-success);
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Portfolio Builder...');
    const app = new PortfolioBuilder();
    app.init();
    console.log('Portfolio Builder initialized successfully');
});