import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading-bar'

const Header = props => {
    return (
        <div
            className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <LoadingBar/>
            <h5 className="my-0 mr-md-auto font-weight-normal">Simple blog</h5>
            <nav className="my-2 my-md-0 mr-md-3">
                <a className="p-2 text-dark" href="#">Page #1</a>
                <a className="p-2 text-dark" href="#">Page #2</a>
                <a className="p-2 text-dark" href="#">Page #3</a>
                <a className="p-2 text-dark" href="#">Page #4</a>
            </nav>
            <a className="btn btn-outline-primary" href="#">Sign up</a>
        </div>);
};

Header.propTypes = {};

export default Header;
