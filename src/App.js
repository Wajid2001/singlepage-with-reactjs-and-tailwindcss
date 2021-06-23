import React, { lazy, Suspense } from "react";
import { NavLink, BrowserRouter as Router, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTimes } from "@fortawesome/free-solid-svg-icons";

import AddWebsiteBtn, {
	navLinkClass,
	activeNaveLinkClass,
	NavBtns,
	myUrls,
} from "./components/AddWebsiteBtn";

const Home = lazy(() => import("./components/Home"));

const closeButton = (
	<div className='hidden sm:block absolute bg-gray-100 p-2 rounded-br-lg rounded-tl-lg border-4 border-gray-100 shadow-lg'>
		<NavLink
			to='./'
			className='rounded-full h-4 pb-1 pt-0.5 px-2 text-red-100 transition-colors duration-150 bg-red-600 focus:shadow-outline hover:bg-red-800'
			title='Close bookmark'
		>
			<FontAwesomeIcon icon={faTimes} />
		</NavLink>
	</div>
);

const App = () => {
	return (
		<Router>
			<div className=' min-h-full bg-gray-300'>
				<div className='flex flex-col-reverse sm:flex-row static'>
					<div className='hidden sm:flex flex-row sm:flex-col w-16 h-screen ml-2 py-2 gap-y-2'>
						{/* This is Home icon */}
						<NavLink
							exact
							to='./'
							className={` bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mr-2 rounded-lg border-0 ${navLinkClass}`}
							activeClassName={`border-2 border-gray-900 pr-2 -mr-2 ${activeNaveLinkClass}`}
						>
							<FontAwesomeIcon
								className='text-white text-2xl'
								icon={faHome}
							/>
						</NavLink>

						{/* These are the Websites which user can open */}
						<NavBtns />

						{/* Add websites to our list */}
						<AddWebsiteBtn />
					</div>

					{/* This is Bottom Bar */}
					<div className='block sm:hidden bg-gray-500 shadow-lg absolute inset-x-0 bottom-0 transform rotate-180 z-40 rounded-b-2xl'>
						<div className='transform rotate-180 justify-center grid grid-flow-col grid-cols-5 grid-rows-auto gap-4 px-4 py-2'>
							{/* This is Home icon */}
							<NavLink
								exact
								to='./'
								className={`  to-red-500 py-3 mx-0 my-auto rounded-lg border-0 ${navLinkClass}`}
								activeClassName={`bg-gradient-to-r from-purple-400 via-pink-500 mx-2 ${activeNaveLinkClass}`}
							>
								<FontAwesomeIcon
									className='text-white text-2xl'
									icon={faHome}
								/>
							</NavLink>

							{/* These are the Websites which user can open */}
							<NavBtns
								replaceClassName='rounded-none sm:rounded-tl-lg sm:rounded-bl-lg'
								replaceClassNameWith=''
								className='center py-2 mx-2'
								activeClassName='shadow rounded-lg'
							/>

							<div className='my-auto'>
								<AddWebsiteBtn />
							</div>
						</div>
					</div>

					{/* This will show the website */}
					<div className='relative w-full bg-white h-screen shadow-lg sm:rounded-tl-lg rounded-br-lg sm:rounded-tr-0 rounded-bl-lg z-10'>
						<Route exact path='/'>
							<Suspense
								fallback={<div className='loading'></div>}
							>
								<Home />
							</Suspense>
						</Route>
						{myUrls.map((e, index) => (
							<Route key={index} exact path={`/${e.title}`}>
								{closeButton}
								<div
									dangerouslySetInnerHTML={{
										__html: `<iframe class='border-0 sm:border-4 border-gray-100 rounded-none sm:rounded-lg w-full h-screen' src='https://${e.url}/' />`,
									}}
								/>
							</Route>
						))}
					</div>
				</div>
			</div>
		</Router>
	);
};
export default App;
