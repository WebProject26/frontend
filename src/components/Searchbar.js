import React from 'react'

const SearchBar = () => (
    <div>
        <form action="/" method="get">
        <label htmlFor="header-search">
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="What are you craving?"
            name="s" 
        />
        <button type="submit">Search</button>
        </form>
    </div>
);

export default SearchBar;