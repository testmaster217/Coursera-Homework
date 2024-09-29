export default function ReservationHero({headerText, photo}) {
    return <header>
        <h1>{headerText}</h1>
        <img src={photo}/>
    </header>;
}