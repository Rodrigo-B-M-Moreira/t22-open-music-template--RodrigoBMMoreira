const moonIcon = 'src/icons/moon--icon.png';
const sunIcon = 'src/icons/sun--icon.png';

function initThemeToggle() {
    const themeButton = document.querySelector('.themeChanger');
    const body = document.body;

    let iconImg = themeButton.querySelector('img');
    if (!iconImg) {
        iconImg = document.createElement('img');
        iconImg.style.width = '24px';
        iconImg.style.height = '24px';
        themeButton.appendChild(iconImg);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        iconImg.src = sunIcon;
    } else {
        iconImg.src = moonIcon;
    }
    iconImg.alt = 'Ícone tema';

    themeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            iconImg.src = sunIcon;
            localStorage.setItem('theme', 'dark');
        } else {
            iconImg.src = moonIcon;
            localStorage.setItem('theme', 'light');
        }
    });
}

export { initThemeToggle };


