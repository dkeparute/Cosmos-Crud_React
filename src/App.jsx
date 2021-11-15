import axios from "axios";
import { useEffect, useState } from "react";
import List from "./Components/List";
import Modal from "./Components/Modal";
import NewItem from "./Components/NewItem";

function App() {

  const [list, setList] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showModal, setShowModal] = useState(false);
  const [modalElement, setModalElement] = useState({
    product: '',
    quantity: '',
    price: '',
    in_stock: '',
    last_order: ''
  });

//Read Node:
  useEffect(() => {
    axios.get('http://localhost:3003/products')
      .then(res => {
        setList(res.data);
      })
  }, [lastUpdate])

//Create Node:
 const create = item => {
    axios.post('http://localhost:3003/products', item)
      .then(res => {
        setLastUpdate(Date.now());
        console.log(res.data);
      })
  }

 const modal = (item) => {
    setShowModal(true);
    setModalElement(item);
  }
  const hide = () => {
    setShowModal(false);
  }
// Update Node:
 const edit = (item, id) => {
    setShowModal(false);
    axios.put('http://localhost:3003/products/' + id, item)
      .then(res => {
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }
//Delete Node:
  const remove = (id) => {
    setShowModal(false);
    axios.delete('http://localhost:3003/products/' + id)
      .then(res => {
        setLastUpdate(Date.now())
        console.log(res.data);
      })
  }
return (
    <div className='zero'>
       <NewItem create={create} />
      <List list={list} modal={modal} />
      <Modal showModal={showModal} hide={hide} modalElement={modalElement} edit={edit} remove={remove} />
    </div>
  );
}

export default App;