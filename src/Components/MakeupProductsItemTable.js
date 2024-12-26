import '../Style/MakeupProductsItemTable.css'

function MakeupProductsTable(props) {

    const handleImageClick = () => {
        props.onAddProductToCart(props.name)
    }


    return (
        <div className="product-items">
            <img className="image" src={props.image_link} onClick={handleImageClick} alt={props.name}/>
            <div className="name">{props.name}</div>
            <div className="brand">{props.brand}</div>
            <div className="price">{props.price_sign}{props.price}</div>
        </div>
    )
}
export default MakeupProductsTable;