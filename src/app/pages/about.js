import React from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

// src/app/pages/about.js
import App from "../components/App"
import { initFirebaseApp } from "../utils/initFirebaseApp"

class AboutPage extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			user: null
		}

		initFirebaseApp();
	}

	handleSignOut = () => {
		firebase.auth().signOut().then(function () {
			this.setState({ user: null })
			// Sign-out successful.
		}).catch(error => {
			// An error happened.
			console.log(error)
		})
	}

	componentDidMount () {
		// Construct the email link credential from the current URL.
		const email = window.localStorage.getItem('emailForSignIn') || '';

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// User is signed in.
				this.setState({ user })
			} else {
				// No user is signed in.
				this.setState({ user: null })
			}
		});
	}

	render () {
		const { user } = this.state
		return (<App>
			<p>About Page</p>
			<p>User: {user && user.email}</p>
			{user && (
				<button onClick={this.handleSignOut}>Sign out</button>
			)}
		</App>)
	}
}

export default AboutPage