import React from 'react';
import PostList from './pages/posts'
import LoadingBar from 'react-redux-loading-bar'


const App = () => (
    <div>
        <header>
            <LoadingBar/>
        </header>
        <div
            className='container'>
            <PostList/>
        </div>
    </div>
)

export default App;