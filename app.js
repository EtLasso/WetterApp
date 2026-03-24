const elements = {
    form: document.getElementById('search-form'),
    input: document.getElementById('city-input'),
    locationButton: document.getElementById('location-button'),
    status: document.getElementById('status'),
    locationName: document.getElementById('location-name'),
    timestamp: document.getElementById('timestamp'),
    temperature: document.getElementById('temperature'),
    weatherSummary: document.getElementById('weather-summary'),
    weatherIcon: document.getElementById('weather-icon'),
    feelsLike: document.getElementById('feels-like'),
    windSpeed: document.getElementById('wind-speed'),
    humidity: document.getElementById('humidity'),
    precipitation: document.getElementById('precipitation'),
    forecastList: document.getElementById('forecast-list')
};

const weatherCodes = {
    0: { icon: '☀️', text: 'Klarer Himmel' },
    1: { icon: '🌤️', text: 'Meist klar' },
    2: { icon: '⛅', text: 'Teilweise bewölkt' },
    3: { icon: '☁️', text: 'Bedeckt' },
    45: { icon: '🌫️', text: 'Neblig' },
    48: { icon: '🌫️', text: 'Raureifnebel' },
    51: { icon: '🌦️', text: 'Leichter Nieselregen' },
    53: { icon: '🌦️', text: 'Nieselregen' },
    55: { icon: '🌧️', text: 'Starker Nieselregen' },
    61: { icon: '🌦️', text: 'Leichter Regen' },
    63: { icon: '🌧️', text: 'Regen' },
    65: { icon: '🌧️', text: 'Starker Regen' },
    71: { icon: '🌨️', text: 'Leichter Schneefall' },
    73: { icon: '❄️', text: 'Schneefall' },
    75: { icon: '❄️', text: 'Starker Schneefall' },
    80: { icon: '🌦️', text: 'Regenschauer' },
    81: { icon: '🌧️', text: 'Kräftige Schauer' },
    82: { icon: '⛈️', text: 'Heftige Schauer' },
    95: { icon: '⛈️', text: 'Gewitter' },
    96: { icon: '⛈️', text: 'Gewitter mit Hagel' },
    99: { icon: '⛈️', text: 'Starkes Gewitter mit Hagel' }
};

const isFileProtocol = window.location.protocol === 'file:';

function setStatus(message, isError = false) {
    elements.status.textContent = message;
    elements.status.classList.toggle('error', isError);
}

function getWeatherInfo(code) {
    return weatherCodes[code] || { icon: '🌡️', text: 'Unbekanntes Wetter' };
}

function formatDay(dateString) {
    return new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit'
    }).format(new Date(dateString));
}

function formatDateTime(dateString) {
    return new Intl.DateTimeFormat('de-DE', {
        dateStyle: 'medium',
        timeStyle: 'short'
    }).format(new Date(dateString));
}

function renderWeather(placeName, data) {
    const current = data.current;
    const daily = data.daily;
    const info = getWeatherInfo(current.weather_code);

    elements.locationName.textContent = placeName;
    elements.timestamp.textContent = `Aktualisiert: ${formatDateTime(current.time)}`;
    elements.temperature.textContent = `${Math.round(current.temperature_2m)}°`;
    elements.weatherSummary.textContent = info.text;
    elements.weatherIcon.textContent = info.icon;
    elements.feelsLike.textContent = `${Math.round(current.apparent_temperature)} °C`;
    elements.windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    elements.humidity.textContent = `${Math.round(current.relative_humidity_2m)} %`;
    elements.precipitation.textContent = `${current.precipitation.toFixed(1)} mm`;

    elements.forecastList.innerHTML = '';

    daily.time.slice(0, 5).forEach((day, index) => {
        const dayInfo = getWeatherInfo(daily.weather_code[index]);
        const item = document.createElement('div');
        item.className = 'forecast-item';
        item.innerHTML = `
            <div>
                <div class="forecast-day">${formatDay(day)}</div>
                <div class="forecast-desc">${dayInfo.icon} ${dayInfo.text}</div>
            </div>
            <div class="forecast-temp">${Math.round(daily.temperature_2m_max[index])}°</div>
            <div class="forecast-temp" style="color: var(--muted);">${Math.round(daily.temperature_2m_min[index])}°</div>
        `;
        elements.forecastList.appendChild(item);
    });
}

async function loadWeatherByCoords(lat, lon, label) {
    setStatus(`Lade Wetterdaten für ${label} ...`);

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.search = new URLSearchParams({
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto',
        forecast_days: '5'
    }).toString();

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Wetterdaten konnten nicht geladen werden.');
    }

    const data = await response.json();
    renderWeather(label, data);
    setStatus(`Wetterdaten erfolgreich geladen für ${label}.`);
}

async function searchCity(city) {
    setStatus(`Suche Standort für ${city} ...`);

    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.search = new URLSearchParams({
        name: city,
        count: '1',
        language: 'de',
        format: 'json'
    }).toString();

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Standortsuche fehlgeschlagen.');
    }

    const data = await response.json();
    if (!data.results || !data.results.length) {
        throw new Error('Keine Stadt gefunden. Bitte Eingabe pruefen.');
    }

    const place = data.results[0];
    const labelParts = [place.name, place.admin1, place.country].filter(Boolean);
    await loadWeatherByCoords(place.latitude, place.longitude, labelParts.join(', '));
}

elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = elements.input.value.trim();

    if (!city) {
        setStatus('Bitte zuerst eine Stadt eingeben.', true);
        return;
    }

    try {
        await searchCity(city);
    } catch (error) {
        setStatus(error.message, true);
    }
});

elements.locationButton.addEventListener('click', () => {
    if (isFileProtocol) {
        setStatus('Standortzugriff funktioniert nur ueber localhost oder https.', true);
        return;
    }

    if (!navigator.geolocation) {
        setStatus('Geolocation wird von diesem Browser nicht unterstuetzt.', true);
        return;
    }

    setStatus('Standort wird ermittelt ...');
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                await loadWeatherByCoords(
                    position.coords.latitude,
                    position.coords.longitude,
                    'Dein Standort'
                );
            } catch (error) {
                setStatus(error.message, true);
            }
        },
        () => {
            setStatus('Standort konnte nicht abgerufen werden.', true);
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});

if (isFileProtocol) {
    setStatus('Datei lokal geoeffnet. Suche funktioniert, Standort nur ueber localhost oder https.');
}

searchCity('Berlin').catch((error) => {
    setStatus(error.message, true);
});
