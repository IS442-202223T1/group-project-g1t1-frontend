<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">

  <h3 align="center">IS442 G1T1 Frontend</h3>

</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#prerequisites">Prerequisites</a>
    </li>
    <li>
      <a href="#installation-and-set-up">Installation and Set-Up</a>
    </li>
      <ul>
        <li><a href="#set-up-local-directories">Set-up Local Directories</a></li>
      </ul>
      <ul>
        <li><a href="#provide-environment-variables">Provide Environment Variables</a></li>
      </ul>
      <ul>
        <li><a href="#install-dependencies">Install Dependencies</a></li>
      </ul>
    <li>
      <a href="#production-mode">Production Mode</a>
    </li>
    <li>
      <a href="#development-mode">Development Mode</a>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

Frontend element for Singapore Sports School's Corporate Pass Application. Built in React and depends on its [accompanying REST API](https://github.com/IS442-202223T1/group-project-g1t1-backend).

<p align="right">(<a href="#top">back to top</a>)</p>

## Prerequisites

- Recommended platform
  - Development: macOS Monterey (Intel)
  - Production: Linux (Ubuntu 16.04)
- Nodejs 14.x, 16.x, 18.x (v18.9.1 preferred)
  - Accompanying npm (v8.19.2 preferred)

## Installation and Set-up
This application can be run in both `development` and `production` modes

### Set-up Local Directories

Clone this repository or download to files to local directory. Open a terminal session and navigate to this application root (`.../wanderlust`)

```bash
cd /path/to/wanderlust
```

### Provide Environment Variables

This frontend application relies on the accompanying backend server for computation logic and data. We need to provide it the following information. Edit the backend server URL in `.env.example` using any text editor (`vi .env.example`).

1. Replace `<>` fields with the respective information
2. Rename `.env.example` to `.env`

**Note: `.env` is automatically ignored by git`**

`REACT_APP_EMAIL_CHECKING` acts as a feature flag to verify that the email has a valid Singapore Sports School subdomain. It is set to `false` by default for development.

### Install Dependencies

```bash
npm install
```

## Production Mode

1. Create a production build
```bash
npm run build
```

2. Install serve
```bash
npm install -g serve
```

3. Run the production build
```bash
serve -s build
```

## Development Mode

Run the application in development mode
```bash
npm run start
```
