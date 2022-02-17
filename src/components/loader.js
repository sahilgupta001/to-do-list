import React from 'react';

export default function Loader () {
    return (
        <section className = "loader">
            <div className = "alignLoader">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </section>
    )
}