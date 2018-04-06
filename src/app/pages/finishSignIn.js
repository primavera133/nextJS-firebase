import React from "react"
import * as firebase from "firebase/app"
import "firebase/auth"

import App from "../components/App"
import { initFirebaseApp } from "../utils/initFirebaseApp"

class FinishSignIn extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: null,
      isNewUser: false,
    }

    initFirebaseApp()
  }

  componentDidMount () { //note: only runs clientside
    // Confirm the link is a sign-in with email link.
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn")
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation")
      }
      // The client SDK will parse the code from the link for you.
      this.unregisterAuthObserver = firebase.auth().signInWithEmailLink(email, window.location.href)
        .then(result => {
          // Clear email from storage.
          // window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
          this.setState({
            user: result.user,
            isNewUser: result.additionalUserInfo.isNewUser,
          })

        })
        .catch(function(error) {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
          console.log(error.code)
          console.error(error)
          if (error.code === "auth/invalid-action-code") {
            window.alert(`${error.code}: Email link has expired`)
          }
        })
    }
  }

  componentWillUnmount () {
    // Un-registers the auth state observer.
    this.unregisterAuthObserver()
  }

  render () {
    return (<App>
      <p>Finish signup Page</p>
      {this.state.user && (
        <p>Signed in: {this.state.user.email}</p>
      )}
    </App>)
  }
}

export default FinishSignIn
