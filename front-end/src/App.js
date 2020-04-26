import React, {useState, useEffect} from 'react';
import Header from './components/Header';
import './App.css'
import backgroundImage from './assets/background.jpg';
import api from './services/api';

export default function App(){
  const [projects, setProjects] =  useState([]);

  useEffect(() => {
    api.get('projects').then(response => setProjects(response.data))
  },[]);

  async function handleAddProject(){
    let newProject = {title: `New project ${Date.now()}`, owner: 'Leonam'}
    const response = await api.post('projects', newProject);

    newProject = response.data;
    setProjects([...projects, newProject]);
  }

  return (
    <>
      <Header title="Projects"/>
      <img width={100} src={backgroundImage}/>
      <ul>
        {projects.map(project=> <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Add Project</button>
    </>
  );
};
