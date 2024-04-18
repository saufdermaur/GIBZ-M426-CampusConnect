
# Projektvorgehen für die Notenverwaltungsplattform

## Projektvorbereitung

### 1. **Teamzusammenstellung und Rollendefinition**
- Bildung eines cross-funktionalen Teams.
- Definition von Scrum-Rollen: Product Owner, Scrum Master, Entwicklerteam.

### 2. **Initialmeetings**
- **Kick-off-Meeting** zur Motivation und Klärung des Projektziels.
- **Vision und Ziele**: Definition durch den Product Owner.

## Projektplanung und Setup

### 3. **Erstellung des Product Backlogs**
- Der Product Owner erstellt mit dem Team das Product Backlog.

### 4. **Toolsetup**
- Auswahl von Tools für Zusammenarbeit, Kommunikation und Code-Verwaltung.

### 5. **Entwurf der Architektur**
- Erstellung eines Komponentendiagramms.
- Entscheidung über den technologischen Stack.

## Sprint-Zyklen

### 6. **Sprint Planning**
- Auswahl und Aufschlüsselung der User Stories für den Sprint.

### 7. **Daily Scrum**
- Tägliches Meeting zur Besprechung von Fortschritten und Hindernissen.

### 8. **Entwicklung**
- Umsetzung der Features und laufende Tests.

### 9. **Sprint Review**
- Demonstration der entwickelten Features und Sammeln von Feedback.

### 10. **Sprint Retrospektive**
- Reflexion und Identifizierung von Verbesserungsmöglichkeiten.

## Qualitätskontrolle und Dokumentation

### 11. **Tests**
- Durchführung von Unit- und Integrationstests.

### 12. **Dokumentation**
- Erstellung der technischen Dokumentation und Benutzeranleitung.

## Deployment und Übergabe

### 13. **CI/CD-Setup**
- Einrichtung von automatischen Builds und Deployment-Pipelines.

### 14. **Beta-Testing**
- Beta-Tests zur Sammlung von Feedback und zur Fehlerbehebung.

### 15. **Deployment**
- Veröffentlichung der Anwendung in der Produktionsumgebung.

## Projektabschluss

### 16. **Schlusspräsentation**
- Präsentation des fertigen Produkts und Diskussion über Erweiterungen.

### 17. **Projektreview und -abschluss**
- Abschließende Retrospektive und offizielle Projektabschlussdokumentation.


# Ideen für erste User Stories für die Notenverwaltungsplattform

## Setup und Grundkonfiguration

- **Technisch**: Git-Repository initialisieren, um den Code zu versionieren und zusammenzuarbeiten.
- **Technisch**: Datenbank aufsetzen, um Benutzerdaten, Noten, Fächer, Klassen und Prüfungen zu speichern.

## Basisfunktionalitäten

- **Lehrer**: Anwendung einloggen können, um auf Lehrerfunktionen zugreifen zu können.
- **Schüler**: Anwendung einloggen können, um persönliche Noten und Prüfungstermine einsehen zu können.
- **Lehrer**: Möglichkeit haben, neue Fächer zu erstellen.
- **Lehrer**: Neue Klassen erstellen können.
- **Lehrer**: Schüler zur Applikation einladen und diesen Fächern und Klassen zuweisen können.
- **Schüler/Lehrer**: Die Möglichkeit haben, nach einmaligem Anmelden, die Anmeldedaten zu speichern.

## Erweiterte Benutzerverwaltung

- **Lehrer**: Fächer, Klassen und Schüler bearbeiten und löschen können.
- **Schüler/Lehrer**: Eigene Kontaktdaten sowie das eigene Passwort ändern können.
- **Schüler**: Kontaktdaten (Name, Vorname, E-Mail) anderer Schüler und Lehrer einsehen können.

## Notenverwaltung und Analyse

- **Lehrer**: Noten der Schüler für jedes Fach eingeben können.
- **Lehrer**: Einsicht zu allen Noten der Schüler haben.
- **Lehrer**: Den Notendurchschnitt aller Schüler zu einem Fach einsehen können.
- **Lehrer/Schüler**: Die Noten anhand von Graphen interpretieren können.
- **Lehrer**: Die Notenverteilung eines Faches anhand von Graphen interpretieren können.
- **Schüler**: Notendurchschnitte zu den jeweils belegten Fächern einsehen können.
- **Schüler**: Verfügbare Noten bestätigen und sperren

## Kommunikation und Benachrichtigungen

- **Schüler**: Benachrichtigung per E-Mail erhalten, wenn eine neue Note eingetragen wurde.
- **Lehrer**: Möglichkeit haben, Noten zu verändern und den entsprechenden Schüler darüber zu informieren.

## Planung und Organisation

- **Schüler**: Prüfungsplan in einem Kalender einsehen können.
- **Lehrer**: Übersicht über alle anstehenden Prüfungen für meine Fächer haben.