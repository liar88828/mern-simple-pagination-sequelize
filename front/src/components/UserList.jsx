import React, {useEffect, useState} from 'react';
import axios from "axios";
import ReactPaginate from "react-paginate";

function UserList() {
	const [DATA, setDATA] = useState([]);
	const [Page, setPage] = useState(0);
	const [Limit, setLimit] = useState(10);
	const [TotalPages, setTotalPages] = useState(0);
	const [Rows, setRows] = useState(0);
	const [KeyWord, setKeyWord] = useState('');
	const [query, setQuery] = useState("");
	const [msg, setMsg] = useState("");

	const getUser = async () => {
		const response = await axios
				.get(`http://localhost:5000/user?search=${KeyWord}&page=${Page}&limit=${Limit}`)
		setDATA(response.data.result)
		setPage(response.data.page)
		setTotalPages(response.data.totalPage)
		setRows(response.data.totalRows)
	}
	// console.log(DATA);


	useEffect(() => {
		getUser()
	}, [Page, KeyWord]); // harus di kasih agar lang sumg merelout


	const changePage = ({selected}) => {
		setPage(selected)
		if (selected === 9) {
			setMsg('Juka tidak menemukan data yaang anda cari cari lah di search')
		} else {
			setMsg('')
		}
	}
	const searchData = (e) => {
		e.preventDefault()
		setPage(0)
		setKeyWord(query)

	}

	return (
			<div className={'container mt-5 '}>
				<div className="columns">
					<div className="column is-centered">
						<form onSubmit={searchData}>
							<div className={'field has-addons'}>
								<div className="control is-expanded">
									<input
											type="text"
											className={'input'}
											placeholder={'Find Someting here...'}
											value={query}
											onChange={(e) => {
												setQuery(e.target.value)
											}}
									/>
								</div>

								<div className="control">
									<button type={"submit"} className={'button is-center'}>
										Search
									</button>
								</div>

							</div>
						</form>

						<table className={'table is-striped  is-bordered is-fullwidth mt-2 '}>
							<thead>
							<tr>
								<td>ID</td>
								<td>Name</td>
								<td>Email</td>
								<td>Gender</td>
							</tr>
							</thead>
							<tbody>
							{

								DATA.map(data => {
									return (
											<tr key={data.id}>
												<td>{data.id}</td>
												<td>{data.name}</td>
												<td>{data.email}</td>
												<td>{data.gender}</td>
											</tr>)
								})}
							</tbody>
						</table>

						<p>
							Total Rows :{Rows} Page: {Rows ? Page + 1 : 0} of {TotalPages}
						</p>
						<p className={'has-text-centered has-text-danger mt-2'}>{msg}</p>
						<nav
								className="pagination is-centered"
								key={Rows}
								role="navigation"
								aria-label="pagination"
						>
							<ReactPaginate
									previousLabel={"< Prev"}
									nextLabel={"Next >"}
									pageCount={Math.min(10, TotalPages)} // untuk membatasi Jumlah Page
									onPageChange={changePage}
									containerClassName={"pagination-list"}
									pageLinkClassName={"pagination-link"}
									previousLinkClassName={"pagination-previous"}
									nextLinkClassName={"pagination-next"}
									activeLinkClassName={"pagination-link is-current"}
									disabledLinkClassName={"pagination-link is-disabled"}
							/>
						</nav>
					</div>
				</div>
			</div>
	)
			;
}

export default UserList;
