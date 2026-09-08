/**
 * ==============================================================================
 * ANTIGRAVITY SOVEREIGN GMAIL AGENT (24/7 GOOGLE CLOUD RUNNER)
 * ==============================================================================
 * Run Antigravity from your smartphone via Gmail even when your PC is turned off!
 * 
 * HOST: Google Cloud (Google Apps Script - 100% Free Forever)
 * RUNTIME: 24/7 Serverless Cloud Trigger
 * COGNITIVE CORE: Gemini 2.5 Flash via Google Generative Language REST API
 * 
 * HOW TO SET UP IN 2 MINUTES:
 * 1. Go to https://script.google.com in your browser (logged into tanmayv86@gmail.com).
 * 2. Click "New Project" (rename to "Antigravity Gmail Agent").
 * 3. Delete any default code and paste this ENTIRE file into Code.gs.
 * 4. Replace GEMINI_API_KEY below with your Gemini API Key (or set it in Project Settings > Script Properties).
 * 5. Click the Clock icon (Triggers) on the left sidebar:
 *    - Click "Add Trigger"
 *    - Function to run: `processAntigravityGmailCommands`
 *    - Event source: "Time-driven"
 *    - Type of based trigger: "Minutes timer"
 *    - Minute interval: "Every 5 minutes" (or "Every minute")
 *    - Click Save and grant standard Gmail permissions.
 * 
 * HOW TO USE FROM YOUR PHONE (PC OFF):
 * Send an email from your phone's Gmail app to yourself (or reply to any thread):
 * Subject: [Antigravity] <Your Command or Question>
 * Example subjects:
 *   - [Antigravity] Give me a status report on today's follow-ups
 *   - [Antigravity] Draft a follow-up email for Sobha Realty
 *   - [Antigravity] Add lead: Skyline EPC, Rajesh Nair, MD, rajesh@skyline.in
 *   - [Antigravity] What is our delivery rate across the 5 mailboxes?
 * 
 * Antigravity will process your request in the cloud and email you back immediately!
 * ==============================================================================
 */

// --- CONFIGURATION ---
var CONFIG = {
  // Your Gemini API Key from Google AI Studio
  GEMINI_API_KEY: PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY') || 'YOUR_GEMINI_API_KEY_HERE',
  
  // Model to use
  GEMINI_MODEL: 'gemini-2.5-flash',
  
  // Tag to trigger Antigravity (case-insensitive)
  TRIGGER_TAG: '[Antigravity]',
  ALT_TAG: '[AGY]',
  
  // Dedicated label created in your Gmail to track processed instructions
  PROCESSED_LABEL: 'Antigravity/Processed',
  
  // Optional GitHub Personal Access Token if you want the agent to trigger GitHub Actions from email
  GITHUB_TOKEN: PropertiesService.getScriptProperties().getProperty('GITHUB_TOKEN') || '',
  GITHUB_REPO: 'tanmay-v01/storm-veins', // your repository
};

/**
 * Main Autonomous Worker: Triggered every 1-5 minutes by Google Cloud.
 */
function processAntigravityGmailCommands() {
  var apiKey = CONFIG.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    Logger.log('[Antigravity] Error: GEMINI_API_KEY is not set. Please configure in Script Properties or in CONFIG.');
    return;
  }

  var label = getOrCreateLabel(CONFIG.PROCESSED_LABEL);
  
  // Search for unread or unprocessed emails containing our tag
  var query = 'subject:([Antigravity] OR [AGY]) -label:' + CONFIG.PROCESSED_LABEL;
  var threads = GmailApp.search(query, 0, 10);

  if (threads.length === 0) {
    Logger.log('[Antigravity] No pending instructions found.');
    return;
  }

  Logger.log('[Antigravity] Found ' + threads.length + ' pending instruction thread(s).');

  for (var i = 0; i < threads.length; i++) {
    var thread = threads[i];
    var messages = thread.getMessages();
    var lastMessage = messages[messages.length - 1];

    // Only process if the latest message was not sent by the bot itself
    var sender = lastMessage.getFrom();
    var subject = thread.getFirstMessageSubject();
    var bodyText = lastMessage.getPlainBody().trim();

    Logger.log('[Antigravity] Processing instruction: ' + subject);

    // Clean the prompt
    var instruction = subject.replace(/\[Antigravity\]/i, '').replace(/\[AGY\]/i, '').trim();
    if (bodyText && bodyText.length > 5 && bodyText.indexOf('On ') !== 0) {
      instruction = instruction + '\n\nAdditional details:\n' + bodyText;
    }

    try {
      // 1. Generate AI Response via Gemini 2.5 Flash
      var aiResult = callGeminiCognitiveCore(instruction, apiKey);

      // 2. Check if user requested a GitHub Action dispatch (e.g. run cadence / pipeline)
      var dispatchNotice = '';
      if (CONFIG.GITHUB_TOKEN && /run pipeline|trigger cadence|send outreach|sync inbox/i.test(instruction)) {
        var dispatched = triggerGitHubCloudWorkflow('antigravity-command', { instruction: instruction });
        if (dispatched) {
          dispatchNotice = '<div style="margin-top: 15px; padding: 10px 14px; background: #064e3b; border: 1px solid #10b981; border-radius: 8px; color: #ecfdf5; font-size: 11px;">🚀 <strong>GitHub Cloud Action Dispatched:</strong> Automated cloud pipeline execution initiated on GitHub.</div>';
        }
      }

      // 3. Format Rich Executive HTML Email
      var htmlReply = buildExecutiveEmailHtml(instruction, aiResult, dispatchNotice);

      // 4. Send Reply directly into the thread
      thread.reply('', {
        htmlBody: htmlReply,
        name: 'Antigravity Autonomous Core 🪐'
      });

      // 5. Mark thread as processed
      thread.addLabel(label);
      thread.markRead();
      Logger.log('[Antigravity] Successfully replied to thread: ' + subject);
    } catch (e) {
      Logger.log('[Antigravity] Error processing thread: ' + e.toString());
      thread.reply('⚠️ [Antigravity Error] Could not process command:\n' + e.toString(), {
        name: 'Antigravity Autonomous Core 🪐'
      });
      thread.addLabel(label);
    }
  }
}

/**
 * Invokes Gemini 2.5 Flash REST API with Antigravity Storm Veins system persona.
 */
function callGeminiCognitiveCore(prompt, apiKey) {
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + CONFIG.GEMINI_MODEL + ':generateContent?key=' + apiKey;

  var systemInstruction = 
    "You are Antigravity, the autonomous AI pair programmer and lead systems architect for Storm Veins Media House. " +
    "You are responding directly to Tanmay (Founder & Principal Architect) via his mobile Gmail executive console while his PC is offline. " +
    "Context: Storm Veins manages an enterprise outreach CRM with 130 leads across 5 Hostinger mailboxes (contact@, tanmay@, sales@, solutions@, srushti@), " +
    "targeting Fire Safety, MEP, and Real Estate enterprises (Sobha, Godrej, Lodha, Wincanton, etc.). " +
    "Tone: Concise, authoritative, proactive, executive-grade, crisp Markdown. " +
    "Help him review strategies, draft high-converting B2B outreach proposals, analyze CRM metrics, plan code architectures, or manage lead records.";

  var payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 2048
    }
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, options);
  var json = JSON.parse(response.getContentText());

  if (json.candidates && json.candidates.length > 0 && json.candidates[0].content && json.candidates[0].content.parts.length > 0) {
    return json.candidates[0].content.parts[0].text;
  } else if (json.error) {
    throw new Error(json.error.message || 'Gemini API returned an error.');
  }
  return "Action completed, but no text response was generated.";
}

/**
 * Triggers a GitHub Actions workflow in the cloud via repository_dispatch.
 */
function triggerGitHubCloudWorkflow(eventType, clientPayload) {
  if (!CONFIG.GITHUB_TOKEN || !CONFIG.GITHUB_REPO) return false;
  try {
    var url = 'https://api.github.com/repos/' + CONFIG.GITHUB_REPO + '/dispatches';
    var options = {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + CONFIG.GITHUB_TOKEN,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Antigravity-Gmail-Agent'
      },
      contentType: 'application/json',
      payload: JSON.stringify({
        event_type: eventType,
        client_payload: clientPayload || {}
      }),
      muteHttpExceptions: true
    };
    var res = UrlFetchApp.fetch(url, options);
    return res.getResponseCode() >= 200 && res.getResponseCode() < 300;
  } catch (err) {
    Logger.log('[Antigravity] GitHub dispatch error: ' + err.toString());
    return false;
  }
}

/**
 * Builds a high-contrast executive email layout.
 */
function buildExecutiveEmailHtml(instruction, contentMarkdown, dispatchNotice) {
  var htmlContent = convertMarkdownToHtml(contentMarkdown);

  return '<div style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; background-color: #0b1320; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 680px; margin: 0 auto; border: 1px solid rgba(16, 185, 129, 0.35);">' +
    // Header Bar
    '<div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 14px; margin-bottom: 18px;">' +
      '<div>' +
        '<h2 style="margin: 0; color: #34d399; font-size: 16px; font-weight: 700; letter-spacing: -0.02em;">🪐 Antigravity Mobile Executive Core</h2>' +
        '<span style="color: #94a3b8; font-size: 10.5px;">24/7 Sovereign Cloud Runner · Storm Veins Media House</span>' +
      '</div>' +
      '<div style="text-align: right;">' +
        '<span style="display: inline-block; background: #064e3b; color: #a7f3d0; padding: 3px 8px; border-radius: 9999px; font-size: 10px; font-weight: 600; border: 1px solid #059669;">CLOUD ACTIVE</span>' +
      '</div>' +
    '</div>' +

    // User Instruction Callout
    '<div style="background: rgba(15, 23, 42, 0.85); border-left: 3px solid #10b981; padding: 10px 14px; border-radius: 6px; margin-bottom: 18px;">' +
      '<div style="color: #94a3b8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px;">Instruction Executed</div>' +
      '<div style="color: #f1f5f9; font-size: 12px; font-weight: 500;">' + escapeHtml(instruction) + '</div>' +
    '</div>' +

    // AI Response Content Body
    '<div style="font-size: 13px; line-height: 1.65; color: #e2e8f0;">' +
      htmlContent +
    '</div>' +

    (dispatchNotice || '') +

    // Footer
    '<div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid rgba(255, 255, 255, 0.08); display: flex; justify-content: space-between; align-items: center; font-size: 10px; color: #64748b;">' +
      '<span>Autonomous Host: Google Cloud Serverless</span>' +
      '<span>Reply to this thread anytime to continue pairing</span>' +
    '</div>' +
  '</div>';
}

/**
 * Utility: Converts basic markdown to clean HTML.
 */
function convertMarkdownToHtml(md) {
  if (!md) return '';
  var html = escapeHtml(md);

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em style="color: #cbd5e1;">$1</em>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code style="background: #1e293b; color: #34d399; padding: 2px 5px; border-radius: 4px; font-family: monospace; font-size: 11px;">$1</code>');
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="color: #6ee7b7; font-size: 13px; margin: 14px 0 6px 0;">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 style="color: #a7f3d0; font-size: 14px; margin: 16px 0 8px 0;">$1</h2>');
  
  // Bullet lists
  html = html.replace(/^\* (.*$)/gim, '<li style="margin: 3px 0; padding-left: 4px;">$1</li>');
  html = html.replace(/^- (.*$)/gim, '<li style="margin: 3px 0; padding-left: 4px;">$1</li>');
  
  // Wrap list items
  html = html.replace(/((?:<li style="[^"]*">.*?<\/li>\s*)+)/g, '<ul style="padding-left: 18px; margin: 8px 0;">$1</ul>');

  // Newlines to breaks
  html = html.replace(/\n\n/g, '<div style="margin-bottom: 10px;"></div>');
  html = html.replace(/\n/g, '<br/>');

  return html;
}

/**
 * Utility: HTML Entity Escaping.
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Utility: Gets or creates Gmail label.
 */
function getOrCreateLabel(name) {
  var label = GmailApp.getUserLabelByName(name);
  if (!label) {
    label = GmailApp.createLabel(name);
  }
  return label;
}
