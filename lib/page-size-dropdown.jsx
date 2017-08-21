const React = require("react");

const DEFAULT_PAGE_SIZES = [12,15,20,25,30,50,100];

module.exports = function PageSizeDropdown(props) {
    return (
        <div>
            Liczba elementów:
            <select className="dropdown" onChange={e=>props.onChange(e.target.value)} value={props.value}>
			  {(props.page_sizes || DEFAULT_PAGE_SIZES).map(size=><option value={size}>{size}</option>)}
            </select>
        </div>
    );
};
