class TodoModal {
  constructor(ownerID = "", created_at = "", due_at = "", task = "") {
    this.ownerID = ownerID;
    this.created_at = created_at;
    this.due_at = due_at;
    this.task = task;
  }
}

export default TodoModal;
