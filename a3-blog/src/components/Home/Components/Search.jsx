import React, { useEffect } from 'react';
import {DebounceInput} from 'react-debounce-input';
const search_icon = require('../../../assets/search.png');

const Search = ({handleSearch}) => {

    return (
        <React.Fragment>
            <div
                className="border mt-6 border-slate-200 flex items-center w-11/12 lg:w-1/2 mx-auto bg-gray-50 h-12 px-5 rounded-lg text-sm ring-emerald-200"
            >
                <DebounceInput
                    id="search"
                    minLength={1}
                    className="outline-none border-none bg-gray-50 h-full w-full mr-2"
                    debounceTimeout={500}
                    placeholder="Search"
                    type={"text"}
                    onChange={(e) => handleSearch(e?.target?.value)} 
                />

                <img
                    className="inline h-6 cursor-pointer"
                    src={search_icon}
                    alt="Search"
                 />
            </div>
        </React.Fragment>
    );
};

export default Search;