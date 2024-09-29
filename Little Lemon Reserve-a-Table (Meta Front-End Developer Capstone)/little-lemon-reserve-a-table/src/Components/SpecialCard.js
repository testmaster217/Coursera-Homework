export default function SpecialCard({photoPath, name, price, description}) {
    return <article>
        <img src={photoPath}/>
        <header>
            <h3>{name}</h3>
            <span>${price}</span>
        </header>
        <p>{description}</p>
        <footer>
            Order for delivery
            {/* <img src="path/to/delivery_icon.svg"/> */}
        </footer>
    </article>
}