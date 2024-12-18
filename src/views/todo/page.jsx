import React, { useState, useEffect } from "react";
import {
    CheckCircle2,
    Circle,
    Plus,
    Trash2,
    Edit2,
    Save,
    Loader,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/ui/logout-button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    fetchTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoComplete,
    resetAllTodosComplete,
} from "./actions";

function ToDoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editTodoId, setEditTodoId] = useState(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingTodoId, setLoadingTodoId] = useState(null);
    const [animation, setAnimation] = useState(false);
    const [mounted, setMounted] = useState(false);

    const getTodos = async () => {
        try {
            setMounted(false);
            setLoading(true);
            const todosData = await fetchTodos();
            setTodos(todosData?.data || []);
        } catch (error) {
            console.error("Error fetching todos", error);
        } finally {
            setLoading(false);
            setMounted(true);
        }
    };

    const handleAddTodo = async () => {
        try {
            if (newTodo.trim() !== "") {
                setLoading(true);
                const newTodoData = await addTodo(newTodo);
                setTodos((prevTodos) => [newTodoData?.data, ...prevTodos]);
                setNewTodo("");
                setAnimation(true);
            }
        } catch (error) {
            console.error("Error adding todo", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            setLoadingTodoId(id);
            await deleteTodo(id);
            setTodos((prevTodos) =>
                prevTodos.filter((todo) => todo._id !== id)
            );
        } catch (error) {
            console.error("Error deleting todo", error);
        } finally {
            setLoadingTodoId(null);
        }
    };

    const handleEditTodo = (id, text) => {
        setEditTodoId(id);
        setEditText(text);
    };

    const handleSaveTodo = async (id) => {
        try {
            setLoadingTodoId(id);
            const updatedTodo = await updateTodo(id, { text: editText });
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id
                        ? { ...todo, text: updatedTodo?.data?.text }
                        : todo
                )
            );
            setEditTodoId(null);
            setEditText("");
        } catch (error) {
            console.error("Error updating todo", error);
        } finally {
            setLoadingTodoId(null);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            setLoadingTodoId(id);
            const updatedTodo = await toggleTodoComplete(id);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id
                        ? { ...todo, completed: updatedTodo?.data.completed }
                        : todo
                )
            );
        } catch (error) {
            console.error("Error toggling todo", error);
        } finally {
            setLoadingTodoId(null);
        }
    };

    const handleResetAllTodos = async () => {
        if (!todos.length) return;
        try {
            setLoading(true);
            await resetAllTodosComplete();
            const resetTodos = todos.map((todo) => ({
                ...todo,
                completed: false,
            }));
            setTodos(resetTodos);
        } catch (error) {
            console.error("Error resetting todos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const completionPercentage = Math.round(
        (todos.filter((todo) => todo.completed).length / todos.length) * 100
    );

    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Todo List</CardTitle>
                        <LogoutButton />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <Input
                                type="text"
                                id="todo-input"
                                placeholder="Add a new todo"
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                                onKeyPress={(e) =>
                                    e.key === "Enter" && handleAddTodo()
                                }
                                disabled={loading}
                            />
                            <Button onClick={handleAddTodo} disabled={loading}>
                                {loading ? (
                                    <Loader className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Plus className="h-4 w-4" />
                                )}
                                <span className="sr-only">Add todo</span>
                            </Button>
                        </div>
                        <ScrollArea className="h-[300px] rounded-md border">
                            <div className="space-y-2 p-4">
                                {!mounted ? (
                                    Array.from({ length: 5 }).map(
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between w-full p-2"
                                            >
                                                <Skeleton className="h-5 w-5 rounded-full" />
                                                <Skeleton className="h-4 w-3/4 rounded" />
                                                <Skeleton className="h-8 w-8 rounded" />
                                            </div>
                                        )
                                    )
                                ) : !todos.length ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center justify-center h-full py-10 text-center"
                                    >
                                        <div
                                            className="text-muted-foreground mb-4"
                                        />
                                        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
                                            Your todo list is empty
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Start by adding your first todo
                                            above
                                        </p>
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                document
                                                    .querySelector(
                                                        'input[id="todo-input"]'
                                                    )
                                                    .focus()
                                            }
                                            className="flex items-center space-x-2"
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span>Add First Todo</span>
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <AnimatePresence>
                                        {todos.map((todo) => (
                                            <motion.div
                                                key={`item-${todo._id}`}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                layout
                                            >
                                                <motion.div
                                                    className="flex items-center justify-between p-2 bg-secondary rounded-md"
                                                    initial={
                                                        animation && {
                                                            backgroundColor:
                                                                "#10B981",
                                                        }
                                                    }
                                                    animate={{
                                                        backgroundColor:
                                                            "var(--secondary)",
                                                    }}
                                                    transition={{
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    {loadingTodoId ===
                                                    todo._id ? (
                                                        <div className="flex items-center justify-between w-full">
                                                            <Skeleton className="h-5 w-5 rounded-full" />
                                                            <Skeleton className="h-4 w-3/4 rounded" />
                                                            <Skeleton className="h-8 w-8 rounded" />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex items-center space-x-2 flex-grow">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleToggleComplete(
                                                                            todo._id
                                                                        )
                                                                    }
                                                                >
                                                                    {todo.completed ? (
                                                                        <CheckCircle2 className="h-5 w-5 text-primary" />
                                                                    ) : (
                                                                        <Circle className="h-5 w-5" />
                                                                    )}
                                                                </Button>
                                                                {editTodoId ===
                                                                todo._id ? (
                                                                    <Input
                                                                        value={
                                                                            editText
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setEditText(
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                        className="flex-grow"
                                                                    />
                                                                ) : (
                                                                    <span
                                                                        className={
                                                                            todo.completed
                                                                                ? "line-through text-muted-foreground"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {
                                                                            todo.text
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div className="flex space-x-1">
                                                                {editTodoId ===
                                                                todo._id ? (
                                                                    <Button
                                                                        className="ml-1"
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleSaveTodo(
                                                                                todo._id
                                                                            )
                                                                        }
                                                                    >
                                                                        <Save className="h-4 w-4 text-success" />
                                                                        <span className="sr-only">
                                                                            Save
                                                                            todo
                                                                        </span>
                                                                    </Button>
                                                                ) : (
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() =>
                                                                            handleEditTodo(
                                                                                todo._id,
                                                                                todo.text
                                                                            )
                                                                        }
                                                                    >
                                                                        <Edit2 className="h-4 w-4 text-primary" />
                                                                        <span className="sr-only">
                                                                            Edit
                                                                            todo
                                                                        </span>
                                                                    </Button>
                                                                )}
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() =>
                                                                        handleDeleteTodo(
                                                                            todo._id
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        loadingTodoId ===
                                                                        todo._id
                                                                    }
                                                                >
                                                                    {loadingTodoId ===
                                                                    todo._id ? (
                                                                        <Loader className="h-4 w-4 animate-spin" />
                                                                    ) : (
                                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                                    )}
                                                                    <span className="sr-only">
                                                                        Delete
                                                                        todo
                                                                    </span>
                                                                </Button>
                                                            </div>
                                                        </>
                                                    )}
                                                </motion.div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                    <div className="mt-4">
                        <Progress
                            value={completionPercentage}
                            className="w-full"
                        />
                        <p className="text-sm text-muted-foreground text-center mt-3">
                            {completionPercentage || 0}% Complete
                        </p>
                    </div>
                </CardContent>

                <CardFooter>
                    <div className="flex justify-between w-full">
                        <Button
                            variant="outline"
                            onClick={handleResetAllTodos}
                            disabled={!todos.length || loading}
                        >
                            Reset All
                        </Button>
                        <div className="text-sm text-muted-foreground">
                            {todos.filter((item) => item?.completed).length}{" "}
                            Completed / {todos.length}
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ToDoList;
