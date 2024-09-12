const { exec } = require('child_process');
const moment = require('moment');
const fs = require('fs');

// Function to generate random commit messages
const generateRandomMessage = () => {
  const messages = [
    'Fix authentication flow',
    'Improve data processing speed',
    'Refactor API endpoints',
    'Add validation to forms',
    'Update dependencies',
    'Enhance error handling',
    'Improve UI for dashboard',
    'Add new unit tests',
    'Fix issue with email notifications',
    'Optimize lead management queries',
    'Improve database schema design',
    'Refactor login page UI',
    'Add input sanitization to forms',
    'Increase test coverage for backend',
    'Update frontend dependencies to latest version',
    'Enhance server-side logging',
    'Improve performance of search queries',
    'Fix issue with user session expiration',
    'Improve security for password reset flow',
    'Optimize image loading on landing page',
    'Refactor payment gateway integration',
    'Add role-based access control to dashboard',
    'Improve error messages for failed logins',
    'Optimize API responses for mobile users',
    'Fix caching issue with static assets',
    'Improve browser compatibility for older versions',
    'Enhance input validation for signup form',
    'Refactor project structure for scalability',
    'Add unit tests for email validation',
    'Update user profile page with new design',
    'Improve email templates for notifications',
    'Fix issue with lead export functionality',
    'Enhance encryption for sensitive data',
    'Refactor billing system for multi-currency support',
    'Improve accessibility on forms',
    'Fix issue with 404 pages not loading',
    'Optimize bulk data processing script',
    'Add event tracking for key user actions',
    'Improve navigation menu for mobile users',
    'Fix issue with pagination in lead management',
    'Refactor cron job scheduling system',
    'Enhance support for multi-language content',
    'Improve logging for API errors',
    'Fix issue with file uploads in Safari',
    'Optimize memory usage for background tasks',
    'Update API documentation with new endpoints',
    'Fix issue with email spam filtering',
    'Improve customer feedback submission form',
    'Add dark mode support to dashboard',
    'Refactor authentication middleware',
    'Fix performance issues on large datasets',
    'Improve onboarding flow for new users',
    'Optimize lead scoring algorithm',
    'Fix issue with push notifications not sending',
    'Improve data export functionality',
    'Refactor user settings page',
    'Enhance security for third-party integrations'
  ];
  return messages[Math.floor(Math.random() * messages.length)];
};

// Generate dates between Jan 1, 2024, and today, excluding weekends
function generateDates(startDate, endDate) {
  let dates = [];
  let currentDate = moment(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
    // Check if it's not a Saturday (6) or Sunday (0)
    if (currentDate.day() !== 0 && currentDate.day() !== 6) {
      dates.push(currentDate.clone());
    }
    currentDate.add(1, 'day');
  }
  return dates;
}

// Function to modify the test.json file
function modifyTestJson(commit) {
  const testFilePath = './test.json';
  const data = {
    commitMessage: commit.message,
    date: commit.date,
    timestamp: moment(commit.date).format()
  };

  // Update the test.json file with new data
  fs.writeFileSync(testFilePath, JSON.stringify(data, null, 2));
  console.log(`Updated test.json for commit: ${commit.message}`);
}

// Function to run the git commit command for a given date and message
function commitWithDateAndMessage(commit) {
  const formattedDate = moment(commit.date).format(); // Format the date using moment.js
  const command = `git add test.json && git commit --date="${formattedDate}" -m "${commit.message}"`;

  // Modify the test.json file first
  modifyTestJson(commit);

  // Execute the git add and commit command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error committing for ${commit.date}: ${stderr}`);
      return;
    }
    console.log(`Successfully committed: "${commit.message}" on ${formattedDate}`);
  });
}

// Main function to create random commits for each date
function createRandomCommits(startDate, endDate) {
  const dates = generateDates(startDate, endDate);

  dates.forEach(date => {
    // Generate a random number of commits for each date (1 to 7)
    const numCommits = Math.floor(Math.random() * 7) + 1;
    
    for (let i = 0; i < numCommits; i++) {
      const commit = {
        date: date.format('YYYY-MM-DD'),
        message: generateRandomMessage()
      };
      commitWithDateAndMessage(commit);
    }
  });
}

// Generate commits from 2024-01-01 to today's date, excluding weekends
createRandomCommits('2023-03-04', moment('2023-07-25').format('YYYY-MM-DD'));
