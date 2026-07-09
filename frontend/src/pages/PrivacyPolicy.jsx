import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

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
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Privacy & Policy</h1>
        </div>

        {/* Main Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 shadow-sm space-y-6">
          
          {/* Introduction */}
          <div className="flex items-start gap-4 p-4 bg-[var(--bg-hover)] rounded-xl">
            <Shield className="w-6 h-6 text-[var(--accent)] flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">Our Commitment to Privacy</h2>
              <p className="text-sm text-[var(--text-muted)] mt-1">
                Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
              </p>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-md font-semibold text-[var(--text-primary)]">Information We Collect</h3>
            </div>
            <ul className="space-y-2 pl-8 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span><strong>Account Information:</strong> Name, email address, profile picture</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span><strong>Usage Data:</strong> How you interact with our platform</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span><strong>Device Information:</strong> Browser type, IP address, device type</span>
              </li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-md font-semibold text-[var(--text-primary)]">How We Use Your Information</h3>
            </div>
            <ul className="space-y-2 pl-8 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>To provide and maintain our services</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>To personalize your experience</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>To communicate with you about updates and features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>To improve our platform and user experience</span>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-md font-semibold text-[var(--text-primary)]">Data Security</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] pl-8">
              We implement industry-standard security measures to protect your data, including:
            </p>
            <ul className="space-y-2 pl-8 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>End-to-end encryption for sensitive data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>Secure servers and regular security audits</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>Access controls and authentication protocols</span>
              </li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Cookie className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-md font-semibold text-[var(--text-primary)]">Cookies</h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] pl-8">
              We use cookies to enhance your experience. You can control cookie preferences in your browser settings.
            </p>
          </div>

          {/* Your Rights */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[var(--accent)]" />
              <h3 className="text-md font-semibold text-[var(--text-primary)]">Your Rights</h3>
            </div>
            <ul className="space-y-2 pl-8 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>Access, update, or delete your personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>Withdraw consent at any time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>Request a copy of your data</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="p-4 bg-[var(--bg-hover)] rounded-xl text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Last updated: January 2026
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;