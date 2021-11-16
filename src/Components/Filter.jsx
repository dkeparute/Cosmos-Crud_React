import { useState } from "react";

function Filter({ product, filter, reset, search, sort }) {


    const [filterValue, setFilterValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [sortValue, setSortValue] = useState('');

    const selectSort = e => {
        setSortValue(e.target.value);
        sort(e.target.value);

    }

    const selectFilter = e => {
        setFilterValue(e.target.value);
        filter(e.target.value)
    }

    const resetHandler = () => {
        reset();
        setFilterValue('');
        setSearchValue('');
        setSortValue('');
        sort('');
    }
    const handleSearchValue = e => {
        setSearchValue(e.target.value);
        search(e.target.value);
    }


    return (
        <div className='general-filter'>
            <div className='each-filter'>
                <span>Filter by type: </span>
                <select onChange={selectFilter} value={filterValue}>
                    <option value="">Select </option>
                    {product.map(t => <option key={t.product} value={t.product}>{t.product}</option>)}
                </select>
            </div>
            <div className='each-filter'>
                <span>Group by: </span>
                <select onChange={selectSort} value={sortValue} >
                    <option value="">Select </option>
                    <option value="product_asc">Product ASC </option>
                    <option value="product_desc">Product DESC </option>
                    <option value="quantity_asc">Quantity ASC </option>
                    <option value="quantity_desc">Quantity DESC </option>
                </select>
            </div>
            <div className='each-filter'>
                <span>Search by product: </span>
                <input onChange={handleSearchValue} value={searchValue} placeholder="insert text" />
            </div>
            <button onClick={resetHandler}>Reset</button>
        </div>

    );
}
export default Filter;