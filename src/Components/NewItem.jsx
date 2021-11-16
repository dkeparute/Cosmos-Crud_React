import { useState } from "react";

function NewItem({ create }) {

    const [inputs, setInputs] = useState({
        product: '',
        quantity: '',
        price: '',
        in_stock: '',
        last_order: ''
    })
    const control = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    const handleCreate = () => {
        create(inputs);
        setInputs({
            product: '',
            quantity: '',
            price: '',
            in_stock: '',
            last_order: ''
        })
    }

    return (
        <div className='new-item'>
            <div className='each-new-item'>
                <span>Product: </span> <input type="text" value={inputs.product} onChange={(e) => control(e, 'product')} placeholder="insert product" />
            </div>
            <div className='each-new-item'>
                <span>Quantity: </span> <input type="text" value={inputs.quantity} onChange={(e) => control(e, 'quantity')} placeholder="insert number" />
            </div>
            <div className='each-new-item'>
                <span>Price: </span> <input type="text" value={inputs.price} onChange={(e) => control(e, 'price')} placeholder="insert price" />
            </div>
            <div className='each-new-item'>
                <span>In stock: </span> <input type="text" value={inputs.in_stock} onChange={(e) => control(e, 'in_stock')} placeholder="insert number"  />
            </div>
            <div className='each-new-item'>
                <span>Last order: </span> <input type="date" value={inputs.last_order} onChange={(e) => control(e, 'last_order')} />
            </div>
            <button onClick={handleCreate}>Add new</button>
        </div >

    );
}
export default NewItem;