import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Chirp } from "../../types";
import { apiService } from "../services/api-service";
import swal from "sweetalert";

const MAX_CHIRP_LENGTH = 280;

const Edit = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const [chirpDetails, setChirpDetails] = useState<Chirp>();
    const [updatedChirp, setUpdatedChirp] = useState("");

    useEffect(() => {
        apiService(`/api/chirps/${id}`)
            .then(data => {
                setChirpDetails(data);
                setUpdatedChirp(data.content);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    }, [id]);

    const handleSaveChanges = () => {

        if (!updatedChirp) {
            swal("Feeling shy?", "Please enter some content!", "error");
            return;
        }

        if (updatedChirp.length > MAX_CHIRP_LENGTH) {
            swal("OK, settle down...", `Your chirp has to be under ${MAX_CHIRP_LENGTH} characters.`, "error");
            return;
        }

        apiService(`/api/chirps/${id}`, "PUT", { content: updatedChirp })
            .then(data => {
                swal("Looking good!", `${data.message}`, "success");
                nav(`/chirps/${id}`);
            })
            .catch(error => swal("Oops!", `${error.message}`, "error"));
    };

    const handleDelete = () => {

        apiService(`/api/chirps/${id}`, "DELETE")
            .then(data => {
                swal("And... gone!", data.message, "success");
                nav(`/chirps`);
            })
            .catch(error => swal("Oops!", error.message, "error"));
    };

    return (
        <div className="mt-5 row justify-content-center">
            <div className="col-12 col-md-8">
                <div className="card text-bg-dark shadow-lg">
                    <div className="card-title text-center">
                        <p>Editing Chirp #{id} from User #{chirpDetails?.userid}:</p>
                    </div>
                    <div className="card-body">
                        {chirpDetails && ( // controlled React input: makes sure that your state exists, then runs the following if it does
                            <div>
                                <span className={`${updatedChirp.length >= MAX_CHIRP_LENGTH ? "text-danger" : "text-light"}`}>
                                    {updatedChirp.length}/{MAX_CHIRP_LENGTH}
                                </span>
                                <textarea className="form-control" value={updatedChirp} maxLength={MAX_CHIRP_LENGTH} onChange={e => setUpdatedChirp(e.target.value)} />
                                <button onClick={handleSaveChanges} className="btn btn-outline-success mt-2">Save Changes</button>
                                <button onClick={handleDelete} className="btn btn-outline-danger mx-2 mt-2">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Edit;