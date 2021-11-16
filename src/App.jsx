import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import List from "./Components/List";
import Modal from "./Components/Modal";
import NewItem from "./Components/NewItem";
import { useRef } from "react";
import productsSort from "./Common/productsSort";
import Stats from "./Components/Stats";
import Message from "./Components/Message";

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
        // setList(res.data);
        setList(productsSort((res.data), sortBy.current));
      })
  }, [lastUpdate])

  //Create Node:
  const create = item => {
    axios.post('http://localhost:3003/products', item)
      .then(res => {
        setLastUpdate(Date.now())
        // zinute
        addMsg('Product was added!')
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
  // ------------------------------------
  const sortBy = useRef('');

  const [product, setProduct] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [searchBy, setSearchBy] = useState('');

  const sort = (by) => {
    setList(productsSort(list, by))
    sortBy.current = by;
  }

  const reset = () => {
    setLastUpdate(Date.now());
  }

  useEffect(() => {
    axios.get('http://localhost:3003/products-product')
      .then(res => {
        setProduct(res.data);
        console.log(res.data);
      })
  }, [lastUpdate])

  useEffect(() => {
    if (filterBy) {
      axios.get('http://localhost:3003/products-filter/' + filterBy)
        .then(res => {
          setList(productsSort((res.data), sortBy.current));
          console.log(res.data);
        })
    }
  }, [filterBy])

  useEffect(() => {
    if (searchBy) {
      axios.get('http://localhost:3003/products-product/?s=' + searchBy)
        .then(res => {
          setList(productsSort((res.data), sortBy.current));
          console.log(res.data);
        })
    }
  }, [searchBy])

// -------------------------------------------------------------
const [stats, setStats] = useState({
  count: 0,
  price: 0,
  average: 0
});

const [groupStats, setGroupStats] = useState([]);

useEffect(() => {
  axios.get('http://localhost:3003/stats')
    .then(res => {
      setStats(res.data[0]);
      console.log(res.data);
    })
}, [lastUpdate])

useEffect(() => {
  axios.get('http://localhost:3003/group-stats')
    .then(res => {
      setGroupStats(res.data)
      console.log(res);
    })
}, [lastUpdate])

// ------------------------------------------------------

const [showMsg, setShowMsg] = useState(false);
const msg = useRef('labas');

const addMsg = text => {
  msg.current = text;
  setShowMsg(true);
  setTimeout(() => {clearMsg()}, 2000);
}

const clearMsg = () => {
  setShowMsg(false);
}


  return (
    <div className='general'>
      <Message msg={msg.current} showMsg={showMsg} />
      {/* ----------------------------------------------------- */}
      <Stats  stats={stats} groupStats={groupStats}/>
      {/* ------------------------------------------------------ */}
      <Filter sort={sort} product={product} filter={setFilterBy} reset={reset} search={setSearchBy}  />
      {/* ---------------------------------------- */}
      <NewItem create={create} />
      <List list={list} modal={modal} />
      <Modal showModal={showModal} hide={hide} modalElement={modalElement} edit={edit} remove={remove} />
    </div>
  );
}

export default App;