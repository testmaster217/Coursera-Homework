export default function TestimonialCard({starRating, profilePhoto, profileName, reviewText}) {
    return <article>
        <h4>{starRating}</h4>
        <section>
            <img src={profilePhoto}/>
            <span>{profileName}</span>
        </section>
        <p>{reviewText}</p>
    </article>
}