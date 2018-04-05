// src/app/components/Header.js
import Link from "next/link"

export default ({ pathname }) =>
	<header>
		<Link href="/">
			<a>Home</a>
		</Link>{" "}
		<Link href="/about">
			<a>About</a>
		</Link>{" "}
		<Link href="/signin">
			<a>Sign in</a>
		</Link>
	</header>