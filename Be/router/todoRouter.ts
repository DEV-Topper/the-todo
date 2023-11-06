import { Router } from "express";
import {
	createTodo,
	viewOneAndDeleteTodo,
	viewOneAndUpdateTodo,
	viewOneTodo,
	viewTodos,
} from "../controller/todoController";

const router: Router = Router();

router.route("/create-todo").post(createTodo);
router.route("/view-todos").get(viewTodos);
router.route("/view-todo").get(viewOneTodo);
router.route("/update-todo/:todoID").patch(viewOneAndUpdateTodo);
router.route("/delete-todo/:todoID").delete(viewOneAndDeleteTodo);

export default router;
