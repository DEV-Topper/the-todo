import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CreateTodoScreen from "./CreateTodoScreen";
import {
	viewOneAndDeleteTodo,
	viewOneAndUpdateTodo,
	viewTodos,
} from "./api/Api";
import { FaTrash, FaClock, FaPlus } from "react-icons/fa";
import { AiOutlineFileDone } from "react-icons/ai";
import moment from "moment";

const App: React.FC = () => {
	const [toggle, setToggle] = useState<boolean>(false);
	const [show, setshow]: any = useState([]);

	useEffect(() => {
		viewTodos().then((res) => {
			setshow(res);
		});
	}, [show]);

	const todoCount = {
		todo: show.filter((task: any) => task.done === "start").length,
		inProgress: show.filter((task: any) => task.done === "Ongoing")
			.length,
		done: show.filter((task: any) => task.done === "done").length,
	};

	return (
		<Background>
			<Container>
				<Header>
					<h1>Your Task Board</h1>
					<AddTodoButton onClick={() => setToggle(true)}>
						Add Task
					</AddTodoButton>
				</Header>
				<Board>
					<Column>
						<ColumnHeader color="">
							To Do ({todoCount.todo})
						</ColumnHeader>
						<TaskList>
							{show &&
								show
									.filter((props: any) => props.done === "start")
									.map((props: any) => (
										<Task key={props._id}>
											<TaskTitle>{props.task}</TaskTitle>
											<TaskActions>
												<AddSubtaskButton
													onClick={() =>
														viewOneAndUpdateTodo(props._id)
													}
												>
													<FaPlus /> Start Task
												</AddSubtaskButton>
												<DeleteTaskButton
													onClick={() =>
														viewOneAndDeleteTodo(props._id)
													}
												>
													<FaTrash /> Delete Task
												</DeleteTaskButton>
											</TaskActions>
											<TaskTimestamp>
												<FaClock style={{ marginRight: "7px" }} />{" "}
												{moment(props.createdAt).fromNow()}
											</TaskTimestamp>
										</Task>
									))}
						</TaskList>
					</Column>
					<Column1>
						<ColumnHeader color="">
							In Progress ({todoCount.inProgress})
						</ColumnHeader>
						<TaskList1>
							{show &&
								show
									.filter((props: any) => props.done === "Ongoing")
									.map((props: any) => (
										<Task key={props._id}>
											<TaskTitle>{props.task}</TaskTitle>
											<TaskActions>
												<AddSubtaskButton
													onClick={() =>
														viewOneAndUpdateTodo(props._id)
													}
												>
													<FaPlus /> Done
												</AddSubtaskButton>
												<DeleteTaskButton
													onClick={() =>
														viewOneAndDeleteTodo(props._id)
													}
												>
													<FaTrash /> Delete Task
												</DeleteTaskButton>
											</TaskActions>
											<TaskTimestamp>
												<FaClock style={{ marginRight: "7px" }} />{" "}
												{moment(props.createdAt).fromNow()}
											</TaskTimestamp>
										</Task>
									))}
						</TaskList1>
					</Column1>
					<Column2>
						<ColumnHeader color="">
							Done ({todoCount.done})
						</ColumnHeader>
						<TaskList2>
							{show &&
								show
									.filter((props: any) => props.done === "done")
									.map((props: any) => (
										<Task key={props._id}>
											<TaskTitle>{props.task}</TaskTitle>
											<DeleteTaskButton
												onClick={() =>
													viewOneAndDeleteTodo(props._id)
												}
											>
												<FaTrash /> Delete Task
											</DeleteTaskButton>
											<TaskTimestamp>
												<div
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<FaClock
														style={{
															marginRight: "7px",
														}}
													/>{" "}
													{moment(props.createdAt).fromNow()}
												</div>
												<div
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<AiOutlineFileDone
														style={{
															color: "blue",
															fontSize: "15px",
															marginRight: "5px",
														}}
													/>
													<p style={{}}>Done</p>
												</div>
											</TaskTimestamp>
										</Task>
									))}
						</TaskList2>
					</Column2>
				</Board>
				{toggle && (
					<CreateTodoScreen
						toggle={toggle}
						setToggle={setToggle}
					/>
				)}
			</Container>
		</Background>
	);
};

export default App;

const Background = styled.div`
	background-color: #f0f0f0;
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: "Poppins", sans-serif;
`;

const Container = styled.div`
	font-family: Arial, sans-serif;
	width: 100%;
	min-height: 100vh;
	font-family: "Poppins", sans-serif;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
	background-color: #1e90ff;
	color: white;
	font-family: "Poppins", sans-serif;
`;

const AddTodoButton = styled.button`
	background-color: #4caf50;
	color: white;
	padding: 12px 20px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 18px;
`;

const Board = styled.div`
	display: flex;
`;

const Column = styled.div`
	flex: 1;
	margin: 10px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
`;
const Column1 = styled.div`
	flex: 1;
	margin: 10px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
`;
const Column2 = styled.div`
	flex: 1;
	margin: 10px;
	padding: 20px;
	background-color: #fff;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	overflow-y: auto;
`;

const ColumnHeader = styled.h2`
	font-size: 24px;
	/* margin-bottom: 20px; */
	background-color: ${(props) => props.color || "transparent"};
	border: 1px solid silver;
	border-radius: 5px;
	height: 70px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const TaskList = styled.div`
	display: flex;
	flex-direction: column;
`;
const TaskList1 = styled.div`
	display: flex;
	flex-direction: column;
`;
const TaskList2 = styled.div`
	display: flex;
	flex-direction: column;
`;

const Task = styled.div`
	padding: 20px;
	background-color: #ffffff;
	margin: 10px 0;
	display: flex;
	flex-direction: column;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskTitle = styled.div`
	flex: 1;
	margin-bottom: 7px;
`;

const TaskActions = styled.div`
	display: flex;
	justify-content: space-between;
`;

const AddSubtaskButton = styled.button`
	background-color: #007bff;
	color: white;
	padding: 10px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
	margin-right: 10px;
`;

const DeleteTaskButton = styled.button`
	background-color: #ff0000;
	color: white;
	padding: 10px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 14px;
`;

const TaskTimestamp = styled.div`
	font-size: 12px;
	color: #777;
	margin-top: 5px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
