import firebase from "firebase/app";
import { useState } from "react";
import { FaCircle, FaCheckCircle } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";


export const List = ({ lists }) => {
  const [listItem, setListItem] = useState([]);
  return (
    <ul>
      {lists.map((item, id) => {
        const changeName = (e) => {
          setListItem(item);
          console.log(listItem);
          const { value } = e.target;
          const ref = firebase
            .database()
            .ref("users" + "/pawelnoo/" + "database/" + "list/")
            .child(id);
          ref.update({
            name: value,
          });
        };
        const changeStatus = () => {
          const ref = firebase
            .database()
            .ref("users" + "/pawelnoo/" + "database/" + "list/")
            .child(id);
          ref.update({
            status: false,
          });
        };
        const changeStatusTrue = () => {
          const ref = firebase
            .database()
            .ref("users" + "/pawelnoo/" + "database/" + "list/")
            .child(id);
          ref.update({
            status: true,
          });
        };
        const deleteTodo = () => {
          const ref = firebase
            .database()
            .ref("users" + "/pawelnoo/" + "database/" + "list/")
            .child(id);
          ref.remove();
        };
        return (
          <li>
            {item.status ? (
              <div className='item-container'>
                <FaCircle onClick={changeStatus} />
                <input
                  type="text"
                  onChange={changeName}
                  value={item.name}
                  name="name"
                />
              </div>
            ) : (
                <div className='item-container'>
                <FaCheckCircle onClick={changeStatusTrue} />
                <input
                  className="done"
                  type="text"
                  onChange={changeName}
                  value={item.name}
                  name="name"
                />
                  <TiDeleteOutline onClick={deleteTodo} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
