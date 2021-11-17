function Item({ item, modal }) {

    const showEdit = () => {
        modal(item)
    }

    return (
        <div className='general-item'>
            <span>Product: </span>
            <div className='each-item'>
                <div>{item.product}</div>
            </div>
            <span>Quantity: </span>
            <div className='each-item'>
                <div>{item.quantity}</div>
            </div>
            <div className='each-item'>
                <span>Price: </span>
                <div>{item.price}</div>
            </div>
            <div className='each-item'>
                <span>In stock: </span>
                <div>{item.in_stock}</div>
            </div>
            <div className='each-item'>
                <span>Last order: </span>
                <div>{item.last_order.slice(0,10)}</div>
            </div>
            <button onClick={showEdit}>Edit</button>
        </div>
    );

}
export default Item;