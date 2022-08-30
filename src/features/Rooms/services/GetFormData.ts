function getData(e: React.SyntheticEvent) {
  const target = e.target as typeof e.target & {
    elements: {
      private: { checked: boolean };
      RoomName: { value: string };
      Password: { value: string };
      Description: { value: string };
      friend: any;
    };
  };

  // collect data
  const RoomName = target.elements.RoomName.value;
  const RoomPassword = target.elements.Password.value;
  const RoomDescription = target.elements.Description.value;
  const type = target.elements.private.checked
    ? "private"
    : RoomPassword
    ? "protected"
    : "public";

  const members: string[] = [];
  const memebersElems = target.elements.friend;

  if (memebersElems) {
    if (memebersElems.length != undefined) {
      // multple users
      memebersElems.forEach((node: HTMLInputElement) => {
        if (node.checked) {
          members.push(node.value);
        }
      });
    } else if (memebersElems.checked) {
      // one user
      members.push(memebersElems.value);
    }
  }

  return {
    name: RoomName,
    description: RoomDescription,
    password: RoomPassword,
    type: type,
    members: members,
  };
}

export { getData };
