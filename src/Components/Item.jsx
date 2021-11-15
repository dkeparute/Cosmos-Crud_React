function Item({ item, modal }) {

    const showEdit = () => {
        modal(item)
    }

    return (
        <div className='one'>
            <span>Product: </span>
            <div className='two'>
                <div>{item.product}</div>
            </div>
            <span>Quantity: </span>
            <div className='two'>
                <div>{item.quantity}</div>
            </div>
            <div className='two'>
                <span>Price: </span>
                <div>{item.price}</div>
            </div>
            <div className='two'>
                <span>In stock: </span>
                <div>{item.in_stock}</div>
            </div>
            <div className='two'>
                <span>Last order: </span>
                <div>{item.last_order}</div>
            </div>
            <button onClick={showEdit}>Edit</button>
        </div>
    );

}
export default Item;