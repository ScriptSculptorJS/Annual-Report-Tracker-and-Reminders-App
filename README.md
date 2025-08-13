## [Annual Report Tracker & Reminder](https://youtu.be/2fusCLYstFU)

A full-stack MERN app that helps small businesses track annual report deadlines and receive timely reminders to maintain compliance. Features **JWT authentication**, secure cookie storage, dynamic CRUD operations on nested data structures, and a responsive **Bootstrap** UI.
![annual-report-tracker-and-reminder-app](https://github.com/user-attachments/assets/1c6bcced-569b-4177-9531-520c14c9ea91)
### Table of Contents
* [Motivation](#motivation)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Future Plans](#future-plans)
* [Project Status](#project-status)

### Motivation
I am eager to apply for a tech and marketing company called Two Barrels LLC, and wanted to create an app that would help businesses keep track of the many reports they need to complete each year. Thus, came the existence of the Annual Report Tracker and Reminder app.
### Features
- **Track Annual Report Deadlines** – Add and manage entities with key details such as name, state, due date, status, and notes.
- **Automated Reminders** – See reminders based on customizable frequencies to ensure no deadlines are missed.
- **Secure Authentication** – Uses **JWT** with encrypted cookies for safe, persistent sessions.
- **Responsive UI** – Built with **Bootstrap** for usability across devices.
- **Full CRUD Functionality** – Create, read, update, and delete entities and their details.

### Tech Stack
- **Frontend**: React, Bootstrap, CSS, HTML
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT with encrypted cookies

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/annual-report-tracker.git
2. Install dependencies for both client and server:
    ```bash
    npm install
    cd client
    npm install

3. Set up your .env file in the root directory with the following:
     ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
4. Start the development servers:
    ```bash
    cd ..
    npm run start
    
### Usage
- **Sign Up/Login to create your account**
- **Add Entities with their state, due date, and reminder preferences**
- **Get Notifications when deadlines are approaching**
- **Manage your entity list using the edit and delete features**

### Future Plans
1. Functionality to mark entity as completed for the year and have it updated with a year for next year.
2. Ability to store filing history
3. Add other fields: entity type (LLC, corporation, s-corp, foreign LLC, nonprofit, etc.), registered agent type (self, employee, registered agent service,etc.), filing method (online, mail, registered agent), state filing portal
4. Functionality to sort entities based on criteria (i.e. state)

### Project Status
Completed for now, but can be interated upon in the future
