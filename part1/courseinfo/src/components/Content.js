import React from "react";
import Part from './Part'

const Content = ({ parts }) => {
  const rows = () => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>);
  
  return (
    <div> 
        {rows()}
    </div>
  );
};

export default Content;
