import AppShell from './components/AppShell';
import './App.css';

function App() {
  return (
    <AppShell>
      {/* Content will go here */}
      <div className="text-center">
        <h2 className="text-xl mb-4 text-[color:var(--green)]">Welcome to the OSI Story</h2>
        <p className="mb-2">This is a fun and interactive way to learn about the OSI model.</p>
        <p>Explore the layers and understand how they work together!</p>
      </div>
    </AppShell>
  );
}

export default App;
