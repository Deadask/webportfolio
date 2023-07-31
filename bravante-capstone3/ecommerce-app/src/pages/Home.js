import Banner from '../components/Banner';
import UserContext from '../UserContext';
import {useContext, useEffect, useState} from 'react'
import AdminHome from '../components/AdminHome';

//import Highlights from '../components/Highlights';


export default function Home() {
	const {user} = useContext(UserContext);
	const data = {
		title: "Online Store",
		content: "Buy what you want Online",
		destination: "/login",
		label: "Login"
	}


	return (
		<>
		{(user.isAdmin) ?
			<AdminHome />
			:			
			<Banner data={data} />

			
		}
    	
		</>
	)
}