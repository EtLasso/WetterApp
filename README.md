# [WetterApp](https://etlasso.github.io/WetterApp/)

Eine kleine Wetteranwendung mit HTML, CSS und JavaScript. Die App zeigt aktuelle Wetterdaten sowie eine kompakte 5-Tage-Vorschau auf Basis der Open-Meteo APIs.

## Funktionen

- Suche nach einer Stadt
- Abruf des Wetters fuer den aktuellen Standort
- Aktuelle Temperatur, gefuehlte Temperatur, Wind, Luftfeuchte und Niederschlag
- 5-Tage-Vorhersage
- Start per `start.bat` oder lokalem PHP-Server

## Voraussetzungen

- PHP im Systempfad
- Internetverbindung fuer die Open-Meteo API
- Ein Browser mit aktiviertem JavaScript

## Projekt starten

Direkt im Browser:

Klicke auf den Namen [WetterApp](https://etlasso.github.io/WetterApp/) oder auf diesen Link, um die App direkt im Browser zu starten:

[WetterApp direkt öffnen](https://etlasso.github.io/WetterApp/)

Lokal starten:

Variante 1:

```bat
start.bat
```

Variante 2:

```bash
php -S localhost:8000 -t .
```

Danach im Browser oeffnen:

```text
http://localhost:8000/
```

## Projektstruktur

- `index.html` enthaelt das Markup der Anwendung
- `app.js` steuert die API-Aufrufe und das Rendering
- `style.css` definiert das Layout und Styling
- `start.bat` startet den lokalen PHP-Server

## Datenquellen

- Geocoding: Open-Meteo Geocoding API
- Wetterdaten: Open-Meteo Forecast API

## Hinweis

Standortzugriff funktioniert nur ueber `localhost` oder `https`, nicht beim direkten Oeffnen der Datei ueber `file://`.
