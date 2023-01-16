import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './compontent/LoginPage';
import { Route, Switch } from 'react-router-dom';
import Header from './compontent/Header';
import UserRead from './compontent/user/UserRead';
import UserList from './compontent/user/UserList';
import StorePage from './compontent/store/StorePage';
import ReportList from './compontent/report/ReportList';
import Topbar from './compontent/css/Topbar';
import Sidebar from './compontent/css/Sidebar';
import HomePage from './compontent/home/HomePage';

function App() {
    return (
        <>
        {sessionStorage.getItem("u_type") ?
        <div className="App">
            <Topbar/>
        <div className="containers">
            
                    <Sidebar/>
                    <Switch>
                        <Route path="/" component={HomePage} exact />
                        <Route path="/user/list" component={UserList} />
                        <Route path="/user/read/:u_code" component={UserRead} />
                        <Route path='/store' component={StorePage} />
                        <Route path='/report/list' component={ReportList} />
                    </Switch>
                    </div>
                  </div>
              
                :
                <LoginPage />
            }
        </>
    );
}

export default App;
