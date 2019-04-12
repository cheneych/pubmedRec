import React from 'react';
import Search from './search';

const SearchPage = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div>
                    <h1>Pubmed Recommend System</h1>
                </div>
                <div>
                    <Search/>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;