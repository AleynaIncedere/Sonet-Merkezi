import { useState, useRef } from 'react';
import sonnetsData from './data/sonnetsData';
import Header from './components/Header';
import './styles.css';

export default function App() {
  const inputRef = useRef();
  const [searchInput, setSearchInput] = useState('');
  const [filteredSonnets, setFilteredSonnets] = useState([]);

  // Arama butonuna tıklandığında çağrılacak fonksiyon
  function handleClick() {
    const searchTerm = inputRef.current.value.trim().toLowerCase();
    setSearchInput(searchTerm);

    // Eğer arama terimi boşsa, sonuçları temizle ve soneleri gösterme
    if (!searchTerm) {
      setFilteredSonnets([]); // Sonuçları temizle
      return;
    }

    // SonnetsData içerisindeki verileri filtrele
    const filtered = sonnetsData.filter((sonnet) =>
      sonnet.lines.some((line) => line.toLowerCase().includes(searchTerm))
    );
    setFilteredSonnets(filtered);
  }

  // Eşleşen kelimeleri vurgulamak için yardımcı fonksiyon
  function highlightMatch(text) {
    if (!searchInput) return text;
    const regex = new RegExp(`(${searchInput})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === searchInput.toLowerCase() ? (
        <span key={index} className="highlight">{part}</span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="wrapper">
      <Header searchProps={{ inputRef, handleClick }} />

      <div className="sonnets-container">
        {searchInput && filteredSonnets.length === 0 ? (
          <p className="no-results-message">Ne yazık ki, araman sonucunda hiçbir şey bulamadın.</p>
        ) : (
          filteredSonnets.map((sonnet) => (
            <div key={sonnet.number} className="sonnet">
              <h3>{`Sonnet ${sonnet.number}`}</h3>
              {sonnet.lines.map((line, index) => (
                <p key={index}>{highlightMatch(line)}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
