# Image Sharing Web Application

This is a college exercise web application that allows users to post and share images. The application is divided into a back-end built with Express and a front-end built with React.

## Features

- **User Registration and Login**
- **Image Posting**: Users can post images with a title and a message after logging in.
- **Image Voting**: Users can vote on images (like, dislike).
- **Image Commenting**: Logged-in users can comment on images.
- **Public View**: The public section of the application, accessible without login, displays all images with titles, number of votes, authors, and publication dates. Images are sorted by publication date in descending order (newest posts at the top).
- **Detailed Image View**: Clicking on an image opens a detailed view, showing the comments as well.

## Technologies

- **Back-end**: Express
- **Front-end**: React
- **Data Format**: JSON

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AnzeFric/ReactExpress_website.git
    cd ReactExpress_website
    ```

2. Install dependencies for the back-end:
    ```bash
    cd backend
    npm install
    ```

3. Start the back-end server:
    ```bash
    npm start
    ```

4. Install dependencies for the front-end:
    ```bash
    cd ../frontend
    npm install
    ```

5. Start the front-end server:
    ```bash
    npm start
    ```

## Contribution

To contribute to the project, create a new branch, make your changes, and open a pull request.

1. Fork the project
2. Create a new branch (`git checkout -b feature-branch-name`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch-name`)
5. Open a pull request
