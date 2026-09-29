(() => {
  const modal = document.querySelector('#wallet-modal');
  const closeButton = document.querySelector('.modal-close');
  const triggerButtons = document.querySelectorAll('.connect-trigger, a[href="#connect"]');
  const themeButton = document.querySelector('.theme-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.desktop-nav');
  const toast = document.querySelector('.toast');
  let previousFocus = null;
  let toastTimer;

  const openModal = (event) => {
    event?.preventDefault();
    previousFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    previousFocus?.focus();
  };
  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  };

  triggerButtons.forEach((button) => button.addEventListener('click', openModal));
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });
  document.querySelectorAll('.wallet-option').forEach((button) => {
    button.addEventListener('click', () => {
      const walletName = button.querySelector('b').textContent;
      closeModal();
      showToast(`${walletName} connection is part of the interactive preview.`);
    });
  });

  const savedTheme = localStorage.getItem('stakewell-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark');
  themeButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('stakewell-theme', isDark ? 'dark' : 'light');
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('mobile-open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navigation.classList.remove('mobile-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
  }));
})();
