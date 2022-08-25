import React from 'react';

const lws_logo = require('../../assets/lws-logo.png');

const Header = () => {
    return (
        <React.Fragment>
            <nav className="bg-slate-100 shadow-md">
                <div
                    className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3 items-center"
                >
                    <a href="index.html">
                        <img
                            className="h-10"
                            src={lws_logo}
                            alt="Learn with Sumit"
                        />
                    </a>
                </div>
        </nav>
        </React.Fragment>
    );
};

export default Header;