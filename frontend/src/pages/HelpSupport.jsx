import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, HelpCircle, Mail, MessageCircle, Phone, User, Send,
  Globe, MapPin, Briefcase, Coffee, Sparkles, Users, Search, X,
  ChevronDown, ChevronUp, ThumbsUp, ThumbsDown,
  Code, Heart, Award, Clock, Star, Rocket, Target, Quote, Terminal, Layers
} from "lucide-react";
import toast from "react-hot-toast";

// ✅ Custom SVG Icons (since lucide-react might not have them)
const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// 📝 YOUR DETAILS - Update this section

const USER = {
  name: "Prinkal Kashodhan",
  title: "Full Stack MERN Developer",
  nickname: "PK",
  bio: "Full Stack MERN Developer & M.Tech student passionate about building real-time web apps with clean UI and scalable backend.",
  email: "kashodhanprinkal@gmail.com",
  phone: "1234567890",
  avatar: "👩‍💻",
  motto: "Keep learning. Keep building. Keep growing.",
  quote: "Great things are built one commit at a time.",
  
  social: {
    github: "https://github.com/kashodhanprinkal",
    linkedin: "https://linkedin.com/in/prinkal-kashodhan",
  },
  
  work: {
    role: "Software Engineer | Full Stack MERN Developer | React.js Developer | Frontend QA Tester",
    location: "Vadodara, Gujarat, India 🇮🇳",
    availability: "Open to Full-Time Opportunities",
  },
  
  skills: ["React.js", "Node.js", "MongoDB", "Socket.IO", "Tailwind CSS", "Git"],
  values: ["Continuous Learning", "Clean Code", "Solve Real Problems", "Consistency"],
  funFacts: [
    "🚀 Love turning ideas into full-stack apps",
    "☕ Best debugging happens late at night",
    "🌱 Learning new tech every week",
    "💻 Love real-time communication projects",
  ],
  
  techStack: {
    frontend: [
      "HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript",
      "React.js", "Next.js", "Vite", "Tailwind CSS",
      "Bootstrap", "Redux Toolkit", "Zustand", "Axios", "Framer Motion"
    ],
    backend: [
      "Node.js", "Express.js", "REST APIs", "Socket.IO",
      "WebRTC", "JWT Authentication", "HTTP Cookies",
      "Multer", "Cloudinary", "Resend", "Arcjet"
    ],
    database: ["MongoDB", "Mongoose", "SQL", "MySQL"],
    devOps: ["Git", "GitHub", "GitHub Actions", "Docker", "Postman", "VS Code"],
  },
  
  projects: [
    { name: "💬 ChatSphere", desc: "Real-time chat with auth, live messaging, online presence & image sharing." }
  ],
};

// 🎯 FAQ DATABASE


const faqs = [
  {
    id: 1,
    q: "How do I reset my password?",
    keywords: ["password", "reset", "forgot", "login"],
    a: "Go to login → Click 'Forgot Password' → Enter email → Check inbox for reset link → Create new password.",
    category: "Account",
  },
  {
    id: 2,
    q: "How can I update my profile?",
    keywords: ["profile", "update", "edit", "change"],
    a: "Click Settings (three dots) → Select 'Profile' → Update name, bio, or picture → Click 'Save Profile'.",
    category: "Profile",
  },
  {
    id: 3,
    q: "Is my data secure?",
    keywords: ["security", "secure", "data", "privacy"],
    a: "Yes! We use end-to-end encryption, HTTPS, regular security audits, and never share your data with third parties.",
    category: "Security",
  },
  {
    id: 4,
    q: "How do I delete my account?",
    keywords: ["delete", "remove", "account", "cancel"],
    a: "⚠️ Go to Profile Settings → Scroll to 'Danger Zone' → Click 'Delete Account' → Confirm. This is permanent!",
    category: "Account",
  },
  {
    id: 5,
    q: "How do I contact support?",
    keywords: ["contact", "support", "help", "reach"],
    a: `📧 Email: ${USER.email}\n📱 Phone: ${USER.phone}\n\nI'll respond within 24 hours!`,
    category: "Support",
  },
];

// 🚀 MAIN COMPONENT

const HelpSupport = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const [feedback, setFeedback] = useState({});

  const categories = ["All", ...new Set(faqs.map(f => f.category))];

  const filteredFaqs = faqs.filter(f => {
    const matchSearch = search === "" || 
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.keywords.some(k => k.includes(search.toLowerCase()));
    const matchCategory = category === "All" || f.category === category;
    return matchSearch && matchCategory;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1500);
  };

  const handleFeedback = (id, helpful) => {
    setFeedback({ ...feedback, [id]: helpful });
    toast.success(helpful ? "Thanks! 😊" : "We'll improve it!");
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-[var(--bg-hover)]">
            <ArrowLeft className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Help & Support</h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="🔍 Search for help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT - About Me */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--bg-card)] border-2 border-[var(--accent)] rounded-2xl p-6 shadow-lg">
              <div className="text-center">
                <div className="text-5xl mb-2">{USER.avatar}</div>
                <h2 className="text-xl font-bold text-[var(--text-primary)]">{USER.name}</h2>
                <p className="text-sm text-[var(--accent)] font-medium">{USER.title}</p>
                <p className="text-xs text-[var(--text-muted)]">aka "{USER.nickname}"</p>
              </div>

              <div className="mt-4 p-3 bg-[var(--bg-hover)] rounded-xl">
                <p className="text-sm text-[var(--text-secondary)]">{USER.bio}</p>
              </div>

              <div className="mt-3 p-2 bg-[var(--accent)]/10 rounded-xl text-center">
                <p className="text-xs italic text-[var(--text-secondary)]">💭 "{USER.quote}"</p>
              </div>

              <div className="mt-3 p-2 bg-gradient-to-r from-[var(--accent)]/5 to-transparent rounded-xl text-center border border-[var(--border-color)]">
                <p className="text-xs font-medium text-[var(--accent)]">🌟 {USER.motto}</p>
              </div>

              {/* Fun Facts */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">⭐ Fun Facts</h4>
                <div className="grid grid-cols-2 gap-1">
                  {USER.funFacts.map((fact, i) => (
                    <div key={i} className="text-xs text-[var(--text-secondary)] bg-[var(--bg-hover)] p-1.5 rounded-lg">{fact}</div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">🚀 Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {USER.skills.map((skill, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-full">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Values */}
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">💎 Values</h4>
                <div className="flex flex-wrap gap-1">
                  {USER.values.map((val, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-[var(--bg-hover)] rounded-full text-[var(--text-secondary)]">{val}</span>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Mail className="w-4 h-4 text-[var(--accent)]" />
                    <span className="text-xs">{USER.email}</span>
                  </div>
                  <div className="flex gap-2">
                    <a href={USER.social.github} target="_blank" rel="noopener" className="p-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition">
                      <GithubIcon />
                    </a>
                    <a href={USER.social.linkedin} target="_blank" rel="noopener" className="p-1.5 rounded-lg bg-[var(--bg-hover)] hover:bg-[var(--accent)] hover:text-white transition">
                      <LinkedinIcon />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--text-muted)] bg-[var(--bg-hover)] p-2 rounded-lg">
                <Clock className="w-3 h-3 text-green-500" />
                <span>{USER.work.availability}</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">🛠️ Tech Stack</h4>
              {Object.entries(USER.techStack).map(([key, techs]) => (
                <div key={key} className="mb-2">
                  <p className="text-xs text-[var(--text-muted)] capitalize">{key}</p>
                  <div className="flex flex-wrap gap-1">
                    {techs.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-[var(--bg-hover)] rounded-full text-[var(--text-secondary)]">{tech}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">🚀 Project</h4>
              {USER.projects.map((p, i) => (
                <div key={i} className="p-3 bg-[var(--bg-hover)] rounded-xl">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{p.name}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - FAQ & Contact */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                    category === c ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-hover)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* FAQ List */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[var(--accent)]" />
                FAQs <span className="ml-auto text-xs text-[var(--text-muted)]">{filteredFaqs.length} results</span>
              </h3>
              
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-muted)]">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No results for "{search}"</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFaqs.map(faq => (
                    <div key={faq.id} className="border border-[var(--border-color)] rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-[var(--bg-hover)] transition"
                      >
                        <span className="text-sm font-medium text-[var(--text-primary)]">{faq.q}</span>
                        {expanded === faq.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expanded === faq.id && (
                        <div className="px-4 pb-4">
                          <div className="text-sm text-[var(--text-secondary)] whitespace-pre-line">{faq.a}</div>
                          <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-color)] mt-2">
                            <span className="text-xs text-[var(--text-muted)]">Helpful?</span>
                            <button onClick={() => handleFeedback(faq.id, true)} className={`p-1 rounded ${feedback[faq.id] === true ? "text-green-500" : "text-[var(--text-muted)]"}`}>
                              <ThumbsUp className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleFeedback(faq.id, false)} className={`p-1 rounded ${feedback[faq.id] === false ? "text-red-500" : "text-[var(--text-muted)]"}`}>
                              <ThumbsDown className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6">
              <h3 className="text-md font-semibold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[var(--accent)]" />
                Send a Message
              </h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">I'll respond within 24 hours! 💬</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows="4"
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent)] outline-none resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-[var(--accent)] text-white font-medium hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {loading ? "Sending..." : "Send Message 📨"}
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