import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-cyan-950 animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-cyan-950 animate-bounce" style={{ animationDelay: '-.3s' }}></div>
            <div className="w-4 h-4 rounded-full bg-cyan-950 animate-bounce" style={{ animationDelay: '-.5s' }}></div>
        </div>
    );
};

export default Loading;
