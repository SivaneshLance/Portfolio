/* ── THEME ── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const saved = localStorage.getItem('sk-theme') || 'dark';
html.setAttribute('data-theme', saved);
themeBtn.textContent = saved === 'dark' ? '🌙' : '☀️';
themeBtn.addEventListener('click', () => {
  const n = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', n);
  localStorage.setItem('sk-theme', n);
  themeBtn.textContent = n === 'dark' ? '🌙' : '☀️';
  themeBtn.style.transform = 'rotate(360deg)';
  setTimeout(() => themeBtn.style.transform = '', 400);
});

/* ── TYPEWRITER (only runs if element exists — index.html only) ── */
const twEl = document.getElementById("tw-el");
const twCur = document.getElementById("tw-cur");

if (twEl && twCur) {
  const NAME = "Sivanesh K";
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseTime = 1400;

  function typeEffect() {
    if (!isDeleting) {
      charIndex++;
      twEl.textContent = NAME.substring(0, charIndex);
    } else {
      charIndex--;
      twEl.textContent = NAME.substring(0, charIndex);
    }
    let speed = isDeleting ? deletingSpeed : typingSpeed;
    if (charIndex === NAME.length) {
      speed = pauseTime;
      isDeleting = true;
    } else if (charIndex === 0) {
      isDeleting = false;
    }
    setTimeout(typeEffect, speed);
  }
  typeEffect();
}

/* ── SCROLL REVEAL ── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis'); ro.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

/* ── SKILL BARS ── */
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.sk-fill,.rs-fill').forEach(b => b.style.width = b.dataset.w + '%');
      so.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('#skWrap,.resume-sidebar').forEach(el => so.observe(el));

/* ── CHATBOT ── */
const fab = document.getElementById('chatFab');
const win = document.getElementById('chatWin');
const msgs = document.getElementById('chatMsgs');
const inp = document.getElementById('chatInp');
const sendBtn = document.getElementById('chatSend');

if (fab && win && msgs && inp && sendBtn) {
  let chatOpen = false, busy = false;

  fab.addEventListener('click', () => {
    chatOpen = !chatOpen;
    fab.classList.toggle('open', chatOpen);
    win.classList.toggle('open', chatOpen);
    if (chatOpen && msgs.children.length === 0) {
      addMsg('bot', "👋 Hi! I'm Sivanesh's AI assistant. I can tell you all about his skills, projects, education, and availability. What would you like to know?");
    }
    if (chatOpen) setTimeout(() => inp.focus(), 280);
  });

  inp.addEventListener('input', () => { inp.style.height = 'auto'; inp.style.height = Math.min(inp.scrollHeight, 74) + 'px'; });
  inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } });
  sendBtn.addEventListener('click', send);

  function addMsg(role, text) {
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const d = document.createElement('div');
    d.className = `msg ${role}`;
    d.innerHTML = `<div class="mb">${text}</div><div class="mt">${t}</div>`;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const d = document.createElement('div');
    d.className = 'msg bot'; d.id = 'tdot';
    d.innerHTML = '<div class="typing-ind"><span></span><span></span><span></span></div>';
    msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight;
  }

  function sq(btn) { inp.value = btn.textContent; send(); }
  window.sq = sq;

  function getBotReply(q) {
    q = q.toLowerCase().trim();

    if (/skill|tech|stack|know|language|tool|expertise|good at|proficient/.test(q))
      return `Sivanesh's technical skills include:<br><br>
🤖 <b>Machine Learning</b> — 85% (K-Means, Linear Regression, Sklearn)<br>
🧠 <b>Deep Learning / CNN</b> — 80% (VGG16, TensorFlow/Keras)<br>
🐍 <b>Python</b> — 82% (primary research language)<br>
⚛️ <b>React JS</b> — 75% (frontend development)<br>
☕ <b>Java / C++ / PHP</b> — 70%<br>
🐧 <b>Linux Administration</b> — 65% (RedHat)<br><br>
He also has strong communication skills and the ability to work independently.`;

    if (/project|build|work|research|paper|publish|ijirset|ieee|radiology|sales|mobile|pneumonia|vgg|cnn/.test(q))
      return `Sivanesh has two key research projects:<br><br>
📈 <b>Sales Prediction for Mobiles Using ML</b><br>
Used K-Means clustering and Linear Regression to forecast mobile sales based on brand, price and features. Published in the IJIRSET journal (2023).<br><br>
🫁 <b>Smart Radiology System — Pneumonia Detection</b><br>
Built a VGG16-enhanced CNN model to identify pneumonia from chest X-ray images with high accuracy. Applied for IEEE Paper Conference (2024).<br><br>
Both projects reflect his strength in applied ML and deep learning research.`;

    if (/edu|degree|college|university|study|studied|qualification|school|academic/.test(q))
      return `Sivanesh's academic background:<br><br>
🎓 <b>ME in Computer Science Engineering</b> (2024–2026)<br>
St. Joseph's College of Engineering, Chennai<br><br>
🎓 <b>BE in Computer Science Engineering</b> (2019–2023)<br>
Velammal Engineering College, Chennai<br><br>
He has a solid 4-year undergraduate foundation and is currently pursuing his postgraduate degree with a focus on ML and AI research.`;

    if (/intern|experience|work|job|company|vectra|linux|redhat/.test(q))
      return `Sivanesh completed an internship at <b>Vectra Technosoft Pvt. Ltd.</b> as a RedHat Linux System Administrator (1.1 months).<br><br>
🖥️ He gained practical experience with:<br>
• Linux commands and system fundamentals<br>
• Enterprise server configuration<br>
• RedHat Linux operations<br><br>
This gave him real-world exposure to enterprise IT environments.`;

    if (/hire|available|open|job|opportun|recruit|looking|work|position|role|full.?time|collaborat/.test(q))
      return `Yes! Sivanesh is actively open to opportunities. 🟢<br><br>
He is looking for:<br>
• <b>Full-time roles</b> in ML/AI engineering or software development<br>
• <b>Internships</b> and research collaborations<br>
• Projects in Machine Learning, Deep Learning, Computer Vision, or Full-Stack Dev<br><br>
📧 Reach him at <b>Sivaneshgk2001@gmail.com</b><br>
📱 Call/WhatsApp: <b>+91 8220488520</b>`;

    if (/contact|email|phone|reach|number|address|location|where/.test(q))
      return `Here's how to reach Sivanesh:<br><br>
📧 <b>Email:</b> Sivaneshgk2001@gmail.com<br>
📱 <b>Phone:</b> +91 8220488520<br>
📍 <b>Location:</b> Pallikaranai, Chennai – 600100, Tamil Nadu, India<br>
🌐 <b>Languages:</b> English, Tamil, Telugu<br><br>
Feel free to email or call him — he responds promptly!`;

    if (/certif|ibm|udemy|credential|course|training/.test(q))
      return `Sivanesh holds the following certifications:<br><br>
🏦 <b>IBM</b> — Personal Expense Tracker Application<br>
☕ <b>Udemy</b> — Java and C++ Crash Course<br>
🐘 <b>Udemy</b> — PHP Crash Course<br>
📄 <b>IEEE</b> — Paper applied: Smart Radiology System (Pneumonia)<br><br>
He's committed to continuous learning beyond his formal education.`;

    if (/language|speak|tamil|telugu|english|multilingual/.test(q))
      return `Sivanesh is multilingual! He speaks:<br><br>
🇬🇧 <b>English</b> — Professional proficiency<br>
🌿 <b>Tamil</b> — Native<br>
🌸 <b>Telugu</b> — Conversational<br><br>
This makes him effective in diverse and multicultural work environments.`;

    if (/who|about|tell me|sivanesh|yourself|introduce|summary/.test(q))
      return `Sivanesh K is a passionate <b>ML & Deep Learning Engineer</b> based in Chennai, India.<br><br>
He's pursuing his <b>ME in Computer Science</b> at St. Joseph's College of Engineering (2024–2026), with a BE from Velammal Engineering College (2019–2023).<br><br>
🔬 Published ML researcher<br>
🧠 Deep learning practitioner (CNN, VGG16)<br>
💻 Full-stack capable (React JS, Python)<br>
🐧 Linux-certified intern<br><br>
He's driven by curiosity and loves building intelligent systems that solve real-world problems. He's currently open to full-time roles and research collaborations.`;

    if (/salary|package|ctc|pay|compensation|stipend/.test(q))
      return `Sivanesh hasn't publicly shared salary expectations, but he's open to discussing compensation based on the role and responsibilities.<br><br>
💡 Best to reach him directly:<br>
📧 <b>Sivaneshgk2001@gmail.com</b><br>
📱 <b>+91 8220488520</b>`;

    if (/^(hi|hello|hey|hola|sup|good|greet)/.test(q))
      return `Hello! 👋 Great to meet you! I'm the AI assistant for <b>Sivanesh K's</b> portfolio.<br><br>
I can tell you about his skills, projects, education, experience, certifications, and availability.<br><br>
What would you like to know?`;

    if (/thank|thanks|thx|appreciate/.test(q))
      return `You're welcome! 😊 If you have any more questions about Sivanesh, feel free to ask. Don't hesitate to reach out to him directly at <b>Sivaneshgk2001@gmail.com</b>`;

    if (/bye|goodbye|see you|later|cya/.test(q))
      return `Goodbye! 👋 Feel free to come back anytime. You can also reach Sivanesh directly at <b>Sivaneshgk2001@gmail.com</b>. Have a great day! 🌟`;

    return `That's a great question! I'm specifically trained on Sivanesh's portfolio. I can help you with:<br><br>
• 💡 <b>Skills</b> — ML, Python, React, Linux...<br>
• 🔬 <b>Projects</b> — ML Sales Prediction, Radiology CNN<br>
• 🎓 <b>Education</b> — ME/BE Computer Science<br>
• 💼 <b>Experience</b> — Internship at Vectra Technosoft<br>
• 📜 <b>Certifications</b> — IBM, Udemy courses<br>
• 📞 <b>Contact</b> — How to reach him<br><br>
Try asking one of the above! Or use the quick buttons above. 😊`;
  }

  function send() {
    const text = inp.value.trim();
    if (!text || busy) return;
    busy = true;
    sendBtn.disabled = true;
    addMsg('user', text);
    inp.value = ''; inp.style.height = 'auto';

    const qp = document.getElementById('chatQP');
    if (qp) qp.style.display = 'none';

    showTyping();
    setTimeout(() => {
      document.getElementById('tdot')?.remove();
      const reply = getBotReply(text);
      addMsg('bot', reply);
      busy = false;
      sendBtn.disabled = false;
      inp.focus();
    }, 900 + Math.random() * 600);
  }
}

// Resume print
function openResumePrint() {
  const resumeWindow = window.open('files/Resume.pdf', '_blank', 'width=900,height=700');
  
//   resumeWindow.onload = function () {
//     resumeWindow.print();
//   };
}

// Resume print in print html
function printResume() {
  const printWindow = window.open(
    'files/Resume.pdf',
    'ResumePrintWindow',
    'width=900,height=700,scrollbars=yes'
  );

//   printWindow.onload = function () {
//     printWindow.focus();
//     printWindow.print();

//     // Auto close after print dialog
//     printWindow.onafterprint = function () {
//       printWindow.close();
//     };
//   };
}