import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch';
import faUser from '@fortawesome/fontawesome-free-solid/faUser';
import faBook from '@fortawesome/fontawesome-free-solid/faBook';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';

const Footer = () => {
    return (
        <footer className="bck_b_dark">
            <div className="container">
                <div className="logo">
                    PUBMED
                </div>
                <div className="wrapper">
                    <div className="left">
                        <h2>Functions</h2>
                        <div className="business_nfo">
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Discover recent publications</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faBook}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Provide content-based recommendation</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faUser}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Provide user-based recommendation</div>
                                </div>
                            </div>
                            <div className="tag">
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="icon"
                                />
                                <div className="nfo">
                                    <div>Confirm relavance with some clicks</div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="left">
                        <h2>Latest updates</h2>
                        <div>
                            <div>
                                Currently providing content-based recommendation among 1000+ articles 
                            </div>
                        </div>
                    </div>      
                </div>
            </div>
        </footer>
    );
};

export default Footer;