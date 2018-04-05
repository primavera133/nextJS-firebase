import * as firebase from 'firebase/app'
import 'firebase/auth'

export class Signin extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			email: '',
			linkSent: false
		}

	}

	handleEmail = (e) => {
		this.setState({ email: e.target.value })
	}

	handleClick = () => {
		const { email } = this.state;
		const actionCodeSettings = {
			// URL you want to redirect back to. The domain for this URL must be whitelisted in the Firebase Console.
			url: `${window.location.origin}/finishSignIn?cartId=1234`,
			// This must be true for linkbased signin.
			handleCodeInApp: true
		}

		firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
			.then(() => {
				// The link was successfully sent. Inform the user.
				this.setState({ linkSent: true })
				// Save the email locally so you don't need to ask the user for it again if they open the link on the same device.
				window.localStorage.setItem('emailForSignIn', email);
			})
			.catch(function (error) {
				console.log(error.code)
				console.error(error)
				// Some error occurred, you can inspect the code: error.code
			});
	}

	render () {
		return (<div>
				<label>
					Email:
					<input type="email" name="email" placeholder="log@in.com" value={this.state.email}
								 onChange={this.handleEmail}/>
				</label>
				<button type="submit" onClick={this.handleClick}>Sign in</button>
				{this.state.linkSent &&
				<p>Email with link has been sent to {this.state.email}</p>}
			</div>
		);
	}
}