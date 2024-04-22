import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom"

function ViewCV() {
    const {cv, name} = useParams();
    useEffect(() => {
        document.title = 'Xem CV';
        async function downloadCV() {
            const res = await axios.get(`http://localhost:9999/api/apply-job/asset/${cv}`, {cv: cv+"/"+name}).catch(err => console.log(err));
            // res.data && window.open(res.data, '_blank');
        }
        downloadCV();
    }, [cv])
    return (
        <div></div>
    )
}

export default ViewCV;