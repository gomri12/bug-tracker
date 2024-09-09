import React, { useState, useEffect } from 'react';

const BugTracker = () => {
  const defaultNames = [
    { name: 'Olga Lisogursky', bugsResolved: 0 },
    { name: 'Gil Blinstein', bugsResolved: 0 },
    { name: 'Noa Volk', bugsResolved: 0 },
    { name: 'Ofir Marie Cohen', bugsResolved: 0 },
    { name: 'Roy Waldman', bugsResolved: 0 },
    { name: 'Tomer Novick', bugsResolved: 0 },
    { name: 'Oren Amzaleg', bugsResolved: 0 },
    { name: 'Assaf Ziv', bugsResolved: 0 },
    { name: 'Hadar Sabati', bugsResolved: 0 },
    { name: 'Chana Attia', bugsResolved: 0 },
    { name: 'Hila Vinitzer', bugsResolved: 0 },
    { name: 'Itay David', bugsResolved: 0 },
    { name: 'Ruth Hubara', bugsResolved: 0 },
    { name: 'Vladislav Yegorov', bugsResolved: 0 },
    { name: 'Maxim Frid', bugsResolved: 0 },
    { name: 'Arie Akouka', bugsResolved: 0 },
    { name: 'Ori Halamit', bugsResolved: 0 },
  ];

  const [data, setData] = useState(() => {
    // Retrieve the data from localStorage if it exists, otherwise use default names
    const savedData = localStorage.getItem('bugTrackerData');
    return savedData ? JSON.parse(savedData) : defaultNames;
  });

  const [newName, setNewName] = useState('');

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bugTrackerData', JSON.stringify(data));
  }, [data]);

  const playGongSound = () => {
    const gong = new Audio('/gong.mp3');
    gong.play();
  };

  const incrementBugs = (index) => {
    const newData = [...sortedData];
    newData[index].bugsResolved += 1;
    setData(newData);
    playGongSound();
  };

  const addName = () => {
    if (newName.trim()) {
      setData([...data, { name: newName, bugsResolved: 0 }]);
      setNewName('');
    }
  };

  const removeName = (index) => {
    const newData = sortedData.filter((_, i) => i !== index);
    setData(newData);
  };

  const getTotalBugsResolved = () => {
    return data.reduce((total, person) => total + person.bugsResolved, 0);
  };

  // Sort names by bugsResolved in descending order
  const sortedData = [...data].sort((a, b) => b.bugsResolved - a.bugsResolved);

  return (
    <div className="container">
      <h1>Bug Resolution Tracker</h1>
      
      {/* Form to Add a New Name */}
      <div className="add-name-form">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter a new name"
        />
        <button onClick={addName}>Add Name</button>
      </div>

      {/* Display Total Bugs Resolved */}
      <div className="total-bugs">
        <h2>Total Bugs Resolved: {getTotalBugsResolved()}</h2>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Bugs Resolved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{person.bugsResolved}</td>
              <td>
                <button onClick={() => incrementBugs(index)}>Resolve Bug</button>
                <button className="remove" onClick={() => removeName(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugTracker;
