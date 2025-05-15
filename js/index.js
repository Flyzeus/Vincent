// 预加载动画
		window.addEventListener('load', function() {
		  const preloader = document.querySelector('.preloader');
		  preloader.style.display = 'none';
		});
		
		// 打字机效果
		document.addEventListener('DOMContentLoaded', function() {
		  // 职业打字效果
		  const profText = "设计师/摄影师/修图师";
		  const profElement = document.getElementById('prof');
		  let i = 0;
		  
		  function typeWriter() {
		    if (i < profText.length) {
		      profElement.innerHTML += profText.charAt(i);
		      i++;
		      setTimeout(typeWriter, 100);
		    }
		  }
		  
		  typeWriter();
		
		  // 粘性导航
		  window.addEventListener('scroll', function() {
		    const header = document.querySelector('header');
		    const navbar = document.querySelector('.navbar');
		    if (window.scrollY > 100) {
		      header.classList.add('sticky');
		      navbar.classList.add('sticky');
		    } else {
		      header.classList.remove('sticky');
		      navbar.classList.remove('sticky');
		    }
		  });
		
		  // 平滑滚动导航链接
		  document.querySelectorAll('.nav-link').forEach(link => {
		    link.addEventListener('click', function(e) {
		      e.preventDefault();
		      const targetId = this.getAttribute('href');
		      const targetSection = document.querySelector(targetId);
		      
		      window.scrollTo({
		        top: targetSection.offsetTop - 80,
		        behavior: 'smooth'
		      });
		      
		      // 更新导航中的活动类
		      document.querySelectorAll('.nav-link').forEach(item => {
		        item.classList.remove('active');
		      });
		      this.classList.add('active');
		    });
		  });
		
		  // 移动端菜单切换
		  const menuBtn = document.getElementById('menu-btn');
		  const navList = document.querySelector('.navbar .list');
		  
		  if (menuBtn) {
		    menuBtn.addEventListener('click', function() {
		      navList.classList.toggle('active');
		      menuBtn.classList.toggle('fa-times');
		    });
		  }
		
		  // 点击链接后关闭移动菜单
		  document.querySelectorAll('.navbar .list a').forEach(link => {
		    link.addEventListener('click', function() {
		      navList.classList.remove('active');
		      menuBtn.classList.remove('fa-times');
		    });
		  });
		
		  // 表单提交
		  const contactForm = document.querySelector('.contact form');
		  if (contactForm) {
		    contactForm.addEventListener('submit', function(e) {
		      e.preventDefault();
		      // 这里通常会发送表单数据到服务器
		      alert('消息发送成功！');
		      this.reset();
		    });
		  }
		});
		
		// 切换暗黑模式
		function toggleDarkMode() {
		  document.body.classList.toggle('dark');
		  // 保存偏好到本地存储
		  const isDark = document.body.classList.contains('dark');
		  localStorage.setItem('darkMode', isDark);
		}
		
		// 检查保存的暗黑模式偏好
		if (localStorage.getItem('darkMode') === 'true') {
		  document.body.classList.add('dark');
		}

		// 打开技能作品集弹窗
		function openPortfolioModal(title, items) {
		  const modal = document.getElementById('portfolioModal');
		  const modalTitle = document.getElementById('portfolioModalTitle');
		  const portfolioGrid = document.getElementById('portfolioGrid');
		  
		  // 阻止背景滚动
		  document.body.classList.add('modal-open');
		  
		  modalTitle.textContent = title;
		  portfolioGrid.innerHTML = '';
		  
		  // 先填充内容
		  items.forEach(item => {
		    const portfolioItem = document.createElement('div');
		    portfolioItem.className = 'portfolio-item';
		    portfolioItem.innerHTML = `
		      <img src="${item.img}" alt="${item.title}" onclick="openWorkModal('${item.title}', '${item.img}', '${item.type}', ${item.video ? `'${item.video}'` : 'null'})">
		      <div class="portfolio-overlay">${item.title}</div>
		    `;
		    portfolioGrid.appendChild(portfolioItem);
		  });
		  
		  // 显示模态框
		  modal.style.display = 'block';
		  
		  // 确保DOM更新后重置滚动 - 使用setTimeout确保在渲染后执行
		  setTimeout(() => {
		    // 尝试所有可能的滚动容器
		    const scrollContainers = [
		      document.querySelector('.portfolio-container'),
		      document.querySelector('.modal-content'),
		      document.querySelector('#portfolioModal')
		    ];
		    
		    scrollContainers.forEach(container => {
		      if (container) {
		        container.scrollTop = 0;
		      }
		    });
		    
		    // 额外保险：直接滚动窗口到顶部
		    // window.scrollTo(0, 0);
		  }, 10);
		}
		
    // 打开作品详情弹窗
    function openWorkModal(title, img, type, videoUrl) {
      const modal = document.getElementById('workModal');
      const modalContent = document.getElementById('workModalContent');
      
      // 阻止背景滚动
      document.body.classList.add('modal-open');
      
      if (type === 'video') {
        modalContent.innerHTML = `
          <div class="video-container">
            <video class="video-player" controls autoplay>
              <source src="${videoUrl}" type="video/mp4">
              您的浏览器不支持视频播放。
            </video>
          </div>
        `;
      } else {
        modalContent.innerHTML = `<img class="work-modal-content" src="${img}" alt="${title}">`;
      }
      
      modal.style.display = 'block';
    }

    // 打开博客详情弹窗
    function openBlogModal(title, date, img, content) {
      const modal = document.getElementById('blogModal');
      const modalTitle = document.getElementById('blogModalTitle');
      const modalDate = document.getElementById('blogModalDate');
      const modalImg = document.getElementById('blogModalImg');
      const modalText = document.getElementById('blogModalText');
      
      // 阻止背景滚动
      document.body.classList.add('modal-open');
      
      modalTitle.textContent = title;
      modalDate.textContent = date;
      modalImg.src = img;
      modalText.innerHTML = content.replace(/\n\n/g, '<br><br>');
      
      modal.style.display = 'block';
    }

    // 关闭弹窗
    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
      // 恢复背景滚动
      document.body.classList.remove('modal-open');
      
      // 停止所有视频播放
      if (modalId === 'workModal') {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
        });
      }
    }

    // 点击弹窗外部关闭弹窗
    window.onclick = function(event) {
      if (event.target.className === 'modal' || event.target.className === 'work-modal') {
        event.target.style.display = 'none';
        // 恢复背景滚动
        document.body.classList.remove('modal-open');
        
        // 停止视频播放
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
          video.pause();
        });
      }
    }
	// 返回顶部按钮功能
	const backToTopBtn = document.getElementById('back-to-top');
	
	// 监听滚动显示/隐藏按钮
	window.addEventListener('scroll', () => {
	  if (window.pageYOffset > 300) {
	    backToTopBtn.classList.add('visible');
	  } else {
	    backToTopBtn.classList.remove('visible');
	  }
	});
	
	// 点击返回顶部
	backToTopBtn.addEventListener('click', () => {
	  window.scrollTo({
	    top: 0,
	    behavior: 'smooth' // 平滑滚动
	  });
	});