import React, { useEffect } from "react";
import auth from "../services/logService";

const Logout = () => {

    useEffect(() => {
        auth.logout();
        window.location = "/";
    }, []);

    return null;
}

export default Logout;