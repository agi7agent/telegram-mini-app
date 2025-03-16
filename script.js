:root {
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-button-color: #2481cc;
    --tg-theme-button-text-color: #ffffff;
    --tg-theme-section-bg-color: #f4f4f4;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    padding: 20px;
    margin: 0;
}

.header {
    text-align: center;
    margin-bottom: 30px;
}

.hotel-photo {
    width: 100%;
    max-width: 600px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
    margin: 0 auto 20px;
    display: block;
}

.button-group {
    display: grid;
    gap: 15px;
    margin-bottom: 25px;
}

.tg-button {
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 8px;
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s;
}

.services-list {
    background: var(--tg-theme-section-bg-color);
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    display: none;
}

@media (max-width: 480px) {
    .hotel-photo {
        height: 150px;
    }
}
