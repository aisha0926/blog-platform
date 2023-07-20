import { Outlet } from 'react-router-dom';
import Header from './Header';
import Trends from './Trends';


function Layout() {
    return ( 
        <main>
            <Header/>
            <Trends/>
            <Outlet/>

        </main>
     );
}

export default Layout;