import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import todoModel, { iTodoData } from "../model/todoModel";
import moment from "moment";

export const createTodo = async (req: Request, res: Response) => {
	try {
		const { task, time } = req.body;
		let newTime = Date.parse(time[1]) - Date.parse(time[0]);

		let realTime = new Date().getTime() + newTime;

		console.log(task);
		console.log(moment(Date.parse(time[1])).format("LLLL"));

		console.log(
			moment(
				Date.parse(
					"Mon Nov 06 2023 00:00:00 GMT+0100 (West Africa Standard Time)"
				)
			).format("LLLL")
		);

		const todo = await todoModel.create({
			task,
			deadLine: moment(Date.parse(time[1])).format("LLLL"),
			// left: newTime / 86400000,
		});

		let timing = setTimeout(async () => {
			await todoModel.findByIdAndUpdate(
				todo._id,
				{
					achieved: "Terminated",
				},
				{ new: true }
			);

			clearTimeout(timing);
			console.log("done");
		}, newTime);

		return res.status(statusCode.CREATED).json({
			message: "Created",
			data: todo,
		});
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: "Error",
		});
	}
};

export const viewTodos = async (req: Request, res: Response) => {
	try {
		const todo = await todoModel.find().sort({ createdAt: -1 });

		return res.status(statusCode.OK).json({
			message: "find",
			data: todo,
		});
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: "Error",
		});
	}
};

export const viewOneTodo = async (req: Request, res: Response) => {
	try {
		const { todoID } = req.params;

		const todo = await todoModel.findById(todoID);

		return res.status(statusCode.OK).json({
			message: "find",
			data: todo,
		});
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: "Error",
		});
	}
};

export const viewOneAndUpdateTodo = async (
	req: Request,
	res: Response
) => {
	try {
		const { todoID } = req.params;

		const check: iTodoData | null = await todoModel.findById(todoID);

		if (!!check?.achieved) {
			return res.status(statusCode.BAD_REQUEST).json({
				message: "Time has Elapse",
			});
		} else {
			if (check?.done === "start") {
				const todo = await todoModel.findByIdAndUpdate(
					todoID,
					{ done: "Ongoing" },
					{ new: true }
				);

				return res.status(statusCode.CREATED).json({
					message: "find",
					data: todo,
				});
			} else if (check?.done === "Ongoing") {
				const todo = await todoModel.findByIdAndUpdate(
					todoID,
					{ done: "done" },
					{ new: true }
				);

				return res.status(statusCode.CREATED).json({
					message: "find",
					data: todo,
				});
			}
		}
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: "Error",
		});
	}
};

export const viewOneAndDeleteTodo = async (
	req: Request,
	res: Response
) => {
	try {
		const { task, time } = req.body;
		const { todoID } = req.params;

		const todo = await todoModel.findByIdAndDelete(todoID);

		return res.status(statusCode.CREATED).json({
			message: "find",
			data: todo,
		});
	} catch (error) {
		return res.status(statusCode.BAD_REQUEST).json({
			message: "Error",
		});
	}
};
