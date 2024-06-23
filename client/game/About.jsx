import React from "react";

class About extends React.Component {
  // handleSendEmail = () => {
  //   const gameID = document.getElementById("gameID").value;
  //   const mturkID = document.getElementById("mturkID").value;
  //   const issues = document.getElementById("issues").value;

  //   // Make a POST request to the server's API endpoint
  //   fetch("/send-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ gameID, mturkID, issues }),
  //   })
  //     .then((response) => response.text())
  //     .then((result) => {
  //       console.log(result);
  //       // Optionally, you can display a success message to the user
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Display an error message to the user
  //     });
  // };

  handleSendEmail = () => {
    const gameID = document.getElementById("gameID").value;
    const mturkID = document.getElementById("mturkID").value;
    const issues = document.getElementById("issues").value;

    const mailtoUrl = `mailto:machinterview@gmail.com?subject=Social Interaction issue report&body=
    Game ID: ${gameID}%0D%0A
    Mturk ID: ${mturkID}%0D%0A
    Issues: ${issues}`;
    window.location.href = mailtoUrl;
  };

  render() {
    return (
      <>
        <div id="overallContainer" className="flex flex-col items-center">
          <div id="reportContainer" className="">
            <h1 className="text-xl font-bold">
              Report any issues by entering your in-game ID, Mturk ID, and
              issues.
            </h1>
            <h1 className="text-xl font-semibold">
              By pressing report, it will open up your email app. If trouble
              exits, please manually email to{" "}
              <strong className="underline underline-offset-4 font-bold">
                {" "}
                machinterview@gmail.com
              </strong>{" "}
              with your MTurkID and any issues.
            </h1>
          </div>

          <div className="relative w-[80%] mb-[15px]">
            <label
              className="block uppercase text-gray-700 text-xl font-semibold mb-2"
              htmlFor="grid-password"
            >
              Game ID:
            </label>
            <input
              id="gameID"
              className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="relative w-[80%] mb-[15px]">
            <label
              className="block uppercase text-gray-700 text-xl font-semibold mb-2"
              htmlFor="grid-password"
            >
              Mturk ID:
            </label>
            <input
              id="mturkID"
              className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
            />
          </div>
          <div className="relative w-[80%] mb-[15px]">
            <label
              className="block uppercase text-gray-700 text-xl font-semibold mb-2"
              htmlFor="grid-password"
            >
              Issue:
            </label>
            <textarea
              className="border-0 px-2 py-2 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
              dir="auto"
              id="issues"
              name="reason"
              style={{ resize: "none" }}
              placeholder="Explain the issue you encountered"
              maxLength={400}
            />
            {/* <input
              id="issues"
              className="border-0 px-4 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-2xl shadow focus:outline-none focus:ring w-full"
            /> */}
          </div>
          <button
            id="sendEmail"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={this.handleSendEmail}
          >
            Report
          </button>
        </div>
      </>
    );
  }
}

export default About;

//  <div>
//    {" "}
//    If you have any issues, please reach out to aproma@cs.rochester.edu to report
//    it. If you'd like to report responses of other participants' please send an
//    email with the player's ID number as you see on the screen. If you run into
//    technical issues, please email us with as much details of the problem you're
//    having as possible.
//  </div>;
