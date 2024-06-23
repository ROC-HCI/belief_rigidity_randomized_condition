import React from "react";
import Timer from "./Timer.jsx";

export default class PlayerProfile extends React.Component {
  renderProfile() {
    const { player } = this.props;
    return (
      <div className="profile-score">
        <div id="playerName" className="flex flex-row space-x-3 ml-[20px] mt-[25px]">
          <h3 className="text-4xl font-bold">Hello {player.id}</h3>
          <h3 className="text-4xl"> 👋 </h3>
        </div>
        <p> {player.get("")}</p>
        <img
          src={player.get("avatar")}
          className="w-[100px] h-[100px] ml-[45px] mt-[18px]"
        />
      </div>
    );
  }

  //<Timer stage={stage} />
  render() {
    const { stage } = this.props;

    return <aside className="player-profile">{this.renderProfile()}</aside>;
  }
}
