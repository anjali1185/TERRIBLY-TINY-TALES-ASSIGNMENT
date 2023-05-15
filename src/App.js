import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

import './App.css'; // Import the CSS file for styling

const App = () => {
  const [histogramData, setHistogramData] = useState(null);

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

  return (
    <div className="container">
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
};

export default App;
