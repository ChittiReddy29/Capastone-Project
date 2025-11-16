export default function About() {

    return(
        <>
            About This Project

This project is a full-stack web application that connects a modern React frontend with the ServiceNow platform using secure REST API integration. It demonstrates how enterprise systems can be extended using modern UI frameworks and API-driven workflows.

The frontend is built using React and Material UI (MUI), providing a responsive and professional user interface with support for light and dark modes. The application allows users to view and manage ServiceNow incidents (Create, Read, Update, Delete) in a clean and intuitive layout.

The backend is developed in Node.js with Express, which acts as a secure middleware between React and ServiceNow. It handles OAuth authentication, stores user sessions, and exposes custom API endpoints for incident operations. This ensures that the frontend never communicates with ServiceNow directly, keeping the integration secure and scalable.

This project highlights key concepts such as authentication, API integration, context management, and UI design, making it a strong example of how to combine React, Node.js, and ServiceNow into a unified system.
        </>
    )
}