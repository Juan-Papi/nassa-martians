// ORLP Main Application - Core functionality and state management

class ORLPApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'hero';
        this.isInitialized = false;
        this.modals = new Map();
        this.eventListeners = new Map();
        
        // Initialize app
        this.init();
    }

    async init() {
        try {
            // Load user data
            this.currentUser = ORLPData.userData.currentUser;
            
            // Initialize UI components
            this.initializeUI();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load user progress and data
            this.loadUserProgress();
            
            // Initialize animations and interactions
            this.initializeAnimations();
            
            this.isInitialized = true;
            console.log('ORLP Application initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize ORLP Application:', error);
            ORLPUtils.showNotification('Failed to initialize application', 'error');
        }
    }

    initializeUI() {
        // Initialize dashboard
        this.initializeDashboard();
        
        // Initialize courses section
        this.initializeCourses();
        
        // Initialize certifications
        this.initializeCertifications();
        
        // Initialize profile
        this.initializeProfile();
        
        // Update UI based on user plan
        this.updatePlanUI();
        
        // Setup navigation
        this.setupNavigation();
    }

    initializeDashboard() {
        // Update progress ring
        this.updateProgressRing();
        
        // Populate activity feed
        this.populateActivityFeed();
        
        // Populate achievements
        this.populateAchievements();
        
        // Populate upcoming events
        this.populateUpcomingEvents();
        
        // Update user stats
        this.updateUserStats();
    }

    updateProgressRing() {
        const progressCircle = document.getElementById('progressCircle');
        const progressPercentage = document.getElementById('progressPercentage');
        
        if (!progressCircle || !progressPercentage) return;
        
        const totalCourses = ORLPData.coursesData.courses.length;
        const completedCourses = this.currentUser.coursesCompleted.length;
        const totalSimulations = ORLPData.simulationsData.simulations.length;
        const completedSimulations = this.currentUser.simulationsCompleted.length;
        
        // Calculate overall progress (70% courses, 30% simulations)
        const courseProgress = (completedCourses / totalCourses) * 70;
        const simulationProgress = (completedSimulations / totalSimulations) * 30;
        const overallProgress = Math.round(courseProgress + simulationProgress);
        
        // Animate progress ring
        setTimeout(() => {
            ORLPUtils.animateProgress(progressCircle, overallProgress);
            progressPercentage.textContent = overallProgress + '%';
        }, 500);
        
        // Update progress details
        const coursesCompletedEl = document.getElementById('coursesCompleted');
        const simulationsRunEl = document.getElementById('simulationsRun');
        
        if (coursesCompletedEl) {
            coursesCompletedEl.textContent = `${completedCourses}/${totalCourses}`;
        }
        
        if (simulationsRunEl) {
            simulationsRunEl.textContent = `${completedSimulations}/${totalSimulations}`;
        }
    }

    populateActivityFeed() {
        const activityList = document.getElementById('activityList');
        if (!activityList) return;
        
        activityList.innerHTML = '';
        
        // Get recent activities (last 5)
        const recentActivities = ORLPData.activityData.slice(0, 5);
        
        recentActivities.forEach(activity => {
            const activityItem = this.createActivityItem(activity);
            activityList.appendChild(activityItem);
        });
    }

    createActivityItem(activity) {
        const item = ORLPUtils.createElement('div', 'activity-item');
        
        const icon = ORLPUtils.createElement('div', 'activity-icon');
        icon.innerHTML = `<i class="${activity.icon}"></i>`;
        
        const content = ORLPUtils.createElement('div', 'activity-content');
        content.innerHTML = `
            <div class="activity-title">${activity.title}</div>
            <div class="activity-time">${ORLPUtils.getTimeAgo(activity.timestamp)}</div>
        `;
        
        item.appendChild(icon);
        item.appendChild(content);
        
        return item;
    }

    populateAchievements() {
        const achievementGrid = document.getElementById('achievementGrid');
        if (!achievementGrid) return;
        
        achievementGrid.innerHTML = '';
        
        // Get unlocked achievements
        const unlockedAchievements = ORLPData.achievementsData.filter(
            achievement => this.currentUser.achievements.includes(achievement.id)
        );
        
        unlockedAchievements.forEach(achievement => {
            const achievementItem = this.createAchievementItem(achievement);
            achievementGrid.appendChild(achievementItem);
        });
    }

    createAchievementItem(achievement) {
        const item = ORLPUtils.createElement('div', 'achievement-item');
        
        item.innerHTML = `
            <div class="achievement-icon">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-name">${achievement.name}</div>
        `;
        
        item.title = achievement.description;
        
        return item;
    }

    populateUpcomingEvents() {
        const upcomingList = document.getElementById('upcomingList');
        if (!upcomingList) return;
        
        upcomingList.innerHTML = '';
        
        // Get upcoming events (next 4)
        const upcomingEvents = ORLPData.upcomingData.slice(0, 4);
        
        upcomingEvents.forEach(event => {
            const eventItem = this.createUpcomingItem(event);
            upcomingList.appendChild(eventItem);
        });
    }

    createUpcomingItem(event) {
        const item = ORLPUtils.createElement('div', 'upcoming-item');
        
        const date = new Date(event.date);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const day = date.getDate();
        
        const dateDiv = ORLPUtils.createElement('div', 'upcoming-date');
        dateDiv.innerHTML = `
            <div class="upcoming-month">${month}</div>
            <div class="upcoming-day">${day}</div>
        `;
        
        const content = ORLPUtils.createElement('div', 'upcoming-content');
        content.innerHTML = `
            <div class="upcoming-title">${event.title}</div>
            <div class="upcoming-type">${event.type}</div>
        `;
        
        item.appendChild(dateDiv);
        item.appendChild(content);
        
        return item;
    }

    updateUserStats() {
        // Update user level, XP, and plan in various places
        const elements = [
            { id: 'userLevel', value: this.currentUser.level },
            { id: 'userXP', value: ORLPUtils.formatNumber(this.currentUser.xp) },
            { id: 'userPlan', value: this.currentUser.plan.charAt(0).toUpperCase() + this.currentUser.plan.slice(1) },
            { id: 'userName', value: this.currentUser.name },
            { id: 'userEmail', value: this.currentUser.email }
        ];
        
        elements.forEach(({ id, value }) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    initializeCourses() {
        this.populateCourseGrid();
        this.setupCourseFilters();
    }

    populateCourseGrid() {
        const courseGrid = document.getElementById('courseGrid');
        if (!courseGrid) return;
        
        courseGrid.innerHTML = '';
        
        ORLPData.coursesData.courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            courseGrid.appendChild(courseCard);
        });
    }

    createCourseCard(course) {
        const card = ORLPUtils.createElement('div', 'course-card');
        
        const category = ORLPData.coursesData.categories.find(cat => cat.id === course.category);
        
        card.innerHTML = `
            <div class="course-thumbnail">
                <div class="course-category" style="background-color: ${category?.color || '#0066cc'}">
                    <i class="${category?.icon || 'fas fa-book'}"></i>
                </div>
                ${course.isPremium ? '<div class="premium-badge">Premium</div>' : ''}
            </div>
            <div class="course-content">
                <div class="course-header">
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-rating">
                        <i class="fas fa-star"></i>
                        <span>${course.rating}</span>
                    </div>
                </div>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-instructor">
                        <i class="${course.instructorAvatar}"></i>
                        <span>${course.instructor}</span>
                    </div>
                    <div class="course-stats">
                        <span><i class="fas fa-clock"></i> ${ORLPUtils.formatDuration(course.duration)}</span>
                        <span><i class="fas fa-users"></i> ${ORLPUtils.formatNumber(course.students)}</span>
                    </div>
                </div>
                <div class="course-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                    <span class="progress-text">${course.progress}% Complete</span>
                </div>
                <div class="course-actions">
                    ${course.completed ? 
                        '<button class="btn btn-success"><i class="fas fa-check"></i> Completed</button>' :
                        `<button class="btn btn-primary" onclick="orlpApp.startCourse(${course.id})">
                            ${course.progress > 0 ? 'Continue' : 'Start Course'}
                        </button>`
                    }
                    ${course.isPremium && this.currentUser.plan === 'free' ? 
                        '<button class="btn btn-upgrade" onclick="orlpApp.showUpgradeModal()">Upgrade</button>' : ''
                    }
                </div>
            </div>
        `;
        
        // Add category filter attribute
        card.setAttribute('data-category', course.category);
        
        return card;
    }

    setupCourseFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.getAttribute('data-filter');
                this.filterCourses(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    filterCourses(filter) {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const category = ORLPData.coursesData.categories.find(cat => cat.name.toLowerCase().includes(filter));
                if (category && card.getAttribute('data-category') == category.id) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }

    initializeCertifications() {
        this.populateCertificationGrid();
    }

    populateCertificationGrid() {
        const certificationGrid = document.getElementById('certificationGrid');
        if (!certificationGrid) return;
        
        certificationGrid.innerHTML = '';
        
        ORLPData.certificationsData.forEach(certification => {
            const certCard = this.createCertificationCard(certification);
            certificationGrid.appendChild(certCard);
        });
    }

    createCertificationCard(certification) {
        const card = ORLPUtils.createElement('div', 'certification-card');
        
        card.innerHTML = `
            <div class="cert-header">
                <div class="cert-icon" style="color: ${certification.color}">
                    <i class="${certification.icon}"></i>
                </div>
                <div class="cert-status">
                    ${certification.earned ? 
                        '<span class="status-earned"><i class="fas fa-check-circle"></i> Earned</span>' :
                        `<span class="status-progress">${certification.progress}% Complete</span>`
                    }
                </div>
            </div>
            <div class="cert-content">
                <h3 class="cert-title">${certification.name}</h3>
                <p class="cert-organization">${certification.organization}</p>
                <p class="cert-description">${certification.description}</p>
                <div class="cert-meta">
                    <span class="cert-level">${certification.level.charAt(0).toUpperCase() + certification.level.slice(1)}</span>
                    <span class="cert-duration">${certification.duration}</span>
                </div>
                ${!certification.earned && certification.progress > 0 ? 
                    `<div class="cert-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${certification.progress}%"></div>
                        </div>
                    </div>` : ''
                }
            </div>
        `;
        
        return card;
    }

    initializeProfile() {
        this.setupProfileTabs();
        this.populateProfileData();
    }

    setupProfileTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                
                // Update active tab button
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Update active tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabName) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    populateProfileData() {
        this.populateJourneyTimeline();
        this.populateAchievementList();
        this.populateSkillRadar();
    }

    populateJourneyTimeline() {
        const journeyTimeline = document.getElementById('journeyTimeline');
        if (!journeyTimeline) return;
        
        journeyTimeline.innerHTML = '';
        
        ORLPData.journeyData.forEach(milestone => {
            const timelineItem = this.createTimelineItem(milestone);
            journeyTimeline.appendChild(timelineItem);
        });
    }

    createTimelineItem(milestone) {
        const item = ORLPUtils.createElement('div', 'timeline-item');
        
        if (milestone.milestone) {
            item.classList.add('milestone');
        }
        
        item.innerHTML = `
            <div class="timeline-icon">
                <i class="${milestone.icon}"></i>
            </div>
            <div class="timeline-content">
                <div class="timeline-date">${ORLPUtils.formatDate(milestone.date)}</div>
                <div class="timeline-title">${milestone.title}</div>
                <div class="timeline-description">${milestone.description}</div>
            </div>
        `;
        
        return item;
    }

    populateAchievementList() {
        const achievementList = document.getElementById('achievementList');
        if (!achievementList) return;
        
        achievementList.innerHTML = '';
        
        ORLPData.achievementsData.forEach(achievement => {
            const achievementItem = this.createDetailedAchievementItem(achievement);
            achievementList.appendChild(achievementItem);
        });
    }

    createDetailedAchievementItem(achievement) {
        const item = ORLPUtils.createElement('div', 'detailed-achievement-item');
        
        const isUnlocked = this.currentUser.achievements.includes(achievement.id);
        const progress = achievement.progress || 0;
        const maxProgress = achievement.maxProgress || 1;
        
        item.innerHTML = `
            <div class="achievement-icon ${isUnlocked ? 'unlocked' : 'locked'}">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-details">
                <h4 class="achievement-name">${achievement.name}</h4>
                <p class="achievement-description">${achievement.description}</p>
                ${!isUnlocked && maxProgress > 1 ? 
                    `<div class="achievement-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${(progress / maxProgress) * 100}%"></div>
                        </div>
                        <span class="progress-text">${progress}/${maxProgress}</span>
                    </div>` : ''
                }
            </div>
            <div class="achievement-reward">
                <span class="xp-reward">+${achievement.xpReward} XP</span>
                <span class="achievement-rarity">${achievement.rarity}</span>
            </div>
        `;
        
        return item;
    }

    populateSkillRadar() {
        const skillRadar = document.getElementById('skillRadar');
        if (!skillRadar) return;
        
        // Create a simple skill visualization
        skillRadar.innerHTML = '';
        
        ORLPData.skillData.categories.forEach((category, index) => {
            const skillItem = ORLPUtils.createElement('div', 'skill-item');
            const currentSkill = ORLPData.skillData.currentSkills[category.name];
            const targetSkill = ORLPData.skillData.targetSkills[category.name];
            
            skillItem.innerHTML = `
                <div class="skill-name">${category.name}</div>
                <div class="skill-bar">
                    <div class="skill-current" style="width: ${currentSkill}%; background-color: ${category.color}"></div>
                    <div class="skill-target" style="width: ${targetSkill}%; background-color: ${category.color}; opacity: 0.3;"></div>
                </div>
                <div class="skill-values">
                    <span class="current">${currentSkill}%</span>
                    <span class="target">Target: ${targetSkill}%</span>
                </div>
            `;
            
            skillRadar.appendChild(skillItem);
        });
    }

    updatePlanUI() {
        const planBadge = document.getElementById('planBadge');
        const upgradeBtn = document.getElementById('upgradeBtn');
        
        if (planBadge) {
            planBadge.textContent = this.currentUser.plan.toUpperCase();
            planBadge.className = `plan-badge ${this.currentUser.plan}`;
        }
        
        if (upgradeBtn && this.currentUser.plan === 'free') {
            upgradeBtn.style.display = 'block';
        } else if (upgradeBtn) {
            upgradeBtn.style.display = 'none';
        }
        
        // Apply plan limitations to UI
        this.applyPlanLimitations();
    }

    applyPlanLimitations() {
        const limitations = ORLPData.planLimitations[this.currentUser.plan];
        
        // Hide premium courses for free users
        if (this.currentUser.plan === 'free') {
            const premiumCourses = document.querySelectorAll('[data-premium="true"]');
            premiumCourses.forEach(course => {
                // Add upgrade prompts instead of hiding completely
                this.addUpgradePrompt(course);
            });
        }
    }

    addUpgradePrompt(element) {
        const upgradeOverlay = ORLPUtils.createElement('div', 'upgrade-overlay');
        upgradeOverlay.innerHTML = `
            <div class="upgrade-content">
                <i class="fas fa-crown"></i>
                <h4>Premium Feature</h4>
                <p>Upgrade to access this course</p>
                <button class="btn btn-primary" onclick="orlpApp.showUpgradeModal()">Upgrade Now</button>
            </div>
        `;
        
        element.style.position = 'relative';
        element.appendChild(upgradeOverlay);
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    ORLPUtils.scrollToElement(targetElement, 80);
                    this.currentSection = targetId;
                }
            });
        });
        
        // Update active navigation based on scroll position
        window.addEventListener('scroll', ORLPUtils.throttle(() => {
            this.updateActiveNavigation();
        }, 100));
    }

    updateActiveNavigation() {
        const sections = ['hero', 'dashboard', 'courses', 'simulator', 'certifications', 'profile'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section && ORLPUtils.isElementInViewport(section)) {
                this.currentSection = sectionId;
                
                // Update nav link active state
                const navLinks = document.querySelectorAll('.nav-link');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    setupEventListeners() {
        // Hero section buttons
        const startLearningBtn = document.getElementById('startLearning');
        const watchDemoBtn = document.getElementById('watchDemo');
        
        if (startLearningBtn) {
            startLearningBtn.addEventListener('click', () => {
                ORLPUtils.scrollToElement(document.getElementById('courses'), 80);
            });
        }
        
        if (watchDemoBtn) {
            watchDemoBtn.addEventListener('click', () => {
                ORLPUtils.showNotification('Demo video would open here', 'info');
            });
        }
        
        // Upgrade button
        const upgradeBtn = document.getElementById('upgradeBtn');
        if (upgradeBtn) {
            upgradeBtn.addEventListener('click', () => {
                this.showUpgradeModal();
            });
        }
        
        // Modal close buttons
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        modalCloseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    ORLPUtils.hideModal(modal.id);
                }
            });
        });
        
        // Modal backdrop clicks
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    ORLPUtils.hideModal(modal.id);
                }
            });
        });
    }

    initializeAnimations() {
        // Initialize scroll reveal animations
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
        
        // Initialize hero animations
        this.initializeHeroAnimations();
    }

    initializeHeroAnimations() {
        // Add animation classes to hero elements
        const titleLines = document.querySelectorAll('.title-line');
        const heroDescription = document.querySelector('.hero-description');
        const heroStats = document.querySelector('.hero-stats');
        const heroActions = document.querySelector('.hero-actions');
        
        setTimeout(() => titleLines[0]?.classList.add('animate-slide-in-left'), 100);
        setTimeout(() => titleLines[1]?.classList.add('animate-slide-in-left'), 400);
        setTimeout(() => heroDescription?.classList.add('animate-fade-in-up'), 700);
        setTimeout(() => heroStats?.classList.add('animate-fade-in-up'), 1000);
        setTimeout(() => heroActions?.classList.add('animate-fade-in-up'), 1300);
    }

    // Public methods for external use
    startCourse(courseId) {
        const course = ORLPData.coursesData.courses.find(c => c.id === courseId);
        if (!course) return;
        
        if (course.isPremium && this.currentUser.plan === 'free') {
            this.showUpgradeModal();
            return;
        }
        
        ORLPUtils.showNotification(`Starting course: ${course.title}`, 'success');
        // In a real app, this would navigate to the course player
    }

    showUpgradeModal() {
        ORLPUtils.showModal('upgradeModal');
    }

    loadUserProgress() {
        // Load user progress from localStorage or API
        const savedProgress = ORLPUtils.loadFromStorage('orlp_user_progress');
        if (savedProgress) {
            // Merge saved progress with current user data
            this.currentUser = { ...this.currentUser, ...savedProgress };
        }
    }

    saveUserProgress() {
        // Save user progress to localStorage or API
        ORLPUtils.saveToStorage('orlp_user_progress', {
            coursesCompleted: this.currentUser.coursesCompleted,
            simulationsCompleted: this.currentUser.simulationsCompleted,
            achievements: this.currentUser.achievements,
            xp: this.currentUser.xp,
            level: this.currentUser.level
        });
    }

    // Method to handle plan upgrades
    upgradeToPremium() {
        this.currentUser.plan = 'premium';
        this.updatePlanUI();
        this.saveUserProgress();
        ORLPUtils.showNotification('Successfully upgraded to Premium!', 'success');
        ORLPUtils.hideModal('upgradeModal');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.orlpApp = new ORLPApp();
});

// Export for use in other modules
window.ORLPApp = ORLPApp;
