GitHub Issues and Discussions Viewer
====================================

Project Overview
----------------

This is a client application built with **React**, **TypeScript**, and **Next.js** that allows users to view issues and discussions for a specified GitHub repository. It fetches and displays the data using the GitHub REST API. The app is hosted on Vercel at <https://github-issue-client.vercel.app/>.

Features
--------

* Top level code tree view and README.md preview, list of GitHub issues, and discussions for any public repository.
* Detailed view of individual issues or discussions, including comments and reactions.
* Search modal to search for GitHub repositories by name and select it to view its issues and discussions.
* Dynamic routing for repositories, allowing URLs to be bookmarked or shared for easy access.
* Error handling for invalid repositories or data fetching issues.

Technologies Used
-----------------

* **Next.js**: Chosen for its dynamic routing and ease of managing search parameters, improving user experience by allowing repository URLs to be bookmarked or shared.
* **GitHub REST API** and **OctoKit**: Used to fetch repository data, including issues, discussions, and comments.
* **Marked**: Markdown parser that converts markdown into html for README.md preview
* **Shadcn**: Used as a UI component library for building the foundation of the user interface, with custom components built on top to suit the application's needs.

Design Decisions
----------------

* **Next.js Dynamic Routing**: I opted for Next.js instead of a library like `react-router-dom` because it simplifies dynamic routing and URL handling with its built-in App Router. This makes it easier to generate shareable URLs and gives a smoother user experience for bookmarking repositories. While `react-router-dom` could have been a valid alternative, I personally prefer Next.js because it caches api calls thereby reduces data intensity and loading time as well as allowing easy implementation of server-side-rendering.
* **Error Handling**: If the GitHub API fails (e.g., due to rate limits or invalid repository names), the app displays an error message without breaking the UI.
* **No Authentication**: I did not set up GitHub authentication, as this is a demo project, and handling rate limits wasn't prioritized. If the rate limit is exceeded, the fetch will return `null`, and a corresponding error message will be shown.

How It Works
------------

1. **Repository Selection**: Users can enter a GitHub repository (e.g., `facebook/react`) in the search modal.
2. **Fetching Data**: The app uses the GitHub REST API to fetch issues and discussions for the selected repository.
3. **Displaying Data**: The fetched data is displayed in lists, the README.md file is previewed, and users can click on individual items to view details such as comments and reactions.

Challenges & Solutions
----------------------

* **API Rate Limits**: Since this is a demo project, i did not authenticate the use of the GitHub API. In production, I would implement authentication. For now, the app simply logs an error message if the rate limit is exceeded and retry fetching the data once the API cooldown is finished.
* **Missing Endpoint/Type For Discussions In OctoKit**: While working with OctoKit, I encountered the absence of a dedicated endpoint and TypeScript type for discussions. To overcome this, I fetched the necessary data directly from the GitHub REST API and manually converted the JSON response into a TypeScript type. This ensured the correct type-checking throughout the application, while maintaining consistency with other types provided by OctoKit.
* **Implementing The Repository Search**: One challenge with the repository search modal was minimizing excessive API calls while the user typed. To address this, I implemented a debounced input query that delays API calls until the user has stopped typing. Additionally, I needed to ensure data consistency by aborting previous API calls before sending new ones, preventing overlapping api calls. To manage this cleanly as well as separate data fetching from UI components, I created a custom hook. This hook encapsulates the debouncing and API call management logic, improving code readability and reusability.

Future Improvements
-------------------

* **API Authentication**: Add OAuth or token-based authentication to handle GitHub API rate limits more effectively.
* **GitHub GraphQL API**: Use GitHub's GraphQL API instead of their REST API because:
  * Only fetch data you need and nothing more, the REST API endpoints most of the time contain a lot more data than is needed
  * Have nested fields instead of multiple REST API calls
* **Cache Repository Search**: Add a React data fetching library (SWR, React Query) to implement caching on the repository searches (Next.js only caches server-side fetch calls)
* **Add HTML/Markdown Sanitization**: The displayed posts and README.md files are transported as Markdown and could potentially have dangerous tags or attributes (`<link>`, `<script>`, `onclick`, ...) in them. Markdown Sanitization removes these dangerous tags and eliminates the vulnerability.

Running the Project
-------------------

To run this project locally:

1. Clone this repository.
2. Install the dependencies with `npm install`.
3. Run the development server with `npm run dev`
4. Open <http://localhost:3000> in your browser to view the app.
