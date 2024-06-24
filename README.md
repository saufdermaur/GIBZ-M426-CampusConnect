# Campus Connect

## 1. Einleitung

### _1.1 Zielsetzung_

Unser Ziel ist es, eine Schulnetz-Applikation zu erstellen, mit der Benutzer ihre eigenen Noten und Prüfungen einsehen und verwalten können. Die Applikation soll ausserdem einen Kalender enthalten, der einen Überblick über schulische Ereignisse bietet. Benutzer sollen sich registrieren und anschliessend einloggen können. Eine "About"-Seite, die alle Funktionalitäten im Überblick darstellt, soll ebenfalls realisiert werden. Designmässig streben wir ein minimalistisches Aussehen an; die Applikation soll einen Darkmode haben, und die Farben Weiss, Grau und Blau sollen dominieren. Ein eigenes Logo-Design ist ebenfalls geplant. Um die Applikation möglichst realitätsnah einsetzen zu können, planen wir, sie mithilfe von Docker zu deployen.

### _1.2 Themenwahl_

Die Umsetzung dieses Projekts wurde im Rahmen des Moduls "M426 - Software mit agilen Methoden entwickeln" beschlossen. Nach anfänglicher Ideensuche über 2D-Games und E-Shops bis hin zu einer Social-Media-Applikation haben wir uns für eine Schulnetz-Applikation entschieden. Der Grund dafür war, dass wir die Umsetzung dieses Projekts als realistisch erachteten. Die Technologien, die wir für die Umsetzung benötigen (Vue, Swagger, ExpressJS, PostgreSQL), sind uns fast alle bekannt, und wir haben bereits einige positive Erfahrungen damit gemacht. Die Funktionalitäten einer Schulnetz-Applikation lassen sich gut untereinander aufteilen, sodass jeder an seinem eigenen Bereich arbeiten kann, ohne die anderen zu stören.

### _1.3 Rollenverteilung_

Wir mussten für unser Projekt drei Rollen definieren: Scrum Master, Product Owner und Developer.
**Scrum Master - Kyrylo-Tadei Krukenytskyi**
Der Scrum Master sorgt dafür, dass das Scrum-Team die Prinzipien und Praktiken von Scrum versteht und anwendet. Er beseitigt Hindernisse, die den Fortschritt des Teams behindern, und fördert eine produktive und kollaborative Arbeitsumgebung. Ausserdem unterstützt er das Team dabei, kontinuierliche Verbesserungen durch regelmässige Retrospektiven zu erreichen.

Aufgaben: Design, Frontend-Entwicklung

**Product Owner - Kornel Duli**
Der Product Owner ist verantwortlich für die Maximierung des Wertes des Produkts und das Management des Product Backlogs. Er kommuniziert die Vision des Produkts und die Anforderungen an das Entwicklungsteam, um sicherzustellen, dass die richtigen Funktionen implementiert werden. Er priorisiert die Aufgaben im Backlog basierend auf dem geschäftlichen Nutzen und den Bedürfnissen der Stakeholder.

Aufgaben: Projektbeschreibung, Erstellen von User Stories, Verwaltung des Backlogs, Planung von Sprints, Frontend-Entwicklung

**Developer - Sebastian Auf der Maur, Daniel Bernet**
Die Developer sind die Mitglieder des Scrum-Teams, die für die Umsetzung und Lieferung der Produktinkremente verantwortlich sind. Sie planen, entwickeln, testen und dokumentieren die Software und arbeiten eng zusammen, um die Sprint-Ziele zu erreichen. Zudem sind sie für die Qualität ihrer Arbeit und die Einhaltung der Definition of Done verantwortlich.

Aufgaben: Aufsetzung der Datenbank, Design, Backend- und Frontend-Entwicklung, Deployment

## 2. Datenbank

### _2.1 Datenbanktechnologie_

Wir haben uns entschieden, als Datenbank PostgreSQL zu verwenden. Die wichtigsten Entscheidungskriterien dabei waren:

**1. Benutzerverwaltung:** PostgreSQL bietet robuste Unterstützung für relationale Datenmodelle, die ideal sind, um Benutzerinformationen und deren Beziehungen zu anderen Daten zu speichern.

**2. Komplexe Abfragen:** PostgreSQL kann komplexe Abfragen effizient ausführen und somit Daten schnell und zuverlässig darstellen. Ausserdem bietet PostgreSQL zahlreiche Indizierungsoptionen. Dies ist besonders nützlich, wenn man häufig auf große Datenmengen zugreifen muss.

**3. ACID-Konformität:** PostgreSQL ist vollständig ACID-konform, was bedeutet, dass alle Datenbanktransaktionen atomar, konsistent, isoliert und dauerhaft sind.

**4. Kosten:** PostgreSQL ist Open Source und kostenlos.

**5. Erfahrung:** Wir haben bereits einige positive Erfahrungen mit PostgreSQL gesammelt und fühlen uns damit am meisten vertraut.

### _2.2 ERD_

Unser ERD hat Beziehungen zwischen drei Entitäten: User, Module und Exam. Es gibt zwei Beziehungen: Erstens hat ein User eine 1-zu-N-Beziehung zu einem Module, und zweitens hat ein Module eine 1-zu-N-Beziehung zu einem Exam. Diese Struktur ermöglicht es, dass ein Benutzer mehrere Module und jedes Modul mehrere Prüfungen haben kann. Die Beziehungen und Attribute sind so gestaltet, dass die Datenintegrität und -konsistenz gewährleistet ist.

## 3. Backend

### _3.1 Backendtechnologie_

## 4. Frontend

### _4.1 Frontendtechnologie_

### _3.2 Mockup + Wireframe_

### _3.3 Funktionen_

Die Funktionen sind unter 3.2 mit Wireframe schon grösstenteils beschrieben. Hier noch ein Überblick:

**1. Login:**

**2. Signup:** .

**3. Logout:**

## 4. Komponentendiagramm

## 5. Projektplan
