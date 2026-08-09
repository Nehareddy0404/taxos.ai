import React, { useState } from 'react';
import { MOCK_RETURNS } from '../data/mockTaxData.js';

export default function ClientOnboarding() {
  const [isOnboardingDone, setIsOnboardingDone] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="module-container onboarding-module">
      <div className="module-header-banner">
        <div>
          <h2>Client Onboarding Portal</h2>
          <p>Zero clutter, zero tax jargon. Brand new clients immediately know their exact next action within seconds of logging in.</p>
        </div>
      </div>

      {/* Simulator Toggle Controls */}
      <div className="onboarding-simulator-toolbar">
        <span className="sim-label">⚙️ Onboarding State Simulator:</span>
        <button
          className={`sim-btn ${!isOnboardingDone ? 'active' : ''}`}
          onClick={() => setIsOnboardingDone(false)}
        >
          1️⃣ First-Run Day 1 View (In Onboarding)
        </button>
        <button
          className={`sim-btn ${isOnboardingDone ? 'active' : ''}`}
          onClick={() => setIsOnboardingDone(true)}
        >
          2️⃣ Onboarding Completed View (Standard Portal)
        </button>
      </div>

      {!isOnboardingDone ? (
        /* DAY 1: FIRST-RUN EXPERIENTIAL VIEW */
        <div className="first-run-container">
          {/* Prominent Next Action Card */}
          <div className="hero-action-card">
            <div className="card-top-row">
              <span className="action-pill">⚡ YOUR NEXT ACTION (Est. 3 Mins)</span>
              <span className="urgency-tag">Due in 3 Days</span>
            </div>

            <h1 className="hero-task-title">
              Welcome Sarah! Please upload your <strong>Coinbase 1099-B</strong> and confirm W-2 Tax Paid.
            </h1>
            <p className="hero-task-desc">
              Your CPA Alex Rivera has prepared 65% of your return. Completing this step unlocks your final tax review.
            </p>

            {/* Step Wizard */}
            <div className="step-progress-bar">
              <div className={`step-dot ${currentStep >= 1 ? 'active' : ''}`}>1. Upload 1099-B</div>
              <div className="step-line"></div>
              <div className={`step-dot ${currentStep >= 2 ? 'active' : ''}`}>2. Confirm Foreign Tax</div>
              <div className="step-line"></div>
              <div className={`step-dot ${currentStep >= 3 ? 'active' : ''}`}>3. Final Sign-off</div>
            </div>

            {/* Interactive Task Container */}
            <div className="task-interactive-box">
              {currentStep === 1 && (
                <div className="upload-dropzone">
                  <div className="dropzone-icon">📁</div>
                  <div className="dropzone-text">
                    <strong>Drag and drop your Coinbase 1099-B PDF here</strong> or click to browse
                  </div>
                  <input
                    type="file"
                    className="file-input-hidden"
                    onChange={(e) => setUploadedFile(e.target.files[0]?.name || 'Coinbase_1099B_2025.pdf')}
                  />
                  {uploadedFile && (
                    <div className="file-success-badge">
                      ✅ Uploaded: {uploadedFile}
                    </div>
                  )}
                  <button
                    className="btn-primary-action"
                    onClick={() => setCurrentStep(2)}
                  >
                    Continue to Step 2 →
                  </button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="verify-step">
                  <h3>Confirm Box 14 Foreign Tax Paid ($1,240.00)</h3>
                  <p>Alex matched this with your foreign tax credit claim on Form 1116.</p>
                  <div className="confirm-buttons">
                    <button className="btn-confirm" onClick={() => setCurrentStep(3)}>
                      ✅ Looks Correct - Proceed to Sign-off
                    </button>
                    <button className="btn-flag">
                      ❓ I have a question about this
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="completion-step">
                  <div className="success-icon">🎉</div>
                  <h3>Onboarding & Tasks Complete!</h3>
                  <p>Alex will finalize your 1040 return within 24 hours. Your portal has been updated to full view mode.</p>
                  <button className="btn-finish" onClick={() => setIsOnboardingDone(true)}>
                    Enter My Tax Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Deferred / Hidden Navigation Panel Explanation */}
          <div className="deferred-disclosure-panel">
            <div className="panel-title">💡 Simplified Interface Mode</div>
            <p>
              To prevent cognitive overload, non-essential modules (Schedule D details, historical 2024 archives, e-file transcripts) are <strong>deferred until onboarding is completed</strong>. Only your urgent next task is presented upfront.
            </p>
          </div>
        </div>
      ) : (
        /* POST-ONBOARDING STANDARD CLIENT PORTAL VIEW */
        <div className="post-onboarding-container">
          <div className="status-overview-banner">
            <div className="banner-status">
              <span className="status-badge-green">✅ ALL TASKS COMPLETE</span>
              <h2>Your 2025 Tax Return is 95% Complete</h2>
              <p>Assigned CPA: <strong>Alex Rivera, CPA</strong> | Est. Completion: <strong>Tomorrow</strong></p>
            </div>
            <div className="summary-numbers">
              <div className="num-box">
                <span className="num-label">Total Income</span>
                <span className="num-val">$342,850</span>
              </div>
              <div className="num-box">
                <span className="num-label">Estimated Tax Owed</span>
                <span className="num-val">$48,120</span>
              </div>
            </div>
          </div>

          <div className="post-onboarding-grid">
            <div className="portal-card">
              <h3>📄 Uploaded Documents (14)</h3>
              <ul>
                <li>Form W-2 - Acme Cloud Tech (Verified)</li>
                <li>Form 1099-INT - Chase (Verified)</li>
                <li>Form 1099-B - Coinbase (Just Uploaded)</li>
              </ul>
            </div>
            <div className="portal-card">
              <h3>💬 Messages & Support</h3>
              <p>1 active message thread with Alex Rivera.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
