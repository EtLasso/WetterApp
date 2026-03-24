<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WetterApp</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="app">
        <section class="hero">
            <h1>WetterApp</h1>
            <p>Suche nach einer Stadt oder nutze deinen Standort. Die App lädt aktuelle Wetterdaten und eine kompakte 5-Tage-Vorschau über Open-Meteo.</p>
        </section>

        <section class="controls">
            <form class="search-box" id="search-form">
                <input id="city-input" type="text" placeholder="Stadt eingeben, z. B. Berlin" autocomplete="off">
                <button class="primary" type="submit">Wetter laden</button>
            </form>
            <button class="ghost" id="location-button" type="button">Mein Standort</button>
        </section>

        <p class="status" id="status">Lade Standardwetter für Berlin ...</p>

        <section class="content">
            <article class="panel">
                <div class="current-top">
                    <div>
                        <h2 class="location" id="location-name">Berlin</h2>
                        <div class="timestamp" id="timestamp">Aktualisiere Daten ...</div>
                    </div>
                    <div class="summary">Open-Meteo</div>
                </div>

                <div class="temp-row">
                    <div class="weather-icon" id="weather-icon">☀️</div>
                    <div>
                        <div class="temperature" id="temperature">--°</div>
                        <div class="summary" id="weather-summary">Wetterdaten werden geladen</div>
                    </div>
                </div>

                <div class="metrics">
                    <div class="metric">
                        <span>Gefühlt</span>
                        <strong id="feels-like">-- °C</strong>
                    </div>
                    <div class="metric">
                        <span>Wind</span>
                        <strong id="wind-speed">-- km/h</strong>
                    </div>
                    <div class="metric">
                        <span>Luftfeuchte</span>
                        <strong id="humidity">-- %</strong>
                    </div>
                    <div class="metric">
                        <span>Niederschlag</span>
                        <strong id="precipitation">-- mm</strong>
                    </div>
                </div>
            </article>

            <aside class="panel">
                <div class="forecast-header">
                    <h2>5 Tage</h2>
                    <span class="summary">Max / Min</span>
                </div>
                <div class="forecast-list" id="forecast-list"></div>
            </aside>
        </section>
    </main>

    <script src="app.js"></script>
</body>
</html>
