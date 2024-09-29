import SpecialCard from "./SpecialCard";

export default function Specials() {
    return <section>
        <h3>This Week's Specials!</h3>
        <button type="button">Online Menu</button>
        <ul>
            {/* All data will (in the real world) have to come from an API. */}
            <li>
                <SpecialCard
                    photoPath="./Assets/greek salad.jpg"
                    name="Greek Salad"
                    price="12.99"
                    description="The famous Greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
                />
            </li>
            <li>
                <SpecialCard
                    photoPath="./Assets/bruchetta.svg"
                    name="Bruchetta"
                    price="5.99"
                    description="Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
                />
            </li>
            <li>
                <SpecialCard
                    photoPath="./Assets/lemon dessert.jpg"
                    name="Lemon Dessert"
                    price="5.00"
                    description="This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
                />
            </li>
        </ul>
    </section>
}