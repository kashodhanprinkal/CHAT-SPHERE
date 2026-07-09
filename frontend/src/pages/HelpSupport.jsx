import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  User,
  Send,
  Globe,
  MapPin,
  Briefcase,
  Coffee,
  Sparkles,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

// ✅ Use these for social icons (they work in all versions)
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const HelpSupport = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Help & Support</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN - About Me & Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* About Me Card */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-3xl font-bold mb-4">
                  <User className="w-12 h-12" />
                </div>
                
                <h2 className="text-xl font-bold text-[var(--text-primary)]">John Developer</h2>
                <p className="text-sm text-[var(--text-muted)]">Full Stack Developer</p>
                
                <div className="flex gap-3 mt-3">
                  <span className="px-3 py-1 bg-[var(--bg-hover)] rounded-full text-xs text-[var(--text-secondary)]">
                    React
                  </span>
                  <span className="px-3 py-1 bg-[var(--bg-hover)] rounded-full text-xs text-[var(--text-secondary)]">
                    Node.js
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm text-[var(--text-secondary)]">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                  <span>Freelance Developer</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[var(--accent)]" />
                  <span>Remote</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-[var(--accent)]" />
                  <span>Building awesome apps</span>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-4 h-4 text-[var(--accent)]" />
                  <span>Fueled by coffee ☕</span>
                </div>
              </div>
            </div>

            {/* About Me - Extended */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
                About Me
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                I'm a passionate developer with over 5 years of experience building web applications. 
                I love creating beautiful, functional, and user-friendly experiences.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-[var(--bg-hover)] rounded text-xs text-[var(--text-muted)]">
                  💻 Web Development
                </span>
                <span className="px-2 py-1 bg-[var(--bg-hover)] rounded text-xs text-[var(--text-muted)]">
                  🚀 Performance
                </span>
                <span className="px-2 py-1 bg-[var(--bg-hover)] rounded text-xs text-[var(--text-muted)]">
                  🎨 UI/UX Design
                </span>
                <span className="px-2 py-1 bg-[var(--bg-hover)] rounded text-xs text-[var(--text-muted)]">
                  📱 Mobile Apps
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-3">Contact Info</h3>
              <div className="space-y-3 text-sm">
                <a 
                  href="mailto:john@example.com"
                  className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  john@example.com
                </a>
                <div className="flex items-center gap-3 text-[var(--text-secondary)]">
                  <Phone className="w-4 h-4 text-[var(--accent)]" />
                  +1 (555) 123-4567
                </div>
              </div>

              {/* Social Links with custom SVG icons */}
              <div className="mt-4 flex gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <GithubIcon />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <TwitterIcon />
                </a>
                <a
                  href="https://portfolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN - FAQ & Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* FAQ Section */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                Frequently Asked Questions
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">How do I reset my password?</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Go to the login page and click "Forgot Password". You'll receive a reset link via email.
                  </p>
                </div>
                
                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">How can I update my profile?</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Navigate to Settings &gt; Profile where you can update your name, bio, and profile picture.
                  </p>
                </div>
                
                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">Is my data secure?</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Yes! We use industry-standard encryption and security measures to protect your data.
                  </p>
                </div>
                
                <div className="p-4 bg-[var(--bg-hover)] rounded-xl">
                  <h4 className="text-sm font-medium text-[var(--text-primary)]">How do I delete my account?</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Go to Settings &gt; Profile and click "Delete Account" in the Danger Zone section.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[var(--accent)]" />
                Send Me a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                      Your Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none transition resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;