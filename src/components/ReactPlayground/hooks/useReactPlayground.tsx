import { useSandpack } from '@codesandbox/sandpack-react';

export const DEFAULT_FILES: Record<string, string> = {
  'App.js': `import Home from './Home.jsx'
import About from './About.jsx'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
function App(){
  return (
    <Router initialEntries={['/']}>
    <nav>
      <Link to="/">home</Link> | <Link to="/about">about</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
    )
}
export default App
`,
  'Home.jsx': `import React from 'react';

function Home() {
  return (
    <div>
      <h2>Hello, Home!</h2>
    </div>
  );
}

export default Home;
`,
  'About.jsx': `
  import React from 'react';

function About() {
  return (
    <div>
      <h2>Hello, About!</h2>
    </div>
  );
}

export default About;
`,
  'index.css': `
  h1 {
    color: red;
  }
  
  nav {
    margin-bottom: 20px;
  }
  
  a {
    color: #61dafb;
    text-decoration: none;
    font-size: 1.2rem;
  }
  `
};

export function useReactPlayground() {
  const { sandpack } = useSandpack();
  const { files, activeFile, openFile, addFile, deleteFile } = sandpack;

  return {
    files,
    addFile,
    deleteFile,
    openFile,
    activeFile
  };
}
