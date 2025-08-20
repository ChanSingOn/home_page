// 加载导航栏和页脚
document.addEventListener('DOMContentLoaded', function() {
    // 加载导航栏
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            
            // 导航栏交互
            setupNavbar();
            
            // 设置当前页面的活跃导航链接
            setActiveNavLink();
        });
    
    // 加载页脚
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

    // 初始化卡片动画
    initCardAnimations();
});

// 导航栏交互设置
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // 滚动时改变导航栏样式
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
}

// 设置当前页面的活跃导航链接
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        
        // 首页特殊处理
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
            if (linkPath.endsWith('index.html') || linkPath === '/') {
                link.classList.add('active');
            }
        } 
        // 其他页面处理
        else if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
}

// 卡片动画初始化
function initCardAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有带fade-in类的元素
    document.querySelectorAll('.fade-in').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 分类按钮交互
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('category-btn')) {
        // 移除所有按钮的active类
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 给当前点击的按钮添加active类
        e.target.classList.add('active');
    }
});
