import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <>
        <div
          id="instructOneContainer"
          className="flex flex-col items-center mx-[80px] space-y-[20px]"
        >
          <h1 className="font-bold text-4xl">Instructions</h1>

        
          <p className="text-2xl">
          The purpose of this study is to explore how various attributes and actions of social networks affect the subject’s responses in temporal social networks. 
          We specifically look at climate change-related content for this experiment. 
          </p>

          <p className="text-2xl">
          This study consists of 5 rounds, and each round has 3 stages. You must complete the required task within the given timeframe. </p>

        
         
          <p className="text-2xl"> For the <strong>first round</strong>,  
          <ul>
           
          <li> <strong>Stage 1: </strong>You will be presented with a climate statement and asked to rate the statement on a 7 point Likert scale on how strongly you agree with the statement. </li>
          <li><strong>Stage 2: </strong>You will then be assigned 3 connections during the start of the experiment, and you will see the answers of your connections and have the option to update your answer if you want to. </li>
          <li><strong>Stage 3: </strong>Then, you will select 3 people you want as connections whose answers you will see for the next round. You can stick to the same connections or choose new ones or do a combination of both. You are also required to like or dislike the responses that you see. </li>
        
          </ul>
          </p>

          <p className="text-2xl">
          In the <strong> next round</strong>, you will be shown a new climate statement that you will rate and write a response to. 
          This time, you will see the answers of the people you selected and have the option to update your answers accordingly. The same process is repeated for the following rounds. </p> 

          
          <p>
            {/* <button type="button" onClick={onPrev} disabled={!hasPrev}
            style={{ 
              backgroundColor: 'green',
              color: 'white',
              border: '20 px',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              Previous
            </button> */}
            <button name="next-button" type="button" onClick={onNext} disabled={!hasNext}
            style={{ 
              backgroundColor: 'green',
              color: 'white',
              border: '20 px',
              padding: '10px 20px',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
            }}>
              Next
            </button>
          </p>
        </div>
      </>
    );
  }
}
