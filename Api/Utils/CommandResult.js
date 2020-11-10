class CommandResult {
    result = false;
    data = "";
    message = "";
    constructor(result, data, message = "") {
        this.result = result;
        this.data = data;
        if (message == "") {
            if (this.result) {
                this.message = "Correcto.";
            } else {
                this.message = "Error: " + data;
            }
        }
    }
}