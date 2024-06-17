import { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header>
            <h1>{props.title}</h1>
            <nav style={{ backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
    <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }}>
        <li style={{ display: 'inline', marginRight: '20px' }}><Link to='/' style={{ textDecoration: 'none', color: '#333' }}>Home</Link></li>
        <UserContext.Consumer>
            {context => (
                context.user ? (
                    <>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to='/publish' style={{ textDecoration: 'none', color: '#333' }}>Publish</Link></li>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to='/profile' style={{ textDecoration: 'none', color: '#333' }}>Profile</Link></li>
                        <li style={{ display: 'inline' }}><Link to='/logout' style={{ textDecoration: 'none', color: '#333' }}>Logout</Link></li>
                    </>
                ) : (
                    <>
                        <li style={{ display: 'inline', marginRight: '20px' }}><Link to='/login' style={{ textDecoration: 'none', color: '#333' }}>Login</Link></li>
                        <li style={{ display: 'inline' }}><Link to='/register' style={{ textDecoration: 'none', color: '#333' }}>Register</Link></li>
                    </>
                )
            )}
        </UserContext.Consumer>
    </ul>
</nav>

        </header >
    );
}

export default Header;
