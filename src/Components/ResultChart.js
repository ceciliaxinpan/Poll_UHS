import React from 'react';
import {ResponsiveContainer, BarChart, Bar, 
        XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default (props) => {
  return props.hidden ? null :(
    <ResponsiveContainer width={600} height={300}>
      <BarChart
      data={props.data}
      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="choice"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
