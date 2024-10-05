export default function ReservationHero({headerText, photo}) {
    return <header>
        {/* TODO: Back button */}
        <h1>{headerText}</h1>
        <img src={photo} alt=""/>
    </header>;
}