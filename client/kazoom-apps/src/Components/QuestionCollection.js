import React from "react";
import { Button } from "reactstrap";
import { DELETE_COLLECTION, FETCH_COLLECTIONS } from "../config/queries";
import { useMutation } from "@apollo/client";

const Collection = ({ data, addCollection }) => {
    const [deleteTemplate] = useMutation(DELETE_COLLECTION, {
        refetchQueries: [
            {
                query: FETCH_COLLECTIONS,
            },
        ],
    });
    const handleDelete = (id) => {
        deleteTemplate({
            variables: {
                inputId: id,
            },
        });
    };

    const handleUse = () => {
        return addCollection(data.questions);
    };

    const styleBorder = {
        background: "#e5e5e5",
        padding: "10px",
        borderRadius: `10px`,
    };

    return (
        <div style={styleBorder}>
            <div className="d-flex flex-column">
                <span
                    className="d-inline-block text-truncate font-weight-bold"
                    style={{ marginRight: "20px", width: "180px" }}
                >
                    {data.title}
                </span>
                <span>Total Question: {data.questions.length}</span>
                <br />
            </div>
            <div>
                <Button
                    onClick={() => handleUse()}
                    size="sm"
                    color="info"
                    className="mr-2"
                >
                    Choose
                </Button>
                <Button
                    onClick={() => handleDelete(data._id)}
                    size="sm"
                    color="danger"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default Collection;
