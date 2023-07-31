import Banner from '../components/Banner';

export default function Error() {

    const data = {
        title: "You dont have Access to this page",
        content: "The page you are looking for cannot be found.",
        destination: "/",
        label: "Back to Home"
    }

    return (
        <Banner data={data} />
    )
}