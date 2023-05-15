# Word Frequency Histogram

This project is a React.js application that fetches the contents of a text file from a URL, parses the content to find the frequency of occurrence of each word, and displays a histogram chart of the 20 most occurring words.

## Live Link
- https://wordfrequencyhistogram.netlify.app/

## Components

The project consists of the following components:

- **App**: The main component that handles fetching the data, parsing the content, and rendering the histogram chart.

## Libraries and Plugins Used

The following libraries and plugins are used in this project:

- **React**: A JavaScript library for building user interfaces.
- **axios**: A promise-based HTTP client for making API requests.
- **recharts**: A composable charting library for React that leverages the power of D3.js.

## Explaination
```
import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
```
- The above lines import the necessary modules and components from React, axios, and recharts libraries.

```
const App = () => {
  const [histogramData, setHistogramData] = useState(null);
```
- The App component is a functional component that represents the main application.
- It uses the useState hook from React to define a state variable histogramData and a function setHistogramData to update the state.

```
const fetchData = async () => {
  try {
    const response = await axios.get(
      'https://www.terriblytinytales.com/test.txt'
    );
    const content = response.data;
    const words = content.split(/\s+/); // Split content into words

    // Count word occurrences
    const wordCounts = {};
    for (let word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    // Sort word counts in descending order
    const sortedWordCounts = Object.entries(wordCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Get top 20 words with highest occurrence
    const topWords = sortedWordCounts.slice(0, 20).map(([word]) => word);
    const topWordCounts = sortedWordCounts
      .slice(0, 20)
      .map(([_, count]) => count);

    // Prepare data for the histogram
    const histogramData = topWords.map((word, index) => ({
      word,
      count: topWordCounts[index],
    }));

    setHistogramData(histogramData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```
- The fetchData function is an asynchronous function that is triggered when the user clicks the Submit button.
- It uses the axios library to make an HTTP GET request to fetch the contents of the text file from the provided URL.
- The content is split into individual words using a regular expression.
- The function then counts the occurrences of each word using an object (wordCounts).
- The word counts are sorted in descending order, and the top 20 words and their respective counts are extracted.
- Finally, the data is prepared in the required format for the histogram chart and stored in the histogramData state variable.

```
const exportHistogramData = () => {
  if (histogramData) {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Word,Count\n' +
      histogramData.map(({ word, count }) => `${word},${count}`).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
  }
};
```
- The exportHistogramData function is triggered when the user clicks the Export button.
- It checks if histogramData exists and then converts the data into CSV format.
- A link element is created dynamically with the necessary attributes to download the CSV file.
- The link is appended to the document body, and the click method is invoked to initiate the download.

```
container">
  <h1>Word Frequency Histogram</h1>
  <button className="btn" onClick={fetchData}>
    Submit
  </button>
  {histogramData && (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={histogramData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="word" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
          <ReferenceLine y={0} stroke="#000" />
        </BarChart>
      </ResponsiveContainer>
      <button className="btn" onClick={exportHistogramData}>
        Export
      </button>
    </div>
  )}
</div>
);
```
- The code above contains the JSX markup that defines the structure of the application's user interface.
- It uses CSS classes (container and btn) to style the elements.
- The h1 element displays the title of the application.
- The Submit button triggers the fetchData function when clicked.
- If histogramData is available (i.e., data has been fetched and processed), the histogram chart and the Export button are rendered.
- The ResponsiveContainer component from recharts is used to ensure the chart scales correctly based on the available width and height.
- The BarChart component displays the actual histogram chart.
- The XAxis component displays the x-axis labels (the words).
- The YAxis component displays the y-axis labels (the counts).
- The Tooltip component provides hover-over tooltips with additional information.
- The Legend component displays the legend for the chart.
- The Bar component renders the bars of the histogram chart.
- The ReferenceLine component adds a horizontal line at y=0 for reference.
- The Export button triggers the exportHistogramData function when clicked.

```
export default App;
```
- The App component is exported as the default export of the module, making it importable in other files.
- This code fetches the contents of a text file, calculates the frequency of occurrence of each word, and generates a histogram chart of the top 20 words. It also provides an option to export the histogram data as a CSV file.

- Make sure to import the necessary libraries (react, axios, and recharts) and apply appropriate CSS styling to the container and button elements for the desired visual appearance.


## Usage

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/word-frequency-histogram.git
   
2. Install the dependencies:

cd word-frequency-histogram
npm install

3. Start the development server:
npm start

This will start the application on http://localhost:3000 in your browser.

4. Click the Submit button to fetch the contents of the text file, parse the content, and generate the word frequency histogram.

5. The chart will be displayed showing the top 20 most occurring words. You can also export the histogram data as a CSV file by clicking the Export button.

Customize
If you want to modify the code or add new features, you can edit the App.js file in the src directory.
