import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [students, setStudents] = useState([]);

  // Subtask 3.3: Send Data to Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/students', { name, course });
      setName('');
      setCourse('');
      fetchStudents(); // Refresh the list
    } catch (err) {
      console.error("Error posting data", err);
    }
  };

  // Subtask 4.1: Fetch Data from Backend
  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:5000/students');
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>MERN Student Form</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {/* Subtask 4.2: Display Data */}
      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name} - {student.course}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;