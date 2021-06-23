import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faInfoCircle,
	faPlusCircle,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

// This is the list of websites avaible for user
export const myUrls = [
	{ title: "Wikipedia", url: "en.wikipedia.org" },
	{
		title: "Boostrap",
		url: "getbootstrap.com",
	},
];

export const navLinkClass =
	"pt:1 sm:py-2 px-2 sm:px-auto grid justify-items-center z-0 transition-all";
export const activeNaveLinkClass =
	"bg-white rounded-none sm:rounded-tl-lg sm:rounded-bl-lg shadow-lg z-10";
export const NavBtns = (props) => {
	const a = props.myUrls ? props.myUrls : myUrls;
	return a.map((e, index) => (
		<NavLink
			key={index}
			to={`/${e.title}`}
			className={`${
				props.replaceClassName && props.replaceClassName !== ""
					? navLinkClass.replace(
							props.replaceClassName,
							props.replaceClassNameWith
								? props.replaceClassNameWith
								: "",
					  )
					: navLinkClass
			} ${props.className}`}
			activeClassName={`${activeNaveLinkClass} ${props.activeClassName}`}
			title={e.title}
		>
			<img
				className='text-center'
				src={`https://www.google.com/s2/favicons?sz=32&domain_url=${e.url}`}
				alt={e.title}
			/>
		</NavLink>
	));
};

const MoreUrls = () => {
	const allurls = localStorage.getItem("myUrls")
		? JSON.parse(localStorage.getItem("myUrls"))
		: [];
	return (
		<>
			<NavBtns myUrls={allurls} />
		</>
	);
};

export default function AddWebsiteBtn(props) {
	let [isOpen, setIsOpen] = useState(false);
	let closeButton = useRef(null);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const AddWebsite = () => {
		// Getting values from form
		const url = document.getElementById("url").value;
		url.replace("https://", "").replace("http://", "");
		const title = document.getElementById("title").value;

		// Getting urls from local storage
		let allurls = localStorage.getItem("myUrls")
			? JSON.parse(localStorage.getItem("myUrls"))
			: [];

		// Storing new values
		allurls.push({ title: title, url: url });
		localStorage.setItem("myUrls", JSON.stringify(allurls));

		// Closing the dialog box
		closeModal();
	};

	return (
		<>
			<MoreUrls />
			<div>
				<button
					type='button'
					onClick={openModal}
					className='px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
				>
					<FontAwesomeIcon
						className='text-white text-xl'
						icon={faPlusCircle}
					/>
				</button>
			</div>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as='div'
					initialFocus={closeButton}
					className='fixed inset-0 z-10 overflow-y-auto'
					onClose={closeModal}
				>
					<div className='min-h-screen px-4 text-center'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Dialog.Overlay className='fixed inset-0' />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}
						<span
							className='inline-block h-screen align-middle'
							aria-hidden='true'
						>
							&#8203;
						</span>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 scale-95'
							enterTo='opacity-100 scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 scale-100'
							leaveTo='opacity-0 scale-95'
						>
							<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden border text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
								<div className='absolute top-3 right-3'>
									<button
										ref={closeButton}
										type='button'
										className='inline-flex rounded-full justify-center h-4 w-4 text-xs pt-px font-medium text-transparent hover:text-white bg-red-500 border border-transparent rounded hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500'
										onClick={closeModal}
										title='Close'
									>
										<FontAwesomeIcon icon={faTimes} />
									</button>
								</div>
								<Dialog.Title
									as='h3'
									className='text-lg font-medium leading-6 text-gray-900'
								>
									Add Bookmark
								</Dialog.Title>
								<div>
									<input
										id='title'
										type='text'
										className='mt-4 appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-gray-300  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10'
										placeholder='Title'
										required
									/>
									<input
										id='url'
										type='text'
										className='mt-4 appearance-none rounded-lg relative block w-full px-3 py-2 border-2 border-gray-300  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10'
										placeholder='Add Url'
										required
									/>
									<div className='mt-2 text-xs text-gray-900'>
										<FontAwesomeIcon
											className='mr-2'
											icon={faInfoCircle}
										/>
										Check your url, if it works in iframe{" "}
										<a
											className='text-blue-500'
											href='http://www.tinywebgallery.com/blog/advanced-iframe/free-iframe-checker'
										>
											here.
										</a>
									</div>
								</div>

								<div className='mt-4 flex'>
									<button
										type='button'
										className=' ml-auto mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900  border-2 border-transparent rounded-md hover:border-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
										onClick={closeModal}
										title='Cancel Adding Bookmark'
									>
										Cancel
									</button>
									<button
										type='submit'
										className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
										onClick={AddWebsite}
										title='Add Bookmark'
									>
										Add Website
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
