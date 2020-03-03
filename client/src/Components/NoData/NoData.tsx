import React from 'react'
import "./NoData.css";

export default function NoData() {
    return (
        <div className="no-data-container">
            <h1 className="no-data-text">
                You haven't entered any data yet! Use the button below to enter some information and after your first entry a graph will appear.
            </h1>
        </div>
    )
}
