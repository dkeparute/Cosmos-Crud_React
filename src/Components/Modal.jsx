import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, remove }) {

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

    useEffect(() => {
        setInputs({
            product: modalElement.product,
            quantity: modalElement.quantity,
            price: modalElement.price,
            in_stock: modalElement.in_stock,
            last_order: modalElement.last_order.slice(0,10)
        })
    }, [modalElement])

    const handleEdit = () => {
        edit({
            product: inputs.product,
            quantity: inputs.quantity,
            price: inputs.price,
            in_stock: inputs.in_stock,
            last_order: inputs.last_order
        }, modalElement.id)
    }

    return (
        <div className='general-modal' style={{ display: showModal ? 'flex' : 'none', top: window.scrollY + 300 + 'px' }}>
            <div className='each-modal'>
                <span>Product: </span> <input type="text" value={inputs.product} onChange={(e) => control(e, 'product')} />
            </div>
            <div className='each-modal'>
                <span>Quantity: </span> <input type="text" value={inputs.quantity} onChange={(e) => control(e, 'quantity')} />
            </div>
            <div className='each-modal'>
                <span>Price: </span> <input type="text" value={inputs.price} onChange={(e) => control(e, 'price')} />
            </div>
            <div className='each-modal'>
                <span>In stock: </span> <input type="text" value={inputs.in_stock} onChange={(e) => control(e, 'in_stock')} />
            </div>
            <div className='each-modal'>
                <span>Last order: </span> <input type="date" value={inputs.last_order} onChange={(e) => control(e, 'last_order')} />
            </div>
            <button onClick={handleEdit}>Save</button>
            <button onClick={hide}>Cancel</button>
            <button onClick={() => remove(modalElement.id)}>Delete</button>
        </div>

    );
}
export default Modal;