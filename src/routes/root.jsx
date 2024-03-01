import SignUp from "./SignUp";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href={`/LogIn`}>Log In</a>
                        </li>
                        <li>
                            <a href={`/SignUp`}>SignUp</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"></div>
        </>
    );
}