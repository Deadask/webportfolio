import Banner from '../components/Banner';
//import Highlights from '../components/Highlights';


export default function Home() {

	const data = {
		title: "Online Store",
		content: "Buy what you want Online",
		destination: "/login",
		label: "Login"
	}


	return (
		<>
		<Banner data={data} />
    	{/* <Highlights /> */}
    	
		</>
	)
}