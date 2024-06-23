// import React from "react";

// import { Centered } from "meteor/empirica:core";

// const Radio = ({ selected, name, value, label, onChange }) => (
//   <label>
//     <input
//       type="radio"
//       name={name}
//       value={value}
//       checked={selected === value}
//       onChange={onChange}
//     />
//     {label}
//   </label>
// );

// export default class ExitSurvey extends React.Component {
//   static stepName = "ExitSurvey";
//   state = { age: "", gender: "", education: "", feedback: "" };

//   handleChange = (event) => {
//     const el = event.currentTarget;
//     this.setState({ [el.name]: el.value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.onSubmit(this.state);
//   };

//   render() {
//     const { player } = this.props;
//     const { age, gender, feedback } = this.state;

//     return (
//       <Centered>
//         <div className="exit-survey">
//           <div
//             id="exitSurvey"
//             className="bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:h-[1200px] md:mx-[100px]"
//           >
//             <h1 style={{ margin: "25px", textAlign: "justify" }}>
//               {" "}
//               Exit Survey{" "}
//             </h1>

//             <form onSubmit={this.handleSubmit}>
//               <div style={{ margin: "25px", textAlign: "justify" }}>
//                 <label htmlFor="age">Age</label>
//                 <div>
//                   <input
//                     id="age"
//                     type="number"
//                     min="0"
//                     max="150"
//                     step="1"
//                     dir="auto"
//                     name="age"
//                     value={age}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>

//               <div style={{ margin: "25px", textAlign: "justify" }}>
//                 <label htmlFor="gender">Gender</label>
//                 <div>
//                   <input
//                     id="gender"
//                     type="text"
//                     dir="auto"
//                     name="gender"
//                     value={gender}
//                     onChange={this.handleChange}
//                     autoComplete="off"
//                   />
//                 </div>
//               </div>

//               <div style={{ margin: "25px", textAlign: "justify" }}>
//                 <label htmlFor="education">
//                   Highest Education Qualification
//                 </label>
//                 <div>
//                   <Radio
//                     selected={education}
//                     name="education"
//                     value="high-school"
//                     label="High School"
//                     onChange={this.handleChange}
//                   />
//                   <Radio
//                     selected={education}
//                     name="education"
//                     value="bachelor"
//                     label="US Bachelor's Degree"
//                     onChange={this.handleChange}
//                   />
//                   <Radio
//                     selected={education}
//                     name="education"
//                     value="master"
//                     label="Master's or higher"
//                     onChange={this.handleChange}
//                   />
//                   <Radio
//                     selected={education}
//                     name="education"
//                     value="other"
//                     label="Other"
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>

//               <div style={{ margin: "25px", textAlign: "justify" }}>
//                 <label htmlFor="feedback">
//                   Please provide your feedback on the experience. This can
//                   include any problems you encountered or any other issues you
//                   faced during the experiment.
//                 </label>
//                 <div>
//                   <textarea
//                     className="border-[2px] rounded-[8px] w-[750px] h-[100px] ml-[4px] mt-5 placeholder:italic"
//                     dir="auto"
//                     id="feedback"
//                     name="feedback"
//                     value={feedback}
//                     onChange={this.handleChange}
//                   />
//                 </div>
//               </div>

//               <p style={{ margin: "25px", textAlign: "justify" }}>
//                 Please use the following code to receive your bonus:{" "}
//                 <strong>{player._id}</strong>.
//               </p>

//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "green",
//                   color: "white",
//                   border: "20 px",
//                   padding: "10px 20px",
//                   borderRadius: "5px",
//                   fontSize: "16px",
//                   cursor: "pointer",
//                   margin: "30px",
//                   textAlign: "justify",
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </Centered>
//     );
//   }
// }

import React from "react";

import { Centered } from "meteor/empirica:core";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { age: "", gender: "", race: "", education: "", feedback: "" };

  handleChange = (event) => {
    const el = event.currentTarget;
    const { player } = this.props;
    this.setState({ [el.name]: el.value });
    const key = el.name;
    console.log({ [el.name]: el.value });
    player.set(key, el.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    const { player } = this.props;
    const { age, gender, race, education, feedback } = this.state;

    return (
      <Centered>
        <div className="exit-survey">
          <div
            id="exitSurvey"
            className="bg-[#F8F4F2] round border-2 rounded-[12px] mt-20 md:w-[850px] md:h-[1200px] md:mx-[100px]"
          >
            <h1 style={{ margin: "25px", textAlign: "justify" }}>
              {" "}
              Exit Survey{" "}
            </h1>

            <form onSubmit={this.handleSubmit}>
              <div style={{ margin: "25px", textAlign: "justify" }}>
                <label htmlFor="age" style={{ fontWeight: "bold" }}>Age</label>
                <div>
                  <input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    step="1"
                    dir="auto"
                    name="age"
                    value={age}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div style={{ margin: "25px", textAlign: "justify" }}>
                <label htmlFor="gender " style={{ fontWeight: "bold" }}>Gender</label>
                <div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={gender}
                      name="gender"
                      value="male"
                      label="Male"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={gender}
                      name="gender"
                      value="female"
                      label="Female"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={gender}
                      name="gender"
                      value="non-binary"
                      label="Non-binary"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={gender}
                      name="prefer-not-to-answer"
                      value="prefer-not-to-answer"
                      label="Prefer not to answer"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div style={{ margin: "25px", textAlign: "justify" }}>
                <label htmlFor="race" style={{ fontWeight: "bold" }} >Race</label>
                <div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="white"
                      label="White"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="black"
                      label="Black or African American"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="hispanic"
                      label="Hispanic or Latino"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="native-american"
                      label="Native American or American Indian"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="asian-pacific-islander"
                      label="Asian / Pacific Islander"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div style={{ display: "block" }}>
                    <Radio
                      selected={race}
                      name="race"
                      value="other"
                      label="Other"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>

              <div style={{ margin: "25px", textAlign: "justify" }}>
                <label htmlFor="education" style={{ fontWeight: "bold" }}>
                  Highest Education Qualification
                </label>
                <div>
                <div style={{ display: "block" }}>
                  <Radio
                    selected={education}
                    name="education"
                    value="high-school"
                    label="High School"
                    onChange={this.handleChange}
                  />
                  </div>
                  <div style={{ display: "block" }}>
                  <Radio
                    selected={education}
                    name="education"
                    value="bachelor"
                    label="US Bachelor's Degree"
                    onChange={this.handleChange}
                  />
                  </div>
                  <div style={{ display: "block" }}>
                  <Radio
                    selected={education}
                    name="education"
                    value="master"
                    label="Master's or higher"
                    onChange={this.handleChange}
                  />
                  </div>
                  <div style={{ display: "block" }}>
                  <Radio
                    selected={education}
                    name="education"
                    value="other"
                    label="Other"
                    onChange={this.handleChange}
                  />
                  </div>
                </div>
              </div>

              <div style={{ margin: "25px", textAlign: "justify" }}>
                <label htmlFor="feedback" style={{ fontWeight: "bold" }}> Feedback</label>
                  <p> Please provide your feedback on the experience. This can
                  include any problems you encountered or any other issues you
                  faced during the experiment.
                  </p>
                <div>
                  <textarea
                    className="border-[2px] rounded-[8px] w-[750px] h-[100px] ml-[4px] mt-5 placeholder:italic"
                    dir="auto"
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <p style={{ margin: "25px", textAlign: "justify" }}>
                Please message us with the following code to receive payment:{" "}
                <strong>{player._id}</strong>.
              </p>
              {/* <p>
            You final <strong>bonus</strong> is in addition of the <strong> 1 base reward </strong> for completing the HIT.
          </p> */}

              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  border: "20 px",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  margin: "30px",
                  textAlign: "justify",
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </Centered>
    );
  }
}
