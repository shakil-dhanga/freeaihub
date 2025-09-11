
        // Enhanced visitor counter with realistic growth
        function updateVisitorCount() {
            let baseCount = 2847;
            let storedCount = parseInt(localStorage.getItem('freeaihub_visitors') || baseCount);
            
            // Add realistic increments based on time and activity
            let now = new Date();
            let lastUpdate = parseInt(localStorage.getItem('freeaihub_lastupdate') || now.getTime());
            let timeDiff = now.getTime() - lastUpdate;
            
            // Add visitors based on time elapsed (more realistic)
            let hoursElapsed = Math.floor(timeDiff / (1000 * 60 * 60));
            let newVisitors = Math.floor(Math.random() * 5) + hoursElapsed * Math.floor(Math.random() * 8) + 1;
            
            storedCount += newVisitors;
            
            localStorage.setItem('freeaihub_visitors', storedCount);
            localStorage.setItem('freeaihub_lastupdate', now.getTime());
            
            return storedCount;
        }

        // Animate numbers counting up
        function animateCounter(element, target) {
            let current = 0;
            let increment = target / 60;
            let timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current).toLocaleString();
            }, 25);
        }

        // Newsletter subscription with better UX
        function subscribeNewsletter() {
            const emailInput = document.getElementById('emailInput');
            const button = emailInput.nextElementSibling;
            const email = emailInput.value.trim();
            
            if (!email || !email.includes('@') || email.length < 5) {
                emailInput.style.border = '2px solid #ff6b6b';
                emailInput.focus();
                return;
            }
            
            // Reset border
            emailInput.style.border = 'none';
            
            // Button loading state
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    alert('🎉 Welcome to FreeAI Hub! \n\nThank you for subscribing to our newsletter. You\'ll receive weekly updates about the latest free AI tools and exclusive resources.\n\nCheck your email for a confirmation message.');
                    emailInput.value = '';
                    button.innerHTML = originalText;
                    button.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
                    button.disabled = false;
                }, 1000);
                
                // Track subscription
                let subscribers = parseInt(localStorage.getItem('newsletter_subscribers') || '1240');
                subscribers++;
                localStorage.setItem('newsletter_subscribers', subscribers);
            }, 1500);
        }

        // Real-time updates with more dynamic data
        function updateLiveStats() {
            const visitorCount = updateVisitorCount();
            const dailyUsers = Math.floor(Math.random() * 100) + 150; // 150-250
            
            // Animate main counters
            animateCounter(document.getElementById('visitorCount'), visitorCount);
            animateCounter(document.getElementById('dailyUsers'), dailyUsers);
            
            // Update footer stats
            document.getElementById('footerVisitors').textContent = visitorCount.toLocaleString();
            document.getElementById('footerCountries').textContent = '45+';
        }

        // Tool click tracking with analytics
        function trackToolClick(toolName, url) {
            let clicks = JSON.parse(localStorage.getItem('tool_clicks') || '{}');
            clicks[toolName] = (clicks[toolName] || 0) + 1;
            localStorage.setItem('tool_clicks', JSON.stringify(clicks));
            
            // Update daily users count
            let dailyClicks = parseInt(localStorage.getItem('daily_clicks') || '0') + 1;
            localStorage.setItem('daily_clicks', dailyClicks);
        }

        // Smooth scrolling with offset for fixed header
        function smoothScroll(target) {
            const element = document.querySelector(target);
            if (element) {
                const offsetTop = element.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Enhanced scroll animations
        function handleScrollAnimations() {
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            animateElements.forEach(element => {
                observer.observe(element);
            });
        }

        // Dynamic greeting based on time and location
        function updateGreeting() {
            const hour = new Date().getHours();
            const heroTitle = document.getElementById('heroTitle');
            let greeting = 'Welcome to';
            
            if (hour >= 5 && hour < 12) {
                greeting = 'Good Morning! Discover';
            } else if (hour >= 12 && hour < 17) {
                greeting = 'Good Afternoon! Explore';
            } else if (hour >= 17 && hour < 22) {
                greeting = 'Good Evening! Browse';
            } else {
                greeting = 'Working Late? Find';
            }
            
            heroTitle.innerHTML = `${greeting}<br>Free AI Tools Hub`;
        }

        // Floating Action Button functionality
        function initFAB() {
            const fab = document.getElementById('scrollToTop');
            
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    fab.classList.add('visible');
                } else {
                    fab.classList.remove('visible');
                }
            });
            
            fab.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // Enhanced tool card interactions
        function initToolCards() {
            document.querySelectorAll('.tool-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.03)';
                    this.style.boxShadow = '0 30px 70px rgba(0, 0, 0, 0.25)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
                });
            });
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Update greeting and stats
            updateGreeting();
            updateLiveStats();
            
            // Initialize animations and interactions
            handleScrollAnimations();
            initFAB();
            initToolCards();
            
            // Update stats every 45 seconds
            setInterval(updateLiveStats, 45000);
            
            // Add click tracking to all tool links
            document.querySelectorAll('.tool-link').forEach(link => {
                link.addEventListener('click', function() {
                    trackToolClick(this.textContent.trim(), this.href);
                });
            });
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    smoothScroll(this.getAttribute('href'));
                });
            });
            
            // Enter key support for newsletter
            document.getElementById('emailInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    subscribeNewsletter();
                }
            });
        });

        // Tool submission functionality
        function submitTool() {
            const toolName = document.getElementById('toolName').value.trim();
            const toolUrl = document.getElementById('toolUrl').value.trim();
            const toolDescription = document.getElementById('toolDescription').value.trim();
            const button = event.target;
            
            if (!toolName || !toolUrl) {
                alert('Please fill in at least the tool name and URL.');
                return;
            }
            
            // Basic URL validation
            try {
                new URL(toolUrl);
            } catch {
                alert('Please enter a valid URL.');
                return;
            }
            
            // Button loading state
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            button.disabled = true;
            
            // Simulate submission
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i> Submitted!';
                button.style.background = 'linear-gradient(45deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    alert(`🎉 Thank you for submitting "${toolName}"!\n\nWe'll review it and add it to our collection if it meets our criteria for free AI tools.\n\nYou're helping make AI more accessible to everyone!`);
                    
                    // Clear form
                    document.getElementById('toolName').value = '';
                    document.getElementById('toolUrl').value = '';
                    document.getElementById('toolDescription').value = '';
                    
                    // Reset button
                    button.innerHTML = originalText;
                    button.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a52)';
                    button.disabled = false;
                    
                    // Track submission
                    let submissions = parseInt(localStorage.getItem('tool_submissions') || '0') + 1;
                    localStorage.setItem('tool_submissions', submissions);
                }, 1000);
            }, 1500);
        }

       
       //test
        function updateVisitorCount() {
            let baseCount = 3247;
            let storedCount = parseInt(localStorage.getItem('freeaihub_visitors') || baseCount);
            
            // Time-based realistic increments
            let now = new Date();
            let lastUpdate = parseInt(localStorage.getItem('freeaihub_lastupdate') || now.getTime());
            let timeDiff = now.getTime() - lastUpdate;
            
            // More realistic visitor patterns
            let minutesElapsed = Math.floor(timeDiff / (1000 * 60));
            let hour = now.getHours();
            
            // Peak hours: 9-11 AM and 2-5 PM have more visitors
            let peakMultiplier = (hour >= 9 && hour <= 11) || (hour >= 14 && hour <= 17) ? 1.5 : 1;
            
            let newVisitors = Math.floor(Math.random() * 3) + 
                             Math.floor(minutesElapsed * Math.random() * 0.8 * peakMultiplier) + 1;
            
            storedCount += newVisitors;
            
            localStorage.setItem('freeaihub_visitors', storedCount);
            localStorage.setItem('freeaihub_lastupdate', now.getTime());
            
            return storedCount;
        }

        // Enhanced real-time updates with more dynamic data
        function updateLiveStats() {
            const visitorCount = updateVisitorCount();
            const dailyUsers = Math.floor(Math.random() * 150) + 200; // 200-350
            const hour = new Date().getHours();
            
            // Adjust daily users based on time of day
            const timeMultiplier = hour >= 9 && hour <= 17 ? 1.2 : 0.8;
            const adjustedDailyUsers = Math.floor(dailyUsers * timeMultiplier);
            
            // Animate main counters
            animateCounter(document.getElementById('visitorCount'), visitorCount);
            animateCounter(document.getElementById('dailyUsers'), adjustedDailyUsers);
            
            // Update footer stats
            document.getElementById('footerVisitors').textContent = visitorCount.toLocaleString();
        }

        // Add scroll-triggered counting animation
        function initStatsAnimation() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateLiveStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const statsSection = document.querySelector('.live-stats');
            if (statsSection) {
                observer.observe(statsSection);
            }
        }

        // Initialize everything when page loads
        document.addEventListener('DOMContentLoaded', function() {
            // Update greeting and initialize stats animation
            updateGreeting();
            initStatsAnimation();
            
            // Initialize animations and interactions
            handleScrollAnimations();
            initFAB();
            initToolCards();
            
            // Update stats every 45 seconds
            setInterval(updateLiveStats, 45000);
            
            // Add click tracking to all tool links
            document.querySelectorAll('.tool-link').forEach(link => {
                link.addEventListener('click', function() {
                    trackToolClick(this.textContent.trim(), this.href);
                });
            });
            
            // Smooth scrolling for navigation
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    smoothScroll(this.getAttribute('href'));
                });
            });
            
            // Enter key support for newsletter and tool submission
            document.getElementById('emailInput').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    subscribeNewsletter();
                }
            });
            
            // Enter key support for tool submission form
            document.querySelectorAll('.submit-form input, .submit-form textarea').forEach(input => {
                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter' && e.ctrlKey) {
                        submitTool();
                    }
                });
            });
            
            // Add featured tools hover effects
            document.querySelectorAll('.featured-card').forEach(card => {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-15px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Add testimonial card animations
            document.querySelectorAll('.testimonial-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
                card.classList.add('animate-on-scroll');
            });
            
            // Add news card animations
            document.querySelectorAll('.news-card').forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
                card.classList.add('animate-on-scroll');
            });
        });

        // Performance monitoring and analytics
        window.addEventListener('load', function() {
            const loadTime = performance.now();
            console.log(`🚀 FreeAI Hub loaded in ${Math.round(loadTime)}ms`);
            
            // Track page load and performance
            let pageLoads = parseInt(localStorage.getItem('page_loads') || '0') + 1;
            localStorage.setItem('page_loads', pageLoads);
            
            // Track load time for analytics
            let avgLoadTime = parseFloat(localStorage.getItem('avg_load_time') || '0');
            avgLoadTime = (avgLoadTime + loadTime) / 2;
            localStorage.setItem('avg_load_time', avgLoadTime.toFixed(2));
        });

        // Track user engagement
        let engagementStartTime = Date.now();
        let maxScroll = 0;

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);
        });

        window.addEventListener('beforeunload', () => {
            const timeOnSite = Math.round((Date.now() - engagementStartTime) / 1000);
            localStorage.setItem('avg_time_on_site', timeOnSite);
            localStorage.setItem('max_scroll_depth', maxScroll);
        });
    

    // Tool 1: Image to Text (using Tesseract.js)
function extractText() {
  const input = document.getElementById("imageInput");
  const result = document.getElementById("ocrResult");

  if (input.files.length === 0) {
    alert("Please upload an image first!");
    return;
  }

  const file = input.files[0];
  result.innerText = "Processing...";

  Tesseract.recognize(file, 'eng')
    .then(({ data: { text } }) => {
      result.innerText = text;
    })
    .catch(err => {
      result.innerText = "Error: " + err.message;
    });
}

// Tool 2: Text to PDF (using jsPDF)
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const text = document.getElementById("pdfText").value;

  if (!text.trim()) {
    alert("Please enter some text.");
    return;
  }

  doc.text(text, 10, 10);
  doc.save("document.pdf");
}

// Tool 3: AI Idea Generator (dummy example)
function generateIdea() {
  const ideas = [
    "Build a personal AI resume analyzer",
    "Create a meme generator with AI",
    "Develop an AI chatbot for study help",
    "Launch a tool that summarizes YouTube videos"
  ];
  const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
  document.getElementById("ideaResult").innerText = randomIdea;
}


// Tool 4: Text Summarizer (basic sentence cut)
// Tool 4: Text Case Converter
function convertCase(type) {
  const input = document.getElementById("caseInput").value.trim();
  const result = document.getElementById("caseResult");

  if (!input) {
    result.innerText = "⚠️ Please enter some text first.";
    return;
  }

  let output = "";

  switch (type) {
    case "upper":
      output = input.toUpperCase();
      break;
    case "lower":
      output = input.toLowerCase();
      break;
    case "title":
      output = input
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      break;
    case "capitalized":
      output = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
      break;
  }

  result.innerText = output;
}


// Tool 5: Word Counter
function countWords() {
  const input = document.getElementById("wordInput").value.trim();
  const result = document.getElementById("wordResult");

  if (!input) {
    result.innerText = "Please enter text to count.";
    return;
  }

  const words = input.split(/\s+/).length;
  const chars = input.length;
  result.innerText = `Words: ${words}, Characters: ${chars}`;
}

// Tool 6: QR Code Generator (using QRCode.js)
function generateQR() {
  const qrText = document.getElementById("qrInput").value.trim();
  const qrContainer = document.getElementById("qrCode");

  if (!qrText) {
    qrContainer.innerHTML = "<p>Please enter text or URL.</p>";
    return;
  }

  qrContainer.innerHTML = ""; // clear old QR
  new QRCode(qrContainer, {
    text: qrText,
    width: 150,
    height: 150
  });
}
