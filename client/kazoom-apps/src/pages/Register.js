import React from "react";

export default () => {
    return (
        <div style={{ padding: "10px", width: "500px", height: "300px" }}>
            <form>
                <div class="form-group">
                    <label for="usernameRegister">Username</label>
                    <input
                        type="text"
                        class="form-control"
                        name="usernameRegister"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div class="form-group">
                    <label for="passwordRegister">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        name="passwordRegister"
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};
