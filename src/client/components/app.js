import React, { useState, useEffect } from 'react';

const App = () => {
    const [currentTime, setTime] = useState(new Date());

    useEffect(() => {
        window.setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);

    return <div>
        The current date/time is {currentTime.toString()}
    </div>
}

export default App;