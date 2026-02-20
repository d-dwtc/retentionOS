// RetentionOS - AI Content Strategist for Web3 Creators

// DOM Elements
const contentInput = document.getElementById('content-input');
const analyzeBtn = document.getElementById('analyze-btn');
const charCount = document.getElementById('char-count');
const results = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');

// Hook Types
const HOOK_TYPES = {
  CURIOSITY: 'Curiosity Gap',
  AUTHORITY: 'Authority Hook',
  CONTRARIAN: 'Contrarian Hook',
  WARNING: 'Warning/Threat Hook',
  EGO: 'Ego Challenge Hook',
  INSIDER: 'Insider Hook',
  STORY: 'Story Hook',
  REWARD: 'Reward Hook'
};

// AI Detection Patterns
const AI_PHRASES = [
  'delve into', 'dive deep', 'it\'s important to note', 'moreover', 'furthermore',
  'in conclusion', 'in today\'s digital landscape', 'landscape', 'unlock',
  'unlock the power', 'leverage', 'cutting-edge', 'game-changer', 'revolutionary',
  'innovative solution', 'robust', 'seamless', 'ecosystem', 'paradigm shift',
  'at the end of the day', 'to be honest', 'if you will', 'so to speak',
  'needless to say', 'tapestry', 'realm', 'ever-evolving', 'dynamic'
];

// Web3 Audiences
const AUDIENCES = {
  TRADERS: 'Traders',
  BUILDERS: 'Builders',
  CREATORS: 'Creators',
  DEVELOPERS: 'Developers',
  INVESTORS: 'Investors',
  BEGINNERS: 'Beginners',
  ADVANCED: 'Advanced Users'
};

// Character counter
contentInput.addEventListener('input', () => {
  charCount.textContent = contentInput.value.length;
});

// Analyze button handler
analyzeBtn.addEventListener('click', () => {
  const content = contentInput.value.trim();
  
  if (!content) {
    alert('Please paste some content to analyze');
    return;
  }
  
  analyzeContent(content);
});

// Main analysis function
function analyzeContent(content) {
  // Show loading state
  analyzeBtn.disabled = true;
  btnText.classList.add('hidden');
  btnLoading.classList.remove('hidden');
  
  // Simulate AI processing (in production, this would call an actual AI API)
  setTimeout(() => {
    const analysis = performAnalysis(content);
    displayResults(analysis);
    
    // Hide loading state
    analyzeBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoading.classList.add('hidden');
    
    // Show results
    emptyState.classList.add('hidden');
    results.classList.remove('hidden');
    
    // Scroll to results
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 1500);
}

// Perform content analysis
function performAnalysis(content) {
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
  const firstLine = content.split('\n')[0];
  
  return {
    hookAnalysis: analyzeHook(content, firstLine),
    retentionScore: calculateRetentionScore(content),
    aiDetection: detectAI(content),
    humanRewrite: generateHumanRewrite(content),
    formatRecommendation: recommendFormat(content, words),
    audienceTargeting: identifyAudience(content),
    missingElements: findMissingElements(content),
    viralPotential: calculateViralPotential(content),
    postingStrategy: recommendPostingStrategy(content),
    improvements: generateImprovements(content)
  };
}

// 1. Hook Analysis
function analyzeHook(content, firstLine) {
  const lower = firstLine.toLowerCase();
  let currentHook = 'None detected';
  let recommendation = '';
  
  // Detect current hook type
  if (lower.includes('?') || lower.includes('what') || lower.includes('why') || lower.includes('how')) {
    currentHook = HOOK_TYPES.CURIOSITY;
  } else if (lower.includes('secret') || lower.includes('insider') || lower.includes('nobody')) {
    currentHook = HOOK_TYPES.INSIDER;
  } else if (lower.includes('warning') || lower.includes('don\'t') || lower.includes('avoid') || lower.includes('mistake')) {
    currentHook = HOOK_TYPES.WARNING;
  } else if (lower.match(/i've|i'm|my|after \d+/)) {
    currentHook = HOOK_TYPES.STORY;
  } else if (lower.includes('free') || lower.includes('thread') || lower.includes('guide')) {
    currentHook = HOOK_TYPES.REWARD;
  } else if (lower.includes('unpopular') || lower.includes('actually') || lower.includes('wrong')) {
    currentHook = HOOK_TYPES.CONTRARIAN;
  } else if (lower.match(/spent \$|built|earned|made \$/)) {
    currentHook = HOOK_TYPES.AUTHORITY;
  } else if (lower.includes('you\'re') || lower.includes('can\'t') || lower.includes('won\'t')) {
    currentHook = HOOK_TYPES.EGO;
  }
  
  // Recommend better hook if needed
  if (currentHook === 'None detected' || firstLine.length < 20) {
    recommendation = 'Try starting with a curiosity gap or contrarian statement to immediately grab attention.';
  } else {
    recommendation = `Strong ${currentHook} detected. Consider testing a ${HOOK_TYPES.CONTRARIAN} or ${HOOK_TYPES.INSIDER} for variety.`;
  }
  
  return { currentHook, recommendation, firstLine };
}

// 2. Retention Score Calculation
function calculateRetentionScore(content) {
  let score = 0;
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]+/).filter(s => s.trim()).length;
  const firstLine = content.split('\n')[0];
  
  // Hook strength (0-25)
  if (firstLine.length > 20 && firstLine.length < 100) score += 15;
  if (firstLine.includes('?') || firstLine.includes('!')) score += 10;
  
  // Clarity (0-25)
  const avgWordsPerSentence = words / sentences;
  if (avgWordsPerSentence < 20) score += 15;
  if (avgWordsPerSentence < 15) score += 10;
  
  // Emotional pull (0-20)
  const emotionalWords = ['secret', 'warning', 'mistake', 'proven', 'guaranteed', 'free', 'exclusive', 'urgent'];
  const hasEmotion = emotionalWords.some(word => content.toLowerCase().includes(word));
  if (hasEmotion) score += 15;
  if (content.includes('!')) score += 5;
  
  // Readability (0-15)
  const paragraphs = content.split('\n\n').length;
  if (paragraphs > 1) score += 10;
  if (words < 500) score += 5;
  
  // Engagement potential (0-15)
  const hasNumbers = /\d+/.test(content);
  const hasBullets = content.includes('•') || content.includes('-') || content.includes('→');
  if (hasNumbers) score += 8;
  if (hasBullets) score += 7;
  
  return Math.min(Math.round(score), 100);
}

// 3. AI Detection
function detectAI(content) {
  const lower = content.toLowerCase();
  const detectedPhrases = [];
  let aiWordCount = 0;
  
  AI_PHRASES.forEach(phrase => {
    if (lower.includes(phrase.toLowerCase())) {
      detectedPhrases.push(phrase);
      aiWordCount++;
    }
  });
  
  // Additional AI patterns
  const hasExcessiveAdverbs = (content.match(/ly\b/g) || []).length > 5;
  const hasPassiveVoice = lower.includes('is being') || lower.includes('was being') || lower.includes('has been');
  const hasFormalTone = lower.includes('one must') || lower.includes('it is essential') || lower.includes('therefore');
  
  if (hasExcessiveAdverbs) aiWordCount += 2;
  if (hasPassiveVoice) aiWordCount += 1;
  if (hasFormalTone) aiWordCount += 2;
  
  let confidence = 'Low';
  if (aiWordCount >= 5) confidence = 'High';
  else if (aiWordCount >= 3) confidence = 'Medium';
  
  return { confidence, detectedPhrases, aiWordCount };
}

// 4. Human Rewrite
function generateHumanRewrite(content) {
  // This is a simplified version - in production, this would use an actual AI API
  const lines = content.split('\n').filter(l => l.trim());
  const firstLine = lines[0];
  
  // Generate a more human-sounding version
  let rewrite = '';
  
  if (firstLine.toLowerCase().includes('in today\'s')) {
    rewrite = 'Here\'s the thing about Web3 right now:\n\n';
  } else if (firstLine.toLowerCase().includes('blockchain')) {
    rewrite = 'Real talk about blockchain:\n\n';
  } else if (firstLine.toLowerCase().includes('nft')) {
    rewrite = 'Let me be straight with you about NFTs:\n\n';
  } else {
    rewrite = 'Quick reality check:\n\n';
  }
  
  // Simplify the rest
  const simplified = content
    .replace(/Moreover,?/gi, 'Plus,')
    .replace(/Furthermore,?/gi, 'Also,')
    .replace(/It is important to note that/gi, 'Important:')
    .replace(/In conclusion,?/gi, 'Bottom line:')
    .replace(/leverage/gi, 'use')
    .replace(/utilize/gi, 'use')
    .replace(/paradigm shift/gi, 'big change')
    .replace(/cutting-edge/gi, 'new')
    .replace(/game-changer/gi, 'game changer');
  
  rewrite += simplified.split('\n').slice(1).join('\n');
  
  return rewrite || 'Your content is already quite human! Maybe just shorten sentences and add more personality.';
}

// 5. Format Recommendation
function recommendFormat(content, words) {
  let format = '';
  let reason = '';
  
  if (words < 50) {
    format = 'Short Tweet';
    reason = 'Your content is concise and punchy. Perfect for a standalone tweet to maximize engagement.';
  } else if (words < 150) {
    format = 'Long Tweet';
    reason = 'Good length for a single comprehensive tweet. Provides value without requiring a thread.';
  } else if (words < 500) {
    format = 'Thread';
    reason = 'Break this into 3-5 tweets for better readability and engagement on each part.';
  } else if (words < 1000) {
    format = 'Long Thread or Article';
    reason = 'This has substantial depth. Consider a 7-10 tweet thread or a Medium article with a summary thread.';
  } else {
    format = 'Article';
    reason = 'Too long for a thread. Publish as an article and share a compelling thread with key takeaways linking to it.';
  }
  
  return { format, reason };
}

// 6. Audience Targeting
function identifyAudience(content) {
  const lower = content.toLowerCase();
  const audiences = [];
  
  if (lower.match(/trade|trading|entry|exit|chart|technical analysis|ta\b/)) {
    audiences.push(AUDIENCES.TRADERS);
  }
  if (lower.match(/build|building|developer|code|smart contract|solidity/)) {
    audiences.push(AUDIENCES.BUILDERS);
  }
  if (lower.match(/content|creator|growth|audience|engagement|viral/)) {
    audiences.push(AUDIENCES.CREATORS);
  }
  if (lower.match(/dev|developer|programming|github|api|web3\.js/)) {
    audiences.push(AUDIENCES.DEVELOPERS);
  }
  if (lower.match(/invest|investment|portfolio|returns|roi|defi/)) {
    audiences.push(AUDIENCES.INVESTORS);
  }
  if (lower.match(/beginner|start|guide|basics|introduction|new to/)) {
    audiences.push(AUDIENCES.BEGINNERS);
  }
  if (lower.match(/advanced|deep dive|technical|complex|sophisticated/)) {
    audiences.push(AUDIENCES.ADVANCED);
  }
  
  // Default if none detected
  if (audiences.length === 0) {
    audiences.push(AUDIENCES.CREATORS, AUDIENCES.BEGINNERS);
  }
  
  return audiences;
}

// 7. Missing Elements
function findMissingElements(content) {
  const missing = [];
  const lower = content.toLowerCase();
  
  // Check for strong hook
  const firstLine = content.split('\n')[0];
  if (firstLine.length < 30 || (!firstLine.includes('?') && !firstLine.includes('!'))) {
    missing.push({
      element: 'Stronger Hook',
      suggestion: 'Start with a question, bold statement, or surprising fact to grab attention immediately.'
    });
  }
  
  // Check for emotional trigger
  const emotionalWords = ['secret', 'warning', 'mistake', 'proven', 'free', 'exclusive', 'urgent', 'shocking'];
  const hasEmotion = emotionalWords.some(word => lower.includes(word));
  if (!hasEmotion) {
    missing.push({
      element: 'Emotional Trigger',
      suggestion: 'Add words that create curiosity, urgency, or fear of missing out to boost engagement.'
    });
  }
  
  // Check for clear positioning
  const hasPositioning = lower.includes('i') || lower.includes('my') || lower.includes('we');
  if (!hasPositioning) {
    missing.push({
      element: 'Clearer Positioning',
      suggestion: 'Add personal experience or credentials to establish authority and relatability.'
    });
  }
  
  // Check for CTA
  const hasCTA = lower.includes('follow') || lower.includes('retweet') || lower.includes('reply') || 
                 lower.includes('comment') || lower.includes('share') || lower.includes('thread');
  if (!hasCTA) {
    missing.push({
      element: 'Call to Action',
      suggestion: 'End with a clear CTA like "Follow for more" or "RT if this helped" to drive engagement.'
    });
  }
  
  // Check for storytelling
  const hasStory = lower.includes('when i') || lower.includes('i was') || lower.includes('my story');
  if (!hasStory && content.split(/\s+/).length > 100) {
    missing.push({
      element: 'Storytelling',
      suggestion: 'Weave in a personal anecdote or case study to make the content more relatable and memorable.'
    });
  }
  
  return missing.length > 0 ? missing : [{ element: 'None', suggestion: 'Your content has all key elements!' }];
}

// 8. Viral Potential Score
function calculateViralPotential(content) {
  const retentionScore = calculateRetentionScore(content);
  const aiDetection = detectAI(content);
  const words = content.split(/\s+/).length;
  
  let score = 0;
  
  // Retention score impact (40%)
  score += (retentionScore / 100) * 40;
  
  // AI detection penalty (20%)
  if (aiDetection.confidence === 'Low') score += 20;
  else if (aiDetection.confidence === 'Medium') score += 10;
  
  // Optimal length (20%)
  if (words >= 50 && words <= 300) score += 20;
  else if (words < 50 || (words > 300 && words <= 500)) score += 10;
  
  // Engagement elements (20%)
  const hasQuestion = content.includes('?');
  const hasNumbers = /\d+/.test(content);
  const hasBullets = content.includes('→') || content.includes('•');
  if (hasQuestion) score += 7;
  if (hasNumbers) score += 7;
  if (hasBullets) score += 6;
  
  let potential = 'Low';
  let explanation = '';
  
  if (score >= 75) {
    potential = 'Viral';
    explanation = 'Exceptional content with strong hook, optimal length, and high engagement potential. High chance of going viral with the right timing.';
  } else if (score >= 60) {
    potential = 'High';
    explanation = 'Strong content that should perform well. Good hook and structure with solid engagement elements.';
  } else if (score >= 40) {
    potential = 'Medium';
    explanation = 'Decent content but needs improvements in hook strength, clarity, or engagement elements to maximize reach.';
  } else {
    potential = 'Low';
    explanation = 'Needs significant improvements. Focus on strengthening the hook, reducing AI-sounding phrases, and adding emotional triggers.';
  }
  
  return { potential, explanation, score: Math.round(score) };
}

// 9. Posting Strategy
function recommendPostingStrategy(content) {
  const words = content.split(/\s+/).length;
  
  let bestTime = '';
  let bestDay = '';
  let postType = '';
  
  // Best time based on Web3 audience (global, crypto-native)
  bestTime = '8-10 AM EST or 6-8 PM EST';
  
  // Best day
  bestDay = 'Tuesday through Thursday';
  
  // Post type
  if (words < 100) {
    postType = 'Single post for maximum immediate impact';
  } else if (words < 300) {
    postType = 'Single long-form post or 3-tweet thread';
  } else {
    postType = 'Thread (5-7 tweets) posted sequentially';
  }
  
  return { bestTime, bestDay, postType };
}

// 10. Improvement Suggestions
function generateImprovements(content) {
  const improvements = [];
  const lower = content.toLowerCase();
  const firstLine = content.split('\n')[0];
  const words = content.split(/\s+/).length;
  
  // Improvement 1: Hook
  if (firstLine.length < 40) {
    improvements.push({
      title: 'Strengthen Your Hook',
      description: 'Your opening line is too short. Expand it to create more intrigue. Try "The secret to [X] that nobody talks about:" or "I made [mistake] so you don\'t have to:"'
    });
  } else if (!firstLine.includes('?') && !firstLine.includes('!')) {
    improvements.push({
      title: 'Add Punctuation to Hook',
      description: 'End your hook with a question mark or exclamation to create more energy and engagement.'
    });
  }
  
  // Improvement 2: Structure
  const paragraphs = content.split('\n\n').length;
  if (paragraphs === 1 && words > 100) {
    improvements.push({
      title: 'Break Into Sections',
      description: 'Add line breaks every 2-3 sentences to improve readability and prevent wall-of-text effect.'
    });
  }
  
  // Improvement 3: Engagement elements
  const hasNumbers = /\d+/.test(content);
  if (!hasNumbers) {
    improvements.push({
      title: 'Add Specific Numbers',
      description: 'Include specific numbers or stats to increase credibility and engagement. Instead of "many", say "47 projects" or "3x returns".'
    });
  }
  
  // Improvement 4: AI language
  const aiDetection = detectAI(content);
  if (aiDetection.confidence === 'High' || aiDetection.confidence === 'Medium') {
    improvements.push({
      title: 'Remove AI-Sounding Phrases',
      description: `Replace corporate jargon with casual Web3 lingo. Detected phrases: ${aiDetection.detectedPhrases.slice(0, 3).join(', ')}.`
    });
  }
  
  // Improvement 5: CTA
  const hasCTA = lower.includes('follow') || lower.includes('retweet') || lower.includes('comment');
  if (!hasCTA) {
    improvements.push({
      title: 'Add a Clear Call-to-Action',
      description: 'End with "Follow me for more Web3 insights" or "RT if this helped you" to drive engagement and growth.'
    });
  }
  
  // Return top 3
  return improvements.slice(0, 3);
}

// Display Results
function displayResults(analysis) {
  // Update scores
  document.getElementById('retention-score').textContent = analysis.retentionScore;
  document.getElementById('ai-detection').textContent = analysis.aiDetection.confidence;
  document.getElementById('viral-potential').textContent = analysis.viralPotential.potential;
  
  // 1. Hook Analysis
  document.getElementById('hook-analysis').innerHTML = `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-2">Current Hook Type</p>
      <p class="text-lg font-semibold text-emerald-400">${analysis.hookAnalysis.currentHook}</p>
    </div>
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-2">Your Hook</p>
      <p class="text-dark-text italic">"${analysis.hookAnalysis.firstLine}"</p>
    </div>
    <div class="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
      <p class="text-sm font-semibold text-indigo-300 mb-1">Recommendation</p>
      <p class="text-sm text-dark-text">${analysis.hookAnalysis.recommendation}</p>
    </div>
  `;
  
  // 2. AI Detection Details
  const aiPhrases = analysis.aiDetection.detectedPhrases.length > 0
    ? analysis.aiDetection.detectedPhrases.map(p => `<span class="inline-block bg-rose-500/20 text-rose-300 px-2 py-1 rounded text-xs mr-2 mb-2">${p}</span>`).join('')
    : '<span class="text-emerald-400">No AI phrases detected!</span>';
    
  document.getElementById('ai-detection-details').innerHTML = `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-2">Confidence Level</p>
      <p class="text-lg font-semibold ${analysis.aiDetection.confidence === 'High' ? 'text-rose-400' : analysis.aiDetection.confidence === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}">${analysis.aiDetection.confidence}</p>
    </div>
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-3">Detected AI Phrases</p>
      <div class="flex flex-wrap">${aiPhrases}</div>
    </div>
  `;
  
  // 3. Human Rewrite
  document.getElementById('human-rewrite').innerHTML = `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-3">Suggested Rewrite</p>
      <p class="text-dark-text whitespace-pre-wrap">${analysis.humanRewrite}</p>
    </div>
    <button onclick="copyToClipboard('${analysis.humanRewrite.replace(/'/g, "\\'").replace(/\n/g, '\\n')}')" class="mt-3 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium transition-colors">
      Copy Rewrite
    </button>
  `;
  
  // 4. Format Recommendation
  document.getElementById('format-recommendation').innerHTML = `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-2">Recommended Format</p>
      <p class="text-lg font-semibold text-blue-400">${analysis.formatRecommendation.format}</p>
    </div>
    <div class="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
      <p class="text-sm font-semibold text-blue-300 mb-1">Why This Format</p>
      <p class="text-sm text-dark-text">${analysis.formatRecommendation.reason}</p>
    </div>
  `;
  
  // 5. Audience Targeting
  const audienceTags = analysis.audienceTargeting.map(a => 
    `<span class="inline-block bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-sm mr-2 mb-2">${a}</span>`
  ).join('');
  
  document.getElementById('audience-targeting').innerHTML = `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="text-sm text-dark-muted mb-3">Best Audience Segments</p>
      <div class="flex flex-wrap">${audienceTags}</div>
    </div>
  `;
  
  // 6. Missing Elements
  const missingItems = analysis.missingElements.map(m => `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <p class="font-semibold text-amber-400 mb-2">${m.element}</p>
      <p class="text-sm text-dark-text">${m.suggestion}</p>
    </div>
  `).join('');
  
  document.getElementById('missing-elements').innerHTML = missingItems;
  
  // 7. Posting Strategy
  document.getElementById('posting-strategy').innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
        <p class="text-sm text-dark-muted mb-2">Best Time</p>
        <p class="text-sm font-semibold text-teal-400">${analysis.postingStrategy.bestTime}</p>
      </div>
      <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
        <p class="text-sm text-dark-muted mb-2">Best Day</p>
        <p class="text-sm font-semibold text-teal-400">${analysis.postingStrategy.bestDay}</p>
      </div>
      <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
        <p class="text-sm text-dark-muted mb-2">Post Type</p>
        <p class="text-sm font-semibold text-teal-400">${analysis.postingStrategy.postType}</p>
      </div>
    </div>
  `;
  
  // 8. Improvement Suggestions
  const improvementItems = analysis.improvements.map((imp, idx) => `
    <div class="bg-dark-bg rounded-lg p-4 border border-dark-border">
      <div class="flex items-start gap-3">
        <span class="flex-shrink-0 w-6 h-6 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center text-xs font-bold">${idx + 1}</span>
        <div>
          <p class="font-semibold text-rose-400 mb-2">${imp.title}</p>
          <p class="text-sm text-dark-text">${imp.description}</p>
        </div>
      </div>
    </div>
  `).join('');
  
  document.getElementById('improvement-suggestions').innerHTML = improvementItems;
}

// Copy to clipboard utility
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Rewrite copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}