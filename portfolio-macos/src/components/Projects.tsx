"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { 
  ExternalLink, 
  Github, 
  Play, 
  Code, 
  Palette, 
  Database, 
  Zap,
  Users,
  Award,
  Calendar,
  Eye,
  Heart,
  Star,
  X
} from "lucide-react"
import { MACOS_DESIGN_SYSTEM } from "@/constants"

interface ProjectsProps {
  className?: string
}

const projects = [
  {
    id: 1,
    title: "macOS Portfolio",
    subtitle: "Interactive Portfolio Experience",
    description: "A pixel-perfect recreation of macOS interface built with React and Next.js. Features authentic animations, window management, and interactive components that showcase modern web development skills.",
    image: "/project-macos.jpg",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Frontend",
    status: "Live",
    metrics: {
      views: "2.5K",
      likes: 89,
      stars: 156
    },
    links: {
      live: "https://macos-portfolio.vercel.app",
      github: "https://github.com/username/macos-portfolio",
      demo: "https://demo.macos-portfolio.com"
    },
    highlights: [
      "Authentic macOS design system implementation",
      "Advanced animations with Framer Motion",
      "Responsive and accessible components",
      "Performance optimized with React best practices"
    ],
    color: MACOS_DESIGN_SYSTEM.colors.systemBlue
  },
  {
    id: 2,
    title: "E-commerce Platform",
    subtitle: "Full-Stack Shopping Experience",
    description: "Modern e-commerce platform with real-time inventory management, secure payment processing, and advanced analytics. Built with microservices architecture for scalability.",
    image: "/project-ecommerce.jpg",
    technologies: ["Node.js", "React", "PostgreSQL", "Redis", "Stripe", "Docker"],
    category: "Full-Stack",
    status: "In Development",
    metrics: {
      views: "1.8K",
      likes: 67,
      stars: 89
    },
    links: {
      live: "https://ecommerce-demo.com",
      github: "https://github.com/username/ecommerce-platform"
    },
    highlights: [
      "Microservices architecture with Docker",
      "Real-time inventory management",
      "Secure payment processing with Stripe",
      "Advanced analytics and reporting"
    ],
    color: MACOS_DESIGN_SYSTEM.colors.systemGreen
  },
  {
    id: 3,
    title: "Design System",
    subtitle: "Component Library & Guidelines",
    description: "Comprehensive design system with reusable components, design tokens, and documentation. Used across multiple projects to ensure consistency and accelerate development.",
    image: "/project-design-system.jpg",
    technologies: ["React", "Storybook", "Figma", "TypeScript", "CSS-in-JS"],
    category: "Design",
    status: "Live",
    metrics: {
      views: "3.2K",
      likes: 124,
      stars: 203
    },
    links: {
      live: "https://design-system.example.com",
      github: "https://github.com/username/design-system",
      figma: "https://figma.com/design-system"
    },
    highlights: [
      "50+ reusable React components",
      "Comprehensive Storybook documentation",
      "Design tokens for consistent theming",
      "Accessibility-first approach"
    ],
    color: MACOS_DESIGN_SYSTEM.colors.systemPurple
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    subtitle: "Real-time Data Visualization",
    description: "Interactive dashboard for real-time data visualization and analytics. Features customizable charts, filters, and export capabilities for business intelligence.",
    image: "/project-analytics.jpg",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "WebSocket"],
    category: "Data Visualization",
    status: "Live",
    metrics: {
      views: "1.5K",
      likes: 78,
      stars: 112
    },
    links: {
      live: "https://analytics-dashboard.com",
      github: "https://github.com/username/analytics-dashboard"
    },
    highlights: [
      "Real-time data updates with WebSocket",
      "Interactive charts with D3.js",
      "Customizable dashboard layouts",
      "Export capabilities for reports"
    ],
    color: MACOS_DESIGN_SYSTEM.colors.systemOrange
  }
]

const categories = ["All", "Frontend", "Full-Stack", "Design", "Data Visualization"]

export function Projects({ className }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return Code
      case "Full-Stack": return Database
      case "Design": return Palette
      case "Data Visualization": return Zap
      default: return Code
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return MACOS_DESIGN_SYSTEM.colors.systemGreen
      case "In Development": return MACOS_DESIGN_SYSTEM.colors.systemOrange
      case "Planning": return MACOS_DESIGN_SYSTEM.colors.systemBlue
      default: return MACOS_DESIGN_SYSTEM.colors.systemGray
    }
  }

  return (
    <div className={`p-8 overflow-y-auto bg-white ${className}`} style={{
      fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-gray-900 mb-4" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.largeTitle,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.bold,
          lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.tight
        }}>
          Featured Projects
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.body,
          lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
        }}>
          A showcase of my recent work in web development, design systems, and user experience. 
          Each project represents a unique challenge and creative solution.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-12"
      >
        <div className="flex items-center bg-gray-100 rounded-xl p-1">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {filteredProjects.map((project, index) => {
          const CategoryIcon = getCategoryIcon(project.category)
          
          return (
            <motion.div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br overflow-hidden"
                   style={{ 
                     background: `linear-gradient(135deg, ${project.color}20 0%, ${project.color}10 100%)` 
                   }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className="w-16 h-16 opacity-20" style={{ color: project.color }} />
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span 
                    className="px-3 py-1 rounded-full text-white text-xs font-medium"
                    style={{ backgroundColor: getStatusColor(project.status) }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Metrics */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-4 text-white/80">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span className="text-xs">{project.metrics.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3" />
                    <span className="text-xs">{project.metrics.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span className="text-xs">{project.metrics.stars}</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900" style={{
                    fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.headline
                  }}>
                    {project.title}
                  </h3>
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: project.color + '20',
                      color: project.color
                    }}
                  >
                    {project.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-4" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline,
                  lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
                }}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex items-center space-x-3">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live</span>
                    </a>
                  )}
                  
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                  )}
                  
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title2
                }}>
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6" style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.body,
                lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
              }}>
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: selectedProject.color + '20',
                      color: selectedProject.color
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <h3 className="font-semibold text-gray-900 mb-4" style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.headline
              }}>
                Key Highlights
              </h3>
              
              <ul className="space-y-3 mb-8">
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div 
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: selectedProject.color }}
                    />
                    <span className="text-gray-700" style={{
                      fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline,
                      lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
                    }}>
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live</span>
                  </a>
                )}
                
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}