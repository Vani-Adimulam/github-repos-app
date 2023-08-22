import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchRepos = async () => {
    const apiUrl = `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${page}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRepos(prevRepos => [...prevRepos, ...data.items]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Most Starred GitHub Repos</h1>
      </header>
      <main>
        <ul>
          {repos.map(repo => (
            <li key={repo.id} className="repo-item">
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
              <p>Stars: {repo.stargazers_count}</p>
              <p>Issues: {repo.open_issues_count}</p>
              <p>Owner: {repo.owner.login}</p>
              <img src={repo.owner.avatar_url} alt="Avatar" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

