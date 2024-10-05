import marioAndAdrianB from "../Assets/Mario and Adrian b.jpg";

export default function ReservationConfirmation() {
    return <>
        <ReservationHero headerText="Thank you for visiting!" photo={marioAndAdrianB}/>
        <main>
            <p>You should get a confirmation email shortly. We hope you enjoy your experience!</p>
        </main>
    </>;
}