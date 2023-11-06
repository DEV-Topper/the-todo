import axios from "axios";

const URL: string = "http://localhost:2266/api/v1";

export const createTodo = async (data: any) => {
	try {
		return await axios.post(`${URL}/create-todo`, data);
	} catch (error) {
		console.log(error);
	}
};

export const viewTodos = async () => {
	try {
		return await axios.get(`${URL}/view-todos`).then((res: any) => {
			return res.data.data;
		});
	} catch (error) {
		console.log(error);
	}
};
export const viewOneTodos = async () => {
	try {
		return await axios.get(`${URL}/view-todo`).then((res: any) => {
			return res.data.data;
		});
	} catch (error) {
		console.log(error);
	}
};
export const viewOneAndUpdateTodo = async (ID: any) => {
	try {
		return await axios.patch(`${URL}/update-todo/${ID}`);
	} catch (error) {
		console.log(error);
	}
};
export const viewOneAndDeleteTodo = async (ID: any) => {
	try {
		return await axios
			.delete(`${URL}/delete-todo/${ID}`)
			.then((res: any) => {
				return res.data.data;
			});
	} catch (error) {
		console.log(error);
	}
};
