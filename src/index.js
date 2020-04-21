const pathMap = {
  '/transfer': () => {
    setTimeout(() => {
      const defaultValues = document.querySelectorAll('[data-testid=prop-default-value]');
      defaultValues.forEach((el) => {
        if (el.innerText === '[Empty string]') el.innerText = '""';
      });
    }, 100);
  },
  '/tree-select': () => {
    setTimeout(() => {
      const defaultValues = document.querySelectorAll('[data-testid=prop-default-value]');
      defaultValues.forEach((el) => {
        if (el.innerText.includes('Ant.')) el.innerText = el.innerText.replace(/Ant\./g, '');
      });
      const types = document.querySelectorAll('[data-testid=prop-type]');
      types.forEach((el) => {
        if (el.innerText.includes('Ant.')) el.innerText = el.innerText.replace(/Ant\./g, '');
      });
    }, 100);
  },
};

if (typeof window !== 'undefined') {
  window.onload = function() {
    let path = window.location.pathname;

    const onEnter = () => {
      Object.entries(pathMap).forEach(([key, fn]) => {
        if (key === 'all') return fn();
        if (key.includes(path)) return fn();
      });
    };

    onEnter();

    const body = document.querySelector('body');
    const observer = new MutationObserver(() => {
      const newPath = window.location.pathname;
      if (path === newPath) return;
      path = newPath;
      onEnter();
    });

    observer.observe(body, { childList: true, subtree: true });
  };
}
