function Stats({ stats, groupStats }) {

    return (
        <div>
            <div className='statistic-results'>
                <span>Count: <i>{stats.count}</i></span>
                <span>Sum: <i>{stats.price.toFixed(2)}</i> kg</span>
                <span>Average: <i>{stats.average.toPrecision(3)}</i> kg</span>
            </div>
            <div className='statistic-list'>
                {groupStats.map((s => <span key={s.product}><i>{s.product}: </i><b>{s.count}</b></span>))}
            </div>


        </div>
    )
}
export default Stats;