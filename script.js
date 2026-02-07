// Konami Code Detection
class KonamiCode {
    constructor() {
        this.sequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'b', 'a'
        ];
        this.userSequence = [];
        this.isActive = false;
        
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.key);
        });
    }
    
    handleKeyPress(keyCode) {
        // Add the key to user sequence
        this.userSequence.push(keyCode);
        
        // Keep only the last 10 keys (length of Konami code)
        if (this.userSequence.length > this.sequence.length) {
            this.userSequence.shift();
        }
        
        // Check if sequence matches
        if (this.userSequence.length === this.sequence.length) {
            if (this.checkSequence()) {
                this.activateEasterEgg();
            }
        }
    }
    
    checkSequence() {
        return this.userSequence.every((key, index) => key.toLowerCase() === this.sequence[index].toLowerCase());
    }
    
    activateEasterEgg() {
        if (this.isActive) return;
        
        this.isActive = true;
        console.log('🎉 Konami Code activated!');
        
        // Start Matrix effect
        matrixEffect.start();
        
        // Show "Hello there" message
        this.showMessage();
        
        // Reset after 5 seconds
        setTimeout(() => {
            this.reset();
        }, 5000);
    }
    
    showMessage() {
        const messageElement = document.getElementById('easter-egg-message');
        messageElement.classList.add('show');
        
        // Hide message after 4 seconds
        setTimeout(() => {
            messageElement.classList.remove('show');
        }, 4000);
    }
    
    reset() {
        this.isActive = false;
        this.userSequence = [];
        matrixEffect.stop();
        console.log('Easter egg deactivated');
    }
}

// Matrix Rain Effect
class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isRunning = false;
        this.animationId = null;
        
        // Matrix characters (mix of Latin, Japanese, and symbols)
        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' +
                    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン' +
                    '!@#$%^&*()_+-=[]{}|;:,.<>?';
        this.charArray = this.chars.split('');
        
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        
        this.setupCanvas();
        this.setupColumns();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.setupCanvas();
            this.setupColumns();
        });
    }
    
    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.fontSize}px monospace`;
    }
    
    setupColumns() {
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.floor(Math.random() * -100);
        }
    }
    
    draw() {
        // Semi-transparent black background for trail effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Matrix green text
        this.ctx.fillStyle = '#00ff41';
        this.ctx.textAlign = 'start';
        
        for (let i = 0; i < this.drops.length; i++) {
            // Random character
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            
            // Calculate position
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            // Draw character with glow effect
            this.ctx.shadowColor = '#00ff41';
            this.ctx.shadowBlur = 10;
            this.ctx.fillText(char, x, y);
            this.ctx.shadowBlur = 0;
            
            // Reset drop to top randomly
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            // Move drop down
            this.drops[i]++;
        }
    }
    
    animate() {
        this.draw();
        if (this.isRunning) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.canvas.classList.add('active');
        
        // Reset drops
        this.setupColumns();
        
        this.animate();
    }
    
    stop() {
        this.isRunning = false;
        this.canvas.classList.remove('active');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        // Clear canvas gradually
        setTimeout(() => {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }, 500);
    }
}

// Terminal Typing Effect
class TerminalTyping {
    constructor() {
        this.init();
    }
    
    init() {
        // Add some interactive elements
        this.setupControlButtons();
        this.setupHoverEffects();
    }
    
    setupControlButtons() {
        const controls = document.querySelectorAll('.control');
        controls.forEach(control => {
            control.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (control.classList.contains('close')) {
                    this.simulateClose();
                } else if (control.classList.contains('minimize')) {
                    this.simulateMinimize();
                } else if (control.classList.contains('maximize')) {
                    this.simulateMaximize();
                }
            });
        });
    }
    
    setupHoverEffects() {
        // Add hover effects to skill items
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add hover effects to hobby items
        const hobbyItems = document.querySelectorAll('.hobby-item');
        hobbyItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    simulateClose() {
        document.body.style.transform = 'scale(0.95)';
        document.body.style.opacity = '0.5';
        
        setTimeout(() => {
            document.body.style.transform = 'scale(1)';
            document.body.style.opacity = '1';
        }, 300);
    }
    
    simulateMinimize() {
        const container = document.querySelector('.container');
        container.style.transform = 'scale(0.9) translateY(10px)';
        container.style.opacity = '0.7';
        
        setTimeout(() => {
            container.style.transform = 'scale(1) translateY(0)';
            container.style.opacity = '1';
        }, 500);
    }
    
    simulateMaximize() {
        const crtScreen = document.querySelector('.crt-screen');
        crtScreen.style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            crtScreen.style.transform = 'scale(1)';
        }, 300);
    }
}

// CRT Effect Enhancement
class CRTEffect {
    constructor() {
        this.init();
    }
    
    init() {
        // Random flicker effect
        setInterval(() => {
            if (Math.random() < 0.02) {
                this.flicker();
            }
        }, 100);
        
        // Subtle screen distortion on mouse movement
        document.addEventListener('mousemove', (e) => {
            this.addDistortion(e);
        });
    }
    
    flicker() {
        const crtScreen = document.querySelector('.crt-screen');
        crtScreen.style.filter = 'brightness(1.1) contrast(1.05)';
        
        setTimeout(() => {
            crtScreen.style.filter = '';
        }, 50);
    }
    
    addDistortion(event) {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        
        const distortionX = (clientX / innerWidth - 0.5) * 2;
        const distortionY = (clientY / innerHeight - 0.5) * 2;
        
        document.documentElement.style.setProperty(
            '--mouse-distortion-x',
            `${distortionX * 0.5}px`
        );
        document.documentElement.style.setProperty(
            '--mouse-distortion-y',
            `${distortionY * 0.5}px`
        );
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    const konamiCode = new KonamiCode();
    window.matrixEffect = new MatrixEffect();
    const terminalTyping = new TerminalTyping();
    const crtEffect = new CRTEffect();
    
    // Add console welcome message
    console.log('%c🎮 Welcome to Jym\'s Terminal! 🎮', 
        'color: #00ff41; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
    console.log('%cTry the Konami Code: ↑↑↓↓←→←→BA', 
        'color: #00ffff; font-size: 12px; text-shadow: 0 0 5px #00ffff;');
    
    // Easter egg hint
    console.log('%c🥚 Hidden features await those who remember the classics...', 
        'color: #ff0080; font-size: 10px; font-style: italic;');
    
    // Add some random terminal-like messages to console
    setTimeout(() => {
        console.log('%c[SYSTEM] Matrix protocols loaded...', 'color: #00ff41; font-family: monospace;');
    }, 2000);
    
    setTimeout(() => {
        console.log('%c[SYSTEM] CRT effects initialized...', 'color: #00ffff; font-family: monospace;');
    }, 3000);
    
    setTimeout(() => {
        console.log('%c[SYSTEM] All systems operational. May the Force be with you.', 'color: #ffff00; font-family: monospace;');
    }, 4000);
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + M for Matrix mode
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyM') {
        e.preventDefault();
        if (window.matrixEffect.isRunning) {
            window.matrixEffect.stop();
            console.log('Matrix mode deactivated');
        } else {
            window.matrixEffect.start();
            console.log('Matrix mode activated');
        }
    }
    
    // Ctrl + Shift + R for retro mode
    if (e.ctrlKey && e.shiftKey && e.code === 'KeyR') {
        e.preventDefault();
        document.body.classList.toggle('retro-mode');
        console.log('Retro mode toggled');
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%c⚡ Page loaded in ${loadTime}ms`, 'color: #00ff41; font-weight: bold;');
    });
}