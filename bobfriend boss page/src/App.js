import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import MenuPage from './component/menu/MenuPage';
import StoreRead from './component/StoreRead';
import LoginPage from './component/LoginPage';
import Topbar from './component/css/Topbar';
import Sidebar from './component/css/Sidebar';
import Home from './component/home/Home';
import Review from './component/review/Review';
import OrderPage from './component/order/OrderPage';

function App() {
	return (
		<>
			{sessionStorage.getItem("u_type") ?
				<div className="App">
					<Topbar />
					<div className="containers">
						<Sidebar />
						<Switch>
							<Route path='/' component={Home} exact />
							<Route path='/info' component={StoreRead} />
							<Route path='/menu' component={MenuPage} />
							<Route path='/review' component={Review} />
							<Route path='/order' component={OrderPage} />
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
