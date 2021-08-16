import firebase from "firebase/app";
import { AiOutlinePlusCircle } from "react-icons/ai";

export const Add = ({ data, lists, setItem, item }) => {
  const postID = lists.length;
  console.log(postID);

  const handleOnChange = (e) => {
    setItem(e.target.value);
  };
  const createTodo = () => {
    const ref = firebase
      .database()
      .ref("users" + "/pawelnoo/" + "database/")
      .child("list");
    const toDoItem = {
      name: item,
      id: data.users.pawelnoo.database.list.length,
      status: true,
    };
    var updates = {};
    updates[postID] = toDoItem;
    ref.update(updates);
    setItem("");
  };

  return (
    <div className="item-container width--80">
      <input type="text" onChange={handleOnChange} value={item} />
      <AiOutlinePlusCircle onClick={createTodo} />
    </div>
  );
};
