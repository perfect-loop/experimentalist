import React from "react";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import $ from "jquery";

const handleClick = () => {
  if ($("#wc-container-left.show-participants").length === 0) {
    alert("Please open participants tab before admiting participants");
  }
  $(".waitingroom-ul")
    .find(".btn:contains('Admit')")
    .trigger("click");
};

export default function AdmitAll() {
  return (
    <div>
      <GroupAddIcon onClick={handleClick} />
    </div>
  );
}
