import * as firebase from 'firebase/app'
import 'firebase/auth'

import App from "../components/App"
import { Signin } from "../components/Signin"

import { initFirebaseApp } from "../utils/initFirebaseApp"

export default () => {

	initFirebaseApp()

	return (<App>
		<p>Sign in Page</p>
		<Signin/>
	</App>)
}