"use client"

import { motion } from "motion/react"
import { 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Github, 
  Linkedin, 
  Twitter,
  Download,
  ExternalLink,
  Code,
  Palette,
  Zap,
  Users,
  Award,
  BookOpen
} from "lucide-react"
import { MACOS_DESIGN_SYSTEM } from "@/constants"

interface AboutProps {
  className?: string
}

const skills = [
  { name: "Frontend Development", icon: Code, level: 95, color: MACOS_DESIGN_SYSTEM.colors.systemBlue },
  { name: "UI/UX Design", icon: Palette, level: 88, color: MACOS_DESIGN_SYSTEM.colors.systemPurple },
  { name: "Performance Optimization", icon: Zap, level: 92, color: MACOS_DESIGN_SYSTEM.colors.systemOrange },
  { name: "Team Leadership", icon: Users, level: 85, color: MACOS_DESIGN_SYSTEM.colors.systemGreen },
]

const achievements = [
  {
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    date: "2023",
    icon: Award,
    color: MACOS_DESIGN_SYSTEM.colors.systemOrange
  },
  {
    title: "Google Cloud Professional Developer",
    organization: "Google Cloud",
    date: "2022",
    icon: Award,
    color: MACOS_DESIGN_SYSTEM.colors.systemBlue
  },
  {
    title: "React Advanced Certification",
    organization: "Meta",
    date: "2022",
    icon: BookOpen,
    color: MACOS_DESIGN_SYSTEM.colors.systemTeal
  }
]

const timeline = [
  {
    year: "2021 - Present",
    title: "Senior Full-Stack Developer",
    company: "TechCorp Solutions",
    description: "Leading development of microservices architecture serving 1M+ users. Mentoring junior developers and implementing CI/CD pipelines.",
    color: MACOS_DESIGN_SYSTEM.colors.systemBlue
  },
  {
    year: "2019 - 2021",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    description: "Built e-commerce platform handling $2M+ in transactions. Optimized performance and integrated third-party APIs.",
    color: MACOS_DESIGN_SYSTEM.colors.systemGreen
  },
  {
    year: "2017 - 2019",
    title: "Frontend Developer",
    company: "Digital Agency Pro",
    description: "Created responsive websites for 20+ clients. Implemented SEO best practices and built reusable component libraries.",
    color: MACOS_DESIGN_SYSTEM.colors.systemPurple
  }
]

export function About({ className }: AboutProps) {
  return (
    <div className={`p-8 overflow-y-auto bg-white ${className}`} style={{
      fontFamily: MACOS_DESIGN_SYSTEM.typography.fontFamily.system
    }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="relative inline-block mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-light shadow-lg">
            AJ
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
        
        <h1 className="text-gray-900 mb-2" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.largeTitle,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.light,
          lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.tight
        }}>
          Alex Johnson
        </h1>
        
        <h2 className="text-gray-600 mb-6" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title3,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.regular
        }}>
          Senior Full-Stack Developer & UI/UX Designer
        </h2>

        <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed mb-8" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.body,
          lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
        }}>
          Passionate developer with 8+ years of experience creating beautiful, functional, and scalable web applications. 
          I specialize in React, Next.js, and modern web technologies, with a keen eye for design and user experience.
        </p>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[
            { icon: MapPin, text: "San Francisco, CA", href: null },
            { icon: Mail, text: "alex@example.com", href: "mailto:alex@example.com" },
            { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
            { icon: Globe, text: "alexjohnson.dev", href: "https://alexjohnson.dev" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <item.icon className="w-4 h-4" />
              {item.href ? (
                <a href={item.href} className="text-sm font-medium">
                  {item.text}
                </a>
              ) : (
                <span className="text-sm font-medium">{item.text}</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {[
            { icon: Github, href: "https://github.com/alexjohnson", label: "GitHub" },
            { icon: Linkedin, href: "https://linkedin.com/in/alexjohnson", label: "LinkedIn" },
            { icon: Twitter, href: "https://twitter.com/alexjohnson", label: "Twitter" }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Download Resume Button */}
        <motion.button
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-lg"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="w-4 h-4" />
          <span>Download Resume</span>
        </motion.button>
      </motion.div>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="text-gray-900 mb-8 text-center" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title2,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.semibold
        }}>
          Core Skills
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-gray-50 p-6 rounded-xl border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                  style={{ backgroundColor: skill.color + '20' }}
                >
                  <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                </div>
                <h4 className="font-semibold text-gray-900" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.callout
                }}>
                  {skill.name}
                </h4>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
                <span className="absolute right-0 -top-6 text-sm font-medium text-gray-600">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Timeline */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h3 className="text-gray-900 mb-8 text-center" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title2,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.semibold
        }}>
          Professional Experience
        </h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-start mb-8 last:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {/* Timeline dot */}
              <div 
                className="w-4 h-4 rounded-full border-4 border-white shadow-lg z-10"
                style={{ backgroundColor: item.color }}
              />
              
              {/* Content */}
              <div className="ml-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-500">{item.year}</span>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </div>
                
                <h4 className="font-semibold text-gray-900 mb-1" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.headline
                }}>
                  {item.title}
                </h4>
                
                <p className="text-blue-600 font-medium mb-3" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline
                }}>
                  {item.company}
                </p>
                
                <p className="text-gray-700 leading-relaxed" style={{
                  fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline,
                  lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
                }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-12"
      >
        <h3 className="text-gray-900 mb-8 text-center" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title2,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.semibold
        }}>
          Certifications & Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: achievement.color + '20' }}
              >
                <achievement.icon className="w-8 h-8" style={{ color: achievement.color }} />
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-2" style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.callout
              }}>
                {achievement.title}
              </h4>
              
              <p className="text-gray-600 mb-2" style={{
                fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.subheadline
              }}>
                {achievement.organization}
              </p>
              
              <span className="text-sm font-medium text-gray-500">
                {achievement.date}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200"
      >
        <h3 className="text-gray-900 mb-4" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.title3,
          fontWeight: MACOS_DESIGN_SYSTEM.typography.fontWeight.semibold
        }}>
          Let's Work Together
        </h3>
        
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto" style={{
          fontSize: MACOS_DESIGN_SYSTEM.typography.fontSize.body,
          lineHeight: MACOS_DESIGN_SYSTEM.typography.lineHeight.relaxed
        }}>
          I'm always interested in new opportunities and exciting projects. 
          Whether you need a full-stack developer, UI/UX designer, or technical consultant, 
          I'd love to hear from you.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </motion.button>
          
          <motion.button
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4" />
            <span>View Projects</span>
          </motion.button>
        </div>
      </motion.section>
    </div>
  )
}