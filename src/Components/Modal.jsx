import { useEffect, useState } from "react";

function Modal({ showModal, hide, modalElement, edit, remove }) {

    const [inputs, setInputs] = useState({
        th: '',
        th: '',
        th: '',
        th: ''
    })

    const control = (e, what) => {
        const inputsCopy = { ...inputs };
        inputsCopy[what] = e.target.value;
        setInputs(inputsCopy);
    }

    useEffect(() => {
        setInputs({
            th: modalElement.th,
            th: modalElement.th,
            th: modalElement.th,
            th: modalElement.th
        })
    }, [modalElement])

    const handleEdit = () => {
        edit({
            th: inputs.th,
            th: inputs.th,
            th: inputs.th,
            th: inputs.th
        }, modalElement.id)
    }

    return (
        <div className='six' style={{ display: showModal ? 'flex' : 'none', top: window.scrollY + 200 + 'px' }}>
            <div className='seven'>
                <span>Product: </span> <input type="text" value={inputs.product} onChange={(e) => control(e, 'product')} placeholder="insert product" />
            </div>
            <div className='seven'>
                <span>Quantity: </span> <input type="text" value={inputs.quantity} onChange={(e) => control(e, 'quantity')} placeholder="insert quantity" />
            </div>
            <div className='seven'>
                <span>Price: </span> <input type="text" value={inputs.price} onChange={(e) => control(e, 'price')} placeholder="insert price" />
            </div>
            <div className='seven'>
                <span>In stock: </span> <input type="date" value={inputs.in_stock} onChange={(e) => control(e, 'in_stock')} />
            </div>
            <div className='seven'>
                <span>Last order: </span> <input type="date" value={inputs.last_order} onChange={(e) => control(e, 'last_order')} />
            </div>
            <button onClick={handleEdit}>Save</button>
            <button onClick={hide}>Cancel</button>
            <button onClick={() => remove(modalElement.id)}>Delete</button>
        </div>

    );
}
export default Modal;