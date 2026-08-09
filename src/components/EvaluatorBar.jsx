import React from 'react';
import { CHALLENGES } from '../data/mockTaxData.js';

export default function EvaluatorBar({ activeChallenge, onSelectChallenge, activeRole }) {
  return (
    <div className="evaluator-bar">
      <div className="evaluator-header">
        <div className="evaluator-title">
          <span className="evaluator-badge">CASE STUDY EVALUATOR MODE</span>
          <span className="evaluator-subtitle">Click any challenge below to jump directly to its working prototype view:</span>
        </div>
        <div className="evaluator-active-info">
          Active Role: <strong>{activeRole.name}</strong> ({activeRole.badge})
        </div>
      </div>
      
      <div className="challenge-pills-scroll">
        <button
          className={`challenge-pill ${activeChallenge === 'all' ? 'active' : ''}`}
          onClick={() => onSelectChallenge('all')}
        >
          🌐 Full Platform Overview
        </button>
        {CHALLENGES.map(c => (
          <button
            key={c.id}
            className={`challenge-pill ${activeChallenge === c.id ? 'active' : ''}`}
            onClick={() => onSelectChallenge(c.id)}
            title={c.shortDesc}
          >
            <span className="pill-id">#{c.id}</span> {c.name.split('. ')[1]}
          </button>
        ))}
      </div>
    </div>
  );
}
