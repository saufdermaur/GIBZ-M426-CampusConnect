# Campus Connect

## :scroll: Inhaltsverzeichnis

1. [Einleitung](#1-einleitung)
   1. [Zielsetzung](#11-zielsetzung)
   2. [Themenwahl](#12-themenwahl)
   3. [Rollenverteilung](#13-rollenverteilung)
2. [Datenbank](#2-datenbank)
   1. [Datenbanktechnologie](#21-datenbanktechnologie)
   2. [ERD](#22-erd)
3. [Backend](#3-backend)
   1. [Backendtechnologie](#31-backendtechnologie)
4. [Frontend](#4-frontend)
   1. [Frontendtechnologie](#41-frontendtechnologie)
5. [Design](#5-design)
   1. [Logo](#51-logo)
   2. [Mockup + Wireframe](#52-mockup--wireframe)
6. [Komponentendiagramm](#6-komponentendiagramm)
   1. [Funktionen](#7-funktionen)
7. [Projektplan](#8-projektplan)

## 1. Einleitung

### _1.1 Zielsetzung_

Unser Ziel ist es, eine Schulnetz-Applikation zu erstellen, mit der Benutzer ihre eigenen Noten und Prüfungen einsehen und verwalten können. Die Applikation soll ausserdem einen Kalender enthalten, der einen Überblick über schulische Ereignisse bietet. Benutzer sollen sich registrieren und anschliessend einloggen können. Eine "About"-Seite, die alle Funktionalitäten im Überblick darstellt, soll ebenfalls realisiert werden. Designmässig streben wir ein minimalistisches Aussehen an; die Applikation soll einen Darkmode haben, und die Farben Weiss, Grau und Blau sollen dominieren. Ein eigenes Logo-Design ist ebenfalls geplant. Um die Applikation möglichst realitätsnah einsetzen zu können, planen wir, sie mithilfe von Docker zu deployen.

### _1.2 Themenwahl_

Die Umsetzung dieses Projekts wurde im Rahmen des Moduls "M426 - Software mit agilen Methoden entwickeln" beschlossen. Nach anfänglicher Ideensuche über 2D-Games und E-Shops bis hin zu einer Social-Media-Applikation haben wir uns für eine Schulnetz-Applikation entschieden. Der Grund dafür war, dass wir die Umsetzung dieses Projekts als realistisch erachteten. Die Technologien, die wir für die Umsetzung benötigen (Vue, Swagger, ExpressJS, PostgreSQL), sind uns fast alle bekannt, und wir haben bereits einige positive Erfahrungen damit gemacht. Die Funktionalitäten einer Schulnetz-Applikation lassen sich gut untereinander aufteilen, sodass jeder an seinem eigenen Bereich arbeiten kann, ohne die anderen zu stören.

### _1.3 Rollenverteilung_

Wir mussten für unser Projekt drei Rollen definieren: Scrum Master, Product Owner und Developer. <br>

**Scrum Master - Kyrylo-Tadei Krukenytskyi** <br>
Der Scrum Master sorgt dafür, dass das Scrum-Team die Prinzipien und Praktiken von Scrum versteht und anwendet. Er beseitigt Hindernisse, die den Fortschritt des Teams behindern, und fördert eine produktive und kollaborative Arbeitsumgebung. Ausserdem unterstützt er das Team dabei, kontinuierliche Verbesserungen durch regelmässige Retrospektiven zu erreichen. <br>
**Zugeteilte Aufgaben:** Design, Frontend-Entwicklung

**Product Owner - Kornel Duli** <br>
Der Product Owner ist verantwortlich für die Maximierung des Wertes des Produkts und das Management des Product Backlogs. Er kommuniziert die Vision des Produkts und die Anforderungen an das Entwicklungsteam, um sicherzustellen, dass die richtigen Funktionen implementiert werden. Er priorisiert die Aufgaben im Backlog basierend auf dem geschäftlichen Nutzen und den Bedürfnissen der Stakeholder. <br>
**Zugeteilte Aufgaben:** Projektbeschreibung, Erstellen von User Stories, Verwaltung des Backlogs, Planung von Sprints, Frontend-Entwicklung

**Developer(s) - Sebastian Auf der Maur & Daniel Bernet** <br>
Die Developer sind die Mitglieder des Scrum-Teams, die für die Umsetzung und Lieferung der Produktinkremente verantwortlich sind. Sie planen, entwickeln, testen und dokumentieren die Software und arbeiten eng zusammen, um die Sprint-Ziele zu erreichen. Zudem sind sie für die Qualität ihrer Arbeit und die Einhaltung der Definition of Done verantwortlich. <br>
**Zugeteilte Aufgaben:** Aufsetzung der Datenbank, Design, Backend- und Frontend-Entwicklung, Deployment

## 2. Datenbank

### _2.1 Datenbanktechnologie_

Wir haben uns entschieden, als Datenbank PostgreSQL zu verwenden. Die wichtigsten Entscheidungskriterien dabei waren:

**1. Benutzerverwaltung:** PostgreSQL bietet robuste Unterstützung für relationale Datenmodelle, die ideal sind, um Benutzerinformationen und deren Beziehungen zu anderen Daten zu speichern.

**2. Komplexe Abfragen:** PostgreSQL kann komplexe Abfragen effizient ausführen und somit Daten schnell und zuverlässig darstellen. Ausserdem bietet PostgreSQL zahlreiche Indizierungsoptionen. Dies ist besonders nützlich, wenn man häufig auf große Datenmengen zugreifen muss.

**3. ACID-Konformität:** PostgreSQL ist vollständig ACID-konform, was bedeutet, dass alle Datenbanktransaktionen atomar, konsistent, isoliert und dauerhaft sind.

**4. Kosten:** PostgreSQL ist Open Source und kostenlos.

**5. Erfahrung:** Wir haben bereits einige positive Erfahrungen mit PostgreSQL gesammelt und fühlen uns damit am meisten vertraut.

### _2.2 ERD_

![ERD Campus Connect](documentation_backend/ERDCampusConnect.png)

Unser ERD hat Beziehungen zwischen drei Entitäten: User, Module und Exam. Es gibt zwei Beziehungen: Erstens hat ein User eine 1-zu-N-Beziehung zu einem Module, und zweitens hat ein Module eine 1-zu-N-Beziehung zu einem Exam. Diese Struktur ermöglicht es, dass ein Benutzer mehrere Module und jedes Modul mehrere Prüfungen haben kann. Die Beziehungen und Attribute sind so gestaltet, dass die Datenintegrität und -konsistenz gewährleistet ist.

## 3. Backend

### _3.1 Backendtechnologie_

## 4. Frontend

### _4.1 Frontendtechnologie_

## 5. Design

### _5.1 Logo_

### _5.2 Mockup_

![Dashboard](documentation_frontend/mockup/dashboard.png)
![Modules](documentation_frontend/mockup/modules.png)
![Exams](documentation_frontend/mockup/exams.png)
![Calendar](documentation_frontend/mockup/calendar.png)
![About](documentation_frontend/mockup/about.png)

## 6. Komponentendiagramm

![Komponentendiagramm](documentation_backend/Komponentendiagramm.png)

### _6.1 Frontend_

**1. User:** Der Benutzer interagiert direkt mit der Benutzeroberfläche der Applikation.

**2. main.js:** Dies ist der Einstiegspunkt für das Frontend der Applikation. Es lädt und initialisiert die Anwendung mit Vue und Vuetify.

**3. index.js:** Hier werden verschiedene Routen und Konfigurationen für die Anwendung definiert. Es verbindet die verschiedenen Komponenten und Views.

**4. components:** Diese beinhalten wiederverwendbare UI-Komponenten, die in verschiedenen Teilen der Applikation genutzt werden können.

**5. views:** Views sind spezifische Seiten oder Ansichten der Applikation, die dem Benutzer angezeigt werden.

**6. app.vue:** Dies ist die Haupt-Vue-Komponente, die die gesamte Anwendung strukturiert und andere Komponenten und Views einbindet.

### _6.2 Backend_

**1. Swagger:** Swagger ist ein Tool, das zur Dokumentation und Testen der API verwendet wird. Es ermöglicht Entwicklern, die API-Endpunkte zu verstehen und zu nutzen.

**2. server.js:** Dies ist der Hauptserver für das Backend, implementiert mit ExpressJS. Es leitet Anfragen zu den entsprechenden Routen weiter.

**3. routes:** Routen definieren die verschiedenen Endpunkte der API, die vom Frontend aufgerufen werden können.

**4. models:** Modelle repräsentieren die Datenstrukturen und Geschäftslogik der Applikation und interagieren direkt mit der Datenbank.

### _6.3 Datenbank_

**1. PostgreSQL:** PostgreSQL ist die relationale Datenbank, die für die Speicherung und Verwaltung der Applikationsdaten verwendet wird. Sie interagiert mit den Modellen im Backend, um Daten zu speichern und abzurufen.

### _6.4 Interaktion_

1. Der Benutzer sendet Anfragen über die Benutzeroberfläche, die durch main.js und index.js geleitet und von den entsprechenden Komponenten und Views verarbeitet werden. <br>
2. Anfragen vom Frontend gehen über Swagger zum Backend-Server (server.js), wo sie an die definierten Routen (routes) weitergeleitet werden. <br>
3. Die Routen verwenden Modelle (models), um mit der PostgreSQL-Datenbank zu interagieren und die notwendigen Daten zu speichern oder abzurufen. <br>
4. Die Ergebnisse dieser Datenbankoperationen werden zurück durch das Backend an das Frontend gesendet, wo sie in den entsprechenden Views angezeigt werden.

## 7. Funktionen

**1. Login:**

**2. Signup:**

**3. Logout:**

**4. Create module:**

**5. Create exam:**

## 8. Projektplan
