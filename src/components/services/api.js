import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "24753689-56dc21f0a68faf374c919d39f";


const fetchImages = async (query, page) => {
    const response = await axios.get(`?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return response.data.hits;
};

export default fetchImages;