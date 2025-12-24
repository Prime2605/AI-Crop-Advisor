import { useState } from 'react';
import axios from 'axios';
import { Location } from '../types';

interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

interface LocationSearchProps {
    onLocationSelect: (location: Location) => void;
}

export function LocationSearch({ onLocationSelect }: LocationSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleSearch = async (value: string) => {
        setQuery(value);

        if (value.length < 3) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&limit=5`,
                {
                    headers: {
                        'User-Agent': 'CropAdvisor/1.0',
                    },
                }
            );
            setResults(response.data);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelect = (result: SearchResult) => {
        onLocationSelect({
            lat: parseFloat(result.lat),
            lon: parseFloat(result.lon),
        });
        setQuery(result.display_name.split(',')[0]);
        setShowResults(false);
    };

    return (
        <div className="location-search">
            <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                    placeholder="Search location..."
                    className="search-input"
                />
                {loading && <div className="search-spinner" />}
            </div>

            {showResults && results.length > 0 && (
                <div className="search-results">
                    {results.map((result, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(result)}
                            className="search-result-item"
                        >
                            <span className="result-icon">📍</span>
                            {result.display_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
