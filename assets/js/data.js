// ORLP Data Structures - Comprehensive test data for all platform features

// User Management Data
const userData = {
    currentUser: {
        id: 1,
        name: "Space Explorer",
        email: "explorer@orlp.space",
        avatar: "fas fa-user-astronaut",
        level: 1,
        xp: 1250,
        plan: "free", // "free" or "premium"
        joinDate: "2024-01-15",
        lastLogin: "2024-01-20",
        timezone: "UTC",
        preferences: {
            notifications: true,
            theme: "dark",
            language: "en",
            difficulty: "intermediate"
        },
        achievements: [1, 3, 7, 12], // Achievement IDs
        certifications: [1, 2], // Certification IDs
        coursesCompleted: [1, 3, 5],
        simulationsCompleted: [1, 2, 4],
        currentCourse: 6,
        currentModule: 2,
        streak: 7,
        totalStudyTime: 145 // minutes
    },
    
    users: [
        {
            id: 1,
            name: "Space Explorer",
            email: "explorer@orlp.space",
            avatar: "fas fa-user-astronaut",
            level: 1,
            xp: 1250,
            plan: "free"
        },
        {
            id: 2,
            name: "Orbital Engineer",
            email: "engineer@orlp.space",
            avatar: "fas fa-user-gear",
            level: 3,
            xp: 4500,
            plan: "premium"
        },
        {
            id: 3,
            name: "Satellite Security Expert",
            email: "security@orlp.space",
            avatar: "fas fa-user-shield",
            level: 5,
            xp: 8900,
            plan: "premium"
        }
    ]
};

// Course Data Structure
const coursesData = {
    categories: [
        { id: 1, name: "Space Threats", icon: "fas fa-exclamation-triangle", color: "#ff5722" },
        { id: 2, name: "Defense Strategies", icon: "fas fa-shield-halved", color: "#4caf50" },
        { id: 3, name: "Regulations", icon: "fas fa-gavel", color: "#2196f3" },
        { id: 4, name: "Orbital Recycling", icon: "fas fa-recycle", color: "#9c27b0" },
        { id: 5, name: "AI & Analytics", icon: "fas fa-brain", color: "#ff9800" }
    ],
    
    courses: [
        {
            id: 1,
            title: "Introduction to Space Security Threats",
            description: "Learn about the various threats facing space infrastructure including spoofing, jamming, and cyber attacks.",
            category: 1,
            difficulty: "beginner",
            duration: 45,
            modules: 6,
            rating: 4.8,
            students: 1247,
            instructor: "Dr. Sarah Chen",
            instructorAvatar: "fas fa-user-graduate",
            thumbnail: "threat-assessment.jpg",
            isPremium: false,
            progress: 100,
            completed: true,
            tags: ["spoofing", "jamming", "cybersecurity", "satellites"],
            modules: [
                {
                    id: 1,
                    title: "Understanding Space Environment",
                    duration: 8,
                    type: "video",
                    completed: true
                },
                {
                    id: 2,
                    title: "Types of Space Threats",
                    duration: 12,
                    type: "interactive",
                    completed: true
                },
                {
                    id: 3,
                    title: "Spoofing Attacks",
                    duration: 10,
                    type: "simulation",
                    completed: true
                },
                {
                    id: 4,
                    title: "Jamming Techniques",
                    duration: 8,
                    type: "video",
                    completed: true
                },
                {
                    id: 5,
                    title: "Assessment Quiz",
                    duration: 5,
                    type: "quiz",
                    completed: true
                },
                {
                    id: 6,
                    title: "Case Study Analysis",
                    duration: 7,
                    type: "case-study",
                    completed: true
                }
            ]
        },
        {
            id: 2,
            title: "Advanced Jamming Detection Systems",
            description: "Master the latest techniques for detecting and mitigating jamming attacks on satellite communications.",
            category: 2,
            difficulty: "advanced",
            duration: 90,
            modules: 8,
            rating: 4.9,
            students: 892,
            instructor: "Prof. Michael Rodriguez",
            instructorAvatar: "fas fa-user-tie",
            thumbnail: "jamming-detection.jpg",
            isPremium: true,
            progress: 0,
            completed: false,
            tags: ["jamming", "detection", "mitigation", "advanced"],
            modules: [
                {
                    id: 1,
                    title: "Jamming Fundamentals",
                    duration: 15,
                    type: "video",
                    completed: false
                },
                {
                    id: 2,
                    title: "Detection Algorithms",
                    duration: 20,
                    type: "interactive",
                    completed: false
                },
                {
                    id: 3,
                    title: "Real-time Monitoring",
                    duration: 18,
                    type: "simulation",
                    completed: false
                },
                {
                    id: 4,
                    title: "Machine Learning Approaches",
                    duration: 22,
                    type: "interactive",
                    completed: false
                },
                {
                    id: 5,
                    title: "Lab Exercise 1",
                    duration: 10,
                    type: "lab",
                    completed: false
                },
                {
                    id: 6,
                    title: "Advanced Simulations",
                    duration: 15,
                    type: "simulation",
                    completed: false
                },
                {
                    id: 7,
                    title: "Final Project",
                    duration: 25,
                    type: "project",
                    completed: false
                },
                {
                    id: 8,
                    title: "Comprehensive Exam",
                    duration: 12,
                    type: "exam",
                    completed: false
                }
            ]
        },
        {
            id: 3,
            title: "NIST Cybersecurity Framework for Space",
            description: "Apply NIST cybersecurity guidelines to space systems and understand compliance requirements.",
            category: 3,
            difficulty: "intermediate",
            duration: 60,
            modules: 5,
            rating: 4.7,
            students: 1563,
            instructor: "Dr. Lisa Thompson",
            instructorAvatar: "fas fa-user-graduate",
            thumbnail: "nist-framework.jpg",
            isPremium: false,
            progress: 75,
            completed: false,
            tags: ["nist", "compliance", "cybersecurity", "regulations"],
            modules: [
                {
                    id: 1,
                    title: "NIST Framework Overview",
                    duration: 12,
                    type: "video",
                    completed: true
                },
                {
                    id: 2,
                    title: "Space System Applications",
                    duration: 15,
                    type: "interactive",
                    completed: true
                },
                {
                    id: 3,
                    title: "Risk Assessment",
                    duration: 18,
                    type: "simulation",
                    completed: true
                },
                {
                    id: 4,
                    title: "Implementation Strategies",
                    duration: 10,
                    type: "video",
                    completed: false
                },
                {
                    id: 5,
                    title: "Compliance Checklist",
                    duration: 8,
                    type: "interactive",
                    completed: false
                }
            ]
        },
        {
            id: 4,
            title: "Orbital Debris Management",
            description: "Learn about orbital debris identification, tracking, and removal strategies using advanced AI systems.",
            category: 4,
            difficulty: "intermediate",
            duration: 75,
            modules: 7,
            rating: 4.6,
            students: 2103,
            instructor: "Dr. James Wilson",
            instructorAvatar: "fas fa-user-astronaut",
            thumbnail: "debris-management.jpg",
            isPremium: false,
            progress: 40,
            completed: false,
            tags: ["debris", "management", "ai", "tracking"],
            modules: [
                {
                    id: 1,
                    title: "Debris Identification",
                    duration: 12,
                    type: "video",
                    completed: true
                },
                {
                    id: 2,
                    title: "Tracking Systems",
                    duration: 15,
                    type: "interactive",
                    completed: true
                },
                {
                    id: 3,
                    title: "AI-Powered Detection",
                    duration: 18,
                    type: "simulation",
                    completed: false
                },
                {
                    id: 4,
                    title: "Removal Strategies",
                    duration: 20,
                    type: "video",
                    completed: false
                },
                {
                    id: 5,
                    title: "Simulation Lab",
                    duration: 25,
                    type: "lab",
                    completed: false
                },
                {
                    id: 6,
                    title: "Case Studies",
                    duration: 10,
                    type: "case-study",
                    completed: false
                },
                {
                    id: 7,
                    title: "Future Technologies",
                    duration: 8,
                    type: "video",
                    completed: false
                }
            ]
        },
        {
            id: 5,
            title: "ISO/IEC 27001 Space Adaptation",
            description: "Understand how to adapt ISO/IEC 27001 information security management to space environments.",
            category: 3,
            difficulty: "advanced",
            duration: 85,
            modules: 6,
            rating: 4.9,
            students: 743,
            instructor: "Dr. Elena Petrov",
            instructorAvatar: "fas fa-user-graduate",
            thumbnail: "iso-27001.jpg",
            isPremium: true,
            progress: 0,
            completed: false,
            tags: ["iso", "27001", "management", "security"],
            modules: [
                {
                    id: 1,
                    title: "ISO 27001 Fundamentals",
                    duration: 20,
                    type: "video",
                    completed: false
                },
                {
                    id: 2,
                    title: "Space Environment Challenges",
                    duration: 18,
                    type: "interactive",
                    completed: false
                },
                {
                    id: 3,
                    title: "Risk Management Framework",
                    duration: 22,
                    type: "simulation",
                    completed: false
                },
                {
                    id: 4,
                    title: "Implementation Planning",
                    duration: 15,
                    type: "interactive",
                    completed: false
                },
                {
                    id: 5,
                    title: "Audit and Assessment",
                    duration: 12,
                    type: "video",
                    completed: false
                },
                {
                    id: 6,
                    title: "Certification Process",
                    duration: 10,
                    type: "interactive",
                    completed: false
                }
            ]
        },
        {
            id: 6,
            title: "AI-Driven Orbital Recycling",
            description: "Explore how artificial intelligence is revolutionizing orbital debris recycling and resource recovery.",
            category: 4,
            difficulty: "intermediate",
            duration: 70,
            modules: 6,
            rating: 4.8,
            students: 1876,
            instructor: "Dr. Alex Chen",
            instructorAvatar: "fas fa-user-robot",
            thumbnail: "ai-recycling.jpg",
            isPremium: false,
            progress: 20,
            completed: false,
            tags: ["ai", "recycling", "automation", "optimization"],
            modules: [
                {
                    id: 1,
                    title: "AI in Space Operations",
                    duration: 15,
                    type: "video",
                    completed: true
                },
                {
                    id: 2,
                    title: "Recycling Algorithms",
                    duration: 18,
                    type: "interactive",
                    completed: false
                },
                {
                    id: 3,
                    title: "Predictive Analytics",
                    duration: 20,
                    type: "simulation",
                    completed: false
                },
                {
                    id: 4,
                    title: "Resource Optimization",
                    duration: 12,
                    type: "video",
                    completed: false
                },
                {
                    id: 5,
                    title: "Real-world Applications",
                    duration: 10,
                    type: "case-study",
                    completed: false
                },
                {
                    id: 6,
                    title: "Future Developments",
                    duration: 8,
                    type: "video",
                    completed: false
                }
            ]
        }
    ]
};

// Simulation Data
const simulationsData = {
    categories: [
        { id: 1, name: "Orbital Recycling", icon: "fas fa-recycle", color: "#4caf50" },
        { id: 2, name: "Threat Simulation", icon: "fas fa-shield-halved", color: "#ff5722" },
        { id: 3, name: "Network Defense", icon: "fas fa-network-wired", color: "#2196f3" },
        { id: 4, name: "AI Predictions", icon: "fas fa-brain", color: "#9c27b0" }
    ],
    
    simulations: [
        {
            id: 1,
            title: "Basic Orbital Debris Cleanup",
            description: "Simulate the process of identifying and removing orbital debris using AI-powered systems.",
            category: 1,
            difficulty: "beginner",
            duration: 15,
            rating: 4.7,
            runs: 3421,
            isPremium: false,
            completed: true,
            bestScore: 85,
            parameters: {
                debrisCount: { min: 10, max: 100, default: 50 },
                orbitHeight: { min: 200, max: 1000, default: 400 },
                recyclerSpeed: { min: 1, max: 5, default: 2 },
                energyBudget: { min: 100, max: 1000, default: 500 }
            },
            scenarios: [
                {
                    id: 1,
                    name: "Low Earth Orbit Cleanup",
                    description: "Remove debris from LEO between 200-600km altitude",
                    difficulty: "beginner"
                },
                {
                    id: 2,
                    name: "Geostationary Ring Cleanup",
                    description: "Clean up debris in GEO at 35,786km altitude",
                    difficulty: "advanced"
                },
                {
                    id: 3,
                    name: "High Energy Debris",
                    description: "Handle high-velocity debris requiring more energy",
                    difficulty: "intermediate"
                }
            ]
        },
        {
            id: 2,
            title: "Satellite Jamming Attack Response",
            description: "Practice detecting and mitigating jamming attacks on satellite communications.",
            category: 2,
            difficulty: "intermediate",
            duration: 25,
            rating: 4.8,
            runs: 2156,
            isPremium: false,
            completed: true,
            bestScore: 92,
            parameters: {
                jammerPower: { min: 10, max: 100, default: 50 },
                signalStrength: { min: 20, max: 100, default: 70 },
                frequencyRange: { min: 1, max: 10, default: 5 },
                responseTime: { min: 1, max: 10, default: 3 }
            },
            scenarios: [
                {
                    id: 1,
                    name: "GPS Jamming",
                    description: "Detect and counter GPS signal jamming",
                    difficulty: "beginner"
                },
                {
                    id: 2,
                    name: "Communication Jamming",
                    description: "Protect satellite communication links",
                    difficulty: "intermediate"
                },
                {
                    id: 3,
                    name: "Multi-frequency Attack",
                    description: "Handle simultaneous jamming on multiple frequencies",
                    difficulty: "advanced"
                }
            ]
        },
        {
            id: 3,
            title: "AI-Powered Resource Optimization",
            description: "Use machine learning algorithms to optimize orbital recycling operations.",
            category: 4,
            difficulty: "advanced",
            duration: 35,
            rating: 4.9,
            runs: 1247,
            isPremium: true,
            completed: false,
            bestScore: 0,
            parameters: {
                aiModel: { options: ["neural-network", "genetic-algorithm", "reinforcement-learning"], default: "neural-network" },
                optimizationGoal: { options: ["efficiency", "speed", "energy", "cost"], default: "efficiency" },
                learningRate: { min: 0.01, max: 0.5, default: 0.1 },
                iterations: { min: 100, max: 1000, default: 500 }
            },
            scenarios: [
                {
                    id: 1,
                    name: "Efficiency Optimization",
                    description: "Maximize debris removal efficiency",
                    difficulty: "intermediate"
                },
                {
                    id: 2,
                    name: "Energy Minimization",
                    description: "Minimize energy consumption while maintaining performance",
                    difficulty: "advanced"
                },
                {
                    id: 3,
                    name: "Multi-objective Optimization",
                    description: "Balance multiple optimization goals simultaneously",
                    difficulty: "expert"
                }
            ]
        },
        {
            id: 4,
            title: "Network Security Simulation",
            description: "Defend against cyber attacks on space-based networks and ground stations.",
            category: 3,
            difficulty: "intermediate",
            duration: 30,
            rating: 4.6,
            runs: 2890,
            isPremium: false,
            completed: true,
            bestScore: 78,
            parameters: {
                networkSize: { min: 5, max: 50, default: 20 },
                attackIntensity: { min: 1, max: 10, default: 5 },
                defenseLevel: { min: 1, max: 10, default: 5 },
                responseTime: { min: 1, max: 10, default: 3 }
            },
            scenarios: [
                {
                    id: 1,
                    name: "Ground Station Defense",
                    description: "Protect ground control stations from cyber attacks",
                    difficulty: "beginner"
                },
                {
                    id: 2,
                    name: "Satellite Constellation Security",
                    description: "Secure inter-satellite communication networks",
                    difficulty: "intermediate"
                },
                {
                    id: 3,
                    name: "Critical Infrastructure Protection",
                    description: "Defend mission-critical space infrastructure",
                    difficulty: "advanced"
                }
            ]
        }
    ]
};

// Achievements Data
const achievementsData = [
    {
        id: 1,
        name: "First Steps",
        description: "Complete your first course",
        icon: "fas fa-baby",
        rarity: "common",
        xpReward: 50,
        unlocked: true,
        unlockedDate: "2024-01-16"
    },
    {
        id: 2,
        name: "Space Explorer",
        description: "Complete 5 courses",
        icon: "fas fa-rocket",
        rarity: "common",
        xpReward: 200,
        unlocked: false,
        progress: 3,
        maxProgress: 5
    },
    {
        id: 3,
        name: "Simulation Master",
        description: "Complete 10 simulations",
        icon: "fas fa-gamepad",
        rarity: "rare",
        xpReward: 500,
        unlocked: true,
        unlockedDate: "2024-01-18"
    },
    {
        id: 4,
        name: "AI Pioneer",
        description: "Use AI assistance 50 times",
        icon: "fas fa-robot",
        rarity: "rare",
        xpReward: 300,
        unlocked: false,
        progress: 23,
        maxProgress: 50
    },
    {
        id: 5,
        name: "Streak Master",
        description: "Maintain a 30-day learning streak",
        icon: "fas fa-fire",
        rarity: "epic",
        xpReward: 1000,
        unlocked: false,
        progress: 7,
        maxProgress: 30
    },
    {
        id: 6,
        name: "Certification Collector",
        description: "Earn 5 certifications",
        icon: "fas fa-certificate",
        rarity: "epic",
        xpReward: 800,
        unlocked: false,
        progress: 2,
        maxProgress: 5
    },
    {
        id: 7,
        name: "Perfect Score",
        description: "Achieve 100% on any simulation",
        icon: "fas fa-star",
        rarity: "rare",
        xpReward: 250,
        unlocked: true,
        unlockedDate: "2024-01-19"
    },
    {
        id: 8,
        name: "Night Owl",
        description: "Study between 10 PM and 6 AM",
        icon: "fas fa-moon",
        rarity: "uncommon",
        xpReward: 100,
        unlocked: false,
        progress: 3,
        maxProgress: 5
    },
    {
        id: 9,
        name: "Early Bird",
        description: "Study between 5 AM and 8 AM",
        icon: "fas fa-sun",
        rarity: "uncommon",
        xpReward: 100,
        unlocked: false,
        progress: 2,
        maxProgress: 5
    },
    {
        id: 10,
        name: "Speed Learner",
        description: "Complete a course in one day",
        icon: "fas fa-tachometer-alt",
        rarity: "rare",
        xpReward: 400,
        unlocked: false,
        progress: 0,
        maxProgress: 1
    },
    {
        id: 11,
        name: "Social Learner",
        description: "Share 10 achievements",
        icon: "fas fa-share-alt",
        rarity: "uncommon",
        xpReward: 150,
        unlocked: false,
        progress: 0,
        maxProgress: 10
    },
    {
        id: 12,
        name: "Quiz Master",
        description: "Score 100% on 10 quizzes",
        icon: "fas fa-question-circle",
        rarity: "rare",
        xpReward: 350,
        unlocked: true,
        unlockedDate: "2024-01-17"
    }
];

// Certifications Data
const certificationsData = [
    {
        id: 1,
        name: "Space Security Fundamentals",
        organization: "ORLP Academy",
        description: "Basic certification in space security concepts and threats",
        icon: "fas fa-shield-halved",
        color: "#4caf50",
        level: "beginner",
        duration: "3 months",
        requirements: {
            courses: [1, 3],
            simulations: [1, 2],
            exam: true,
            project: false
        },
        earned: true,
        earnedDate: "2024-01-18",
        expiryDate: "2025-01-18",
        credentialId: "ORLP-SSF-2024-001"
    },
    {
        id: 2,
        name: "Orbital Recycling Specialist",
        organization: "International Space Recycling Association",
        description: "Advanced certification in orbital debris management and recycling",
        icon: "fas fa-recycle",
        color: "#2196f3",
        level: "intermediate",
        duration: "6 months",
        requirements: {
            courses: [4, 6],
            simulations: [1, 3],
            exam: true,
            project: true
        },
        earned: true,
        earnedDate: "2024-01-20",
        expiryDate: "2026-01-20",
        credentialId: "ISRA-ORS-2024-001"
    },
    {
        id: 3,
        name: "Advanced Threat Analysis",
        organization: "Space Security Institute",
        description: "Expert-level certification in analyzing and mitigating space threats",
        icon: "fas fa-search",
        color: "#ff5722",
        level: "advanced",
        duration: "12 months",
        requirements: {
            courses: [2, 5],
            simulations: [2, 4],
            exam: true,
            project: true,
            experience: "2 years"
        },
        earned: false,
        progress: 25,
        requirements: {
            courses: [2, 5], // Need to complete these
            simulations: [2, 4], // Need to complete these
            exam: false,
            project: false,
            experience: "2 years"
        }
    },
    {
        id: 4,
        name: "AI-Powered Space Operations",
        organization: "Space AI Consortium",
        description: "Certification in artificial intelligence applications for space operations",
        icon: "fas fa-brain",
        color: "#9c27b0",
        level: "advanced",
        duration: "8 months",
        requirements: {
            courses: [6],
            simulations: [3],
            exam: true,
            project: true,
            aiUsage: "100 interactions"
        },
        earned: false,
        progress: 10
    }
];

// Activity Feed Data
const activityData = [
    {
        id: 1,
        type: "course_completed",
        title: "Completed 'Introduction to Space Security Threats'",
        description: "Finished all 6 modules with 95% average score",
        timestamp: "2024-01-20T14:30:00Z",
        icon: "fas fa-graduation-cap",
        xpGained: 150,
        category: "learning"
    },
    {
        id: 2,
        type: "simulation_completed",
        title: "Completed 'Basic Orbital Debris Cleanup'",
        description: "Achieved 85% efficiency in debris removal simulation",
        timestamp: "2024-01-20T12:15:00Z",
        icon: "fas fa-gamepad",
        xpGained: 100,
        category: "simulation"
    },
    {
        id: 3,
        type: "achievement_unlocked",
        title: "Unlocked 'Perfect Score' Achievement",
        description: "Achieved 100% on a simulation for the first time",
        timestamp: "2024-01-19T16:45:00Z",
        icon: "fas fa-trophy",
        xpGained: 250,
        category: "achievement"
    },
    {
        id: 4,
        type: "certification_earned",
        title: "Earned 'Orbital Recycling Specialist' Certification",
        description: "Completed all requirements for intermediate certification",
        timestamp: "2024-01-18T11:20:00Z",
        icon: "fas fa-certificate",
        xpGained: 500,
        category: "certification"
    },
    {
        id: 5,
        type: "ai_interaction",
        title: "Used AI Assistant for Course Guidance",
        description: "Asked Gemini AI about orbital mechanics calculations",
        timestamp: "2024-01-17T09:30:00Z",
        icon: "fas fa-robot",
        xpGained: 25,
        category: "ai"
    }
];

// Upcoming Events Data
const upcomingData = [
    {
        id: 1,
        title: "Advanced Threat Analysis Course",
        type: "course",
        date: "2024-01-25",
        time: "10:00 AM UTC",
        description: "Next module: Risk Assessment Framework",
        priority: "high",
        category: "learning"
    },
    {
        id: 2,
        title: "Live Webinar: Future of Space Security",
        type: "webinar",
        date: "2024-01-22",
        time: "2:00 PM UTC",
        description: "Join industry experts discussing emerging threats",
        priority: "medium",
        category: "event"
    },
    {
        id: 3,
        title: "Simulation Challenge: AI Optimization",
        type: "challenge",
        date: "2024-01-28",
        time: "All Day",
        description: "Compete with other students in AI-driven optimization",
        priority: "high",
        category: "competition"
    },
    {
        id: 4,
        title: "Certification Exam: Space Security",
        type: "exam",
        date: "2024-02-01",
        time: "3:00 PM UTC",
        description: "Final exam for Advanced Threat Analysis certification",
        priority: "high",
        category: "assessment"
    }
];

// Learning Journey Data
const journeyData = [
    {
        id: 1,
        date: "2024-01-15",
        type: "started",
        title: "Joined ORLP Platform",
        description: "Began your space education journey",
        icon: "fas fa-rocket",
        milestone: true
    },
    {
        id: 2,
        date: "2024-01-16",
        type: "achievement",
        title: "First Achievement Unlocked",
        description: "Earned 'First Steps' achievement",
        icon: "fas fa-trophy",
        milestone: false
    },
    {
        id: 3,
        date: "2024-01-17",
        type: "course",
        title: "Completed First Course Module",
        description: "Finished 'Understanding Space Environment'",
        icon: "fas fa-book",
        milestone: false
    },
    {
        id: 4,
        date: "2024-01-18",
        type: "certification",
        title: "Earned First Certification",
        description: "Space Security Fundamentals certification",
        icon: "fas fa-certificate",
        milestone: true
    },
    {
        id: 5,
        date: "2024-01-19",
        type: "simulation",
        title: "Perfect Simulation Score",
        description: "Achieved 100% on orbital debris cleanup",
        icon: "fas fa-star",
        milestone: false
    },
    {
        id: 6,
        date: "2024-01-20",
        type: "course",
        title: "Completed Second Course",
        description: "Finished 'Introduction to Space Security Threats'",
        icon: "fas fa-graduation-cap",
        milestone: true
    }
];

// Skill Assessment Data
const skillData = {
    categories: [
        { name: "Space Security", color: "#ff5722" },
        { name: "Orbital Mechanics", color: "#2196f3" },
        { name: "AI & Analytics", color: "#9c27b0" },
        { name: "Risk Assessment", color: "#4caf50" },
        { name: "Regulations", color: "#ff9800" },
        { name: "Simulation", color: "#e91e63" }
    ],
    currentSkills: {
        "Space Security": 75,
        "Orbital Mechanics": 60,
        "AI & Analytics": 45,
        "Risk Assessment": 80,
        "Regulations": 55,
        "Simulation": 70
    },
    targetSkills: {
        "Space Security": 90,
        "Orbital Mechanics": 85,
        "AI & Analytics": 80,
        "Risk Assessment": 95,
        "Regulations": 75,
        "Simulation": 90
    }
};

// Plan Limitations Data
const planLimitations = {
    free: {
        maxCourses: 5,
        maxSimulations: 2,
        maxAiInteractions: 10,
        maxCertifications: 1,
        analytics: false,
        prioritySupport: false,
        advancedFeatures: false,
        customPaths: false
    },
    premium: {
        maxCourses: -1, // unlimited
        maxSimulations: -1, // unlimited
        maxAiInteractions: -1, // unlimited
        maxCertifications: -1, // unlimited
        analytics: true,
        prioritySupport: true,
        advancedFeatures: true,
        customPaths: true
    }
};

// Export data for use in other modules
window.ORLPData = {
    userData,
    coursesData,
    simulationsData,
    achievementsData,
    certificationsData,
    activityData,
    upcomingData,
    journeyData,
    skillData,
    planLimitations
};
