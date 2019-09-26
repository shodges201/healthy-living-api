import React, { Component } from 'react';
import Graph from '../../Components/Graph/Graph.js'
import CholesterolForm from '../../Components/CholesterolForm/CholesterolForm.js'

class Cholesterol extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <Graph caption="Cholesterol Tracking" yAxisLabel="Total Cholesterol Level" suffix="mg/dl"/>
            <CholesterolForm/>
            </>
         );
    }
}
 
export default Cholesterol;