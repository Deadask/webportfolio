import Banner from '../components/Banner';
import UserContext from '../UserContext';
import {useContext, useEffect, useState} from 'react'
import AdminHome from '../components/AdminHome';
import HotItems from '../components/HotItems';
//import Highlights from '../components/Highlights';


export default function Home() {
	const {user} = useContext(UserContext);
	let data = {}
	if (user.isAdmin){
		data = {
			title: "Online Store",
			content: "Buy what you want Online",
			destination: "/login",
			label: "Login"
		}
		
	} else {
		data = {
			title: "Online Store",
			content: "Buy what you want Online",
			destination: "/products/all",
			label: "Browse"
		}
		
	}
	


	return (
		<>
		{(user.isAdmin) ?
			<AdminHome />
			:			
			<>
			<Banner data={data} />
			<HotItems/>
			</>
			
		}
    	
		</>
	)
}