import React from 'react';

const Buttons = (props) => {
  return (
    <div className="btn-container">
      {
        (props.n > 1) ?  <button className="btn btn-default" onClick={() => props.handleClickPrev()}>prev</button> : <button className="btn btn-default disabled">prev</button>
      }
      <span className="page">page {props.n}</span>
      {
        (props.n < props.totalPages) ? <button className="btn btn-default" onClick={() => props.handleClickNext()}>next</button> : <button className="btn btn-default disabled">next</button>
      }
    </div>
  );
}

export default Buttons;
