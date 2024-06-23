import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";

export default class Consent extends React.Component {
  render() {
    console.log("In Consent")
    return (
      <>
        <div
          id="instructOneContainer"
          className="flex flex-col items-center mx-[80px] space-y-[20px]"
        >
          <h1 className="font-bold text-5xl">
            Consent Form 
          </h1>
          {/* <h1 className="font-bold text-4xl">
            AMAZON MECHANICAL TURK INFORMATION SHEET
          </h1> */}
          {/* <h1 className="font-semibold text-4xl">
            Title: Understanding the Rigidity of Beliefs in Temporal Social
            Networks
          </h1> */}
          {/* <div id="professorName" className="flex flex-row space-x-[10px]">
            <h1 className="font-semibold text-4xl">Principal Investigator: </h1>
            <h1 className="text-4xl">M. Ehsan Hoque</h1>
          </div> */}
          <h1 className="text-4xl">
            Understanding Interactions in Temporal Social Networks
          </h1>
          <p className="text-2xl">
            This form describes a research study that is being conducted by
            Dr. Ehsan Hoque from the University of Rochester’s Department of
            Computer science.
          </p>
          <p className="text-2xl">
            The purpose of this study is to explore how various attributes and
            actions of social networks affect the subject’s responses in
            temporal social networks. We specifically look at climate
            change-related content for this experiment.
          </p>
{/* 
          <p className="text-2xl">
            The purpose of this study is to explore how various attributes and
            actions of social networks affect the subject’s responses in
            temporal social networks. We specifically look at climate
            change-related content for this experiment. Our aim is to model how
            various attributes in social networks can affect the subject’s
            perception of climate change-related topics. The resulting insights
            can inform intervention strategies for combating extreme
            polarization of opinions in social media.
          </p> */}

          
          <p className="text-2xl">
            You will need to spend 60 mins at a stretch at the specific mentioned time and you will be paid once the experiment is completed. If you
            decide to take part in this study, you will be shown prompts that
            discuss climate change-related content. The study consists of
            5 rounds, and every round will have a new prompt. You will be
            asked to rate how much they agree or disagree with the statements
            and why. In the next stage, you will be shown the responses of other
            subjects, and you will have the option to update your answer. Next,
            you will rate the responses of other subjects and you will follow 3
            profiles for the next round. These will be profiles you wish to see
            more of in the next round. 
          </p>
          <p className="text-2xl">
            About 1000 individuals will take part in this study. We may reach
            out to you by email to send you the link of our study or to remind
            you to complete the experiment for the day. Your email is not linked
            to the data that you will provide through the experiment. They are
            stored separately.
          </p>
          <p className="text-2xl">
            The risks of participation are minimal. Some of the questions may be
            upsetting and may be cause of discomfort, but you have the option to
            report content that you think is harmful/ upsetting/ or
            causing you discomfort.
            <br></br>
            <br></br>
            This study will use our custom-built website to collect your
            research data and, therefore, the crowdsource platform will not have access to your
            research data.
            <br></br>
            <br></br>
            There are no expected benefits.
          </p>

          {/* <p className="text-2xl">
            You will be paid $20 via the Mechanical Turk interface and
            the payment will only be provided if you complete the entire
            experiment. <b>You are allowed to participate in the experiment only once.</b>
            No direct payments will be sent from the University of
            Rochester research team.
          </p> */}
           <p className="text-2xl">
            You will be paid $15 via the Prolific interface and
            the payment will only be provided if you complete the entire
            experiment. <b>You are allowed to participate in the experiment only once.</b>
            No direct payments will be sent from the University of
            Rochester research team.
          </p> 

          <p className="text-2xl">
            {" "}
            The University of Rochester makes every effort to keep the
            information collected from you private. To protect the
            confidentiality of the data, responses will be transmitted in an
            encrypted format (readable only to the research team). Worker
            IDs will only be collected for purposes of distributing payments and
            will not be included with your study responses or the study’s data
            set.{" "}
          </p>
          <p className="text-2xl">
            <b>
              {" "}
              Your participation in this study is completely voluntary.&nbsp;
            </b>
            You are free to not participate or to withdraw at any time, for
            whatever reason.
          </p>

          <p className="text-2xl">
            For more information or questions about this research you may
            contact the contact: Dr. M. Ehsan Hoque at{" "}
            <u>machinterview@gmail.com</u>. Please contact the University of
            Rochester Research Subjects Review Board at 265 Crittenden Blvd., CU
            420628, Rochester, NY 14642, Telephone (585) 276-0005 or (877)
            449-4441 for the following reasons: 
            <br></br>
            •You wish to talk to someone other than the research staff about
            your rights as a research subject.
            <br></br>•To voice concerns about the research.
          </p>

          <ConsentButton text="I AGREE" />
        </div>
      </>
    );
  }
}
