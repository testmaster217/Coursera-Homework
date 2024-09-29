export default function TestimonialCard({starRating, profilePhoto, profileName, reviewText}) {
    return <article>
        <h3>{starRating}</h3>
        <section>
            <img src={profilePhoto}/>
            <span>{profileName}</span>
        </section>
        <p>{reviewText}</p>
    </article>
}