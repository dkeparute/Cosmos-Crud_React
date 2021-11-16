import Item from "./Item";

function List({ list, modal }) {
    return (
        <div className='list'>
            {list.map(item => <Item key={item.id} item={item} modal={modal}></Item>)}
        </div>
    );

}
export default List;