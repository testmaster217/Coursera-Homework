import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
    return <section>
        <h1>Testimonials</h1>
        <ul>
            {/* Replace all profilePhotos with the actual paths to the images. */}
            {/* All data will (in the real world) have to come from an API. */}
            <li>
                <TestimonialCard
                    starRating="⭐⭐⭐⭐⭐"
                    profilePhoto=""
                    profileName="Dan"
                    reviewText="Best food ever!"
                />
            </li>
            <li>
                <TestimonialCard
                    starRating="⭐⭐⭐⭐"
                    profilePhoto=""
                    profileName="Ally"
                    reviewText="Adrian and Mario are so friendly."
                />
            </li>
            <li>
                <TestimonialCard
                    starRating="⭐⭐⭐⭐⭐"
                    profilePhoto=""
                    profileName="Bob"
                    reviewText="Adrian and Mario are amazing chefs."
                />
            </li>
            <li>
                <TestimonialCard
                    starRating="⭐⭐⭐⭐⭐"
                    profilePhoto=""
                    profileName="Leah"
                    reviewText="10/10 would eat here again!"
                />
            </li>
        </ul>
    </section>
}