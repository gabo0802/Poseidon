import React, { useState, useEffect } from 'react';

function ApiCaller() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/')
            .then(response => {
                console.log(response);  // Log the response object to the console
                return response.text();  // Return the response text
            })
            .then(data => {
                console.log(data);  // Log the data that will be passed to setData
                setData(data);  // Set the data state
            })
            .catch(error => console.error('Error:', error));
    }, []);  // The dependency array should be empty
    return (
        <div className='bg-gray-200 p-4'>
            {data ? (
                <div>{data}</div>
            ) : (
                <p>Loading data...</p>
            )}
        </div>
    );
}

export default ApiCaller;