"use client"

import { motion } from "motion/react"
import { Download, Mail, Phone, MapPin, Globe, GithubIcon, LinkedinIcon, ZoomIn, ZoomOut, RotateCw, Share } from "lucide-react"

interface ResumePreviewProps {
  onClose: () => void
}

export function ResumePreview({ onClose }: ResumePreviewProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    // For now, this is a placeholder for future implementation
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-60 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-gray-200/50"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* macOS-style Title Bar */}
        <div className="relative bg-gray-50/90 backdrop-blur-xl border-b border-gray-200/30">
          {/* Traffic Light Controls */}
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-2">
              <button
                onClick={onClose}
                className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors shadow-sm"
              />
              <button className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors shadow-sm" />
              <button className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors shadow-sm" />
            </div>

            {/* Window Title */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-macos-window-title text-gray-700 font-medium">Resume.pdf</span>
            </div>

            <div className="w-16" />
          </div>

          {/* Title Bar Highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/60" />
        </div>

        {/* Preview-style Toolbar */}
        <div className="bg-gray-50/80 backdrop-blur-sm border-b border-gray-200/30 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-white/60 rounded-lg shadow-sm">
              <button className="p-1.5 hover:bg-gray-200/50 rounded-l-lg transition-colors">
                <ZoomOut className="w-4 h-4 text-gray-600" />
              </button>
              <div className="px-3 py-1.5 text-macos-caption-1 text-gray-700 border-x border-gray-200/30">
                100%
              </div>
              <button className="p-1.5 hover:bg-gray-200/50 rounded-r-lg transition-colors">
                <ZoomIn className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Rotate */}
            <button className="p-1.5 bg-white/60 rounded-lg hover:bg-gray-200/50 transition-colors shadow-sm">
              <RotateCw className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Share */}
            <button className="p-1.5 bg-white/60 rounded-lg hover:bg-gray-200/50 transition-colors shadow-sm">
              <Share className="w-4 h-4 text-gray-600" />
            </button>

            {/* Print */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-macos-caption-1 text-gray-700 bg-white/60 hover:bg-gray-200/50 rounded-lg transition-colors shadow-sm"
            >
              Print
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-500 text-white text-macos-caption-1 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-1 shadow-sm"
            >
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Document Content Area */}
        <div className="flex-1 bg-gray-100/50 p-8 overflow-auto">
          {/* Paper-like Document Container */}
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg border border-gray-200/50 overflow-hidden">
            {/* Document Content */}
            <div className="p-12 space-y-8">
              {/* Header */}
              <header className="text-center border-b border-gray-200 pb-8">
                <h1 className="text-4xl font-light text-gray-900 mb-3 tracking-tight">Alex Johnson</h1>
                <h2 className="text-xl text-gray-600 mb-4 font-light">Senior Full-Stack Developer</h2>

                <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-4 h-4" />
                    <span>alex.johnson@email.com</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Globe className="w-4 h-4" />
                    <span>alexjohnson.dev</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <GithubIcon className="w-4 h-4" />
                    <span>github.com/alexjohnson</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <LinkedinIcon className="w-4 h-4" />
                    <span>linkedin.com/in/alexjohnson</span>
                  </div>
                </div>
              </header>

              {/* Professional Summary */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Professional Summary
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Experienced Full-Stack Developer with 8+ years of expertise in building scalable web applications
                  using modern technologies. Proven track record of leading development teams, architecting robust
                  solutions, and delivering high-quality software products. Passionate about creating intuitive user
                  experiences and writing clean, maintainable code.
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Technical Skills
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Backend</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'GraphQL'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Cloud & DevOps</h4>
                    <div className="flex flex-wrap gap-2">
                      {['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'Vercel'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Tools & Others</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Git', 'Figma', 'Jest', 'Cypress', 'Webpack', 'Vite'].map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-full border border-gray-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Experience */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Professional Experience
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Senior Full-Stack Developer</h4>
                        <p className="text-blue-600 font-medium">TechCorp Solutions</p>
                      </div>
                      <span className="text-gray-500 font-medium">2021 - Present</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Led development of a microservices architecture serving 1M+ daily active users</li>
                      <li>Implemented CI/CD pipelines reducing deployment time by 75%</li>
                      <li>Mentored 5 junior developers and conducted code reviews</li>
                      <li>Built responsive web applications using React, Next.js, and TypeScript</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Full-Stack Developer</h4>
                        <p className="text-blue-600 font-medium">StartupXYZ</p>
                      </div>
                      <span className="text-gray-500 font-medium">2019 - 2021</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Developed and maintained e-commerce platform handling $2M+ in transactions</li>
                      <li>Optimized database queries improving application performance by 40%</li>
                      <li>Integrated third-party APIs including payment gateways and shipping providers</li>
                      <li>Collaborated with design team to implement pixel-perfect UI components</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">Frontend Developer</h4>
                        <p className="text-blue-600 font-medium">Digital Agency Pro</p>
                      </div>
                      <span className="text-gray-500 font-medium">2017 - 2019</span>
                    </div>
                    <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                      <li>Built responsive websites for 20+ clients using modern web technologies</li>
                      <li>Implemented SEO best practices resulting in 60% increase in organic traffic</li>
                      <li>Created reusable component library reducing development time by 30%</li>
                      <li>Worked closely with clients to understand requirements and deliver solutions</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Education */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Education
                </h3>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h4>
                    <p className="text-blue-600 font-medium">University of California, Berkeley</p>
                    <p className="text-gray-600 mt-1">Relevant Coursework: Data Structures, Algorithms, Software Engineering, Database Systems</p>
                  </div>
                  <span className="text-gray-500 font-medium">2013 - 2017</span>
                </div>
              </section>

              {/* Projects */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Notable Projects
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">macOS Portfolio</h4>
                    <p className="text-gray-700 mb-2">
                      Interactive portfolio website replicating macOS interface with authentic animations and functionality.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">E-commerce Platform</h4>
                    <p className="text-gray-700 mb-2">
                      Full-stack e-commerce solution with real-time inventory management and payment processing.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'PostgreSQL', 'Redis', 'Stripe API', 'Docker'].map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded border border-gray-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                  Certifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800">AWS Certified Solutions Architect</h4>
                    <p className="text-gray-600">Amazon Web Services • 2023</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Google Cloud Professional Developer</h4>
                    <p className="text-gray-600">Google Cloud • 2022</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}