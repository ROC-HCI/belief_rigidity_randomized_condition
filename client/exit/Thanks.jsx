import React from "react";

export default class Thanks extends React.Component {
  static stepName = "Thanks";
  render() {
    return (
      <div
      className="bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:h-[1200px] md:mx-[100px]">
        <div>
          <h1 style={{ margin: '25px', textAlign: 'justify' }} >Finished!</h1>
          <h2 style={{ margin: '25px', textAlign: 'justify' }}>Thank you for participating!</h2>
        </div>
      </div>
    );
  }
}
